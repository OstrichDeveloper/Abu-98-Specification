---
id: icon-system
title: Icon System
---

# Icon System Architecture

## Overview

The Abu OS 98 Web Kernel features a complete Windows 98 icon library with **879 professionally organized icons** in optimal PNG8 format. The system is fully automated with zero manual maintenance required.

## Current Architecture (2025 - Organized Structure)

### Directory Structure

```
src/assets/icons/
├── system/ (131 icons)
│   ├── Core system icons (my-computer, recycle-bin, folders, etc.)
│   └── accessibility/ (15 icons)
│
├── apps/ (108 icons)
│   ├── accessories/ (25) - notepad, paint, calculator, etc.
│   ├── internet/ (23) - internet explorer, outlook, etc.
│   ├── multimedia/ (31) - media player, cd player, etc.
│   ├── office/ (11) - address book, contacts, etc.
│   ├── system-tools/ (7) - registry, config, etc.
│   └── utilities/ (11) - backup, disk tools, etc.
│
├── files/ (25 icons)
│   ├── archives/ (4) - zip, compressed files
│   ├── documents/ (4) - text, office docs
│   ├── images/ (6) - bmp, jpg, graphics
│   └── system-files/ (11) - ini, dll, exe, etc.
│
├── hardware/ (101 icons)
│   ├── devices/ (46) - keyboard, mouse, camera, etc.
│   ├── network/ (15) - network connections
│   ├── printers/ (25) - various printer icons
│   └── storage/ (15) - hard disk, floppy, cd-rom
│
└── ui/ (514 icons)
    ├── icons/ (4) - generic ui icons
    ├── toolbar/ (27) - back, forward, refresh, etc.
    └── misc/ (483) - various ui elements
```

### File Naming Convention

All icons follow strict naming standards:

```
{descriptive-name}.png

Examples:
  my-computer.png           # System icon
  notepad.png               # Application icon
  internet-explorer.png     # Internet app
  zip-file.png             # File type
```

**Naming Rules:**
- ✅ Lowercase with hyphens
- ✅ Descriptive names
- ✅ No special characters (& → and)
- ✅ No generic numbers
- ✅ Single resolution per file (32x32px)

## Technical Specifications

### PNG8 Format

All icons use PNG8 (8-bit indexed color) for optimal file size:

- **Color depth**: 8-bit (256 colors)
- **Resolution**: 32x32px native
- **Compression**: Maximum (pngquant + optipng)
- **Average size**: 4KB per icon
- **Total size**: 3.5MB source → 420KB bundled

### CSS Scaling

Icons scale from 32x32px base using CSS:

```css
.icon {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

This ensures pixel-perfect rendering at any scale.

## Usage in Code

### CSS Class Pattern

Icons use hierarchical class names based on their directory path:

```css
.icon-{category}-{subcategory}-{name}
.icon-{category}-{name}

Examples:
  .icon-system-my-computer
  .icon-apps-accessories-notepad
  .icon-apps-internet-internet-explorer
  .icon-files-documents-document
  .icon-hardware-devices-keyboard
```

### Size Modifiers

```html
<!-- 16x16 -->
<div class="icon icon-system-my-computer size-16"></div>

<!-- 24x24 -->
<div class="icon icon-system-my-computer size-24"></div>

<!-- 32x32 (default) -->
<div class="icon icon-system-my-computer size-32"></div>

<!-- 48x48 -->
<div class="icon icon-system-my-computer size-48"></div>

<!-- 64x64 -->
<div class="icon icon-system-my-computer size-64"></div>
```

### In Svelte Components

```html
<script>
  const iconClass = 'icon-apps-accessories-notepad';
</script>

<div class="icon {iconClass}"></div>
```

### Common Icon Classes

**System Icons:**
- `icon-system-my-computer`
- `icon-system-recycle-bin-full`
- `icon-system-recycle-bin-empty`
- `icon-system-network`
- `icon-system-control-panel`
- `icon-system-folder-open`
- `icon-system-folder-closed`

**Application Icons:**
- `icon-apps-accessories-notepad`
- `icon-apps-accessories-paint`
- `icon-apps-accessories-calculator`
- `icon-apps-internet-internet-explorer`
- `icon-apps-internet-outlook`
- `icon-apps-multimedia-media-player`

**File Type Icons:**
- `icon-files-documents-document`
- `icon-files-images-bitmap-image`
- `icon-files-archives-zip-file`
- `icon-files-system-files-ini-and-inf`

**Hardware Icons:**
- `icon-hardware-devices-keyboard`
- `icon-hardware-printers-printer`
- `icon-hardware-storage-hard-disk`
- `icon-hardware-network-network-connection`

## Build Integration

### Development

Icons are referenced in SCSS:

```scss
.icon-system-my-computer {
  background-image: url('../../assets/icons/system/my-computer.png');
}
```

### Production Build

Vite automatically:
1. Inlines icons `<10`KB as data URLs
2. Embeds all 879 icons in the CSS bundle
3. Result: Single 420KB CSS file with all icons

### No External Assets

All icons are embedded as data URLs in the CSS. No separate image files are served.

## Automated Generation

### SCSS Generation

The `src/styles/abstracts/_icons.scss` file is auto-generated from the directory structure:

```bash
# One-time operation (already complete)
npm run generate-icons
```

This script:
- Scans all PNG files recursively
- Generates CSS classes based on file paths
- Creates size modifier classes
- Outputs complete SCSS file

### Zero Maintenance

**Filesystem is source of truth:**
- No catalog.json needed
- No manual class generation
- No synchronization issues
- Just add PNGs and rebuild

## Performance

### Bundle Size

- **Source PNGs**: 3.5MB (879 files)
- **Built CSS**: 420KB (all icons embedded)
- **Gzipped**: ~168KB
- **Load time**: Single HTTP request

### Rendering Performance

- Pixel-perfect scaling via CSS
- No runtime image processing
- Cached by browser
- No additional HTTP requests

## Migration from Old Structure

### Old Format (Deprecated)

```
icon-name-16.png  # 16x16 version
icon-name-32.png  # 32x32 version
icon-name-48.png  # 48x48 version
```

### New Format (Current)

```
category/subcategory/icon-name.png  # Single 32x32 PNG8
```

### Class Name Changes

| Old Class | New Class |
|-----------|-----------|
| `.icon-control-panel` | `.icon-system-control-panel` |
| `.icon-notepad` | `.icon-apps-accessories-notepad` |
| `.icon-ie` | `.icon-apps-internet-internet-explorer` |
| `.icon-folders-options` | `.icon-system-folder-options` |

## Adding New Icons

### 1. Place PNG File

Add 32x32px PNG8 file to appropriate category:

```
src/assets/icons/system/new-icon.png
src/assets/icons/apps/accessories/new-app.png
```

### 2. Regenerate SCSS (if needed)

SCSS generation is a one-time operation. For new icons:

1. Add PNG to correct directory
2. Rebuild project: `npm run build`
3. Use class: `.icon-{path-with-hyphens}`

### 3. Use in Code

```html
<div class="icon icon-system-new-icon"></div>
```

## Troubleshooting

### Icon Not Showing

1. Check file exists:
   ```bash
   ls src/assets/icons/{category}/{name}.png
   ```

2. Check CSS class name matches path:
   ```
   system/my-computer.png → .icon-system-my-computer
   apps/accessories/paint.png → .icon-apps-accessories-paint
   ```

3. Rebuild if needed:
   ```bash
   npm run build
   ```

### Wrong Icon Displayed

Ensure class name exactly matches file path with hyphens.

## Related Documentation

- [Icons Reference](./icons-reference.md) - Complete usage guide
- [Icons Organization](./icons-organization.md) - Directory structure
- [Icons Technical](./icons-technical.md) - Conversion details
- [Visual System](./visual-system.md) - Overall design system
