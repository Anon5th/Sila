use alloy::primitives::Address;
use anyhow::Result;
use axum::{routing::{get, post}, Router};
use serde::Deserialize;
use std::{path::Path, sync::Arc, time::Duration};
use tower_http::cors::{Any, CorsLayer};
use tower_http::trace::TraceLayer;

mod contract;
mod handlers;
mod state;

use handlers::{AppContext, SharedCtx};
use state::History;

#[derive(Deserialize)]
struct ContractInfo {
    address: String,
}

async fn wait_for_contract(path: &str, max_secs: u64) -> Result<Address> {
    let p = Path::new(path);
    let mut elapsed = 0u64;
    let step_ms = 500u64;
    loop {
        if p.exists() {
            match tokio::fs::read_to_string(p).await {
                Ok(s) => {
                    if let Ok(info) = serde_json::from_str::<ContractInfo>(&s) {
                        let addr: Address = info.address.parse()?;
                        tracing::info!(address = %addr, "contract loaded from {}", path);
                        return Ok(addr);
                    } else {
                        tracing::debug!("contract file present but unparseable, retrying");
                    }
                }
                Err(e) => tracing::debug!(err=%e, "read failed"),
            }
        }
        tokio::time::sleep(Duration::from_millis(step_ms)).await;
        elapsed += step_ms;
        if elapsed >= max_secs * 1000 {
            anyhow::bail!("timed out waiting for {} after {}s", path, max_secs);
        }
        if elapsed % 5000 == 0 {
            tracing::info!("still waiting for {}...", path);
        }
    }
}

#[tokio::main]
async fn main() -> Result<()> {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "sila_engine=info,tower_http=info".into()),
        )
        .init();

    let rpc_url = std::env::var("RPC_URL").unwrap_or_else(|_| "http://hardhat:8545".to_string());
    let contract_path =
        std::env::var("CONTRACT_FILE").unwrap_or_else(|_| "/contract-out/sila.json".to_string());
    let listen = std::env::var("LISTEN").unwrap_or_else(|_| "0.0.0.0:8080".to_string());

    tracing::info!(%rpc_url, %contract_path, %listen, "sila-engine starting");

    let address = wait_for_contract(&contract_path, 120).await?;

    let ctx: SharedCtx = Arc::new(AppContext {
        contract_address: address,
        rpc_url,
        history: History::new(100),
        wallet: handlers::signer_from_pk(),
    });

    let cors = CorsLayer::new().allow_origin(Any).allow_methods(Any).allow_headers(Any);

    let app = Router::new()
        .route("/health", get(handlers::health))
        .route("/history", get(handlers::history))
        .route("/verify", post(handlers::verify))
        .with_state(ctx)
        .layer(cors)
        .layer(TraceLayer::new_for_http());

    let listener = tokio::net::TcpListener::bind(&listen).await?;
    tracing::info!(%listen, "listening");
    axum::serve(listener, app).await?;
    Ok(())
}
