---
id: slider
title: Slider
---

# Slider Component

## Overview

The Slider component provides continuous value selection within a range. Features a track with a draggable thumb/handle.

## Visual Specifications

### Dimensions

```
Track width: 100% (flexible)
Track height: 4px
Thumb width: 11px
Thumb height: 21px
Total component height: 21px
```

### Colors

#### Light Theme

```css
--slider-track-bg: #C0C0C0         /* Track background */
--slider-track-border-dark: #808080 /* Track top/left */
--slider-track-border-light: #FFFFFF /* Track bottom/right */
--slider-thumb-bg: #C0C0C0         /* Thumb background */
--slider-thumb-border-light: #FFFFFF /* Thumb top/left */
--slider-thumb-border-dark: #808080 /* Thumb bottom/right */
--slider-thumb-dark-shadow: #000000 /* Thumb inner shadow */
--slider-disabled-bg: #C0C0C0      /* Disabled track */
--slider-disabled-thumb: #808080   /* Disabled thumb */
```

#### Dark Theme

```css
--slider-track-bg: #1A1A2E         /* Track background */
--slider-track-border-dark: #0A0A15 /* Track top/left */
--slider-track-border-light: #404050 /* Track bottom/right */
--slider-thumb-bg: #1A1A2E         /* Thumb background */
--slider-thumb-border-light: #404050 /* Thumb top/left */
--slider-thumb-border-dark: #0A0A15 /* Thumb bottom/right */
--slider-thumb-dark-shadow: #000000 /* Thumb inner shadow */
--slider-disabled-bg: #1A1A2E      /* Disabled track */
--slider-disabled-thumb: #404050   /* Disabled thumb */
```

### Track Border

**Inset appearance:**
```css
border-top: 1px solid var(--slider-track-border-dark);
border-left: 1px solid var(--slider-track-border-dark);
border-right: 1px solid var(--slider-track-border-light);
border-bottom: 1px solid var(--slider-track-border-light);
```

### Thumb Border

**Raised appearance:**
```css
border-top: 2px solid var(--slider-thumb-border-light);
border-left: 2px solid var(--slider-thumb-border-light);
border-right: 2px solid var(--slider-thumb-border-dark);
border-bottom: 2px solid var(--slider-thumb-border-dark);
```

**Focused:**
```css
outline: 1px dotted #000000;
outline-offset: 1px;
```

## Orientations

### Horizontal (Default)
```
Track: Width 100%, Height 4px
Thumb: Width 11px, Height 21px
Thumb moves left-right
```

### Vertical
```
Track: Width 4px, Height 100%
Thumb: Width 21px, Height 11px
Thumb moves up-down
```

## States

### Normal
- Track: Inset border, gray background
- Thumb: Raised border, positioned on track
- Cursor: `pointer` on thumb

### Dragging
- Thumb: Same appearance
- Cursor: `grabbing` or `pointer`
- Track: Same appearance

### Focused
- Dotted outline around thumb
- Same appearance otherwise

### Disabled
- Track: Gray background
- Thumb: Gray, cannot move
- Cursor: `not-allowed`

## Behavior

### Value Range
- Minimum value (default: 0)
- Maximum value (default: 100)
- Step increment (default: 1)
- Current value (position of thumb)

### Dragging
- Click and hold thumb → Start drag
- Move mouse → Update value
- Release mouse → End drag
- Value updates continuously during drag

### Click on Track
- Click track → Jump thumb to click position
- Updates value to clicked position

### Keyboard Interaction
- `Tab` → Focus slider
- `Arrow Left/Down` → Decrease value by step
- `Arrow Right/Up` → Increase value by step
- `Page Down` → Decrease value by 10% of range
- `Page Up` → Increase value by 10% of range
- `Home` → Jump to minimum value
- `End` → Jump to maximum value

### Value Calculation

```javascript
// Position to value
value = min + (position / trackWidth) * (max - min)

// Value to position
position = ((value - min) / (max - min)) * trackWidth
```

### Input Event
- Fires while dragging (continuous updates)
- Provides current value

### Change Event
- Fires when drag ends
- Fires when keyboard input completes
- Provides final value

## Accessibility

### ARIA Attributes
```html
<div
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow="50"
  aria-label="Slider label"
  aria-orientation="horizontal"
  tabindex="0"
>
```

### Screen Reader
- Announces as "Slider"
- Reads current value
- Reads min/max values
- Announces changes as value updates

## Usage Examples

### Basic Horizontal Slider
```html
<div class="field">
  <label for="volume">Volume:</label>
  <input 
    type="range" 
    id="volume" 
    class="win98-slider" 
    min="0" 
    max="100" 
    value="50"
  >
</div>
```

### With Value Display
```html
<div class="field">
  <label for="brightness">Brightness: <span id="value">75</span>%</label>
  <input 
    type="range" 
    id="brightness" 
    class="win98-slider" 
    min="0" 
    max="100" 
    value="75"
    oninput="document.getElementById('value').textContent = this.value"
  >
</div>
```

### Vertical Slider
```html
<input 
  type="range" 
  class="win98-slider win98-slider--vertical" 
  min="0" 
  max="100" 
  value="50"
  orient="vertical"
>
```

### With Steps
```html
<input 
  type="range" 
  class="win98-slider" 
  min="0" 
  max="100" 
  step="10" 
  value="50"
>
```

### Disabled Slider
```html
<input 
  type="range" 
  class="win98-slider" 
  min="0" 
  max="100" 
  value="50"
  disabled
>
```

## CSS Implementation

```scss
.win98-slider {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  
  width: 100%;
  height: 21px;
  background: transparent;
  cursor: pointer;
  
  // Track
  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    background: var(--slider-track-bg);
    border-top: 1px solid var(--slider-track-border-dark);
    border-left: 1px solid var(--slider-track-border-dark);
    border-right: 1px solid var(--slider-track-border-light);
    border-bottom: 1px solid var(--slider-track-border-light);
  }
  
  &::-moz-range-track {
    width: 100%;
    height: 4px;
    background: var(--slider-track-bg);
    border-top: 1px solid var(--slider-track-border-dark);
    border-left: 1px solid var(--slider-track-border-dark);
    border-right: 1px solid var(--slider-track-border-light);
    border-bottom: 1px solid var(--slider-track-border-light);
  }
  
  // Thumb
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 11px;
    height: 21px;
    margin-top: -9px;
    
    background: var(--slider-thumb-bg);
    border-top: 2px solid var(--slider-thumb-border-light);
    border-left: 2px solid var(--slider-thumb-border-light);
    border-right: 2px solid var(--slider-thumb-border-dark);
    border-bottom: 2px solid var(--slider-thumb-border-dark);
    
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 11px;
    height: 21px;
    border: none;
    
    background: var(--slider-thumb-bg);
    border-top: 2px solid var(--slider-thumb-border-light);
    border-left: 2px solid var(--slider-thumb-border-light);
    border-right: 2px solid var(--slider-thumb-border-dark);
    border-bottom: 2px solid var(--slider-thumb-border-dark);
    
    cursor: pointer;
  }
  
  // Focus
  &:focus {
    outline: none;
    
    &::-webkit-slider-thumb {
      outline: 1px dotted #000000;
      outline-offset: 1px;
    }
    
    &::-moz-range-thumb {
      outline: 1px dotted #000000;
      outline-offset: 1px;
    }
  }
  
  // Disabled
  &:disabled {
    cursor: not-allowed;
    
    &::-webkit-slider-track {
      background: var(--slider-disabled-bg);
    }
    
    &::-moz-range-track {
      background: var(--slider-disabled-bg);
    }
    
    &::-webkit-slider-thumb {
      background: var(--slider-disabled-thumb);
      cursor: not-allowed;
    }
    
    &::-moz-range-thumb {
      background: var(--slider-disabled-thumb);
      cursor: not-allowed;
    }
  }
}

// Vertical variant
.win98-slider--vertical {
  width: 21px;
  height: 100px;
  
  &::-webkit-slider-runnable-track {
    width: 4px;
    height: 100%;
  }
  
  &::-moz-range-track {
    width: 4px;
    height: 100%;
  }
  
  &::-webkit-slider-thumb {
    width: 21px;
    height: 11px;
    margin-left: -9px;
    margin-top: 0;
  }
  
  &::-moz-range-thumb {
    width: 21px;
    height: 11px;
  }
}
```

## Testing Requirements

### Visual Tests
- Verify track is 4px high (horizontal)
- Verify thumb is 11px wide, 21px high (horizontal)
- Verify inset track appearance
- Verify raised thumb appearance
- Verify focus outline
- Verify both theme colors
- Verify vertical orientation

### Interaction Tests
- Drag thumb updates value
- Click track moves thumb
- Arrow keys change value
- Page Up/Down changes value by larger increment
- Home/End jump to min/max
- Value stays within min/max range
- Disabled slider doesn't respond

### Accessibility Tests
- Screen reader announces value
- Keyboard navigation works
- ARIA attributes correct
- Value changes announced
- Focus visible

## Notes

- Track height is 4px for horizontal, width is 4px for vertical
- Thumb is always 11px in direction of movement
- Thumb is 21px perpendicular to movement
- No hover effects
- No animations - instant updates
- Value updates continuously while dragging
- Thumb cannot move outside track bounds
- Commonly used in: Volume controls, brightness, progress indicators
