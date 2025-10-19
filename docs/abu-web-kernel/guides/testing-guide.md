---
id: testing-guide
title: Testing Guide
---

# Testing Guide

## Overview

This comprehensive guide covers testing strategies for the Abu OS 98 Web Kernel and plugins built with it. You'll learn how to write unit tests, integration tests, end-to-end tests, and achieve 100% code coverage.

## Testing Philosophy

### Goals

1. **100% Code Coverage** - No untested code paths
2. **Test Behavior, Not Implementation** - Focus on what, not how
3. **Fast Feedback** - Tests run in `< 1` second
4. **Confidence** - Tests catch regressions reliably
5. **Documentation** - Tests serve as usage examples

### Test Pyramid

```
         /\
        /E2E\         Few (slow, expensive)
       /------\
      /Integration\   Some (moderate speed)
     /------------\
    /    Unit      \  Many (fast, cheap)
   /----------------\
```

**Distribution:**
- Unit tests: 70%
- Integration tests: 20%
- E2E tests: 10%

## Setup

### Install Dependencies

```bash
npm install --save-dev \
  vitest \
  @vitest/coverage-v8 \
  @testing-library/svelte \
  @testing-library/user-event \
  @testing-library/jest-dom \
  jsdom \
  @sveltejs/vite-plugin-svelte
```

### Configure Vitest

Create `vitest.config.ts`:

```typescript
import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,svelte}'],
      exclude: [
        'src/**/*.test.ts',
        'src/**/*.spec.ts',
        'src/test/**',
        'src/**/__tests__/**'
      ],
      all: true,
      lines: 100,
      functions: 100,
      branches: 100,
      statements: 100
    }
  }
});
```

### Setup File

Create `src/test/setup.ts`:

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/svelte';

// Cleanup after each test
afterEach(() => {
  cleanup();
  localStorage.clear();
  sessionStorage.clear();
});

// Mock crypto.randomUUID if not available
if (!global.crypto) {
  global.crypto = {
    randomUUID: () => Math.random().toString(36).substring(2, 15)
  } as Crypto;
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:ui": "vitest --ui"
  }
}
```

## Unit Testing

### Testing Pure Functions

Test utility functions and helpers.

```typescript
// src/lib/utils/position.ts
export function constrainToViewport(
  position: Position,
  size: Size,
  viewportSize: Size
): Position {
  return {
    x: Math.max(0, Math.min(position.x, viewportSize.width - size.width)),
    y: Math.max(0, Math.min(position.y, viewportSize.height - size.height))
  };
}
```

```typescript
// src/lib/utils/__tests__/position.test.ts
import { describe, test, expect } from 'vitest';
import { constrainToViewport } from '../position';

describe('constrainToViewport', () => {
  const viewportSize = { width: 1920, height: 1080 };
  const windowSize = { width: 600, height: 400 };
  
  test('when position inside viewport then returns unchanged', () => {
    const position = { x: 100, y: 100 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result).toEqual({ x: 100, y: 100 });
  });
  
  test('when x negative then constrains to 0', () => {
    const position = { x: -50, y: 100 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result.x).toBe(0);
  });
  
  test('when x beyond right edge then constrains to max', () => {
    const position = { x: 2000, y: 100 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result.x).toBe(1920 - 600);
  });
  
  test('when y negative then constrains to 0', () => {
    const position = { x: 100, y: -50 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result.y).toBe(0);
  });
  
  test('when y beyond bottom edge then constrains to max', () => {
    const position = { x: 100, y: 2000 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result.y).toBe(1080 - 400);
  });
  
  test('when position at exact max then returns unchanged', () => {
    const position = { x: 1320, y: 680 };
    
    const result = constrainToViewport(position, windowSize, viewportSize);
    
    expect(result).toEqual({ x: 1320, y: 680 });
  });
});
```

### Testing Stores

Test Svelte 5 rune-based stores.

```typescript
// src/lib/stores/__tests__/windowManager.test.ts
import { describe, test, expect, beforeEach, vi } from 'vitest';
import { windowManager } from '../windowManager.svelte';
import { pluginRegistry } from '../../core/pluginRegistry';

describe('windowManager', () => {
  beforeEach(() => {
    // Clear state
    windowManager.all.forEach(w => windowManager.close(w.id));
    localStorage.clear();
    
    // Register test plugin
    pluginRegistry.registerWindow({
      id: 'test-plugin',
      name: 'Test Plugin',
      version: '1.0.0',
      component: {} as any,
      defaultTitle: 'Test',
      defaultIcon: 'icon-test',
      isResizable: true
    });
  });
  
  describe('open', () => {
    test('when called with valid plugin id then creates window', () => {
      const id = windowManager.open('test-plugin');
      
      expect(windowManager.all).toHaveLength(1);
      expect(windowManager.all[0]).toMatchObject({
        id,
        pluginId: 'test-plugin',
        title: 'Test',
        isMinimized: false,
        isMaximized: false,
        isFocused: true
      });
    });
    
    test('when called with custom options then uses options', () => {
      const position = { x: 200, y: 300 };
      const size = { width: 800, height: 600 };
      
      const id = windowManager.open('test-plugin', {
        position,
        size,
        title: 'Custom Title'
      });
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window).toMatchObject({
        position,
        size,
        title: 'Custom Title'
      });
    });
    
    test('when called with invalid plugin id then throws error', () => {
      expect(() => {
        windowManager.open('nonexistent-plugin');
      }).toThrow('Plugin not found: nonexistent-plugin');
    });
    
    test('when called then focuses new window', () => {
      const id = windowManager.open('test-plugin');
      
      expect(windowManager.focused?.id).toBe(id);
    });
    
    test('when called then persists to localStorage', async () => {
      windowManager.open('test-plugin');
      
      // Wait for debounce
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const stored = localStorage.getItem('abu-os-98:state:v1');
      expect(stored).toBeDefined();
      
      const state = JSON.parse(stored!);
      expect(state.windows.open).toHaveLength(1);
    });
  });
  
  describe('close', () => {
    test('when called with valid id then removes window', () => {
      const id = windowManager.open('test-plugin');
      
      windowManager.close(id);
      
      expect(windowManager.all).toHaveLength(0);
    });
    
    test('when closed window was focused then focuses next window', () => {
      const id1 = windowManager.open('test-plugin');
      const id2 = windowManager.open('test-plugin');
      
      windowManager.close(id2);
      
      expect(windowManager.focused?.id).toBe(id1);
    });
    
    test('when closing last window then no focused window', () => {
      const id = windowManager.open('test-plugin');
      
      windowManager.close(id);
      
      expect(windowManager.focused).toBeNull();
    });
    
    test('when called with invalid id then silently ignores', () => {
      expect(() => {
        windowManager.close('nonexistent-id');
      }).not.toThrow();
    });
  });
  
  describe('minimize', () => {
    test('when called then sets isMinimized to true', () => {
      const id = windowManager.open('test-plugin');
      
      windowManager.minimize(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isMinimized).toBe(true);
    });
    
    test('when called then removes focus', () => {
      const id = windowManager.open('test-plugin');
      
      windowManager.minimize(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isFocused).toBe(false);
    });
    
    test('when multiple windows then focuses next window', () => {
      const id1 = windowManager.open('test-plugin');
      const id2 = windowManager.open('test-plugin');
      
      windowManager.minimize(id2);
      
      expect(windowManager.focused?.id).toBe(id1);
    });
  });
  
  describe('maximize', () => {
    test('when called then sets isMaximized to true', () => {
      const id = windowManager.open('test-plugin');
      
      windowManager.maximize(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isMaximized).toBe(true);
    });
    
    test('when called then saves preMaximizeBounds', () => {
      const id = windowManager.open('test-plugin', {
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 }
      });
      
      windowManager.maximize(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.preMaximizeBounds).toEqual({
        x: 100,
        y: 100,
        width: 600,
        height: 400
      });
    });
    
    test('when called then focuses window', () => {
      const id1 = windowManager.open('test-plugin');
      const id2 = windowManager.open('test-plugin');
      windowManager.focus(id1);
      
      windowManager.maximize(id2);
      
      expect(windowManager.focused?.id).toBe(id2);
    });
  });
  
  describe('restore', () => {
    test('when minimized window then unminimizes', () => {
      const id = windowManager.open('test-plugin');
      windowManager.minimize(id);
      
      windowManager.restore(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isMinimized).toBe(false);
    });
    
    test('when maximized window then restores bounds', () => {
      const id = windowManager.open('test-plugin', {
        position: { x: 100, y: 100 },
        size: { width: 600, height: 400 }
      });
      windowManager.maximize(id);
      
      windowManager.restore(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isMaximized).toBe(false);
      expect(window?.position).toEqual({ x: 100, y: 100 });
      expect(window?.size).toEqual({ width: 600, height: 400 });
    });
    
    test('when called then focuses window', () => {
      const id = windowManager.open('test-plugin');
      windowManager.minimize(id);
      
      windowManager.restore(id);
      
      expect(windowManager.focused?.id).toBe(id);
    });
  });
  
  describe('focus', () => {
    test('when called then sets isFocused to true', () => {
      const id = windowManager.open('test-plugin');
      const id2 = windowManager.open('test-plugin');
      
      windowManager.focus(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isFocused).toBe(true);
    });
    
    test('when called then unfocuses other windows', () => {
      const id1 = windowManager.open('test-plugin');
      const id2 = windowManager.open('test-plugin');
      
      windowManager.focus(id1);
      
      const window2 = windowManager.all.find(w => w.id === id2);
      expect(window2?.isFocused).toBe(false);
    });
    
    test('when minimized window then restores first', () => {
      const id = windowManager.open('test-plugin');
      windowManager.minimize(id);
      
      windowManager.focus(id);
      
      const window = windowManager.all.find(w => w.id === id);
      expect(window?.isMinimized).toBe(false);
    });
  });
});
```

### Testing Components

Test Svelte components with Testing Library.

```typescript
// src/lib/components/__tests__/Button.test.ts
import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Button from '../Button.svelte';

describe('Button', () => {
  test('when rendered then displays label', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Click Me',
        onclick: () => {}
      }
    });
    
    expect(getByRole('button')).toHaveTextContent('Click Me');
  });
  
  test('when clicked then calls onclick', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      props: {
        label: 'Click Me',
        onclick
      }
    });
    
    await userEvent.click(getByRole('button'));
    
    expect(onclick).toHaveBeenCalledTimes(1);
  });
  
  test('when disabled then does not call onclick', async () => {
    const onclick = vi.fn();
    const { getByRole } = render(Button, {
      props: {
        label: 'Click Me',
        disabled: true,
        onclick
      }
    });
    
    await userEvent.click(getByRole('button'));
    
    expect(onclick).not.toHaveBeenCalled();
  });
  
  test('when disabled then has disabled attribute', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Click Me',
        disabled: true,
        onclick: () => {}
      }
    });
    
    expect(getByRole('button')).toBeDisabled();
  });
  
  test('when variant primary then has primary class', () => {
    const { getByRole } = render(Button, {
      props: {
        label: 'Click Me',
        variant: 'primary',
        onclick: () => {}
      }
    });
    
    expect(getByRole('button')).toHaveClass('primary');
  });
});
```

### Testing Plugin Components

Test plugins in isolation.

```typescript
// src/plugins/__tests__/Calculator.test.ts
import { describe, test, expect, vi } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Calculator from '../Calculator.svelte';

describe('Calculator Plugin', () => {
  test('when rendered then shows display', () => {
    const { getByRole } = render(Calculator, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    const display = getByRole('textbox', { name: /display/i });
    expect(display).toHaveValue('0');
  });
  
  test('when number clicked then updates display', async () => {
    const { getByRole, getByText } = render(Calculator, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    await userEvent.click(getByText('7'));
    
    const display = getByRole('textbox', { name: /display/i });
    expect(display).toHaveValue('7');
  });
  
  test('when multiple numbers clicked then concatenates', async () => {
    const { getByRole, getByText } = render(Calculator, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    await userEvent.click(getByText('1'));
    await userEvent.click(getByText('2'));
    await userEvent.click(getByText('3'));
    
    const display = getByRole('textbox', { name: /display/i });
    expect(display).toHaveValue('123');
  });
  
  test('when addition performed then calculates correctly', async () => {
    const { getByRole, getByText } = render(Calculator, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    await userEvent.click(getByText('5'));
    await userEvent.click(getByText('+'));
    await userEvent.click(getByText('3'));
    await userEvent.click(getByText('='));
    
    const display = getByRole('textbox', { name: /display/i });
    expect(display).toHaveValue('8');
  });
  
  test('when C clicked then clears display', async () => {
    const { getByRole, getByText } = render(Calculator, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    await userEvent.click(getByText('9'));
    await userEvent.click(getByText('C'));
    
    const display = getByRole('textbox', { name: /display/i });
    expect(display).toHaveValue('0');
  });
});
```

## Integration Testing

Test multiple components working together.

```typescript
// src/__tests__/integration/window-lifecycle.test.ts
import { describe, test, expect, beforeEach } from 'vitest';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import Shell from '../Shell.svelte';
import { MockKernel } from '../kernel/MockKernel';
import type { WindowPlugin } from '../types';
import TestPlugin from './fixtures/TestPlugin.svelte';

describe('Window Lifecycle Integration', () => {
  let kernel: MockKernel;
  let plugins: WindowPlugin[];
  
  beforeEach(() => {
    kernel = new MockKernel();
    plugins = [{
      id: 'test-plugin',
      name: 'Test Plugin',
      version: '1.0.0',
      component: TestPlugin,
      defaultTitle: 'Test',
      defaultIcon: 'icon-test',
      isResizable: true
    }];
    localStorage.clear();
  });
  
  test('when Start menu item clicked then window opens', async () => {
    const { getByText, findByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Open Start menu
    await userEvent.click(getByText('Start'));
    
    // Click Programs
    await userEvent.click(getByText('Programs'));
    
    // Click plugin
    await userEvent.click(getByText('Test Plugin'));
    
    // Window should appear
    const window = await findByRole('dialog', { name: /Test/i });
    expect(window).toBeInTheDocument();
  });
  
  test('when window opened then appears in taskbar', async () => {
    const { getByText, findByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Open window via Start menu
    await userEvent.click(getByText('Start'));
    await userEvent.click(getByText('Programs'));
    await userEvent.click(getByText('Test Plugin'));
    
    // Check taskbar
    const taskbarButton = await findByRole('button', { name: /Test/i });
    expect(taskbarButton).toBeInTheDocument();
  });
  
  test('when window minimized then hidden from desktop', async () => {
    const { getByText, findByRole, queryByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Open window
    await userEvent.click(getByText('Start'));
    await userEvent.click(getByText('Programs'));
    await userEvent.click(getByText('Test Plugin'));
    
    const window = await findByRole('dialog');
    
    // Click minimize button
    const minimizeBtn = window.querySelector('.minimize-button');
    await userEvent.click(minimizeBtn!);
    
    // Window should be hidden
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });
  
  test('when minimized window taskbar button clicked then restores', async () => {
    const { getByText, findByRole, queryByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Open and minimize window
    await userEvent.click(getByText('Start'));
    await userEvent.click(getByText('Programs'));
    await userEvent.click(getByText('Test Plugin'));
    
    const window = await findByRole('dialog');
    const minimizeBtn = window.querySelector('.minimize-button');
    await userEvent.click(minimizeBtn!);
    
    // Click taskbar button
    const taskbarButton = getByRole('button', { name: /Test/i });
    await userEvent.click(taskbarButton);
    
    // Window should be visible again
    expect(await findByRole('dialog')).toBeInTheDocument();
  });
  
  test('when window closed then removed from taskbar', async () => {
    const { getByText, findByRole, queryByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Open window
    await userEvent.click(getByText('Start'));
    await userEvent.click(getByText('Programs'));
    await userEvent.click(getByText('Test Plugin'));
    
    const window = await findByRole('dialog');
    
    // Close window
    const closeBtn = window.querySelector('.close-button');
    await userEvent.click(closeBtn!);
    
    // Should not be in taskbar
    expect(queryByRole('button', { name: /Test/i })).not.toBeInTheDocument();
  });
  
  test('when page refreshed then windows restored', async () => {
    // First render - open window
    const { unmount, getByText } = render(Shell, {
      props: { kernel, plugins }
    });
    
    await userEvent.click(getByText('Start'));
    await userEvent.click(getByText('Programs'));
    await userEvent.click(getByText('Test Plugin'));
    
    // Wait for localStorage save
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Unmount
    unmount();
    
    // Second render - should restore
    const { findByRole } = render(Shell, {
      props: { kernel, plugins }
    });
    
    // Window should be restored
    expect(await findByRole('dialog', { name: /Test/i })).toBeInTheDocument();
  });
});
```

## End-to-End Testing

Test complete user workflows with Playwright.

### Setup Playwright

```bash
npm install --save-dev @playwright/test
npx playwright install
```

### E2E Test Example

```typescript
// e2e/desktop-workflow.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Desktop Workflow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
  });
  
  test('complete workflow: open, use, minimize, restore, close', async ({ page }) => {
    // Open Start menu
    await page.click('text=Start');
    await expect(page.locator('.start-menu')).toBeVisible();
    
    // Navigate to Programs
    await page.click('text=Programs');
    
    // Open Calculator
    await page.click('text=Calculator');
    
    // Wait for window
    const window = page.locator('[role="dialog"]:has-text("Calculator")');
    await expect(window).toBeVisible();
    
    // Use calculator
    await page.click('button:has-text("5")');
    await page.click('button:has-text("+")');
    await page.click('button:has-text("3")');
    await page.click('button:has-text("=")');
    
    // Check result
    await expect(page.locator('.calculator .display')).toHaveText('8');
    
    // Minimize window
    await window.locator('.minimize-button').click();
    await expect(window).not.toBeVisible();
    
    // Check taskbar
    const taskbarButton = page.locator('[role="button"]:has-text("Calculator")');
    await expect(taskbarButton).toBeVisible();
    
    // Restore from taskbar
    await taskbarButton.click();
    await expect(window).toBeVisible();
    
    // Close window
    await window.locator('.close-button').click();
    await expect(window).not.toBeVisible();
    await expect(taskbarButton).not.toBeVisible();
  });
  
  test('state persists across refresh', async ({ page }) => {
    // Open calculator
    await page.click('text=Start');
    await page.click('text=Programs');
    await page.click('text=Calculator');
    
    // Wait for window
    const window = page.locator('[role="dialog"]:has-text("Calculator")');
    await expect(window).toBeVisible();
    
    // Refresh page
    await page.reload();
    
    // Window should be restored
    await expect(window).toBeVisible();
  });
});
```

## Coverage Reporting

### Generate Coverage Report

```bash
npm run test:coverage
```

### View HTML Report

```bash
open coverage/index.html
```

### Enforce 100% Coverage

Configure in `vitest.config.ts`:

```typescript
coverage: {
  lines: 100,
  functions: 100,
  branches: 100,
  statements: 100,
  // Fail build if coverage below 100%
  thresholds: {
    lines: 100,
    functions: 100,
    branches: 100,
    statements: 100
  }
}
```

## Best Practices

### 1. Test Naming

Use descriptive test names that explain what, when, and expected outcome.

```typescript
// ✅ Good
test('when minimize button clicked then window hidden')

// ❌ Bad
test('minimize works')
```

### 2. Arrange-Act-Assert

Structure tests in three clear sections.

```typescript
test('example', () => {
  // Arrange
  const input = createTestData();
  
  // Act
  const result = functionUnderTest(input);
  
  // Assert
  expect(result).toBe(expected);
});
```

### 3. Test One Thing

Each test should verify a single behavior.

```typescript
// ❌ Bad - tests multiple things
test('window management', () => {
  windowManager.open('test');
  expect(windowManager.all).toHaveLength(1);
  
  windowManager.minimize('test');
  expect(windowManager.all[0].isMinimized).toBe(true);
  
  windowManager.close('test');
  expect(windowManager.all).toHaveLength(0);
});

// ✅ Good - separate tests
test('when opened then adds to list', () => {
  windowManager.open('test');
  expect(windowManager.all).toHaveLength(1);
});

test('when minimized then sets flag', () => {
  const id = windowManager.open('test');
  windowManager.minimize(id);
  expect(windowManager.all[0].isMinimized).toBe(true);
});
```

### 4. Avoid Implementation Details

Test behavior, not internal state.

```typescript
// ❌ Bad - tests implementation
test('uses correct algorithm', () => {
  expect(component.internalCounter).toBe(5);
});

// ✅ Good - tests behavior
test('displays correct count', () => {
  expect(screen.getByText('Count: 5')).toBeInTheDocument();
});
```

### 5. Use Factories for Test Data

Create reusable test data builders.

```typescript
// test/factories/window.ts
export function createTestWindow(overrides = {}) {
  return {
    id: crypto.randomUUID(),
    pluginId: 'test-plugin',
    title: 'Test Window',
    iconClass: 'icon-test',
    position: { x: 100, y: 100 },
    size: { width: 600, height: 400 },
    zIndex: 100,
    isMinimized: false,
    isMaximized: false,
    isFocused: true,
    isResizable: true,
    ...overrides
  };
}

// Usage
test('example', () => {
  const window = createTestWindow({ isMinimized: true });
  // test with window
});
```

## Debugging Tests

### Run Single Test

```bash
npm test -- -t "test name pattern"
```

### Watch Mode

```bash
npm run test:watch
```

### Debug in VS Code

`.vscode/launch.json`:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Tests",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["test"],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```

## Summary

Testing the Abu OS 98 Web Kernel:

- ✅ Unit tests for functions, stores, components
- ✅ Integration tests for workflows
- ✅ E2E tests for critical paths
- ✅ 100% code coverage requirement
- ✅ Fast feedback (`<1`s unit tests)
- ✅ Automated in CI/CD

## Next Steps

- See `/docs/examples/` for complete tested plugin examples
- Read `/docs/architecture/performance-model.md` for performance testing
- Check plugin examples for test patterns

Your code is now bulletproof! 🛡️
