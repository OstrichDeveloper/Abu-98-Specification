---
id: help-system-visual
title: Windows 98 F1 Help System - Visual Design Guide
sidebar_position: 1
---

# Windows 98 F1 Help System - Visual Design Guide

## Overview

This document defines the complete visual design specifications for the Windows 98 F1 Help System, including color palettes, typography, iconography, spacing, layout, and theme specifications. All design elements must maintain pixel-perfect Windows 98 authenticity.

## Color Palette

### Windows 98 System Colors

#### Primary Colors
```css
/* Windows 98 System Colors */
--win98-color-3d-face: #c0c0c0;        /* Button face, window background */
--win98-color-3d-highlight: #ffffff;   /* Highlighted 3D elements */
--win98-color-3d-shadow: #808080;      /* Shadowed 3D elements */
--win98-color-3d-darkshadow: #404040;  /* Dark shadow for 3D elements */
--win98-color-button-face: #c0c0c0;    /* Button background */
--win98-color-button-highlight: #ffffff; /* Button highlight */
--win98-color-button-shadow: #808080;  /* Button shadow */
--win98-color-button-darkshadow: #404040; /* Button dark shadow */
```

#### Text Colors
```css
/* Text Colors */
--win98-color-window-text: #000000;    /* Window text */
--win98-color-button-text: #000000;    /* Button text */
--win98-color-highlight-text: #ffffff; /* Highlighted text */
--win98-color-disabled-text: #808080;  /* Disabled text */
--win98-color-link-text: #0000ff;      /* Link text */
--win98-color-visited-link: #800080;   /* Visited link text */
```

#### Special Colors
```css
/* Special Colors */
--win98-color-highlight: #000080;      /* Selection highlight */
--win98-color-highlight-text: #ffffff; /* Text on highlight */
--win98-color-active-border: #000080;  /* Active window border */
--win98-color-inactive-border: #808080; /* Inactive window border */
--win98-color-window-frame: #808080;   /* Window frame */
--win98-color-scrollbar: #c0c0c0;      /* Scrollbar background */
--win98-color-scrollbar-thumb: #c0c0c0; /* Scrollbar thumb */
--win98-color-scrollbar-highlight: #ffffff; /* Scrollbar highlight */
--win98-color-scrollbar-shadow: #808080; /* Scrollbar shadow */
```

#### Status Bar Colors
```css
/* Status Bar Colors */
--win98-color-status-bar: #c0c0c0;     /* Status bar background */
--win98-color-status-text: #000000;    /* Status bar text */
--win98-color-status-border: #808080;  /* Status bar border */
```

### Dark Theme Colors

#### Dark Theme System Colors
```css
/* Dark Theme Colors */
--win98-dark-color-3d-face: #404040;   /* Dark button face */
--win98-dark-color-3d-highlight: #808080; /* Dark highlight */
--win98-dark-color-3d-shadow: #000000; /* Dark shadow */
--win98-dark-color-3d-darkshadow: #000000; /* Dark dark shadow */
--win98-dark-color-button-face: #404040; /* Dark button background */
--win98-dark-color-window-text: #ffffff; /* Dark window text */
--win98-dark-color-button-text: #ffffff; /* Dark button text */
--win98-dark-color-highlight: #000080; /* Dark selection highlight */
```

## Typography

### Font Specifications

#### Primary Font Stack
```css
/* Primary Font Stack */
--win98-font-family: 'MS Sans Serif', 'Microsoft Sans Serif', 'Segoe UI', sans-serif;
--win98-font-size-base: 11px;
--win98-font-size-small: 9px;
--win98-font-size-large: 13px;
--win98-font-size-title: 16px;
--win98-font-size-heading: 14px;
```

#### Monospace Font Stack
```css
/* Monospace Font Stack */
--win98-font-family-mono: 'Courier New', 'Fixedsys', 'Perfect DOS VGA 437', monospace;
--win98-font-size-mono: 11px;
```

#### Font Rendering
```css
/* Font Rendering */
--win98-font-smooth: none;              /* Disable font smoothing */
--win98-font-weight-normal: 400;        /* Normal font weight */
--win98-font-weight-bold: 700;          /* Bold font weight */
--win98-line-height-base: 1.2;          /* Base line height */
--win98-line-height-tight: 1.0;         /* Tight line height */
--win98-line-height-loose: 1.4;         /* Loose line height */
```

### Text Styling

#### Headings
```css
/* Heading Styles */
.help-heading-1 {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-title);
  font-weight: var(--win98-font-weight-bold);
  color: var(--win98-color-window-text);
  margin: 8px 0 4px 0;
  line-height: var(--win98-line-height-tight);
}

.help-heading-2 {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-heading);
  font-weight: var(--win98-font-weight-bold);
  color: var(--win98-color-window-text);
  margin: 6px 0 3px 0;
  line-height: var(--win98-line-height-tight);
}

.help-heading-3 {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-large);
  font-weight: var(--win98-font-weight-bold);
  color: var(--win98-color-window-text);
  margin: 4px 0 2px 0;
  line-height: var(--win98-line-height-tight);
}
```

#### Body Text
```css
/* Body Text Styles */
.help-text {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  font-weight: var(--win98-font-weight-normal);
  color: var(--win98-color-window-text);
  line-height: var(--win98-line-height-base);
  margin: 2px 0;
}

.help-text-small {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-small);
  font-weight: var(--win98-font-weight-normal);
  color: var(--win98-color-window-text);
  line-height: var(--win98-line-height-base);
  margin: 1px 0;
}
```

#### Links
```css
/* Link Styles */
.help-link {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  font-weight: var(--win98-font-weight-normal);
  color: var(--win98-color-link-text);
  text-decoration: underline;
  cursor: pointer;
}

.help-link:hover {
  color: var(--win98-color-highlight);
  background-color: var(--win98-color-highlight-text);
}

.help-link:visited {
  color: var(--win98-color-visited-link);
}
```

## Iconography

### Icon System

#### Icon Classes
```css
/* Icon Base Styles */
.help-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: 16px 16px;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}

.help-icon-24 {
  width: 24px;
  height: 24px;
  background-size: 24px 24px;
}

.help-icon-32 {
  width: 32px;
  height: 32px;
  background-size: 32px 32px;
}
```

#### Help System Icons
```css
/* Help System Specific Icons */
.help-icon-contents {
  background-image: url('icons/help-contents.png');
}

.help-icon-index {
  background-image: url('icons/help-index.png');
}

.help-icon-search {
  background-image: url('icons/help-search.png');
}

.help-icon-favorites {
  background-image: url('icons/help-favorites.png');
}

.help-icon-history {
  background-image: url('icons/help-history.png');
}

.help-icon-bookmark {
  background-image: url('icons/help-bookmark.png');
}

.help-icon-bookmark-filled {
  background-image: url('icons/help-bookmark-filled.png');
}

.help-icon-folder {
  background-image: url('icons/help-folder.png');
}

.help-icon-folder-open {
  background-image: url('icons/help-folder-open.png');
}

.help-icon-document {
  background-image: url('icons/help-document.png');
}

.help-icon-back {
  background-image: url('icons/help-back.png');
}

.help-icon-forward {
  background-image: url('icons/help-forward.png');
}

.help-icon-home {
  background-image: url('icons/help-home.png');
}

.help-icon-stop {
  background-image: url('icons/help-stop.png');
}
```

### Icon Usage Guidelines

#### Icon Sizes
- **16px**: Default size for toolbar buttons, menu items, tree items
- **24px**: Medium size for dialog buttons, status indicators
- **32px**: Large size for desktop icons, dialog headers

#### Icon States
- **Normal**: Default icon appearance
- **Hover**: Slightly highlighted or outlined
- **Active**: Pressed or selected state
- **Disabled**: Grayed out or reduced opacity

## Layout and Spacing

### Grid System

#### Base Grid
```css
/* Base Grid System */
--win98-grid-unit: 4px;                /* Base grid unit */
--win98-spacing-xs: 2px;               /* Extra small spacing */
--win98-spacing-sm: 4px;               /* Small spacing */
--win98-spacing-md: 8px;               /* Medium spacing */
--win98-spacing-lg: 12px;              /* Large spacing */
--win98-spacing-xl: 16px;              /* Extra large spacing */
--win98-spacing-xxl: 24px;             /* Extra extra large spacing */
```

#### Component Spacing
```css
/* Component Spacing */
.help-component {
  margin: var(--win98-spacing-sm);
  padding: var(--win98-spacing-md);
}

.help-component-tight {
  margin: var(--win98-spacing-xs);
  padding: var(--win98-spacing-sm);
}

.help-component-loose {
  margin: var(--win98-spacing-lg);
  padding: var(--win98-spacing-xl);
}
```

### Window Layout

#### Main Window Structure
```css
/* Main Window Layout */
.help-window {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: var(--win98-color-3d-face);
  border: 2px outset var(--win98-color-3d-face);
}

.help-menu-bar {
  height: 22px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
}

.help-toolbar {
  height: 28px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
  padding: 2px 4px;
}

.help-tab-bar {
  height: 24px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
}

.help-main-content {
  flex: 1;
  display: flex;
  min-height: 0;
}

.help-left-pane {
  width: 250px;
  min-width: 200px;
  max-width: 400px;
  background-color: var(--win98-color-3d-face);
  border-right: 1px solid var(--win98-color-3d-shadow);
  overflow-y: auto;
}

.help-right-pane {
  flex: 1;
  background-color: var(--win98-color-3d-face);
  overflow-y: auto;
}

.help-status-bar {
  height: 22px;
  background-color: var(--win98-color-status-bar);
  border-top: 1px solid var(--win98-color-3d-shadow);
  padding: 2px 4px;
}
```

## Component Styling

### Menu Bar

#### Menu Bar Styling
```css
/* Menu Bar Styles */
.help-menu-bar {
  display: flex;
  align-items: center;
  height: 22px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
  padding: 0 2px;
}

.help-menu-item {
  padding: 2px 8px;
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  color: var(--win98-color-window-text);
  cursor: pointer;
  border: 1px solid transparent;
}

.help-menu-item:hover {
  background-color: var(--win98-color-highlight);
  color: var(--win98-color-highlight-text);
}

.help-menu-item:active {
  background-color: var(--win98-color-3d-shadow);
  border: 1px inset var(--win98-color-3d-shadow);
}
```

### Toolbar

#### Toolbar Styling
```css
/* Toolbar Styles */
.help-toolbar {
  display: flex;
  align-items: center;
  height: 28px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
  padding: 2px 4px;
  gap: 2px;
}

.help-toolbar-button {
  width: 24px;
  height: 24px;
  background-color: var(--win98-color-button-face);
  border: 1px outset var(--win98-color-button-face);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.help-toolbar-button:hover {
  background-color: var(--win98-color-button-highlight);
}

.help-toolbar-button:active {
  border: 1px inset var(--win98-color-button-face);
  background-color: var(--win98-color-button-shadow);
}

.help-toolbar-button:disabled {
  background-color: var(--win98-color-3d-face);
  border: 1px solid var(--win98-color-3d-shadow);
  cursor: default;
}

.help-toolbar-separator {
  width: 2px;
  height: 20px;
  background-color: var(--win98-color-3d-shadow);
  margin: 0 4px;
}
```

### Tab Bar

#### Tab Bar Styling
```css
/* Tab Bar Styles */
.help-tab-bar {
  display: flex;
  height: 24px;
  background-color: var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-shadow);
}

.help-tab {
  padding: 2px 12px;
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  color: var(--win98-color-window-text);
  background-color: var(--win98-color-3d-face);
  border: 1px outset var(--win98-color-3d-face);
  border-bottom: none;
  cursor: pointer;
  margin-right: 2px;
}

.help-tab:hover {
  background-color: var(--win98-color-button-highlight);
}

.help-tab.active {
  background-color: var(--win98-color-3d-face);
  border: 1px inset var(--win98-color-3d-face);
  border-bottom: 1px solid var(--win98-color-3d-face);
  margin-bottom: -1px;
}
```

### Topic Tree

#### Tree Styling
```css
/* Topic Tree Styles */
.help-topic-tree {
  padding: 4px;
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
}

.help-topic-item {
  display: flex;
  align-items: center;
  padding: 1px 2px;
  cursor: pointer;
  border: 1px solid transparent;
}

.help-topic-item:hover {
  background-color: var(--win98-color-highlight);
  color: var(--win98-color-highlight-text);
}

.help-topic-item.selected {
  background-color: var(--win98-color-highlight);
  color: var(--win98-color-highlight-text);
}

.help-topic-icon {
  margin-right: 4px;
  flex-shrink: 0;
}

.help-topic-title {
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.help-topic-children {
  margin-left: 16px;
}
```

### Content Area

#### Content Styling
```css
/* Content Area Styles */
.help-content-area {
  padding: 12px;
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  line-height: var(--win98-line-height-base);
  color: var(--win98-color-window-text);
}

.help-content-heading {
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-title);
  font-weight: var(--win98-font-weight-bold);
  color: var(--win98-color-window-text);
  margin: 0 0 12px 0;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--win98-color-3d-shadow);
}

.help-content-text {
  margin: 8px 0;
}

.help-content-link {
  color: var(--win98-color-link-text);
  text-decoration: underline;
  cursor: pointer;
}

.help-content-link:hover {
  color: var(--win98-color-highlight);
  background-color: var(--win98-color-highlight-text);
}

.help-content-code {
  font-family: var(--win98-font-family-mono);
  font-size: var(--win98-font-size-mono);
  background-color: var(--win98-color-3d-face);
  border: 1px inset var(--win98-color-3d-face);
  padding: 4px;
  margin: 4px 0;
}

.help-content-table {
  border: 1px solid var(--win98-color-3d-shadow);
  border-collapse: collapse;
  margin: 8px 0;
}

.help-content-table th,
.help-content-table td {
  border: 1px solid var(--win98-color-3d-shadow);
  padding: 4px 8px;
  text-align: left;
}

.help-content-table th {
  background-color: var(--win98-color-3d-face);
  font-weight: var(--win98-font-weight-bold);
}
```

### Status Bar

#### Status Bar Styling
```css
/* Status Bar Styles */
.help-status-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 22px;
  background-color: var(--win98-color-status-bar);
  border-top: 1px solid var(--win98-color-3d-shadow);
  padding: 2px 4px;
  font-family: var(--win98-font-family);
  font-size: var(--win98-font-size-base);
  color: var(--win98-color-status-text);
}

.help-status-left {
  flex: 1;
}

.help-status-right {
  flex-shrink: 0;
}
```

## Scrollbar Styling

### Windows 98 Scrollbars

#### Scrollbar Base Styles
```css
/* Windows 98 Scrollbar Styles */
.help-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: var(--win98-color-scrollbar-thumb) var(--win98-color-scrollbar);
}

.help-scrollbar::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

.help-scrollbar::-webkit-scrollbar-track {
  background: var(--win98-color-scrollbar);
  border: 1px inset var(--win98-color-scrollbar);
}

.help-scrollbar::-webkit-scrollbar-thumb {
  background: var(--win98-color-scrollbar-thumb);
  border: 1px outset var(--win98-color-scrollbar-thumb);
}

.help-scrollbar::-webkit-scrollbar-thumb:hover {
  background: var(--win98-color-scrollbar-highlight);
}

.help-scrollbar::-webkit-scrollbar-corner {
  background: var(--win98-color-scrollbar);
}
```

## Theme Support

### Light Theme

#### Light Theme Variables
```css
/* Light Theme */
.help-theme-light {
  --win98-color-3d-face: #c0c0c0;
  --win98-color-3d-highlight: #ffffff;
  --win98-color-3d-shadow: #808080;
  --win98-color-3d-darkshadow: #404040;
  --win98-color-window-text: #000000;
  --win98-color-button-text: #000000;
  --win98-color-highlight: #000080;
  --win98-color-highlight-text: #ffffff;
}
```

### Dark Theme

#### Dark Theme Variables
```css
/* Dark Theme */
.help-theme-dark {
  --win98-color-3d-face: #404040;
  --win98-color-3d-highlight: #808080;
  --win98-color-3d-shadow: #000000;
  --win98-color-3d-darkshadow: #000000;
  --win98-color-window-text: #ffffff;
  --win98-color-button-text: #ffffff;
  --win98-color-highlight: #000080;
  --win98-color-highlight-text: #ffffff;
}
```

## Responsive Design

### Breakpoints

#### Responsive Breakpoints
```css
/* Responsive Breakpoints */
@media (max-width: 768px) {
  .help-left-pane {
    width: 200px;
    min-width: 150px;
  }
  
  .help-content-area {
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .help-main-content {
    flex-direction: column;
  }
  
  .help-left-pane {
    width: 100%;
    height: 200px;
    border-right: none;
    border-bottom: 1px solid var(--win98-color-3d-shadow);
  }
}
```

## Accessibility

### Accessibility Features

#### High Contrast Support
```css
/* High Contrast Theme */
.help-theme-high-contrast {
  --win98-color-3d-face: #000000;
  --win98-color-3d-highlight: #ffffff;
  --win98-color-3d-shadow: #ffffff;
  --win98-color-window-text: #ffffff;
  --win98-color-button-text: #ffffff;
  --win98-color-highlight: #ffffff;
  --win98-color-highlight-text: #000000;
}
```

#### Focus Indicators
```css
/* Focus Indicators */
.help-focusable:focus {
  outline: 2px solid var(--win98-color-highlight);
  outline-offset: 1px;
}

.help-focusable:focus-visible {
  outline: 2px solid var(--win98-color-highlight);
  outline-offset: 1px;
}
```

This visual design guide ensures the Windows 98 F1 Help System maintains pixel-perfect authenticity while providing modern accessibility and responsive design capabilities.
