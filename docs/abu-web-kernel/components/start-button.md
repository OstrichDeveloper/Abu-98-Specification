---
id: start-button
title: Start Button
---

# Start Button Component

## Overview

The Start button is the primary entry point to the Windows 98 Start Menu. It's located at the far left of the taskbar and features the Windows logo icon with "Start" text.

## Visual Specifications

### Dimensions

```
Width: 54px
Height: 22px (fits in 28px taskbar with 2px padding on each side)
Padding: 2px 4px
Icon size: 16x16px
Gap between icon and text: 2px
Border: 2px (all sides)
```

### Colors

#### Light Theme

```css
--start-button-bg: #C0C0C0           /* Background */
--start-button-text: #000000         /* Text color */
--start-button-border-light: #FFFFFF /* Top/left raised border */
--start-button-border-dark: #808080  /* Bottom/right raised border */
--start-button-dark-shadow: #000000  /* Pressed borders */
```

#### Dark Theme

```css
--start-button-bg: #1A1A2E           /* Background */
--start-button-text: #FFFFFF         /* Text color */
--start-button-border-light: #404050 /* Top/left raised border */
--start-button-border-dark: #0A0A15  /* Bottom/right raised border */
--start-button-dark-shadow: #000000  /* Pressed borders */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 700 (bold)
Font smoothing: none
Text rendering: optimizeSpeed
```

### Border Styles

**Normal (Raised):**
```css
border-top: 2px solid var(--start-button-border-light);
border-left: 2px solid var(--start-button-border-light);
border-right: 2px solid var(--start-button-border-dark);
border-bottom: 2px solid var(--start-button-border-dark);
```

**Pressed (Menu Open):**
```css
border: 2px solid var(--start-button-dark-shadow);
box-shadow: inset 1px 1px 0 var(--start-button-border-dark);
```

## Structure

```
┌──────────────┐
│ [⊞] Start   │
└──────────────┘
  ↑    ↑
 Icon Text
```

### Icon
- Windows logo (16x16px)
- Left-aligned
- 2px margin from left edge
- Pixelated rendering

### Text
- "Start" label
- Bold font
- 2px gap after icon
- Vertically centered

## States

### Normal
- Raised bevel border
- Gray background (theme-dependent)
- Black text (light theme) or white text (dark theme)
- Cursor: pointer

### Pressed (Menu Open)
- Inset bevel border
- Same background color
- Text and icon shifted 1px down and 1px right
- Indicates Start menu is open

### Hover
**No hover state** - Windows 98 did not have hover effects on Start button

### Focused
- Dotted outline inside button
- Same appearance otherwise
- Visible when tabbed to

## Behavior

### Click
1. User clicks Start button
2. If menu closed → Open Start menu, show pressed state
3. If menu open → Close Start menu, return to normal state
4. Menu appears directly above button, aligned to left edge

### Keyboard
- Windows key → Toggle Start menu
- Escape → Close Start menu
- Tab → Focus next taskbar element (when menu closed)

### Menu Position
```
Start menu appears:
  Left: Aligned with left edge of Start button
  Bottom: Directly above taskbar (top edge of menu touches bottom of button)
  Z-index: 9999 (below taskbar, above windows)
```

## Accessibility

### ARIA Attributes
```html
<button
  class="win98-start-button"
  aria-label="Start menu"
  aria-expanded="false"
  aria-haspopup="menu"
>
```

### Screen Reader
- Announces as "Start menu button"
- Announces "expanded" when menu open
- Announces "collapsed" when menu closed

### Keyboard
- Tab → Focus Start button
- Space or Enter → Toggle menu
- Windows key → Toggle menu
- Escape → Close menu

## Usage Examples

### Basic Start Button
```html
<button 
  class="win98-start-button" 
  aria-label="Start menu"
  aria-expanded="false"
  aria-haspopup="menu"
>
  <img 
    src="/icons/windows-logo.png" 
    alt="" 
    width="16" 
    height="16"
    class="win98-start-button__icon"
  >
  <span class="win98-start-button__text">Start</span>
</button>
```

### With Menu Open (Pressed State)
```html
<button 
  class="win98-start-button win98-start-button--pressed" 
  aria-expanded="true"
>
  <img src="/icons/windows-logo.png" alt="" width="16" height="16">
  <span>Start</span>
</button>
```

## CSS Implementation

```scss
.win98-start-button {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  
  width: 54px;
  height: 22px;
  padding: 2px 4px;
  gap: 2px;
  
  background: var(--start-button-bg);
  color: var(--start-button-text);
  
  border-top: 2px solid var(--start-button-border-light);
  border-left: 2px solid var(--start-button-border-light);
  border-right: 2px solid var(--start-button-border-dark);
  border-bottom: 2px solid var(--start-button-border-dark);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: 700;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  
  cursor: pointer;
  user-select: none;
  
  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  &__text {
    flex-shrink: 0;
  }
  
  // Pressed state (menu open)
  &--pressed {
    border: 2px solid var(--start-button-dark-shadow);
    box-shadow: inset 1px 1px 0 var(--start-button-border-dark);
    
    .win98-start-button__icon,
    .win98-start-button__text {
      transform: translate(1px, 1px);
    }
  }
  
  // Focus state
  &:focus-visible {
    outline: 1px dotted var(--start-button-text);
    outline-offset: -4px;
  }
}
```

## Windows Logo Icon

The iconic Windows logo should be:
- 16x16px
- Four-color flag design (red, green, blue, yellow)
- PNG format with transparency
- Pixelated rendering (no smoothing)

```
Approximate colors:
Red: #FF0000
Green: #00FF00
Blue: #0000FF
Yellow: #FFFF00
```

## Testing Requirements

### Visual Tests
- Verify exact size: 54px wide, 22px high
- Verify icon is 16x16px
- Verify 2px gap between icon and text
- Verify bold text
- Verify raised border (normal state)
- Verify inset border (pressed state)
- Verify both theme colors

### Interaction Tests
- Click toggles Start menu
- Click when menu open closes menu
- Button shows pressed state when menu open
- Button returns to normal when menu closed
- Windows key toggles menu
- Escape closes menu

### State Tests
- Normal state: raised border
- Pressed state: inset border, content shifted 1px
- Focus state: dotted outline visible
- ARIA expanded attribute updates correctly

### Accessibility Tests
- Screen reader announces button
- Screen reader announces menu state
- Keyboard navigation works
- Focus visible
- ARIA attributes correct

## Notes

- Start button is exactly 54px wide (fixed)
- Icon is Windows logo (16x16px four-color flag)
- Text is ALWAYS "Start" (not translated in original Win98)
- Bold font weight distinguishes it from other taskbar buttons
- Pressed state persists while menu is open
- No hover effects in Windows 98
- Content shifts exactly 1px down and 1px right when pressed
- Button is always visible and always in same position
- Z-index management: Button is part of taskbar (z-index 10000), menu is z-index 9999
