import { test, expect } from '@playwright/test';

test.describe('Demo Page Sanity Check', () => {
  test('demo page should load and contain web kernel iframe', async ({ page }) => {
    // Try accessing the static HTML file directly first
    await page.goto('/web-kernel-demo.html');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page loaded successfully
    const title = await page.title();
    expect(title).toContain('Abu OS 98 Demo');
    
    // Check that we have the app container
    const app = page.locator('#app');
    await expect(app).toBeVisible({ timeout: 5000 });
  });
});
