---
id: font-system
title: Font System
---

# Font System

## Overview

Windows 98 used the MS Sans Serif font family for all UI elements. This document specifies the exact font requirements and provides strategies for obtaining and embedding these fonts.

## Primary Font: MS Sans Serif

### Specifications

```
Font Family: MS Sans Serif
Alternative Names: Microsoft Sans Serif, Small Fonts
File Format: TrueType (.ttf)
Sizes Used: 8pt, 10pt, 11pt (primarily 11pt for UI)
Weights: 400 (Regular), 700 (Bold)
Style: Sans-serif, bitmap-based at small sizes
```

### Font Characteristics

- **Pixel-optimized** - Designed for screen rendering at small sizes
- **No anti-aliasing** - Crisp, pixelated appearance
- **Fixed metrics** - Consistent character widths for UI layout
- **Limited character set** - Focus on Latin characters
- **Bitmap hints** - Embedded bitmap strikes for 8pt-12pt

## Font Usage in Windows 98

### UI Elements

```
Window Titles: 11px Bold MS Sans Serif
Menu Items: 11px Regular MS Sans Serif
Menu Bar: 11px Regular MS Sans Serif
Buttons: 11px Regular MS Sans Serif
Input Fields: 11px Regular MS Sans Serif
Labels: 11px Regular MS Sans Serif
Tooltips: 11px Regular MS Sans Serif
Status Bar: 11px Regular MS Sans Serif
Dialog Text: 11px Regular MS Sans Serif
Desktop Icons: 11px Regular MS Sans Serif
```

### Size Breakdown

```
8pt (11px CSS):   Primary UI size (default)
10pt (13px CSS):  Slightly larger text (rare)
11pt (15px CSS):  Large text (accessibility)
```

**Note:** Windows 98 used points (pt) while web uses pixels (px). Conversion: 11px ≈ 8pt at 96 DPI.

## Font Acquisition

### Legal Considerations

⚠️ **MS Sans Serif is proprietary Microsoft software**

**Options:**

1. **System Font (Recommended for Development)**
   - Use if available on user's system
   - Windows users already have it
   - No download/license needed

2. **Licensed Purchase**
   - Purchase from Microsoft or authorized vendor
   - Legal for commercial use
   - Requires proper licensing

3. **Open Source Alternative (Recommended for Production)**
   - Use open-source pixel font alternatives
   - No licensing concerns
   - Similar appearance

## Font Choice Rationale

### Why Authentic Microsoft Sans Serif?

**Previous Implementation (Tamzen):**
- ❌ **Monospace fonts** - All characters have the same width
- ❌ **Terminal appearance** - Makes UI look like a code editor
- ❌ **Incorrect spacing** - Buttons, menus, and UI elements have wrong proportions

**Current Implementation (Microsoft Sans Serif):**
- ✅ **Authentic Windows 98 fonts** - The actual fonts used in Windows 98
- ✅ **Proportional fonts** - Characters have variable widths like MS Sans Serif
- ✅ **Correct UI spacing** - Buttons, menus, and text align properly
- ✅ **Authentic appearance** - Exactly matches Windows 98 interface

### Recommended Alternative Fonts

#### 1. **Fixedsys Excelsior** (Open Source)
```
URL: https://github.com/kika/fixedsys
License: Public Domain
Appearance: Similar pixelated style
```

#### 2. **Perfect DOS VGA** (Free)
```
URL: https://www.dafont.com/perfect-dos-vga-437.font
License: Free for personal/commercial use
Appearance: Classic DOS/Win9x look
```

#### 3. **Px437** Family (Open Source)
```
URL: https://github.com/rewtnull/Px437
License: CC0 1.0 (Public Domain)
Appearance: IBM/DOS era fonts
```

#### 4. **Tamsyn** (Open Source)
```
URL: http://www.fial.com/~scott/tamsyn-font/
License: Custom permissive license
Appearance: Monospace bitmap font
```

## Font Embedding Strategy

### Font Face Declarations

Located in `src/styles/abstracts/_fonts.scss`:

```scss
// MS Sans Serif - Regular (Microsoft Sans Serif)
@font-face {
  font-family: 'MS Sans Serif';
  src: local('MS Sans Serif'),
       local('Microsoft Sans Serif'),
       url('/src/assets/fonts/ms-sans-serif/ms-sans-serif.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}

// MS Sans Serif - Bold (Microsoft Sans Serif Bold)
@font-face {
  font-family: 'MS Sans Serif';
  src: local('MS Sans Serif Bold'),
       local('Microsoft Sans Serif Bold'),
       url('/src/assets/fonts/ms-sans-serif/ms-sans-serif-bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
  font-display: block;
}

// Courier New Alternative - Monospace (Tamzen 7x13)
@font-face {
  font-family: 'Courier New';
  src: local('Courier New'),
       local('Courier'),
       url('/src/assets/fonts/courier-new/courier-new.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: block;
}
```

### Font Stack with Fallbacks

```css
/* Primary UI Font Stack */
font-family: 'MS Sans Serif', 'Microsoft Sans Serif', 
             'Fixedsys Excelsior', 'Perfect DOS VGA',
             -apple-system, system-ui, sans-serif;

/* Monospace Font Stack */
font-family: 'Courier New', 'Courier', 
             'Perfect DOS VGA', 'Fixedsys',
             'Consolas', monospace;
```

## CSS Implementation

Font declarations are in `src/styles/abstracts/_fonts.scss` alongside other SCSS abstracts.

### Global Font Settings

```scss
// In src/styles/abstracts/_vars.scss
$font-family-ui: 'MS Sans Serif', 'Microsoft Sans Serif', Arial, sans-serif;
$font-family-monospace: 'Courier New', Courier, monospace;
  
  /* Font sizes (fixed) */
  --font-size-ui: 11px;
  --font-size-title: 11px;
  --font-size-mono: 10px;
  
  /* Font weights */
  --font-weight-normal: 400;
  --font-weight-bold: 700;
}

/* Disable all smoothing globally */
* {
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
  font-smooth: never;
  text-rendering: optimizeSpeed;
}

/* Apply to body */
body {
  font-family: var(--font-ui);
  font-size: var(--font-size-ui);
  font-weight: var(--font-weight-normal);
}
```

### Component-Specific Overrides

```css
/* Window titles */
.win98-titlebar__text {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 700;
}

/* Buttons */
.win98-button {
  font-family: var(--font-ui);
  font-size: 11px;
  font-weight: 400;
}

/* Monospace (terminal, code) */
.win98-terminal, .win98-code {
  font-family: var(--font-mono);
  font-size: 10px;
}
```

## Font Rendering Requirements

### No Smoothing

```css
/* Disable font smoothing */
-webkit-font-smoothing: none;
-moz-osx-font-smoothing: grayscale;
font-smooth: never;
text-rendering: optimizeSpeed;
```

### Letter Spacing

```css
/* Default: No extra spacing */
letter-spacing: normal;

/* Password inputs: Slight spacing for readability */
input[type="password"] {
  letter-spacing: 2px;
}
```

### Line Height

```css
/* UI elements: Tight line height */
line-height: 1.2;

/* Multi-line text: Slightly more spacing */
p, .text-content {
  line-height: 1.4;
}
```

## Font File Structure

```
src/assets/fonts/
├── ms-sans-serif/
│   ├── ms-sans-serif.ttf          (Microsoft Sans Serif - Regular)
│   └── ms-sans-serif-bold.ttf     (Microsoft Sans Serif Bold - Bold)
├── courier-new/
│   └── courier-new.ttf            (Tamzen 7x13r - Monospace)
└── alternatives/
    ├── perfect-dos-vga.ttf        (Alternative option)
    └── fixedsys-excelsior.ttf     (Alternative option)
```

**Font declarations:** `src/styles/abstracts/_fonts.scss`  
**Font variables:** `src/styles/abstracts/_vars.scss`

## Font Loading Strategy

### Preload Critical Fonts (Optional)

```html
<!-- In HTML <head> if needed for performance -->
<link rel="preload" href="/src/assets/fonts/ms-sans-serif/ms-sans-serif.ttf" 
      as="font" type="font/ttf" crossorigin>
<link rel="preload" href="/src/assets/fonts/ms-sans-serif/ms-sans-serif-bold.ttf" 
      as="font" type="font/ttf" crossorigin>
```

### Font Display Strategy

```css
@font-face {
  font-family: 'MS Sans Serif';
  font-display: block; /* Prevent FOUT, brief FOIT acceptable */
}
```

**Why `block`?**
- Prevents flash of unstyled text (FOUT)
- Maintains pixel-perfect layout from start
- Brief invisible text acceptable for authentic Win98 feel

## Fallback Strategy

If MS Sans Serif unavailable:

1. **Try system MS Sans Serif** - `local('MS Sans Serif')`
2. **Try system alternatives** - `local('Microsoft Sans Serif')`
3. **Use embedded font** - Web fonts from `/assets/fonts/`
4. **Generic fallback** - `sans-serif` (degraded experience)

## Browser Compatibility

### Font Format Support

```
WOFF2: Chrome 36+, Firefox 39+, Safari 12+, Edge 14+
WOFF:  Chrome 5+, Firefox 3.6+, Safari 5.1+, Edge 12+
TTF:   All modern browsers (fallback)
```

**Recommended:** Provide WOFF2 (smallest), WOFF (compatibility), TTF (legacy)

## Testing Fonts

### Visual Check

1. Render text at 11px
2. Verify pixelated appearance (no smoothing)
3. Check character spacing
4. Verify bold weight is distinct
5. Compare against Windows 98 screenshot

### Metrics Validation

```javascript
// Test font metrics
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.font = '11px "MS Sans Serif"';

const metrics = ctx.measureText('Test');
console.log('Width:', metrics.width); // Should be consistent
```

## Font Optimization

### Subset Fonts

Only include needed characters:

```
Latin Basic: A-Z, a-z, 0-9
Punctuation: .,!?;:'"
Symbols: @#$%^&*()
Common: Space, hyphen, underscore
```

**Tools:**
- [Glyphanger](https://github.com/zachleat/glyphhanger)
- [Font Squirrel Webfont Generator](https://www.fontsquirrel.com/tools/webfont-generator)

### File Size Targets

```
MS Sans Serif Regular (subset): < 20 KB
MS Sans Serif Bold (subset): < 20 KB
Total: < 40 KB
```

## License Compliance

### Required Attribution

If using open-source alternatives:

```markdown
## Font Licenses

### Fixedsys Excelsior
- License: Public Domain
- Author: Darien Valentine
- URL: https://github.com/kika/fixedsys

### Perfect DOS VGA
- License: Free for personal and commercial use
- Author: Zeh Fernando
- URL: https://www.dafont.com/perfect-dos-vga-437.font
```

### License File

Create `/src/assets/fonts/LICENSE.txt`:

```
This directory contains font files for the Abu 98 OS Web Kernel.

MS Sans Serif Alternative Fonts:
- [Font Name]: [License] - See [Font]/LICENSE.txt
```

## Implementation Checklist

- [ ] Choose font strategy (system/embedded/alternative)
- [ ] Acquire fonts legally
- [ ] Convert to web formats (WOFF2, WOFF, TTF)
- [ ] Subset fonts to reduce size
- [ ] Add @font-face declarations
- [ ] Preload critical fonts
- [ ] Test rendering at 11px
- [ ] Verify no font smoothing
- [ ] Add license files
- [ ] Update attribution docs
- [ ] Test fallback stack
- [ ] Measure performance impact

## Recommended: Open Source Solution

**Best approach for production:**

1. Use **Fixedsys Excelsior** or **Perfect DOS VGA**
2. Convert to WOFF2 format
3. Subset to Latin characters only
4. Embed in `/assets/fonts/`
5. Preload in HTML
6. Declare with proper fallbacks

This avoids licensing issues while maintaining authentic Windows 98 appearance.

## Summary

- **Primary Font:** MS Sans Serif 11px Regular and Bold
- **Acquisition:** System font, licensed, or open-source alternative
- **Embedding:** WOFF2/WOFF/TTF with @font-face
- **Rendering:** No smoothing, pixelated appearance
- **Fallbacks:** System fonts → embedded → generic sans-serif
- **Size:** Subset to ~40 KB total
- **License:** Ensure proper licensing/attribution

Fonts are critical for authentic Windows 98 appearance - choose and implement carefully!
