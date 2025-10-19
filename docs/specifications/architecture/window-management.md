---
id: window-management
title: Window Management
sidebar_position: 4
---

# Window Management Specification

## Overview

The Window Manager orchestrates the complete lifecycle of desktop windows: creation, positioning, sizing, focus management, state transitions, and destruction. It provides pixel-perfect Windows 98 window behavior while maintaining modern performance.

## Responsibilities

### Primary
1. Window lifecycle (open, close, minimize, maximize, restore)
2. Position management (initial placement, drag, viewport constraints)
3. Size management (initial sizing, resize, min/max enforcement)
4. Focus management (z-index stack, click-to-focus, keyboard)
5. State persistence (save/restore via localStorage)
6. Plugin integration (dynamic component loading)

### Secondary
1. Taskbar coordination (window list synchronization)
2. Desktop coordination (avoid icon overlap)
3. Modal management (dialog boxes)
4. Keyboard shortcuts (Alt+F4, Win+M, etc.)

## Window State Schema

### WindowState Interface

```
id: string                      // UUID v4
pluginId: string                // Plugin identifier
title: string                   // Titlebar text
iconClass: string               // CSS class for icon
position: {x: number, y: number}     // Top-left corner (px)
size: {width: number, height: number}  // Dimensions (px)
zIndex: number                  // Stacking order
isMinimized: boolean            // Hidden from desktop
isMaximized: boolean            // Fills viewport (exclusive with isMinimized)
isFocused: boolean              // Top of z-stack
isResizable: boolean            // Allow resize operations
preMaximizeBounds?: {           // Saved bounds before maximize
  x: number,
  y: number,
  width: number,
  height: number
}
```

### State Constraints

**Position:**
- x: -9999 to window.innerWidth (allows partial off-screen)
- y: 0 to window.innerHeight - TASKBAR_HEIGHT - TITLEBAR_HEIGHT
- Minimum visible titlebar: 100px must remain on-screen

**Size:**
- width: ≥ 200px (MIN_WINDOW_SIZE.width)
- height: ≥ 100px (MIN_WINDOW_SIZE.height)
- width: ≤ window.innerWidth - 40px
- height: ≤ window.innerHeight - TASKBAR_HEIGHT - 40px

**State Exclusivity:**
- isMinimized AND isMaximized: **Never both true**
- isMinimized: window not rendered
- isMaximized: position = \{0, 0\}, size = viewport - taskbar

**Z-Index:**
- Base: Z_INDEX.WINDOW_BASE (100)
- Range: 100 to 100 + window count
- Focused window: highest z-index
- Compaction: Every 100 focus changes

## State Transitions

### State Diagram

```
[Closed] 
   │
   ├─ open() ────────────────────┐
   │                             ▼
   │                         [Normal]
   │                          │  │  │
   │    ┌─────────────────────┘  │  └──────┐
   │    │ minimize()              │          │ maximize()
   │    ▼                         │          ▼
   │ [Minimized]                  │      [Maximized]
   │    │                         │          │
   │    │ restore()               │          │ restore()
   │    └─────────────────────────┤          │
   │                              │ ◄────────┘
   │                              │
   │ close()                      │ close()
   ▼                              ▼
[Closed]                       [Closed]
```

### Transition Rules

**open(pluginId, options?) → [Normal]**
- Creates new WindowState with unique ID
- Position: options.position OR cascade algorithm
- Size: options.size OR plugin.defaultSize OR DEFAULT_WINDOW_SIZE
- State: isMinimized=false, isMaximized=false, isFocused=true
- Z-Index: nextZIndex++
- Persistence: Debounced (500ms)
- Validation: Plugin must be registered, < MAX_WINDOWS
- Side Effects: Focuses window, adds to taskbar

**close(windowId) → [Closed]**
- Removes WindowState from collection
- Focus: If closed window was focused, focus next highest z-index
- Persistence: Immediate (no debounce)
- Side Effects: Removes from taskbar, plugin cleanup

**minimize(windowId) → [Minimized]**
- Sets isMinimized=true, isFocused=false
- Focus: Next non-minimized window by z-index
- Rendering: Window component unmounts
- Taskbar: Button remains, grayed out
- Persistence: Debounced (500ms)

**maximize(windowId) → [Maximized]**
- Saves current bounds to preMaximizeBounds
- Sets position=\{0, 0\}
- Sets size=\{viewport.width, viewport.height - TASKBAR_HEIGHT\}
- Sets isMaximized=true, isFocused=true
- Persistence: Debounced (500ms)

**restore(windowId) → [Normal]**
- From Minimized: Sets isMinimized=false, isFocused=true
- From Maximized: Restores preMaximizeBounds, sets isMaximized=false
- Focus: Window brought to front
- Persistence: Debounced (500ms)

**focus(windowId) → update isFocused**
- Sets target window isFocused=true
- Sets all other windows isFocused=false
- Updates z-index if window not already on top
- Side Effects: Taskbar button highlighted
- Persistence: None (focus changes too frequent)
- Special: If target isMinimized, calls restore() first

**clearAllFocus() → unfocus all windows**
- Sets all windows' isFocused=false
- Resets focusedWindowId to null
- Visual: All windows show inactive titlebar
- Persistence: None (too frequent)
- Use cases: Desktop click, Escape key

**move(windowId, position) → update position**
- Constraints: Apply viewport bounds (min visible titlebar)
- Blocked: If isMaximized=true
- Side Effects: None
- Persistence: Debounced (500ms)

**resize(windowId, size, position?) → update size/position**
- Constraints: width ≥ 200px, height ≥ 100px
- Blocked: If isMaximized=true OR isResizable=false
- Position update: For top/left handle resize
- Side Effects: None
- Persistence: Debounced (500ms)

## Position Management

### Cascade Algorithm

New windows open in cascading pattern:

**Algorithm:**
1. Start: x=100, y=100
2. Each new window: x += 32px, y += 32px
3. Reset: After offset > 160px (5 windows)
4. Result: Staircase pattern (like Windows 98)

**Constants:**
- CASCADE_STEP: 32px
- CASCADE_MAX: 160px (5 * 32px)

### Viewport Constraints

**Horizontal:**
- Minimum visible width: 100px of titlebar
- Allow partial off-screen: x ≥ (- window.width + 100)
- Right boundary: x ≤ viewport.width - 100

**Vertical:**
- Top boundary: y ≥ 0
- Bottom boundary: y ≤ viewport.height - TASKBAR_HEIGHT - TITLEBAR_HEIGHT

**Maximize Bounds:**
- Position: {0, 0}
- Width: viewport.width
- Height: viewport.height - TASKBAR_HEIGHT

### Snap-to-Edge (Future)

- Threshold: 10px from edge
- Snap positions: Left edge (x=0), Right edge (x=max), Top (y=0)
- Behavior: Magnetic attraction during drag

## Focus Management

### Z-Index Stack

**Ordering:**
- Windows sorted by z-index (highest = topmost)
- Focused window = highest z-index
- Base z-index: Z_INDEX.WINDOW_BASE (100)
- Increment: +1 per window

**Focus Rules:**
- Click anywhere on window → focus
- Open new window → auto-focus
- Close focused window → focus next highest
- Minimize focused window → focus next visible
- Taskbar button click → focus/restore window

**Z-Index Compaction:**
- Trigger: Every 100 focus operations
- Algorithm: Re-assign z-indices sequentially (100, 101, 102, ...)
- Purpose: Prevent unbounded growth

### Keyboard Shortcuts

| Shortcut | Action | Condition |
|----------|--------|-----------|
| Alt+F4 | Close focused window | Window focused |
| Win+M | Minimize all windows | Any |
| Win+Shift+M | Restore all windows | Any |
| Alt+Tab | Focus next window | >1 window (future) |
| Alt+Shift+Tab | Focus previous window | >1 window (future) |
| Esc | Close modal | Modal window focused (future) |

## Persistence Specification

### Save to localStorage

**Key:** `abu-os-98:state:v1`

**Saved Data (per window):**
```
{
  pluginId: string,
  position: {x, y},
  size: {width, height},
  state: 'normal' | 'minimized' | 'maximized',
  preMaximizeBounds?: {x, y, width, height}
}
```

**Trigger Conditions:**
| Action | Debounce |
|--------|----------|
| open() | 500ms |
| close() | Immediate |
| minimize() | 500ms |
| maximize() | 500ms |
| restore() | 500ms |
| move() | 500ms |
| resize() | 500ms |
| focus() | None (not persisted) |

**Error Handling:**
- QuotaExceededError: Clear expired state (TTL > 7 days), retry once
- SecurityError: Fallback to in-memory storage
- SyntaxError: Log error, continue with defaults

### Restore from localStorage

**Trigger:** Application initialization (Shell mount)

**Process:**
1. Read key `abu-os-98:state:v1`
2. Validate schema version (current: 1)
3. Check TTL (max: 7 days)
4. For each window state:
   a. Verify plugin registered
   b. Call open(pluginId, \{position, size\})
   c. Apply state (minimized/maximized)
5. Ignore invalid entries (log warning)

**Validation Rules:**
- Missing plugin: Skip window, log warning
- Invalid position: Use cascade default
- Invalid size: Use plugin default or MIN_WINDOW_SIZE

## Dimensions & Constants

### Window Constraints

```
MIN_WINDOW_SIZE:
  width: 200px
  height: 100px

DEFAULT_WINDOW_SIZE:
  width: 600px
  height: 400px

MAX_WINDOW_SIZE (computed):
  width: viewport.width - 40px
  height: viewport.height - TASKBAR_HEIGHT - 40px
```

### Window Chrome

```
TITLEBAR_HEIGHT: 24px
RESIZE_HANDLE_SIZE: 8px (on each edge)
DRAG_THRESHOLD: 3px (before drag starts)
```

### System Limits

```
MAX_WINDOWS: 20
Z_INDEX.WINDOW_BASE: 100
Z_INDEX_COMPACT_THRESHOLD: 100 focus operations
```

### Performance Targets

```
STORAGE_DEBOUNCE_MS: 500ms
FOCUS_CHANGE_MAX_FREQUENCY: 60 fps
RENDER_ONLY_VISIBLE: true (minimized windows not rendered)
```

## Modal Windows (Future)

### Modal State

```
isModal: boolean
parentId: string | null          // Parent window ID
disableParent: boolean           // Disable interaction with parent
```

### Modal Behavior

- Modal window z-index: Always > parent z-index
- Click parent: Focus modal instead
- Close modal: Return focus to parent
- Esc key: Close modal
- Parent cannot be focused while modal open (if disableParent=true)

## Error Conditions

### Invalid Operations

| Operation | Condition | Behavior |
|-----------|-----------|----------|
| open() | Plugin not registered | Throw Error |
| open() | MAX_WINDOWS reached | Throw Error |
| close() | Window not found | Silent ignore |
| minimize() | Window not found | Silent ignore |
| maximize() | Window not found | Silent ignore |
| restore() | Window not found | Silent ignore |
| focus() | Window not found | Silent ignore |
| move() | Window maximized | Silent ignore |
| resize() | Window maximized | Silent ignore |
| resize() | Window not resizable | Silent ignore |

### Recovery Strategies

**localStorage Failure:**
1. Detect: Try/catch on localStorage operations
2. Fallback: In-memory `Map<string, string>`
3. Warning: Log once on startup
4. Behavior: State lost on refresh (expected)

**Invalid Restore Data:**
1. Detect: JSON.parse error OR schema validation failure
2. Action: Log error, skip invalid window
3. Continue: Restore remaining valid windows
4. Persistence: Overwrite with valid state on next save

## Testing Requirements

### Unit Test Coverage

**Window Lifecycle:**
- open() → creates window with correct defaults
- open() with options → uses provided position/size
- open() exceeding MAX_WINDOWS → throws error
- close() focused window → focuses next window
- close() only window → no focused window
- minimize() → sets isMinimized=true, isFocused=false
- maximize() → saves bounds, fills viewport
- restore() from minimized → shows window, focuses
- restore() from maximized → restores bounds

**Focus Management:**
- focus() → sets isFocused=true
- focus() → unfocuses other windows
- focus() minimized window → restores first
- focus() updates z-index
- focus() 100 times → triggers compaction

**Position/Size:**
- move() → updates position
- move() maximized → no change
- resize() → updates size
- resize() enforces MIN_WINDOW_SIZE
- resize() when not resizable → no change

**Persistence:**
- open() → debounced localStorage write
- close() → immediate localStorage write
- restore() valid state → recreates windows
- restore() expired state (TTL) → ignores
- restore() invalid plugin → skips window

### Integration Test Coverage

**Full Workflows:**
1. Open window → drag → resize → close → verify localStorage
2. Open multiple windows → close middle → verify focus shift
3. Maximize window → restore → verify bounds restored
4. Minimize all → restore all → verify states
5. Refresh page → verify windows restored with correct state

## Performance Optimizations

### Rendering

- Virtual rendering: Only render visible (not minimized) windows
- Lazy mount: Plugin components loaded on-demand
- Unmount on minimize: Free DOM resources

### Persistence

- Debounced writes: Avoid excessive localStorage I/O
- Batch updates: Multiple changes within window → single write
- Immediate critical: close() writes immediately

### Focus Management

- Z-index compaction: Prevent unbounded growth
- Focus filtering: Ignore rapid focus changes (less than 16ms)

## Summary

Window Management provides:

- **Complete lifecycle** - Open, close, minimize, maximize, restore
- **Position/size control** - Cascade, drag, resize, constraints
- **Focus management** - Z-index stack, keyboard shortcuts
- **State persistence** - Automatic localStorage save/restore
- **Windows 98 fidelity** - Pixel-perfect behavior
- **Performance** - Debouncing, virtual rendering, compaction

Dimensions, constraints, and behaviors precisely defined for implementation.
