import { test, expect } from '@playwright/test';

test.describe('Demo Page Sanity Check', () => {
  test('demo page should load and contain demo content', async ({ page }) => {
    // Listen for console messages and errors
    page.on('console', msg => console.log('BROWSER:', msg.type(), msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    
    // Navigate to the demo page (Docusaurus uses hashed routes)
    await page.goto('demo');
    
    // Wait for the page to load and React to hydrate
    await page.waitForLoadState('domcontentloaded');
    await page.waitForSelector('#__docusaurus', { timeout: 5000 });
    
    // Wait for the Web Kernel to load - look for desktop or taskbar elements
    await page.waitForSelector('.desktop, .taskbar, .taskbar-start-button', { timeout: 15000 });
    
    // Remove webpack dev server overlay that blocks interactions
    await page.evaluate(() => {
      const overlay = document.getElementById('webpack-dev-server-client-overlay');
      if (overlay) {
        overlay.remove();
      }
    });
    
    // Check that we have the Web Kernel components
    await expect(page.locator('.desktop')).toBeVisible();
    await expect(page.locator('.taskbar')).toBeVisible();
    await expect(page.locator('.taskbar-start-button')).toBeVisible();
    
    // Check the title after React has rendered
    const title = await page.title();
    expect(title).toContain('Abu OS 98 Demo');
  });
});
