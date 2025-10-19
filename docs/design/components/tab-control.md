---
id: tab-control
title: Tab Control
---

# Tab Control Component

## Overview

The Tab Control organizes content into multiple tabs, commonly used in Properties dialogs and settings windows.

## Visual Specifications

### Dimensions

```
Tab height: 20px
Tab min width: 60px
Tab padding: 4px 12px
Border: 2px raised/inset
Content padding: 8px
```

### Colors

#### Light Theme

```css
--tab-bg: #C0C0C0                    /* Inactive tab background */
--tab-active-bg: #C0C0C0             /* Active tab background */
--tab-text: #000000                  /* Tab text */
--tab-border-light: #FFFFFF          /* Border highlight */
--tab-border-dark: #808080           /* Border shadow */
--tab-content-bg: #C0C0C0            /* Content area background */
```

#### Dark Theme

```css
--tab-bg: #0A0A15                    /* Inactive tab background */
--tab-active-bg: #1A1A2E             /* Active tab background */
--tab-text: #FFFFFF                  /* Tab text */
--tab-border-light: #404050          /* Border highlight */
--tab-border-dark: #0A0A15           /* Border shadow */
--tab-content-bg: #1A1A2E            /* Content area background */
```

## Structure

```
┌───────┬───────┬───────┐
│ Tab 1 │ Tab 2 │ Tab 3 │
├───────┴───────┴───────┴───────┐
│                               │
│   Tab Content Area            │
│                               │
└───────────────────────────────┘
```

### Tab Button (Inactive)

```css
border-top: 2px solid var(--tab-border-light);
border-left: 2px solid var(--tab-border-light);
border-right: 2px solid var(--tab-border-dark);
/* No bottom border */
background: var(--tab-bg);
position: relative;
top: 2px; /* Sits slightly lower */
```

### Tab Button (Active)

```css
border-top: 2px solid var(--tab-border-light);
border-left: 2px solid var(--tab-border-light);
border-right: 2px solid var(--tab-border-dark);
/* No bottom border */
background: var(--tab-active-bg);
position: relative;
top: 0; /* Flush with content */
z-index: 1; /* Above content border */
```

### Content Area

```css
border: 2px solid var(--tab-border-dark);
border-top: 2px solid var(--tab-border-dark);
background: var(--tab-content-bg);
padding: 8px;
```

## States

### Normal Tab
- Raised border (top, left, right)
- Positioned 2px below active tab
- Lighter background

### Active Tab
- Raised border
- Positioned flush with content
- Same background as content
- Overlaps content top border

### Hover
**No hover effect** in Windows 98

### Disabled Tab
- Gray text
- Not clickable

## Behavior

### Click Tab
- Deactivate current tab
- Activate clicked tab
- Show clicked tab's content
- No animation

### Keyboard
- Tab → Focus next control in content
- Ctrl+Tab → Next tab
- Ctrl+Shift+Tab → Previous tab

## CSS Implementation

```scss
.win98-tabs {
  display: flex;
  flex-direction: column;
  
  &__header {
    display: flex;
    gap: 2px;
    margin-bottom: -2px; // Overlap with content
  }
  
  &__tab {
    padding: 4px 12px;
    height: 20px;
    
    background: var(--tab-bg);
    border-top: 2px solid var(--tab-border-light);
    border-left: 2px solid var(--tab-border-light);
    border-right: 2px solid var(--tab-border-dark);
    
    font-family: 'MS Sans Serif', sans-serif;
    font-size: 11px;
    color: var(--tab-text);
    
    cursor: pointer;
    position: relative;
    top: 2px;
    
    &--active {
      background: var(--tab-active-bg);
      top: 0;
      z-index: 1;
      border-bottom: 2px solid var(--tab-active-bg);
    }
  }
  
  &__content {
    background: var(--tab-content-bg);
    border: 2px solid var(--tab-border-dark);
    padding: 8px;
  }
}
```

## Usage

```html
<div class="win98-tabs">
  <div class="win98-tabs__header">
    <button class="win98-tabs__tab win98-tabs__tab--active">General</button>
    <button class="win98-tabs__tab">Details</button>
    <button class="win98-tabs__tab">Advanced</button>
  </div>
  <div class="win98-tabs__content">
    <!-- Tab content -->
  </div>
</div>
```
