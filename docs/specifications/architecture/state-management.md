---
id: state-management
title: State Management
---

# State Management Specification

## Overview

State management uses **Svelte 5 runes** (`$state`, `$derived`, `$effect`) to provide fine-grained reactivity with automatic localStorage persistence. Four global stores coordinate to deliver the complete desktop experience.

## Design Principles

1. **Rune-Based Reactivity** - Svelte 5's fine-grained reactivity system
2. **Single Source of Truth** - Each state piece lives in exactly one store
3. **Automatic Persistence** - localStorage sync with intelligent debouncing
4. **Type Safety** - Full TypeScript types throughout
5. **Immutable Updates** - Store actions only, no direct mutations
6. **Derived State** - Computed values update automatically

## Store Architecture

```
Application Layer
     ↓
Store Layer (4 global stores)
  - windowManager
  - desktop
  - theme
  - audio
     ↓
Persistence Layer (localStorage)
```

## The Four Global Stores

### 1. windowManager

Manages window lifecycle, position, and focus.

**Base State:**
```
windows: WindowState[]          // All windows
focusedWindowId: string | null  // Currently focused window
nextZIndex: number              // Next available z-index
```

**Derived State:**
```
visibleWindows: WindowState[]    // Filter: !isMinimized
minimizedWindows: WindowState[]  // Filter: isMinimized
focusedWindow: WindowState | null  // Find by focusedWindowId
```

**Actions:**
```
open(pluginId, options?) → string    // Returns window ID
close(windowId) → void
minimize(windowId) → void
maximize(windowId) → void
restore(windowId) → void
focus(windowId) → void
move(windowId, position) → void
resize(windowId, size) → void
```

**Persistence:**
- Key: `abu-os-98:state:v1` (windows section)
- Trigger: All actions except focus()
- Debounce: 500ms
- Immediate: close()

---

### 2. desktop

Manages desktop icons and layout.

**Base State:**
```
items: DesktopItem[]           // All desktop icons
selectedItemId: string | null  // Currently selected icon
gridEnabled: boolean           // Auto-grid vs custom positions
```

**Derived State:**
```
selectedItem: DesktopItem | null     // Find by selectedItemId
sortedItems: DesktopItem[]           // Sort by position (top→bottom, left→right)
```

**Actions:**
```
addItem(item: DesktopItem) → void
removeItem(itemId: string) → void
moveItem(itemId: string, position: Position) → void
selectItem(itemId: string) → void
clearSelection() → void
activate(itemId: string) → void      // Execute item action
```

**DesktopItem Schema:**
```
id: string
label: string
iconClass: string
type: 'program' | 'folder' | 'file' | 'shortcut'
action: () => void
position?: Position                  // null = use grid
```

**Persistence:**
- Key: `abu-os-98:state:v1` (desktop section)
- Trigger: moveItem() only (custom positions)
- Debounce: 500ms

---

### 3. theme

Manages visual theme.

**Base State:**
```
current: 'light' | 'dark'
```

**Derived State:**
```
isDark: boolean                      // current === 'dark'
isLight: boolean                     // current === 'light'
```

**Actions:**
```
set(theme: Theme) → void
toggle() → void                      // Switch light ↔ dark
```

**Side Effects:**
- Updates `<body>` class: `theme-light` or `theme-dark`
- Updates `<html>` data attribute: `data-theme="light|dark"`
- Updates CSS custom properties

**Persistence:**
- Key: `abu-os-98:state:v1` (theme section)
- Trigger: set(), toggle()
- Debounce: Immediate (no debounce)

---

### 4. audio

Manages background music and sound effects.

**Base State:**
```
volume: number                  // 0-1
muted: boolean
playing: boolean
currentTrack: string | null     // Track URL
```

**Derived State:**
```
effectiveVolume: number          // muted ? 0 : volume
volumePercent: number            // Math.round(volume * 100)
```

**Actions:**
```
setVolume(value: number) → void  // Clamp 0-1
toggleMute() → void
play(trackUrl?: string) → void
pause() → void
stop() → void
```

**Side Effects:**
- Updates `<audio>` element volume
- Plays/pauses audio playback

**Persistence:**
- Key: `abu-os-98:state:v1` (audio section)
- Trigger: setVolume(), toggleMute()
- Debounce: 500ms (volume), Immediate (mute toggle)

## Persistence Strategy

### Debounced Writes

Prevents excessive localStorage I/O during rapid state changes.

**Debounce Rules:**
| Store | Action | Debounce |
|-------|--------|----------|
| windowManager | open/minimize/maximize/restore/move/resize | 500ms |
| windowManager | close | Immediate |
| windowManager | focus | None (not persisted) |
| desktop | moveItem | 500ms |
| theme | set/toggle | Immediate |
| audio | setVolume | 500ms |
| audio | toggleMute | Immediate |

**Implementation:**
- Separate timer per localStorage key
- clearTimeout() on each write attempt
- Batch multiple changes within window

### Read on Init

Each store reads once on initialization.

**Process:**
1. Call `restoreFromStorage(key, defaultValue)`
2. Parse JSON (try/catch)
3. Validate schema (basic type checking)
4. Apply to store state
5. On error: Log warning, use defaults

**Initialization Order:**
1. theme (affects rendering)
2. audio (user preference)
3. desktop (icon positions)
4. windowManager (requires plugins registered)

### Error Handling

| Error | Cause | Recovery |
|-------|-------|----------|
| QuotaExceededError | Storage full | Clear old state, retry once |
| SecurityError | Private mode | Fallback to in-memory Map |
| SyntaxError | Invalid JSON | Log error, use defaults |
| TypeError | Schema mismatch | Log error, use defaults |

## Store Coordination

### Example: Opening a Window

```
1. User clicks desktop icon
   ↓
2. desktop.activate(iconId)
   ↓
3. Icon's action() callback executes
   ↓
4. Action calls windowManager.open(pluginId)
   ↓
5. windowManager:
   - Creates WindowState
   - Adds to windows array
   - Calls focus(windowId)
   - Triggers $effect → debounced persist
   ↓
6. UI reactively updates (new Window component renders)
```

### Example: Theme Change

```
1. User clicks theme toggle in system tray
   ↓
2. theme.toggle()
   ↓
3. theme.current changes ('light' → 'dark')
   ↓
4. $effect: Updates <body> class
   ↓
5. $effect: Persists to localStorage (immediate)
   ↓
6. CSS custom properties update
   ↓
7. All components re-render with new theme
```

## Svelte 5 Runes Patterns

### $state - Reactive Variables

```
Primitive: let count = $state(0)
Object: let position = $state({x: 0, y: 0})
Array: let items = $state<Item[]>([])

Mutations are reactive:
- items.push(newItem) → triggers reactivity
- items[0].name = 'New' → triggers reactivity
- position.x = 100 → triggers reactivity
```

### $derived - Computed Values

```
Simple: const doubled = $derived(count * 2)
Multi-source: const fullName = $derived(`${first} ${last}`)
Complex: const sorted = $derived(items.sort((a,b) => a.id - b.id))

Automatically recomputes when dependencies change
```

### $effect - Side Effects

```
Basic:
  $effect(() => {
    console.log(`Count: ${count}`);
  });

With cleanup:
  $effect(() => {
    const timer = setInterval(() => tick(), 1000);
    return () => clearInterval(timer);
  });

Runs when dependencies change, cleanup runs before next effect
```

### Store Exports

```
Internal state:
  const windows = $state<WindowState[]>([]);

Export object:
  export const windowManager = {
    get all() { return windows; },        // Read-only access
    get count() { return windows.length; },
    open(pluginId) { ... },               // Mutating action
    close(windowId) { ... }
  };
```

## State Initialization

**Initialization Order in Shell.svelte:**

```
onMount(() => {
  1. pluginRegistry.registerAll(props.plugins)
  2. theme.init()                   // Affects visual rendering
  3. audio.init()                   // Restore user preferences
  4. desktop.init()                 // Position icons
  5. windowManager.init()           // Depends on plugins
});
```

**Each Store's init():**

```
Function signature: init() → void

Behavior:
1. Call restoreFromStorage(KEY, DEFAULT)
2. Validate data (check TTL, schema)
3. Apply to state
4. Handle errors gracefully (log, use defaults)
```

## Testing Strategy

### Unit Tests

**Store Actions:**
- windowManager.open() → creates window
- windowManager.close() → removes window
- windowManager.focus() → updates isFocused
- desktop.moveItem() → updates position
- theme.toggle() → switches theme
- audio.setVolume() → clamps 0-1

**Derived State:**
- visibleWindows → filters !isMinimized
- focusedWindow → finds by focusedWindowId
- effectiveVolume → respects muted

**Persistence:**
- Action → wait 500ms → verify localStorage
- Immediate action → verify immediate write
- init() with valid data → restores state
- init() with invalid data → uses defaults

### Integration Tests

**Full Workflows:**
1. Open window → drag → verify persist → refresh → verify restored
2. Toggle theme → verify localStorage → verify body class
3. Change volume → wait → verify localStorage
4. Multiple stores coordinate (desktop icon → open window)

## Performance Considerations

### Avoid Unnecessary Reactivity

```
❌ BAD: get all() { return windows.filter(w => !w.deleted); }
   → Creates new array on every access

✅ GOOD: const activeWindows = $derived(windows.filter(w => !w.deleted));
   → Cached, only recomputes when windows changes
```

### Batch State Updates

```
❌ BAD: 
  windows.push(w1); // Triggers effects
  windows.push(w2); // Triggers effects
  windows.push(w3); // Triggers effects

✅ GOOD:
  windows.push(w1, w2, w3); // Single trigger
```

### Debounce Expensive Operations

```
✅ Debounce localStorage writes (500ms)
✅ Don't persist focus changes (too frequent)
✅ Immediate persist for critical actions (close)
```

## Future Enhancements

### Undo/Redo

```
history: HistoryEntry[]
historyIndex: number

undo() → restore previous state
redo() → restore next state
```

### Time Travel Debugging

```
exportState() → full snapshot
importState(snapshot) → restore snapshot
```

### Store Plugins

```
registerStorePlugin(plugin) → extend stores
- Add custom actions
- Add custom derived state
- Hook into persistence
```

## Summary

State management provides:

- **4 global stores** - windowManager, desktop, theme, audio
- **Rune-based reactivity** - $state, $derived, $effect
- **Automatic persistence** - localStorage with debouncing
- **Type safety** - Full TypeScript throughout
- **Coordinated behavior** - Stores work together seamlessly
- **Forward compatibility** - Extensible schema versioning

All state changes reactive and automatically persisted.
