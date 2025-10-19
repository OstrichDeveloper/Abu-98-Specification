---
id: components
title: Component Library
sidebar_position: 1
---

# Component Library

The Abu OS 98 component library provides pixel-perfect Windows 98 UI components built with modern web technologies.

## Core Components

### Window Components
- [Window](./window.md) - Main window container
- [Titlebar](./titlebar.md) - Window title bar with controls
- [Titlebar Button](./titlebar-button.md) - Window control buttons
- [Window Chrome](./window-chrome.md) - Window border and styling

### Desktop Components
- [Desktop](./desktop.md) - Main desktop container
- [Desktop Icon](./desktop-icon.md) - Desktop shortcuts and icons
- [Taskbar](./taskbar.md) - Bottom taskbar
- [Taskbar Button](./taskbar-button.md) - Application buttons
- [Start Button](./start-button.md) - Windows start button
- [Start Menu](./start-menu.md) - Start menu system
- [System Tray](./system-tray.md) - System notification area
- [Clock](./clock.md) - System clock display

### Form Components
- [Button](./button.md) - Standard buttons
- [Input](./input.md) - Text input fields
- [Checkbox](./checkbox.md) - Checkbox controls
- [Radio](./radio.md) - Radio button controls
- [Select](./select.md) - Dropdown select boxes
- [Slider](./slider.md) - Range sliders
- [Progress Bar](./progressbar.md) - Progress indicators

### Dialog Components
- [Dialog](./dialog.md) - Modal dialogs
- [Message Box](./message-box.md) - Alert dialogs
- [Group Box](./groupbox.md) - Grouped form controls

### Menu Components
- [Menu Bar](./menubar.md) - Application menu bars
- [Menu Item](./menu-item.md) - Individual menu items
- [Context Menu](./context-menu.md) - Right-click menus

### Utility Components
- [Status Bar](./statusbar.md) - Status information display
- [Tab Control](./tab-control.md) - Tabbed interfaces
- [Tooltip](./tooltip.md) - Hover tooltips
- [Resize Handle](./resize-handle.md) - Window resize handles
- [Theme Toggle](./theme-toggle.md) - Theme switching
- [Volume Control](./volume-control.md) - Audio volume control

### Terminal Component
- [Terminal](./terminal.md) - Command line interface

## Usage

All components follow the Windows 98 design system and are built to be:

- **Pixel Perfect** - Exact recreation of Windows 98 appearance
- **Accessible** - ARIA compliant and keyboard navigable
- **Themeable** - Support for light and dark themes
- **Performant** - Optimized for modern web browsers
- **Type Safe** - Full TypeScript support

## Getting Started

To use these components in your application:

```typescript
import { Window, Titlebar, Button } from '@melalawi/abu-web-kernel';

// Create a new window
const window = new Window({
  title: 'My Application',
  width: 400,
  height: 300
});
```

See the individual component documentation for detailed usage examples and API references.
