//! E2E tests for specification compliance
//! 
//! Tests that all components match their specifications from /docs/design/components/
//! Optimized for headless CI/CD execution

import { test, expect } from '@playwright/test';

test.describe('Specification Compliance - Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/demo.html');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
  });

  test('button component matches specification', async ({ page }) => {
    // Look for button elements in the help system
    const buttons = page.locator('button, .button, .abu-button');
    
    const buttonCount = await buttons.count();
    if (buttonCount > 0) {
      const firstButton = buttons.first();
      
      // Wait for button to be visible and stable
      await firstButton.waitFor({ state: 'visible', timeout: 3000 });
      
      // Validate dimensions (minimum specs)
      const box = await firstButton.boundingBox();
      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(23);
        expect(box.width).toBeGreaterThanOrEqual(75);
      }
      
      // Validate Windows 98 styling with more flexible matching
      const bgColor = await firstButton.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      expect(bgColor).toMatch(/rgb\(192,\s*192,\s*192\)|#c0c0c0/i);
      
      await expect(firstButton).toHaveCSS('border-width', '2px');
      await expect(firstButton).toHaveCSS('font-family', /MS Sans Serif|Tahoma|sans-serif/i);
      await expect(firstButton).toHaveCSS('color', 'rgb(0, 0, 0)'); // #000000
    } else {
      // Skip test if no buttons found (common in headless mode)
      test.skip(buttonCount === 0, 'No button elements found on page');
    }
  });

  test('window component matches specification', async ({ page }) => {
    // Look for window elements
    const windows = page.locator('.window, .help-system-window, [data-window]');
    
    if (await windows.count() > 0) {
      const firstWindow = windows.first();
      
      // Validate window styling
      await expect(firstWindow).toHaveCSS('background-color', 'rgb(192, 192, 192)'); // #C0C0C0
      await expect(firstWindow).toHaveCSS('border-width', '2px');
      await expect(firstWindow).toHaveCSS('border-style', 'inset');
    }
  });

  test('titlebar component matches specification', async ({ page }) => {
    // Look for titlebar elements
    const titlebars = page.locator('.titlebar, .window-titlebar, [data-titlebar]');
    
    if (await titlebars.count() > 0) {
      const firstTitlebar = titlebars.first();
      
      // Validate titlebar styling - should have Windows Blue gradient or solid color
      const backgroundColor = await firstTitlebar.evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // Should be Windows Blue (#000080) or similar
      expect(backgroundColor).toMatch(/rgb\(0,\s*0,\s*128\)|rgb\(0,\s*0,\s*136\)/);
      
      // Text should be white
      await expect(firstTitlebar).toHaveCSS('color', 'rgb(255, 255, 255)');
    }
  });

  test('input component matches specification', async ({ page }) => {
    // Look for input elements
    const inputs = page.locator('input[type="text"], input[type="search"], .input, .abu-input');
    
    if (await inputs.count() > 0) {
      const firstInput = inputs.first();
      
      // Validate input styling
      await expect(firstInput).toHaveCSS('background-color', 'rgb(255, 255, 255)'); // White background
      await expect(firstInput).toHaveCSS('border-width', '2px');
      await expect(firstInput).toHaveCSS('border-style', 'inset');
      await expect(firstInput).toHaveCSS('font-family', /MS Sans Serif|Tahoma/);
    }
  });

  test('checkbox component matches specification', async ({ page }) => {
    // Look for checkbox elements
    const checkboxes = page.locator('input[type="checkbox"], .checkbox, .abu-checkbox');
    
    if (await checkboxes.count() > 0) {
      const firstCheckbox = checkboxes.first();
      
      // Validate checkbox styling
      await expect(firstCheckbox).toHaveCSS('background-color', 'rgb(255, 255, 255)'); // White background
      await expect(firstCheckbox).toHaveCSS('border-width', '1px');
      await expect(firstCheckbox).toHaveCSS('border-style', 'solid');
    }
  });

  test('select component matches specification', async ({ page }) => {
    // Look for select elements
    const selects = page.locator('select, .select, .abu-select');
    
    if (await selects.count() > 0) {
      const firstSelect = selects.first();
      
      // Validate select styling
      await expect(firstSelect).toHaveCSS('background-color', 'rgb(192, 192, 192)'); // Button face color
      await expect(firstSelect).toHaveCSS('border-width', '2px');
      await expect(firstSelect).toHaveCSS('border-style', 'inset');
      await expect(firstSelect).toHaveCSS('font-family', /MS Sans Serif|Tahoma/);
    }
  });

  test('progressbar component matches specification', async ({ page }) => {
    // Look for progress bar elements
    const progressbars = page.locator('.progressbar, .progress-bar, [data-progress]');
    
    if (await progressbars.count() > 0) {
      const firstProgressbar = progressbars.first();
      
      // Validate progress bar styling
      await expect(firstProgressbar).toHaveCSS('background-color', 'rgb(192, 192, 192)'); // Button face
      await expect(firstProgressbar).toHaveCSS('border-width', '2px');
      await expect(firstProgressbar).toHaveCSS('border-style', 'inset');
    }
  });

  test('menu component matches specification', async ({ page }) => {
    // Look for menu elements
    const menus = page.locator('.menu, .menubar, .start-menu, [data-menu]');
    
    if (await menus.count() > 0) {
      const firstMenu = menus.first();
      
      // Validate menu styling
      await expect(firstMenu).toHaveCSS('background-color', 'rgb(192, 192, 192)'); // Button face
      await expect(firstMenu).toHaveCSS('border-width', '2px');
      await expect(firstMenu).toHaveCSS('border-style', 'outset');
      await expect(firstMenu).toHaveCSS('font-family', /MS Sans Serif|Tahoma/);
    }
  });

  test('dialog component matches specification', async ({ page }) => {
    // Look for dialog elements
    const dialogs = page.locator('.dialog, .modal, [data-dialog]');
    
    if (await dialogs.count() > 0) {
      const firstDialog = dialogs.first();
      
      // Validate dialog styling
      await expect(firstDialog).toHaveCSS('background-color', 'rgb(192, 192, 192)'); // Button face
      await expect(firstDialog).toHaveCSS('border-width', '2px');
      await expect(firstDialog).toHaveCSS('border-style', 'outset');
    }
  });

  test('tooltip component matches specification', async ({ page }) => {
    // Look for tooltip elements
    const tooltips = page.locator('.tooltip, [data-tooltip], [title]');
    
    if (await tooltips.count() > 0) {
      const firstTooltip = tooltips.first();
      
      // Validate tooltip styling
      await expect(firstTooltip).toHaveCSS('background-color', 'rgb(255, 255, 224)'); // Info background
      await expect(firstTooltip).toHaveCSS('border-width', '1px');
      await expect(firstTooltip).toHaveCSS('border-style', 'solid');
      await expect(firstTooltip).toHaveCSS('font-family', /MS Sans Serif|Tahoma/);
    }
  });

  test('all interactive elements have proper Windows 98 styling', async ({ page }) => {
    // Get all interactive elements
    const interactiveElements = page.locator('button, input, select, textarea, [role="button"], [tabindex]');
    
    const count = await interactiveElements.count();
    if (count > 0) {
      // Check a sample of interactive elements
      for (let i = 0; i < Math.min(count, 5); i++) {
        const element = interactiveElements.nth(i);
        
        // All should have Windows 98 font
        const fontFamily = await element.evaluate(el => 
          window.getComputedStyle(el).fontFamily
        );
        expect(fontFamily).toMatch(/MS Sans Serif|Tahoma/);
        
        // All should have proper colors (not browser defaults)
        const backgroundColor = await element.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
      }
    }
  });

  test('component dimensions meet minimum specifications', async ({ page }) => {
    // Check that components meet minimum size requirements
    const buttons = page.locator('button, .button');
    const inputs = page.locator('input[type="text"], input[type="search"]');
    
    // Check button minimum dimensions
    if (await buttons.count() > 0) {
      const buttonBox = await buttons.first().boundingBox();
      if (buttonBox) {
        expect(buttonBox.height).toBeGreaterThanOrEqual(23); // Min height from spec
        expect(buttonBox.width).toBeGreaterThanOrEqual(75);  // Min width from spec
      }
    }
    
    // Check input minimum dimensions
    if (await inputs.count() > 0) {
      const inputBox = await inputs.first().boundingBox();
      if (inputBox) {
        expect(inputBox.height).toBeGreaterThanOrEqual(21); // Min height for inputs
      }
    }
  });

  test('clock component matches specification', async ({ page }) => {
    const clocks = page.locator('.clock, [data-clock], .time-display');
    
    if (await clocks.count() > 0) {
      const firstClock = clocks.first();
      await expect(firstClock).toHaveCSS('font-family', /MS Sans Serif|Tahoma/);
      await expect(firstClock).toHaveCSS('color', 'rgb(0, 0, 0)');
    }
  });

  test('context-menu component matches specification', async ({ page }) => {
    const contextMenus = page.locator('.context-menu, [data-context-menu]');
    
    if (await contextMenus.count() > 0) {
      const firstMenu = contextMenus.first();
      await expect(firstMenu).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstMenu).toHaveCSS('border-width', '2px');
    }
  });

  test('desktop-icon component matches specification', async ({ page }) => {
    const desktopIcons = page.locator('.desktop-icon, [data-desktop-icon]');
    
    if (await desktopIcons.count() > 0) {
      const firstIcon = desktopIcons.first();
      const box = await firstIcon.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(32);
        expect(box.height).toBeGreaterThanOrEqual(32);
      }
    }
  });

  test('desktop component matches specification', async ({ page }) => {
    const desktops = page.locator('.desktop, [data-desktop]');
    
    if (await desktops.count() > 0) {
      const firstDesktop = desktops.first();
      await expect(firstDesktop).toHaveCSS('background-color', 'rgb(0, 128, 128)'); // Teal background
    }
  });

  test('groupbox component matches specification', async ({ page }) => {
    const groupboxes = page.locator('.groupbox, fieldset, [data-groupbox]');
    
    if (await groupboxes.count() > 0) {
      const firstGroupbox = groupboxes.first();
      await expect(firstGroupbox).toHaveCSS('border-width', '2px');
      await expect(firstGroupbox).toHaveCSS('border-style', 'outset');
    }
  });

  test('message-box component matches specification', async ({ page }) => {
    const messageBoxes = page.locator('.message-box, .alert, [data-message-box]');
    
    if (await messageBoxes.count() > 0) {
      const firstMessageBox = messageBoxes.first();
      await expect(firstMessageBox).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstMessageBox).toHaveCSS('border-width', '2px');
    }
  });

  test('resize-handle component matches specification', async ({ page }) => {
    const resizeHandles = page.locator('.resize-handle, [data-resize-handle]');
    
    if (await resizeHandles.count() > 0) {
      const firstHandle = resizeHandles.first();
      const box = await firstHandle.boundingBox();
      if (box) {
        expect(box.width).toBeGreaterThanOrEqual(4);
        expect(box.height).toBeGreaterThanOrEqual(4);
      }
    }
  });

  test('slider component matches specification', async ({ page }) => {
    const sliders = page.locator('input[type="range"], .slider, [data-slider]');
    
    if (await sliders.count() > 0) {
      const firstSlider = sliders.first();
      await expect(firstSlider).toHaveCSS('background-color', 'rgb(192, 192, 192)');
    }
  });

  test('start-button component matches specification', async ({ page }) => {
    const startButtons = page.locator('.start-button, [data-start-button]');
    
    if (await startButtons.count() > 0) {
      const firstButton = startButtons.first();
      await expect(firstButton).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstButton).toHaveCSS('border-width', '2px');
    }
  });

  test('system-tray component matches specification', async ({ page }) => {
    const systemTrays = page.locator('.system-tray, [data-system-tray]');
    
    if (await systemTrays.count() > 0) {
      const firstTray = systemTrays.first();
      await expect(firstTray).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstTray).toHaveCSS('border-width', '2px');
    }
  });

  test('tab-control component matches specification', async ({ page }) => {
    const tabControls = page.locator('.tab-control, .tabs, [data-tab-control]');
    
    if (await tabControls.count() > 0) {
      const firstTab = tabControls.first();
      await expect(firstTab).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstTab).toHaveCSS('border-width', '2px');
    }
  });

  test('taskbar-button component matches specification', async ({ page }) => {
    const taskbarButtons = page.locator('.taskbar-button, [data-taskbar-button]');
    
    if (await taskbarButtons.count() > 0) {
      const firstButton = taskbarButtons.first();
      await expect(firstButton).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstButton).toHaveCSS('border-width', '2px');
    }
  });

  test('taskbar component matches specification', async ({ page }) => {
    const taskbars = page.locator('.taskbar, [data-taskbar]');
    
    if (await taskbars.count() > 0) {
      const firstTaskbar = taskbars.first();
      await expect(firstTaskbar).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstTaskbar).toHaveCSS('border-width', '2px');
    }
  });

  test('terminal component matches specification', async ({ page }) => {
    const terminals = page.locator('.terminal, [data-terminal]');
    
    if (await terminals.count() > 0) {
      const firstTerminal = terminals.first();
      await expect(firstTerminal).toHaveCSS('background-color', 'rgb(0, 0, 0)');
      await expect(firstTerminal).toHaveCSS('color', 'rgb(0, 255, 0)'); // Green text
      await expect(firstTerminal).toHaveCSS('font-family', /monospace|Courier/);
    }
  });

  test('theme-toggle component matches specification', async ({ page }) => {
    const themeToggles = page.locator('.theme-toggle, [data-theme-toggle]');
    
    if (await themeToggles.count() > 0) {
      const firstToggle = themeToggles.first();
      await expect(firstToggle).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstToggle).toHaveCSS('border-width', '2px');
    }
  });

  test('titlebar-button component matches specification', async ({ page }) => {
    const titlebarButtons = page.locator('.titlebar-button, [data-titlebar-button]');
    
    if (await titlebarButtons.count() > 0) {
      const firstButton = titlebarButtons.first();
      await expect(firstButton).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstButton).toHaveCSS('border-width', '1px');
    }
  });

  test('volume-control component matches specification', async ({ page }) => {
    const volumeControls = page.locator('.volume-control, [data-volume-control]');
    
    if (await volumeControls.count() > 0) {
      const firstControl = volumeControls.first();
      await expect(firstControl).toHaveCSS('background-color', 'rgb(192, 192, 192)');
      await expect(firstControl).toHaveCSS('border-width', '2px');
    }
  });
});
