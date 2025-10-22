import { test, expect } from '@playwright/test';

test.describe('Abu OS 98 Demo - Interactive Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('demo');
    
    // Wait for React to hydrate
    await page.waitForSelector('#__docusaurus', { timeout: 5000 });
    
    // Wait for the demo page to load
    await page.waitForSelector('h1', { timeout: 10000 });
  });

  test('should load the demo page and show Windows 98 interface', async ({ page }) => {
    // Check that the main interface elements are present
    await expect(page.locator('.desktop, .shell, [data-testid="desktop"]').first()).toBeVisible();
    await expect(page.locator('.taskbar')).toBeVisible();
    await expect(page.locator('.start-button')).toBeVisible();
    
    // Take a screenshot of the initial state
    await page.screenshot({ 
      path: 'test-results/demo-initial-state.png',
      fullPage: true 
    });
  });

  test('should open start menu and select an option', async ({ page }) => {
    
    // Click the start button
    await page.locator('.start-button').click();
    
    // Wait for start menu to appear
    await expect(page.locator('.start-menu')).toBeVisible();
    
    // Take screenshot of start menu
    await page.screenshot({ 
      path: 'test-results/demo-start-menu-open.png',
      fullPage: true 
    });
    
    // Look for a menu item to click (Help Topics or similar)
    const menuItem = page.locator('.start-menu-item').first();
    if (await menuItem.isVisible()) {
      await menuItem.click();
      
      // Wait a moment for any action to complete
      await page.waitForTimeout(1000);
      
      // Take screenshot after menu interaction
      await page.screenshot({ 
        path: 'test-results/demo-start-menu-interaction.png',
        fullPage: true 
      });
    }
  });

  test('should interact with desktop icons', async ({ page }) => {
    
    // Look for desktop icons
    const desktopIcons = page.locator('.desktop-icon');
    const iconCount = await desktopIcons.count();
    
    if (iconCount > 0) {
      // Double-click the first desktop icon
      await desktopIcons.first().dblclick();
      
      // Wait for any window to open
      await page.waitForTimeout(2000);
      
      // Take screenshot after icon interaction
      await page.screenshot({ 
        path: 'test-results/demo-desktop-icon-interaction.png',
        fullPage: true 
      });
    }
  });

  test('should open and interact with windows', async ({ page }) => {
    
    // Try to open a window by clicking start menu and selecting an option
    await page.locator('.start-button').click();
    await expect(page.locator('.start-menu')).toBeVisible();
    
    // Look for Help Topics or similar option
    const helpMenuItem = page.locator('.start-menu-item').filter({ hasText: /help|topics/i }).first();
    
    if (await helpMenuItem.isVisible()) {
      await helpMenuItem.click();
      
      // Wait for window to open
      await page.waitForTimeout(3000);
      
      // Look for any open windows
      const windows = page.locator('.window');
      const windowCount = await windows.count();
      
      if (windowCount > 0) {
        const window = windows.first();
        
        // Take screenshot of opened window
        await page.screenshot({ 
          path: 'test-results/demo-window-opened.png',
          fullPage: true 
        });
        
        // Test window dragging
        const titleBar = window.locator('.window-title-bar');
        if (await titleBar.isVisible()) {
          // Get initial position
          const initialBox = await titleBar.boundingBox();
          
          // Drag the window
          await titleBar.hover();
          await page.mouse.down();
          await page.mouse.move(initialBox!.x + 100, initialBox!.y + 50);
          await page.mouse.up();
          
          await page.waitForTimeout(1000);
          
          // Take screenshot after dragging
          await page.screenshot({ 
            path: 'test-results/demo-window-dragged.png',
            fullPage: true 
          });
        }
        
        // Test window resizing
        const resizeHandle = window.locator('.window-resize-handle');
        if (await resizeHandle.isVisible()) {
          const resizeBox = await resizeHandle.boundingBox();
          
          // Resize the window
          await resizeHandle.hover();
          await page.mouse.down();
          await page.mouse.move(resizeBox!.x + 50, resizeBox!.y + 50);
          await page.mouse.up();
          
          await page.waitForTimeout(1000);
          
          // Take screenshot after resizing
          await page.screenshot({ 
            path: 'test-results/demo-window-resized.png',
            fullPage: true 
          });
        }
      }
    }
  });

  test('should verify Windows 98 styling and aesthetics', async ({ page }) => {
    
    // Check for Windows 98 specific styling
    const desktop = page.locator('.desktop');
    const taskbar = page.locator('.taskbar');
    const startButton = page.locator('.start-button');
    
    // Verify elements are styled correctly
    await expect(desktop).toBeVisible();
    await expect(taskbar).toBeVisible();
    await expect(startButton).toBeVisible();
    
    // Check for Windows 98 color scheme
    const desktopColor = await desktop.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Windows 98 desktop should have a teal/blue background
    expect(desktopColor).toMatch(/rgb\(0,\s*128,\s*128\)|rgb\(0,\s*128,\s*128\)|#008080/);
    
    // Check taskbar styling
    const taskbarColor = await taskbar.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Taskbar should have a gray background
    expect(taskbarColor).toMatch(/rgb\(192,\s*192,\s*192\)|#c0c0c0/);
    
    // Take final screenshot for visual verification
    await page.screenshot({ 
      path: 'test-results/demo-styling-verification.png',
      fullPage: true 
    });
  });

  test('should handle window management operations', async ({ page }) => {
    
    // Try to open a window first
    await page.locator('.start-button').click();
    await expect(page.locator('.start-menu')).toBeVisible();
    
    const helpMenuItem = page.locator('.start-menu-item').filter({ hasText: /help|topics/i }).first();
    
    if (await helpMenuItem.isVisible()) {
      await helpMenuItem.click();
      await page.waitForTimeout(3000);
      
      const windows = page.locator('.window');
      const windowCount = await windows.count();
      
      if (windowCount > 0) {
        const window = windows.first();
        
        // Test minimize button
        const minimizeButton = window.locator('.window-minimize');
        if (await minimizeButton.isVisible()) {
          await minimizeButton.click();
          await page.waitForTimeout(1000);
          
          await page.screenshot({ 
            path: 'test-results/demo-window-minimized.png',
            fullPage: true 
          });
        }
        
        // Test maximize button
        const maximizeButton = window.locator('.window-maximize');
        if (await maximizeButton.isVisible()) {
          await maximizeButton.click();
          await page.waitForTimeout(1000);
          
          await page.screenshot({ 
            path: 'test-results/demo-window-maximized.png',
            fullPage: true 
          });
        }
        
        // Test close button
        const closeButton = window.locator('.window-close');
        if (await closeButton.isVisible()) {
          await closeButton.click();
          await page.waitForTimeout(1000);
          
          await page.screenshot({ 
            path: 'test-results/demo-window-closed.png',
            fullPage: true 
          });
        }
      }
    }
  });

  test('should test keyboard interactions', async ({ page }) => {
    
    // Test keyboard shortcuts
    await page.keyboard.press('Escape'); // Should close any open menus
    
    // Test Alt+Tab for window switching (if multiple windows)
    await page.keyboard.press('Alt+Tab');
    await page.waitForTimeout(500);
    
    // Test F1 for help
    await page.keyboard.press('F1');
    await page.waitForTimeout(1000);
    
    await page.screenshot({ 
      path: 'test-results/demo-keyboard-interactions.png',
      fullPage: true 
    });
  });

  test('should handle rapid interactions and stress test', async ({ page }) => {
    
    // Rapid clicking on start button
    for (let i = 0; i < 5; i++) {
      await page.locator('.start-button').click();
      await page.waitForTimeout(200);
    }
    
    // Rapid window operations if any windows are open
    const windows = page.locator('.window');
    const windowCount = await windows.count();
    
    if (windowCount > 0) {
      const window = windows.first();
      
      // Rapid resizing
      const resizeHandle = window.locator('.window-resize-handle');
      if (await resizeHandle.isVisible()) {
        for (let i = 0; i < 3; i++) {
          await resizeHandle.hover();
          await page.mouse.down();
          await page.mouse.move(100 + i * 20, 100 + i * 20);
          await page.mouse.up();
          await page.waitForTimeout(100);
        }
      }
    }
    
    // Take final screenshot to capture any issues
    await page.screenshot({ 
      path: 'test-results/demo-stress-test.png',
      fullPage: true 
    });
  });
});
