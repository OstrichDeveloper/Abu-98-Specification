import { test, expect } from '@playwright/test';

test.describe('Demo Page Sanity Check', () => {
  test('demo page should load and contain demo content', async ({ page }) => {
    await page.goto('/demo');
    
    // Wait for the page to load
    await page.waitForLoadState('networkidle');
    
    // Debug: Log the page content and title
    const title = await page.title();
    console.log('Page title:', title);
    
    const content = await page.content();
    console.log('Page content length:', content.length);
    console.log('Page content preview:', content.substring(0, 500));
    
    // Check that the page loaded successfully (not a 404)
    expect(title).not.toContain('Page Not Found');
    expect(title).toContain('Abu OS 98 Demo');
    
    // Check that we have the demo content
    await expect(page.locator('h1')).toContainText('Abu OS 98 Demo');
    await expect(page.locator('p')).toContainText('This is a test of the React page without iframe.');
  });
});
