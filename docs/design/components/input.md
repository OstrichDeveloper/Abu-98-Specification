---
id: input
title: Input
---

# Input Component

## Overview

The Input (TextInput) component provides text entry fields with the Windows 98 inset bevel appearance. Always has a white background in both themes for maximum readability.

## Visual Specifications

### Dimensions

```
Height: 21px
Padding: 2px 4px
Border width: 2px (all sides)
Min width: None (flexible)
```

### Colors

#### Light Theme

```css
--input-background: #FFFFFF         /* Always white */
--input-text: #000000               /* Always black */
--input-border-dark: #808080        /* Top/left border */
--input-border-darker: #000000      /* Inner top/left shadow */
--input-border-light: #FFFFFF       /* Bottom/right border */
--input-border-lighter: #C0C0C0     /* Inner bottom/right highlight */
--input-disabled-bg: #C0C0C0        /* Disabled background */
--input-disabled-text: #808080      /* Disabled text */
--input-selection-bg: #000080       /* Text selection background */
--input-selection-text: #FFFFFF     /* Text selection color */
```

#### Dark Theme

```css
--input-background: #FFFFFF         /* Always white (same) */
--input-text: #000000               /* Always black (same) */
--input-border-dark: #0A0A15        /* Top/left border */
--input-border-darker: #000000      /* Inner top/left shadow */
--input-border-light: #404050       /* Bottom/right border */
--input-border-lighter: #1A1A2E     /* Inner bottom/right highlight */
--input-disabled-bg: #1A1A2E        /* Disabled background */
--input-disabled-text: #404050      /* Disabled text */
--input-selection-bg: #000080       /* Text selection background */
--input-selection-text: #FFFFFF     /* Text selection color */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

### Border Styles

**Normal (Inset):**
```css
border-top: 1px solid var(--input-border-dark);
border-left: 1px solid var(--input-border-dark);
border-right: 1px solid var(--input-border-light);
border-bottom: 1px solid var(--input-border-light);
box-shadow: 
  inset 1px 1px 0 var(--input-border-darker),
  inset -1px -1px 0 var(--input-border-lighter);
```

**Focused:**
```css
outline: 1px dotted #000000;
outline-offset: -3px;
```

## Input Types

### Text Input (type="text")
- Single line text entry
- Standard appearance

### Password Input (type="password")
- Masked characters (●)
- Letter spacing: 2px (for readability)

### Number Input (type="number")
- Numeric only
- Optional spinner buttons (platform dependent)

### Search Input (type="search")
- Same as text input
- May include clear button (×) on right

### Email Input (type="email")
- Same as text input
- Validation on submit

### URL Input (type="url")
- Same as text input
- Validation on submit

### Tel Input (type="tel")
- Same as text input
- For telephone numbers

## States

### Normal
- White background
- Black text
- Inset border
- Cursor: text (I-beam)

### Focused
- Same as normal
- Dotted outline inside border
- Blinking text cursor visible

### Disabled
- Background: `--input-disabled-bg`
- Text color: `--input-disabled-text`
- Same inset border
- Cursor: `not-allowed`
- No interaction

### Read-only
- Same as normal
- No text cursor
- Cannot edit
- Can select text
- Cursor: `default`

### Invalid
- Red text color: `#FF0000`
- Or red border (implementation choice)
- Shown after validation fails

## Behavior

### Text Entry
- Click to focus
- Type to enter text
- Cursor shows insertion point
- Text scrolls horizontally if overflow

### Selection
- Click and drag to select
- Double-click selects word
- Triple-click selects all
- Selection color: `--input-selection-bg`
- Selected text color: `--input-selection-text`

### Keyboard Interaction
- `Tab` → Move focus to input
- `Shift+Tab` → Move focus away
- `Enter` → Submit form (if in form)
- `Escape` → Clear input (optional)
- `Ctrl+A` → Select all
- `Ctrl+C` → Copy
- `Ctrl+V` → Paste
- `Ctrl+X` → Cut

### Placeholder
- Light gray text: `#808080`
- Disappears when focused or has value
- Italic style (optional)

## Accessibility

### ARIA Attributes
```html
<input
  type="text"
  role="textbox"
  aria-label="Input label"
  aria-invalid="false"
  aria-disabled="false"
  aria-required="false"
>
```

### Screen Reader
- Announces as "Text field" or "Edit field"
- Reads label
- Announces required state
- Announces invalid state

### Labels
- Always associated with `<label>` element
- Label `for` attribute matches input `id`

## Usage Examples

### Basic Text Input
```html
<div class="field">
  <label for="username">Username:</label>
  <input type="text" id="username" class="win98-input">
</div>
```

### With Placeholder
```html
<input 
  type="text" 
  class="win98-input" 
  placeholder="Enter your name..."
>
```

### Password Input
```html
<div class="field">
  <label for="password">Password:</label>
  <input type="password" id="password" class="win98-input">
</div>
```

### Disabled Input
```html
<input 
  type="text" 
  class="win98-input" 
  value="Readonly value"
  disabled
>
```

### Read-only Input
```html
<input 
  type="text" 
  class="win98-input" 
  value="Cannot edit"
  readonly
>
```

### With Validation
```html
<input 
  type="email" 
  class="win98-input" 
  required
  aria-invalid="false"
>
```

## CSS Implementation

```scss
.win98-input {
  display: inline-block;
  height: 21px;
  padding: 2px 4px;
  
  background: var(--input-background);
  color: var(--input-text);
  
  border-top: 1px solid var(--input-border-dark);
  border-left: 1px solid var(--input-border-dark);
  border-right: 1px solid var(--input-border-light);
  border-bottom: 1px solid var(--input-border-light);
  box-shadow: 
    inset 1px 1px 0 var(--input-border-darker),
    inset -1px -1px 0 var(--input-border-lighter);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  font-weight: 400;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeSpeed;
  
  &:focus {
    outline: 1px dotted #000000;
    outline-offset: -3px;
  }
  
  &:disabled {
    background: var(--input-disabled-bg);
    color: var(--input-disabled-text);
    cursor: not-allowed;
  }
  
  &[readonly] {
    cursor: default;
  }
  
  &[type="password"] {
    letter-spacing: 2px;
  }
  
  &::placeholder {
    color: #808080;
    opacity: 1;
  }
  
  &::selection {
    background: var(--input-selection-bg);
    color: var(--input-selection-text);
  }
}
```

## Testing Requirements

### Visual Tests
- Verify white background in both themes
- Verify black text in both themes
- Verify inset border appearance
- Verify focus outline
- Verify disabled state
- Verify selection colors

### Interaction Tests
- Click focuses input
- Typing enters text
- Selection works
- Keyboard shortcuts work
- Tab navigation works
- Disabled input doesn't accept input

### Accessibility Tests
- Screen reader announces correctly
- Label association works
- Required/invalid states announced
- Keyboard navigation works

## Notes

- Input background is ALWAYS white for readability
- Input text is ALWAYS black for readability
- These do not change between themes
- Borders change color based on theme
- No hover effects
- No animations
- Selection colors are consistent across themes
