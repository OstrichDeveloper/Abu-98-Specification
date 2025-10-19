---
id: window
title: Window
---

# Window Component

## Overview

The Window component is the container for all desktop applications in Windows 98. It features a titlebar, optional menubar, content area, and resize handles.

## Visual Specifications

### Dimensions

```
Min width: 112px
Min height: 27px (titlebar only)
Default width: 400px
Default height: 300px
Border width: 3px
```

### Colors

#### Light Theme

```css
--window-bg: #C0C0C0                /* Window content background */
--window-border-light: #FFFFFF      /* Outer top/left border */
--window-border-dark: #808080       /* Outer bottom/right border */
--window-border-dark-shadow: #000000 /* Outer shadow border */
--window-inactive-border: #808080   /* Inactive window border */
```

#### Dark Theme

```css
--window-bg: #1A1A2E                /* Window content background */
--window-border-light: #404050      /* Outer top/left border */
--window-border-dark: #0A0A15       /* Outer bottom/right border */
--window-border-dark-shadow: #000000 /* Outer shadow border */
--window-inactive-border: #404050   /* Inactive window border */
```

### Border Structure

Windows 98 windows have a distinctive 3-pixel thick border:

```
Outer layer (1px):
  Top/Left: --window-border-light
  Bottom/Right: --window-border-dark-shadow

Middle layer (1px):
  Top/Left: --window-border-light
  Bottom/Right: --window-border-dark

Inner layer (1px):
  Top/Left: --window-border-light (or darker for inset)
  Bottom/Right: --window-border-dark
```

**Active Window:**
```css
border-top: 1px solid var(--window-border-light);
border-left: 1px solid var(--window-border-light);
border-right: 1px solid var(--window-border-dark-shadow);
border-bottom: 1px solid var(--window-border-dark-shadow);
box-shadow:
  inset 1px 1px 0 var(--window-border-light),
  inset -1px -1px 0 var(--window-border-dark);
```

**Inactive Window:**
```css
border: 1px solid var(--window-inactive-border);
opacity: 0.9;
```

## Window Structure

```
┌─────────────────────────────────────┐
│ [Titlebar]                      [×] │ ← Titlebar
├─────────────────────────────────────┤
│ File  Edit  View  Help              │ ← Menubar (optional)
├─────────────────────────────────────┤
│                                     │
│         Content Area                │ ← Content
│                                     │
│                                     │
├─────────────────────────────────────┤
│ Status bar text                     │ ← Status bar (optional)
└─────────────────────────────────────┘
  ↑ Resize handles on edges/corners
```

### Component Hierarchy

1. **Window Container** (outer border)
2. **Titlebar** (see titlebar.md)
3. **Menubar** (optional, see menubar.md)
4. **Content Area** (application content)
5. **Status Bar** (optional)
6. **Resize Handles** (see resize-handle.md)

## States

### Active (Focused)
- Full color titlebar (gradient)
- 3D raised border
- Z-index highest among windows
- Accepts keyboard input

### Inactive (Unfocused)
- Gray titlebar
- Border same or slightly muted
- Lower z-index
- Does not accept keyboard input

### Minimized
- Not visible on desktop
- Button appears on taskbar
- State preserved

### Maximized
- Fills entire desktop area
- No resize handles visible
- Position: (0, 0)
- Size: (desktop width, desktop height - taskbar height)

### Normal (Restored)
- Custom position and size
- Resize handles visible
- Can be moved and resized

## Behavior

### Z-Index Management
- Windows stack based on focus order
- Clicking window brings to front
- Z-index range: 1-999 (below modals)
- Newly focused window gets highest z-index
- Other windows shift down

### Position Constraints
- Cannot move titlebar above desktop top (y `>= 0`)
- Must keep at least 20px of titlebar visible (prevents loss)
- Can partially move off-screen on sides/bottom

### Cascade Positioning
New windows cascade from top-left:
```
First window: (20, 20)
Second window: (44, 44)  // +24px offset
Third window: (68, 68)   // +24px offset
etc.
```

When reaching bottom-right, reset to (20, 20).

### Resize Constraints
- Width >= Min width (112px)
- Height >= Min height (27px)
- If maximized, fills desktop minus taskbar

## Interaction

### Moving Windows
1. Click and hold titlebar (not buttons)
2. Drag to new position
3. Release to place
4. Window cannot move titlebar above y=0

### Resizing Windows
1. Hover edge or corner → Cursor changes
2. Click and drag resize handle
3. Window resizes maintaining min constraints
4. Release to finish resize

### Focus Management
1. Click anywhere on window → Bring to front
2. Focus state changes:
   - Window becomes active
   - Titlebar color changes
   - Z-index updates
   - Previous active window becomes inactive

### Double-Click Titlebar
- If normal → Maximize
- If maximized → Restore to previous size/position

## Keyboard Shortcuts

```
Alt+F4 → Close window
Alt+Space → Open window menu
Alt+- → Open window menu
F11 → Toggle fullscreen (optional)
```

## Accessibility

### ARIA Attributes
```html
<div
  role="dialog"
  aria-labelledby="window-title"
  aria-modal="false"
  tabindex="-1"
>
```

### Screen Reader
- Announces as "Window" or "Dialog"
- Reads window title
- Announces when focused
- Announces when minimized/maximized

### Keyboard Navigation
- All controls within window are keyboard accessible
- Tab cycles through window controls
- Focus trapped in modal windows

## Usage Examples

### Basic Window
```html
<div class="win98-window" data-window-id="1">
  <div class="win98-titlebar">
    <span class="win98-titlebar__text">My Window</span>
    <div class="win98-titlebar__buttons">
      <button class="win98-titlebar__button" aria-label="Minimize">
        <span>_</span>
      </button>
      <button class="win98-titlebar__button" aria-label="Maximize">
        <span>□</span>
      </button>
      <button class="win98-titlebar__button" aria-label="Close">
        <span>×</span>
      </button>
    </div>
  </div>
  <div class="win98-window__content">
    Window content goes here
  </div>
</div>
```

### Window with Menubar
```html
<div class="win98-window">
  <div class="win98-titlebar">...</div>
  <div class="win98-menubar">
    <button class="win98-menubar__item">File</button>
    <button class="win98-menubar__item">Edit</button>
    <button class="win98-menubar__item">View</button>
    <button class="win98-menubar__item">Help</button>
  </div>
  <div class="win98-window__content">
    Content
  </div>
</div>
```

### Window with Status Bar
```html
<div class="win98-window">
  <div class="win98-titlebar">...</div>
  <div class="win98-window__content">
    Content
  </div>
  <div class="win98-statusbar">
    <span>Ready</span>
  </div>
</div>
```

## CSS Implementation

```scss
.win98-window {
  position: absolute;
  display: flex;
  flex-direction: column;
  
  min-width: 112px;
  min-height: 27px;
  
  background: var(--window-bg);
  
  border-top: 1px solid var(--window-border-light);
  border-left: 1px solid var(--window-border-light);
  border-right: 1px solid var(--window-border-dark-shadow);
  border-bottom: 1px solid var(--window-border-dark-shadow);
  
  box-shadow:
    inset 1px 1px 0 var(--window-border-light),
    inset -1px -1px 0 var(--window-border-dark),
    2px 2px 0 rgba(0, 0, 0, 0.2);
  
  &--inactive {
    border: 1px solid var(--window-inactive-border);
    opacity: 0.9;
    
    .win98-titlebar {
      background: #808080;
      color: #C0C0C0;
    }
  }
  
  &--maximized {
    top: 0 !important;
    left: 0 !important;
    width: 100vw !important;
    height: calc(100vh - 28px) !important; // Minus taskbar
    
    .win98-resize-handle {
      display: none;
    }
  }
  
  &__content {
    flex: 1;
    overflow: auto;
    padding: 2px;
  }
}
```

## Animation Rules

**NO ANIMATIONS** - Windows 98 had instant state changes:
- Position changes: Instant
- Resize: Instant (live during drag)
- Minimize: Instant disappear
- Maximize: Instant resize
- Focus changes: Instant

## Testing Requirements

### Visual Tests
- Verify 3px border structure
- Verify min width/height enforced
- Verify active/inactive appearance
- Verify maximized fills desktop
- Verify cascade positioning
- Verify both theme colors

### Interaction Tests
- Click brings window to front
- Drag titlebar moves window
- Resize handles work
- Double-click titlebar maximizes
- Minimize button hides window
- Close button closes window
- Cannot move titlebar above y=0

### Z-Index Tests
- Focused window has highest z-index
- Clicking window updates z-index
- Multiple windows stack correctly

### Accessibility Tests
- Screen reader announces window
- Keyboard navigation works
- ARIA attributes present
- Focus management correct

## Notes

- Minimum size must be enforced at all times
- Border is exactly 3px thick with specific layer structure
- Z-index management is critical for proper stacking
- Position constraints prevent losing windows off-screen
- No animations or transitions
- Inactive windows have gray titlebar
- Maximized windows hide resize handles
- Cascade algorithm ensures windows don't overlap completely
