---
id: service-overview
title: Abu Service
sidebar_position: 1
---

# Abu Service

Rust-based deployment automation service for the Abu Enterprise application.

## Overview

Abu Service is a production-ready Rust service that automates deployment, handles GitHub webhooks, and manages the complete Abu Enterprise deployment lifecycle.

## Quick Start

```bash
cargo build --release
./target/release/abu-service --config config.toml
```

## Documentation Sections

- **API** - Complete API documentation including endpoints, webhooks, and authentication
- **Deployment** - Installation, configuration, and deployment guides
- **Development** - Local development, testing, and contributing
- **Operations** - Monitoring, troubleshooting, and maintenance

## Features

- Automated deployment management
- GitHub webhook integration
- Health monitoring
- Rollback capability
- Self-updating service
- Secure API endpoints

## Deployment

Use the included `deploy.sh` script for both local preprod and production deployments:

```bash
# Local preprod
./deploy.sh

# Production
DEPLOY_PATH=/opt/abu-service USE_SYSTEMD=true ./deploy.sh
```

