use chrono::{DateTime, Utc};
use parking_lot::Mutex;
use serde::{Deserialize, Serialize};
use std::collections::VecDeque;
use std::sync::Arc;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HistoryEntry {
    pub timestamp: DateTime<Utc>,
    pub mcc: u16,
    pub amount: u64,
    pub label: String,
    pub status: String,
    pub reason: Option<String>,
    pub tx_hash: Option<String>,
    pub block: Option<u64>,
    pub category: Option<String>,
}

#[derive(Clone)]
pub struct History {
    inner: Arc<Mutex<VecDeque<HistoryEntry>>>,
    cap: usize,
}

impl History {
    pub fn new(cap: usize) -> Self {
        Self {
            inner: Arc::new(Mutex::new(VecDeque::with_capacity(cap))),
            cap,
        }
    }

    pub fn push(&self, entry: HistoryEntry) {
        let mut g = self.inner.lock();
        if g.len() >= self.cap {
            g.pop_front();
        }
        g.push_back(entry);
    }

    pub fn snapshot(&self) -> Vec<HistoryEntry> {
        let g = self.inner.lock();
        g.iter().rev().cloned().collect()
    }
}
