---
id: icon-quick-reference
title: Icon Quick Reference
---

# Icon Quick Reference

## Most Common Icons

### System Icons
| Icon | Class | Usage |
|------|-------|-------|
| 🖥️ | `icon-system-computer` | My Computer |
| ⚙️ | `icon-system-control-panel` | Control Panel |
| 🗑️ | `icon-system-recycle-bin-empty` | Recycle Bin |
| 📁 | `icon-system-directory-open` | Open folder |
| 📂 | `icon-system-folder-closed` | Closed folder |
| 🌐 | `icon-system-network` | Network |
| ⚙️ | `icon-system-settings` | Settings |

### UI Icons
| Icon | Class | Usage |
|------|-------|-------|
| 🪟 | `icon-ui-misc-windows` | **Start button** |
| ❓ | `icon-ui-misc-help` | Help |
| 🔍 | `icon-ui-misc-find` | Search/Find |
| ℹ️ | `icon-ui-misc-info` | Information |
| ▶️ | `icon-ui-misc-run` | Run dialog |
| 🔌 | `icon-ui-misc-shutdown` | Shutdown |
| 🏠 | `icon-ui-misc-start` | Start menu |
| 📋 | `icon-ui-misc-taskbar` | Taskbar |

### Application Icons
| Icon | Class | Usage |
|------|-------|-------|
| 📝 | `icon-apps-accessories-notepad` | Notepad |
| 🌐 | `icon-apps-internet-internet-explorer` | Internet Explorer |
| 🎵 | `icon-apps-multimedia-media-player` | Media Player |

### Toolbar Icons
| Icon | Class | Usage |
|------|-------|-------|
| ⭐ | `icon-ui-toolbar-favorites` | Favorites |
| 🏠 | `icon-ui-toolbar-homepage` | Homepage |
| 🔍 | `icon-ui-toolbar-search` | Search |
| 📜 | `icon-ui-toolbar-history` | History |

## Size Modifiers

```html
<!-- Available sizes -->
<span class="icon icon-ui-misc-windows size-16"></span>  <!-- 16x16px -->
<span class="icon icon-ui-misc-windows size-24"></span>  <!-- 24x24px -->
<span class="icon icon-ui-misc-windows size-32"></span>  <!-- 32x32px -->
<span class="icon icon-ui-misc-windows size-48"></span>  <!-- 48x48px -->
<span class="icon icon-ui-misc-windows size-64"></span>  <!-- 64x64px -->
```

## Common Patterns

### Start Button
```html
<span class="icon icon-ui-misc-windows win98-start-button__icon"></span>
```

### Desktop Icons
```html
<div class="desktop-icon-image icon-system-computer"></div>
```

### Window Titlebars
```html
<i class="icon {windowState.iconClass} size-16"></i>
```

### Toolbar Buttons
```html
<i class="icon icon-ui-toolbar-favorites ie-toolbar-icon"></i>
```

## Icon Categories

- **`icon-apps-*`** - Applications and software
- **`icon-system-*`** - System components and directories
- **`icon-ui-*`** - User interface elements
- **`icon-hardware-*`** - Hardware devices
- **`icon-files-*`** - File types and operations

## Quick Tips

1. **Start Button**: Always use `icon-ui-misc-windows`
2. **Default Size**: 32x32px (no modifier needed)
3. **Common Size**: 16x16px for UI elements (`size-16`)
4. **Desktop Icons**: Usually 32x32px (default)
5. **Toolbar Icons**: Usually 16x16px (`size-16`)

## Troubleshooting

- **Icon not showing?** Check the class name spelling
- **Wrong size?** Add a size modifier (`size-16`, `size-24`, etc.)
- **Need a new icon?** Add to `src/assets/icons/` and regenerate CSS

---

*For complete documentation, see [Icon Usage Patterns Guide](./icon-usage-patterns.md)*
