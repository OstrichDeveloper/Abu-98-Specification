---
id: button
title: Button
---

# Button Component

## Overview

The Button component is the primary interactive control in Windows 98. It features the iconic raised bevel appearance with a 3D effect that inverts when pressed.

## Visual Specifications

### Dimensions

```
Min height: 23px
Min width: 75px
Padding: 0 8px
Border width: 2px (all sides)
```

### Colors

#### Light Theme

```css
--button-face: #C0C0C0           /* Background */
--button-highlight: #FFFFFF       /* Top/left border (raised) */
--button-shadow: #808080          /* Bottom/right border (raised) */
--button-dark-shadow: #000000     /* Pressed state borders */
--button-text: #000000            /* Label text */
--button-text-disabled: #808080   /* Disabled label */
```

#### Dark Theme

```css
--button-face: #1A1A2E           /* Background */
--button-highlight: #404050       /* Top/left border (raised) */
--button-shadow: #0A0A15          /* Bottom/right border (raised) */
--button-dark-shadow: #000000     /* Pressed state borders */
--button-text: #FFFFFF            /* Label text */
--button-text-disabled: #404050   /* Disabled label */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400 (normal), 700 (primary variant)
Font smoothing: none
Text rendering: optimizeSpeed
Text align: center
```

### Border Styles

**Normal (Raised):**
```css
border-top: 2px solid var(--button-highlight);
border-left: 2px solid var(--button-highlight);
border-right: 2px solid var(--button-shadow);
border-bottom: 2px solid var(--button-shadow);
```

**Pressed (Inset):**
```css
border-top: 2px solid var(--button-dark-shadow);
border-left: 2px solid var(--button-dark-shadow);
border-right: 2px solid var(--button-face);
border-bottom: 2px solid var(--button-face);
```

**Focused:**
```css
outline: 1px dotted var(--button-text);
outline-offset: -4px;
```

## States

### Normal
- Raised bevel borders
- Standard background color
- Black text (light theme) or white text (dark theme)

### Hover
**No visual change** - Windows 98 had no hover states

### Pressed
- Inverted borders (inset appearance)
- Text and content shifted 1px down and 1px right
- Background color unchanged

### Disabled
- Same borders as normal
- Text color: `--button-text-disabled`
- Text shadow: `1px 1px 0 var(--button-highlight)` (embossed effect)
- Cursor: `not-allowed`

### Focused
- Dotted outline inside button
- 4px from inner edge
- Color matches text color

## Variants

### Default Button
- Standard appearance
- Normal font weight

### Primary Button
- Bold font weight (700)
- Same visual appearance otherwise
- Used for default actions (OK, Yes, etc.)

### Icon Button
- Contains icon + text
- Icon: 16x16px
- Gap between icon and text: 4px
- Icon aligned left of text

## Behavior

### Click Interaction
1. User presses mouse button → Apply pressed state immediately
2. User releases mouse button → Return to normal state
3. If released while cursor over button → Fire click event
4. If released while cursor outside button → Cancel, no event

### Keyboard Interaction
- `Space` or `Enter` → Trigger click
- `Tab` → Move focus to button
- `Shift+Tab` → Move focus away from button

### Focus Management
- Gains focus on `Tab` navigation
- Gains focus on click
- Shows focus outline when focused
- Loses focus when another element focused

## Accessibility

### ARIA Attributes
```html
<button
  role="button"
  aria-label="Button label"
  aria-disabled="false"
  tabindex="0"
>
```

### Screen Reader
- Announces as "Button"
- Reads label text
- Announces disabled state if applicable

### Keyboard Navigation
- Fully keyboard accessible
- Standard button behavior
- Focus visible indicator

## Usage Examples

### HTML Structure
```html
<button class="win98-button">
  <span class="button-label">OK</span>
</button>
```

### With Icon
```html
<button class="win98-button">
  <span class="icon icon-system-computer"></span>
  <span class="button-label">My Computer</span>
</button>
```

### Primary Variant
```html
<button class="win98-button primary">
  <span class="button-label">OK</span>
</button>
```

### Disabled State
```html
<button class="win98-button" disabled>
  <span class="button-label">Unavailable</span>
</button>
```

## CSS Implementation

```scss
.win98-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 23px;
  min-width: 75px;
  padding: 0 8px;
  gap: 4px;
  
  background: var(--button-face);
  color: var(--button-text);
  
  border-top: 2px solid var(--button-highlight);
  border-left: 2px solid var(--button-highlight);
  border-right: 2px solid var(--button-shadow);
  border-bottom: 2px solid var(--button-shadow);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: 400;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  
  cursor: pointer;
  user-select: none;
  
  &:active:not(:disabled) {
    border-top: 2px solid var(--button-dark-shadow);
    border-left: 2px solid var(--button-dark-shadow);
    border-right: 2px solid var(--button-face);
    border-bottom: 2px solid var(--button-face);
    
    .button-label,
    .icon {
      transform: translate(1px, 1px);
    }
  }
  
  &:focus-visible {
    outline: 1px dotted var(--button-text);
    outline-offset: -4px;
  }
  
  &:disabled {
    color: var(--button-text-disabled);
    text-shadow: 1px 1px 0 var(--button-highlight);
    cursor: not-allowed;
  }
  
  &.primary {
    font-weight: 700;
  }
}
```

## Testing Requirements

### Visual Tests
- Verify correct border colors in both themes
- Verify pressed state inversion
- Verify disabled state appearance
- Verify focus outline
- Verify text shift on press

### Interaction Tests
- Click triggers event
- Space/Enter trigger event
- Tab navigation works
- Disabled button doesn't trigger events
- Press outside and release doesn't trigger

### Accessibility Tests
- Screen reader announces correctly
- Keyboard navigation works
- Focus visible
- ARIA attributes present

## Notes

- No hover state in Windows 98 - do not add hover effects
- No animations or transitions - state changes are instant
- Text must shift exactly 1px down and 1px right when pressed
- Border must be exactly 2px on all sides
- Minimum sizes are enforced for usability
