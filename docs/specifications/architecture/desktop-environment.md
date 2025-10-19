---
id: desktop-environment
title: Desktop Environment
---

# Desktop Environment Specification

## Overview

The Desktop Environment comprises all chrome and UI elements of the Windows 98 shell: desktop background with icons, taskbar with Start button, Start menu, and system tray. These components create the familiar desktop metaphor users interact with.

## Component Hierarchy

```
Shell (root)
├── Desktop
│   ├── Background (solid color or gradient)
│   └── DesktopIcon[] (multiple instances, positioned via grid)
├── WindowManager
│   └── Window[] (see window-management.md)
└── Taskbar
    ├── StartButton
    ├── StartMenu (conditionally rendered)
    ├── TaskbarButton[] (one per open window)
    └── SystemTray
        ├── VolumeControl
        ├── ThemeToggle
        └── Clock
```

## Desktop Component

### Responsibilities

1. **Background** - Render solid teal (light theme) or blue gradient (dark theme)
2. **Icon Grid** - Auto-arrange icons in vertical columns
3. **Icon Selection** - Single-click selection, double-click activation
4. **Drag & Drop** - Allow custom icon positioning
5. **Context Menu** - Right-click desktop menu with full functionality

### Desktop State

```
items: DesktopItem[]
selectedItemId: string | null
gridEnabled: boolean

DesktopItem:
  id: string
  label: string
  iconClass: string
  type: 'program' | 'folder' | 'file' | 'shortcut'
  action: () => void
  position?: Position    // null = use auto-grid
```

### Grid Layout Specification

**Algorithm: Vertical-first, then wrap to columns**

```
Constants:
  DESKTOP_ICON_SIZE: 80px (icon + label combined)
  DESKTOP_ICON_GAP: 16px
  DESKTOP_MARGIN: 8px

Calculation:
  viewportHeight = window.innerHeight - TASKBAR_HEIGHT
  iconsPerColumn = floor((viewportHeight - 2*MARGIN) / (SIZE + GAP))
  
  For icon at index N:
    column = floor(N / iconsPerColumn)
    row = N % iconsPerColumn
    x = MARGIN + column * (SIZE + GAP)
    y = MARGIN + row * (SIZE + GAP)
```

**Example Layout (viewport height 600px, taskbar 28px):**
```
Icons per column = floor((600-28-16) / 96) = 5

[0] [5] [10]
[1] [6] [11]
[2] [7] [12]
[3] [8] [13]
[4] [9] [14]
```

### Icon Interaction

**Selection:**
- Single-click: Select icon after 200ms delay (if no second click), clear previous selection
- Click timeout allows double-click to interrupt selection
- Ctrl+Click selected icon: Clear selection (future)
- Click desktop background: Clear all selections
- State: Updates `selectedItemId`

**Activation:**
- Double-click: Execute icon's `action()` immediately, cancels pending selection
- Enter key (when selected): Execute action, clear selection (future)

**Drag & Drop:**
- Drag start: Save cursor offset from icon top-left
- Drag move: Update icon position in real-time (visual feedback)
- Drag end: Persist position to localStorage, disable grid for this icon
- Constraint: Icons can be positioned anywhere (no snap-to-grid during drag)

**Keyboard Navigation:**
- Arrow Down: Select next icon (by grid order)
- Arrow Up: Select previous icon
- Enter: Activate selected icon
- Delete: Delete selected icon (if deletable, future)
- F5: Reset all positions to grid (future)

### Background Rendering

**Light Theme:**
- Background color: #008080 (solid teal)
- No gradient

**Dark Theme:**
- Background: Linear gradient top-to-bottom
- Start color: #000080 (dark blue)
- End color: #1084d0 (lighter blue)

**Dimensions:**
- Position: absolute, top: 0, left: 0, right: 0
- Bottom: viewport.height - TASKBAR_HEIGHT

### Desktop Focus Management

**Click Behavior:**
- Click on desktop background: Clear all window focus
- Click on window: Focus that window
- Desktop captures clicks at shell level

**Implementation:**
- Shell component listens for clicks on `.shell` or `.desktop` elements
- Calls `windowManager.clearAllFocus()`
- Windows have higher z-index, so clicks on them don't bubble to shell

## Desktop Icons

### Terminal Icons

The desktop includes two terminal-related icons:

#### SSH Terminal
- **ID**: `ssh-terminal`
- **Label**: "SSH Terminal"
- **Icon**: `icon-ui-misc-ms-dos`
- **Function**: Opens `BuiltinMSDOS` component for real SSH connections via WebSocket/ttyd
- **Purpose**: Connect to remote systems with full terminal emulation and streaming

#### Terminal
- **ID**: `terminal`
- **Label**: "Terminal"
- **Icon**: `icon-ui-misc-ms-dos`
- **Function**: Opens `BuiltinTerminal` component for simple command-line interface
- **Purpose**: Local command execution with DOS-style interface

### Context Menu Integration

Desktop icons support full right-click context menu functionality:

**Context Menu Actions:**
- **Open**: Activate the icon's primary action
- **Open With**: Submenu for alternative applications (currently opens with default action)
- **Cut/Copy**: Clipboard operations for icon manipulation
- **Create Shortcut**: Duplicate the icon as a shortcut
- **Delete**: Remove the icon (with confirmation)
- **Rename**: Edit the icon's display name
- **Properties**: Show icon details and metadata

**Implementation:**
- Icons have `data-item-id` attribute for identification
- Context menu handlers query DOM to find target icon
- All operations integrate with desktop store for persistence

## Taskbar Component

### Responsibilities

1. **Start Button** - Toggle Start menu visibility
2. **Task Buttons** - One button per open window (synced with windowManager)
3. **System Tray** - Display clock, volume, theme toggle
4. **Active Indication** - Highlight button for focused window
5. **Window Control** - Click to focus/minimize window

### Taskbar Layout

```
┌──────────────────────────────────────────────────────────────────┐
│ [Start] │ [Window 1] │ [Window 2] │ ... │ [Vol] [Theme] [Clock] │
└──────────────────────────────────────────────────────────────────┘

Fixed height: 28px
Position: bottom: 0, left: 0, right: 0
Z-index: 1000 (above windows)
```

### Start Button

**Dimensions:**
- Height: 28px (fills taskbar)
- Padding: 0 8px
- Icon size: 16x16px
- Text: "Start" (MS Sans Serif, 11px, bold)

**Visual States:**
- Normal: Border 2px outset
- Active (menu open): Border 2px inset
- Pressed: Border 2px inset

**Behavior:**
- Click: Toggle Start menu visibility
- State: menuOpen = !menuOpen

### Task Buttons

**One button per window, showing:**
- Icon: 16x16px (window.iconClass)
- Title: window.title (ellipsis if too long)

**Dimensions:**
- Height: 28px (fills taskbar)
- Min width: 120px
- Max width: 180px
- Padding: 0 8px

**Visual States:**
- Normal: Border 2px outset
- Active (window focused, not minimized): Border 2px inset, background highlighted
- Minimized: Opacity 0.7

**Behavior:**
- Click when window focused & not minimized: Minimize window
- Click when window minimized: Restore & focus window
- Click when window not focused: Focus window
- Order: Left-to-right by window open time

### System Tray

**Layout:**
- Position: Right edge of taskbar
- Border-left: 2px solid (separator from task buttons)
- Padding: 0 4px
- Gap between items: 2px

**Components (left-to-right):**
1. Volume Control
2. Theme Toggle
3. Clock

### Clock

**Display Format:**
- 12-hour format: "H:MM AM/PM"
- Example: "3:45 PM"
- Font: MS Sans Serif, 11px
- Update: Every 1 second

**Dimensions:**
- Icon: 16x16px (clock icon)
- Padding: 2px 8px
- Border: 2px inset

### Volume Control

**Button:**
- Size: 20x20px
- Icon: 16x16px (volume or volume-muted)
- Title tooltip: "Volume: \{percent\}%"

**Slider (shown on click):**
- Position: Absolute, bottom: 100%, right: 0
- Size: 32px wide × 120px tall
- Background: button-face color
- Border: 2px outset
- Slider: Rotated -90deg (vertical)

**Behavior:**
- Click button: Toggle slider visibility
- Double-click button: Toggle mute
- Drag slider: Update audio.volume (0-1)
- Click outside: Close slider

### Theme Toggle

**Button:**
- Size: 20x20px
- Icon: Sun (if dark theme) or Moon (if light theme)
- Title tooltip: "Toggle theme"

**Behavior:**
- Click: Call theme.toggle()
- Immediate visual feedback (no animation)

## Start Menu Component

### Structure

```
┌────────────────────────────────┐
│ Programs                    ▶  │
│ Documents                   ▶  │
│ Settings                       │
│ ────────────────────────────   │
│ Shut Down                      │
└────────────────────────────────┘
```

**Position:**
- Absolute, bottom: 100% (above taskbar), left: 0
- Z-index: 1100 (above taskbar)

**Dimensions:**
- Min width: 200px
- Width: Auto-expand based on content
- Height: Auto-expand based on items

**Visual:**
- Background: button-face (#C0C0C0)
- Border: 2px outset
- Box shadow: 2px 2px 0 rgba(0,0,0,0.5)

### Menu Data Schema

```
MenuItem:
  id: string
  label: string
  iconClass?: string
  action?: () => void           // Leaf item (executes action)
  submenu?: MenuItem[]          // Branch item (shows submenu)
  divider?: boolean             // Horizontal line
```

**Default Menu Items:**
1. Programs (submenu: registered plugins)
2. Documents (submenu: future)
3. Settings (action: open settings window)
4. [Divider]
5. Shut Down (action: show shut down dialog)

**Programs Submenu:**
- Dynamically generated from pluginRegistry.getAllPlugins()
- Each plugin → MenuItem with plugin.name, plugin.defaultIcon
- Action: windowManager.open(plugin.id), close menu

### Menu Behavior

**Opening:**
- Trigger: Click Start button
- Action: Render menu above Start button, set menuOpen=true

**Navigation:**
- Mouse hover: Highlight item
- Click leaf item: Execute action, close menu
- Click branch item: Show submenu (future: nested menus)
- Arrow keys: Navigate up/down (future)
- Enter: Activate highlighted item (future)
- Esc: Close menu

**Closing:**
- Click outside menu: Close menu
- Click Start button again: Close menu
- Execute menu action: Close menu
- Esc key: Close menu

### Menu Item Rendering

**Normal Item:**
- Height: 24px
- Padding: 4px 8px
- Icon: 16x16px (left-aligned)
- Label: MS Sans Serif, 11px (left-padded 4px from icon)
- Arrow (if submenu): ▶ (right-aligned)

**Hover State:**
- Background: Highlight color
- Text: Highlight text color

**Divider:**
- Height: 2px
- Margin: 2px 0
- Background: button-shadow color

## Desktop Persistence

**Key:** `abu-os-98:state:v1` (desktop section)

**Persisted Data:**
```
{
  layout: 'grid' | 'custom',
  icons: [
    {
      id: string,
      position?: {x, y},    // Only if custom positioned
      hidden?: boolean      // Future
    }
  ]
}
```

**Trigger:**
- Action: moveItem() (when icon dragged)
- Debounce: 500ms

**Restoration:**
- Read on desktop.init()
- Apply custom positions to matching icon IDs
- Icons without saved position use auto-grid

## Keyboard Shortcuts

### Desktop

| Shortcut | Action | Condition |
|----------|--------|-----------|
| F5 | Reset all icons to grid | Any |
| Delete | Delete selected icon | Icon selected, deletable |
| Enter | Activate selected icon | Icon selected |
| Arrow Up/Down/Left/Right | Navigate icon selection | Any |

### Start Menu

| Shortcut | Action | Condition |
|----------|--------|-----------|
| Ctrl+Esc | Open Start menu | Menu closed |
| Win | Open Start menu | Menu closed |
| Esc | Close Start menu | Menu open |
| Arrow Up/Down | Navigate menu items | Menu open (future) |
| Enter | Activate highlighted item | Menu open (future) |

### Global

| Shortcut | Action |
|----------|--------|
| Win+D | Show desktop (minimize all) |
| Win+M | Minimize all windows |
| Win+Shift+M | Restore all windows |

## Testing Requirements

### Desktop Tests

**Icon Grid:**
- Render N icons → verify positions match grid algorithm
- Viewport resize → verify grid recalculates

**Icon Interaction:**
- Single-click icon → verify selected after 200ms delay
- Double-click icon → verify action executes immediately, no selection occurs
- Click background → verify selection cleared

**Icon Drag:**
- Drag icon → verify position updates
- Drop icon → verify persisted to localStorage

### Taskbar Tests

**Task Buttons:**
- Open N windows → verify N task buttons rendered
- Close window → verify task button removed
- Focus window → verify task button highlighted

**Task Button Interaction:**
- Click focused window button → verify minimized
- Click minimized window button → verify restored
- Click unfocused window button → verify focused

**Start Menu:**
- Click Start → verify menu opens
- Click outside → verify menu closes
- Click menu item → verify action executes, menu closes

### System Tray Tests

**Clock:**
- Mount → verify displays current time
- Wait 60s → verify updates

**Volume:**
- Click → verify slider appears
- Drag slider → verify audio.volume updates
- Double-click → verify audio.muted toggles

**Theme:**
- Click → verify theme toggles
- Verify `<body>` class updates
- Verify localStorage persists

## Performance Optimizations

### Virtual Icon Rendering

**Threshold:** `> 100` icons

**Algorithm:**
- Calculate viewport rect
- Filter icons to visible area ± 1 screen margin
- Only render visible icons
- Update on scroll (future)

### Debounced Persistence

**Icon Drag:**
- Update position in-memory immediately (visual feedback)
- Debounce localStorage write (500ms after drag ends)

**Avoid:**
- Persisting selection changes (too frequent, not important)
- Persisting hover states (transient)

## Future Enhancements

### Desktop Context Menu

**Right-click desktop → Show menu:**
- Arrange Icons (Auto, By Name, By Type, By Date)
- Refresh
- New (Folder, Shortcut)
- Properties

### Taskbar Customization

- Position: Bottom, Top, Left, Right
- Auto-hide: Yes/No
- Always on top: Yes/No

### Multiple Desktops

- Virtual desktops (Workspace 1, 2, 3, ...)
- Switch via Win+Ctrl+Left/Right

## Summary

Desktop Environment provides:

- **Desktop** - Icon grid with auto-layout and custom positioning
- **Taskbar** - Start button, task buttons (one per window), system tray
- **Start Menu** - Dynamic menu from registered plugins
- **System Tray** - Clock, volume control, theme toggle
- **Keyboard Navigation** - Full keyboard support
- **State Persistence** - Icon positions saved to localStorage
- **Windows 98 Fidelity** - Pixel-perfect visual and behavioral match

All dimensions, colors, behaviors, and interactions precisely defined for implementation.
