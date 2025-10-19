---
id: enterprise-overview
title: Abu Enterprise
sidebar_position: 1
---

# Abu Enterprise

Network monitoring dashboard built using the Abu Web Kernel.

## Overview

Abu Enterprise is a production web application that demonstrates the Abu Web Kernel capabilities while providing network monitoring and management features.

## Quick Start

```bash
npm install
npm run dev
```

## Documentation Sections

- **Configuration** - Environment setup, kernel integration, deployment config
- **Development** - Local development, testing, and debugging
- **Deployment** - Local preprod and production deployment guides

## Features

- Built on Abu Web Kernel
- Network monitoring dashboard
- Plugin-based architecture
- Production-ready deployment

## Deployment

Use the included `deploy.sh` script for both local preprod and production deployments:

```bash
# Local preprod
./deploy.sh

# Production
DEPLOY_PATH=/var/www/abu.it ./deploy.sh
```

