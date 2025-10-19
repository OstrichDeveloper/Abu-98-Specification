---
id: css-api
title: Css Api
---

# CSS API Specification

## Overview

The CSS API defines all CSS classes, SCSS mixins, and custom properties available for styling components. This document specifies the complete styling interface of the Abu OS 98 Web Kernel.

## CSS Custom Properties (Variables)

### Color Variables

**Light Theme:**
```css
:root, .theme-light {
  --color-button-face: #C0C0C0;
  --color-button-highlight: #FFFFFF;
  --color-button-shadow: #808080;
  --color-button-dark-shadow: #000000;
  --color-button-text: #000000;
  --color-window-frame: #0A0A0A;
  --color-active-title: #000080;
  --color-inactive-title: #808080;
  --color-title-text: #FFFFFF;
  --color-window-text: #000000;
  --color-highlight: #000080;
  --color-highlight-text: #FFFFFF;
  --color-desktop: #008080;
}
```

**Dark Theme:**
```css
.theme-dark {
  --color-button-face: #1A1A2E;
  --color-button-highlight: #404050;
  --color-button-shadow: #0A0A15;
  --color-button-dark-shadow: #000000;
  --color-button-text: #FFFFFF;
  --color-window-frame: #000000;
  --color-active-title: #000080;
  --color-inactive-title: #404050;
  --color-title-text: #FFFFFF;
  --color-window-text: #FFFFFF;
  --color-highlight: #000080;
  --color-highlight-text: #FFFFFF;
}
```

### Dimension Variables

```css
:root {
  --height-taskbar: 28px;
  --height-titlebar: 24px;
  --height-button: 23px;
  --height-input: 21px;
  --height-select: 21px;
  --height-menu-item: 24px;
  
  --border-width: 2px;
  
  --spacing-xs: 2px;
  --spacing-sm: 4px;
  --spacing-md: 8px;
  --spacing-lg: 16px;
  --spacing-xl: 32px;
}
```

### Z-Index Variables

```css
:root {
  --z-desktop: 0;
  --z-window-base: 100;
  --z-taskbar: 1000;
  --z-start-menu: 1100;
  --z-modal: 2000;
  --z-tooltip: 3000;
}
```

### Font Variables

```css
:root {
  --font-family-ui: 'MS Sans Serif', 'Microsoft Sans Serif', sans-serif;
  --font-family-mono: 'Courier New', 'Courier', monospace;
  
  --font-size-ui: 11px;
  --font-size-title: 11px;
  --font-size-menu: 11px;
  --font-size-button: 11px;
  --font-size-terminal: 10px;
}
```

## SCSS Mixins

### Bevel Mixins

**Raised Bevel (Outset):**
```scss
@mixin bevel-raised {
  border-top: 2px solid var(--color-button-highlight);
  border-left: 2px solid var(--color-button-highlight);
  border-right: 2px solid var(--color-button-shadow);
  border-bottom: 2px solid var(--color-button-shadow);
}
```

**Inset Bevel:**
```scss
@mixin bevel-inset {
  border-top: 2px solid var(--color-button-shadow);
  border-left: 2px solid var(--color-button-shadow);
  border-right: 2px solid var(--color-button-highlight);
  border-bottom: 2px solid var(--color-button-highlight);
}
```

**Deep Inset (Pressed):**
```scss
@mixin bevel-pressed {
  border-top: 2px solid var(--color-button-dark-shadow);
  border-left: 2px solid var(--color-button-dark-shadow);
  border-right: 2px solid var(--color-button-face);
  border-bottom: 2px solid var(--color-button-face);
}
```

**Field Inset (Text Inputs):**
```scss
@mixin bevel-field {
  @include bevel-inset;
  background: #FFFFFF;
}
```

### Typography Mixins

**UI Text:**
```scss
@mixin text-ui {
  font-family: var(--font-family-ui);
  font-size: var(--font-size-ui);
  font-smooth: never;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
}
```

**Monospace Text:**
```scss
@mixin text-mono {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-terminal);
  font-smooth: never;
  -webkit-font-smoothing: none;
}
```

**Disabled Text:**
```scss
@mixin text-disabled {
  color: var(--color-button-shadow);
  text-shadow: 1px 1px 0 var(--color-button-highlight);
}
```

### Component Mixins

**Button Base:**
```scss
@mixin button-base {
  @include text-ui;
  @include bevel-raised;
  
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--height-button);
  min-width: 75px;
  padding: 0 8px;
  background: var(--color-button-face);
  color: var(--color-button-text);
  cursor: pointer;
  user-select: none;
  
  &:active:not(:disabled) {
    @include bevel-pressed;
    
    .label {
      transform: translate(1px, 1px);
    }
  }
  
  &:disabled {
    @include text-disabled;
    cursor: not-allowed;
  }
}
```

**Input Base:**
```scss
@mixin input-base {
  @include text-ui;
  @include bevel-field;
  
  height: var(--height-input);
  padding: 2px 4px;
  color: #000000;
  
  &:focus {
    outline: 1px dotted #000000;
    outline-offset: -3px;
  }
  
  &:disabled {
    background: var(--color-button-face);
    color: var(--color-button-shadow);
  }
}
```

**Window Chrome:**
```scss
@mixin window-chrome {
  @include bevel-raised;
  
  background: var(--color-button-face);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}
```

## Utility Classes

### Layout Classes

```css
.flex-row {
  display: flex;
  flex-direction: row;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-1 {
  flex: 1;
}
```

### Spacing Classes

```css
.p-xs { padding: var(--spacing-xs); }
.p-sm { padding: var(--spacing-sm); }
.p-md { padding: var(--spacing-md); }
.p-lg { padding: var(--spacing-lg); }

.m-xs { margin: var(--spacing-xs); }
.m-sm { margin: var(--spacing-sm); }
.m-md { margin: var(--spacing-md); }
.m-lg { margin: var(--spacing-lg); }

.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }
```

### Text Classes

```css
.text-bold {
  font-weight: 700;
}

.text-center {
  text-align: center;
}

.text-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Component Classes

### Button Classes

```css
.win98-button {
  /* Automatically includes button-base mixin */
}

.win98-button.primary {
  font-weight: bold;
}

.win98-button.pressed {
  border-top: 2px solid var(--color-button-dark-shadow);
  border-left: 2px solid var(--color-button-dark-shadow);
  border-right: 2px solid var(--color-button-face);
  border-bottom: 2px solid var(--color-button-face);
}
```

### Input Classes

```css
.win98-input {
  /* Automatically includes input-base mixin */
}

.win98-input[type="password"] {
  letter-spacing: 2px;
}
```

### Checkbox Classes

```css
.win98-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
}

.win98-checkbox__box {
  width: 13px;
  height: 13px;
  border-top: 2px solid var(--color-button-shadow);
  border-left: 2px solid var(--color-button-shadow);
  border-right: 2px solid var(--color-button-highlight);
  border-bottom: 2px solid var(--color-button-highlight);
  background: #FFFFFF;
  position: relative;
}

.win98-checkbox__box.checked::after {
  content: '';
  position: absolute;
  width: 9px;
  height: 9px;
  left: 0;
  top: 0;
  background-image: url('./assets/icons/ui/checkmark.png');
  background-size: contain;
}
```

### Window Classes

```css
.win98-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  border: 2px outset var(--color-button-face);
  background: var(--color-button-face);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
}

.win98-window.maximized {
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: calc(100vh - var(--height-taskbar)) !important;
}

.win98-window.minimized {
  display: none;
}

.win98-window__titlebar {
  display: flex;
  align-items: center;
  height: var(--height-titlebar);
  padding: 0 2px;
  user-select: none;
  cursor: move;
}

.win98-window__titlebar.active {
  background: var(--color-active-title);
}

.win98-window__titlebar.inactive {
  background: var(--color-inactive-title);
}

.win98-window__title {
  flex: 1;
  font-size: var(--font-size-title);
  font-weight: bold;
  color: var(--color-title-text);
  padding-left: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.win98-window__content {
  flex: 1;
  overflow: auto;
  padding: 8px;
}
```

### Taskbar Classes

```css
.win98-taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: var(--height-taskbar);
  display: flex;
  align-items: center;
  background: var(--color-button-face);
  border-top: 2px solid var(--color-button-highlight);
  z-index: var(--z-taskbar);
}

.win98-taskbar__start {
  height: 100%;
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: bold;
  border: 2px outset var(--color-button-face);
  cursor: pointer;
}

.win98-taskbar__start.active {
  border: 2px inset var(--color-button-face);
}

.win98-taskbar__buttons {
  flex: 1;
  display: flex;
  gap: 2px;
  overflow-x: auto;
  padding: 0 2px;
}

.win98-taskbar__tray {
  display: flex;
  align-items: center;
  gap: 2px;
  padding: 0 4px;
  border-left: 2px solid var(--color-button-shadow);
}
```

### Desktop Classes

```css
.win98-desktop {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: var(--height-taskbar);
  overflow: hidden;
}

.win98-desktop.theme-light {
  background: var(--color-desktop);
}

.win98-desktop.theme-dark {
  background: linear-gradient(to bottom, #000080, #1084D0);
}

.desktop-icon {
  position: absolute;
  width: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 4px;
  cursor: pointer;
  user-select: none;
}

.desktop-icon.selected {
  background: rgba(0, 0, 128, 0.5);
}

.desktop-icon__icon {
  width: 32px;
  height: 32px;
}

.desktop-icon__label {
  font-size: var(--font-size-ui);
  color: #FFFFFF;
  text-align: center;
  text-shadow: 1px 1px 0 #000000;
  word-wrap: break-word;
  max-width: 100%;
}
```

## Icon Classes

### Base Icon Class

```css
.icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-optimize-contrast;
}
```

### Icon Size Modifiers

```css
.icon-size-32 {
  width: 32px;
  height: 32px;
}

.icon-size-48 {
  width: 48px;
  height: 48px;
}
```

### Icon Categories

All icon classes follow the pattern: `icon-{category}-{name}`

**System Icons:**
```css
.icon-system-computer { background-image: url('./assets/icons/system/computer.png'); }
.icon-system-recycle-empty { background-image: url('./assets/icons/system/recycle-empty.png'); }
/* ... all system icons */
```

**App Icons:**
```css
.icon-apps-calculator { background-image: url('./assets/icons/apps/calculator.png'); }
.icon-apps-notepad { background-image: url('./assets/icons/apps/notepad.png'); }
/* ... all app icons */
```

**File Icons:**
```css
.icon-files-folder { background-image: url('./assets/icons/files/folder.png'); }
.icon-files-document { background-image: url('./assets/icons/files/document.png'); }
/* ... all file icons */
```

**UI Icons:**
```css
.icon-ui-minimize { background-image: url('./assets/icons/ui/minimize.png'); }
.icon-ui-maximize { background-image: url('./assets/icons/ui/maximize.png'); }
.icon-ui-close { background-image: url('./assets/icons/ui/close.png'); }
/* ... all UI icons */
```

## Usage Examples

### Using Mixins in Components

```scss
// In MyComponent.svelte
<style lang="scss">
  .my-button {
    @include button-base;
    min-width: 100px;
  }
  
  .my-input {
    @include input-base;
    width: 200px;
  }
  
  .my-panel {
    @include bevel-inset;
    padding: var(--spacing-md);
    background: var(--color-button-face);
  }
</style>
```

### Using CSS Variables

```scss
.custom-element {
  background: var(--color-button-face);
  color: var(--color-button-text);
  padding: var(--spacing-md);
  border: var(--border-width) solid var(--color-button-shadow);
}
```

### Using Utility Classes

```html
<div class="flex-column gap-md p-md">
  <div class="flex-row gap-sm">
    <button class="win98-button">OK</button>
    <button class="win98-button">Cancel</button>
  </div>
  <p class="text-center">Centered text</p>
</div>
```

## Responsive Behavior

**Windows 98 used fixed layouts - no responsive design:**

```css
/* ❌ Not allowed */
@media (max-width: 768px) {
  .element { font-size: 14px; }
}

/* ❌ Not allowed */
.element {
  font-size: clamp(10px, 2vw, 14px);
}

/* ✅ Allowed */
.element {
  font-size: 11px; /* Fixed */
}
```

## Animation Restrictions

**Windows 98 had no smooth animations:**

```css
/* ❌ Not allowed */
.element {
  transition: all 0.3s ease;
  animation: fadeIn 0.5s;
}

/* ✅ Allowed */
.element {
  /* Instant state changes only */
}
```

## Browser Compatibility

Target browsers must support:

- CSS Custom Properties
- Flexbox
- `image-rendering: pixelated`
- `box-shadow`
- `text-overflow: ellipsis`

Minimum versions:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Summary

CSS API provides:

- **Custom Properties** - Colors, dimensions, fonts, z-indices
- **SCSS Mixins** - Bevels, typography, components
- **Utility Classes** - Layout, spacing, text
- **Component Classes** - Complete component styles
- **Icon Classes** - 80+ icon classes with size modifiers

All styles follow Windows 98 aesthetic with pixel-perfect precision.
