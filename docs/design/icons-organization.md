---
id: icons-organization
title: Icons Organization
---

# Windows 98 Icons - Organized Structure 🗂️

## Directory Structure

All 879 icons are now organized into logical categories:

```
src/assets/icons/
├── system/ (116 icons)
│   ├── accessibility/ (15 icons)
│   └── Core system icons
├── apps/ (108 icons)
│   ├── accessories/ (25 icons)
│   ├── internet/ (23 icons)
│   ├── multimedia/ (31 icons)
│   ├── office/ (11 icons)
│   ├── system-tools/ (7 icons)
│   └── utilities/ (11 icons)
├── files/ (25 icons)
│   ├── archives/ (4 icons)
│   ├── documents/ (4 icons)
│   ├── images/ (6 icons)
│   └── system-files/ (11 icons)
├── hardware/ (101 icons)
│   ├── devices/ (46 icons)
│   ├── network/ (15 icons)
│   ├── printers/ (25 icons)
│   └── storage/ (15 icons)
└── ui/ (514 icons)
    ├── icons/ (4 icons)
    ├── misc/ (483 icons)
    └── toolbar/ (27 icons)
```

## Icon Classes

Icon classes use hierarchical naming: `.icon-{category}-{subcategory}-{name}`

### System Icons

```html
<!-- Core system -->
<div class="icon icon-system-my-computer"></div>
<div class="icon icon-system-recycle-bin-full"></div>
<div class="icon icon-system-network"></div>
<div class="icon icon-system-control-panel"></div>
<div class="icon icon-system-folder-open"></div>

<!-- Accessibility -->
<div class="icon icon-system-accessibility-accessibility"></div>
```

### Application Icons

```html
<!-- Accessories -->
<div class="icon icon-apps-accessories-notepad"></div>
<div class="icon icon-apps-accessories-paint"></div>
<div class="icon icon-apps-accessories-calculator"></div>

<!-- Internet -->
<div class="icon icon-apps-internet-internet-explorer"></div>
<div class="icon icon-apps-internet-outlook"></div>

<!-- Multimedia -->
<div class="icon icon-apps-multimedia-media-player"></div>
<div class="icon icon-apps-multimedia-cd-player"></div>

<!-- Office -->
<div class="icon icon-apps-office-address-book"></div>
```

### File Type Icons

```html
<div class="icon icon-files-documents-document"></div>
<div class="icon icon-files-images-bitmap-image"></div>
<div class="icon icon-files-archives-zip-file"></div>
<div class="icon icon-files-system-files-ini-and-inf"></div>
```

### Hardware Icons

```html
<div class="icon icon-hardware-devices-keyboard"></div>
<div class="icon icon-hardware-network-network-connection"></div>
<div class="icon icon-hardware-printers-printer"></div>
<div class="icon icon-hardware-storage-hard-disk"></div>
```

### UI Icons

```html
<div class="icon icon-ui-toolbar-back"></div>
<div class="icon icon-ui-toolbar-forward"></div>
<div class="icon icon-ui-toolbar-refresh"></div>
```

## Filename Conventions

All icon filenames follow these standards:

✅ **Lowercase with hyphens**: `my-computer.png`  
✅ **Descriptive names**: `recycle-bin-full.png`  
✅ **No special chars**: `&` → `and` (e.g., `ini-and-inf.png`)  
✅ **Numbered icons prefixed**: `unknown-icon-1.png` instead of `1.png`  
✅ **Typos fixed**: `accesibility` → `accessibility`

## Size Modifiers

All icons scale from the 32x32px base using CSS:

```html
<div class="icon icon-system-my-computer size-16"></div>  <!-- 16x16 -->
<div class="icon icon-system-my-computer size-24"></div>  <!-- 24x24 -->
<div class="icon icon-system-my-computer size-32"></div>  <!-- 32x32 default -->
<div class="icon icon-system-my-computer size-48"></div>  <!-- 48x48 -->
<div class="icon icon-system-my-computer size-64"></div>  <!-- 64x64 -->
```

## Statistics

- **Total icons**: 879
- **Categories**: 5 top-level (system, apps, files, hardware, ui)
- **Subcategories**: 14 organized subcategories
- **Format**: PNG8 (8-bit indexed color)
- **Resolution**: 32x32px per icon
- **Total size**: 3.5MB source, 420KB bundled
- **Rendering**: CSS `image-rendering: pixelated` for crisp scaling

## Benefits of Organization

1. **Easy Discovery**: Find icons by logical category
2. **Hierarchical Naming**: Clear, structured class names
3. **Maintainable**: Easy to add/modify icons by category
4. **Scalable**: Can add more subcategories as needed
5. **Semantic**: Icon location reflects its purpose

## Auto-Generated

The SCSS file (`src/styles/abstracts/_icons.scss`) is automatically generated from the directory structure. The filesystem is the source of truth.

To add new icons:
1. Place PNG in appropriate category directory
2. Regenerate SCSS (one-time operation, already complete)
3. Use new icon class: `.icon-{path-with-hyphens}`

## Production Ready ✅

All 879 Windows 98 icons are:
- ✅ Organized into logical categories
- ✅ Properly named with clean conventions
- ✅ Optimized PNG8 format
- ✅ Auto-embedded as data URLs in CSS
- ✅ Ready for production use
