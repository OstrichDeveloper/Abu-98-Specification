---
id: resize-handle
title: Resize Handle
---

# Resize Handle Component

## Overview

Resize handles allow users to resize windows by dragging edges and corners. They are invisible interactive zones with specific cursor styles.

## Visual Specifications

### Dimensions

```
Edge handle thickness: 4px
Corner handle size: 8x8px
```

### Positions

**Edges (4 handles):**
- Top edge
- Right edge
- Bottom edge
- Left edge

**Corners (4 handles):**
- Top-left corner
- Top-right corner
- Bottom-right corner
- Bottom-left corner

**Total:** 8 resize handles per window

### Colors

Resize handles are **invisible** - they are purely interactive zones with no visual appearance. The only visual feedback is the cursor change.

## Cursor Styles

### Edge Handles

**Top/Bottom edges:**
```css
cursor: ns-resize; /* North-South resize (vertical) */
```

**Left/Right edges:**
```css
cursor: ew-resize; /* East-West resize (horizontal) */
```

### Corner Handles

**Top-left / Bottom-right corners:**
```css
cursor: nwse-resize; /* Northwest-Southeast resize (diagonal) */
```

**Top-right / Bottom-left corners:**
```css
cursor: nesw-resize; /* Northeast-Southwest resize (diagonal) */
```

## Handle Layout

```
┌───────────────────────┐
│ TL    TOP         TR  │  TL = Top-left (nwse-resize)
│                       │  TOP = Top edge (ns-resize)
L                       R  TR = Top-right (nesw-resize)
E                       I  L = Left edge (ew-resize)
F                       G  R = Right edge (ew-resize)
T                       H  BL = Bottom-left (nesw-resize)
│                       T  BOT = Bottom edge (ns-resize)
│ BL    BOT         BR  │  BR = Bottom-right (nwse-resize)
└───────────────────────┘
```

### Z-Index Layering
- Corners have higher z-index than edges
- Prevents edge handles from overlapping corner functionality
- Corner z-index: 2
- Edge z-index: 1

## States

### Normal (Hoverable)
- Invisible
- Cursor changes on hover
- Ready to drag

### Dragging
- User clicks and holds handle
- Cursor remains resize-appropriate
- Window resizes in real-time as mouse moves
- Visual feedback: Window border resizes live

### Disabled (Window Maximized)
- All resize handles hidden or non-interactive
- Cursor does not change
- No resize allowed

## Behavior

### Edge Resizing

**Top Edge:**
- Drag up → Decrease height, move window up
- Drag down → Increase height
- Minimum height enforced

**Bottom Edge:**
- Drag up → Decrease height
- Drag down → Increase height
- Minimum height enforced

**Left Edge:**
- Drag left → Decrease width, move window left
- Drag right → Increase width
- Minimum width enforced

**Right Edge:**
- Drag left → Decrease width
- Drag right → Increase width
- Minimum width enforced

### Corner Resizing

**Top-Left Corner:**
- Resize both width and height
- Moves window position
- Constrains to minimum size

**Top-Right Corner:**
- Resize both width and height
- Moves window position vertically
- Constrains to minimum size

**Bottom-Right Corner:**
- Resize both width and height
- Does not move window position
- Most common resize handle used

**Bottom-Left Corner:**
- Resize both width and height
- Moves window position horizontally
- Constrains to minimum size

### Minimum Size Constraints
- Width cannot be less than window min-width
- Height cannot be less than window min-height
- Resize stops at minimum, cannot go smaller

### Live Resize
- Window resizes during drag, not after
- Content reflows in real-time
- No resize preview/outline

## Interaction

### Starting Resize
1. User hovers handle → Cursor changes
2. User clicks and holds mouse button
3. Resize mode activates

### During Resize
1. Mouse moves → Window size updates
2. Constraints enforced (min/max size)
3. Content reflows live

### Ending Resize
1. User releases mouse button
2. Final size set
3. Resize event fires
4. State persisted

## Accessibility

### ARIA Attributes
Resize handles typically don't have ARIA attributes as they are non-semantic interactive zones.

### Screen Reader
- Not announced (handled by browser default behavior)
- Window size changes may be announced

### Keyboard Alternative
- Alt+Space → Window menu → "Size"
- Arrow keys resize window
- Enter finalizes resize
- Escape cancels resize

## Usage Examples

### All Resize Handles
```html
<div class="win98-window">
  <!-- Titlebar and content -->
  
  <!-- Edge handles -->
  <div class="win98-resize-handle win98-resize-handle--top" data-edge="top"></div>
  <div class="win98-resize-handle win98-resize-handle--right" data-edge="right"></div>
  <div class="win98-resize-handle win98-resize-handle--bottom" data-edge="bottom"></div>
  <div class="win98-resize-handle win98-resize-handle--left" data-edge="left"></div>
  
  <!-- Corner handles -->
  <div class="win98-resize-handle win98-resize-handle--top-left" data-corner="top-left"></div>
  <div class="win98-resize-handle win98-resize-handle--top-right" data-corner="top-right"></div>
  <div class="win98-resize-handle win98-resize-handle--bottom-right" data-corner="bottom-right"></div>
  <div class="win98-resize-handle win98-resize-handle--bottom-left" data-corner="bottom-left"></div>
</div>
```

## CSS Implementation

```scss
.win98-resize-handle {
  position: absolute;
  z-index: 1;
  
  // Edge handles
  &--top {
    top: 0;
    left: 8px;
    right: 8px;
    height: 4px;
    cursor: ns-resize;
  }
  
  &--right {
    top: 8px;
    right: 0;
    bottom: 8px;
    width: 4px;
    cursor: ew-resize;
  }
  
  &--bottom {
    bottom: 0;
    left: 8px;
    right: 8px;
    height: 4px;
    cursor: ns-resize;
  }
  
  &--left {
    top: 8px;
    left: 0;
    bottom: 8px;
    width: 4px;
    cursor: ew-resize;
  }
  
  // Corner handles (higher z-index)
  &--top-left {
    top: 0;
    left: 0;
    width: 8px;
    height: 8px;
    cursor: nwse-resize;
    z-index: 2;
  }
  
  &--top-right {
    top: 0;
    right: 0;
    width: 8px;
    height: 8px;
    cursor: nesw-resize;
    z-index: 2;
  }
  
  &--bottom-right {
    bottom: 0;
    right: 0;
    width: 8px;
    height: 8px;
    cursor: nwse-resize;
    z-index: 2;
  }
  
  &--bottom-left {
    bottom: 0;
    left: 0;
    width: 8px;
    height: 8px;
    cursor: nesw-resize;
    z-index: 2;
  }
}

// Hide resize handles when window is maximized
.win98-window--maximized .win98-resize-handle {
  display: none;
}
```

## Testing Requirements

### Visual Tests
- Verify cursor changes on hover
- Verify handles are invisible
- Verify correct cursor for each handle
- Verify handles hidden when maximized

### Interaction Tests
- Drag each edge resizes correctly
- Drag each corner resizes correctly
- Minimum size enforced
- Live resize works (not just on release)
- Corners have priority over edges

### Edge Cases
- Cannot resize smaller than min width/height
- Resizing from top/left moves window
- Resizing from bottom/right doesn't move window
- Multiple rapid resize operations work smoothly

### Cursor Tests
- Top/bottom edges: ns-resize
- Left/right edges: ew-resize
- TL/BR corners: nwse-resize
- TR/BL corners: nesw-resize

## Notes

- Resize handles are completely invisible
- Only feedback is cursor change
- Resizing is live, not preview-based
- Windows 98 had instant resize with no animation
- Minimum size constraints must be enforced at all times
- Corner handles must have higher z-index than edges
- Maximized windows have no resize handles
- Edge handles should not extend into corner areas
- Typical edge thickness is 4px, corners are 8x8px
- All resizing happens in real-time during drag
