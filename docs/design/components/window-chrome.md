---
id: window-chrome
title: Window Chrome
---

# Window Chrome Component

## Overview

Window Chrome refers to the decorative and functional border elements that surround the window content. This includes the 3D bevel borders and the distinctive raised/inset frame appearance.

## Visual Specifications

### Border Structure

Windows 98 windows have a complex multi-layered border:

```
Outer border (3px total):
  Layer 1 (outermost, 1px): Highlight/Shadow
  Layer 2 (middle, 1px): Highlight/Shadow  
  Layer 3 (innermost, 1px): Highlight/Shadow
```

### Dimensions

```
Total border thickness: 3px on all sides
Outer layer: 1px
Middle layer: 1px
Inner layer: 1px
```

### Colors

#### Light Theme

```css
--chrome-outer-light: #FFFFFF       /* Outer top/left highlight */
--chrome-outer-dark: #000000        /* Outer bottom/right shadow */
--chrome-middle-light: #FFFFFF      /* Middle top/left highlight */
--chrome-middle-dark: #808080       /* Middle bottom/right shadow */
--chrome-inner-light: #FFFFFF       /* Inner top/left highlight */
--chrome-inner-dark: #808080        /* Inner bottom/right shadow */
--chrome-bg: #C0C0C0                /* Window background */
```

#### Dark Theme

```css
--chrome-outer-light: #404050       /* Outer top/left highlight */
--chrome-outer-dark: #000000        /* Outer bottom/right shadow */
--chrome-middle-light: #404050      /* Middle top/left highlight */
--chrome-middle-dark: #0A0A15       /* Middle bottom/right shadow */
--chrome-inner-light: #404050       /* Inner top/left highlight */
--chrome-inner-dark: #0A0A15        /* Inner bottom/right shadow */
--chrome-bg: #1A1A2E                /* Window background */
```

## Border Visualization

```
┌───────────────────────────────────┐  ← Outer light (top)
│┌─────────────────────────────────┐│  ← Middle light
││┌───────────────────────────────┐││  ← Inner light
│││                               │││
│││     Window Content            │││
│││                               │││
││└───────────────────────────────┘││  ← Inner dark
│└─────────────────────────────────┘│  ← Middle dark
└───────────────────────────────────┘  ← Outer dark (bottom)
```

### Border Layers Breakdown

**Active Window:**
```css
/* Outer layer */
border-top: 1px solid var(--chrome-outer-light);
border-left: 1px solid var(--chrome-outer-light);
border-right: 1px solid var(--chrome-outer-dark);
border-bottom: 1px solid var(--chrome-outer-dark);

/* Middle + Inner layers via box-shadow */
box-shadow:
  inset 1px 1px 0 var(--chrome-middle-light),
  inset -1px -1px 0 var(--chrome-middle-dark),
  inset 2px 2px 0 var(--chrome-inner-light),
  inset -2px -2px 0 var(--chrome-inner-dark);
```

**Inactive Window:**
```css
/* Simplified single-layer border */
border: 1px solid #808080; /* Light theme */
border: 1px solid #404050; /* Dark theme */
```

## Special Chrome Regions

### Titlebar Chrome
- Integrated with window chrome
- No separate border
- Part of top window border

### Content Area Chrome
- Inset appearance
- Surrounded by raised window border
- Creates depth perception

### Menubar Chrome (if present)
- Below titlebar
- Above content area
- Part of window chrome structure

### Status Bar Chrome (if present)
- At bottom of window
- Above bottom border
- Part of window chrome structure
- May have its own inset border

## States

### Active Window Chrome
- Full 3-layer border system
- Bright highlights and dark shadows
- Clear 3D raised appearance

### Inactive Window Chrome
- Simplified to single gray border
- Reduced visual prominence
- Still maintains window shape

### Maximized Window Chrome
- Chrome remains same thickness
- Extends to screen edges
- Resize handles hidden

## Behavior

### Chrome Does Not Resize
- Chrome thickness is fixed at 3px
- Does not scale with window size
- Maintains consistent appearance

### Chrome Is Not Interactive
- Chrome is purely visual
- Resize handles are separate
- Titlebar is separate interactive area

### Chrome Adapts to Theme
- Colors change based on light/dark theme
- Structure remains identical
- Only color values change

## Accessibility

Window chrome is purely decorative and has no accessibility requirements. It provides:
- Visual boundary of window
- Depth perception through 3D effect
- Visual feedback for active/inactive state

## Usage Examples

### Basic Window Chrome
```html
<div class="win98-window">
  <!-- Chrome is applied via CSS borders and box-shadows -->
  <div class="win98-titlebar">...</div>
  <div class="win98-window__content">...</div>
</div>
```

### Active Window
```html
<div class="win98-window win98-window--active">
  <!-- Full 3-layer chrome automatically applied -->
  ...
</div>
```

### Inactive Window
```html
<div class="win98-window win98-window--inactive">
  <!-- Simplified chrome automatically applied -->
  ...
</div>
```

## CSS Implementation

```scss
.win98-window {
  position: relative;
  background: var(--chrome-bg);
  
  // Outer border layer
  border-top: 1px solid var(--chrome-outer-light);
  border-left: 1px solid var(--chrome-outer-light);
  border-right: 1px solid var(--chrome-outer-dark);
  border-bottom: 1px solid var(--chrome-outer-dark);
  
  // Middle and inner layers
  box-shadow:
    inset 1px 1px 0 var(--chrome-middle-light),
    inset -1px -1px 0 var(--chrome-middle-dark),
    inset 2px 2px 0 var(--chrome-inner-light),
    inset -2px -2px 0 var(--chrome-inner-dark),
    2px 2px 0 rgba(0, 0, 0, 0.2); // Optional drop shadow
  
  // Inactive state override
  &--inactive {
    border: 1px solid #808080;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  }
}
```

## Bevel Mixin

For reusability across components, a SCSS mixin is recommended:

```scss
@mixin win98-raised-border {
  border-top: 1px solid var(--chrome-outer-light);
  border-left: 1px solid var(--chrome-outer-light);
  border-right: 1px solid var(--chrome-outer-dark);
  border-bottom: 1px solid var(--chrome-outer-dark);
  
  box-shadow:
    inset 1px 1px 0 var(--chrome-middle-light),
    inset -1px -1px 0 var(--chrome-middle-dark);
}

@mixin win98-inset-border {
  border-top: 1px solid var(--chrome-outer-dark);
  border-left: 1px solid var(--chrome-outer-dark);
  border-right: 1px solid var(--chrome-outer-light);
  border-bottom: 1px solid var(--chrome-outer-light);
  
  box-shadow:
    inset -1px -1px 0 var(--chrome-middle-light),
    inset 1px 1px 0 var(--chrome-middle-dark);
}
```

## Testing Requirements

### Visual Tests
- Verify 3-layer border structure
- Verify exact 3px total thickness
- Verify highlight on top/left
- Verify shadow on bottom/right
- Verify both theme colors
- Verify active vs inactive appearance

### State Tests
- Active window has full chrome
- Inactive window has simplified chrome
- Theme changes update chrome colors instantly

### Edge Cases
- Chrome renders correctly at minimum window size
- Chrome renders correctly when maximized
- Chrome doesn't interfere with resize handles

## Notes

- Chrome is always exactly 3px thick
- Each layer is exactly 1px
- Active windows have complex 3-layer chrome
- Inactive windows have simple 1px border
- Chrome creates the iconic Windows 98 3D look
- Chrome is purely decorative, not interactive
- Colors change based on theme, structure doesn't
- The raised bevel effect is achieved through strategic use of highlight and shadow colors
- All Windows 98 UI elements use similar chrome techniques
