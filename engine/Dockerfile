# Pin to 1.91 — matches the local toolchain and is required by
# alloy's transitive dep ruint 1.18 (MSRV 1.90).
FROM rust:1.91-slim AS builder

RUN apt-get update && apt-get install -y \
    pkg-config libssl-dev ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy BOTH manifest and lockfile so the dep-prefetch layer respects the
# pinned versions that work locally. Without Cargo.lock, cargo resolves
# fresh on every CI build and may pick a newer transitive dep that breaks.
COPY Cargo.toml Cargo.lock ./
RUN mkdir src && echo "fn main(){}" > src/main.rs && \
    cargo build --release --locked && \
    rm -rf src target/release/sila-engine* target/release/deps/sila_engine*

COPY src ./src
RUN cargo build --release --locked

FROM debian:bookworm-slim AS runtime

RUN apt-get update && apt-get install -y \
    ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=builder /app/target/release/sila-engine /usr/local/bin/sila-engine

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
    CMD curl -fs http://localhost:8080/health || exit 1

CMD ["sila-engine"]
