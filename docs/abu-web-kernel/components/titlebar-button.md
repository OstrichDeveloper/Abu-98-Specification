---
id: titlebar-button
title: Titlebar Button
---

# Titlebar Button Component

## Overview

Titlebar buttons are the minimize, maximize/restore, and close buttons located on the right side of the titlebar. They have a unique visual style distinct from regular buttons.

## Visual Specifications

### Dimensions

```
Width: 16px
Height: 14px
Padding: 0
Border width: 1px
Symbol size: 8x7px (approximate)
```

### Colors

#### Light Theme

```css
--titlebar-button-bg: #C0C0C0           /* Background */
--titlebar-button-highlight: #FFFFFF    /* Top/left border (raised) */
--titlebar-button-shadow: #808080       /* Bottom/right border (raised) */
--titlebar-button-dark-shadow: #000000  /* Pressed borders */
--titlebar-button-symbol: #000000       /* Symbol color */
--titlebar-close-hover-bg: #E81123      /* Close button hover (optional) */
```

#### Dark Theme

```css
--titlebar-button-bg: #1A1A2E           /* Background */
--titlebar-button-highlight: #404050    /* Top/left border (raised) */
--titlebar-button-shadow: #0A0A15       /* Bottom/right border (raised) */
--titlebar-button-dark-shadow: #000000  /* Pressed borders */
--titlebar-button-symbol: #FFFFFF       /* Symbol color */
--titlebar-close-hover-bg: #E81123      /* Close button hover (optional) */
```

### Border Styles

**Normal (Raised):**
```css
border-top: 1px solid var(--titlebar-button-highlight);
border-left: 1px solid var(--titlebar-button-highlight);
border-right: 1px solid var(--titlebar-button-dark-shadow);
border-bottom: 1px solid var(--titlebar-button-dark-shadow);
box-shadow: inset -1px -1px 0 var(--titlebar-button-shadow);
```

**Pressed (Inset):**
```css
border: 1px solid var(--titlebar-button-dark-shadow);
box-shadow: none;
```

## Button Types

### Minimize Button

**Symbol: "_" (underscore)**
- Displays a horizontal line near bottom
- Represents minimizing to taskbar
- Action: Minimize window

Visual:
```
┌────┐
│    │
│    │
│────│
└────┘
```

### Maximize Button

**Symbol: "□" (square) when normal**
**Symbol: "❐" (double square) when maximized**

When window is normal:
- Single square outline
- Represents maximizing to full screen
- Action: Maximize window

When window is maximized:
- Double square (restore icon)
- Represents restoring to normal size
- Action: Restore window

Visual (Normal):
```
┌────┐
│┌──┐│
││  ││
│└──┘│
└────┘
```

Visual (Maximized):
```
┌────┐
│┌─┐ │
│└─┼─┐
│  │ │
└──┴─┘
```

### Close Button

**Symbol: "×" (multiplication sign)**
- Displays an X
- Represents closing window
- Action: Close window
- Often has special hover color (red)

Visual:
```
┌────┐
││ ×││
││ ││
│    │
└────┘
```

## States

### Normal
- Raised bevel border
- Gray background
- Black symbol (light) or white symbol (dark)
- No hover effect in pure Win98

### Pressed
- Inset bevel border
- Same background color
- Symbol and content shifted 1px down and 1px right

### Disabled
- Same raised border
- Symbol at 50% opacity
- No interaction
- Cursor: `not-allowed`

### Hover (Modern Enhancement - Optional)
**Note:** Windows 98 did NOT have hover states, but modern implementations may add:
- Close button: Red background on hover
- Other buttons: No hover effect

## Behavior

### Click Interaction

**Minimize Button:**
1. User clicks → Button shows pressed state
2. Window minimizes to taskbar
3. Window hidden from desktop
4. Taskbar button remains

**Maximize Button:**
1. User clicks → Button shows pressed state
2. If normal → Window maximizes to fill desktop
3. If maximized → Window restores to previous size/position
4. Button symbol changes (□ ↔ ❐)

**Close Button:**
1. User clicks → Button shows pressed state
2. Window close event fires
3. Window removed from desktop
4. Taskbar button removed

### Keyboard Shortcuts
- Minimize: No direct shortcut
- Maximize: No direct shortcut (use Alt+Space, then X)
- Close: Alt+F4

## Accessibility

### ARIA Attributes

```html
<button
  class="win98-titlebar-button"
  aria-label="Minimize"
  tabindex="0"
>
```

### Button Labels
- Minimize: "Minimize"
- Maximize: "Maximize" or "Restore"
- Close: "Close"

### Screen Reader
- Announces button label
- Announces button state (if disabled)
- Does not announce pressed state (instant action)

### Keyboard Navigation
- Tab focuses next button
- Shift+Tab focuses previous button
- Space or Enter activates button
- Escape closes window (for close button)

## Usage Examples

### Minimize Button
```html
<button 
  class="win98-titlebar-button win98-titlebar-button--minimize" 
  aria-label="Minimize"
  data-action="minimize"
>
  <span class="win98-titlebar-button__symbol">_</span>
</button>
```

### Maximize Button (Normal State)
```html
<button 
  class="win98-titlebar-button win98-titlebar-button--maximize" 
  aria-label="Maximize"
  data-action="maximize"
>
  <span class="win98-titlebar-button__symbol">□</span>
</button>
```

### Maximize Button (Maximized State)
```html
<button 
  class="win98-titlebar-button win98-titlebar-button--restore" 
  aria-label="Restore"
  data-action="restore"
>
  <span class="win98-titlebar-button__symbol">❐</span>
</button>
```

### Close Button
```html
<button 
  class="win98-titlebar-button win98-titlebar-button--close" 
  aria-label="Close"
  data-action="close"
>
  <span class="win98-titlebar-button__symbol">×</span>
</button>
```

### All Three Buttons
```html
<div class="win98-titlebar__buttons">
  <button class="win98-titlebar-button" aria-label="Minimize">
    <span>_</span>
  </button>
  <button class="win98-titlebar-button" aria-label="Maximize">
    <span>□</span>
  </button>
  <button class="win98-titlebar-button win98-titlebar-button--close" aria-label="Close">
    <span>×</span>
  </button>
</div>
```

## CSS Implementation

```scss
.win98-titlebar-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 14px;
  padding: 0;
  
  background: var(--titlebar-button-bg);
  
  border-top: 1px solid var(--titlebar-button-highlight);
  border-left: 1px solid var(--titlebar-button-highlight);
  border-right: 1px solid var(--titlebar-button-dark-shadow);
  border-bottom: 1px solid var(--titlebar-button-dark-shadow);
  box-shadow: inset -1px -1px 0 var(--titlebar-button-shadow);
  
  cursor: pointer;
  user-select: none;
  
  &__symbol {
    display: block;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    color: var(--titlebar-button-symbol);
    pointer-events: none;
  }
  
  &:active {
    border: 1px solid var(--titlebar-button-dark-shadow);
    box-shadow: none;
    
    .win98-titlebar-button__symbol {
      transform: translate(1px, 1px);
    }
  }
  
  &:disabled {
    .win98-titlebar-button__symbol {
      opacity: 0.5;
    }
    cursor: not-allowed;
  }
  
  // Close button special styling (optional modern enhancement)
  &--close:hover {
    background: var(--titlebar-close-hover-bg);
    
    .win98-titlebar-button__symbol {
      color: #FFFFFF;
    }
  }
}
```

## Symbols Reference

### Text-based Symbols
```
Minimize: _
Maximize: □ (U+25A1 White Square)
Restore:  ❐ (U+2750 Two Squares or custom)
Close:    × (U+00D7 Multiplication Sign)
```

### SVG Alternative
For pixel-perfect rendering, consider SVG icons:

```html
<svg width="8" height="7" class="symbol">
  <!-- Minimize: horizontal line -->
  <line x1="0" y1="6" x2="8" y2="6" stroke="currentColor" stroke-width="1"/>
</svg>

<svg width="8" height="7" class="symbol">
  <!-- Maximize: rectangle -->
  <rect x="0" y="0" width="7" height="6" fill="none" stroke="currentColor" stroke-width="1"/>
</svg>

<svg width="8" height="7" class="symbol">
  <!-- Close: X -->
  <line x1="1" y1="1" x2="7" y2="6" stroke="currentColor" stroke-width="1"/>
  <line x1="7" y1="1" x2="1" y2="6" stroke="currentColor" stroke-width="1"/>
</svg>
```

## Testing Requirements

### Visual Tests
- Verify exact size: 16x14px
- Verify border appearance (raised/inset)
- Verify symbol visibility and centering
- Verify pressed state shifts symbol 1px
- Verify both theme colors

### Interaction Tests
- Click minimize → Window minimizes
- Click maximize → Window maximizes
- Click maximize when maximized → Window restores
- Click close → Window closes
- Button shows pressed state when clicked
- Disabled button doesn't respond

### State Tests
- Maximize button symbol changes when window maximized
- Maximize button symbol reverts when window restored
- Buttons work in both active and inactive windows

### Accessibility Tests
- Screen reader announces button labels
- Keyboard activation works (Space/Enter)
- Tab navigation through buttons works
- ARIA labels correct

## Notes

- Buttons are exactly 16px wide and 14px high
- Symbol shifts exactly 1px down and 1px right when pressed
- No animations - state changes are instant
- In pure Windows 98, there were NO hover effects
- Modern implementations may add red close button hover
- Maximize button symbol must change based on window state
- All three buttons should be same size and style
- Buttons are always enabled except in special cases (e.g., can't minimize modal dialogs)
- Close button is on the right, minimize on the left
