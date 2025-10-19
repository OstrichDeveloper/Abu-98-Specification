---
id: progressbar
title: Progressbar
---

# Progress Bar Component

## Overview

The Progress Bar shows the completion status of an operation using a filled horizontal bar.

## Visual Specifications

### Dimensions

```
Height: 20px
Width: Variable (typically 200-400px)
Border: 2px inset
Fill height: 16px (inner area)
```

### Colors

#### Light Theme

```css
--progress-bg: #FFFFFF               /* Background (white) */
--progress-fill: #000080             /* Fill color (navy blue) */
--progress-border-dark: #808080      /* Border dark */
--progress-border-light: #FFFFFF     /* Border light */
```

#### Dark Theme

```css
--progress-bg: #FFFFFF               /* Background (white, same) */
--progress-fill: #000080             /* Fill color (navy blue, same) */
--progress-border-dark: #0A0A15      /* Border dark */
--progress-border-light: #404050     /* Border light */
```

## States

### Determinate (0-100%)
Shows exact progress with filled bar

### Indeterminate
Animated "barber pole" pattern (optional in Windows 98)

## CSS Implementation

```scss
.win98-progressbar {
  position: relative;
  height: 20px;
  
  background: var(--progress-bg);
  
  border-top: 2px solid var(--progress-border-dark);
  border-left: 2px solid var(--progress-border-dark);
  border-right: 2px solid var(--progress-border-light);
  border-bottom: 2px solid var(--progress-border-light);
  
  &__fill {
    height: 100%;
    background: var(--progress-fill);
    transition: none; // Instant updates
  }
}
```

## Usage

```html
<div class="win98-progressbar">
  <div class="win98-progressbar__fill" style="width: 60%"></div>
</div>
```
