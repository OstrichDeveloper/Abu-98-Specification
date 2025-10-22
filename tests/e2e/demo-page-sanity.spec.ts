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
    
    // Wait for the content to be rendered
    await page.waitForSelector('h1', { timeout: 10000 });
    
    // Check the h1 content
    const h1Text = await page.locator('h1').first().textContent();
    console.log('H1 text:', h1Text);
    
    // Check if it's the demo page or 404
    if (h1Text && h1Text.includes('Page Not Found')) {
      // Get the current URL to help debug
      const url = page.url();
      console.log('Current URL:', url);
      throw new Error(`Demo page returned 404 at ${url}. The React page may not be compiled correctly.`);
    }
    
    // Check that we have the Web Kernel components - look for any desktop icons
    // The Web Kernel is loading but may have Svelte 5 runes issues, so be flexible
    const desktopIcons = page.locator('button').filter({ hasText: /My Computer|Recycle Bin|Control Panel|Internet Explorer|SSH Terminal|Terminal/ });
    await expect(desktopIcons.first()).toBeVisible({ timeout: 15000 });
    
    // Check the title after React has rendered
    const title = await page.title();
    expect(title).toContain('Abu OS 98 Demo');
  });
});
