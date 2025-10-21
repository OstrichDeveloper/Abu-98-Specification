import { test, expect } from '@playwright/test';

test.describe('Demo Page Sanity Check', () => {
  test('demo page should load and contain web kernel iframe', async ({ page }) => {
    await page.goto('demo.html');
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    expect(title).not.toContain('Page Not Found');
    expect(title).not.toContain('Abu OS Documentation');
    
    const iframe = page.locator('iframe[src*="web-kernel-demo.html"]');
    await expect(iframe).toBeVisible({ timeout: 10000 });
  });
});
