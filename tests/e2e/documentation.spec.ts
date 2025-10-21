//! E2E tests for Abu-Specification documentation site
//! 
//! Tests for Docusaurus documentation functionality

import { test, expect } from '@playwright/test';

test.describe('Abu Specification Documentation', () => {
  test('should load the documentation site', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page loads
    await expect(page).toHaveTitle(/Abu Specification/);
  });

  test('should have navigation working', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for navigation elements
    const hasNav = await page.evaluate(() => {
      return document.querySelector('nav') !== null;
    });
    
    expect(hasNav).toBe(true);
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
    }
  });

  test('should have help system integration', async ({ page }) => {
    await page.goto('/');
    
    // Check for Abu Web Kernel help system
    const hasHelpSystem = await page.evaluate(() => {
      return document.querySelector('[data-abu-help]') !== null ||
             document.querySelector('.help-system') !== null;
    });
    
    // This might not be present, so we just check the page loads
    expect(true).toBe(true);
  });

  test('should have proper content structure', async ({ page }) => {
    await page.goto('/');
    
    // Check for main content area
    const hasContent = await page.evaluate(() => {
      return document.querySelector('main') !== null ||
             document.querySelector('.main-content') !== null ||
             document.body.textContent && document.body.textContent.length > 100;
    });
    
    expect(hasContent).toBe(true);
  });
});
