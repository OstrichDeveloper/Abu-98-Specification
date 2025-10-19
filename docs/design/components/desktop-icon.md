---
id: desktop-icon
title: Desktop Icon
---

# Desktop Icon Component

## Overview

Desktop icons represent files, folders, shortcuts, and applications on the Windows 98 desktop. They feature a 32x32px icon image with text label below.

## Visual Specifications

### Dimensions

```
Total width: 75px (grid cell width)
Total height: 75px (grid cell height)
Icon size: 32x32px
Label width: 75px (can wrap)
Label max height: 40px (2-3 lines)
Icon-to-label gap: 2px
```

### Colors

#### Light Theme

```css
--icon-text: #FFFFFF           /* White text */
--icon-text-shadow: #000000    /* Black text shadow */
--icon-selection-bg: #000080   /* Navy blue selection */
--icon-selection-border: #FFFFFF /* White selection border */
--icon-focus-outline: #FFFFFF  /* White focus outline */
```

#### Dark Theme

```css
--icon-text: #FFFFFF           /* White text (same) */
--icon-text-shadow: #000000    /* Black text shadow (same) */
--icon-selection-bg: #000080   /* Navy blue selection (same) */
--icon-selection-border: #FFFFFF /* White selection border (same) */
--icon-focus-outline: #FFFFFF  /* White focus outline (same) */
```

**Note:** Desktop icon colors are the same in both themes because they appear on colored desktop backgrounds.

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
Text align: center
Color: White
Text shadow: 1px 1px 1px black (for readability)
```

### Icon Image

```
Size: 32x32px
Format: PNG8 with alpha
Rendering: Pixelated / crisp-edges
Position: Centered in 75px width
```

### Label Text

```
Position: Below icon
Width: 75px
Max lines: 2-3
Text wrapping: break-word
Text align: center
Overflow: ellipsis after max lines
```

## Icon States

### Normal
- Icon image at full opacity
- White text with black shadow
- No background
- Default cursor

### Hover
**No hover state** - Windows 98 did not have icon hover effects

### Selected
- Navy blue background (#000080)
- White dotted border (1px dashed)
- Text remains white
- Icon remains full opacity

```css
background: #000080;
border: 1px dashed #FFFFFF;
padding: 2px;
```

### Focused (Keyboard Navigation)
- Dotted outline around icon
- Same as selected if selected
- Visible when tabbed to

### Dragging
- Semi-transparent (opacity: 0.7)
- Follows cursor
- Original position shows ghost/placeholder

### Disabled
- Icon at 50% opacity
- Label grayed out
- No interaction

## Icon Structure

```
┌─────────────┐
│             │
│    [Icon]   │  ← 32x32px image
│             │
│  Icon Name  │  ← Label (wrappable)
│             │
└─────────────┘
    75x75px
```

## Behavior

### Single Click
- Selects icon
- Deselects other icons (unless Ctrl held)
- Highlights with navy blue background

### Double Click
- Opens icon (launches application, opens folder, etc.)
- Timing: `< 500`ms between clicks

### Click + Drag
- Begins drag operation
- Icon becomes semi-transparent
- Can drop on desktop to move
- Can drop on folder to move into
- Snaps to grid on drop

### Right Click
- Opens context menu
- Menu items depend on icon type:
  - **File:** Open, Cut, Copy, Delete, Rename, Properties
  - **Folder:** Open, Explore, Cut, Copy, Delete, Rename, Properties
  - **Shortcut:** Open, Cut, Copy, Delete, Rename, Properties

### Keyboard Navigation
- Tab: Focus next icon (left-to-right, top-to-bottom order)
- Shift+Tab: Focus previous icon
- Arrow keys: Navigate to adjacent icon in grid
- Enter: Open icon
- F2: Rename icon
- Delete: Delete icon (with confirmation)
- Ctrl+C: Copy icon
- Ctrl+X: Cut icon
- Ctrl+V: Paste icon (if on desktop)

### Multi-Selection
- Ctrl+Click: Toggle selection on icon
- Shift+Click: Select range from last selected to clicked
- Drag selection rectangle: Select all within bounds

### Rename
1. Click selected icon label (or press F2)
2. Text becomes editable input field
3. Type new name
4. Press Enter to save, Escape to cancel

## Icon Types

### Application Icon
- Launches application on double-click
- Shows application-specific context menu

### Folder Icon
- Standard yellow folder icon
- Opens folder window on double-click

### File Icon
- Icon based on file type
- Opens with associated application

### Shortcut Icon
- Has small arrow overlay in bottom-left
- Links to another file/folder/application
- Displays target's icon

### System Icons
- My Computer
- Recycle Bin (Full/Empty states)
- Network Neighborhood
- My Documents

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-desktop-icon"
  role="button"
  aria-label="My Computer"
  aria-selected="false"
  tabindex="0"
>
```

### Screen Reader
- Announces icon name
- Announces icon type (folder, file, shortcut)
- Announces selected state
- Announces when opened

### Keyboard Access
- Fully keyboard navigable
- All actions available via keyboard
- Focus visible indicator
- Logical tab order

## Usage Examples

### Basic Desktop Icon
```html
<div class="win98-desktop-icon" data-icon-id="mycomputer" tabindex="0">
  <img 
    src="/icons/system/computer.png" 
    alt=""
    class="win98-desktop-icon__image"
    width="32"
    height="32"
  >
  <span class="win98-desktop-icon__label">My Computer</span>
</div>
```

### Selected Icon
```html
<div class="win98-desktop-icon win98-desktop-icon--selected" aria-selected="true">
  <img src="/icons/folders/folder.png" alt="" width="32" height="32">
  <span class="win98-desktop-icon__label">Documents</span>
</div>
```

### Shortcut Icon
```html
<div class="win98-desktop-icon" data-type="shortcut">
  <div class="win98-desktop-icon__image-wrapper">
    <img src="/icons/apps/notepad.png" alt="" width="32" height="32">
    <img 
      src="/icons/system/shortcut-arrow.png" 
      alt="" 
      class="win98-desktop-icon__shortcut-arrow"
      width="16"
      height="16"
    >
  </div>
  <span class="win98-desktop-icon__label">Notepad</span>
</div>
```

### Folder Icon
```html
<div class="win98-desktop-icon" data-type="folder">
  <img src="/icons/folders/folder.png" alt="" width="32" height="32">
  <span class="win98-desktop-icon__label">My Documents</span>
</div>
```

## CSS Implementation

```scss
.win98-desktop-icon {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  
  width: 75px;
  height: 75px;
  padding: 2px;
  
  position: absolute; // Positioned by grid system
  
  cursor: default;
  user-select: none;
  
  &__image {
    display: block;
    width: 32px;
    height: 32px;
    margin-bottom: 2px;
    
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  &__image-wrapper {
    position: relative;
    width: 32px;
    height: 32px;
    margin-bottom: 2px;
  }
  
  &__shortcut-arrow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 16px;
    height: 16px;
    
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  &__label {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    
    width: 100%;
    max-height: 40px;
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--icon-text);
    text-align: center;
    text-shadow: 1px 1px 1px var(--icon-text-shadow);
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Selected state
  &--selected {
    background: var(--icon-selection-bg);
    border: 1px dashed var(--icon-selection-border);
  }
  
  // Focus state
  &:focus {
    outline: 1px dotted var(--icon-focus-outline);
    outline-offset: 1px;
  }
  
  // Dragging state
  &--dragging {
    opacity: 0.7;
    cursor: move;
  }
  
  // Disabled state
  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    
    .win98-desktop-icon__image {
      opacity: 0.5;
    }
    
    .win98-desktop-icon__label {
      color: #808080;
    }
  }
}
```

## Grid Positioning

Icons are positioned using absolute positioning based on grid calculations:

```javascript
// Example positioning logic
const iconElement = document.querySelector('.win98-desktop-icon');
const gridPosition = calculateGridPosition(iconIndex);

iconElement.style.left = `${gridPosition.x}px`;
iconElement.style.top = `${gridPosition.y}px`;
```

## Testing Requirements

### Visual Tests
- Verify icon is 32x32px
- Verify total container is 75x75px
- Verify label wraps to max 2-3 lines
- Verify text shadow for readability
- Verify selection background (navy blue)
- Verify selection border (white dashed)
- Verify shortcut arrow overlay

### Interaction Tests
- Single click selects icon
- Double click opens icon
- Right click opens context menu
- Drag moves icon
- Drop snaps to grid
- Multi-select works (Ctrl, Shift, rectangle)

### Keyboard Tests
- Tab navigates icons
- Arrow keys move between icons
- Enter opens icon
- F2 starts rename
- Delete removes icon
- Ctrl+C/X/V work

### Accessibility Tests
- Screen reader announces icon name
- Screen reader announces type
- Screen reader announces selection
- Focus visible
- ARIA attributes correct

## Notes

- Icon colors are SAME in both light and dark themes
- Text is always white with black shadow
- Selection is always navy blue (#000080)
- Icons are 32x32px, not 16x16px (desktop icons are larger)
- Total icon container is 75x75px to match grid
- Label can wrap to 2-3 lines maximum
- Text shadow ensures readability on any background
- No hover effects in Windows 98
- Shortcut arrow is 16x16px in bottom-left of icon
- Icons snap to grid on all operations
- Selection state is instant, no animation
