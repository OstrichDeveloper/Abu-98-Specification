---
id: start-menu
title: Start Menu
---

# Start Menu Component

## Overview

The Start Menu is the primary navigation menu in Windows 98, accessed via the Start button. It displays a hierarchical list of programs, settings, documents, and system functions.

## Visual Specifications

### Dimensions

```
Width: 200px (fixed)
Max height: 400px (or 80% of desktop height)
Position: Bottom-left, above taskbar
Z-index: 9999 (below taskbar, above windows)
Border: 2px raised bevel
Shadow: 2px 2px 0 rgba(0,0,0,0.5)
```

### Colors

#### Light Theme

```css
--start-menu-bg: #C0C0C0              /* Gray background */
--start-menu-sidebar-bg: #808080      /* Dark gray sidebar */
--start-menu-text: #000000            /* Black text */
--start-menu-border-light: #FFFFFF    /* Top/left border */
--start-menu-border-dark: #808080     /* Bottom/right border */
```

#### Dark Theme

```css
--start-menu-bg: #1A1A2E              /* Dark background */
--start-menu-sidebar-bg: #0A0A15      /* Darker sidebar */
--start-menu-text: #FFFFFF            /* White text */
--start-menu-border-light: #404050    /* Top/left border */
--start-menu-border-dark: #0A0A15     /* Bottom/right border */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400 (normal), 700 (bold for headers)
Font smoothing: none
Text rendering: optimizeSpeed
```

## Start Menu Structure

```
┌─┬──────────────────────────────┐
│ │ Windows 98                   │ ← Sidebar (vertical text)
│ ├──────────────────────────────┤
│W│ ► Programs                   │
│i│ ► Documents                  │
│n│ ► Settings                   │
│d│ ► Find                       │
│o│ ► Help                       │
│w│ ► Run...                     │
│s├──────────────────────────────┤
│ │ ⊗ Shut Down...               │
│9├──────────────────────────────┘
│8│
└─┘
```

### Sections

1. **Left Sidebar** (30px wide)
   - Vertical "Windows 98" text
   - Dark gray background
   - Decorative only

2. **Main Menu Area** (170px wide)
   - Menu items
   - Icons + text
   - Expandable submenus

3. **Separator** (1px)
   - Between main items and system items
   - Inset line

4. **System Actions** (bottom)
   - Log Off
   - Shut Down

## Menu Items

See `menu-item.md` for detailed specs.

### Standard Items

**Programs:**
- Arrow icon (►) on right
- Opens submenu of installed programs
- Most commonly used item

**Documents:**
- Recent documents list
- Arrow icon for submenu

**Settings:**
- Control Panel, Printers, Taskbar
- Arrow icon for submenu

**Find:**
- Search for files/folders/computer
- Arrow icon for submenu

**Help:**
- Opens help system
- No submenu

**Run...:**
- Opens Run dialog
- No submenu

**Shut Down...:**
- Opens shut down dialog
- Power icon
- Below separator

## Submenu Behavior

### Positioning

Submenus appear:
```
Position: To the right of parent menu
Offset: Aligned to top of parent item
Margin: -4px overlap (for seamless appearance)
Z-index: 10000 (above parent menu)
```

### Cascade

```
[Start Menu]
  Programs ────→ [Submenu]
                   Accessories ────→ [Sub-submenu]
                   Games                Notepad
                   Internet             Paint
                   Startup              Calculator
```

Multiple levels of submenus can cascade to the right.

## States

### Open
- Menu visible above taskbar
- Start button shows pressed state
- Click outside or Escape closes menu

### Closed
- Menu hidden
- Start button in normal state

## Behavior

### Opening Menu
1. Click Start button
2. Menu appears aligned to bottom-left
3. Start button shows pressed state
4. Focus moves to first menu item

### Navigation

**Mouse:**
- Hover over item → Highlight item
- Hover over item with arrow → Open submenu (delay ~200ms)
- Move to different item → Close previous submenu
- Click item → Execute action, close menu

**Keyboard:**
- Arrow Down → Next item
- Arrow Up → Previous item
- Arrow Right → Open submenu (if available)
- Arrow Left → Close submenu (go back to parent)
- Enter → Execute highlighted item
- First letter → Jump to item starting with that letter
- Escape → Close menu

### Submenu Timing
- Hover delay before opening: 200ms
- Immediate open on click
- Submenu stays open while mouse in menu area

### Closing Menu
- Click outside menu → Close all menus
- Click menu item (non-submenu) → Execute and close
- Escape → Close current submenu (or entire menu if at top level)
- Click Start button → Close menu

## Accessibility

### ARIA Attributes
```html
<nav
  class="win98-start-menu"
  role="menu"
  aria-label="Start menu"
  aria-orientation="vertical"
>
```

### Screen Reader
- Announces as "Start menu"
- Reads each menu item
- Announces "has submenu" for expandable items
- Announces separator

### Keyboard Navigation
- Full keyboard accessible
- Arrow keys navigate items
- Enter activates items
- Escape closes menu
- First letter jumps to items

## Usage Examples

### Full Start Menu
```html
<nav class="win98-start-menu" role="menu" aria-label="Start menu">
  <!-- Sidebar -->
  <div class="win98-start-menu__sidebar">
    <span class="win98-start-menu__sidebar-text">Windows 98</span>
  </div>
  
  <!-- Main menu -->
  <div class="win98-start-menu__main">
    <div class="win98-start-menu__items">
      <button class="win98-menu-item" role="menuitem" aria-haspopup="true">
        <img src="/icons/folder.png" alt="" width="16" height="16">
        <span>Programs</span>
        <span class="win98-menu-item__arrow">►</span>
      </button>
      
      <button class="win98-menu-item" role="menuitem" aria-haspopup="true">
        <img src="/icons/document.png" alt="" width="16" height="16">
        <span>Documents</span>
        <span class="win98-menu-item__arrow">►</span>
      </button>
      
      <button class="win98-menu-item" role="menuitem" aria-haspopup="true">
        <img src="/icons/settings.png" alt="" width="16" height="16">
        <span>Settings</span>
        <span class="win98-menu-item__arrow">►</span>
      </button>
      
      <button class="win98-menu-item" role="menuitem">
        <img src="/icons/run.png" alt="" width="16" height="16">
        <span>Run...</span>
      </button>
    </div>
    
    <!-- Separator -->
    <div class="win98-start-menu__separator"></div>
    
    <!-- System items -->
    <div class="win98-start-menu__items">
      <button class="win98-menu-item" role="menuitem">
        <img src="/icons/shutdown.png" alt="" width="16" height="16">
        <span>Shut Down...</span>
      </button>
    </div>
  </div>
</nav>
```

## CSS Implementation

```scss
.win98-start-menu {
  position: fixed;
  bottom: 28px; // Above taskbar
  left: 0;
  
  display: flex;
  width: 200px;
  max-height: 400px;
  
  background: var(--start-menu-bg);
  
  border-top: 2px solid var(--start-menu-border-light);
  border-left: 2px solid var(--start-menu-border-light);
  border-right: 2px solid var(--start-menu-border-dark);
  border-bottom: 2px solid var(--start-menu-border-dark);
  
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 9999;
  
  &__sidebar {
    width: 30px;
    background: var(--start-menu-sidebar-bg);
    
    display: flex;
    align-items: flex-end;
    padding: 4px;
  }
  
  &__sidebar-text {
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 18px;
    font-weight: 700;
    color: #FFFFFF;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    
    white-space: nowrap;
  }
  
  &__main {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  
  &__items {
    display: flex;
    flex-direction: column;
  }
  
  &__separator {
    height: 1px;
    margin: 2px 4px;
    background: var(--start-menu-border-dark);
    border-bottom: 1px solid var(--start-menu-border-light);
  }
}
```

## Positioning Logic

```javascript
function positionStartMenu() {
  const menu = document.querySelector('.win98-start-menu');
  const startButton = document.querySelector('.win98-start-button');
  
  menu.style.position = 'fixed';
  menu.style.bottom = '28px'; // Taskbar height
  menu.style.left = '0';
  
  // Adjust if menu would go off screen
  const menuHeight = menu.offsetHeight;
  const viewportHeight = window.innerHeight;
  
  if (menuHeight > viewportHeight - 28) {
    menu.style.maxHeight = `${viewportHeight - 28 - 10}px`;
  }
}
```

## Testing Requirements

### Visual Tests
- Verify width is 200px
- Verify sidebar is 30px wide
- Verify raised bevel border
- Verify drop shadow
- Verify sidebar has vertical text
- Verify both theme colors

### Layout Tests
- Menu appears at bottom-left
- Menu above taskbar (z-index 9999)
- Menu doesn't exceed desktop height
- Sidebar and main area aligned
- Separator appears between sections

### Interaction Tests
- Click Start button opens menu
- Click outside closes menu
- Escape closes menu
- Hover highlights items
- Hover on arrow item opens submenu
- Click item executes action and closes menu

### Keyboard Tests
- Arrow keys navigate items
- Enter activates item
- Arrow right opens submenu
- Arrow left closes submenu
- First letter jumps to item
- Escape closes menu

### Accessibility Tests
- Screen reader announces menu
- Screen reader announces items
- Screen reader announces submenus
- Keyboard navigation works
- Focus visible

## Notes

- Menu is exactly 200px wide (30px sidebar + 170px main)
- Sidebar has vertical "Windows 98" text
- Menu appears at bottom-left, aligned with Start button
- Submenus cascade to the right
- Max height prevents menu from extending off screen
- Hover delay before opening submenu is ~200ms
- No animations - menu appears/disappears instantly
- Separator is 1px inset line
- System items (Shut Down) below separator
- Z-index 9999 puts menu below taskbar but above windows
