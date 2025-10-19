---
id: desktop
title: Desktop
---

# Desktop Component

## Overview

The Desktop is the main background area where icons and windows are displayed. It uses a grid-based icon layout system and provides the primary workspace for the Windows 98 environment.

## Visual Specifications

### Dimensions

```
Width: 100vw (full viewport width)
Height: 100vh - 28px (full viewport minus taskbar)
Position: Fixed, top: 0, left: 0
```

### Colors

#### Light Theme

```css
--desktop-bg: #008080          /* Teal background */
--desktop-text: #FFFFFF        /* White text (for icons) */
```

#### Dark Theme

```css
--desktop-bg-top: #0000CC      /* Bright blue (top) */
--desktop-bg-bottom: #000020   /* Very dark blue/black (bottom) */
--desktop-text: #FFFFFF        /* White text (for icons) */
```

**Gradient Background:**
Inspired by Windows 95/98 installation screen
```css
background: linear-gradient(
  to bottom,
  var(--desktop-bg-top) 0%,
  var(--desktop-bg-bottom) 100%
);
```

### Background

**Light Theme (Solid Teal):**
```css
background: #008080;
```

**Dark Theme (Blue-to-Black Gradient):**
```css
background: linear-gradient(to bottom, #0000CC 0%, #000020 100%);
```

**Wallpaper (Optional Override):**
```css
background-image: url('wallpaper.jpg');
background-size: cover | contain | tile;
background-position: center;
background-repeat: no-repeat | repeat;
```

## Icon Grid System

### Grid Specifications

```
Column width: 75px
Row height: 75px
Icon spacing: 75px x 75px cells
Grid padding: 10px from edges
```

### Icon Arrangement

Icons flow in columns from top to bottom, then left to right:

```
┌─────────────────────────────────┐
│  1   4   7   10                 │
│  2   5   8   11                 │
│  3   6   9   12                 │
│                                 │
│                                 │
│                                 │
└─────────────────────────────────┘
```

### Grid Calculation

```javascript
// Icon position calculation
column = Math.floor(index / maxRows)
row = index % maxRows

x = padding + (column * cellWidth)
y = padding + (row * cellHeight)

// Max rows based on desktop height
maxRows = Math.floor((desktopHeight - padding * 2) / cellHeight)
```

## Desktop Layers

```
Z-index hierarchy:
  1. Desktop background: z-index 0
  2. Desktop icons: z-index 1-10
  3. Windows: z-index 100-999
  4. Modal dialogs: z-index 1000-1999
  5. Context menus: z-index 2000-2999
  6. Taskbar: z-index 10000
```

## States

### Normal
- Desktop background visible
- Icons arranged in grid
- Windows displayed above desktop
- Clickable area

### Icon Selection Active
- Selected icons highlighted
- Unselected icons normal
- Selection rectangle visible (during drag)

### Context Menu Open
- Right-click menu visible
- Desktop remains interactive
- Menu closes on outside click

## Behavior

### Click Empty Area
- Deselects all icons
- Closes any open context menu
- Does not affect window focus

### Right-Click Empty Area
- Opens desktop context menu
- Menu items: Arrange Icons, Refresh, Properties, etc.

### Drag Selection Rectangle
1. Click and hold on empty area
2. Drag to create selection rectangle
3. All icons within rectangle become selected
4. Release completes selection

### Icon Dropping
- Icons can be dragged to new grid positions
- Snap to nearest grid cell
- Cannot overlap with other icons
- Auto-rearranges if needed

### Window Management
- Windows exist above desktop layer
- Desktop click-through when behind window
- Desktop visible between windows

## Interaction

### Selection Rectangle

When user drags on empty desktop:

```
Start: Mouse down on empty area
During: Draw selection rectangle
  - Border: 1px dashed black
  - Background: rgba(0, 0, 128, 0.2) (navy blue, transparent)
  - Updates in real-time as mouse moves
End: Mouse up
  - Select all icons within rectangle
  - Remove selection rectangle
```

### Icon Arrangement

**Arrange by Name:**
- Sort icons alphabetically
- Arrange in grid top to bottom, left to right

**Arrange by Type:**
- Group by icon type (folder, file, shortcut)
- Within groups, sort alphabetically

**Arrange by Date:**
- Sort by modified date (newest first)
- Arrange in grid

**Auto Arrange:**
- Automatically snap all icons to grid
- Fill empty grid cells
- Maintain current sort order

### Refresh
- Reload desktop state
- Re-render all icons
- Refresh window states

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-desktop"
  role="main"
  aria-label="Desktop"
>
```

### Screen Reader
- Announces as "Desktop"
- Announces number of icons
- Announces when icon selected

### Keyboard Navigation
- Tab: Focus first icon or first window
- Arrow keys: Navigate between icons (when focused)
- Enter: Open focused icon
- Delete: Delete focused icon (with confirmation)
- Ctrl+A: Select all icons
- Escape: Deselect all icons

## Usage Examples

### Basic Desktop
```html
<div class="win98-desktop">
  <!-- Desktop icons rendered here -->
  <div class="win98-desktop__icons">
    <!-- See desktop-icon.md -->
  </div>
  
  <!-- Windows rendered here -->
  <div class="win98-desktop__windows">
    <!-- See window.md -->
  </div>
</div>
```

### With Wallpaper
```html
<div 
  class="win98-desktop" 
  style="background-image: url('clouds.jpg'); background-size: cover;"
>
  ...
</div>
```

### With Selection Rectangle
```html
<div class="win98-desktop">
  <div class="win98-desktop__icons">...</div>
  <div class="win98-desktop__windows">...</div>
  
  <!-- Active during drag selection -->
  <div 
    class="win98-desktop__selection-rect" 
    style="left: 100px; top: 50px; width: 200px; height: 150px;"
  ></div>
</div>
```

## CSS Implementation

```scss
.win98-desktop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: calc(100vh - 28px); // Minus taskbar height
  
  background: var(--desktop-bg);
  
  overflow: hidden;
  user-select: none;
  
  &__icons {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  &__windows {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 100;
  }
  
  &__selection-rect {
    position: absolute;
    border: 1px dashed #000000;
    background: rgba(0, 0, 128, 0.2);
    pointer-events: none;
    z-index: 50;
  }
}
```

## Grid Layout Helper

```scss
// Desktop icon grid system
.win98-desktop__icons {
  --grid-column-width: 75px;
  --grid-row-height: 75px;
  --grid-padding: 10px;
  
  // Icons positioned absolutely within this container
  // Each icon calculates its position based on grid
}
```

## Context Menu Items

Desktop right-click menu:
- **Arrange Icons** →
  - by Name
  - by Type
  - by Size
  - by Date
  - Auto Arrange
- **Line up Icons**
- **Refresh**
- **Paste** (if clipboard has content)
- **Paste Shortcut**
- **New** →
  - Folder
  - Shortcut
  - Text Document
- **Properties**

## Testing Requirements

### Visual Tests
- Verify desktop fills viewport minus taskbar
- Verify background color in both themes
- Verify icons arranged in proper grid
- Verify selection rectangle appearance
- Verify z-index layering

### Interaction Tests
- Click empty area deselects icons
- Right-click opens context menu
- Drag creates selection rectangle
- Selection rectangle selects icons within bounds
- Icons can be dragged and snapped to grid
- Desktop click-through behind windows

### Grid Tests
- Icons snap to 75x75px grid
- Grid starts 10px from edges
- Icons flow top to bottom, left to right
- Grid recalculates on resize
- No icon overlapping

### Accessibility Tests
- Screen reader announces desktop
- Keyboard navigation works
- Icons keyboard accessible
- Focus management correct

## Notes

- Desktop background is typically teal (#008080) in light theme
- Icons are arranged in a strict grid system
- Grid cell size is 75x75px
- Icons cannot overlap
- Selection rectangle has semi-transparent navy blue fill
- Desktop exists below all windows
- Taskbar always on top of desktop
- No scrolling - desktop is fixed size
- Right-click context menu is desktop-specific
- Wallpaper is optional customization
