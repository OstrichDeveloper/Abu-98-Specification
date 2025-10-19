---
id: context-menu
title: Context Menu
---

# Context Menu Component

## Overview

Context menus (right-click menus) appear when the user right-clicks on items, windows, desktop, or other UI elements. They provide contextual actions relevant to the clicked element.

## Visual Specifications

### Dimensions

```
Min width: 150px
Max width: 300px
Width: Auto (based on longest menu item)
Max height: 400px (scrollable if needed)
Border: 2px raised bevel
Shadow: 2px 2px 0 rgba(0,0,0,0.5)
```

### Colors

#### Light Theme

```css
--context-menu-bg: #C0C0C0           /* Gray background */
--context-menu-border-light: #FFFFFF /* Top/left border */
--context-menu-border-dark: #808080  /* Bottom/right border */
```

#### Dark Theme

```css
--context-menu-bg: #1A1A2E           /* Dark background */
--context-menu-border-light: #404050 /* Top/left border */
--context-menu-border-dark: #0A0A15  /* Bottom/right border */
```

### Menu Items

See `menu-item.md` for detailed menu item specifications.

## Context Menu Structure

```
┌──────────────────────────┐
│ Open                     │
│ ► Open With              │
├──────────────────────────┤
│ Cut          Ctrl+X      │
│ Copy         Ctrl+C      │
│ Paste        Ctrl+V      │
├──────────────────────────┤
│ Delete                   │
│ Rename                   │
├──────────────────────────┤
│ Properties               │
└──────────────────────────┘
```

### Components

1. **Menu items** - See menu-item.md
2. **Separators** - Divide logical groups
3. **Submenus** - Cascade to the right

## Positioning

### Mouse Position
Context menu appears at mouse cursor position:
```javascript
menu.style.position = 'fixed';
menu.style.left = `${event.clientX}px`;
menu.style.top = `${event.clientY}px`;
```

### Screen Bounds Adjustment

If menu would extend off screen:
```javascript
const menuRect = menu.getBoundingClientRect();
const viewportWidth = window.innerWidth;
const viewportHeight = window.innerHeight;

// Adjust horizontal position
if (menuRect.right > viewportWidth) {
  menu.style.left = `${viewportWidth - menuRect.width}px`;
}

// Adjust vertical position
if (menuRect.bottom > viewportHeight) {
  menu.style.top = `${viewportHeight - menuRect.height}px`;
}
```

### Submenu Positioning

Submenus appear to the right:
```
Position: To right of parent menu
Offset: -4px overlap for seamless appearance
Flip: If would go off right edge, flip to left side
```

## Context Menu Types

### Desktop Context Menu
- **Arrange Icons** → (submenu)
  - by Name
  - by Type
  - by Size
  - by Date
- **Line up Icons**
- **Refresh**
- **Paste**
- **Paste Shortcut**
- **New** → (submenu)
- **Properties**

### File/Folder Context Menu
- **Open** → Activates the icon's primary action
- **Open With** → (submenu - currently opens with default action)
- **Cut** → Stores icon in clipboard for paste operations
- **Copy** → Stores icon in clipboard for paste operations
- **Create Shortcut** → Duplicates the icon as a shortcut
- **Delete** → Removes the icon with confirmation prompt
- **Rename** → Prompts for new display name
- **Properties** → Shows icon details and metadata

### Window Titlebar Context Menu
- **Restore**
- **Move**
- **Size**
- **Minimize**
- **Maximize**
- **Close** (Alt+F4)

### Text Selection Context Menu
- **Cut**
- **Copy**
- **Paste**
- **Delete**
- **Select All**

## States

### Open
- Menu visible at cursor position
- Z-index: 10000 (very high)
- Click outside closes menu

### Closed
- Menu hidden
- Removed from DOM (or display: none)

## Behavior

### Opening
1. User right-clicks element
2. Context menu appears at cursor
3. First item auto-highlighted (optional)
4. Focus moves to menu

### Navigation

**Mouse:**
- Hover over item → Highlight
- Hover over submenu item → Open submenu (200ms delay)
- Click item → Execute action, close menu

**Keyboard:**
- Arrow Down → Next item
- Arrow Up → Previous item
- Arrow Right → Open submenu
- Arrow Left → Close submenu
- Enter → Execute highlighted item
- First letter → Jump to item
- Escape → Close menu

### Closing
- Click outside menu → Close
- Click menu item (non-submenu) → Execute and close
- Escape → Close
- Left click anywhere → Close
- Opening another context menu → Close previous

### Submenu Behavior
- Hover delay: 200ms before opening
- Click opens immediately
- Only one submenu open at a time
- Submenu closes when hovering different item

## Z-Index Management

Context menus have very high z-index:
```
Context menu: z-index 10000
Submenu: z-index 10001
Nested submenu: z-index 10002
... (incrementing)
```

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-context-menu"
  role="menu"
  aria-orientation="vertical"
  tabindex="-1"
>
```

### Screen Reader
- Announces as "Context menu"
- Reads menu items
- Announces submenu availability
- Announces shortcuts

### Keyboard Access
- Full keyboard navigation
- Arrow keys navigate
- Enter activates
- Escape closes
- First letter jumps

## Usage Examples

### Basic Context Menu
```html
<div class="win98-context-menu" role="menu">
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/open.png" alt="" width="16" height="16">
    <span>Open</span>
  </button>
  
  <button class="win98-menu-item" role="menuitem" aria-haspopup="true">
    <img src="/icons/openwith.png" alt="" width="16" height="16">
    <span>Open With</span>
    <span class="win98-menu-item__arrow">►</span>
  </button>
  
  <div class="win98-menu-separator"></div>
  
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/cut.png" alt="" width="16" height="16">
    <span>Cut</span>
    <span class="win98-menu-item__shortcut">Ctrl+X</span>
  </button>
  
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/copy.png" alt="" width="16" height="16">
    <span>Copy</span>
    <span class="win98-menu-item__shortcut">Ctrl+C</span>
  </button>
  
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/paste.png" alt="" width="16" height="16">
    <span>Paste</span>
    <span class="win98-menu-item__shortcut">Ctrl+V</span>
  </button>
  
  <div class="win98-menu-separator"></div>
  
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/delete.png" alt="" width="16" height="16">
    <span>Delete</span>
  </button>
  
  <button class="win98-menu-item" role="menuitem">
    <span>Rename</span>
  </button>
  
  <div class="win98-menu-separator"></div>
  
  <button class="win98-menu-item" role="menuitem">
    <img src="/icons/properties.png" alt="" width="16" height="16">
    <span>Properties</span>
  </button>
</div>
```

## CSS Implementation

```scss
.win98-context-menu {
  position: fixed;
  min-width: 150px;
  max-width: 300px;
  max-height: 400px;
  
  display: flex;
  flex-direction: column;
  
  background: var(--context-menu-bg);
  
  border-top: 2px solid var(--context-menu-border-light);
  border-left: 2px solid var(--context-menu-border-light);
  border-right: 2px solid var(--context-menu-border-dark);
  border-bottom: 2px solid var(--context-menu-border-dark);
  
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 10000;
  
  overflow-y: auto;
  
  // Submenu
  .win98-context-menu {
    // Nested submenus
    z-index: 10001;
  }
}
```

## Right-Click Handler

```javascript
// Prevent default context menu
document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  
  // Determine what was right-clicked
  const target = event.target;
  
  // Show appropriate context menu
  if (target.classList.contains('desktop-icon')) {
    showIconContextMenu(event);
  } else if (target.classList.contains('win98-desktop')) {
    showDesktopContextMenu(event);
  } else if (target.classList.contains('win98-titlebar')) {
    showWindowContextMenu(event);
  }
});

function showDesktopContextMenu(event) {
  const menu = createContextMenu([
    { icon: '/icons/arrange.png', text: 'Arrange Icons', submenu: [...] },
    { separator: true },
    { icon: '/icons/refresh.png', text: 'Refresh' },
    { icon: '/icons/paste.png', text: 'Paste' },
    { separator: true },
    { icon: '/icons/properties.png', text: 'Properties' }
  ]);
  
  positionMenu(menu, event.clientX, event.clientY);
  document.body.appendChild(menu);
}
```

## Testing Requirements

### Visual Tests
- Verify raised bevel border
- Verify drop shadow
- Verify menu items styled correctly
- Verify both theme colors
- Verify separators visible

### Positioning Tests
- Menu appears at cursor position
- Menu adjusts if would go off screen
- Submenus appear to the right
- Submenus flip to left if needed
- Menu doesn't extend outside viewport

### Interaction Tests
- Right-click shows menu
- Hover highlights items
- Click item executes action
- Click outside closes menu
- Escape closes menu
- Submenu opens on hover/click

### Keyboard Tests
- Arrow keys navigate items
- Enter activates item
- Arrow right opens submenu
- Escape closes menu
- First letter jumps to item

### Accessibility Tests
- Screen reader announces menu
- Screen reader announces items
- Keyboard navigation works
- Focus visible
- ARIA attributes correct

## Notes

- Context menus appear at cursor position
- Automatically adjust to stay within viewport
- Very high z-index (10000+)
- Submenus cascade to right (or left if needed)
- Click outside always closes menu
- No animation - instant appearance
- Width auto-sizes based on content
- Menu items use navy blue hover in both themes
- Separators divide logical groups of actions
- Common shortcuts shown in gray text
- Context menu content varies based on what was right-clicked
