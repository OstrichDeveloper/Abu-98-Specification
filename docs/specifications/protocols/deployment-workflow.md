---
id: deployment-workflow
title: Deployment Workflow
---

# Abu Service Deployment Workflow

This document explains the complete deployment process from making changes to the OS kernel package and enterprise package through the Abu Service automation system.

## 🔄 **Workflow Overview**

```
Developer → GitHub → GitHub Actions → Abu Service → Raspberry Pi
    ↓           ↓           ↓              ↓            ↓
  Code      Repository   CI/CD         Deployment    Live Site
 Changes    Push        Pipeline      Automation    (abu.it)
```

## 📦 **Scenario 1: OS Kernel Package Changes**

### Step-by-Step Process

#### 1. **Developer Makes Changes**
```bash
# Developer works on abu-web-kernel
cd abu-web-kernel/
# Make changes to kernel components
vim src/components/WindowManager.svelte
vim src/lib/plugins/ssh-terminal/index.ts
# Update version in package.json
vim package.json  # "version": "1.2.0"
```

#### 2. **Commit and Push to GitHub**
```bash
git add .
git commit -m "feat: Add new SSH terminal plugin and window management improvements"
git push origin main
```

#### 3. **GitHub Actions Triggers (abu-web-kernel)**
```yaml
# .github/workflows/ci.yml in abu-web-kernel repository
name: Abu Web Kernel CI/CD

on:
  push:
    branches: [main, develop]

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run tests
        run: npm test
      
      - name: Build NPM package
        run: npm run build
      
      - name: Pack NPM package
        run: npm pack
      
      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v1.2.0
          name: Abu Web Kernel v1.2.0
          files: abu-web-kernel-1.2.0.tgz
```

#### 4. **GitHub Release Created**
- **Repository**: `abu-web-kernel`
- **Tag**: `v1.2.0`
- **Asset**: `abu-web-kernel-1.2.0.tgz`
- **Webhook**: Triggers to notify dependent repositories

#### 5. **Abu Service Detects New Kernel Release**
```rust
// Abu Service background polling (every 15 minutes)
async fn check_for_updates() {
    let latest_kernel = github_client.get_latest_release("mo", "abu-web-kernel").await?;
    if latest_kernel.tag_name != current_kernel_version {
        log::info!("New kernel version detected: {}", latest_kernel.tag_name);
        // Notify enterprise repository to rebuild
        trigger_enterprise_rebuild(&latest_kernel).await?;
    }
}
```

#### 6. **Enterprise Repository Auto-Update**
The Abu Service can trigger an enterprise rebuild by:
- Creating a pull request with updated kernel dependency
- Triggering enterprise repository's GitHub Actions
- Or waiting for manual enterprise update

---

## 🏢 **Scenario 2: Enterprise Package Changes**

### Step-by-Step Process

#### 1. **Developer Updates Enterprise Package**
```bash
# Developer works on abu-enterprise
cd abu-enterprise/
# Update kernel dependency to latest version
npm install abu-web-kernel@1.2.0
# Make enterprise-specific changes
vim src/pages/Dashboard.svelte
vim src/components/EnterpriseFeatures.svelte
# Update version
vim package.json  # "version": "2.1.0"
```

#### 2. **Commit and Push to GitHub**
```bash
git add .
git commit -m "feat: Update to kernel v1.2.0 and add new dashboard features"
git push origin main
```

#### 3. **GitHub Actions Triggers (abu-enterprise)**
```yaml
# .github/workflows/ci.yml in abu-enterprise repository
name: Abu Enterprise CI/CD

on:
  push:
    branches: [main, develop]

jobs:
  build-and-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
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
        uses: softprops/action-gh-release@v2
        with:
          tag_name: v2.1.0
          name: Abu Enterprise v2.1.0
          files: abu-enterprise.zip
```

#### 4. **GitHub Release Created**
- **Repository**: `abu-enterprise`
- **Tag**: `v2.1.0`
- **Asset**: `abu-enterprise.zip`
- **Webhook**: Triggers to Abu Service

#### 5. **Abu Service Receives Webhook**
```rust
// Webhook handler in Abu Service
async fn handle_webhook(payload: WebhookPayload) -> Result<()> {
    if payload.is_release_event() && payload.is_for_repository("mo/abu-enterprise") {
        let release = payload.get_release()?;
        log::info!("New enterprise release detected: {}", release.tag_name);
        
        // Trigger deployment
        let deployment_id = deployer.deploy_release(&release).await?;
        log::info!("Deployment started: {}", deployment_id);
    }
    Ok(())
}
```

#### 6. **Abu Service Downloads and Deploys**
```rust
// Deployment process
async fn deploy_release(release: &Release) -> Result<String> {
    let deployment_id = generate_deployment_id();
    
    // 1. Download release assets
    let temp_dir = downloader.download_release(release).await?;
    
    // 2. Create backup of current deployment
    let backup_path = deployer.create_backup().await?;
    
    // 3. Extract and deploy new version
    deployer.deploy(&temp_dir).await?;
    
    // 4. Verify deployment
    let health_ok = health_checker.check_health().await?;
    if !health_ok {
        // Rollback on failure
        deployer.rollback(&backup_path).await?;
        return Err(anyhow!("Deployment failed health check"));
    }
    
    // 5. Cleanup old backups
    deployer.cleanup_old_backups().await?;
    
    Ok(deployment_id)
}
```

#### 7. **Deployment Process Details**

**Step 7a: Download Release**
```bash
# Abu Service downloads from GitHub
curl -L -H "Authorization: token $GITHUB_TOKEN" \
     "https://api.github.com/repos/mo/abu-enterprise/releases/assets/12345" \
     -o /tmp/abu-enterprise-v2.1.0.zip
```

**Step 7b: Create Backup**
```bash
# Backup current deployment
cp -r /var/www/abu.it /var/backups/abu.it/backup_20241015_143000
```

**Step 7c: Deploy New Version**
```bash
# Extract new version
unzip /tmp/abu-enterprise-v2.1.0.zip -d /tmp/extract/
# Copy to web directory
cp -r /tmp/extract/* /var/www/abu.it/
# Set permissions
chown -R www-data:www-data /var/www/abu.it
```

**Step 7d: Health Check**
```bash
# Verify deployment
curl -f http://localhost:8080/health
# Check website
curl -f https://abu.it
```

**Step 7e: Cleanup**
```bash
# Remove old backups (keep last 5)
ls -t /var/backups/abu.it/ | tail -n +6 | xargs rm -rf
# Clean temporary files
rm -rf /tmp/abu-enterprise-v2.1.0.zip /tmp/extract/
```

#### 8. **Caddy Serves New Content**
```caddyfile
# Caddy automatically serves the new content
abu.it {
    root * /var/www/abu.it  # Now contains v2.1.0
    file_server
    encode gzip
}
```

#### 9. **Users See Updated Site**
- **URL**: `https://abu.it`
- **Content**: New dashboard features from v2.1.0
- **Kernel**: Updated SSH terminal plugin from v1.2.0

---

## 🔄 **Complete Workflow Timeline**

### Kernel Package Update (Scenario 1)
```
T+0:00  Developer commits kernel changes
T+0:30  GitHub Actions builds kernel package
T+1:00  GitHub release v1.2.0 created
T+1:15  Abu Service detects new kernel (polling)
T+1:30  Enterprise repository notified/updated
T+2:00  Enterprise rebuild triggered
T+3:00  Enterprise release v2.1.0 created
T+3:15  Abu Service receives webhook
T+3:30  Deployment process starts
T+4:00  New version live on abu.it
```

### Enterprise Package Update (Scenario 2)
```
T+0:00  Developer commits enterprise changes
T+0:30  GitHub Actions builds enterprise package
T+1:00  GitHub release v2.1.0 created
T+1:15  Abu Service receives webhook
T+1:30  Deployment process starts
T+2:00  New version live on abu.it
```

---

## 🛠️ **Abu Service API Endpoints Used**

### During Deployment Process
```bash
# 1. Check service status
curl https://api.abu.it/status

# 2. Monitor deployment progress
curl https://api.abu.it/deployments

# 3. View deployment logs
curl https://api.abu.it/logs

# 4. Manual deployment trigger (if needed)
curl -X POST https://api.abu.it/deployments \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"repository": "mo/abu-enterprise", "tag": "v2.1.0"}'
```

### Webhook Endpoint
```bash
# GitHub sends webhook to Abu Service
POST https://api.abu.it/webhook
Headers:
  X-Hub-Signature-256: sha256=...
  X-GitHub-Event: release
  Content-Type: application/json

Body:
{
  "action": "published",
  "release": {
    "tag_name": "v2.1.0",
    "name": "Abu Enterprise v2.1.0",
    "assets": [
      {
        "name": "abu-enterprise.zip",
        "download_url": "https://api.github.com/repos/mo/abu-enterprise/releases/assets/12345"
      }
    ]
  },
  "repository": {
    "full_name": "mo/abu-enterprise"
  }
}
```

---

## 🔍 **Monitoring and Troubleshooting**

### Deployment Monitoring
```bash
# Check deployment status
curl https://api.abu.it/deployments | jq '.[0]'

# View recent logs
curl https://api.abu.it/logs?limit=50 | jq '.[] | select(.message | contains("deployment"))'

# Check service health
curl https://api.abu.it/health
```

### Rollback Process
```bash
# If deployment fails, Abu Service automatically rolls back
# Manual rollback via API
curl -X POST https://api.abu.it/admin/rollback \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -d '{"deployment_id": "deploy_20241015_143000"}'
```

### Log Analysis
```bash
# Abu Service logs
journalctl -u abu-service -f

# Caddy logs
tail -f /var/log/abu-service/caddy_abu_it.log

# Deployment logs
curl https://api.abu.it/logs?level=error
```

---

## 🎯 **Key Benefits of This Workflow**

### 1. **Automated Deployment**
- No manual intervention required
- Consistent deployment process
- Reduced human error

### 2. **Atomic Deployments**
- Backup before deployment
- Rollback on failure
- Zero-downtime deployments

### 3. **Health Monitoring**
- Automatic health checks
- Failure detection and recovery
- Performance monitoring

### 4. **Version Management**
- Complete deployment history
- Easy rollback to previous versions
- Backup retention policies

### 5. **Security**
- Webhook signature verification
- Secure token management
- Audit logging

### 6. **Scalability**
- Can handle multiple deployments
- Concurrent deployment support
- Resource monitoring

---

## 🚀 **Production Deployment Commands**

### Initial Setup
```bash
# Deploy Abu Service to Raspberry Pi
curl -fsSL https://raw.githubusercontent.com/mo/abu-service/main/scripts/install.sh | sudo bash

# Configure environment
sudo nano /etc/abu-service/.env
# Add: GITHUB_TOKEN, GITHUB_WEBHOOK_SECRET, ADMIN_TOKEN

# Start services
sudo systemctl start abu-service
sudo systemctl start caddy
```

### Monitoring
```bash
# Check service status
sudo systemctl status abu-service

# View logs
sudo journalctl -u abu-service -f

# Test endpoints
curl https://api.abu.it/health
curl https://abu.it
```

### Maintenance
```bash
# Update Abu Service itself
sudo /opt/abu-service/update.sh

# Manual deployment
curl -X POST https://api.abu.it/deployments \
     -H "Authorization: Bearer $ADMIN_TOKEN" \
     -H "Content-Type: application/json" \
     -d '{"repository": "mo/abu-enterprise"}'
```

---

This workflow ensures that any changes to either the OS kernel package or enterprise package are automatically built, tested, and deployed to the Raspberry Pi with full monitoring, backup, and rollback capabilities.
