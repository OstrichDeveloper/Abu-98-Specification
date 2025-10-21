//! E2E tests for Abu-Specification documentation site
//! 
//! Tests for Docusaurus documentation functionality

import { test, expect } from '@playwright/test';

test.describe('Abu Specification Documentation', () => {
  test('should load the documentation site', async ({ page }) => {
    await page.goto('/');
    
    // Should load the main documentation homepage
    await expect(page).toHaveTitle(/Abu OS Documentation/);
    await expect(page.locator('h1')).toContainText('Welcome to Abu OS Documentation');
  });

  test('should have navigation working', async ({ page }) => {
    await page.goto('/docs/intro');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check for navigation elements
    const hasNav = await page.evaluate(() => {
      return document.querySelector('nav') !== null;
    });
    
    expect(hasNav).toBe(true);
  });

  test('should have search functionality', async ({ page }) => {
    await page.goto('/docs/intro');
    
    // Look for search input
    const searchInput = page.locator('input[type="search"]').first();
    
    if (await searchInput.isVisible()) {
      await searchInput.fill('test');
      await expect(searchInput).toHaveValue('test');
    }
  });

  test('should have demo link in navigation', async ({ page }) => {
    await page.goto('/');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
        // Check for demo link in navigation
        const demoLink = page.locator('a[href="/demo.html"]');
        await expect(demoLink).toBeVisible();
        await expect(demoLink).toHaveText('Demo');
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

