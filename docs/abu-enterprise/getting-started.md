---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# Getting Started with Abu Enterprise

Quick guide to get up and running with Abu Enterprise.

## Installation

```bash
# Clone the repository
git clone https://github.com/melalawi/Abu-Enterprise
cd Abu-Enterprise

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

The development server runs on `http://localhost:5173` with hot module replacement.

```bash
npm run dev
```

## Testing

Run the complete test suite:

```bash
npm run lint            # Run linting
npm run test:unit       # Run unit tests
npm run test:integration  # Run integration tests
npm run test:all        # Run all tests
```

## Building

Build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Deployment

### Local Preprod

Deploy to a local environment for testing:

```bash
./deploy.sh
```

This deploys to `./local-deploy` and starts health checks.

### Production

Deploy to production:

```bash
DEPLOY_PATH=/var/www/abu.it ./deploy.sh
```

## Next Steps

- Configure your [Environment](configuration/environment.md)
- Learn about [Testing](development/testing.md)
- Read the [Deployment Guide](deployment/production.md)

