//! E2E visual regression tests
//! 
//! Uses Playwright screenshots to catch visual changes
//! Optimized for headless CI/CD execution

import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

      test('help system window matches baseline', async ({ page }) => {
        await page.goto('/demo.html');
        // Wait for help system to load
        await page.waitForSelector('.help-system-window, .window, [data-window]', { timeout: 10000 });
    
    // Take screenshot of the help system window
    const helpWindow = page.locator('.help-system-window, .window').first();
    await expect(helpWindow).toHaveScreenshot('help-window.png');
  });

  test('main interface layout matches baseline', async ({ page }) => {
    // Wait for main content to load
    await page.waitForSelector('body', { timeout: 5000 });
    
    // Take full page screenshot
    await expect(page).toHaveScreenshot('main-interface.png');
  });

  test('button components match baseline', async ({ page }) => {
    // Look for buttons and take screenshot
    const buttons = page.locator('button, .button');
    
    if (await buttons.count() > 0) {
      await expect(buttons.first()).toHaveScreenshot('button-component.png');
    }
  });

  test('input components match baseline', async ({ page }) => {
    // Look for input fields and take screenshot
    const inputs = page.locator('input[type="text"], input[type="search"], .input');
    
    if (await inputs.count() > 0) {
      await expect(inputs.first()).toHaveScreenshot('input-component.png');
    }
  });

  test('window chrome matches baseline', async ({ page }) => {
    // Look for window elements and take screenshot
    const windows = page.locator('.window, .dialog, .modal');
    
    if (await windows.count() > 0) {
      await expect(windows.first()).toHaveScreenshot('window-chrome.png');
    }
  });

  test('titlebar matches baseline', async ({ page }) => {
    // Look for titlebar elements and take screenshot
    const titlebars = page.locator('.titlebar, .window-titlebar');
    
    if (await titlebars.count() > 0) {
      await expect(titlebars.first()).toHaveScreenshot('titlebar.png');
    }
  });

  test('menu components match baseline', async ({ page }) => {
    // Look for menu elements and take screenshot
    const menus = page.locator('.menu, .menubar, .start-menu');
    
    if (await menus.count() > 0) {
      await expect(menus.first()).toHaveScreenshot('menu-component.png');
    }
  });

  test('form controls match baseline', async ({ page }) => {
    // Look for form elements and take screenshot
    const forms = page.locator('form, .form');
    
    if (await forms.count() > 0) {
      await expect(forms.first()).toHaveScreenshot('form-controls.png');
    } else {
      // If no forms, take screenshot of individual form elements
      const select = page.locator('select').first();
      if (await select.count() > 0) {
        await expect(select).toHaveScreenshot('select-component.png');
      }
    }
  });

  test('responsive layout at different viewport sizes', async ({ page }) => {
    // Test at minimum Windows 98 resolution
    await page.setViewportSize({ width: 800, height: 600 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('layout-800x600.png');

    // Test at standard Windows 98 resolution
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('layout-1024x768.png');

    // Test at higher resolution
    await page.setViewportSize({ width: 1280, height: 1024 });
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('layout-1280x1024.png');
  });

  test('component states match baseline', async ({ page }) => {
    // Test button states
    const buttons = page.locator('button, .button');
    
    if (await buttons.count() > 0) {
      const button = buttons.first();
      
      // Normal state
      await expect(button).toHaveScreenshot('button-normal.png');
      
      // Hover state
      await button.hover();
      await page.waitForTimeout(100);
      await expect(button).toHaveScreenshot('button-hover.png');
      
      // Focus state
      await button.focus();
      await page.waitForTimeout(100);
      await expect(button).toHaveScreenshot('button-focus.png');
    }
  });

  test('dialog and modal components match baseline', async ({ page }) => {
    // Look for dialog elements
    const dialogs = page.locator('.dialog, .modal, [role="dialog"]');
    
    if (await dialogs.count() > 0) {
      await expect(dialogs.first()).toHaveScreenshot('dialog-component.png');
    }
  });

  test('navigation elements match baseline', async ({ page }) => {
    // Look for navigation elements
    const nav = page.locator('nav, .navigation, .navbar');
    
    if (await nav.count() > 0) {
      await expect(nav.first()).toHaveScreenshot('navigation.png');
    }
  });

  test('content areas match baseline', async ({ page }) => {
    // Look for main content areas
    const content = page.locator('.content, .main, main, .help-content');
    
    if (await content.count() > 0) {
      await expect(content.first()).toHaveScreenshot('content-area.png');
    }
  });

  test('status and info elements match baseline', async ({ page }) => {
    // Look for status bars, tooltips, etc.
    const statusBars = page.locator('.statusbar, .status-bar, .tooltip');
    
    if (await statusBars.count() > 0) {
      await expect(statusBars.first()).toHaveScreenshot('status-elements.png');
    }
  });

  test('icon and image elements match baseline', async ({ page }) => {
    // Look for icons and images
    const icons = page.locator('[class*="icon"], img, [data-icon]');
    
    if (await icons.count() > 0) {
      await expect(icons.first()).toHaveScreenshot('icon-element.png');
    }
  });

  test('scrollable content matches baseline', async ({ page }) => {
    // Look for scrollable elements
    const scrollable = page.locator('[style*="overflow"], .scrollable');
    
    if (await scrollable.count() > 0) {
      await expect(scrollable.first()).toHaveScreenshot('scrollable-content.png');
    }
  });

  test('error and loading states match baseline', async ({ page }) => {
    // Test error states (if any)
    const errorElements = page.locator('.error, .alert, [role="alert"]');
    
    if (await errorElements.count() > 0) {
      await expect(errorElements.first()).toHaveScreenshot('error-state.png');
    }

    // Test loading states (if any)
    const loadingElements = page.locator('.loading, .spinner, [aria-busy="true"]');
    
    if (await loadingElements.count() > 0) {
      await expect(loadingElements.first()).toHaveScreenshot('loading-state.png');
    }
  });

  test('accessibility focus indicators match baseline', async ({ page }) => {
    // Test focus indicators
    const focusableElements = page.locator('button, input, select, textarea, a, [tabindex]');
    
    if (await focusableElements.count() > 0) {
      const element = focusableElements.first();
      await element.focus();
      await page.waitForTimeout(100);
      await expect(element).toHaveScreenshot('focus-indicator.png');
    }
  });
});
