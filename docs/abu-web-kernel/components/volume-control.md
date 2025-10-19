---
id: volume-control
title: Volume Control
---

# Volume Control Component

## Overview

The Volume Control is a system tray icon that opens a volume slider popup when clicked. It allows users to adjust system volume and mute/unmute audio.

## Icon Specifications

### Dimensions

```
Icon size: 16x16px
Button size: 20x20px (16px icon + 2px padding on each side)
Height: 20px (fits in 22px system tray)
```

### Colors

#### Light Theme

```css
--volume-icon-color: #000000    /* Icon color (if SVG) */
--volume-button-bg: transparent /* No background */
```

#### Dark Theme

```css
--volume-icon-color: #FFFFFF    /* Icon color (if SVG) */
--volume-button-bg: transparent /* No background */
```

## Icon States

### Normal Volume (Unmuted)
- Speaker icon with sound waves
- Black icon (light theme) or white icon (dark theme)
- Represents audio is playing

### Muted
- Speaker icon with red X or slash
- Indicates audio is muted
- Icon changes to show muted state

### Volume Levels (Optional)
Different icons for volume ranges:
- **High:** Speaker with 3 sound waves
- **Medium:** Speaker with 2 sound waves
- **Low:** Speaker with 1 sound wave
- **Muted:** Speaker with X

## Volume Slider Popup

### Popup Dimensions

```
Width: 40px
Height: 120px
Position: Above taskbar, aligned to volume icon
Border: 2px raised bevel
Shadow: 2px 2px 0 rgba(0,0,0,0.5)
Z-index: 9999
```

### Popup Colors

#### Light Theme

```css
--popup-bg: #C0C0C0               /* Gray background */
--popup-border-light: #FFFFFF     /* Top/left border */
--popup-border-dark: #808080      /* Bottom/right border */
--popup-text: #000000             /* Volume percentage text */
```

#### Dark Theme

```css
--popup-bg: #1A1A2E               /* Dark background */
--popup-border-light: #404050     /* Top/left border */
--popup-border-dark: #0A0A15      /* Bottom/right border */
--popup-text: #FFFFFF             /* Volume percentage text */
```

### Popup Structure

```
┌────────────┐
│    100%    │ ← Volume percentage
├────────────┤
│            │
│     ║      │ ← Vertical slider
│     ║      │
│     ║      │
│   ▓▓▓▓▓    │ ← Filled portion
│   ▓▓▓▓▓    │
│   ▓▓▓▓▓    │
├────────────┤
│   [🔊]     │ ← Mute button
└────────────┘
```

### Popup Components

1. **Volume Percentage** (top)
   - Shows current volume (0-100%)
   - Text: 11px, centered
   - Height: 20px

2. **Vertical Slider** (middle)
   - See `slider.md` for slider specs
   - Vertical orientation
   - Range: 0-100
   - Height: ~80px

3. **Mute Button** (bottom)
   - Toggle button
   - 16x16px icon
   - Height: 20px

## States

### Icon States

**Normal:**
- Speaker icon visible
- Cursor: pointer

**Hover:**
**No hover state** - Windows 98 did not have hover effects

**Pressed:**
- Icon shifts 1px down and 1px right (optional)
- Popup opens

### Popup States

**Open:**
- Popup visible above icon
- Slider interactive
- Click outside closes popup

**Closed:**
- Popup hidden
- Icon in normal state

## Behavior

### Icon Click
1. User clicks volume icon
2. Popup appears above icon
3. Slider shows current volume level
4. User can adjust volume or toggle mute

### Popup Positioning
```javascript
const iconRect = volumeIcon.getBoundingClientRect();

popup.style.position = 'fixed';
popup.style.bottom = '28px'; // Taskbar height
popup.style.right = `${window.innerWidth - iconRect.right}px`;
popup.style.zIndex = '9999';
```

### Slider Interaction
- Click on slider track → Jump to volume level
- Drag slider → Adjust volume continuously
- Arrow keys → Fine adjust (±1%)
- Scroll wheel → Adjust volume (optional)

### Mute Toggle
- Click mute button → Toggle mute state
- Icon updates to show muted/unmuted
- Volume level preserved when muted
- Unmuting restores previous volume

### Close Popup
- Click outside popup → Close
- Click volume icon again → Close
- Escape key → Close
- After period of inactivity → Close (optional, ~5 seconds)

## Accessibility

### Icon ARIA Attributes
```html
<button
  class="win98-system-tray__icon"
  aria-label="Volume control. Current volume 75%"
  aria-haspopup="dialog"
  aria-expanded="false"
>
```

### Popup ARIA Attributes
```html
<div
  class="win98-volume-popup"
  role="dialog"
  aria-label="Volume control"
  aria-modal="false"
>
```

### Screen Reader
- Announces current volume level
- Announces mute state
- Announces volume changes as slider moves

### Keyboard
- Tab → Focus slider or mute button
- Arrow Up/Down → Adjust volume
- Space → Toggle mute
- Escape → Close popup

## Usage Examples

### Volume Icon (Unmuted)
```html
<button 
  class="win98-system-tray__icon win98-volume-icon" 
  aria-label="Volume: 75%"
  aria-haspopup="dialog"
  aria-expanded="false"
>
  <img src="/icons/volume-high.png" alt="" width="16" height="16">
</button>
```

### Volume Icon (Muted)
```html
<button 
  class="win98-system-tray__icon win98-volume-icon" 
  aria-label="Volume: Muted"
  aria-expanded="false"
>
  <img src="/icons/volume-muted.png" alt="" width="16" height="16">
</button>
```

### Volume Popup
```html
<div class="win98-volume-popup" role="dialog" aria-label="Volume control">
  <!-- Volume percentage -->
  <div class="win98-volume-popup__percentage">
    75%
  </div>
  
  <!-- Vertical slider -->
  <input 
    type="range" 
    class="win98-slider win98-slider--vertical" 
    min="0" 
    max="100" 
    value="75"
    orient="vertical"
    aria-label="Volume level"
  >
  
  <!-- Mute button -->
  <button 
    class="win98-volume-popup__mute"
    aria-label="Mute"
    aria-pressed="false"
  >
    <img src="/icons/volume-high.png" alt="" width="16" height="16">
  </button>
</div>
```

## CSS Implementation

```scss
.win98-volume-icon {
  // Uses system tray icon styles
  // See system-tray.md
}

.win98-volume-popup {
  position: fixed;
  width: 40px;
  height: 120px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  
  background: var(--popup-bg);
  
  border-top: 2px solid var(--popup-border-light);
  border-left: 2px solid var(--popup-border-light);
  border-right: 2px solid var(--popup-border-dark);
  border-bottom: 2px solid var(--popup-border-dark);
  
  box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  z-index: 9999;
  
  &__percentage {
    width: 100%;
    height: 20px;
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--popup-text);
    text-align: center;
    line-height: 20px;
    -webkit-font-smoothing: none;
    -moz-osx-font-smoothing: grayscale;
  }
  
  // Slider (vertical)
  .win98-slider--vertical {
    flex: 1;
    margin: 4px 0;
  }
  
  &__mute {
    width: 20px;
    height: 20px;
    padding: 2px;
    
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: transparent;
    border: none;
    cursor: pointer;
    
    img {
      width: 16px;
      height: 16px;
      image-rendering: pixelated;
    }
  }
}
```

## Volume Icons Reference

Recommended icon set:
- `volume-high.png` - Speaker with 3 waves (66-100%)
- `volume-medium.png` - Speaker with 2 waves (33-65%)
- `volume-low.png` - Speaker with 1 wave (1-32%)
- `volume-muted.png` - Speaker with red X (0% or muted)

## Testing Requirements

### Visual Tests
- Verify icon is 16x16px
- Verify popup is 40px wide, 120px high
- Verify popup positioned above taskbar
- Verify slider vertical orientation
- Verify both theme colors

### Interaction Tests
- Click icon opens popup
- Click outside closes popup
- Drag slider adjusts volume
- Click mute button toggles mute
- Icon updates based on volume level
- Icon shows muted state when muted

### Audio Tests
- Volume change affects system audio
- Mute silences audio
- Unmute restores audio
- Volume level persists when muted

### Popup Tests
- Popup aligns to volume icon
- Popup has correct z-index
- Popup has drop shadow
- Popup closes on outside click
- Popup closes on Escape key

### Accessibility Tests
- Screen reader announces volume level
- Screen reader announces mute state
- Keyboard navigation works in popup
- ARIA attributes correct
- Focus management correct

## Notes

- Volume icon is 16x16px in system tray
- Popup is very narrow (40px) to save space
- Slider is vertical orientation
- Volume range is 0-100%
- Muted state is separate from volume level (muting at 75% preserves 75% for unmute)
- Popup auto-closes on outside click
- Popup appears directly above the volume icon
- Icon changes based on volume level (optional enhancement)
- Windows 98 did not have volume icon hover effects
- Popup has raised bevel border and drop shadow
