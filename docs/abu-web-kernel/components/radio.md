---
id: radio
title: Radio
---

# Radio Button Component

## Overview

The Radio Button component provides mutually exclusive selection within a group. Features a circular button with a filled dot when selected.

## Visual Specifications

### Dimensions

```
Circle diameter: 13px
Border width: 2px
Inner dot diameter: 5px
Label gap: 4px (between circle and label)
```

### Colors

#### Light Theme

```css
--radio-bg: #FFFFFF             /* Circle background */
--radio-border-dark: #808080    /* Top/left border */
--radio-border-light: #FFFFFF   /* Bottom/right border */
--radio-dot: #000000            /* Selected dot color */
--radio-text: #000000           /* Label text */
--radio-disabled-bg: #C0C0C0    /* Disabled background */
--radio-disabled-text: #808080  /* Disabled label */
```

#### Dark Theme

```css
--radio-bg: #FFFFFF             /* Circle background (always white) */
--radio-border-dark: #0A0A15    /* Top/left border */
--radio-border-light: #404050   /* Bottom/right border */
--radio-dot: #000000            /* Selected dot color (always black) */
--radio-text: #FFFFFF           /* Label text */
--radio-disabled-bg: #1A1A2E    /* Disabled background */
--radio-disabled-text: #404050  /* Disabled label */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

### Circle Border

**Normal (Inset):**
```css
border-top: 2px solid var(--radio-border-dark);
border-left: 2px solid var(--radio-border-dark);
border-right: 2px solid var(--radio-border-light);
border-bottom: 2px solid var(--radio-border-light);
border-radius: 50%;
```

**Focused:**
```css
/* Dotted outline around entire radio + label */
outline: 1px dotted var(--radio-text);
outline-offset: 2px;
```

### Selection Dot

- Circular shape
- 5px diameter
- Centered in circle
- Black color
- Solid fill

## States

### Unselected
- White background
- Empty circle
- Inset border
- Label visible

### Selected
- White background
- Black dot visible in center
- Inset border
- Label visible

### Disabled Unselected
- Gray background
- No dot
- Inset border
- Gray label text with embossed shadow

### Disabled Selected
- Gray background
- Gray dot
- Inset border
- Gray label text with embossed shadow

### Focused
- Dotted outline around radio + label
- Same appearance otherwise

## Behavior

### Click Interaction
- Click anywhere on radio or label → Select this radio
- Automatically deselects other radios in same group
- Once selected, can only be deselected by selecting another radio in group

### Keyboard Interaction
- `Tab` → Move focus to first/current selected radio in group
- `Arrow Up/Down` → Select previous/next radio in group
- `Arrow Left/Right` → Select previous/next radio in group
- `Space` → Select focused radio (if not already selected)

### Radio Groups
- All radios with same `name` attribute form a group
- Only one radio in a group can be selected
- Groups must have at least one radio

### Change Event
- Fires when selection changes
- Provides selected value

## Accessibility

### ARIA Attributes
```html
<div
  role="radio"
  aria-checked="false"
  aria-disabled="false"
  aria-label="Radio label"
  tabindex="0"
>
```

### Screen Reader
- Announces as "Radio button"
- Reads label
- Announces "selected" or "not selected"
- Announces "disabled" if applicable
- Announces position in group (e.g., "1 of 3")

### Label Association
- Label should be clickable
- Both circle and label select radio

## Usage Examples

### Basic Radio Group
```html
<div class="radio-group">
  <label class="win98-radio">
    <input type="radio" name="option" value="1" class="win98-radio__input">
    <span class="win98-radio__circle">
      <span class="win98-radio__dot"></span>
    </span>
    <span class="win98-radio__label">Option 1</span>
  </label>
  
  <label class="win98-radio">
    <input type="radio" name="option" value="2" class="win98-radio__input">
    <span class="win98-radio__circle">
      <span class="win98-radio__dot"></span>
    </span>
    <span class="win98-radio__label">Option 2</span>
  </label>
  
  <label class="win98-radio">
    <input type="radio" name="option" value="3" class="win98-radio__input">
    <span class="win98-radio__circle">
      <span class="win98-radio__dot"></span>
    </span>
    <span class="win98-radio__label">Option 3</span>
  </label>
</div>
```

### Selected by Default
```html
<label class="win98-radio">
  <input type="radio" name="option" value="1" class="win98-radio__input" checked>
  <span class="win98-radio__circle">
    <span class="win98-radio__dot"></span>
  </span>
  <span class="win98-radio__label">Selected</span>
</label>
```

### Disabled Radio
```html
<label class="win98-radio">
  <input type="radio" name="option" value="1" class="win98-radio__input" disabled>
  <span class="win98-radio__circle">
    <span class="win98-radio__dot"></span>
  </span>
  <span class="win98-radio__label">Unavailable</span>
</label>
```

## CSS Implementation

```scss
.win98-radio {
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
  
  &__circle {
    display: inline-block;
    width: 13px;
    height: 13px;
    position: relative;
    flex-shrink: 0;
    border-radius: 50%;
    
    background: var(--radio-bg);
    border-top: 2px solid var(--radio-border-dark);
    border-left: 2px solid var(--radio-border-dark);
    border-right: 2px solid var(--radio-border-light);
    border-bottom: 2px solid var(--radio-border-light);
  }
  
  &__dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--radio-dot);
    display: none;
  }
  
  &__input:checked + &__circle &__dot {
    display: block;
  }
  
  &__label {
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--radio-text);
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
  }
  
  &__input:focus-visible ~ &__label,
  &:focus-within {
    outline: 1px dotted var(--radio-text);
    outline-offset: 2px;
  }
  
  &__input:disabled {
    ~ .win98-radio__circle {
      background: var(--radio-disabled-bg);
      
      .win98-radio__dot {
        background: var(--radio-disabled-text);
      }
    }
    
    ~ .win98-radio__label {
      color: var(--radio-disabled-text);
      text-shadow: 1px 1px 0 var(--radio-border-light);
    }
  }
  
  &__input:disabled ~ * {
    cursor: not-allowed;
  }
}

.radio-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
```

## Testing Requirements

### Visual Tests
- Verify circle is exactly 13px diameter
- Verify dot appears when selected (5px diameter)
- Verify inset border appearance
- Verify disabled state styling
- Verify focus outline
- Verify both theme colors

### Interaction Tests
- Click circle selects radio
- Click label selects radio
- Selecting radio deselects others in group
- Arrow keys navigate group
- Space selects radio
- Tab moves to next group
- Disabled radio doesn't select

### Accessibility Tests
- Screen reader announces state
- Screen reader announces position in group
- Label read correctly
- Keyboard navigation works
- ARIA attributes present
- Focus visible

## Notes

- Radio circle background is white in both themes
- Selection dot is always black
- Label text changes color based on theme
- No hover effects
- No animations - instant state changes
- Click target includes both circle and label
- Circle must be exactly 13px diameter
- Dot must be exactly 5px diameter, centered
- Cannot deselect a radio once group has selection (only select others)
