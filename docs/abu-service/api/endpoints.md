---
id: endpoints
title: Endpoints
---

# Abu Service API Documentation

## Overview

The Abu Service provides a RESTful API for managing deployments, monitoring service health, and performing administrative operations. All API endpoints are available at `https://api.abu.it` (or `http://localhost:8080` in development).

## Authentication

Most endpoints require authentication using a Bearer token in the Authorization header:

```bash
curl -H "Authorization: Bearer your_admin_token" \
     https://api.abu.it/status
```

The admin token is configured via the `ADMIN_TOKEN` environment variable.

## Response Format

All API responses follow a consistent format:

```json
{
  "success": true,
  "data": { ... },
  "error": null
}
```

### Error Response

```json
{
  "success": false,
  "data": null,
  "error": "Error message describing what went wrong"
}
```

## Endpoints

### Health & Status

#### GET /health

Check if the service is running and healthy.

**Response:**
```json
{
  "success": true,
  "data": "healthy",
  "error": null
}
```

**Status Codes:**
- `200 OK` - Service is healthy
- `503 Service Unavailable` - Service is unhealthy

---

#### GET /status

Get detailed service status and information.

**Response:**
```json
{
  "success": true,
  "data": {
    "current_version": "1.0.0",
    "last_deployment": "2024-01-15T10:30:00Z",
    "health_status": "healthy",
    "uptime": "2d 5h 30m"
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Status retrieved successfully

---

#### GET /config

Get the current service configuration (sanitized, no secrets).

**Response:**
```json
{
  "success": true,
  "data": {
    "github": {
      "enterprise_repo": "your-username/abu-enterprise",
      "service_repo": "your-username/abu-service",
      "poll_interval_seconds": 900
    },
    "deployment": {
      "deploy_path": "/var/www/abu.it",
      "backup_path": "/var/backups/abu",
      "max_backups": 5,
      "health_check_url": "http://localhost:8080/health",
      "health_check_timeout_seconds": 10,
      "health_check_retries": 3
    },
    "server": {
      "host": "127.0.0.1",
      "port": 8080
    },
    "logging": {
      "level": "info",
      "file": "/var/log/abu-service/abu-service.log"
    },
    "updater": {
      "enabled": true,
      "check_interval_seconds": 3600,
      "auto_update": false
    }
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Configuration retrieved successfully

### Deployment Management

#### GET /deployments

List all deployments with their status and metadata.

**Query Parameters:**
- `limit` (optional) - Maximum number of deployments to return (default: 50)
- `status` (optional) - Filter by deployment status (`completed`, `failed`, `in_progress`)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "deploy_20240115_103000",
      "timestamp": "2024-01-15T10:30:00Z",
      "version": "v1.2.0",
      "status": "completed",
      "repository": "your-username/abu-enterprise",
      "duration_seconds": 45,
      "health_check_passed": true
    },
    {
      "id": "deploy_20240114_143000",
      "timestamp": "2024-01-14T14:30:00Z",
      "version": "v1.1.0",
      "status": "completed",
      "repository": "your-username/abu-enterprise",
      "duration_seconds": 38,
      "health_check_passed": true
    }
  ],
  "error": null
}
```

**Status Codes:**
- `200 OK` - Deployments retrieved successfully

---

#### POST /deployments

Trigger a new deployment.

**Request Body:**
```json
{
  "repository": "your-username/abu-enterprise",
  "tag": "v1.3.0"
}
```

**Request Fields:**
- `repository` (required) - GitHub repository in format `owner/repo`
- `tag` (optional) - Specific release tag to deploy (defaults to latest)

**Response:**
```json
{
  "success": true,
  "data": {
    "deployment_id": "deploy_20240115_150000",
    "status": "triggered",
    "message": "Deployment triggered successfully"
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Deployment triggered successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Missing or invalid authentication
- `500 Internal Server Error` - Deployment failed to start

---

#### GET /deployments/\{id\}

Get detailed information about a specific deployment.

**Path Parameters:**
- `id` - Deployment ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "deploy_20240115_103000",
    "timestamp": "2024-01-15T10:30:00Z",
    "version": "v1.2.0",
    "status": "completed",
    "repository": "your-username/abu-enterprise",
    "duration_seconds": 45,
    "health_check_passed": true,
    "steps": [
      {
        "name": "download",
        "status": "completed",
        "duration_seconds": 5,
        "message": "Downloaded release assets successfully"
      },
      {
        "name": "backup",
        "status": "completed",
        "duration_seconds": 3,
        "message": "Created backup of current deployment"
      },
      {
        "name": "deploy",
        "status": "completed",
        "duration_seconds": 25,
        "message": "Deployed new version successfully"
      },
      {
        "name": "health_check",
        "status": "completed",
        "duration_seconds": 12,
        "message": "Health check passed"
      }
    ],
    "logs": [
      {
        "timestamp": "2024-01-15T10:30:05Z",
        "level": "INFO",
        "message": "Starting deployment of v1.2.0"
      },
      {
        "timestamp": "2024-01-15T10:30:10Z",
        "level": "INFO",
        "message": "Downloaded release assets (2.3MB)"
      }
    ]
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Deployment details retrieved successfully
- `404 Not Found` - Deployment not found

### Logs & Monitoring

#### GET /logs

Retrieve service logs with optional filtering.

**Query Parameters:**
- `level` (optional) - Filter by log level (`error`, `warn`, `info`, `debug`, `trace`)
- `limit` (optional) - Maximum number of log entries to return (default: 100)
- `since` (optional) - ISO 8601 timestamp to filter logs since a specific time
- `until` (optional) - ISO 8601 timestamp to filter logs until a specific time

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "timestamp": "2024-01-15T10:30:00Z",
      "level": "INFO",
      "message": "Service started successfully",
      "module": "main"
    },
    {
      "timestamp": "2024-01-15T10:29:45Z",
      "level": "DEBUG",
      "message": "Loading configuration from /etc/abu-service/config.toml",
      "module": "config"
    },
    {
      "timestamp": "2024-01-15T10:29:30Z",
      "level": "WARN",
      "message": "GitHub API rate limit approaching (80% used)",
      "module": "github"
    }
  ],
  "error": null
}
```

**Status Codes:**
- `200 OK` - Logs retrieved successfully

### Admin Operations

#### POST /admin/update

Trigger a service update to the latest version.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Update triggered successfully",
    "current_version": "1.0.0",
    "latest_version": "1.1.0"
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Update triggered successfully
- `401 Unauthorized` - Missing or invalid authentication
- `409 Conflict` - Update already in progress
- `500 Internal Server Error` - Update failed to start

---

#### POST /admin/restart

Restart the service.

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Service restart triggered successfully"
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Restart triggered successfully
- `401 Unauthorized` - Missing or invalid authentication
- `500 Internal Server Error` - Restart failed

### Webhook

#### POST /webhook

GitHub webhook endpoint for automatic deployments.

**Headers:**
- `X-Hub-Signature-256` - HMAC-SHA256 signature of the payload
- `X-GitHub-Event` - GitHub event type (e.g., `release`)

**Request Body:**
GitHub webhook payload (varies by event type).

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Webhook processed successfully",
    "event_type": "release",
    "repository": "your-username/abu-enterprise",
    "action": "published"
  },
  "error": null
}
```

**Status Codes:**
- `200 OK` - Webhook processed successfully
- `400 Bad Request` - Invalid webhook payload or signature
- `401 Unauthorized` - Invalid webhook signature
- `500 Internal Server Error` - Webhook processing failed

## Error Handling

### Common Error Codes

- `400 Bad Request` - Invalid request parameters or malformed JSON
- `401 Unauthorized` - Missing or invalid authentication token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., deployment already in progress)
- `429 Too Many Requests` - Rate limit exceeded
- `500 Internal Server Error` - Internal server error
- `503 Service Unavailable` - Service temporarily unavailable

### Error Response Format

```json
{
  "success": false,
  "data": null,
  "error": "Detailed error message describing what went wrong"
}
```

## Rate Limiting

The API implements rate limiting to prevent abuse:

- **General endpoints**: 100 requests per minute per IP
- **Admin endpoints**: 10 requests per minute per IP
- **Webhook endpoint**: 50 requests per minute per IP

Rate limit headers are included in responses:

```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642248000
```

## WebSocket Support

For real-time updates, the service supports WebSocket connections:

### WebSocket Endpoint

```
ws://localhost:8080/ws
wss://api.abu.it/ws
```

### WebSocket Events

#### Deployment Status Updates

```json
{
  "type": "deployment_status",
  "data": {
    "deployment_id": "deploy_20240115_103000",
    "status": "in_progress",
    "step": "deploy",
    "progress": 75
  }
}
```

#### Service Health Updates

```json
{
  "type": "health_update",
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

## SDK Examples

### JavaScript/Node.js

```javascript
const axios = require('axios');

class AbuServiceClient {
  constructor(baseUrl, adminToken) {
    this.client = axios.create({
      baseURL: baseUrl,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async getStatus() {
    const response = await this.client.get('/status');
    return response.data;
  }

  async triggerDeployment(repository, tag = null) {
    const response = await this.client.post('/deployments', {
      repository,
      tag
    });
    return response.data;
  }

  async getDeployments(limit = 50) {
    const response = await this.client.get(`/deployments?limit=${limit}`);
    return response.data;
  }
}

// Usage
const client = new AbuServiceClient('https://api.abu.it', 'your_admin_token');
const status = await client.getStatus();
console.log(status);
```

### Python

```python
import requests
from typing import Optional, Dict, Any

class AbuServiceClient:
    def __init__(self, base_url: str, admin_token: str):
        self.base_url = base_url
        self.headers = {
            'Authorization': f'Bearer {admin_token}',
            'Content-Type': 'application/json'
        }

    def get_status(self) -> Dict[str, Any]:
        response = requests.get(f'{self.base_url}/status', headers=self.headers)
        response.raise_for_status()
        return response.json()

    def trigger_deployment(self, repository: str, tag: Optional[str] = None) -> Dict[str, Any]:
        payload = {'repository': repository}
        if tag:
            payload['tag'] = tag
        
        response = requests.post(f'{self.base_url}/deployments', 
                               json=payload, headers=self.headers)
        response.raise_for_status()
        return response.json()

    def get_deployments(self, limit: int = 50) -> Dict[str, Any]:
        response = requests.get(f'{self.base_url}/deployments?limit={limit}', 
                              headers=self.headers)
        response.raise_for_status()
        return response.json()

# Usage
client = AbuServiceClient('https://api.abu.it', 'your_admin_token')
status = client.get_status()
print(status)
```

### cURL Examples

```bash
# Get service status
curl -H "Authorization: Bearer your_admin_token" \
     https://api.abu.it/status

# Trigger deployment
curl -X POST \
     -H "Authorization: Bearer your_admin_token" \
     -H "Content-Type: application/json" \
     -d '{"repository": "your-username/abu-enterprise", "tag": "v1.3.0"}' \
     https://api.abu.it/deployments

# Get deployment history
curl -H "Authorization: Bearer your_admin_token" \
     https://api.abu.it/deployments?limit=10

# Get logs
curl -H "Authorization: Bearer your_admin_token" \
     https://api.abu.it/logs?level=error&limit=50

# Trigger service update
curl -X POST \
     -H "Authorization: Bearer your_admin_token" \
     https://api.abu.it/admin/update
```

## Testing

### Health Check Script

```bash
#!/bin/bash

API_URL="https://api.abu.it"
ADMIN_TOKEN="your_admin_token"

# Check if service is healthy
echo "Checking service health..."
curl -s "$API_URL/health" | jq -r '.data'

# Get service status
echo "Getting service status..."
curl -s -H "Authorization: Bearer $ADMIN_TOKEN" \
     "$API_URL/status" | jq '.'

# Test deployment trigger
echo "Testing deployment trigger..."
curl -s -X POST \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"repository": "your-username/abu-enterprise"}' \
     "$API_URL/deployments" | jq '.'
```

## Security Considerations

1. **Always use HTTPS** in production
2. **Rotate admin tokens** regularly
3. **Monitor API usage** for unusual patterns
4. **Validate webhook signatures** to prevent unauthorized deployments
5. **Use strong, unique tokens** for authentication
6. **Implement proper logging** for audit trails
7. **Regular security updates** of the service and dependencies

## Changelog

### v1.0.0
- Initial API release
- Basic deployment management
- Health monitoring
- Admin operations
- Webhook support

---

For more information, see the [main documentation](../README.md) or [GitHub repository](https://github.com/your-username/abu-service).
