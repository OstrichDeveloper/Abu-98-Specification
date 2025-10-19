---
id: production
title: Production Deployment
sidebar_position: 2
---

# Production Deployment

Guide for deploying Abu Enterprise to production.

## Prerequisites

- Built application (`npm run build`)
- Target server with web server (Caddy/Nginx)
- Proper DNS configuration

## Deployment

```bash
DEPLOY_PATH=/var/www/abu.it ./deploy.sh
```

The deployment script handles:
- Building the application
- Creating backups
- Deploying to target directory
- Health checks
- Rollback on failure
