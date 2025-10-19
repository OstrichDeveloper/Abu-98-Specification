---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# Getting Started with Abu Service

Quick guide to get up and running with Abu Service.

## Prerequisites

- Rust (latest stable)
- Cargo
- OpenSSL development libraries

## Installation

```bash
# Clone the repository
git clone https://github.com/melalawi/Abu-Service
cd Abu-Service

# Build the project
cargo build --release
```

## Configuration

Create a configuration file:

```bash
cp configs/config.toml.example configs/config.toml
```

Edit `configs/config.toml` with your settings.

## Running

```bash
./target/release/abu-service --config configs/config.toml
```

## Development

### Testing

Run the complete test suite:

```bash
cargo fmt --all -- --check  # Check formatting
cargo clippy --all-targets --all-features  # Run linter
cargo test --lib            # Run unit tests
cargo test --test '*'       # Run integration tests
```

### Building

```bash
cargo build --release
```

## Deployment

### Local Preprod

Deploy to a local environment for testing:

```bash
./deploy.sh
```

This deploys to `./local-deploy-service` and starts the service.

### Production

Deploy to production:

```bash
DEPLOY_PATH=/opt/abu-service USE_SYSTEMD=true ./deploy.sh
```

## Next Steps

- Configure the [API](api/endpoints.md)
- Set up [Webhooks](api/webhooks.md)
- Read the [Deployment Guide](deployment/installation.md)

