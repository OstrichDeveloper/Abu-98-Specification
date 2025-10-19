---
id: titlebar
title: Titlebar
---

# Titlebar Component

## Overview

The Titlebar is the top bar of every window containing the title text, window icon, and control buttons (minimize, maximize, close).

## Visual Specifications

### Dimensions

```
Height: 18px (caption height)
Padding: 2px 2px 2px 2px
Icon size: 16x16px
Icon margin-right: 2px
Button width: 16px
Button height: 14px
Button gap: 2px
```

### Colors

#### Light Theme (Active)

```css
--titlebar-bg-start: #000080       /* Gradient start (left) */
--titlebar-bg-end: #1084D0         /* Gradient end (right) */
--titlebar-text: #FFFFFF           /* Title text */
--titlebar-inactive-bg: #808080    /* Inactive background */
--titlebar-inactive-text: #C0C0C0  /* Inactive text */
```

#### Dark Theme (Active)

```css
--titlebar-bg-start: #000080       /* Gradient start (same) */
--titlebar-bg-end: #1084D0         /* Gradient end (same) */
--titlebar-text: #FFFFFF           /* Title text (same) */
--titlebar-inactive-bg: #404050    /* Inactive background */
--titlebar-inactive-text: #808080  /* Inactive text */
```

### Gradient

The active titlebar uses a horizontal gradient from dark blue to light blue:

```css
background: linear-gradient(
  to right,
  var(--titlebar-bg-start) 0%,
  var(--titlebar-bg-end) 100%
);
```

Inactive titlebar is solid gray (no gradient).

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 700 (bold)
Font smoothing: none
Text rendering: optimizeSpeed
Color: White (active) / Light gray (inactive)
```

## Structure

```
┌─[icon] Window Title ──────────── [_][□][×]─┐
```

Left to right:
1. **Window Icon** (16x16px, optional)
2. **Title Text** (bold, white, flexible width)
3. **System Buttons** (minimize, maximize, close)

## Components

### Window Icon
- 16x16px application icon
- Left-aligned, 2px from left edge
- 2px margin-right before title
- Optional (can be hidden)
- Double-click opens window menu
- Right-click opens window menu

### Title Text
- Bold white text
- Centered vertically
- Left-aligned after icon
- Truncates with ellipsis if too long
- Cannot be selected (user-select: none)

### System Buttons
See `titlebar-button.md` for detailed specs.
- Minimize button: Shows "_"
- Maximize/Restore button: Shows "□" or "❐"
- Close button: Shows "×"
- Each 16px wide, 14px high
- 2px gap between buttons
- Right-aligned

## States

### Active (Window Focused)
- Blue gradient background
- White text
- Buttons enabled
- Can drag to move window

### Inactive (Window Not Focused)
- Solid gray background (#808080 light, #404050 dark)
- Light gray text
- Buttons enabled but grayed
- Can still drag to move window (and focus it)

## Behavior

### Dragging
- Click and hold anywhere on titlebar (except buttons/icon)
- Cursor changes to `move`
- Window follows cursor
- Release to place window
- Clicking titlebar also focuses window if inactive

### Double-Click
- Double-click titlebar → Toggle maximize/restore
- Double-click must be on empty space (not icon/buttons)
- Timing: `< 500`ms between clicks

### Right-Click Titlebar
- Opens window menu (not context menu)
- Menu items: Restore, Move, Size, Minimize, Maximize, Close

### Icon Interactions
- Single click: No action
- Double-click: Close window
- Right-click: Open window menu

## Accessibility

### ARIA Attributes
```html
<div class="win98-titlebar" role="banner">
  <img src="icon.png" alt="" role="presentation">
  <h1 id="window-title" class="win98-titlebar__text">
    Window Title
  </h1>
  <div class="win98-titlebar__buttons" role="group" aria-label="Window controls">
    ...buttons...
  </div>
</div>
```

### Screen Reader
- Announces window title
- Announces button labels
- Does not announce decorative icon

### Keyboard
- Titlebar itself is not focusable
- Buttons are focusable and keyboard-accessible
- Alt+Space opens window menu

## Usage Examples

### Basic Titlebar
```html
<div class="win98-titlebar">
  <span class="win98-titlebar__icon">
    <img src="app-icon.png" alt="" width="16" height="16">
  </span>
  <h1 class="win98-titlebar__text">Untitled - Notepad</h1>
  <div class="win98-titlebar__buttons">
    <button class="win98-titlebar-button" data-action="minimize">
      <span>_</span>
    </button>
    <button class="win98-titlebar-button" data-action="maximize">
      <span>□</span>
    </button>
    <button class="win98-titlebar-button win98-titlebar-button--close" data-action="close">
      <span>×</span>
    </button>
  </div>
</div>
```

### Without Icon
```html
<div class="win98-titlebar">
  <h1 class="win98-titlebar__text">My Window</h1>
  <div class="win98-titlebar__buttons">
    ...buttons...
  </div>
</div>
```

### Inactive State
```html
<div class="win98-titlebar win98-titlebar--inactive">
  <h1 class="win98-titlebar__text">Inactive Window</h1>
  <div class="win98-titlebar__buttons">
    ...buttons...
  </div>
</div>
```

## CSS Implementation

```scss
.win98-titlebar {
  display: flex;
  align-items: center;
  height: 18px;
  padding: 2px;
  gap: 2px;
  
  background: linear-gradient(
    to right,
    var(--titlebar-bg-start) 0%,
    var(--titlebar-bg-end) 100%
  );
  
  user-select: none;
  cursor: default;
  
  &__icon {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    
    img {
      display: block;
      width: 16px;
      height: 16px;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }
  }
  
  &__text {
    flex: 1;
    margin: 0;
    padding: 0 4px;
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    font-weight: 700;
    color: var(--titlebar-text);
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__buttons {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
  }
  
  // Draggable area (entire titlebar except buttons)
  &:not(:has(.win98-titlebar__buttons:hover)) {
    cursor: move;
  }
  
  // Inactive state
  &--inactive {
    background: var(--titlebar-inactive-bg);
    
    .win98-titlebar__text {
      color: var(--titlebar-inactive-text);
    }
  }
}
```

## Testing Requirements

### Visual Tests
- Verify exactly 18px height
- Verify gradient colors (active)
- Verify solid gray background (inactive)
- Verify white text (active)
- Verify gray text (inactive)
- Verify icon is 16x16px
- Verify buttons are 16x14px
- Verify 2px gaps between elements

### Interaction Tests
- Drag titlebar moves window
- Double-click toggles maximize
- Click inactive titlebar focuses window
- Double-click icon closes window
- Right-click opens window menu
- Cannot drag by clicking buttons

### State Tests
- Active window shows blue gradient
- Inactive window shows gray background
- Switching focus updates appearance instantly
- Multiple windows show correct active/inactive states

### Accessibility Tests
- Screen reader reads title
- Window controls announced
- Icon not announced (decorative)
- Keyboard access to buttons

## Notes

- Titlebar gradient is iconic Windows 98 blue
- Gradient colors are SAME in both light and dark themes
- Only inactive background color changes between themes
- Height is exactly 18px (Windows 98 standard)
- Text must be bold and white when active
- No hover effects on titlebar itself
- Dragging should feel instant and responsive
- Icon double-click to close is standard Windows behavior
- Title text truncates with ellipsis, never wraps
