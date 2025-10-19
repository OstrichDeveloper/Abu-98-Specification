---
id: testing
title: Testing
---

# Testing Kernel Changes in Abu-Enterprise

This document explains how to test changes made to `Abu-98-OS-Web-Kernel` in the `Abu-Enterprise` application.

## Project Relationship

```
Abu-98-OS-Web-Kernel/     ← Library (kernel)
    └── dist/             ← Built artifacts
         
Abu-Enterprise/           ← Consumer app
    └── node_modules/
         └── @melalawi/abu-web-kernel ← Links to ../Abu-98-OS-Web-Kernel
```

## Testing Scripts

### 🧪 Full Test & Run (Recommended)

Rebuilds kernel, runs tests, and starts dev server:

```bash
cd Abu-Enterprise
./test-kernel-changes.sh
```

**What it does:**
1. Builds `Abu-98-OS-Web-Kernel`
2. Updates dependencies in `Abu-Enterprise`
3. Runs kernel tests
4. Starts dev server at http://localhost:5173

### ⚡ Quick Rebuild (Fast)

Rebuilds kernel and updates deps without tests:

```bash
cd Abu-Enterprise
./quick-rebuild.sh
npm run dev
```

**Use this when:**
- You're iterating quickly
- Tests already passed
- Just need to see visual changes

## Manual Testing Workflow

### 1. Build the Kernel

```bash
cd Abu-98-OS-Web-Kernel
npm run build
```

This creates/updates files in `dist/`:
- `index.js` - Compiled JavaScript
- `index.d.ts` - TypeScript definitions
- `index.css` - Compiled styles

### 2. Update Abu-Enterprise Dependencies

```bash
cd Abu-Enterprise
npm install --force
```

This ensures the local link is refreshed.

### 3. Run Tests (Optional but Recommended)

```bash
cd Abu-98-OS-Web-Kernel

# Unit tests only
npm test

# Integration tests
npm run test:integration

# All tests
npm run test:all
```

### 4. Start Dev Server

```bash
cd Abu-Enterprise
npm run dev
```

Visit http://localhost:5173 to test your changes.

## Testing the Start Menu Fix

To verify the start menu button reset fix:

1. Run the dev server
2. Click the **Start** button (bottom-left)
3. Verify the menu opens and button appears pressed
4. Click anywhere on the desktop (outside the menu)
5. **Expected:** Menu closes AND button returns to unpressed state
6. **Bug (if present):** Menu closes but button stays pressed

## Development Tips

### Watch Mode (Continuous Rebuild)

If making lots of changes, use watch mode in the kernel:

```bash
# Terminal 1 - Kernel watch mode
cd Abu-98-OS-Web-Kernel
npm run dev  # Rebuilds on file changes

# Terminal 2 - Abu-Enterprise dev server
cd Abu-Enterprise
npm run dev
```

**Note:** You may still need to run `npm install --force` in Abu-Enterprise after major changes.

### Build Production Version

```bash
cd Abu-98-OS-Web-Kernel
npm run build:prod

cd Abu-Enterprise
npm run build:prod
```

Production builds are optimized and minified.

## Troubleshooting

### Changes Not Appearing?

1. **Clear Vite cache:**
   ```bash
   cd Abu-Enterprise
   rm -rf node_modules/.vite
   ```

2. **Hard refresh in browser:** Ctrl+Shift+R (or Cmd+Shift+R on Mac)

3. **Rebuild everything:**
   ```bash
   cd Abu-98-OS-Web-Kernel
   npm run build
   
   cd Abu-Enterprise
   rm -rf node_modules/.vite
   npm install --force
   npm run dev
   ```

### TypeScript Errors?

If you see TypeScript errors about missing types:

```bash
cd Abu-98-OS-Web-Kernel
npm run build  # This regenerates .d.ts files
```

### Tests Failing?

Make sure you're running unit tests with the unit config:

```bash
npm test  # Uses vitest.config.unit.ts by default
```

## CI/CD Consideration

For automated testing, use:

```bash
cd Abu-98-OS-Web-Kernel
npm run build:prod
npm run test:all

cd Abu-Enterprise
npm install
npm run build:prod
npm run test
```

## Additional Resources

- [Abu Web Kernel Documentation](../../abu-web-kernel/)
- [Testing Guide](../../abu-web-kernel/guides/testing-guide.md)
- [Quick Start](../../abu-web-kernel/guides/quick-start.md)
