---
id: groupbox
title: Groupbox
---

# Group Box Component

## Overview

The Group Box (Fieldset) visually groups related controls together with a labeled border.

## Visual Specifications

### Dimensions

```
Border: 2px etched
Label gap: 8px from left
Padding: 8px (inside border)
Label offset: -8px from top
```

### Colors

#### Light Theme

```css
--groupbox-border-dark: #808080       /* Etched shadow */
--groupbox-border-light: #FFFFFF      /* Etched highlight */
--groupbox-bg: transparent            /* No background */
--groupbox-text: #000000              /* Label text */
```

#### Dark Theme

```css
--groupbox-border-dark: #0A0A15       /* Etched shadow */
--groupbox-border-light: #404050      /* Etched highlight */
--groupbox-bg: transparent            /* No background */
--groupbox-text: #FFFFFF              /* Label text */
```

## Structure

```
  ┌─ Label ──────────────┐
  │                      │
  │   Content            │
  │                      │
  └──────────────────────┘
```

### Etched Border

Created with overlapping borders:

```css
border: 1px solid var(--groupbox-border-dark);
box-shadow: 
  inset -1px -1px 0 var(--groupbox-border-light),
  1px 1px 0 var(--groupbox-border-light);
```

### Label Positioning

```html
<fieldset class="win98-groupbox">
  <legend class="win98-groupbox__label">Settings</legend>
  <div class="win98-groupbox__content">
    <!-- Controls -->
  </div>
</fieldset>
```

## CSS Implementation

```scss
.win98-groupbox {
  position: relative;
  border: 1px solid var(--groupbox-border-dark);
  box-shadow: 
    inset -1px -1px 0 var(--groupbox-border-light),
    1px 1px 0 var(--groupbox-border-light);
  padding: 16px 8px 8px;
  background: transparent;
  
  &__label {
    position: absolute;
    top: -8px;
    left: 8px;
    padding: 0 4px;
    background: var(--window-bg);
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--groupbox-text);
  }
}
```

## Usage

```html
<fieldset class="win98-groupbox">
  <legend class="win98-groupbox__label">Display Options</legend>
  
  <label class="win98-checkbox">
    <input type="checkbox">
    <span>Show toolbar</span>
  </label>
  
  <label class="win98-checkbox">
    <input type="checkbox">
    <span>Show status bar</span>
  </label>
</fieldset>
```
