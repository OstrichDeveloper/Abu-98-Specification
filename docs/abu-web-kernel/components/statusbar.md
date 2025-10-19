---
id: statusbar
title: Statusbar
---

# Status Bar Component

## Overview

The Status Bar is an optional horizontal bar at the bottom of application windows, displaying status information, hints, and progress indicators.

## Visual Specifications

### Dimensions

```
Height: 20px
Width: 100% (fills window width)
Padding: 2px 4px
Border: 2px inset on top only
```

### Colors

#### Light Theme

```css
--statusbar-bg: #C0C0C0              /* Gray background */
--statusbar-text: #000000            /* Black text */
--statusbar-border-dark: #808080     /* Top border (inset) */
--statusbar-border-light: #FFFFFF    /* Top border highlight */
```

#### Dark Theme

```css
--statusbar-bg: #1A1A2E              /* Dark background */
--statusbar-text: #FFFFFF            /* White text */
--statusbar-border-dark: #0A0A15     /* Top border (inset) */
--statusbar-border-light: #404050    /* Top border highlight */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

## Status Bar Structure

```
┌─────────────────────────────────────┐
│ Ready                    │ 100%     │
└─────────────────────────────────────┘
  ↑                          ↑
Main status text         Optional panels
```

### Sections

1. **Main Panel** (left-aligned, flex: 1)
   - Primary status text
   - "Ready", "Loading...", etc.

2. **Additional Panels** (right-aligned, fixed width)
   - Progress indicators
   - Counts, stats
   - Mode indicators

## Panel Types

### Text Panel
```html
<div class="win98-statusbar__panel">Ready</div>
```

### Progress Panel
```html
<div class="win98-statusbar__panel">
  50%
</div>
```

### Icon + Text Panel
```html
<div class="win98-statusbar__panel">
  <img src="icon.png" width="16" height="16">
  <span>Connected</span>
</div>
```

## CSS Implementation

```scss
.win98-statusbar {
  display: flex;
  align-items: center;
  gap: 2px;
  
  height: 20px;
  padding: 2px 4px;
  
  background: var(--statusbar-bg);
  color: var(--statusbar-text);
  
  border-top: 2px solid var(--statusbar-border-dark);
  box-shadow: inset 0 1px 0 var(--statusbar-border-light);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  
  &__panel {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    padding: 0 4px;
    
    &:first-child {
      flex: 1; // Main panel takes remaining space
      border: none;
    }
    
    &:not(:first-child) {
      border-left: 2px solid var(--statusbar-border-dark);
      padding-left: 8px;
    }
  }
}
```

## Usage in Window

```
┌─────────────────────────────────────┐
│ Window Title                    [×] │
├─────────────────────────────────────┤
│ File  Edit  View  Help              │
├─────────────────────────────────────┤
│                                     │
│     Window Content                  │
│                                     │
├─────────────────────────────────────┤
│ Ready                    │ Line 1   │ ← Status Bar
└─────────────────────────────────────┘
```

## Common Status Patterns

- **Ready** - Application idle
- **Loading...** - Operation in progress
- **Saving...** - File being saved
- **Error: [message]** - Error occurred
- **[Count] items** - Item count
- **Line [n], Col [n]** - Text editor position
