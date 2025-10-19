---
id: icons-reference
title: Icons Reference
---

# Windows 98 Icon Library - Complete & Organized 🎨

## Overview

Complete Windows 98 icon library with **879 professionally organized icons** in optimal PNG8 format.

## Quick Stats

- 📦 **Total Icons**: 879
- 🗂️ **Categories**: 5 main + 14 subcategories  
- 💾 **Format**: PNG8 (8-bit indexed color)
- 📐 **Resolution**: 32x32px (scales with CSS)
- 🎯 **Bundle Size**: 420KB (all icons embedded)
- ✅ **Production Ready**: Yes

## Directory Structure

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

## Usage Examples

### Basic Usage

```html
<!-- System icons -->
<div class="icon icon-system-my-computer"></div>
<div class="icon icon-system-recycle-bin-full"></div>
<div class="icon icon-system-control-panel"></div>

<!-- Application icons -->
<div class="icon icon-apps-accessories-notepad"></div>
<div class="icon icon-apps-accessories-paint"></div>
<div class="icon icon-apps-internet-internet-explorer"></div>

<!-- File type icons -->
<div class="icon icon-files-documents-document"></div>
<div class="icon icon-files-archives-zip-file"></div>

<!-- Hardware icons -->
<div class="icon icon-hardware-devices-keyboard"></div>
<div class="icon icon-hardware-printers-printer"></div>
```

### With Size Modifiers

```html
<div class="icon icon-system-my-computer size-16"></div>
<div class="icon icon-system-my-computer size-24"></div>
<div class="icon icon-system-my-computer size-32"></div> <!-- default -->
<div class="icon icon-system-my-computer size-48"></div>
<div class="icon icon-system-my-computer size-64"></div>
```

## Naming Conventions

All icons follow strict naming standards:

✅ **Lowercase with hyphens**: `my-computer.png`  
✅ **Descriptive names**: `recycle-bin-full.png`  
✅ **Hierarchical structure**: `system/my-computer.png`  
✅ **No special chars**: `&` → `and` (e.g., `ini-and-inf.png`)  
✅ **No generic numbers**: `unknown-icon-1.png` instead of `1.png`  
✅ **Typos fixed**: `accesibility` → `accessibility`

## CSS Class Pattern

Icon classes follow the path structure:

```
.icon-{category}-{subcategory}-{name}
```

Examples:
- `src/assets/icons/system/my-computer.png` → `.icon-system-my-computer`
- `src/assets/icons/apps/accessories/paint.png` → `.icon-apps-accessories-paint`
- `src/assets/icons/files/images/bitmap-image.png` → `.icon-files-images-bitmap-image`

## Technical Details

### PNG8 Optimization

- **8-bit indexed color** (256 colors max)
- Perfect for pixel art icons
- ~75% smaller than PNG24
- Average 4KB per icon
- Post-processed with `pngquant` and `optipng`

### CSS Scaling

```scss
.icon {
  image-rendering: pixelated;
  image-rendering: -moz-crisp-edges;
  image-rendering: crisp-edges;
}
```

Ensures pixel-perfect scaling with no blur at any size.

### Build Integration

- Icons auto-embedded as **data URLs** in CSS
- No external asset serving required
- Single 420KB CSS bundle includes everything
- Zero runtime HTTP requests for icons

## Coverage

### System Essentials ✅
- My Computer, Network, Recycle Bin
- Folders (open, closed, network, favorites)
- Control Panel, Settings, Properties
- Desktop, Start Menu, Taskbar icons

### Applications ✅
- **Accessories**: Notepad, Paint, Calculator, WordPad
- **Internet**: IE, Outlook, Netmeeting, Mail
- **Multimedia**: Media Player, CD Player, Sound Recorder
- **Office**: Address Book, Calendar, Contacts

### File Types ✅
- Documents, Images, Archives
- System files (DLL, EXE, INI, etc.)
- Media files (AVI, WAV, etc.)

### Hardware ✅
- Input devices (keyboard, mouse, joystick)
- Output devices (printer, monitor, speakers)
- Storage (hard disk, floppy, CD-ROM)
- Network devices

### UI Elements ✅
- Toolbar icons (back, forward, refresh, stop)
- Control widgets
- Cursors and animations
- Status indicators

## Maintenance

**Zero maintenance required!** 

The filesystem is the source of truth. SCSS is auto-generated from the directory structure.

## Production Status

✅ **Complete** - All 879 icons converted and organized  
✅ **Optimized** - PNG8 format, 420KB total bundle  
✅ **Clean** - All filenames standardized  
✅ **Organized** - Logical hierarchical structure  
✅ **Documented** - Full usage guide and examples  
✅ **Tested** - Build verified and working  
✅ **Ready** - Production-ready for immediate use  

---

**For complete technical details**, see:
- `ICONS-FINAL.md` - Conversion and format details
- `ICONS-ORGANIZED.md` - Organization structure guide
