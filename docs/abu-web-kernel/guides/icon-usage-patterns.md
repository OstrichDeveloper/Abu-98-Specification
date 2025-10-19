---
id: icon-usage-patterns
title: Icon Usage Patterns
---

# Icon Usage Patterns Guide

## Overview

This guide helps developers choose the correct icons for their components and understand the icon system patterns used in the Abu 98 OS Web Kernel.

## Icon System Structure

### Base Icon Class
All icons use the base `.icon` class with specific modifier classes:

```html
<span class="icon icon-category-subcategory-name"></span>
```

### Icon Categories

The icon system is organized into logical categories:

#### 1. **Apps** (`icon-apps-*`)
Icons for applications and software programs.

**Pattern:** `icon-apps-{category}-{name}`

**Examples:**
- `icon-apps-accessories-notepad` - Notepad application
- `icon-apps-internet-internet-explorer` - Internet Explorer
- `icon-apps-multimedia-media-player` - Media Player

**Usage:**
```html
<!-- For application windows -->
<i class="icon icon-apps-accessories-notepad size-16"></i>

<!-- For desktop shortcuts -->
<div class="desktop-icon-image icon-apps-internet-internet-explorer"></div>
```

#### 2. **System** (`icon-system-*`)
Icons for system components, directories, and core functionality.

**Pattern:** `icon-system-{component}-{name}`

**Examples:**
- `icon-system-computer` - My Computer
- `icon-system-control-panel` - Control Panel
- `icon-system-recycle-bin-empty` - Empty Recycle Bin
- `icon-system-directory-open` - Open folder
- `icon-system-folder-closed` - Closed folder

**Usage:**
```html
<!-- For system components -->
<i class="icon icon-system-computer size-16"></i>

<!-- For file system items -->
<i class="icon icon-system-directory-open size-16"></i>
```

#### 3. **UI Elements** (`icon-ui-*`)
Icons for user interface elements, controls, and interactions.

**Pattern:** `icon-ui-{category}-{name}`

**Subcategories:**
- **Misc** (`icon-ui-misc-*`): General UI elements
- **Toolbar** (`icon-ui-toolbar-*`): Toolbar buttons and controls
- **Controls** (`icon-ui-controls-*`): Form controls and inputs

**Examples:**
- `icon-ui-misc-windows` - Windows logo (Start button)
- `icon-ui-misc-help` - Help icon
- `icon-ui-misc-find` - Search/find icon
- `icon-ui-toolbar-favorites` - Favorites toolbar button
- `icon-ui-toolbar-homepage` - Homepage toolbar button

**Usage:**
```html
<!-- For Start button -->
<span class="icon icon-ui-misc-windows win98-start-button__icon"></span>

<!-- For toolbar buttons -->
<i class="icon icon-ui-toolbar-favorites ie-toolbar-icon"></i>
```

#### 4. **Hardware** (`icon-hardware-*`)
Icons for hardware devices and peripherals.

**Pattern:** `icon-hardware-{category}-{name}`

**Examples:**
- `icon-hardware-devices-display-properties` - Display settings
- `icon-hardware-printers-printers` - Printer

**Usage:**
```html
<!-- For hardware settings -->
<i class="icon icon-hardware-devices-display-properties size-16"></i>
```

#### 5. **Files** (`icon-files-*`)
Icons for file types and file system elements.

**Pattern:** `icon-files-{category}-{name}`

**Examples:**
- `icon-files-system-files-log-off` - Log off

**Usage:**
```html
<!-- For file operations -->
<i class="icon icon-files-system-files-log-off size-16"></i>
```

## Size Modifiers

Icons support size modifiers for different contexts:

```html
<!-- Available sizes -->
<span class="icon icon-ui-misc-windows size-16"></span>  <!-- 16x16px -->
<span class="icon icon-ui-misc-windows size-24"></span>  <!-- 24x24px -->
<span class="icon icon-ui-misc-windows size-32"></span>  <!-- 32x32px -->
<span class="icon icon-ui-misc-windows size-48"></span>  <!-- 48x48px -->
<span class="icon icon-ui-misc-windows size-64"></span>  <!-- 64x64px -->
```

**Default size:** 32x32px (when no size modifier is specified)

## Common Usage Patterns

### 1. **Start Button**
```html
<span class="icon icon-ui-misc-windows win98-start-button__icon"></span>
```

### 2. **Desktop Icons**
```html
<div class="desktop-icon-image icon-system-computer"></div>
```

### 3. **Window Titlebars**
```html
<i class="icon {windowState.iconClass} size-16"></i>
```

### 4. **Toolbar Buttons**
```html
<i class="icon icon-ui-toolbar-favorites ie-toolbar-icon"></i>
```

### 5. **Menu Items**
```html
<i class="icon icon-apps-accessories-notepad size-16"></i>
```

## Icon Selection Guidelines

### For Applications
- Use `icon-apps-*` for software applications
- Choose the most specific category (accessories, internet, multimedia, office)
- Use the base application name (notepad, calculator, paint)

### For System Components
- Use `icon-system-*` for core system functionality
- Use `icon-system-computer` for "My Computer"
- Use `icon-system-control-panel` for settings
- Use `icon-system-directory-*` for folders

### For UI Elements
- Use `icon-ui-misc-*` for general UI elements
- Use `icon-ui-toolbar-*` for toolbar-specific buttons
- Use `icon-ui-misc-windows` for the Windows logo (Start button)

### For Hardware
- Use `icon-hardware-*` for device-related icons
- Use `icon-hardware-devices-*` for device settings
- Use `icon-hardware-printers-*` for printer-related icons

## Available Icons Reference

### Most Commonly Used Icons

#### System Icons
- `icon-system-computer` - My Computer
- `icon-system-control-panel` - Control Panel
- `icon-system-recycle-bin-empty` - Empty Recycle Bin
- `icon-system-directory-open` - Open folder
- `icon-system-folder-closed` - Closed folder
- `icon-system-network` - Network
- `icon-system-settings` - Settings

#### UI Icons
- `icon-ui-misc-windows` - Windows logo (Start button)
- `icon-ui-misc-help` - Help
- `icon-ui-misc-find` - Search/Find
- `icon-ui-misc-info` - Information
- `icon-ui-misc-run` - Run dialog
- `icon-ui-misc-shutdown` - Shutdown
- `icon-ui-misc-start` - Start menu
- `icon-ui-misc-taskbar` - Taskbar

#### Application Icons
- `icon-apps-accessories-notepad` - Notepad
- `icon-apps-internet-internet-explorer` - Internet Explorer
- `icon-apps-multimedia-media-player` - Media Player

#### Toolbar Icons
- `icon-ui-toolbar-favorites` - Favorites
- `icon-ui-toolbar-homepage` - Homepage
- `icon-ui-toolbar-search` - Search
- `icon-ui-toolbar-history` - History

## Best Practices

### 1. **Consistency**
- Always use the same icon for the same functionality
- Follow the established naming patterns
- Use appropriate size modifiers

### 2. **Accessibility**
- Icons should be paired with text labels when possible
- Use meaningful alt text for screen readers
- Ensure sufficient contrast

### 3. **Performance**
- Icons are loaded as CSS background images
- Use appropriate sizes to avoid unnecessary scaling
- Consider using size modifiers instead of CSS transforms

### 4. **Maintenance**
- When adding new icons, follow the established patterns
- Update this documentation when adding new categories
- Test icons in both light and dark themes

## Troubleshooting

### Icon Not Displaying
1. Check that the icon class name is correct
2. Verify the icon file exists in `src/assets/icons/`
3. Ensure the CSS rule is generated in `_icons.scss`
4. Check for typos in the class name

### Icon Size Issues
1. Use size modifiers (`size-16`, `size-24`, etc.)
2. Check CSS specificity conflicts
3. Verify the icon container has proper dimensions

### Icon Quality Issues
1. Icons are designed for pixelated rendering
2. Use `image-rendering: pixelated` for crisp edges
3. Avoid scaling icons beyond their intended sizes

## Adding New Icons

When adding new icons to the system:

1. **Place the icon file** in the appropriate directory under `src/assets/icons/`
2. **Follow the naming convention** for the file
3. **Regenerate the CSS** using the icon generation script
4. **Update this documentation** with the new icon
5. **Test the icon** in various contexts and sizes

## Icon Generation

The icon CSS is auto-generated from the file structure. To regenerate:

```bash
npm run generate-icons
```

This will scan the `src/assets/icons/` directory and update `src/styles/abstracts/_icons.scss` with all available icons.

---

*This guide should be updated whenever new icon categories or patterns are added to the system.*
