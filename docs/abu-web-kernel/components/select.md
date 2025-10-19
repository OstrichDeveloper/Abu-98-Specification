---
id: select
title: Select
---

# Select Component

## Overview

The Select (Dropdown) component provides single-item selection from a list. Features a button-like appearance with dropdown arrow.

## Visual Specifications

### Dimensions

```
Height: 21px
Min width: 75px
Padding: 2px 4px 2px 4px
Border width: 2px
Dropdown arrow width: 17px
```

### Colors

#### Light Theme

```css
--select-bg: #FFFFFF               /* Background */
--select-text: #000000             /* Text */
--select-border-light: #FFFFFF     /* Top/left raised border */
--select-border-dark: #808080      /* Bottom/right raised border */
--select-arrow-bg: #C0C0C0         /* Arrow button background */
--select-arrow-color: #000000      /* Arrow icon color */
--select-disabled-bg: #C0C0C0      /* Disabled background */
--select-disabled-text: #808080    /* Disabled text */
--select-dropdown-bg: #FFFFFF      /* Dropdown list background */
--select-dropdown-border: #000000  /* Dropdown list border */
--select-option-hover: #000080     /* Hovered option background */
--select-option-hover-text: #FFFFFF /* Hovered option text */
```

#### Dark Theme

```css
--select-bg: #FFFFFF               /* Background (always white) */
--select-text: #000000             /* Text (always black) */
--select-border-light: #404050     /* Top/left raised border */
--select-border-dark: #0A0A15      /* Bottom/right raised border */
--select-arrow-bg: #1A1A2E         /* Arrow button background */
--select-arrow-color: #FFFFFF      /* Arrow icon color */
--select-disabled-bg: #1A1A2E      /* Disabled background */
--select-disabled-text: #404050    /* Disabled text */
--select-dropdown-bg: #FFFFFF      /* Dropdown list background */
--select-dropdown-border: #000000  /* Dropdown list border */
--select-option-hover: #000080     /* Hovered option background */
--select-option-hover-text: #FFFFFF /* Hovered option text */
```

### Typography

```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px
Font weight: 400
Font smoothing: none
Text rendering: optimizeSpeed
```

### Component Structure

```
┌────────────────────┬───┐
│ Selected Value     │ ▼ │
└────────────────────┴───┘
```

Left side (value area):
- White background
- Black text
- Padding: 2px 4px

Right side (arrow button):
- Gray background (theme-dependent)
- Down arrow (▼)
- Width: 17px
- Inset border on left

### Border Styles

**Normal (Raised):**
```css
border-top: 2px solid var(--select-border-light);
border-left: 2px solid var(--select-border-light);
border-right: 2px solid var(--select-border-dark);
border-bottom: 2px solid var(--select-border-dark);
```

**Arrow Button Separator:**
```css
border-left: 2px solid var(--select-border-dark);
```

**Focused:**
```css
outline: 1px dotted var(--select-text);
outline-offset: -3px;
```

## Dropdown List

### Appearance

```
Position: Absolute, below select
Background: White
Border: 1px solid black
Shadow: 2px 2px 0 rgba(0,0,0,0.5)
Max height: 200px (scrollable if more options)
Z-index: 1000
```

### Option Items

```
Height: 20px
Padding: 2px 4px
Font: Same as select
Background: White (normal)
Background: Navy blue (hover/selected)
Text: Black (normal)
Text: White (hover/selected)
```

## States

### Normal
- White background
- Black text
- Raised border
- Gray arrow button
- Dropdown closed

### Open
- Same as normal
- Dropdown list visible below
- Arrow button appears pressed (inset)

### Focused
- Dotted outline inside border
- Same appearance otherwise

### Disabled
- Gray background
- Gray text
- Same borders
- Gray arrow
- Cannot open
- Cursor: `not-allowed`

## Behavior

### Opening Dropdown
- Click anywhere on select → Open dropdown
- Arrow down key → Open dropdown
- Space key → Open dropdown

### Selecting Option
- Click option → Select and close
- Arrow keys → Highlight option
- Enter → Select highlighted option and close
- First letter keys → Jump to option starting with letter

### Closing Dropdown
- Click option → Close
- Click outside → Close
- Escape key → Close without changing selection
- Tab key → Close and move focus to next element

### Keyboard Navigation
- `Tab` → Move focus to select
- `Shift+Tab` → Move focus away
- `Arrow Down` → Open dropdown or move to next option
- `Arrow Up` → Open dropdown or move to previous option
- `Enter` → Select highlighted option
- `Escape` → Close dropdown
- `Home` → Jump to first option
- `End` → Jump to last option
- Letters → Jump to option starting with letter

## Accessibility

### ARIA Attributes
```html
<div
  role="combobox"
  aria-expanded="false"
  aria-haspopup="listbox"
  aria-labelledby="label-id"
  aria-controls="listbox-id"
  tabindex="0"
>
```

### Dropdown List
```html
<ul
  role="listbox"
  aria-labelledby="label-id"
  id="listbox-id"
>
  <li role="option" aria-selected="false">Option 1</li>
  <li role="option" aria-selected="true">Option 2</li>
</ul>
```

### Screen Reader
- Announces as "Combo box" or "Dropdown"
- Reads current selection
- Announces "expanded" when open
- Announces "collapsed" when closed
- Reads option when highlighted

## Usage Examples

### Basic Select
```html
<div class="field">
  <label for="country">Country:</label>
  <select id="country" class="win98-select">
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
  </select>
</div>
```

### With Default Selection
```html
<select class="win98-select">
  <option value="">Choose an option...</option>
  <option value="1" selected>Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
</select>
```

### Disabled Select
```html
<select class="win98-select" disabled>
  <option value="1">Cannot change</option>
</select>
```

### With Optgroups
```html
<select class="win98-select">
  <optgroup label="North America">
    <option value="us">United States</option>
    <option value="ca">Canada</option>
  </optgroup>
  <optgroup label="Europe">
    <option value="uk">United Kingdom</option>
    <option value="de">Germany</option>
  </optgroup>
</select>
```

## CSS Implementation

```scss
.win98-select {
  display: inline-flex;
  align-items: center;
  height: 21px;
  min-width: 75px;
  position: relative;
  
  background: var(--select-bg);
  color: var(--select-text);
  
  border-top: 2px solid var(--select-border-light);
  border-left: 2px solid var(--select-border-light);
  border-right: 2px solid var(--select-border-dark);
  border-bottom: 2px solid var(--select-border-dark);
  
  font-family: 'MS Sans Serif', sans-serif;
  font-size: 11px;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  
  cursor: pointer;
  
  &__value {
    flex: 1;
    padding: 2px 4px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  &__arrow {
    width: 17px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--select-arrow-bg);
    border-left: 2px solid var(--select-border-dark);
    
    &::after {
      content: '▼';
      font-size: 8px;
      color: var(--select-arrow-color);
    }
  }
  
  &:focus {
    outline: 1px dotted var(--select-text);
    outline-offset: -3px;
  }
  
  &:disabled {
    background: var(--select-disabled-bg);
    color: var(--select-disabled-text);
    cursor: not-allowed;
    
    .win98-select__arrow {
      background: var(--select-disabled-bg);
      
      &::after {
        color: var(--select-disabled-text);
      }
    }
  }
}

.win98-select-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  
  background: var(--select-dropdown-bg);
  border: 1px solid var(--select-dropdown-border);
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 1000;
  
  &__option {
    height: 20px;
    padding: 2px 4px;
    cursor: pointer;
    
    &:hover,
    &--highlighted {
      background: var(--select-option-hover);
      color: var(--select-option-hover-text);
    }
    
    &--selected {
      font-weight: bold;
    }
  }
}
```

## Testing Requirements

### Visual Tests
- Verify select height is 21px
- Verify arrow button is 17px wide
- Verify white background for value area
- Verify dropdown appears below select
- Verify option highlighting
- Verify both theme colors

### Interaction Tests
- Click opens dropdown
- Click option selects it
- Arrow keys navigate options
- Enter selects option
- Escape closes without selection
- Click outside closes dropdown
- Disabled select doesn't open

### Accessibility Tests
- Screen reader announces correctly
- Keyboard navigation works
- ARIA attributes present
- Focus visible
- Options announced when highlighted

## Notes

- Value area background is white in both themes
- Value text is black in both themes
- Arrow button background changes based on theme
- Dropdown background is white in both themes
- Option hover color is consistent (navy blue)
- No hover effect on select itself
- No animations - dropdown appears instantly
- Arrow must be exactly 17px wide
- Options should have consistent 20px height
