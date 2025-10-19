---
id: local-development
title: Local Development
---

# Local CI Testing Guide

This guide explains how to ensure your local testing catches the same issues that GitHub Actions CI will catch, preventing failed builds and wasted time.

## Overview

The GitHub Actions CI runs different checks for each package:

- **Abu Web Kernel**: Node.js linting, unit tests, integration tests, build
- **Abu Enterprise**: Node.js linting, unit tests, integration tests, build  
- **Abu Service**: Rust formatting, clippy, unit tests, integration tests, build

## Quick Start

### 1. Run Local CI Checks

```bash
# Check all packages
./local-ci-check.sh

# Check specific package
./local-ci-check.sh abu-web-kernel
./local-ci-check.sh abu-enterprise
./local-ci-check.sh abu-service

# Auto-fix issues where possible
./local-ci-check.sh abu-service --fix
```

### 2. Setup Pre-commit Hooks (Recommended)

```bash
# Install Git hooks for all packages
./setup-pre-commit-hooks.sh
```

This will:
- Run local CI checks before each commit
- Validate conventional commit message format
- Prevent commits if checks fail
- Auto-fix issues where possible

## Detailed CI Checks

### Abu Web Kernel & Abu Enterprise (Node.js)

The CI runs these steps in order:

1. **Checkout & Setup**
   ```bash
   # Equivalent to: actions/checkout@v4
   git checkout main
   
   # Equivalent to: actions/setup-node@v4
   # Uses Node.js 20.x (check with: node --version)
   ```

2. **Install Dependencies**
   ```bash
   # Equivalent to: npm ci
   npm ci
   ```

3. **Linting**
   ```bash
   # Equivalent to: npm run lint:fix
   npm run lint:fix
   ```

4. **Unit Tests**
   ```bash
   # Equivalent to: npm test
   npm test
   ```

5. **Integration Tests**
   ```bash
   # Equivalent to: npm run test:integration
   npm run test:integration
   ```

6. **Build**
   ```bash
   # Equivalent to: npm run build
   npm run build
   ```

### Abu Service (Rust)

The CI runs these steps in order:

1. **Checkout & Setup**
   ```bash
   # Equivalent to: actions/checkout@v4
   git checkout main
   
   # Equivalent to: dtolnay/rust-toolchain@stable
   # Uses latest stable Rust (check with: rustc --version)
   ```

2. **Install Dependencies**
   ```bash
   # Equivalent to: apt-get install
   sudo apt-get update
   sudo apt-get install -y pkg-config libssl-dev
   ```

3. **Formatting Check**
   ```bash
   # Equivalent to: cargo fmt --all -- --check
   cargo fmt --all -- --check
   ```

4. **Clippy (Linting)**
   ```bash
   # Equivalent to: cargo clippy --all-targets --all-features -- -D warnings
   cargo clippy --all-targets --all-features -- -D warnings
   ```

5. **Unit Tests**
   ```bash
   # Equivalent to: cargo test --lib
   cargo test --lib
   ```

6. **Integration Tests**
   ```bash
   # Equivalent to: cargo test --test '*'
   cargo test --test '*'
   ```

7. **Build**
   ```bash
   # Equivalent to: cargo build --release
   cargo build --release
   ```

## Common Issues and Solutions

### Node.js Packages

#### Missing package-lock.json
```bash
# Error: Dependencies lock file is not found
# Solution: Generate package-lock.json
npm install
```

#### ESLint Configuration Issues
```bash
# Error: ESLint couldn't find an eslint.config.(js|mjs|cjs) file
# Solution: Check if eslint.config.js exists and is properly configured
ls -la eslint.config.js
```

#### Stylelint Configuration Issues
```bash
# Error: ConfigurationError: No configuration provided
# Solution: Check if .stylelintrc.json exists
ls -la .stylelintrc.json
```

#### Test Failures
```bash
# Run specific test to debug
npm test -- tests/unit/plugins/BuiltinMSDOS.test.ts

# Run with verbose output
npm test -- --reporter=verbose
```

### Rust Package

#### Formatting Issues
```bash
# Auto-fix formatting
cargo fmt --all

# Check formatting without fixing
cargo fmt --all -- --check
```

#### Clippy Warnings
```bash
# See all clippy warnings
cargo clippy --all-targets --all-features

# Auto-fix some clippy issues
cargo clippy --all-targets --all-features --fix --allow-dirty
```

#### Test Failures
```bash
# Run specific test
cargo test test_name

# Run with output
cargo test -- --nocapture

# Run integration tests only
cargo test --test '*'
```

## Environment Setup

### Prerequisites

1. **Node.js 20.x**
   ```bash
   # Check version
   node --version
   
   # Install if needed (using nvm)
   nvm install 20
   nvm use 20
   ```

2. **Rust (latest stable)**
   ```bash
   # Check version
   rustc --version
   
   # Install if needed
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   source ~/.cargo/env
   ```

3. **System Dependencies (for Rust)**
   ```bash
   # Ubuntu/Debian
   sudo apt-get update
   sudo apt-get install -y pkg-config libssl-dev
   
   # macOS
   brew install pkg-config openssl
   ```

### Package-Specific Setup

#### Abu Web Kernel
```bash
cd Abu-98-OS-Web-Kernel
npm install
```

#### Abu Enterprise
```bash
cd Abu-Enterprise
npm install
```

#### Abu Service
```bash
cd Abu-Service
# Dependencies are managed by Cargo
```

## Pre-commit Hook Details

The pre-commit hooks run automatically before each commit and:

1. **Detect Package Type**: Automatically determine which package you're committing to
2. **Run Appropriate Checks**: Run the correct CI checks for that package
3. **Auto-fix Issues**: Apply automatic fixes where possible
4. **Block Commits**: Prevent commits if checks fail
5. **Validate Messages**: Ensure commit messages follow conventional format

### Bypassing Hooks

If you need to bypass the hooks (not recommended):

```bash
# Skip pre-commit hook
git commit --no-verify -m "emergency fix"

# Skip commit-msg hook
git commit --no-verify -m "fix: emergency fix"
```

### Removing Hooks

```bash
# Remove pre-commit hook
rm .git/hooks/pre-commit

# Remove commit-msg hook  
rm .git/hooks/commit-msg
```

## Conventional Commit Format

The commit-msg hook enforces this format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes
- `revert`: Reverting previous commits

### Examples
```bash
feat: add new terminal component
fix(ui): resolve button click issue
docs: update API documentation
test: add unit tests for BuiltinMSDOS
ci: update GitHub Actions workflow
chore: update dependencies
```

## Troubleshooting

### Local CI Script Issues

```bash
# Check script permissions
ls -la local-ci-check.sh

# Make executable if needed
chmod +x local-ci-check.sh

# Run with debug output
bash -x local-ci-check.sh abu-web-kernel
```

### Git Hook Issues

```bash
# Check hook permissions
ls -la .git/hooks/pre-commit

# Make executable if needed
chmod +x .git/hooks/pre-commit

# Test hook manually
.git/hooks/pre-commit
```

### Environment Issues

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check Rust version
rustc --version

# Check Cargo version
cargo --version
```

## Best Practices

1. **Always Run Local Checks**: Run `./local-ci-check.sh` before pushing
2. **Use Pre-commit Hooks**: Install hooks to catch issues early
3. **Follow Conventional Commits**: Use proper commit message format
4. **Fix Issues Locally**: Don't rely on CI to catch issues
5. **Keep Dependencies Updated**: Regularly update package-lock.json and Cargo.lock
6. **Test Edge Cases**: Run tests with different configurations
7. **Monitor CI Logs**: Check GitHub Actions logs for any environment-specific issues

## Integration with IDE

### VS Code

Add these tasks to `.vscode/tasks.json`:

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Local CI Check",
            "type": "shell",
            "command": "${workspaceFolder}/local-ci-check.sh",
            "group": "test",
            "presentation": {
                "echo": true,
                "reveal": "always",
                "focus": false,
                "panel": "shared"
            }
        }
    ]
}
```

### JetBrains IDEs

Create a run configuration:
- **Name**: Local CI Check
- **Type**: Shell Script
- **Script path**: `local-ci-check.sh`
- **Working directory**: Project root

## Summary

By following this guide, you can:

- ✅ Catch CI issues locally before pushing
- ✅ Save time by preventing failed builds
- ✅ Maintain consistent code quality
- ✅ Follow proper commit conventions
- ✅ Automate the testing process

The key is to run the same checks locally that GitHub Actions runs in CI. The provided scripts make this easy and consistent across all packages.
