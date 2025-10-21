import { test, expect } from '@playwright/test';

test.describe('New Demo Page Test', () => {
  test('new demo page should load', async ({ page }) => {
    await page.goto('/new-demo');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page loaded successfully (not a 404)
    const title = await page.title();
    console.log('Page title:', title);
    
    expect(title).not.toContain('Page Not Found');
    
    // Check that we have the demo content
    await expect(page.locator('h1')).toContainText('New Demo Page');
  });
});
