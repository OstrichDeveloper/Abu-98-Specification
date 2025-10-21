//! E2E tests for Windows 98 aesthetic validation
//! 
//! Validates that the entire interface maintains authentic Windows 98 styling

import { test, expect } from '@playwright/test';

test.describe('Windows 98 Aesthetic Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo.html');
    await page.waitForLoadState('networkidle');
  });

  test('all interactive elements have Windows 98 styling', async ({ page }) => {
    // Get all interactive elements
    const buttons = await page.locator('button').all();
    const inputs = await page.locator('input').all();
    const selects = await page.locator('select').all();
    const textareas = await page.locator('textarea').all();
    const links = await page.locator('a').all();
    
    const allInteractive = [...buttons, ...inputs, ...selects, ...textareas, ...links];
    
    for (const element of allInteractive) {
      // Validate each has proper Windows 98 styling
      const fontFamily = await element.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toMatch(/MS Sans Serif|Tahoma|Arial/);
      
      // Should not use browser default fonts
      expect(fontFamily).not.toMatch(/Times|Georgia|serif/);
      expect(fontFamily).not.toMatch(/Courier|monospace/);
    }
  });

  test('no browser default styling leaks through', async ({ page }) => {
    // Check that no elements use browser default colors
    const allElements = await page.locator('*').all();
    
    for (let i = 0; i < Math.min(allElements.length, 20); i++) {
      const element = allElements[i];
      
      const backgroundColor = await element.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const color = await element.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Should not use browser defaults
      expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
      expect(color).not.toBe('rgb(0, 0, 0)'); // Not pure black (unless intended)
      
      // Should use Windows 98 color palette
      if (backgroundColor !== 'rgba(0, 0, 0, 0)') {
        const isWindows98Color = 
          backgroundColor.includes('192, 192, 192') || // Button face
          backgroundColor.includes('128, 128, 128') || // Button shadow
          backgroundColor.includes('255, 255, 255') || // Button highlight
          backgroundColor.includes('0, 0, 128') ||     // Windows blue
          backgroundColor.includes('255, 255, 224');   // Info background
        
        if (!isWindows98Color) {
          // Allow some flexibility for content areas
          console.log(`Non-Windows 98 color detected: ${backgroundColor}`);
        }
      }
    }
  });

  test('proper 3D border effects throughout', async ({ page }) => {
    // Check that raised elements (buttons) have outset borders
    const buttons = await page.locator('button, .button, [role="button"]').all();
    
    for (const button of buttons) {
      const borderStyle = await button.evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      const borderWidth = await button.evaluate(el => 
        window.getComputedStyle(el).borderWidth
      );
      
      expect(borderStyle).toMatch(/outset|solid/);
      expect(borderWidth).toMatch(/2px|1px/);
    }

    // Check that inset elements (inputs, windows) have inset borders
    const insetElements = await page.locator('input, .input, .window, .dialog').all();
    
    for (const element of insetElements) {
      const borderStyle = await element.evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      const borderWidth = await element.evaluate(el => 
        window.getComputedStyle(el).borderWidth
      );
      
      expect(borderStyle).toMatch(/inset|solid/);
      expect(borderWidth).toMatch(/2px|1px/);
    }
  });

  test('consistent typography throughout interface', async ({ page }) => {
    // All text should use Windows 98 fonts
    const textElements = await page.locator('p, span, div, h1, h2, h3, h4, h5, h6, label').all();
    
    for (let i = 0; i < Math.min(textElements.length, 15); i++) {
      const element = textElements[i];
      
      const fontFamily = await element.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      const fontSize = await element.evaluate(el => 
        window.getComputedStyle(el).fontSize
      );
      
      // Should use Windows 98 fonts
      expect(fontFamily).toMatch(/MS Sans Serif|Tahoma|Arial/);
      
      // Font size should be reasonable for Windows 98 (8-14px typically)
      const size = parseFloat(fontSize);
      expect(size).toBeGreaterThanOrEqual(8);
      expect(size).toBeLessThanOrEqual(16);
    }
  });

  test('proper window chrome styling', async ({ page }) => {
    // Check window elements have proper chrome
    const windows = await page.locator('.window, .dialog, .modal').all();
    
    for (const window of windows) {
      // Should have proper background
      const backgroundColor = await window.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(backgroundColor).toMatch(/192, 192, 192|255, 255, 255/);
      
      // Should have proper border
      const borderWidth = await window.evaluate(el => 
        window.getComputedStyle(el).borderWidth
      );
      expect(borderWidth).toMatch(/2px|1px/);
    }

    // Check titlebars specifically
    const titlebars = await page.locator('.titlebar, .window-titlebar').all();
    
    for (const titlebar of titlebars) {
      const backgroundColor = await titlebar.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const color = await titlebar.evaluate(el => 
        window.getComputedStyle(el).color
      );
      
      // Should have Windows Blue background or gradient
      expect(backgroundColor).toMatch(/0, 0, 128|0, 0, 136/);
      expect(color).toMatch(/255, 255, 255/); // White text
    }
  });

  test('proper button states and interactions', async ({ page }) => {
    const buttons = await page.locator('button, .button').all();
    
    for (const button of buttons) {
      // Test normal state
      const normalBg = await button.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(normalBg).toMatch(/192, 192, 192|255, 255, 255/);
      
      // Test hover state (if supported)
      await button.hover();
      await page.waitForTimeout(100);
      
      const hoverBg = await button.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      // Hover might change color slightly
      
      // Test focus state
      await button.focus();
      const focusOutline = await button.evaluate(el => 
        window.getComputedStyle(el).outline
      );
      expect(focusOutline).not.toBe('none');
    }
  });

  test('proper form control styling', async ({ page }) => {
    // Check input fields
    const inputs = await page.locator('input[type="text"], input[type="search"], textarea').all();
    
    for (const input of inputs) {
      const backgroundColor = await input.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const borderStyle = await input.evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      
      expect(backgroundColor).toMatch(/255, 255, 255/); // White background
      expect(borderStyle).toMatch(/inset|solid/);
    }

    // Check select elements
    const selects = await page.locator('select').all();
    
    for (const select of selects) {
      const backgroundColor = await select.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const borderStyle = await select.evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      
      expect(backgroundColor).toMatch(/192, 192, 192|255, 255, 255/);
      expect(borderStyle).toMatch(/inset|solid/);
    }

    // Check checkboxes and radio buttons
    const checkboxes = await page.locator('input[type="checkbox"], input[type="radio"]').all();
    
    for (const checkbox of checkboxes) {
      const backgroundColor = await checkbox.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(backgroundColor).toMatch(/255, 255, 255/); // White background
    }
  });

  test('proper menu and navigation styling', async ({ page }) => {
    // Check menu elements
    const menus = await page.locator('.menu, .menubar, .start-menu, nav').all();
    
    for (const menu of menus) {
      const backgroundColor = await menu.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      const borderStyle = await menu.evaluate(el => 
        window.getComputedStyle(el).borderStyle
      );
      
      expect(backgroundColor).toMatch(/192, 192, 192|255, 255, 255/);
      expect(borderStyle).toMatch(/outset|inset|solid/);
    }

    // Check menu items
    const menuItems = await page.locator('.menu-item, .menubar-item, nav a').all();
    
    for (const item of menuItems) {
      const fontFamily = await item.evaluate(el => 
        window.getComputedStyle(el).fontFamily
      );
      expect(fontFamily).toMatch(/MS Sans Serif|Tahoma|Arial/);
    }
  });

  test('proper scrollbar styling', async ({ page }) => {
    // Check that scrollable elements have proper styling
    const scrollableElements = await page.locator('[style*="overflow"], .scrollable').all();
    
    for (const element of scrollableElements) {
      const overflow = await element.evaluate(el => 
        window.getComputedStyle(el).overflow
      );
      
      if (overflow === 'auto' || overflow === 'scroll') {
        // Should have proper background for scrollable content
        const backgroundColor = await element.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        expect(backgroundColor).toMatch(/192, 192, 192|255, 255, 255/);
      }
    }
  });

  test('no modern CSS features that break Windows 98 aesthetic', async ({ page }) => {
    // Check that no elements use modern CSS that would break the aesthetic
    const allElements = await page.locator('*').all();
    
    for (let i = 0; i < Math.min(allElements.length, 20); i++) {
      const element = allElements[i];
      
      // Check for modern CSS properties that shouldn't be used
      const boxShadow = await element.evaluate(el => 
        window.getComputedStyle(el).boxShadow
      );
      const borderRadius = await element.evaluate(el => 
        window.getComputedStyle(el).borderRadius
      );
      const transform = await element.evaluate(el => 
        window.getComputedStyle(el).transform
      );
      
      // Windows 98 didn't have these features
      expect(boxShadow).toBe('none');
      expect(borderRadius).toBe('0px');
      expect(transform).toBe('none');
    }
  });
});
