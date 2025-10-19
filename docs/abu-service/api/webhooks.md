---
id: webhooks
title: Webhooks
sidebar_position: 2
---

# Webhook Integration

GitHub webhook integration for automatic deployments.

## Setup

Configure webhooks in your GitHub repository to point to the Abu Service webhook endpoint.

## Webhook Endpoint

```
POST /webhook
```

The service validates webhook signatures and triggers deployments automatically when releases are published.
