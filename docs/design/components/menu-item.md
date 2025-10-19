---
id: menu-item
title: Menu Item
---

# Menu Item Component

## Overview

Menu items appear in the Start Menu, submenus, and context menus. They consist of an optional icon, text label, and optional submenu arrow or keyboard shortcut.

## Visual Specifications

### Dimensions

```
Height: 22px
Min width: 150px (menu dependent)
Padding: 2px 4px
Icon size: 16x16px (if present)
Icon margin-right: 4px
Arrow margin-left: Auto (right-aligned)
```

### Colors

#### Light Theme

```css
--menu-item-bg: #C0C0C0            /* Normal background */
--menu-item-text: #000000          /* Normal text */
--menu-item-hover-bg: #000080      /* Hover background (navy blue) */
--menu-item-hover-text: #FFFFFF    /* Hover text (white) */
--menu-item-disabled-text: #808080 /* Disabled text */
--menu-item-disabled-shadow: #FFFFFF /* Disabled text shadow */
```

#### Dark Theme

```css
--menu-item-bg: #1A1A2E            /* Normal background */
--menu-item-text: #FFFFFF          /* Normal text */
--menu-item-hover-bg: #000080      /* Hover background (same navy) */
--menu-item-hover-text: #FFFFFF    /* Hover text (white) */
--menu-item-disabled-text: #404050 /* Disabled text */
--menu-item-disabled-shadow: #1A1A2E /* Disabled text shadow */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400 (normal), 700 (bold for headers)
Font smoothing: none
Text rendering: optimizeSpeed
```

## Menu Item Structure

```
┌──────────────────────────────┐
│ [icon] Item Text         ►   │
└──────────────────────────────┘
   ↑       ↑                ↑
 Icon    Label          Submenu
(opt)                   Arrow
                       (opt)
```

### Components

1. **Icon** (optional, 16x16px)
   - Left-aligned
   - 4px margin-right
   - Pixelated rendering

2. **Text Label**
   - Flex: 1 (takes available space)
   - Left-aligned (or left-aligned after icon)
   - Truncates with ellipsis if too long

3. **Keyboard Shortcut** (optional, right-aligned)
   - Gray text
   - Example: "Ctrl+C"
   - Right-aligned before arrow

4. **Submenu Arrow** (optional, right-aligned)
   - "►" character
   - Indicates item has submenu
   - Right-most position

## Menu Item Types

### Standard Item
- Icon + text
- Executes action on click
- Closes menu after action

### Submenu Item
- Icon + text + arrow (►)
- Opens submenu on hover or click
- Does not close menu

### Separator
- Horizontal line
- 1px height
- Inset appearance
- Not clickable
- No hover effect

### Header Item
- Bold text
- No icon
- Not clickable
- Used for section labels

### Disabled Item
- Icon + text (grayed out)
- Not clickable
- No hover effect
- Embossed text shadow

## States

### Normal
- Transparent background
- Black text (light) or white text (dark)
- Icon at full opacity

### Hover
- Navy blue background (#000080)
- White text
- Icon remains same
- Entire row highlighted

### Disabled
- Gray text
- Icon at 50% opacity
- Embossed text shadow (1px 1px white)
- No hover effect
- Cursor: default

### Pressed
- Same as hover (Windows 98 had no separate pressed state for menu items)

## Behavior

### Hover
- Mouse enters item → Highlight with navy blue
- Mouse leaves item → Return to normal
- If item has submenu → Open submenu after 200ms delay

### Click
**Standard item:**
1. Execute action
2. Close entire menu hierarchy
3. No visual feedback beyond hover

**Submenu item:**
1. Open submenu immediately
2. Keep menu open
3. Highlight remains on item

### Keyboard Navigation
- Arrow Down → Next item (skip separators/headers)
- Arrow Up → Previous item (skip separators/headers)
- Arrow Right → Open submenu (if has submenu)
- Arrow Left → Close submenu (if in submenu)
- Enter → Execute item
- First letter → Jump to first item starting with that letter

### Submenu Opening
- Hover 200ms → Open submenu
- Click → Open immediately
- Arrow Right → Open immediately
- Only one submenu open at a time per menu level

## Accessibility

### ARIA Attributes

**Standard item:**
```html
<button
  class="win98-menu-item"
  role="menuitem"
  tabindex="-1"
>
```

**Submenu item:**
```html
<button
  class="win98-menu-item"
  role="menuitem"
  aria-haspopup="true"
  aria-expanded="false"
  tabindex="-1"
>
```

**Disabled item:**
```html
<button
  class="win98-menu-item"
  role="menuitem"
  aria-disabled="true"
  tabindex="-1"
>
```

### Screen Reader
- Announces item text
- Announces "has submenu" for submenu items
- Announces keyboard shortcut
- Announces "disabled" for disabled items
- Does not announce separators (skips them)

## Usage Examples

### Standard Menu Item
```html
<button class="win98-menu-item" role="menuitem">
  <img src="/icons/notepad.png" alt="" width="16" height="16">
  <span class="win98-menu-item__text">Notepad</span>
</button>
```

### Menu Item with Submenu
```html
<button 
  class="win98-menu-item" 
  role="menuitem" 
  aria-haspopup="true"
  aria-expanded="false"
>
  <img src="/icons/folder.png" alt="" width="16" height="16">
  <span class="win98-menu-item__text">Programs</span>
  <span class="win98-menu-item__arrow">►</span>
</button>
```

### Menu Item with Keyboard Shortcut
```html
<button class="win98-menu-item" role="menuitem">
  <img src="/icons/copy.png" alt="" width="16" height="16">
  <span class="win98-menu-item__text">Copy</span>
  <span class="win98-menu-item__shortcut">Ctrl+C</span>
</button>
```

### Disabled Menu Item
```html
<button 
  class="win98-menu-item win98-menu-item--disabled" 
  role="menuitem"
  aria-disabled="true"
  disabled
>
  <img src="/icons/paste.png" alt="" width="16" height="16">
  <span class="win98-menu-item__text">Paste</span>
</button>
```

### Separator
```html
<div class="win98-menu-separator" role="separator"></div>
```

### Header Item
```html
<div class="win98-menu-item win98-menu-item--header" role="presentation">
  <span class="win98-menu-item__text">Recent Documents</span>
</div>
```

## CSS Implementation

```scss
.win98-menu-item {
  display: flex;
  align-items: center;
  gap: 4px;
  
  min-width: 150px;
  height: 22px;
  padding: 2px 4px;
  
  background: var(--menu-item-bg);
  color: var(--menu-item-text);
  border: none;
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  text-align: left;
  
  cursor: default;
  user-select: none;
  white-space: nowrap;
  
  img {
    flex-shrink: 0;
    width: 16px;
    height: 16px;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
  
  &__text {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  &__shortcut {
    margin-left: auto;
    color: #808080;
    font-size: 10px;
  }
  
  &__arrow {
    margin-left: auto;
    font-size: 10px;
  }
  
  // Hover state
  &:hover:not(&--disabled):not(&--header) {
    background: var(--menu-item-hover-bg);
    color: var(--menu-item-hover-text);
    
    .win98-menu-item__shortcut {
      color: var(--menu-item-hover-text);
    }
  }
  
  // Disabled state
  &--disabled {
    color: var(--menu-item-disabled-text);
    text-shadow: 1px 1px 0 var(--menu-item-disabled-shadow);
    cursor: default;
    
    img {
      opacity: 0.5;
    }
  }
  
  // Header state
  &--header {
    font-weight: 700;
    cursor: default;
  }
}

.win98-menu-separator {
  height: 1px;
  margin: 2px 4px;
  background: #808080;
  border-bottom: 1px solid #FFFFFF;
}
```

## Testing Requirements

### Visual Tests
- Verify height is 22px
- Verify icon is 16x16px
- Verify text truncates with ellipsis
- Verify arrow is right-aligned
- Verify keyboard shortcut is right-aligned
- Verify both theme colors
- Verify hover background is navy blue (#000080)
- Verify hover text is white

### Interaction Tests
- Hover highlights item
- Hover over submenu item opens submenu
- Click standard item executes action
- Click submenu item opens submenu
- Disabled items don't respond to hover/click
- Separators are not interactive

### Keyboard Tests
- Arrow keys navigate items
- Enter activates item
- Arrow right opens submenu
- First letter jumps to item
- Tab not used within menus

### Accessibility Tests
- Screen reader announces item text
- Screen reader announces submenu availability
- Screen reader announces shortcuts
- Screen reader skips separators
- ARIA attributes correct

## Notes

- Hover background is ALWAYS navy blue (#000080) in both themes
- Hover text is ALWAYS white in both themes
- These colors don't change between themes
- Icon size is always 16x16px
- Submenu arrow is "►" character
- Keyboard shortcuts right-aligned in gray
- Separators are 1px inset lines
- Disabled items have embossed text effect
- No pressed state visual (unlike buttons)
- Hover happens instantly (no delay)
- Submenu opening has 200ms hover delay
- Text truncates with ellipsis if too long
- Minimum width ensures readable menu items
