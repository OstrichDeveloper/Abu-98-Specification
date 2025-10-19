---
id: installation
title: Installation
---

# Abu Service Deployment Guide

This guide covers deploying the Abu Service to a Raspberry Pi and setting up the complete infrastructure for automatic deployment of the Abu Enterprise web application.

## 🎯 Overview

The deployment consists of several components:

1. **Abu Service** - Rust-based deployment automation service
2. **Caddy** - Web server and reverse proxy with automatic SSL
3. **Systemd** - Service management and auto-start
4. **GitHub Actions** - CI/CD pipelines for all repositories
5. **Domain Configuration** - DNS setup for `abu.it` and `api.abu.it`

## 📋 Prerequisites

### Hardware Requirements

- **Raspberry Pi 4** (4GB RAM recommended)
- **32GB+ microSD card** (Class 10 or better)
- **Stable internet connection**
- **Domain name** pointing to your Pi's IP

### Software Requirements

- **Raspberry Pi OS** (64-bit recommended)
- **Git** for cloning repositories
- **curl** for downloading files
- **sudo** access for system configuration

### GitHub Setup

1. **Create GitHub repositories**:
   - `abu-web-kernel` (private NPM package)
   - `abu-enterprise` (private web application)
   - `abu-service` (private Rust service)

2. **Generate GitHub Personal Access Token**:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Create token with `repo` scope
   - Save the token securely

3. **Set up GitHub webhook**:
   - Go to repository settings → Webhooks
   - Add webhook URL: `https://api.abu.it/webhook`
   - Select "Releases" events
   - Generate and save webhook secret

## 🚀 Quick Deployment

### Option 1: Automated Installation

```bash
# Download and run the installation script
curl -fsSL https://raw.githubusercontent.com/your-username/abu-service/main/scripts/install.sh | sudo bash

# Configure environment variables
sudo cp /etc/abu-service/.env.template /etc/abu-service/.env
sudo nano /etc/abu-service/.env

# Download and start the service
sudo /opt/abu-service/bootstrap.sh
```

### Option 2: Manual Installation

Follow the detailed steps below for manual installation.

## 🔧 Manual Installation Steps

### Step 1: System Preparation

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install required packages
sudo apt install -y curl git systemd ufw

# Configure firewall
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw --force enable
```

### Step 2: Install Caddy

```bash
# Add Caddy repository
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list

# Install Caddy
sudo apt update
sudo apt install -y caddy

# Enable and start Caddy
sudo systemctl enable caddy
sudo systemctl start caddy
```

### Step 3: Create Service User

```bash
# Create dedicated user for abu-service
sudo useradd -r -s /bin/false -d /opt/abu-service abu-service

# Create necessary directories
sudo mkdir -p /opt/abu-service
sudo mkdir -p /etc/abu-service
sudo mkdir -p /var/log/abu-service
sudo mkdir -p /var/www/abu.it
sudo mkdir -p /var/backups/abu

# Set ownership
sudo chown -R abu-service:abu-service /opt/abu-service
sudo chown -R abu-service:abu-service /var/log/abu-service
sudo chown -R www-data:www-data /var/www/abu.it
sudo chown -R www-data:www-data /var/backups/abu
```

### Step 4: Download and Install Abu Service

```bash
# Download the latest release
cd /tmp
curl -s https://api.github.com/repos/your-username/abu-service/releases/latest | \
  grep "browser_download_url.*abu-service" | \
  cut -d : -f 2,3 | tr -d \" | \
  wget -qi -

# Install binary
sudo mv abu-service /opt/abu-service/
sudo chmod +x /opt/abu-service/abu-service
sudo chown abu-service:abu-service /opt/abu-service/abu-service
```

### Step 5: Configure Abu Service

```bash
# Create configuration file
sudo tee /etc/abu-service/config.toml > /dev/null <<EOF
[github]
enterprise_repo = "your-username/abu-enterprise"
service_repo = "your-username/abu-service"
token_env = "GITHUB_TOKEN"
poll_interval_seconds = 900

[webhook]
enabled = true
secret_env = "GITHUB_WEBHOOK_SECRET"
path = "/webhook"

[deployment]
deploy_path = "/var/www/abu.it"
backup_path = "/var/backups/abu"
max_backups = 5
health_check_url = "http://localhost:8080/health"
health_check_timeout_seconds = 10
health_check_retries = 3

[server]
host = "127.0.0.1"
port = 8080
admin_token_env = "ADMIN_TOKEN"

[logging]
level = "info"
file = "/var/log/abu-service/abu-service.log"

[updater]
enabled = true
check_interval_seconds = 3600
auto_update = false
EOF

# Create environment file
sudo tee /etc/abu-service/.env > /dev/null <<EOF
GITHUB_TOKEN=your_github_token_here
GITHUB_WEBHOOK_SECRET=your_webhook_secret_here
ADMIN_TOKEN=your_admin_token_here
EOF

# Set proper permissions
sudo chown abu-service:abu-service /etc/abu-service/config.toml
sudo chown abu-service:abu-service /etc/abu-service/.env
sudo chmod 600 /etc/abu-service/.env
```

### Step 6: Create Systemd Service

```bash
# Create systemd service file
sudo tee /etc/systemd/system/abu-service.service > /dev/null <<EOF
[Unit]
Description=Abu Service - Deployment Automation
After=network.target

[Service]
Type=simple
User=abu-service
Group=abu-service
ExecStart=/opt/abu-service/abu-service --config /etc/abu-service/config.toml
WorkingDirectory=/opt/abu-service
Environment="RUST_LOG=info"
EnvironmentFile=/etc/abu-service/.env
Restart=always
RestartSec=5
StandardOutput=append:/var/log/abu-service/stdout.log
StandardError=append:/var/log/abu-service/stderr.log

[Install]
WantedBy=multi-user.target
EOF

# Reload systemd and enable service
sudo systemctl daemon-reload
sudo systemctl enable abu-service
```

### Step 7: Configure Caddy

```bash
# Create Caddyfile
sudo tee /etc/caddy/Caddyfile > /dev/null <<EOF
{
    email your-email@example.com
}

abu.it {
    root * /var/www/abu.it
    file_server
    
    encode gzip

    log {
        output file /var/log/abu-service/caddy_abu_it.log
    }
}

api.abu.it {
    reverse_proxy localhost:8080 {
        header_up Host {host}
        header_up X-Real-IP {remote_ip}
        header_up X-Forwarded-For {remote_ip}
        header_up X-Forwarded-Proto {scheme}
    }
    
    log {
        output file /var/log/abu-service/caddy_api.log
    }
}

health.abu.it {
    reverse_proxy localhost:8080/health {
        header_up Host {host}
        header_up X-Real-IP {remote_ip}
        header_up X-Forwarded-For {remote_ip}
        header_up X-Forwarded-Proto {scheme}
    }
    
    log {
        output file /var/log/abu-service/caddy_health.log
    }
}
EOF

# Test Caddy configuration
sudo caddy validate --config /etc/caddy/Caddyfile

# Reload Caddy
sudo systemctl reload caddy
```

### Step 8: Start Services

```bash
# Start Abu Service
sudo systemctl start abu-service

# Check service status
sudo systemctl status abu-service

# Check logs
sudo journalctl -u abu-service -f
```

## 🔐 Security Configuration

### SSL Certificates

Caddy automatically handles SSL certificates using Let's Encrypt. Ensure your domain points to your Pi's IP address:

```bash
# Check DNS resolution
nslookup abu.it
nslookup api.abu.it
nslookup health.abu.it
```

### Firewall Rules

```bash
# Check firewall status
sudo ufw status

# Allow only necessary ports
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw deny 8080/tcp  # Block direct access to service port
```

### Service Isolation

```bash
# Create systemd override for additional security
sudo systemctl edit abu-service

# Add the following content:
[Service]
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=/var/log/abu-service /var/www/abu.it /var/backups/abu
```

## 📊 Monitoring Setup

### Log Rotation

```bash
# Create logrotate configuration
sudo tee /etc/logrotate.d/abu-service > /dev/null <<EOF
/var/log/abu-service/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 abu-service abu-service
    postrotate
        systemctl reload abu-service
    endscript
}
EOF
```

### Health Monitoring Script

```bash
# Create health check script
sudo tee /opt/abu-service/health-check.sh > /dev/null <<EOF
#!/bin/bash

API_URL="https://api.abu.it"
ADMIN_TOKEN="your_admin_token_here"

# Check if service is responding
if ! curl -s -f "$API_URL/health" > /dev/null; then
    echo "ERROR: Abu Service health check failed"
    systemctl restart abu-service
    exit 1
fi

# Check if website is accessible
if ! curl -s -f "https://abu.it" > /dev/null; then
    echo "ERROR: Website is not accessible"
    exit 1
fi

echo "All health checks passed"
exit 0
EOF

sudo chmod +x /opt/abu-service/health-check.sh

# Add to crontab for regular health checks
echo "*/5 * * * * /opt/abu-service/health-check.sh" | sudo crontab -
```

## 🔄 GitHub Actions Setup

### 1. Abu Web Kernel Workflow

Create `.github/workflows/ci.yml` in the `abu-web-kernel` repository:

```yaml
name: Abu Web Kernel CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  WORKING_DIRECTORY: .

jobs:
  build-and-release:
    name: Build and Release NPM Package
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Install dependencies
        run: npm install

      - name: Run tests
        run: npm test

      - name: Build NPM package
        run: npm run build

      - name: Pack NPM package
        id: pack_package
        run: |
          PACKAGE_NAME=$(node -p "require('./package.json').name")
          PACKAGE_VERSION=$(node -p "require('./package.json').version")
          npm pack
          echo "PACKAGE_FILE=${PACKAGE_NAME}-${PACKAGE_VERSION}.tgz" >> $GITHUB_OUTPUT

      - name: Upload package artifact
        uses: actions/upload-artifact@v4
        with:
          name: abu-web-kernel-package
          path: ${{ steps.pack_package.outputs.PACKAGE_FILE }}
          retention-days: 1

      - name: Create GitHub Release
        if: github.ref == 'refs/heads/main'
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v${{ steps.pack_package.outputs.PACKAGE_VERSION }}
          name: Abu Web Kernel v${{ steps.pack_package.outputs.PACKAGE_VERSION }}
          files: ${{ steps.pack_package.outputs.PACKAGE_FILE }}
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 2. Abu Enterprise Workflow

Create `.github/workflows/ci.yml` in the `abu-enterprise` repository:

```yaml
name: Abu Enterprise CI/CD

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

env:
  NODE_VERSION: '20'
  WORKING_DIRECTORY: .

jobs:
  build-and-release:
    name: Build and Release Web App
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: 'npm'

      - name: Download abu-web-kernel artifact
        uses: actions/download-artifact@v4
        with:
          name: abu-web-kernel-package
          path: ./abu-web-kernel

      - name: Install dependencies
        run: npm install

      - name: Link abu-web-kernel locally
        run: npm install ./abu-web-kernel/abu-web-kernel-*.tgz

      - name: Build web application
        run: npm run build

      - name: Zip build output
        run: |
          cd dist
          zip -r ../abu-enterprise.zip .

      - name: Create GitHub Release
        if: github.ref == 'refs/heads/main'
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v${{ github.run_number }}
          name: Abu Enterprise v${{ github.run_number }}
          files: abu-enterprise.zip
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### 3. Abu Service Workflow

The `abu-service` repository already has the workflow configured in `.github/workflows/ci.yml`.

## 🧪 Testing the Deployment

### 1. Test Service Health

```bash
# Check if service is running
sudo systemctl status abu-service

# Test health endpoint
curl https://api.abu.it/health

# Test status endpoint
curl -H "Authorization: Bearer your_admin_token" https://api.abu.it/status
```

### 2. Test Website

```bash
# Check if website is accessible
curl -I https://abu.it

# Test SSL certificate
openssl s_client -connect abu.it:443 -servername abu.it
```

### 3. Test Deployment

```bash
# Trigger a test deployment
curl -X POST \
     -H "Authorization: Bearer your_admin_token" \
     -H "Content-Type: application/json" \
     -d '{"repository": "your-username/abu-enterprise"}' \
     https://api.abu.it/deployments
```

### 4. Test Webhook

```bash
# Test webhook endpoint (this will fail signature verification, but should return 400, not 500)
curl -X POST https://api.abu.it/webhook \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
```

## 🔧 Maintenance

### Regular Maintenance Tasks

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Check service logs
sudo journalctl -u abu-service --since "1 day ago"

# Check disk usage
df -h

# Check service status
sudo systemctl status abu-service caddy

# Rotate logs
sudo logrotate -f /etc/logrotate.d/abu-service
```

### Backup and Recovery

```bash
# Create backup script
sudo tee /opt/abu-service/backup.sh > /dev/null <<EOF
#!/bin/bash

BACKUP_DIR="/var/backups/abu-service"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p "$BACKUP_DIR"

# Backup configuration
tar -czf "$BACKUP_DIR/config_$DATE.tar.gz" /etc/abu-service

# Backup logs
tar -czf "$BACKUP_DIR/logs_$DATE.tar.gz" /var/log/abu-service

# Backup website
tar -czf "$BACKUP_DIR/website_$DATE.tar.gz" /var/www/abu.it

# Clean old backups (keep 7 days)
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete

echo "Backup completed: $DATE"
EOF

sudo chmod +x /opt/abu-service/backup.sh

# Add to crontab for daily backups
echo "0 2 * * * /opt/abu-service/backup.sh" | sudo crontab -
```

### Service Updates

```bash
# Create update script
sudo tee /opt/abu-service/update.sh > /dev/null <<EOF
#!/bin/bash

set -e

echo "Updating Abu Service..."

# Stop service
sudo systemctl stop abu-service

# Download latest release
cd /tmp
curl -s https://api.github.com/repos/your-username/abu-service/releases/latest | \
  grep "browser_download_url.*abu-service" | \
  cut -d : -f 2,3 | tr -d \" | \
  wget -qi -

# Backup current binary
sudo cp /opt/abu-service/abu-service /opt/abu-service/abu-service.backup

# Install new binary
sudo mv abu-service /opt/abu-service/
sudo chmod +x /opt/abu-service/abu-service
sudo chown abu-service:abu-service /opt/abu-service/abu-service

# Start service
sudo systemctl start abu-service

# Verify update
sleep 5
if sudo systemctl is-active --quiet abu-service; then
    echo "Update successful!"
    sudo rm /opt/abu-service/abu-service.backup
else
    echo "Update failed, rolling back..."
    sudo mv /opt/abu-service/abu-service.backup /opt/abu-service/abu-service
    sudo systemctl start abu-service
    exit 1
fi
EOF

sudo chmod +x /opt/abu-service/update.sh
```

## 🚨 Troubleshooting

### Common Issues

#### Service Won't Start

```bash
# Check logs
sudo journalctl -u abu-service -f

# Check configuration
sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config

# Check permissions
ls -la /opt/abu-service/
ls -la /etc/abu-service/
```

#### SSL Certificate Issues

```bash
# Check Caddy logs
sudo journalctl -u caddy -f

# Test certificate
sudo caddy validate --config /etc/caddy/Caddyfile

# Force certificate renewal
sudo caddy reload --config /etc/caddy/Caddyfile
```

#### Deployment Failures

```bash
# Check deployment logs
curl -H "Authorization: Bearer your_admin_token" https://api.abu.it/logs

# Check GitHub token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Test webhook
curl -X POST https://api.abu.it/webhook \
     -H "X-Hub-Signature-256: sha256=test" \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
```

### Performance Optimization

```bash
# Monitor resource usage
htop

# Check disk I/O
iotop

# Monitor network
iftop

# Check memory usage
free -h

# Check swap usage
swapon -s
```

## 📈 Scaling Considerations

### High Availability

For production deployments, consider:

1. **Load Balancer**: Use a load balancer in front of multiple Pi instances
2. **Database**: Add a database for persistent deployment history
3. **Monitoring**: Implement comprehensive monitoring with Prometheus/Grafana
4. **Backup Strategy**: Implement automated backups to cloud storage
5. **Disaster Recovery**: Create disaster recovery procedures

### Performance Tuning

```bash
# Optimize system for web serving
echo 'net.core.somaxconn = 65535' | sudo tee -a /etc/sysctl.conf
echo 'net.ipv4.tcp_max_syn_backlog = 65535' | sudo tee -a /etc/sysctl.conf
sudo sysctl -p

# Optimize Caddy
sudo tee -a /etc/caddy/Caddyfile > /dev/null <<EOF
{
    servers {
        read_timeout 30s
        read_header_timeout 10s
        write_timeout 30s
        idle_timeout 60s
    }
}
EOF
```

## 📚 Additional Resources

- [Abu Service API Documentation](../api/endpoints.md)
- [Caddy Documentation](https://caddyserver.com/docs/)
- [Systemd Documentation](https://systemd.io/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Raspberry Pi Documentation](https://www.raspberrypi.org/documentation/)

---

For support and questions, please refer to the [GitHub repository](https://github.com/your-username/abu-service) or create an issue.
