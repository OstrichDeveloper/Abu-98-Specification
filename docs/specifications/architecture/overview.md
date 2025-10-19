---
id: overview
title: Overview
---

# System Architecture Overview

## Philosophy

Abu OS 98 Web Kernel is a complete Windows 98 operating system emulation library, not just a UI toolkit. It provides a full desktop environment with window management, state persistence, and a plugin system for building authentic retro applications.

## Core Principles

1. **OS Emulation First** - Think like an OS, not a component library
2. **Plugin Architecture** - Extensible through registered window and desktop plugins
3. **State Persistence** - Automatic save/restore via localStorage
4. **Performance Obsessed** - Bundle size `< 50`KB gzipped
5. **100% Test Coverage** - No exceptions
6. **Tree-Shakeable** - Only import what you use

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Application Layer                         │
│  (Consumer applications register plugins and mount Shell)        │
└─────────────────────────────────────────────────────────────────┘
                              ↓ uses
┌─────────────────────────────────────────────────────────────────┐
│                   Abu OS 98 Web Kernel (Library)                 │
│                                                                   │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Component Layer                         │  │
│  │  Shell │ Desktop │ Taskbar │ StartMenu │ WindowManager   │  │
│  │  Window │ Titlebar │ ResizeHandle │ DesktopIcon │ StartButton │  │
│  │  Button │ Input │ Checkbox │ Radio │ Select │ Slider │ etc. │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                   State Management                         │  │
│  │  windowManager │ desktop │ theme │ audio (Svelte stores) │  │
│  │  localStorage Persistence (auto save/restore)             │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Plugin System                           │  │
│  │  Registry │ Lifecycle │ Validation │ Isolation            │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                    Core Utilities                          │  │
│  │  Types │ Constants │ Storage Utils │ Position Utils       │  │
│  └───────────────────────────────────────────────────────────┘  │
│                              ↓                                    │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │                     Mock Kernel                            │  │
│  │  System Info │ Mock Commands (future: HTTP client)        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Browser Platform                            │
│  DOM APIs │ localStorage │ IndexedDB (future)                 │
└─────────────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Shell (root)
├── Desktop
│   ├── DesktopIcon (multiple, from props)
│   └── Background
├── WindowManager
│   └── Window (multiple, from windowManager store)
│       ├── WindowChrome
│       │   ├── Titlebar
│       │   │   ├── Icon
│       │   │   ├── Title
│       │   │   └── Controls (minimize, maximize, close)
│       │   └── ResizeHandles (8 handles)
│       └── WindowContent (plugin component loaded dynamically)
└── Taskbar
    ├── StartButton
    ├── TaskbarButton (multiple, one per open window)
    └── SystemTray
        ├── Clock
        ├── VolumeIcon
        └── SettingsIcon
```

## Data Flow Patterns

### Opening a Window

```
User clicks desktop icon
    ↓
DesktopIcon emits action callback
    ↓
Application calls windowManager.open(pluginId)
    ↓
windowManager store:
  - Looks up plugin in registry
  - Creates WindowState object
  - Adds to windows array
  - Saves to localStorage (debounced)
    ↓
WindowManager component reactively renders new Window
    ↓
Window component:
  - Dynamically imports plugin component
  - Mounts component in window content area
  - Enables drag/resize
  - Focuses window
```

### State Persistence: localStorage

```
Page Load:
  Read localStorage keys → Parse JSON → Restore State
    ↓
  window-state → windowManager.restore(windows)
  theme → theme.set(value)
  audio → audio.restore(volume, muted)
  desktop-layout → desktop.restore(positions)

State Change:
  windowManager.open() → Update store → Debounce 500ms → Save to localStorage
  window.drag() → Update position → Debounce 500ms → Save to localStorage
  theme.toggle() → Update store → Save to localStorage immediately
  audio.setVolume() → Update store → Debounce 500ms → Save to localStorage
```

### Plugin Registration

```
Application startup:
    ↓
Import plugin module
    ↓
Call pluginRegistry.registerWindow(plugin)
    ↓
Registry validates plugin interface
    ↓
If valid:
  - Add to internal Map<id, plugin>
  - Call plugin.onInstall() if defined
    ↓
Plugin available for windowManager.open(id)
```

## State Management Strategy

### Svelte 5 Runes

All state uses Svelte 5's new reactivity system:

```typescript
// Local component state
let count = $state(0);

// Derived values
let doubled = $derived(count * 2);

// Side effects
$effect(() => {
  console.log(`Count: ${count}`);
});
```

### Global Stores

Four global stores manage cross-component state:

1. **windowManager** - Window lifecycle, positions, z-index, focus
2. **desktop** - Desktop icon positions
3. **theme** - Current theme (light/dark)
4. **audio** - Background music, volume, muted state

All stores are Svelte 5 rune-based stores exported from `*.svelte.ts` files.

### localStorage Persistence

All state automatically persists across sessions:

- **Window state** - Open windows, positions, sizes, minimized/maximized states
- **Theme** - Current theme (light/dark)
- **Audio** - Volume and muted state
- **Desktop layout** - Icon positions (if customized)

**Debouncing:** Writes debounced at 500ms to avoid excessive I/O during drag/resize.

**Auto-restore:** On page load, all state is automatically restored from localStorage.

## Plugin System

### Plugin Types

**WindowPlugin:**
```typescript
interface WindowPlugin {
  id: string;              // Unique identifier
  name: string;            // Display name
  version: string;         // Semantic version
  component: SvelteComponent; // Window content component
  defaultTitle: string;    // Window titlebar text
  defaultIcon: string;     // Icon class name
  defaultSize?: {          // Optional default size
    width: number;
    height: number;
  };
  isResizable?: boolean;   // Allow resize (default: true)
  onInstall?: () => void;  // Called when registered
  onUninstall?: () => void; // Called when unregistered
}
```

**DesktopPlugin** (future):
```typescript
interface DesktopPlugin {
  id: string;
  iconClass: string;
  label: string;
  action: () => void;
}
```

### Plugin Lifecycle

1. **Registration** - `pluginRegistry.registerWindow(plugin)`
2. **Validation** - Registry checks required fields
3. **Storage** - Added to internal Map
4. **Installation** - `plugin.onInstall()` called
5. **Usage** - `windowManager.open(plugin.id)` creates windows
6. **Unregistration** - `pluginRegistry.unregisterWindow(id)` (future)

### Plugin Isolation

- Plugins cannot access other plugins' internals
- Each window instance is isolated (no shared state between windows)
- Plugins communicate only through:
  - Props (passed to component)
  - Events (callback props)
  - Global stores (if needed)

## Performance Model

### Bundle Targets

| Asset | Target | Maximum |
|-------|--------|---------|
| Core Bundle (JS) | 30KB gzipped | 50KB gzipped |
| Styles (CSS) | 20KB gzipped | 30KB gzipped |
| Icons (all) | 100KB | 150KB |
| Total First Load | 150KB | 230KB |

### Code Splitting

```
Main bundle:
  - Shell, Desktop, Taskbar, WindowManager
  - Core stores, utils, plugin registry
  - Window chrome, basic controls

Lazy loaded:
  - Individual plugin components (loaded when window opens)
  - Dialog system (loaded when first dialog shown)
  - Advanced controls (loaded when first used)
```

### Optimization Strategies

1. **Tree Shaking** - ES modules allow importing only used components
2. **Lazy Loading** - Plugin components loaded on-demand
3. **CSS Minification** - cssnano with advanced preset
4. **Icon Optimization** - PNG8 with oxipng compression
5. **No Dependencies** - Zero runtime dependencies (Svelte is dev dependency)

## Browser Platform Integration

### DOM APIs

- `document.getElementById()` - Component mounting
- `document.addEventListener()` - Global events (ESC, click outside)
- `element.getBoundingClientRect()` - Position calculations
- `IntersectionObserver` - Visibility detection (future optimization)

### Storage API

- `localStorage.setItem()` - Persist state
- `localStorage.getItem()` - Restore state
- JSON serialization for complex objects
- Automatic quota management
- Graceful degradation if unavailable

## File Structure

```
src/
├── lib/                       # Library code (exported)
│   ├── components/
│   │   ├── shell/
│   │   │   ├── Shell.svelte           # Root component
│   │   │   ├── Desktop.svelte         # Desktop with icon grid
│   │   │   ├── Taskbar.svelte         # Bottom taskbar
│   │   │   └── StartMenu.svelte       # Hierarchical menu
│   │   ├── windows/
│   │   │   ├── WindowManager.svelte   # Window container
│   │   │   ├── Window.svelte          # Draggable/resizable window
│   │   │   └── FileExplorer.svelte    # Grid view (future)
│   │   ├── dialogs/
│   │   │   └── MessageBox.svelte      # Alert/confirm dialogs
│   │   └── controls/
│   │       ├── Button.svelte          # Win98 button
│   │       ├── Checkbox.svelte        # Win98 checkbox
│   │       ├── TextInput.svelte       # Win98 text input
│   │       └── Select.svelte          # Win98 dropdown
│   ├── stores/
│   │   ├── windowManager.svelte.ts    # Window state + persistence
│   │   ├── desktop.svelte.ts          # Desktop icon positions
│   │   ├── theme.svelte.ts            # Theme state
│   │   └── audio.svelte.ts            # Audio state
│   ├── core/
│   │   ├── types.ts                   # TypeScript interfaces
│   │   ├── constants.ts               # System constants
│   │   └── utils.ts                   # Helper functions
│   ├── kernel/
│   │   ├── mock-kernel.ts             # Mock kernel implementation
│   │   └── kernel-client.ts           # HTTP client (future)
│   └── plugins/
│       ├── plugin-registry.ts         # Plugin registration
│       └── plugin-types.ts            # Plugin interfaces
├── assets/
│   ├── icons/                         # Windows 98 icons (PNG8)
│   └── fonts/                         # MS Sans Serif (future)
├── styles/
│   ├── abstracts/
│   │   ├── _vars.scss                 # CSS variables
│   │   ├── _mixins.scss               # Reusable mixins
│   │   └── _icons.scss                # Icon classes
│   ├── components/
│   │   ├── _shell.scss                # Shell styles
│   │   ├── _window.scss               # Window styles
│   │   ├── _controls.scss             # Control styles
│   │   └── ...
│   └── main.scss                      # Entry point
└── index.ts                           # Library exports

tests/
├── unit/                              # Unit tests
├── integration/                       # Integration tests
└── fixtures/                          # Test data

docs/                                  # Documentation
scripts/                               # Build scripts
```

## Technology Stack

### Core Technologies

- **Svelte 5** - Reactive UI framework with runes
- **TypeScript** - Type safety (strict mode)
- **SCSS** - Modular styles with mixins
- **Vite** - Fast build tool (library mode)
- **Vitest** - Testing framework

### Key Dependencies

**Runtime:** None (Svelte compiles away)

**Peer Dependencies:**
- `svelte@5.39.11` - Required by consumer applications

**Dev Dependencies:**
- Build tools (Vite, TypeScript, Sass)
- Testing tools (Vitest, Testing Library)
- Linters (ESLint, Stylelint, Prettier)

## Security Considerations

### XSS Prevention

- All user input escaped (Svelte automatic escaping)
- No `@html` usage (eval-like injection)
- localStorage data validated before parsing

### localStorage

- Quota management (`< 5`MB total)
- Try/catch for quota exceeded errors
- Graceful degradation if unavailable

### Plugin Sandboxing

- Plugins cannot access registry internals
- Plugin validation on registration
- No eval or Function constructor in plugin loading

## Accessibility

### Keyboard Navigation

- Tab order: Start button → Taskbar buttons → Windows → Controls
- Enter: Activate button/link
- Space: Toggle checkbox
- ESC: Close active window, close Start Menu
- Arrow keys: Navigate Start Menu

### Screen Readers

- ARIA labels on all interactive elements
- ARIA live regions for status updates
- Role attributes where appropriate
- Alt text on icons (via aria-label)

### Focus Management

- Visible focus indicators (dotted outline)
- Focus trap in modal dialogs
- Focus restoration after window close
- Logical focus order

## Extension Points

### Custom Themes (Future)

```typescript
interface Theme {
  name: string;
  colors: ColorPalette;
  fonts: FontStack;
}

themeRegistry.register(customTheme);
```

### Custom Window Types (Current)

Through plugin system - any Svelte component can be a window.

### Desktop Widgets (Future)

```typescript
interface DesktopWidget {
  id: string;
  component: SvelteComponent;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
```

## Future Enhancements

### Rust Backend (HTTP Kernel)

Replace `MockKernel` with HTTP client:

```typescript
class KernelClient implements KernelInterface {
  async getSystemInfo(): `Promise<SystemInfo>` {
    const res = await fetch('/api/system/info');
    return res.json();
  }
  
  async executeCommand(cmd: string): `Promise<CommandResult>` {
    const res = await fetch('/api/command', {
      method: 'POST',
      body: JSON.stringify({ cmd })
    });
    return res.json();
  }
}
```

### Multi-Window Workspaces

Saved workspace configurations in localStorage:

```typescript
const workspace = {
  name: 'monitoring',
  windows: ['ping', 'vpn', 'stats'],
  layout: 'grid'
};
localStorage.setItem('workspace:monitoring', JSON.stringify(workspace));
```

### Plugin Marketplace

Registry of community plugins:

```typescript
await pluginMarketplace.install('community/network-monitor');
```

## Versioning Strategy

- **Semantic Versioning** (1.0.0)
- **Breaking Changes** → Major version bump
- **New Features** → Minor version bump
- **Bug Fixes** → Patch version bump

**Changelog maintained for all releases**

## Migration Path

### From abu-enterprise (Old Monolith)

1. Install kernel library
2. Extract components → plugins
3. Replace custom OS components with kernel imports
4. Migrate state to kernel stores
5. State automatically persists via localStorage
6. Test, refine, deploy

## Summary

The Abu OS 98 Web Kernel provides a complete Windows 98 desktop environment as a reusable library. Through plugin architecture and automatic state persistence, it enables building authentic retro applications with modern developer experience and zero configuration overhead.

**Key Differentiators:**
- Not a UI toolkit, but a full OS emulation
- Plugin system for extensibility
- Automatic state persistence via localStorage
- Tree-shakeable ES modules
- 100% TypeScript with full type definitions
- `< 50`KB gzipped bundle size
- Zero runtime dependencies
