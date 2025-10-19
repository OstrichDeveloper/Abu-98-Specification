---
id: checkbox
title: Checkbox
---

# Checkbox Component

## Overview

The Checkbox component provides binary (checked/unchecked) selection with the Windows 98 inset box and checkmark appearance.

## Visual Specifications

### Dimensions

```
Box size: 13x13px
Border width: 2px
Checkmark size: 9x9px (inside box)
Label gap: 4px (between box and label)
```

### Colors

#### Light Theme

```css
--checkbox-bg: #FFFFFF             /* Box background */
--checkbox-border-dark: #808080    /* Top/left border */
--checkbox-border-light: #FFFFFF   /* Bottom/right border */
--checkbox-checkmark: #000000      /* Checkmark color */
--checkbox-text: #000000           /* Label text */
--checkbox-disabled-bg: #C0C0C0    /* Disabled background */
--checkbox-disabled-text: #808080  /* Disabled label */
```

#### Dark Theme

```css
--checkbox-bg: #FFFFFF             /* Box background (always white) */
--checkbox-border-dark: #0A0A15    /* Top/left border */
--checkbox-border-light: #404050   /* Bottom/right border */
--checkbox-checkmark: #000000      /* Checkmark color (always black) */
--checkbox-text: #FFFFFF           /* Label text */
--checkbox-disabled-bg: #1A1A2E    /* Disabled background */
--checkbox-disabled-text: #404050  /* Disabled label */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

### Box Border

**Normal (Inset):**
```css
border-top: 2px solid var(--checkbox-border-dark);
border-left: 2px solid var(--checkbox-border-dark);
border-right: 2px solid var(--checkbox-border-light);
border-bottom: 2px solid var(--checkbox-border-light);
```

**Focused:**
```css
/* Dotted outline around entire checkbox + label */
outline: 1px dotted var(--checkbox-text);
outline-offset: 2px;
```

### Checkmark

The checkmark is a simple icon or SVG:
- Black color (`#000000`)
- 9x9px size
- Positioned centered in box
- Standard Windows 98 checkmark shape (✓)

## States

### Unchecked
- White background
- Empty box
- Inset border
- Label visible

### Checked
- White background
- Black checkmark visible
- Inset border
- Label visible

### Indeterminate (optional)
- White background
- Gray dash/square in center
- Used for "some children checked" state
- Rare in Windows 98

### Disabled Unchecked
- Gray background
- No checkmark
- Inset border
- Gray label text with embossed shadow

### Disabled Checked
- Gray background
- Gray checkmark
- Inset border
- Gray label text with embossed shadow

### Focused
- Dotted outline around checkbox + label
- Same appearance otherwise

## Behavior

### Click Interaction
- Click anywhere on checkbox or label → Toggle state
- Click box → Toggle
- Click label text → Toggle

### Keyboard Interaction
- `Space` → Toggle checked state
- `Tab` → Move focus to checkbox
- `Shift+Tab` → Move focus away

### Change Event
- Fires when state changes
- Provides new checked value (true/false)

## Accessibility

### ARIA Attributes
```html
<div
  role="checkbox"
  aria-checked="false"
  aria-disabled="false"
  aria-label="Checkbox label"
  tabindex="0"
>
```

### Screen Reader
- Announces as "Checkbox"
- Reads label
- Announces "checked" or "unchecked"
- Announces "disabled" if applicable

### Label Association
- Label should be clickable
- Both box and label toggle state

## Usage Examples

### Basic Checkbox
```html
<label class="win98-checkbox">
  <input type="checkbox" class="win98-checkbox__input">
  <span class="win98-checkbox__box"></span>
  <span class="win98-checkbox__label">Remember me</span>
</label>
```

### Checked by Default
```html
<label class="win98-checkbox">
  <input type="checkbox" class="win98-checkbox__input" checked>
  <span class="win98-checkbox__box">
    <span class="win98-checkbox__checkmark"></span>
  </span>
  <span class="win98-checkbox__label">Enabled</span>
</label>
```

### Disabled Checkbox
```html
<label class="win98-checkbox">
  <input type="checkbox" class="win98-checkbox__input" disabled>
  <span class="win98-checkbox__box"></span>
  <span class="win98-checkbox__label">Unavailable</span>
</label>
```

### Without Label
```html
<label class="win98-checkbox" aria-label="Accept terms">
  <input type="checkbox" class="win98-checkbox__input">
  <span class="win98-checkbox__box"></span>
</label>
```

## CSS Implementation

```scss
.win98-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  user-select: none;
  
  &__input {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
  
  &__box {
    display: inline-block;
    width: 13px;
    height: 13px;
    position: relative;
    flex-shrink: 0;
    
    background: var(--checkbox-bg);
    border-top: 2px solid var(--checkbox-border-dark);
    border-left: 2px solid var(--checkbox-border-dark);
    border-right: 2px solid var(--checkbox-border-light);
    border-bottom: 2px solid var(--checkbox-border-light);
  }
  
  &__checkmark {
    position: absolute;
    top: 0;
    left: 0;
    width: 9px;
    height: 9px;
    display: none;
    
    /* Checkmark icon/SVG */
    background-image: url('data:image/svg+xml,...');
    background-size: contain;
    background-repeat: no-repeat;
  }
  
  &__input:checked + &__box &__checkmark {
    display: block;
  }
  
  &__label {
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--checkbox-text);
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
  }
  
  &__input:focus-visible ~ &__label,
  &:focus-within {
    outline: 1px dotted var(--checkbox-text);
    outline-offset: 2px;
  }
  
  &__input:disabled {
    ~ .win98-checkbox__box {
      background: var(--checkbox-disabled-bg);
      
      .win98-checkbox__checkmark {
        opacity: 0.5;
      }
    }
    
    ~ .win98-checkbox__label {
      color: var(--checkbox-disabled-text);
      text-shadow: 1px 1px 0 var(--checkbox-border-light);
    }
  }
  
  &__input:disabled ~ * {
    cursor: not-allowed;
  }
}
```

## Testing Requirements

### Visual Tests
- Verify box size is exactly 13x13px
- Verify checkmark appears when checked
- Verify inset border appearance
- Verify disabled state styling
- Verify focus outline
- Verify both theme colors

### Interaction Tests
- Click box toggles state
- Click label toggles state
- Space key toggles state
- Tab navigation works
- Disabled checkbox doesn't toggle

### Accessibility Tests
- Screen reader announces state
- Label read correctly
- Keyboard navigation works
- ARIA attributes present
- Focus visible

## Notes

- Checkbox box background is white in both themes
- Checkmark is always black
- Label text changes color based on theme
- No hover effects
- No animations - instant state changes
- Click target includes both box and label
- Box size must be exactly 13x13px
