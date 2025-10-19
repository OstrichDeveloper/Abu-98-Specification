---
id: menubar
title: Menubar
---

# Menu Bar Component

## Overview

The Menu Bar is the horizontal bar below the titlebar in Windows 98 applications, containing top-level menu labels like "File", "Edit", "View", and "Help". Clicking a label opens a dropdown menu.

## Visual Specifications

### Dimensions

```
Height: 18px
Width: 100% (fills window width)
Padding: 2px 0
Menu item padding: 2px 8px
Gap between items: 0
```

### Colors

#### Light Theme

```css
--menubar-bg: #C0C0C0              /* Gray background */
--menubar-text: #000000            /* Black text */
--menubar-hover-bg: #000080        /* Navy blue hover */
--menubar-hover-text: #FFFFFF      /* White hover text */
--menubar-active-bg: #000080       /* Navy blue active */
--menubar-active-text: #FFFFFF     /* White active text */
--menubar-disabled-text: #808080   /* Gray disabled text */
```

#### Dark Theme

```css
--menubar-bg: #1A1A2E              /* Dark background */
--menubar-text: #FFFFFF            /* White text */
--menubar-hover-bg: #000080        /* Navy blue hover (same) */
--menubar-hover-text: #FFFFFF      /* White hover text (same) */
--menubar-active-bg: #000080       /* Navy blue active (same) */
--menubar-active-text: #FFFFFF     /* White active text (same) */
--menubar-disabled-text: #404050   /* Gray disabled text */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

## Menu Bar Structure

```
┌─────────────────────────────────────┐
│ File  Edit  View  Help              │
└─────────────────────────────────────┘
   ↑     ↑     ↑     ↑
 Menu  Menu  Menu  Menu
 Items Items Items Items
```

Located directly below titlebar, above content area.

### Standard Menu Labels

**Common menus:**
- **File** - New, Open, Save, Save As, Close, Exit
- **Edit** - Undo, Redo, Cut, Copy, Paste, Select All
- **View** - Toolbar, Status Bar, Refresh
- **Tools** - Options, Settings, Preferences
- **Help** - Help Topics, About

## Menu Bar Item Structure

```
┌──────────┐
│   File   │
└──────────┘
```

Each menu bar item is a clickable text label with:
- Text label
- Underlined mnemonic character (e.g., **F**ile)
- Hover/active state
- Associated dropdown menu

## States

### Normal
- Transparent background
- Black text (light) or white text (dark)
- Underlined mnemonic (Alt+letter)

### Hover
- Navy blue background (#000080)
- White text
- Entire item highlighted

### Active (Menu Open)
- Navy blue background (#000080)
- White text
- Dropdown menu visible below
- Item stays highlighted while menu open

### Disabled
- Gray text
- No interaction
- No hover effect

### Focused
- Dotted outline around item
- Tab navigation support

## Behavior

### Opening Menus

**Mouse:**
1. Click menu item → Open dropdown
2. Click again → Close dropdown
3. Click different menu → Close current, open new
4. Hover over items (while menu open) → Switch menus

**Keyboard:**
1. Alt → Focus menu bar (first item)
2. Alt+Letter → Open menu directly (mnemonic)
3. Arrow Left/Right → Navigate menu items
4. Arrow Down → Open focused menu
5. Escape → Close menu, unfocus menu bar

### Menu Positioning

Dropdown appears:
```
Position: Below menu bar item
Left edge: Aligned to left edge of menu item
Top: Directly below menu bar (no gap)
Z-index: 1500 (above window content, below modals)
```

### Click-to-Open Behavior

**First Click:**
- Opens dropdown menu
- Item shows active state
- Other windows/content inert

**Subsequent Hover:**
- While any menu is open, hovering other items switches menu
- No click required

**Close Menu:**
- Click menu item again
- Click outside menu bar/dropdown
- Press Escape
- Select menu item (non-submenu)

### Keyboard Navigation

**Alt Key:**
- Activates menu bar
- Focus first item
- Shows underlines on mnemonics

**Arrow Keys (when menu bar focused):**
- Left/Right → Navigate menu items
- Down → Open dropdown
- Up → (Do nothing)

**Letter Keys:**
- Alt+F → Open File menu
- Alt+E → Open Edit menu
- Works even when menu bar not focused

**Escape:**
- Close dropdown
- Unfocus menu bar

**Tab:**
- Move focus away from menu bar (to content)

## Mnemonics (Underlined Letters)

Each menu item has one underlined letter:
- **F**ile
- **E**dit
- **V**iew
- **H**elp

**Visual:**
```css
text-decoration: underline;
text-decoration-skip-ink: none;
text-underline-offset: 1px;
```

**Activation:**
- Press Alt to show underlines
- Press Alt+Letter to activate

## Accessibility

### ARIA Attributes

**Menu Bar:**
```html
<div
  class="win98-menubar"
  role="menubar"
  aria-label="Application menu bar"
>
```

**Menu Item:**
```html
<button
  class="win98-menubar__item"
  role="menuitem"
  aria-haspopup="true"
  aria-expanded="false"
  aria-label="File menu"
>
  <span aria-hidden="true"><u>F</u>ile</span>
</button>
```

### Screen Reader
- Announces as "Menu bar"
- Reads menu item labels
- Announces "has popup" for dropdown menus
- Announces expanded/collapsed state

### Keyboard Access
- Full keyboard navigation
- Alt key activates
- Mnemonics work from anywhere
- Arrow keys navigate
- Escape closes

## Usage Examples

### Basic Menu Bar
```html
<div class="win98-menubar" role="menubar">
  <button class="win98-menubar__item" role="menuitem" aria-haspopup="true">
    <span><u>F</u>ile</span>
  </button>
  
  <button class="win98-menubar__item" role="menuitem" aria-haspopup="true">
    <span><u>E</u>dit</span>
  </button>
  
  <button class="win98-menubar__item" role="menuitem" aria-haspopup="true">
    <span><u>V</u>iew</span>
  </button>
  
  <button class="win98-menubar__item" role="menuitem" aria-haspopup="true">
    <span><u>H</u>elp</span>
  </button>
</div>
```

### With Active Menu
```html
<div class="win98-menubar" role="menubar">
  <button 
    class="win98-menubar__item win98-menubar__item--active" 
    role="menuitem" 
    aria-haspopup="true"
    aria-expanded="true"
  >
    <span><u>F</u>ile</span>
  </button>
  
  <!-- Dropdown menu appears below -->
  <div class="win98-context-menu" style="top: 18px; left: 0;">
    <!-- See context-menu.md for menu structure -->
  </div>
  
  <button class="win98-menubar__item" role="menuitem">
    <span><u>E</u>dit</span>
  </button>
  
  <button class="win98-menubar__item" role="menuitem">
    <span><u>V</u>iew</span>
  </button>
  
  <button class="win98-menubar__item" role="menuitem">
    <span><u>H</u>elp</span>
  </button>
</div>
```

### Disabled Menu Item
```html
<button 
  class="win98-menubar__item win98-menubar__item--disabled" 
  role="menuitem"
  aria-disabled="true"
  disabled
>
  <span><u>E</u>dit</span>
</button>
```

## CSS Implementation

```scss
.win98-menubar {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  
  height: 18px;
  width: 100%;
  padding: 2px 0;
  
  background: var(--menubar-bg);
  border-bottom: 1px solid var(--menubar-border-dark);
  
  position: relative;
  z-index: 10;
  
  &__item {
    display: inline-flex;
    align-items: center;
    padding: 2px 8px;
    
    background: transparent;
    color: var(--menubar-text);
    border: none;
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    font-weight: 400;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeSpeed;
    
    cursor: default;
    user-select: none;
    white-space: nowrap;
    
    u {
      text-decoration: underline;
      text-decoration-skip-ink: none;
      text-underline-offset: 1px;
    }
    
    // Hover state
    &:hover:not(&--disabled):not(&--active) {
      background: var(--menubar-hover-bg);
      color: var(--menubar-hover-text);
    }
    
    // Active state (menu open)
    &--active {
      background: var(--menubar-active-bg);
      color: var(--menubar-active-text);
    }
    
    // Disabled state
    &--disabled {
      color: var(--menubar-disabled-text);
      cursor: default;
    }
    
    // Focus state
    &:focus-visible {
      outline: 1px dotted var(--menubar-text);
      outline-offset: -3px;
    }
  }
}
```

## Menu Bar in Window

Menu bar appears between titlebar and content:

```
┌─────────────────────────────────────┐
│ Window Title                    [×] │ ← Titlebar
├─────────────────────────────────────┤
│ File  Edit  View  Help              │ ← Menu Bar
├─────────────────────────────────────┤
│                                     │
│     Window Content Area             │ ← Content
│                                     │
└─────────────────────────────────────┘
```

## Common Menu Structures

### File Menu
- New (Ctrl+N)
- Open... (Ctrl+O)
- Save (Ctrl+S)
- Save As...
- ────────────── (separator)
- Close
- ────────────── (separator)
- Exit (Alt+F4)

### Edit Menu
- Undo (Ctrl+Z)
- Redo (Ctrl+Y)
- ────────────── (separator)
- Cut (Ctrl+X)
- Copy (Ctrl+C)
- Paste (Ctrl+V)
- Delete (Del)
- ────────────── (separator)
- Select All (Ctrl+A)

### View Menu
- ☑ Toolbar
- ☑ Status Bar
- ────────────── (separator)
- Refresh (F5)

### Help Menu
- Help Topics (F1)
- ────────────── (separator)
- About [Application Name]

## Testing Requirements

### Visual Tests
- Verify height is 18px
- Verify text is 11px
- Verify hover background is navy blue (#000080)
- Verify hover text is white
- Verify mnemonics underlined
- Verify both theme colors

### Interaction Tests
- Click opens dropdown menu
- Click again closes menu
- Hover switches menus (when open)
- Click outside closes menu
- Alt activates menu bar
- Alt+Letter opens menu
- Arrow keys navigate

### Keyboard Tests
- Alt focuses menu bar
- Arrow Left/Right navigate items
- Arrow Down opens menu
- Escape closes menu
- Mnemonics work (Alt+F, etc.)

### Accessibility Tests
- Screen reader announces menu bar
- Screen reader announces items
- Screen reader announces expanded state
- Keyboard navigation works
- Focus visible

## Notes

- Menu bar is always 18px high (same as titlebar height)
- Hover/active background is ALWAYS navy blue (#000080) in both themes
- Hover/active text is ALWAYS white in both themes
- Mnemonics shown when Alt pressed
- No hover state until menu is opened (then hover switches menus)
- Dropdown menus use same styling as context menus
- Menu bar appears below titlebar, above content
- Optional component (not all windows have menu bars)
- Common in document-based applications (Notepad, WordPad, etc.)
- Less common in utility applications (Calculator, Paint has toolbar instead)
