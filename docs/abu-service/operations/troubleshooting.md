---
id: troubleshooting
title: Troubleshooting
---

# Abu Service Troubleshooting Guide

This guide helps diagnose and resolve common issues with the Abu Service deployment.

## 🔍 Quick Diagnostics

### Service Status Check

```bash
# Check all service statuses
sudo systemctl status abu-service caddy

# Check if ports are listening
sudo netstat -tlnp | grep -E ':(80|443|8080)'

# Check if processes are running
ps aux | grep -E '(abu-service|caddy)'
```

### Health Check Script

```bash
#!/bin/bash
# Save as /opt/abu-service/diagnostics.sh

echo "=== Abu Service Diagnostics ==="
echo "Timestamp: $(date)"
echo

echo "1. Service Status:"
sudo systemctl is-active abu-service && echo "✓ Abu Service: Active" || echo "✗ Abu Service: Inactive"
sudo systemctl is-active caddy && echo "✓ Caddy: Active" || echo "✗ Caddy: Inactive"
echo

echo "2. Port Status:"
netstat -tlnp | grep -E ':(80|443|8080)' || echo "✗ No services listening on expected ports"
echo

echo "3. Disk Space:"
df -h | grep -E '(/$|/var)'
echo

echo "4. Memory Usage:"
free -h
echo

echo "5. Recent Logs:"
echo "--- Abu Service Logs (last 10 lines) ---"
sudo journalctl -u abu-service -n 10 --no-pager
echo

echo "--- Caddy Logs (last 10 lines) ---"
sudo journalctl -u caddy -n 10 --no-pager
echo

echo "6. Configuration Check:"
if [ -f /etc/abu-service/config.toml ]; then
    echo "✓ Config file exists"
    sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config 2>&1 || echo "✗ Config validation failed"
else
    echo "✗ Config file missing"
fi
echo

echo "7. Network Connectivity:"
ping -c 1 github.com > /dev/null && echo "✓ GitHub reachable" || echo "✗ GitHub unreachable"
ping -c 1 api.github.com > /dev/null && echo "✓ GitHub API reachable" || echo "✗ GitHub API unreachable"
echo

echo "8. SSL Certificate Status:"
if [ -f /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/abu.it/abu.it.crt ]; then
    echo "✓ SSL certificate exists"
    openssl x509 -in /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/abu.it/abu.it.crt -text -noout | grep "Not After"
else
    echo "✗ SSL certificate missing"
fi
echo

echo "=== End Diagnostics ==="
```

## 🚨 Common Issues and Solutions

### 1. Service Won't Start

#### Symptoms
- `systemctl status abu-service` shows failed
- Service exits immediately after start
- No logs in journalctl

#### Diagnosis
```bash
# Check service status
sudo systemctl status abu-service -l

# Check logs
sudo journalctl -u abu-service -f

# Check configuration
sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config

# Check file permissions
ls -la /opt/abu-service/abu-service
ls -la /etc/abu-service/
```

#### Solutions

**Configuration Error:**
```bash
# Validate configuration
sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config

# Fix common config issues
sudo nano /etc/abu-service/config.toml
```

**Permission Issues:**
```bash
# Fix ownership
sudo chown -R abu-service:abu-service /opt/abu-service
sudo chown -R abu-service:abu-service /var/log/abu-service
sudo chmod +x /opt/abu-service/abu-service
```

**Missing Dependencies:**
```bash
# Check if binary is executable
file /opt/abu-service/abu-service

# Check shared libraries
ldd /opt/abu-service/abu-service

# Install missing dependencies
sudo apt update
sudo apt install -y libc6 libssl3
```

**Environment Variables:**
```bash
# Check environment file
sudo cat /etc/abu-service/.env

# Test with environment variables
sudo -u abu-service env $(cat /etc/abu-service/.env | xargs) /opt/abu-service/abu-service --config /etc/abu-service/config.toml
```

### 2. SSL Certificate Issues

#### Symptoms
- Website shows "Not Secure" in browser
- Caddy logs show certificate errors
- Let's Encrypt rate limiting errors

#### Diagnosis
```bash
# Check Caddy logs
sudo journalctl -u caddy -f

# Check certificate files
ls -la /var/lib/caddy/.local/share/caddy/certificates/

# Test certificate
openssl s_client -connect abu.it:443 -servername abu.it

# Check DNS resolution
nslookup abu.it
dig abu.it
```

#### Solutions

**DNS Issues:**
```bash
# Verify DNS points to your Pi
nslookup abu.it
# Should return your Pi's public IP

# Check if port 80/443 are accessible from outside
# Use online tools like https://www.yougetsignal.com/tools/open-ports/
```

**Rate Limiting:**
```bash
# Check Let's Encrypt rate limits
curl -s https://crt.sh/?q=abu.it

# Wait for rate limit to reset (usually 1 week)
# Or use staging environment for testing
```

**Certificate Renewal:**
```bash
# Force certificate renewal
sudo caddy reload --config /etc/caddy/Caddyfile

# Check certificate expiry
openssl x509 -in /var/lib/caddy/.local/share/caddy/certificates/acme-v02.api.letsencrypt.org-directory/abu.it/abu.it.crt -text -noout | grep "Not After"
```

### 3. Deployment Failures

#### Symptoms
- Deployments stuck in "in_progress" state
- Health checks failing
- GitHub API errors

#### Diagnosis
```bash
# Check deployment logs
curl -H "Authorization: Bearer $ADMIN_TOKEN" https://api.abu.it/logs

# Check GitHub token
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check webhook configuration
curl -X POST https://api.abu.it/webhook \
     -H "X-Hub-Signature-256: sha256=test" \
     -H "Content-Type: application/json" \
     -d '{"test": true}'
```

#### Solutions

**GitHub Token Issues:**
```bash
# Verify token permissions
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user

# Check token scopes
curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user | jq '.permissions'

# Regenerate token with correct scopes: repo, admin:repo_hook
```

**Network Issues:**
```bash
# Test GitHub API connectivity
curl -I https://api.github.com

# Check firewall rules
sudo ufw status

# Test from service user
sudo -u abu-service curl -H "Authorization: token $GITHUB_TOKEN" https://api.github.com/user
```

**Disk Space:**
```bash
# Check disk usage
df -h

# Clean old backups
sudo find /var/backups/abu -name "backup_*" -mtime +7 -delete

# Clean old logs
sudo journalctl --vacuum-time=7d
```

### 4. Webhook Issues

#### Symptoms
- Webhooks not triggering deployments
- Signature verification failures
- 401/403 errors

#### Diagnosis
```bash
# Check webhook endpoint
curl -X POST https://api.abu.it/webhook \
     -H "Content-Type: application/json" \
     -d '{"test": true}'

# Check webhook secret
echo $GITHUB_WEBHOOK_SECRET

# Test signature verification
# (This requires the actual webhook payload and signature)
```

#### Solutions

**Signature Verification:**
```bash
# Verify webhook secret is set correctly
grep GITHUB_WEBHOOK_SECRET /etc/abu-service/.env

# Check webhook configuration in GitHub
# Repository Settings → Webhooks → Your webhook
# Ensure secret matches the one in .env file
```

**Webhook URL:**
```bash
# Verify webhook URL is correct
# Should be: https://api.abu.it/webhook
# Not: http://api.abu.it/webhook or https://abu.it/webhook
```

### 5. Performance Issues

#### Symptoms
- Slow response times
- High CPU/memory usage
- Timeouts

#### Diagnosis
```bash
# Check resource usage
htop
iotop
free -h

# Check response times
curl -w "@curl-format.txt" -o /dev/null -s https://api.abu.it/health

# Check system load
uptime
```

#### Solutions

**High Memory Usage:**
```bash
# Check memory usage by process
ps aux --sort=-%mem | head -10

# Restart service if needed
sudo systemctl restart abu-service

# Check for memory leaks in logs
sudo journalctl -u abu-service | grep -i "memory\|leak\|oom"
```

**High CPU Usage:**
```bash
# Check CPU usage by process
ps aux --sort=-%cpu | head -10

# Check for infinite loops in logs
sudo journalctl -u abu-service | grep -i "loop\|infinite\|stuck"
```

**Disk I/O Issues:**
```bash
# Check disk I/O
sudo iotop

# Check for disk space issues
df -h

# Clean up old files
sudo find /var/log -name "*.log" -mtime +30 -delete
```

### 6. Network Connectivity Issues

#### Symptoms
- Cannot reach external services
- DNS resolution failures
- Connection timeouts

#### Diagnosis
```bash
# Test basic connectivity
ping -c 4 8.8.8.8
ping -c 4 google.com

# Test DNS resolution
nslookup github.com
dig github.com

# Test specific services
curl -I https://api.github.com
curl -I https://github.com
```

#### Solutions

**DNS Issues:**
```bash
# Check DNS configuration
cat /etc/resolv.conf

# Use different DNS servers
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
echo "nameserver 1.1.1.1" | sudo tee -a /etc/resolv.conf
```

**Firewall Issues:**
```bash
# Check firewall status
sudo ufw status

# Temporarily disable firewall for testing
sudo ufw disable

# Re-enable with correct rules
sudo ufw enable
sudo ufw allow ssh
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

**Proxy Issues:**
```bash
# Check for proxy settings
env | grep -i proxy

# Clear proxy settings if not needed
unset http_proxy https_proxy HTTP_PROXY HTTPS_PROXY
```

## 🔧 Advanced Troubleshooting

### Debug Mode

Enable debug logging for detailed troubleshooting:

```bash
# Edit environment file
sudo nano /etc/abu-service/.env

# Add debug logging
echo "RUST_LOG=debug,abu_service=trace" | sudo tee -a /etc/abu-service/.env

# Restart service
sudo systemctl restart abu-service

# Monitor logs
sudo journalctl -u abu-service -f
```

### Manual Service Testing

Test the service manually without systemd:

```bash
# Stop systemd service
sudo systemctl stop abu-service

# Run manually with debug output
sudo -u abu-service env $(cat /etc/abu-service/.env | xargs) \
    RUST_LOG=debug \
    /opt/abu-service/abu-service --config /etc/abu-service/config.toml
```

### Configuration Validation

Validate configuration without starting the service:

```bash
# Check configuration syntax
sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config

# Validate TOML syntax
toml-cli validate /etc/abu-service/config.toml
```

### Network Debugging

Debug network connectivity issues:

```bash
# Test with verbose curl
curl -v https://api.abu.it/health

# Test with different user agents
curl -H "User-Agent: Mozilla/5.0" https://api.abu.it/health

# Test with timeout
curl --connect-timeout 10 --max-time 30 https://api.abu.it/health
```

### Log Analysis

Analyze logs for patterns:

```bash
# Search for errors
sudo journalctl -u abu-service | grep -i error

# Search for warnings
sudo journalctl -u abu-service | grep -i warn

# Search for specific patterns
sudo journalctl -u abu-service | grep -E "(deployment|webhook|github)"

# Export logs for analysis
sudo journalctl -u abu-service --since "1 day ago" > abu-service-logs.txt
```

## 📊 Monitoring and Alerting

### Health Check Script

Create a comprehensive health check:

```bash
#!/bin/bash
# Save as /opt/abu-service/health-check.sh

ADMIN_TOKEN="your_admin_token_here"
API_URL="https://api.abu.it"
ALERT_EMAIL="admin@example.com"

# Function to send alert
send_alert() {
    local message="$1"
    echo "$message" | mail -s "Abu Service Alert" "$ALERT_EMAIL"
    # Or use other notification methods (Slack, Discord, etc.)
}

# Check service health
if ! curl -s -f "$API_URL/health" > /dev/null; then
    send_alert "CRITICAL: Abu Service health check failed"
    sudo systemctl restart abu-service
    exit 1
fi

# Check website accessibility
if ! curl -s -f "https://abu.it" > /dev/null; then
    send_alert "CRITICAL: Website is not accessible"
    exit 1
fi

# Check API response time
response_time=$(curl -w "%{time_total}" -o /dev/null -s "$API_URL/health")
if (( $(echo "$response_time > 5.0" | bc -l) )); then
    send_alert "WARNING: API response time is slow: ${response_time}s"
fi

# Check disk space
disk_usage=$(df / | awk 'NR==2 {print $5}' | sed 's/%//')
if [ "$disk_usage" -gt 90 ]; then
    send_alert "WARNING: Disk usage is high: ${disk_usage}%"
fi

# Check memory usage
memory_usage=$(free | awk 'NR==2{printf "%.0f", $3*100/$2}')
if [ "$memory_usage" -gt 90 ]; then
    send_alert "WARNING: Memory usage is high: ${memory_usage}%"
fi

echo "All health checks passed"
```

### Log Monitoring

Set up log monitoring for critical events:

```bash
# Monitor for critical errors
sudo journalctl -u abu-service -f | grep -i "error\|critical\|fatal" | while read line; do
    echo "CRITICAL: $line" | mail -s "Abu Service Critical Error" admin@example.com
done

# Monitor for deployment failures
sudo journalctl -u abu-service -f | grep -i "deployment.*failed" | while read line; do
    echo "DEPLOYMENT FAILED: $line" | mail -s "Abu Service Deployment Failed" admin@example.com
done
```

## 🆘 Emergency Procedures

### Service Recovery

If the service is completely down:

```bash
# 1. Check system resources
df -h
free -h
uptime

# 2. Check for system issues
sudo dmesg | tail -20

# 3. Restart services in order
sudo systemctl restart caddy
sudo systemctl restart abu-service

# 4. Check service status
sudo systemctl status abu-service caddy

# 5. Test endpoints
curl https://api.abu.it/health
curl https://abu.it
```

### Data Recovery

If deployment data is corrupted:

```bash
# 1. Stop services
sudo systemctl stop abu-service

# 2. Restore from backup
sudo cp -r /var/backups/abu/backup_YYYYMMDD_HHMMSS/* /var/www/abu.it/

# 3. Fix permissions
sudo chown -R www-data:www-data /var/www/abu.it

# 4. Start services
sudo systemctl start abu-service

# 5. Verify recovery
curl https://abu.it
```

### Complete Reinstallation

If all else fails:

```bash
# 1. Backup configuration
sudo cp -r /etc/abu-service /tmp/abu-service-backup

# 2. Stop and disable services
sudo systemctl stop abu-service
sudo systemctl disable abu-service

# 3. Remove service files
sudo rm -f /etc/systemd/system/abu-service.service
sudo rm -rf /opt/abu-service
sudo rm -rf /var/log/abu-service

# 4. Reinstall using the installation script
curl -fsSL https://raw.githubusercontent.com/your-username/abu-service/main/scripts/install.sh | sudo bash

# 5. Restore configuration
sudo cp -r /tmp/abu-service-backup/* /etc/abu-service/

# 6. Start services
sudo systemctl start abu-service
```

## 📞 Getting Help

### Before Asking for Help

1. **Run diagnostics script**: `/opt/abu-service/diagnostics.sh`
2. **Check logs**: `sudo journalctl -u abu-service -f`
3. **Verify configuration**: `sudo /opt/abu-service/abu-service --config /etc/abu-service/config.toml --check-config`
4. **Test network connectivity**: `curl -I https://api.abu.it/health`

### Information to Include

When reporting issues, include:

1. **System information**: `uname -a`, `lsb_release -a`
2. **Service status**: `sudo systemctl status abu-service`
3. **Recent logs**: `sudo journalctl -u abu-service --since "1 hour ago"`
4. **Configuration**: `sudo cat /etc/abu-service/config.toml` (remove secrets)
5. **Network status**: `curl -I https://api.abu.it/health`
6. **Error messages**: Exact error messages and when they occur

### Support Channels

- **GitHub Issues**: [Create an issue](https://github.com/your-username/abu-service/issues)
- **GitHub Discussions**: [Community discussions](https://github.com/your-username/abu-service/discussions)
- **Documentation**: [Wiki](https://github.com/your-username/abu-service/wiki)

---

Remember: Always backup your configuration and data before making changes!
