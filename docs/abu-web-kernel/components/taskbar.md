---
id: taskbar
title: Taskbar
---

# Taskbar Component

## Overview

The Taskbar is the horizontal bar at the bottom of the screen containing the Start button, task buttons for open windows, and the system tray. It is always visible and remains on top of all other elements.

## Visual Specifications

### Dimensions

```
Height: 28px
Width: 100vw (full viewport width)
Position: Fixed bottom
Z-index: 10000 (highest)
Border: 2px raised bevel on top only
```

### Colors

#### Light Theme

```css
--taskbar-bg: #C0C0C0              /* Gray background */
--taskbar-border-light: #FFFFFF    /* Top border highlight */
--taskbar-border-dark: #808080     /* Top border shadow */
--taskbar-text: #000000            /* Text color */
```

#### Dark Theme

```css
--taskbar-bg: #1A1A2E              /* Dark background */
--taskbar-border-light: #404050    /* Top border highlight */
--taskbar-border-dark: #0A0A15     /* Top border shadow */
--taskbar-text: #FFFFFF            /* Text color */
```

### Border Style

Top edge only (raised bevel):
```css
border-top: 2px solid var(--taskbar-border-light);
box-shadow: inset 0 1px 0 var(--taskbar-border-light);
```

## Taskbar Structure

```
┌───┬──────────────────────────────────────┬─────────────────┐
│ [S│ [Task 1] [Task 2] [Task 3] ...      │ 🔊 🌓 🕐 12:34 │
│ ta│                                      │                 │
│ rt│                                      │                 │
└───┴──────────────────────────────────────┴─────────────────┘
 ↑              ↑                                  ↑
Start        Task Buttons                    System Tray
Button       (flexible width)                 (fixed width)
```

### Sections (Left to Right)

1. **Start Button** (54px fixed width)
2. **Quick Launch** (optional, variable width)
3. **Task Buttons** (flexible width, shares space)
4. **System Tray** (variable width, auto-size based on content)

## Layout

```scss
.win98-taskbar {
  display: flex;
  flex-direction: row;
  gap: 2px;
  padding: 2px;
  
  [Start Button]  // Fixed 54px
  [Divider]       // 2px separator
  [Task Area]     // flex: 1 (takes remaining space)
  [Divider]       // 2px separator
  [System Tray]   // auto-width based on content
}
```

## Components

### Start Button
See `start-button.md` for detailed specs.
- Width: 54px
- Height: 22px (24px minus padding)
- Always visible
- Left-most position

### Task Button Area
- Flexible width (takes remaining space)
- Contains buttons for all open windows
- Buttons resize to fit available space
- Minimum button width: 100px
- Maximum button width: 200px
- Scrollable if too many windows (rare)

### System Tray
See `system-tray.md` for detailed specs.
- Right-most position
- Auto-width based on content
- Contains: Volume, Theme Toggle, Clock
- Typically 100-150px wide

### Dividers
- Vertical separator between sections
- 2px wide
- Inset appearance
- Height: 22px (full taskbar minus padding)

```css
.taskbar-divider {
  width: 2px;
  height: 22px;
  background: var(--taskbar-border-dark);
  border-right: 1px solid var(--taskbar-border-light);
}
```

## States

### Normal
- Always visible
- Fixed at bottom
- All sections functional

### Start Menu Open
- Start button appears pressed
- Start menu displayed above taskbar
- Other sections remain functional

## Behavior

### Always on Top
- Z-index 10000
- Covers all windows
- Cannot be obscured
- Cannot be moved or resized

### Window Maximization
- Maximized windows fill desktop minus taskbar
- Taskbar area is excluded (0 to viewport height - 28px)

### Task Button Management
- Button created when window opens
- Button removed when window closes
- Button highlighted when window active
- Button pressed appearance when window minimized
- Clicking button:
  - If window minimized → Restore and focus
  - If window focused → Minimize
  - If window unfocused → Focus and bring to front

### Overflow Handling
If too many task buttons:
1. Reduce button width to minimum (100px)
2. If still overflowing, show scroll buttons (rare)
3. Or combine similar windows (grouped taskbar - advanced)

## Accessibility

### ARIA Attributes
```html
<nav
  class="win98-taskbar"
  role="navigation"
  aria-label="Taskbar"
>
```

### Screen Reader
- Announces as "Taskbar"
- Announces number of open windows
- Announces time from clock

### Keyboard Navigation
- Windows key → Open Start menu
- Tab → Cycle through task buttons
- Alt+Tab → Switch between windows (via task buttons)
- Alt+Esc → Cycle windows

## Usage Examples

### Full Taskbar
```html
<nav class="win98-taskbar">
  <!-- Start button -->
  <button class="win98-start-button">
    <img src="/icons/windows-logo.png" alt="" width="16" height="16">
    <span>Start</span>
  </button>
  
  <!-- Divider -->
  <div class="win98-taskbar__divider"></div>
  
  <!-- Task button area -->
  <div class="win98-taskbar__tasks">
    <button class="win98-taskbar-button">
      <img src="/icons/notepad.png" alt="" width="16" height="16">
      <span>Notepad</span>
    </button>
    <button class="win98-taskbar-button win98-taskbar-button--active">
      <img src="/icons/ie.png" alt="" width="16" height="16">
      <span>Internet Explorer</span>
    </button>
  </div>
  
  <!-- Divider -->
  <div class="win98-taskbar__divider"></div>
  
  <!-- System tray -->
  <div class="win98-system-tray">
    <button class="win98-system-tray__icon" aria-label="Volume">
      <img src="/icons/volume.png" alt="" width="16" height="16">
    </button>
    <button class="win98-system-tray__icon" aria-label="Theme">
      <img src="/icons/theme.png" alt="" width="16" height="16">
    </button>
    <div class="win98-clock">12:34 PM</div>
  </div>
</nav>
```

## CSS Implementation

```scss
.win98-taskbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2px;
  
  height: 28px;
  padding: 2px;
  
  background: var(--taskbar-bg);
  border-top: 2px solid var(--taskbar-border-light);
  box-shadow: inset 0 1px 0 var(--taskbar-border-light);
  
  z-index: 10000;
  user-select: none;
  
  &__divider {
    width: 2px;
    height: 22px;
    background: var(--taskbar-border-dark);
    border-right: 1px solid var(--taskbar-border-light);
    flex-shrink: 0;
  }
  
  &__tasks {
    display: flex;
    flex-direction: row;
    gap: 2px;
    flex: 1;
    overflow-x: auto;
    overflow-y: hidden;
    
    // Hide scrollbar
    scrollbar-width: none;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
```

## Task Button Width Calculation

```javascript
// Calculate optimal button width
const availableWidth = taskArea.offsetWidth;
const buttonCount = openWindows.length;
const gap = 2; // px between buttons

let buttonWidth = (availableWidth - (gap * (buttonCount - 1))) / buttonCount;

// Constrain to min/max
buttonWidth = Math.max(100, Math.min(200, buttonWidth));
```

## Testing Requirements

### Visual Tests
- Verify taskbar is exactly 28px high
- Verify taskbar spans full viewport width
- Verify top border (raised bevel)
- Verify both theme colors
- Verify dividers appear between sections

### Layout Tests
- Start button is left-most (54px)
- Task area is flexible width
- System tray is right-most
- Sections aligned properly
- No gaps or overlaps

### Behavior Tests
- Taskbar always visible (z-index 10000)
- Task buttons created for open windows
- Task buttons removed when windows close
- Active window button highlighted
- Clicking task button focuses window
- Maximized windows don't cover taskbar

### Responsiveness Tests
- Taskbar adapts to viewport width
- Task buttons resize to fit
- Minimum button width enforced
- System tray content doesn't overflow

### Accessibility Tests
- Screen reader announces taskbar
- Keyboard navigation works
- Tab cycles through buttons
- ARIA attributes present

## Notes

- Taskbar is ALWAYS visible, fixed at bottom
- Height is exactly 28px (fixed)
- Z-index 10000 ensures it's always on top
- Task buttons share available space equally
- System tray width is auto-sized based on content
- Start button is always 54px wide
- Dividers are 2px wide with inset appearance
- No scrolling in taskbar itself (task area may scroll if needed)
- Colors change based on theme
- Top border is only border (bottom/sides have none)
