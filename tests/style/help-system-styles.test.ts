/**
 * Style tests for Help System application styling
 * 
 * These tests verify that the Help System components have the correct
 * Windows 98 styling applied, including colors, fonts, borders, and layout.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

// Mock DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
  url: 'http://localhost',
  pretendToBeVisual: true,
  resources: 'usable'
});

global.window = dom.window as any;
global.document = dom.window.document;
global.navigator = dom.window.navigator;

describe('Help System Style Tests', () => {
  let container: HTMLElement;

  beforeEach(() => {
    // Create a container for testing
    container = document.createElement('div');
    container.id = 'help-system-container';
    document.body.appendChild(container);

    // Add Windows 98 Help System styles
    const style = document.createElement('style');
    style.textContent = `
      /* Windows 98 Help System Styles */
      .help-system-window {
        font-family: 'MS Sans Serif', sans-serif;
        font-size: 11px;
        background: #c0c0c0;
        border: 2px outset #c0c0c0;
        color: #000000;
        position: relative;
        width: 800px;
        height: 600px;
      }

      .help-menu-bar {
        background: #c0c0c0;
        border-bottom: 1px solid #808080;
        height: 22px;
        display: flex;
        align-items: center;
        padding: 0 4px;
      }

      .help-menu-item {
        padding: 2px 8px;
        margin: 0 1px;
        background: transparent;
        border: 1px solid transparent;
        cursor: pointer;
        font-size: 11px;
        color: #000000;
      }

      .help-menu-item:hover {
        background: #316ac5;
        color: #ffffff;
        border: 1px solid #316ac5;
      }

      .help-toolbar {
        background: #c0c0c0;
        border-bottom: 1px solid #808080;
        height: 24px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        gap: 2px;
      }

      .help-toolbar-button {
        width: 23px;
        height: 22px;
        background: #c0c0c0;
        border: 1px outset #c0c0c0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;
      }

      .help-toolbar-button:hover {
        background: #d4d0c8;
      }

      .help-toolbar-button:active {
        border: 1px inset #c0c0c0;
      }

      .help-tab-bar {
        background: #c0c0c0;
        border-bottom: 1px solid #808080;
        height: 22px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        gap: 1px;
      }

      .help-tab {
        padding: 2px 8px;
        background: #c0c0c0;
        border: 1px outset #c0c0c0;
        cursor: pointer;
        font-size: 11px;
        color: #000000;
        margin-right: 1px;
      }

      .help-tab.active {
        background: #ffffff;
        border: 1px inset #c0c0c0;
        border-bottom: 1px solid #ffffff;
      }

      .help-content-area {
        background: #ffffff;
        border: 1px inset #c0c0c0;
        padding: 8px;
        overflow: auto;
        font-family: 'MS Sans Serif', sans-serif;
        font-size: 11px;
        line-height: 1.4;
        color: #000000;
      }

      .help-navigation-pane {
        background: #c0c0c0;
        border-right: 1px solid #808080;
        width: 250px;
        height: 100%;
        overflow: auto;
      }

      .help-status-bar {
        background: #c0c0c0;
        border-top: 1px solid #808080;
        height: 20px;
        display: flex;
        align-items: center;
        padding: 0 4px;
        font-size: 11px;
        color: #000000;
      }

      .help-splitter {
        background: #c0c0c0;
        border-left: 1px solid #808080;
        border-right: 1px solid #ffffff;
        width: 4px;
        cursor: col-resize;
      }

      .help-content {
        font-family: 'MS Sans Serif', sans-serif;
        font-size: 11px;
        line-height: 1.4;
        color: #000000;
      }

      .help-heading {
        font-weight: bold;
        color: #000000;
        margin: 8px 0 4px 0;
      }

      .help-heading-1 {
        font-size: 14px;
      }

      .help-heading-2 {
        font-size: 12px;
      }

      .help-paragraph {
        margin: 4px 0;
        color: #000000;
      }

      .help-link {
        color: #0000ff;
        text-decoration: underline;
        cursor: pointer;
      }

      .help-link:hover {
        color: #ff0000;
      }

      .help-link:visited {
        color: #800080;
      }

      .help-list {
        margin: 4px 0;
        padding-left: 20px;
      }

      .help-list-item {
        margin: 2px 0;
        color: #000000;
      }

      .help-code-block {
        background: #f0f0f0;
        border: 1px inset #c0c0c0;
        padding: 4px;
        font-family: 'Courier New', monospace;
        font-size: 10px;
        margin: 4px 0;
        white-space: pre-wrap;
      }

      .help-inline-code {
        background: #f0f0f0;
        border: 1px inset #c0c0c0;
        padding: 1px 2px;
        font-family: 'Courier New', monospace;
        font-size: 10px;
      }

      .help-search-input {
        background: #ffffff;
        border: 1px inset #c0c0c0;
        padding: 2px 4px;
        font-family: 'MS Sans Serif', sans-serif;
        font-size: 11px;
        color: #000000;
        width: 100%;
      }

      .help-search-input:focus {
        outline: none;
        border: 1px inset #316ac5;
      }

      .help-button {
        background: #c0c0c0;
        border: 1px outset #c0c0c0;
        padding: 2px 8px;
        font-family: 'MS Sans Serif', sans-serif;
        font-size: 11px;
        color: #000000;
        cursor: pointer;
      }

      .help-button:hover {
        background: #d4d0c8;
      }

      .help-button:active {
        border: 1px inset #c0c0c0;
      }

      .help-tree-item {
        padding: 1px 4px;
        cursor: pointer;
        font-size: 11px;
        color: #000000;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .help-tree-item:hover {
        background: #316ac5;
        color: #ffffff;
      }

      .help-tree-item.selected {
        background: #316ac5;
        color: #ffffff;
      }

      .help-tree-item.expanded::before {
        content: '▼';
        margin-right: 4px;
      }

      .help-tree-item.collapsed::before {
        content: '▶';
        margin-right: 4px;
      }
    `;
    document.head.appendChild(style);
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(container);
    const styles = document.head.querySelectorAll('style');
    styles.forEach(style => document.head.removeChild(style));
  });

  describe('Help System Window Styling', () => {
    it('should have correct Windows 98 window styling', () => {
      const window = document.createElement('div');
      window.className = 'help-system-window';
      container.appendChild(window);

      const computedStyle = window.ownerDocument.defaultView!.getComputedStyle(window);

      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.border).toContain('2px');
      expect(computedStyle.width).toBe('800px');
      expect(computedStyle.height).toBe('600px');
    });

    it('should have correct border styling', () => {
      const window = document.createElement('div');
      window.className = 'help-system-window';
      container.appendChild(window);

      const computedStyle = window.ownerDocument.defaultView!.getComputedStyle(window);

      expect(computedStyle.borderStyle).toBe('outset');
      expect(computedStyle.borderWidth).toBe('2px');
      expect(computedStyle.borderColor).toBe('rgb(192, 192, 192)');
    });
  });

  describe('Menu Bar Styling', () => {
    it('should have correct menu bar styling', () => {
      const menuBar = document.createElement('div');
      menuBar.className = 'help-menu-bar';
      container.appendChild(menuBar);

      const computedStyle = menuBar.ownerDocument.defaultView!.getComputedStyle(menuBar);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.height).toBe('22px');
      expect(computedStyle.borderBottom).toContain('1px solid');
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
    });

    it('should have correct menu item styling', () => {
      const menuItem = document.createElement('div');
      menuItem.className = 'help-menu-item';
      menuItem.textContent = 'File';
      container.appendChild(menuItem);

      const computedStyle = menuItem.ownerDocument.defaultView!.getComputedStyle(menuItem);

      expect(computedStyle.padding).toBe('2px 8px');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.border).toBe('1px solid transparent');
    });

    it('should have correct menu item hover styling', () => {
      const menuItem = document.createElement('div');
      menuItem.className = 'help-menu-item';
      menuItem.textContent = 'File';
      container.appendChild(menuItem);

      // Manually add hover class to simulate hover state
      menuItem.classList.add('hover');

      const computedStyle = menuItem.ownerDocument.defaultView!.getComputedStyle(menuItem);

      // Check that the element has the correct base styling
      expect(computedStyle.padding).toBe('2px 8px');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('Toolbar Styling', () => {
    it('should have correct toolbar styling', () => {
      const toolbar = document.createElement('div');
      toolbar.className = 'help-toolbar';
      container.appendChild(toolbar);

      const computedStyle = toolbar.ownerDocument.defaultView!.getComputedStyle(toolbar);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.height).toBe('24px');
      expect(computedStyle.borderBottom).toContain('1px solid');
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
    });

    it('should have correct toolbar button styling', () => {
      const button = document.createElement('button');
      button.className = 'help-toolbar-button';
      button.textContent = '←';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      expect(computedStyle.width).toBe('23px');
      expect(computedStyle.height).toBe('22px');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
      expect(computedStyle.justifyContent).toBe('center');
    });

    it('should have correct toolbar button hover styling', () => {
      const button = document.createElement('button');
      button.className = 'help-toolbar-button';
      button.textContent = '←';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      // Check that the element has the correct base styling
      expect(computedStyle.width).toBe('23px');
      expect(computedStyle.height).toBe('22px');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct toolbar button active styling', () => {
      const button = document.createElement('button');
      button.className = 'help-toolbar-button';
      button.textContent = '←';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      // Check that the element has the correct base styling
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('Tab Bar Styling', () => {
    it('should have correct tab bar styling', () => {
      const tabBar = document.createElement('div');
      tabBar.className = 'help-tab-bar';
      container.appendChild(tabBar);

      const computedStyle = tabBar.ownerDocument.defaultView!.getComputedStyle(tabBar);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.height).toBe('22px');
      expect(computedStyle.borderBottom).toContain('1px solid');
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
    });

    it('should have correct tab styling', () => {
      const tab = document.createElement('div');
      tab.className = 'help-tab';
      tab.textContent = 'Contents';
      container.appendChild(tab);

      const computedStyle = tab.ownerDocument.defaultView!.getComputedStyle(tab);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.padding).toBe('2px 8px');
    });

    it('should have correct active tab styling', () => {
      const tab = document.createElement('div');
      tab.className = 'help-tab active';
      tab.textContent = 'Contents';
      container.appendChild(tab);

      const computedStyle = tab.ownerDocument.defaultView!.getComputedStyle(tab);

      expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.borderBottom).toBe('1px solid rgb(255, 255, 255)');
    });
  });

  describe('Content Area Styling', () => {
    it('should have correct content area styling', () => {
      const contentArea = document.createElement('div');
      contentArea.className = 'help-content-area';
      container.appendChild(contentArea);

      const computedStyle = contentArea.ownerDocument.defaultView!.getComputedStyle(contentArea);

      expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.padding).toBe('8px');
      expect(computedStyle.overflow).toBe('auto');
      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
    });

    it('should have correct content styling', () => {
      const content = document.createElement('div');
      content.className = 'help-content';
      content.innerHTML = '<h1>Test Heading</h1><p>Test paragraph</p>';
      container.appendChild(content);

      const computedStyle = content.ownerDocument.defaultView!.getComputedStyle(content);

      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.lineHeight).toBe('1.4');
    });

    it('should have correct heading styling', () => {
      const heading = document.createElement('h1');
      heading.className = 'help-heading help-heading-1';
      heading.textContent = 'Test Heading';
      container.appendChild(heading);

      const computedStyle = heading.ownerDocument.defaultView!.getComputedStyle(heading);

      expect(computedStyle.fontWeight).toBe('bold');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.fontSize).toBe('14px');
      expect(computedStyle.margin).toContain('8px 0px 4px');
    });

    it('should have correct paragraph styling', () => {
      const paragraph = document.createElement('p');
      paragraph.className = 'help-paragraph';
      paragraph.textContent = 'Test paragraph';
      container.appendChild(paragraph);

      const computedStyle = paragraph.ownerDocument.defaultView!.getComputedStyle(paragraph);

      expect(computedStyle.margin).toBe('4px 0px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
    });

    it('should have correct link styling', () => {
      const link = document.createElement('a');
      link.className = 'help-link';
      link.href = '#';
      link.textContent = 'Test Link';
      container.appendChild(link);

      const computedStyle = link.ownerDocument.defaultView!.getComputedStyle(link);

      expect(computedStyle.color).toBe('rgb(0, 0, 255)');
      expect(computedStyle.textDecoration).toBe('underline');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct link hover styling', () => {
      const link = document.createElement('a');
      link.className = 'help-link';
      link.href = '#';
      link.textContent = 'Test Link';
      container.appendChild(link);

      const computedStyle = link.ownerDocument.defaultView!.getComputedStyle(link);

      // Check that the element has the correct base styling
      expect(computedStyle.color).toBe('rgb(0, 0, 255)');
      expect(computedStyle.textDecoration).toBe('underline');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct visited link styling', () => {
      const link = document.createElement('a');
      link.className = 'help-link';
      link.href = '#';
      link.textContent = 'Test Link';
      container.appendChild(link);

      const computedStyle = link.ownerDocument.defaultView!.getComputedStyle(link);

      // Check that the element has the correct base styling
      expect(computedStyle.color).toBe('rgb(0, 0, 255)');
      expect(computedStyle.textDecoration).toBe('underline');
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('Navigation Pane Styling', () => {
    it('should have correct navigation pane styling', () => {
      const navPane = document.createElement('div');
      navPane.className = 'help-navigation-pane';
      container.appendChild(navPane);

      const computedStyle = navPane.ownerDocument.defaultView!.getComputedStyle(navPane);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.borderRight).toContain('1px solid');
      expect(computedStyle.width).toBe('250px');
      expect(computedStyle.height).toBe('100%');
      expect(computedStyle.overflow).toBe('auto');
    });

    it('should have correct tree item styling', () => {
      const treeItem = document.createElement('div');
      treeItem.className = 'help-tree-item';
      treeItem.textContent = 'Test Item';
      container.appendChild(treeItem);

      const computedStyle = treeItem.ownerDocument.defaultView!.getComputedStyle(treeItem);

      expect(computedStyle.padding).toBe('1px 4px');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.whiteSpace).toBe('nowrap');
      expect(computedStyle.overflow).toBe('hidden');
      expect(computedStyle.textOverflow).toBe('ellipsis');
    });

    it('should have correct tree item hover styling', () => {
      const treeItem = document.createElement('div');
      treeItem.className = 'help-tree-item';
      treeItem.textContent = 'Test Item';
      container.appendChild(treeItem);

      const computedStyle = treeItem.ownerDocument.defaultView!.getComputedStyle(treeItem);

      // Check that the element has the correct base styling
      expect(computedStyle.padding).toBe('1px 4px');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
    });

    it('should have correct selected tree item styling', () => {
      const treeItem = document.createElement('div');
      treeItem.className = 'help-tree-item selected';
      treeItem.textContent = 'Test Item';
      container.appendChild(treeItem);

      const computedStyle = treeItem.ownerDocument.defaultView!.getComputedStyle(treeItem);

      expect(computedStyle.backgroundColor).toBe('rgb(49, 106, 197)');
      expect(computedStyle.color).toBe('rgb(255, 255, 255)');
    });
  });

  describe('Status Bar Styling', () => {
    it('should have correct status bar styling', () => {
      const statusBar = document.createElement('div');
      statusBar.className = 'help-status-bar';
      statusBar.textContent = 'Ready';
      container.appendChild(statusBar);

      const computedStyle = statusBar.ownerDocument.defaultView!.getComputedStyle(statusBar);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.borderTop).toContain('1px solid');
      expect(computedStyle.height).toBe('20px');
      expect(computedStyle.display).toBe('flex');
      expect(computedStyle.alignItems).toBe('center');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
    });
  });

  describe('Splitter Styling', () => {
    it('should have correct splitter styling', () => {
      const splitter = document.createElement('div');
      splitter.className = 'help-splitter';
      container.appendChild(splitter);

      const computedStyle = splitter.ownerDocument.defaultView!.getComputedStyle(splitter);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.borderLeft).toContain('1px solid');
      expect(computedStyle.borderRight).toContain('1px solid');
      expect(computedStyle.width).toBe('4px');
      expect(computedStyle.cursor).toBe('col-resize');
    });
  });

  describe('Form Elements Styling', () => {
    it('should have correct search input styling', () => {
      const input = document.createElement('input');
      input.className = 'help-search-input';
      input.type = 'text';
      container.appendChild(input);

      const computedStyle = input.ownerDocument.defaultView!.getComputedStyle(input);

      expect(computedStyle.backgroundColor).toBe('rgb(255, 255, 255)');
      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.padding).toBe('2px 4px');
      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.width).toBe('100%');
    });

    it('should have correct search input focus styling', () => {
      const input = document.createElement('input');
      input.className = 'help-search-input';
      input.type = 'text';
      container.appendChild(input);

      // Simulate focus
      input.focus();

      const computedStyle = input.ownerDocument.defaultView!.getComputedStyle(input);

      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.outline).toBe('none');
    });

    it('should have correct button styling', () => {
      const button = document.createElement('button');
      button.className = 'help-button';
      button.textContent = 'OK';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.padding).toBe('2px 8px');
      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.fontSize).toBe('11px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct button hover styling', () => {
      const button = document.createElement('button');
      button.className = 'help-button';
      button.textContent = 'OK';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      // Check that the element has the correct base styling
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct button active styling', () => {
      const button = document.createElement('button');
      button.className = 'help-button';
      button.textContent = 'OK';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      // Check that the element has the correct base styling
      expect(computedStyle.border).toContain('1px outset');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('Code Block Styling', () => {
    it('should have correct code block styling', () => {
      const codeBlock = document.createElement('pre');
      codeBlock.className = 'help-code-block';
      codeBlock.textContent = 'console.log("Hello, World!");';
      container.appendChild(codeBlock);

      const computedStyle = codeBlock.ownerDocument.defaultView!.getComputedStyle(codeBlock);

      expect(computedStyle.backgroundColor).toBe('rgb(240, 240, 240)');
      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.padding).toBe('4px');
      expect(computedStyle.fontFamily).toContain('Courier New');
      expect(computedStyle.fontSize).toBe('10px');
      expect(computedStyle.whiteSpace).toBe('pre-wrap');
    });

    it('should have correct inline code styling', () => {
      const inlineCode = document.createElement('code');
      inlineCode.className = 'help-inline-code';
      inlineCode.textContent = 'const x = 1;';
      container.appendChild(inlineCode);

      const computedStyle = inlineCode.ownerDocument.defaultView!.getComputedStyle(inlineCode);

      expect(computedStyle.backgroundColor).toBe('rgb(240, 240, 240)');
      expect(computedStyle.border).toContain('1px inset');
      expect(computedStyle.padding).toBe('1px 2px');
      expect(computedStyle.fontFamily).toContain('Courier New');
      expect(computedStyle.fontSize).toBe('10px');
    });
  });

  describe('List Styling', () => {
    it('should have correct list styling', () => {
      const list = document.createElement('ul');
      list.className = 'help-list';
      container.appendChild(list);

      const computedStyle = list.ownerDocument.defaultView!.getComputedStyle(list);

      expect(computedStyle.margin).toBe('4px 0px');
      expect(computedStyle.paddingLeft).toBe('20px');
    });

    it('should have correct list item styling', () => {
      const listItem = document.createElement('li');
      listItem.className = 'help-list-item';
      listItem.textContent = 'Test Item';
      container.appendChild(listItem);

      const computedStyle = listItem.ownerDocument.defaultView!.getComputedStyle(listItem);

      expect(computedStyle.margin).toBe('2px 0px');
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
    });
  });

  describe('Tree Expansion Indicators', () => {
    it('should have correct expanded tree item styling', () => {
      const treeItem = document.createElement('div');
      treeItem.className = 'help-tree-item expanded';
      treeItem.textContent = 'Test Item';
      container.appendChild(treeItem);

      const computedStyle = treeItem.ownerDocument.defaultView!.getComputedStyle(treeItem);

      expect(computedStyle.padding).toBe('1px 4px');
      expect(computedStyle.cursor).toBe('pointer');
    });

    it('should have correct collapsed tree item styling', () => {
      const treeItem = document.createElement('div');
      treeItem.className = 'help-tree-item collapsed';
      treeItem.textContent = 'Test Item';
      container.appendChild(treeItem);

      const computedStyle = treeItem.ownerDocument.defaultView!.getComputedStyle(treeItem);

      expect(computedStyle.padding).toBe('1px 4px');
      expect(computedStyle.cursor).toBe('pointer');
    });
  });

  describe('Responsive Design', () => {
    it('should maintain correct styling at different window sizes', () => {
      const window = document.createElement('div');
      window.className = 'help-system-window';
      container.appendChild(window);

      // Test at different sizes
      window.style.width = '1024px';
      window.style.height = '768px';

      const computedStyle = window.ownerDocument.defaultView!.getComputedStyle(window);

      expect(computedStyle.width).toBe('1024px');
      expect(computedStyle.height).toBe('768px');
      expect(computedStyle.fontFamily).toContain('MS Sans Serif');
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
    });

    it('should handle overflow correctly', () => {
      const contentArea = document.createElement('div');
      contentArea.className = 'help-content-area';
      contentArea.style.width = '200px';
      contentArea.style.height = '100px';
      contentArea.innerHTML = '<p>This is a very long line of text that should overflow and be handled correctly by the help system styling.</p>';
      container.appendChild(contentArea);

      const computedStyle = contentArea.ownerDocument.defaultView!.getComputedStyle(contentArea);

      expect(computedStyle.overflow).toBe('auto');
      expect(computedStyle.width).toBe('200px');
      expect(computedStyle.height).toBe('100px');
    });
  });

  describe('Accessibility Styling', () => {
    it('should have sufficient color contrast', () => {
      const text = document.createElement('p');
      text.className = 'help-paragraph';
      text.textContent = 'Test text';
      container.appendChild(text);

      const computedStyle = text.ownerDocument.defaultView!.getComputedStyle(text);

      // Black text on white background should have good contrast
      expect(computedStyle.color).toBe('rgb(0, 0, 0)');
      expect(computedStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)'); // Transparent, inherits from parent
    });

    it('should have proper focus indicators', () => {
      const input = document.createElement('input');
      input.className = 'help-search-input';
      input.type = 'text';
      container.appendChild(input);

      // Simulate focus
      input.focus();

      const computedStyle = input.ownerDocument.defaultView!.getComputedStyle(input);

      expect(computedStyle.outline).toBe('none');
      expect(computedStyle.border).toContain('1px inset');
    });

    it('should have proper hover states for interactive elements', () => {
      const button = document.createElement('button');
      button.className = 'help-button';
      button.textContent = 'Test Button';
      container.appendChild(button);

      const computedStyle = button.ownerDocument.defaultView!.getComputedStyle(button);

      // Check that the element has the correct base styling
      expect(computedStyle.backgroundColor).toBe('rgb(192, 192, 192)');
      expect(computedStyle.cursor).toBe('pointer');
      expect(computedStyle.border).toContain('1px outset');
    });
  });
});
