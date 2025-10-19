---
id: visual-system
title: Visual System
---

# Visual System Overview

## Introduction

The Visual System defines the complete Windows 98 aesthetic for the Abu 98 OS Web Kernel. This document provides a high-level overview and references to detailed component specifications.

## Core Aesthetic Principles

1. **Pixel-Perfect** - Exact Windows 98 reproduction
2. **Dual Theme System** - Light (classic gray) and Dark (custom blue) themes
3. **No Smooth Effects** - Instant state changes, no animations or transitions
4. **Fixed Dimensions** - Pixel-based sizing, no responsive scaling
5. **Beveled Borders** - Raised/inset 2px bevels everywhere
6. **Crisp Rendering** - Pixelated, no anti-aliasing
7. **Consistent Behavior** - Same interaction patterns across all components

## Theme System

### Light Theme (Classic Windows 98)

The default Windows 98 appearance with the iconic gray interface:

**Core Colors:**
```css
--button-face: #C0C0C0              /* Background gray */
--button-highlight: #FFFFFF          /* Top/left bevel (light) */
--button-shadow: #808080             /* Bottom/right bevel (dark) */
--button-dark-shadow: #000000        /* Darkest bevel */
--button-text: #000000               /* Text color */
--window-frame: #0A0A0A              /* Window borders */
--active-title-start: #000080        /* Active titlebar gradient start */
--active-title-end: #1084D0          /* Active titlebar gradient end */
--inactive-title: #808080            /* Inactive titlebar */
--title-text: #FFFFFF                /* Titlebar text */
--desktop: #008080                   /* Desktop teal */
```

### Dark Theme (Inspired by Windows Setup Screen)

Dark theme inspired by the classic Windows 95/98 setup screen gradient (blue to black):

**Core Colors:**
```css
--button-face: #1A1A2E              /* Dark blue-gray background */
--button-highlight: #404050          /* Lighter borders */
--button-shadow: #0A0A15             /* Darker borders */
--button-dark-shadow: #000000        /* Black */
--button-text: #FFFFFF               /* White text */
--window-frame: #000000              /* Black borders */
--active-title-start: #000080        /* Navy blue (same) */
--active-title-end: #1084D0          /* Light blue (same) */
--inactive-title: #404050            /* Gray-blue */
--title-text: #FFFFFF                /* White */
--desktop-gradient-top: #0000CC      /* Bright blue (top) */
--desktop-gradient-bottom: #000020   /* Very dark blue/black (bottom) */
```

**Desktop Background Gradient:**
- Inspired by Windows 95/98 installation screen
- Top: Bright blue (#0000CC)
- Bottom: Very dark blue/black (#000020)
- Direction: Top to bottom vertical gradient

**Theme Differences:**
- Only colors change between themes
- All dimensions, borders, and behaviors remain identical
- Input fields stay white with black text in both themes
- Selection highlight stays navy blue (#000080) in both themes
- Titlebar gradients identical in both themes
- Light theme: Solid teal desktop (#008080)
- Dark theme: Blue-to-black gradient desktop (Windows setup inspired)

## Typography

**Primary Font:**
```
Font family: 'MS Sans Serif', sans-serif
Font size: 11px (all UI components)
Font weight: 400 (normal), 700 (bold for titles/Start button)
Font smoothing: none
Rendering: optimizeSpeed
```

**Rules:**
- Never use font smoothing or anti-aliasing
- Fixed 11px size for all UI text
- MS Sans Serif only (system sans-serif as fallback)
- Bold (700) only for window titles and Start button

## Dimensions & Spacing

**Fixed Component Heights:**
```
Taskbar: 28px
Titlebar: 18px
Button: 23px
Input: 21px
Menu item: 22px
Desktop icon grid: 75x75px
```

**Spacing Scale:**
```
2px - Minimal gap (between buttons, padding)
4px - Small gap (icon-to-text)
6px - Medium gap (between groups)
8px - Standard padding (content areas)
12px - Large padding (dialogs)
```

## Bevel System

All Windows 98 components use 3D bevels created with strategic borders:

**Raised (Outset):**
```css
border-top: 2px solid var(--button-highlight);
border-left: 2px solid var(--button-highlight);
border-right: 2px solid var(--button-shadow);
border-bottom: 2px solid var(--button-shadow);
```

**Inset:**
```css
border-top: 2px solid var(--button-shadow);
border-left: 2px solid var(--button-shadow);
border-right: 2px solid var(--button-highlight);
border-bottom: 2px solid var(--button-highlight);
```

**Pressed (Deep Inset):**
```css
border-top: 2px solid var(--button-dark-shadow);
border-left: 2px solid var(--button-dark-shadow);
border-right: 2px solid var(--button-face);
border-bottom: 2px solid var(--button-face);
```

## Component Library

Detailed specifications are available for each component:

### Core Controls
- **[Button](./components/button.md)** - Standard push buttons with raised/pressed states
- **[Input](./components/input.md)** - Text input fields with inset appearance
- **[Checkbox](./components/checkbox.md)** - Binary selection with checkmark
- **[Radio](./components/radio.md)** - Mutually exclusive selection with circular indicator
- **[Select](./components/select.md)** - Dropdown selection with arrow button
- **[Slider](./components/slider.md)** - Continuous value selection with draggable thumb

### Window Components
- **[Window](./components/window.md)** - Main window container with chrome and borders
- **[Titlebar](./components/titlebar.md)** - Window title area with gradient and buttons
- **[Titlebar Button](./components/titlebar-button.md)** - Minimize, maximize, close buttons
- **[Window Chrome](./components/window-chrome.md)** - 3-layer decorative border system
- **[Resize Handle](./components/resize-handle.md)** - Invisible edge/corner resize zones

### Desktop Components
- **[Desktop](./components/desktop.md)** - Main workspace with grid-based icon layout
- **[Desktop Icon](./components/desktop-icon.md)** - 32x32px icons with text labels

### Taskbar Components
- **[Taskbar](./components/taskbar.md)** - Bottom bar containing Start, tasks, and system tray
- **[Start Button](./components/start-button.md)** - Primary menu access button
- **[Taskbar Button](./components/taskbar-button.md)** - Window representation buttons
- **[System Tray](./components/system-tray.md)** - Icon area on right side
- **[Clock](./components/clock.md)** - Time display in system tray
- **[Volume Control](./components/volume-control.md)** - Audio control icon and popup
- **[Theme Toggle](./components/theme-toggle.md)** - Light/dark theme switcher

### Menu Components
- **[Menu Bar](./components/menubar.md)** - Application menu bar (File, Edit, View, Help)
- **[Start Menu](./components/start-menu.md)** - Primary navigation menu
- **[Menu Item](./components/menu-item.md)** - Individual menu entries with icons and shortcuts
- **[Context Menu](./components/context-menu.md)** - Right-click menus

### Dialog Components
- **[Message Box](./components/message-box.md)** - System alerts, warnings, and confirmations
- **[Dialog](./components/dialog.md)** - Modal/modeless windows for forms and settings

### Additional Components
- **[Menu Bar](./components/menubar.md)** - Application menu bar (File, Edit, View, Help)
- **[Status Bar](./components/statusbar.md)** - Bottom window status information
- **[Progress Bar](./components/progressbar.md)** - Operation progress indicator
- **[Tab Control](./components/tab-control.md)** - Tabbed content organization
- **[Group Box](./components/groupbox.md)** - Visual grouping of controls (fieldset)
- **[Tooltip](./components/tooltip.md)** - Hover help text

### Special Systems
- **[Font System](./font-system.md)** - MS Sans Serif and alternatives
- **[Scrollbar](./scrollbar-system.md)** - Custom Windows 98 scrollbars
- **[Cursor](./cursor-system.md)** - 15 authentic Windows 98 cursors
- **[Icons](./icon-system.md)** - 879 organized Windows 98 icons

## Rendering Rules

### Image Rendering

All icons and images must use pixelated rendering:

```css
img, .icon {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

### Font Rendering

Disable all smoothing for authentic pixel fonts:

```css
* {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: never;
  text-rendering: optimizeSpeed;
}
```

### No Animations

Windows 98 had instant state changes:

```
❌ NEVER use:
- transition properties
- animation properties
- opacity fades
- transform animations

✅ ALWAYS use:
- Instant state changes
- Immediate display/hide
- Direct position updates
```

## Z-Index Hierarchy

```
Desktop background:        0
Desktop icons:             1-10
Windows:                   100-999
Modals/Dialogs:            1000-1999
Context menus:             2000-2999
Taskbar:                   10000
Tooltips:                  10001+
```

## Drop Shadows

Windows and menus have solid drop shadows:

```css
box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
```

**Rules:**
- No blur (0px blur radius)
- No spread
- 2px offset only
- Solid color only

## State Management

### Hover States

**Windows 98 had NO hover effects on:**
- Buttons
- Desktop icons
- Start button
- Taskbar buttons
- Window controls

**Hover effects ONLY on:**
- Menu items (navy blue background)
- Resize handles (cursor changes only)

### Focus States

All interactive elements show focus:

```css
:focus-visible {
  outline: 1px dotted #000000;
  outline-offset: -3px; /* Inside element */
}
```

### Disabled States

Disabled elements use embossed text:

```css
&:disabled {
  color: var(--button-shadow);
  text-shadow: 1px 1px 0 var(--button-highlight);
  cursor: not-allowed;
}
```

## Accessibility

While maintaining pixel-perfect Windows 98 appearance:

**Keyboard Navigation:**
- Tab order logical and consistent
- Focus indicators visible (dotted outline)
- All controls keyboard accessible

**Screen Readers:**
- ARIA labels on controls
- Semantic HTML where possible
- State changes announced

**Color Contrast:**
- Both themes exceed WCAG AA standards
- Text readable on all backgrounds

## Icon System

**Format:** PNG8 (256 colors)
**Base Size:** 16x16px
**Scaled Sizes:** 32x32px (desktop), 48x48px (large icons)
**Rendering:** Always pixelated, never smooth

See **[Icon System](./icon-system.md)** for complete details.

## Cursor System

**Count:** 15 authentic Windows 98 cursors
**Format:** PNG data URLs
**Coverage:** All 36 CSS cursor types mapped

See **[Cursor System](./cursor-system.md)** for complete details.

## Browser Support

**Target Browsers:**
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

**Rendering Consistency:**
- Chrome/Edge: Pixel-perfect
- Firefox: Pixel-perfect
- Safari: Minor font rendering differences (acceptable)

## Testing Checklist

When implementing or reviewing components:

- [ ] Exact dimensions match spec
- [ ] Bevel borders correct (2px, correct colors)
- [ ] Font is MS Sans Serif 11px
- [ ] No font smoothing
- [ ] No animations or transitions
- [ ] Icons use pixelated rendering
- [ ] Colors match theme (light/dark)
- [ ] Focus indicators visible
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] No hover effects (except menus)
- [ ] Instant state changes

## Implementation Notes

**CSS Custom Properties:**
All colors defined as CSS custom properties on `:root` or `[data-theme="dark"]` for easy theme switching.

**Component Isolation:**
Each component is self-contained with its own styles, avoiding global style pollution.

**No CSS Frameworks:**
No Bootstrap, Tailwind, or similar. Pure CSS matching Windows 98.

**SCSS Usage:**
SCSS mixins for bevels and common patterns, compiled to CSS.

## Summary

The Visual System ensures:

- **Pixel-perfect Windows 98 reproduction**
- **Complete theme support (light and dark)**
- **Fixed dimensions and spacing**
- **3D beveled borders everywhere**
- **Pixelated rendering (no smoothing)**
- **No animations or smooth effects**
- **Accessibility without compromising aesthetics**
- **Consistent behavior across all components**

For detailed specifications of any component, see the linked component documentation above.
