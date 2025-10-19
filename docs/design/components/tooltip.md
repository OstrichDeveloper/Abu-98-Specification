---
id: tooltip
title: Tooltip
---

# Tooltip Component

## Overview

Tooltips display helpful text when hovering over UI elements.

## Visual Specifications

### Dimensions

```
Padding: 2px 4px
Border: 1px solid #000000
Max width: 300px
```

### Colors

#### Light Theme

```css
--tooltip-bg: #FFFFE1               /* Light yellow background */
--tooltip-text: #000000             /* Black text */
--tooltip-border: #000000           /* Black border */
```

#### Dark Theme

```css
--tooltip-bg: #FFFFE1               /* Light yellow (same) */
--tooltip-text: #000000             /* Black text (same) */
--tooltip-border: #000000           /* Black border (same) */
```

**Note:** Tooltips use the same yellow background in both themes for high contrast.

## Structure

```
┌──────────────────┐
│ Tooltip text     │
└──────────────────┘
```

### Appearance
- Single-line or multi-line text
- Yellow background
- Black 1px border
- No shadow

## Positioning

```javascript
// Appear below cursor
tooltip.style.left = `${mouseX + 12}px`;
tooltip.style.top = `${mouseY + 12}px`;

// Adjust if would go off-screen
if (tooltipRect.right > window.innerWidth) {
  tooltip.style.left = `${mouseX - tooltipRect.width - 12}px`;
}
```

## Timing

```
Delay before show: 500ms
Show duration: Until mouse moves away
Fade: None (instant show/hide)
```

## CSS Implementation

```scss
.win98-tooltip {
  position: fixed;
  padding: 2px 4px;
  max-width: 300px;
  
  background: var(--tooltip-bg);
  color: var(--tooltip-text);
  border: 1px solid var(--tooltip-border);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  -webkit-font-smoothing: none;
  
  z-index: 10001;
  pointer-events: none;
  white-space: nowrap;
  
  &--multiline {
    white-space: normal;
  }
}
```

## Usage

```html
<button 
  class="win98-button" 
  title="Click to save your work"
  data-tooltip="Save (Ctrl+S)"
>
  Save
</button>
```

## Behavior

- Hover 500ms → Show tooltip
- Move mouse → Hide tooltip
- No tooltip on touch devices
- Instant show/hide (no animation)
