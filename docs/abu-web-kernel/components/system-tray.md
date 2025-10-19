---
id: system-tray
title: System Tray
---

# System Tray Component

## Overview

The System Tray (also called notification area) is located on the right side of the taskbar. It contains system icons (volume, theme toggle) and the clock.

## Visual Specifications

### Dimensions

```
Height: 22px (fills taskbar minus 2px padding on each side)
Width: Auto (based on content)
Typical width: 100-150px
Padding: 2px
Icon size: 16x16px
Icon spacing: 2px gap between items
Border: 2px inset on left side (divider from task buttons)
```

### Colors

#### Light Theme

```css
--tray-bg: #C0C0C0              /* Background (same as taskbar) */
--tray-icon-color: #000000      /* Icon color if using SVG */
--tray-text: #000000            /* Clock text */
--tray-border-dark: #808080     /* Divider shadow */
--tray-border-light: #FFFFFF    /* Divider highlight */
```

#### Dark Theme

```css
--tray-bg: #1A1A2E              /* Background (same as taskbar) */
--tray-icon-color: #FFFFFF      /* Icon color if using SVG */
--tray-text: #FFFFFF            /* Clock text */
--tray-border-dark: #0A0A15     /* Divider shadow */
--tray-border-light: #404050    /* Divider highlight */
```

### Typography (Clock)

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

## System Tray Structure

```
┌─────────────────────────┐
│ 🔊 🌓 │ 🕐 12:34 PM    │
│       │                 │
└───────┴─────────────────┘
  Icons   Divider  Clock
```

Left to right:
1. **System Icons** (variable number)
   - Volume control icon
   - Theme toggle icon
   - Other app icons (optional)
2. **Inset Divider** (2px)
3. **Clock** (time display)

## Components

### System Icons
- 16x16px each
- 2px gap between icons
- Clickable buttons
- Can trigger popups or actions

### Icon Divider
- 2px wide
- Inset appearance
- Separates icons from clock

### Clock
See `clock.md` for detailed specs.
- Shows current time
- Format: "12:34 PM" or "12:34" (24h)
- Clickable (may show calendar)
- Right-most element

## Icon Types

### Volume Control Icon
See `volume-control.md` for detailed specs.
- Speaker icon
- Click → Show volume slider popup
- Icon changes based on mute state

### Theme Toggle Icon
See `theme-toggle.md` for detailed specs.
- Sun/Moon icon (or light/dark bulb)
- Click → Toggle between light and dark theme
- Icon reflects current theme

### Application Icons (Optional)
- Apps can add icons to system tray
- Examples: Antivirus, network, updates
- Typically 16x16px
- Can have notification indicators (red dot, etc.)

## States

### Normal
- Icons visible
- Clock showing current time
- All interactive

### Icon Hover
**No hover state** - Windows 98 did not have icon hover effects

### Icon Pressed
- Icon may show pressed state (inset)
- Depends on implementation

## Behavior

### Icon Clicks
**Single Click:**
- Opens associated popup/window
- Example: Volume icon → Volume slider
- Example: Theme icon → Toggle theme

**Right Click:**
- Opens context menu for that icon
- Menu items depend on icon type

### Icon Popups
Popup windows appear:
- Above taskbar
- Aligned to icon that triggered it
- Z-index: 9999 (below taskbar, above windows)
- Click outside → Close popup

### Clock Click
- Single click → No action (default)
- Double click → Open Date/Time properties (optional)
- Right click → Adjust Date/Time menu item

### Auto-Hide Icons (Advanced - Optional)
If too many icons:
- Show chevron (`<<`) to hide overflow
- Click chevron → Show hidden icons
- Windows 98 didn't have this, but modern implementations might

## Layout

```scss
.win98-system-tray {
  display: flex;
  align-items: center;
  gap: 2px;
  
  [Volume Icon]   // 16x16px + 2px padding = 20px
  [Theme Icon]    // 16x16px + 2px padding = 20px
  [Divider]       // 2px
  [Clock]         // ~60-70px (auto-width)
}
```

## Accessibility

### ARIA Attributes
```html
<div
  class="win98-system-tray"
  role="group"
  aria-label="System tray">
  <!-- Icons and clock go here -->
</div>
```

### Screen Reader
- Announces as "System tray"
- Announces each icon's purpose
- Announces current time from clock

### Keyboard Navigation
- Tab → Focus next tray icon
- Shift+Tab → Focus previous tray icon
- Space or Enter → Activate focused icon
- Escape → Close popup

## Usage Examples

### Full System Tray
```html
<div class="win98-system-tray">
  <!-- Volume icon -->
  <button 
    class="win98-system-tray__icon" 
    aria-label="Volume"
    aria-haspopup="dialog"
  >
    <img src="/icons/volume.png" alt="" width="16" height="16">
  </button>
  
  <!-- Theme toggle icon -->
  <button 
    class="win98-system-tray__icon" 
    aria-label="Theme"
  >
    <img src="/icons/theme-light.png" alt="" width="16" height="16">
  </button>
  
  <!-- Divider -->
  <div class="win98-system-tray__divider"></div>
  
  <!-- Clock -->
  <div class="win98-clock">
    12:34 PM
  </div>
</div>
```

### With Additional App Icons
```html
<div class="win98-system-tray">
  <button class="win98-system-tray__icon" aria-label="Volume">
    <img src="/icons/volume.png" alt="" width="16" height="16">
  </button>
  
  <button class="win98-system-tray__icon" aria-label="Network">
    <img src="/icons/network.png" alt="" width="16" height="16">
  </button>
  
  <button class="win98-system-tray__icon" aria-label="Theme">
    <img src="/icons/theme.png" alt="" width="16" height="16">
  </button>
  
  <div class="win98-system-tray__divider"></div>
  
  <div class="win98-clock">3:45 PM</div>
</div>
```

## CSS Implementation

```scss
.win98-system-tray {
  display: flex;
  align-items: center;
  gap: 2px;
  height: 22px;
  padding: 0 2px;
  
  background: var(--tray-bg);
  
  &__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    padding: 2px;
    
    background: transparent;
    border: none;
    cursor: pointer;
    
    img {
      display: block;
      width: 16px;
      height: 16px;
      image-rendering: pixelated;
      image-rendering: -moz-crisp-edges;
      image-rendering: crisp-edges;
    }
    
    // Optional: Pressed state
    &:active {
      position: relative;
      top: 1px;
      left: 1px;
    }
  }
  
  &__divider {
    width: 2px;
    height: 18px;
    margin: 0 2px;
    
    background: var(--tray-border-dark);
    border-right: 1px solid var(--tray-border-light);
  }
}
```

## Icon Popup Positioning

```javascript
// Position popup above icon
const icon = event.currentTarget;
const iconRect = icon.getBoundingClientRect();

popup.style.position = 'fixed';
popup.style.bottom = '28px'; // Taskbar height
popup.style.right = `${window.innerWidth - iconRect.right}px`;
popup.style.zIndex = '9999';
```

## Testing Requirements

### Visual Tests
- Verify icons are 16x16px
- Verify 2px gap between elements
- Verify divider is 2px wide with inset appearance
- Verify clock format correct
- Verify both theme colors

### Layout Tests
- Icons aligned properly
- Divider separates icons from clock
- Clock is right-most element
- System tray width auto-sizes based on content

### Interaction Tests
- Click volume icon → Opens volume slider
- Click theme icon → Toggles theme
- Click clock → (Optional) Opens date/time dialog
- Right-click icons → Opens context menus
- Popups positioned correctly above icons

### Accessibility Tests
- Screen reader announces system tray
- Screen reader announces each icon
- Screen reader announces time
- Keyboard navigation works
- Tab cycles through icons

## Notes

- System tray is right-most section of taskbar
- Width is auto-sized based on number of icons + clock
- Icons are always 16x16px
- Standard system tray has 2-3 icons plus clock
- Divider separates icons from clock (2px inset)
- No hover effects on icons in Windows 98
- Icons can trigger popups that appear above taskbar
- Clock is always visible and always right-most
- Background color matches taskbar
- Icons should have meaningful tooltips (on hover in modern implementations)
