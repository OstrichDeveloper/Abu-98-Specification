---
id: taskbar-button
title: Taskbar Button
---

# Taskbar Button Component

## Overview

Taskbar buttons represent open windows and appear in the task button area of the taskbar. Each window gets one button that displays the window's icon and title.

## Visual Specifications

### Dimensions

```
Min width: 100px
Max width: 200px
Optimal width: (available space / number of windows)
Height: 22px (fits in 28px taskbar with 2px padding)
Padding: 2px 4px
Icon size: 16x16px
Gap between icon and text: 4px
Border: 2px (all sides)
```

### Colors

#### Light Theme

```css
--task-button-bg: #C0C0C0            /* Background */
--task-button-text: #000000          /* Text color */
--task-button-border-light: #FFFFFF  /* Top/left raised border */
--task-button-border-dark: #808080   /* Bottom/right raised border */
--task-button-dark-shadow: #000000   /* Pressed/active borders */
--task-button-active-inset: #C0C0C0  /* Active state inner border */
```

#### Dark Theme

```css
--task-button-bg: #1A1A2E            /* Background */
--task-button-text: #FFFFFF          /* Text color */
--task-button-border-light: #404050  /* Top/left raised border */
--task-button-border-dark: #0A0A15   /* Bottom/right raised border */
--task-button-dark-shadow: #000000   /* Pressed/active borders */
--task-button-active-inset: #1A1A2E  /* Active state inner border */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400 (normal)
Font smoothing: none
Text rendering: optimizeSpeed
Text overflow: ellipsis
```

### Border Styles

**Normal (Inactive Window):**
```css
border-top: 2px solid var(--task-button-border-light);
border-left: 2px solid var(--task-button-border-light);
border-right: 2px solid var(--task-button-border-dark);
border-bottom: 2px solid var(--task-button-border-dark);
```

**Active (Window Focused):**
```css
border: 2px solid var(--task-button-dark-shadow);
box-shadow: inset 1px 1px 0 var(--task-button-border-dark);
```

## Button Structure

```
┌─────────────────────┐
│ [icon] Window Title │
└─────────────────────┘
   ↑         ↑
  Icon   Title Text
```

### Icon
- Window's application icon
- 16x16px
- Left-aligned
- 2px from left edge
- Pixelated rendering

### Title Text
- Window's title
- Truncated with ellipsis if too long
- 4px gap after icon
- Vertically centered
- No wrapping

## States

### Inactive (Window Not Focused)
- Raised bevel border
- Normal background
- Regular text
- Represents unfocused window

### Active (Window Focused)
- Inset bevel border
- Same background
- Text and icon shifted 1px down and 1px right
- Represents currently focused window

### Hover
**No hover state** - Windows 98 did not have hover effects

### Pressed
- Same as active state
- Shown momentarily when clicked
- Transitions to active/inactive based on window state

## Behavior

### Click Behavior

**When window is minimized:**
1. Restore window
2. Focus window
3. Button shows active state

**When window is focused (active):**
1. Minimize window
2. Button shows inactive state

**When window is unfocused (inactive):**
1. Focus window
2. Bring window to front
3. Button shows active state

### Right-Click
Opens window menu (context menu):
- **Restore** (if minimized/maximized)
- **Move**
- **Size**
- **Minimize**
- **Maximize**
- **Close** (Alt+F4)

### Button Width Calculation

```javascript
const taskArea = document.querySelector('.win98-taskbar__tasks');
const buttonCount = openWindows.length;
const availableWidth = taskArea.offsetWidth;
const gap = 2; // px between buttons

let buttonWidth = (availableWidth - gap * (buttonCount - 1)) / buttonCount;

// Constrain to min/max
buttonWidth = Math.max(100, Math.min(200, Math.floor(buttonWidth)));
```

### Text Truncation
- If text doesn't fit, truncate with ellipsis (...)
- Always show at least first few characters
- Never wrap to multiple lines

## Accessibility

### ARIA Attributes
```html
<button
  class="win98-taskbar-button"
  aria-label="Notepad - Untitled"
  aria-pressed="false"
  data-window-id="123"
>
```

### Screen Reader
- Announces window title
- Announces "pressed" state (for active window)
- Announces when window state changes

### Keyboard
- Tab → Focus next task button
- Shift+Tab → Focus previous task button
- Space or Enter → Activate button (focus window)
- Alt+Tab → Cycle through task buttons

## Usage Examples

### Basic Task Button (Inactive)
```html
<button 
  class="win98-taskbar-button" 
  aria-label="Untitled - Notepad"
  aria-pressed="false"
  data-window-id="window-1"
>
  <img 
    src="/icons/notepad.png" 
    alt="" 
    width="16" 
    height="16"
    class="win98-taskbar-button__icon"
  >
  <span class="win98-taskbar-button__text">Untitled - Notepad</span>
</button>
```

### Active Task Button (Window Focused)
```html
<button 
  class="win98-taskbar-button win98-taskbar-button--active" 
  aria-label="Internet Explorer"
  aria-pressed="true"
  data-window-id="window-2"
>
  <img src="/icons/ie.png" alt="" width="16" height="16">
  <span>Internet Explorer</span>
</button>
```

### With Long Title (Truncated)
```html
<button 
  class="win98-taskbar-button" 
  style="width: 120px;"
>
  <img src="/icons/folder.png" alt="" width="16" height="16">
  <span>My Documents - Very Long Folder Name That Gets Truncated</span>
</button>
```

## CSS Implementation

```scss
.win98-taskbar-button {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  
  min-width: 100px;
  max-width: 200px;
  height: 22px;
  padding: 2px 4px;
  gap: 4px;
  
  background: var(--task-button-bg);
  color: var(--task-button-text);
  
  border-top: 2px solid var(--task-button-border-light);
  border-left: 2px solid var(--task-button-border-light);
  border-right: 2px solid var(--task-button-border-dark);
  border-bottom: 2px solid var(--task-button-border-dark);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: 400;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  
  cursor: pointer;
  user-select: none;
  
  &__icon {
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
    white-space: nowrap;
  }
  
  // Active state (window focused)
  &--active {
    border: 2px solid var(--task-button-dark-shadow);
    box-shadow: inset 1px 1px 0 var(--task-button-border-dark);
    
    .win98-taskbar-button__icon,
    .win98-taskbar-button__text {
      transform: translate(1px, 1px);
    }
  }
  
  // Temporary pressed state during click
  &:active:not(.win98-taskbar-button--active) {
    border: 2px solid var(--task-button-dark-shadow);
    box-shadow: inset 1px 1px 0 var(--task-button-border-dark);
    
    .win98-taskbar-button__icon,
    .win98-taskbar-button__text {
      transform: translate(1px, 1px);
    }
  }
}
```

## Button Grouping (Advanced - Optional)

Windows 98 did not have grouped taskbar buttons, but later versions did. If implementing:

```
┌─────────────────────────┐
│ [icon] Notepad (3)    ▼ │
└─────────────────────────┘
```

- Show count in parentheses
- Down arrow indicates submenu
- Click shows menu of all windows of that type

## Testing Requirements

### Visual Tests
- Verify size: min 100px, max 200px width, 22px height
- Verify icon is 16x16px
- Verify text truncates with ellipsis
- Verify raised border (inactive)
- Verify inset border (active)
- Verify content shift 1px when active
- Verify both theme colors

### Interaction Tests
- Click inactive button → Focus window, show active state
- Click active button → Minimize window, show inactive state
- Click minimized window button → Restore window
- Right-click opens window menu
- Button width adapts to available space

### State Tests
- Only one button can be active at a time
- Active button has inset border
- Inactive buttons have raised border
- State updates when window focus changes

### Responsiveness Tests
- Buttons resize to fit available space
- Min/max width constraints enforced
- Text truncates properly at all widths
- Buttons don't overlap

### Accessibility Tests
- Screen reader announces window title
- Screen reader announces pressed state
- Keyboard navigation works
- ARIA attributes correct

## Notes

- Button width is dynamic based on available space and number of windows
- Minimum width is 100px, maximum is 200px
- Only one button can be active (pressed) at a time
- Active state persists while window is focused
- Text ALWAYS truncates with ellipsis, never wraps
- Icon is always 16x16px from window's titlebar
- No hover effects in Windows 98
- Button appears when window opens, disappears when window closes
- Right-click menu is same as window's system menu
- Content (icon + text) shifts 1px when active
- Font weight is normal (400), unlike Start button which is bold
