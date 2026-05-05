use alloy::{
    network::EthereumWallet,
    primitives::{Address, U256},
    providers::ProviderBuilder,
    signers::local::PrivateKeySigner,
};
use axum::{extract::State, http::StatusCode, response::IntoResponse, Json};
use serde::{Deserialize, Serialize};
use std::sync::Arc;

use crate::contract::SilaIntegrityCore;
use crate::state::{History, HistoryEntry};

const HARDHAT_ACCOUNT0_PK: &str =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

pub struct AppContext {
    pub contract_address: Address,
    pub rpc_url: String,
    pub history: History,
    pub wallet: EthereumWallet,
}

pub type SharedCtx = Arc<AppContext>;

#[derive(Deserialize, Debug)]
pub struct VerifyRequest {
    pub mcc: u16,
    pub amount: u64,
    pub label: String,
}

#[derive(Serialize, Debug)]
pub struct VerifyResponse {
    pub status: String,
    pub mcc: u16,
    pub amount: u64,
    pub label: String,
    pub reason: Option<String>,
    pub tx_hash: Option<String>,
    pub block: Option<u64>,
    pub category: Option<String>,
}

pub async fn health(State(ctx): State<SharedCtx>) -> impl IntoResponse {
    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .wallet(ctx.wallet.clone())
        .on_http(ctx.rpc_url.parse().expect("valid rpc url"));
    let contract = SilaIntegrityCore::new(ctx.contract_address, provider);

    let approved_count: u64 = contract
        .approvedCount()
        .call()
        .await
        .ok()
        .and_then(|r| u64::try_from(r._0).ok())
        .unwrap_or(0);
    let blocked_count: u64 = contract
        .blockedCount()
        .call()
        .await
        .ok()
        .and_then(|r| u64::try_from(r._0).ok())
        .unwrap_or(0);

    Json(serde_json::json!({
        "ok": true,
        "contract": format!("{:?}", ctx.contract_address),
        "rpc": ctx.rpc_url,
        "approved_count": approved_count,
        "blocked_count": blocked_count,
    }))
}

pub async fn history(State(ctx): State<SharedCtx>) -> impl IntoResponse {
    Json(ctx.history.snapshot())
}

pub async fn verify(
    State(ctx): State<SharedCtx>,
    Json(req): Json<VerifyRequest>,
) -> impl IntoResponse {
    tracing::info!(?req, "verify request");

    let provider = ProviderBuilder::new()
        .with_recommended_fillers()
        .wallet(ctx.wallet.clone())
        .on_http(ctx.rpc_url.parse().expect("valid rpc url"));

    let contract = SilaIntegrityCore::new(ctx.contract_address, provider);
    let amount_u256 = U256::from(req.amount);

    let category = match contract.categoryName(req.mcc).call().await {
        Ok(ret) => {
            if ret._0.is_empty() {
                None
            } else {
                Some(ret._0)
            }
        }
        Err(_) => None,
    };

    let simulate = contract
        .verifyExpenditure(req.mcc, amount_u256, req.label.clone())
        .call()
        .await;

    match simulate {
        Ok(_) => {
            let send_res = contract
                .verifyExpenditure(req.mcc, amount_u256, req.label.clone())
                .send()
                .await;

            match send_res {
                Ok(pending) => match pending.get_receipt().await {
                    Ok(receipt) => {
                        let tx_hash = format!("{:?}", receipt.transaction_hash);
                        let block = receipt.block_number;
                        let resp = VerifyResponse {
                            status: "approved".into(),
                            mcc: req.mcc,
                            amount: req.amount,
                            label: req.label.clone(),
                            reason: Some("Transaction aligns with merit principles".into()),
                            tx_hash: Some(tx_hash.clone()),
                            block,
                            category: category.clone(),
                        };
                        ctx.history.push(HistoryEntry {
                            timestamp: chrono::Utc::now(),
                            mcc: req.mcc,
                            amount: req.amount,
                            label: req.label,
                            status: "approved".into(),
                            reason: resp.reason.clone(),
                            tx_hash: Some(tx_hash),
                            block,
                            category,
                        });
                        (StatusCode::OK, Json(resp)).into_response()
                    }
                    Err(e) => internal_error(&ctx, &req, format!("receipt error: {e}")),
                },
                Err(e) => internal_error(&ctx, &req, format!("send error: {e}")),
            }
        }
        Err(e) => {
            let raw = format!("{e}");
            let reason = parse_revert_reason(&raw);
            tracing::warn!(reason = %reason, "transaction blocked");
            let resp = VerifyResponse {
                status: "blocked".into(),
                mcc: req.mcc,
                amount: req.amount,
                label: req.label.clone(),
                reason: Some(reason.clone()),
                tx_hash: None,
                block: None,
                category: category.clone(),
            };
            ctx.history.push(HistoryEntry {
                timestamp: chrono::Utc::now(),
                mcc: req.mcc,
                amount: req.amount,
                label: req.label,
                status: "blocked".into(),
                reason: Some(reason),
                tx_hash: None,
                block: None,
                category,
            });
            (StatusCode::OK, Json(resp)).into_response()
        }
    }
}

fn internal_error(ctx: &SharedCtx, req: &VerifyRequest, msg: String) -> axum::response::Response {
    tracing::error!(error = %msg, "internal error");
    ctx.history.push(HistoryEntry {
        timestamp: chrono::Utc::now(),
        mcc: req.mcc,
        amount: req.amount,
        label: req.label.clone(),
        status: "error".into(),
        reason: Some(msg.clone()),
        tx_hash: None,
        block: None,
        category: None,
    });
    (
        StatusCode::INTERNAL_SERVER_ERROR,
        Json(serde_json::json!({ "status": "error", "reason": msg })),
    )
        .into_response()
}

fn parse_revert_reason(raw: &str) -> String {
    if let Some(start) = raw.find("SILA_PROTOCOL:") {
        let tail = &raw[start..];
        let end = tail
            .find(|c: char| c == '"' || c == '\'' || c == '\\')
            .unwrap_or(tail.len());
        return tail[..end].trim().to_string();
    }
    if raw.contains("NON_MERIT") {
        return "SILA_PROTOCOL: NON_MERIT_EXPENDITURE_DETECTED".into();
    }
    raw.lines().next().unwrap_or("contract reverted").to_string()
}

pub fn signer_from_pk() -> EthereumWallet {
    let signer: PrivateKeySigner = HARDHAT_ACCOUNT0_PK
        .parse()
        .expect("valid hardhat account private key");
    EthereumWallet::from(signer)
}
