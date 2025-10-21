//! E2E tests for design system compliance
//! 
//! Tests design tokens from /docs/design/ against actual implementation

import { test, expect } from '@playwright/test';

test.describe('Design System Compliance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo.html');
    await page.waitForLoadState('networkidle');
    
    // Wait for Web Kernel to load
    await page.waitForSelector('.help-system-window', { timeout: 10000 });
  });

  test('color system compliance', async ({ page }) => {
    // Test Windows Blue (#000080) - title bars, active borders
    const titlebars = page.locator('.titlebar, .window-titlebar');
    if (await titlebars.count() > 0) {
      const backgroundColor = await titlebars.first().evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(backgroundColor).toMatch(/rgb\(0,\s*0,\s*128\)|rgb\(0,\s*0,\s*136\)/);
    }

    // Test Button Face (#C0C0C0) - button backgrounds, dialog backgrounds
    const buttons = page.locator('button, .button');
    if (await buttons.count() > 0) {
      await expect(buttons.first()).toHaveCSS('background-color', 'rgb(192, 192, 192)');
    }

    // Test Button Shadow (#808080) - bottom/right borders
    const elementsWithShadow = page.locator('button, .button, .window');
    if (await elementsWithShadow.count() > 0) {
      const borderColor = await elementsWithShadow.first().evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.borderBottomColor || style.borderRightColor;
      });
      expect(borderColor).toMatch(/rgb\(128,\s*128,\s*128\)/);
    }

    // Test Button Highlight (#FFFFFF) - top/left borders
    const elementsWithHighlight = page.locator('button, .button');
    if (await elementsWithHighlight.count() > 0) {
      const borderColor = await elementsWithHighlight.first().evaluate(el => {
        const style = window.getComputedStyle(el);
        return style.borderTopColor || style.borderLeftColor;
      });
      expect(borderColor).toMatch(/rgb\(255,\s*255,\s*255\)/);
    }

    // Test Window Text (#000000) - default text color
    const textElements = page.locator('body, .content, p, span');
    if (await textElements.count() > 0) {
      await expect(textElements.first()).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  });

  test('typography system compliance', async ({ page }) => {
    // Test MS Sans Serif font family
    const body = page.locator('body');
    await expect(body).toHaveCSS('font-family', /MS Sans Serif/);

    // Test font sizes are appropriate for Windows 98
    const buttons = page.locator('button, .button');
    if (await buttons.count() > 0) {
      const fontSize = await buttons.first().evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      // Should be around 11px (typical Windows 98 button text)
      expect(parseFloat(fontSize)).toBeGreaterThanOrEqual(10);
      expect(parseFloat(fontSize)).toBeLessThanOrEqual(12);
    }

    // Test that all text elements use Windows 98 fonts
    const textElements = page.locator('*');
    const count = await textElements.count();
    
    // Sample a few elements to check font compliance
    for (let i = 0; i < Math.min(count, 10); i++) {
      const element = textElements.nth(i);
      const fontFamily = await element.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      
      // Should use Windows 98 fonts, not browser defaults
      if (fontFamily && !fontFamily.includes('serif') && !fontFamily.includes('monospace')) {
        expect(fontFamily).toMatch(/MS Sans Serif|Tahoma|Arial/);
      }
    }
  });

  test('visual system compliance', async ({ page }) => {
    // Test 3D border effects (outset/inset)
    const raisedElements = page.locator('button, .button');
    if (await raisedElements.count() > 0) {
      const borderStyle = await raisedElements.first().evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      expect(borderStyle).toMatch(/outset|solid/);
    }

    const insetElements = page.locator('input, .input, .window');
    if (await insetElements.count() > 0) {
      const borderStyle = await insetElements.first().evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      expect(borderStyle).toMatch(/inset|solid/);
    }

    // Test proper border widths (typically 2px for Windows 98)
    const borderedElements = page.locator('button, .button, .window, input');
    if (await borderedElements.count() > 0) {
      const borderWidth = await borderedElements.first().evaluate(el => 
        window.getComputedStyle(el).borderWidth
      );
      expect(borderWidth).toMatch(/2px|1px/);
    }
  });

  test('cursor system compliance', async ({ page }) => {
    // Test that interactive elements have proper cursors
    const buttons = page.locator('button, .button, [role="button"]');
    if (await buttons.count() > 0) {
      const cursor = await buttons.first().evaluate(el => 
        window.getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }

    const inputs = page.locator('input, textarea, [contenteditable]');
    if (await inputs.count() > 0) {
      const cursor = await inputs.first().evaluate(el => 
        window.getComputedStyle(el).cursor
      );
      expect(cursor).toBe('text');
    }

    // Test that links have pointer cursor
    const links = page.locator('a, [href]');
    if (await links.count() > 0) {
      const cursor = await links.first().evaluate(el => 
        window.getComputedStyle(el).cursor
      );
      expect(cursor).toBe('pointer');
    }
  });

  test('icon system compliance', async ({ page }) => {
    // Test that icons use proper Windows 98 styling
    const icons = page.locator('[class*="icon"], [data-icon], img[src*="icon"]');
    
    if (await icons.count() > 0) {
      // Icons should have proper dimensions (typically 16x16 or 32x32)
      const firstIcon = icons.first();
      const box = await firstIcon.boundingBox();
      
      if (box) {
        // Should be square and reasonable size
        expect(box.width).toBeGreaterThanOrEqual(12);
        expect(box.width).toBeLessThanOrEqual(48);
        expect(Math.abs(box.width - box.height)).toBeLessThan(4); // Roughly square
      }
    }
  });

  test('spacing and layout compliance', async ({ page }) => {
    // Test that elements have proper Windows 98 spacing
    const buttons = page.locator('button, .button');
    if (await buttons.count() > 0) {
      const padding = await buttons.first().evaluate(el => 
        window.getComputedStyle(el).padding
      );
      // Should have some padding (not 0)
      expect(padding).not.toBe('0px');
    }

    // Test that windows have proper margins/padding
    const windows = page.locator('.window, .dialog');
    if (await windows.count() > 0) {
      const margin = await windows.first().evaluate(el => 
        window.getComputedStyle(el).margin
      );
      // Windows should have some margin from edges
      expect(margin).not.toBe('0px');
    }
  });

  test('accessibility compliance', async ({ page }) => {
    // Test that interactive elements have proper focus states
    const focusableElements = page.locator('button, input, select, textarea, a, [tabindex]');
    
    if (await focusableElements.count() > 0) {
      const firstElement = focusableElements.first();
      
      // Focus the element
      await firstElement.focus();
      
      // Check that it has a focus state (outline or similar)
      const outline = await firstElement.evaluate(el => 
        window.getComputedStyle(el).outline
      );
      
      // Should have some kind of focus indicator
      expect(outline).not.toBe('none');
    }

    // Test that images have alt text
    const images = page.locator('img');
    if (await images.count() > 0) {
      const altText = await images.first().getAttribute('alt');
      // Should have alt text or be decorative
      expect(altText).not.toBeNull();
    }
  });

  test('responsive design compliance', async ({ page }) => {
    // Test at different viewport sizes
    const viewports = [
      { width: 800, height: 600 },   // Minimum Windows 98 resolution
      { width: 1024, height: 768 },  // Standard Windows 98 resolution
      { width: 1280, height: 1024 }  // Higher resolution
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.waitForTimeout(100); // Allow layout to settle

      // Check that main elements are still visible and properly sized
      const mainContent = page.locator('body, .main, .content');
      if (await mainContent.count() > 0) {
        const box = await mainContent.first().boundingBox();
        if (box) {
          // Content should fit within viewport
          expect(box.width).toBeLessThanOrEqual(viewport.width);
          expect(box.height).toBeLessThanOrEqual(viewport.height);
        }
      }
    }
  });

});
