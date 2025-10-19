---
id: plugin-system
title: Plugin System
---

# Plugin System Specification

## Overview

The Plugin System enables applications to extend the OS with custom windows, desktop items, and Start menu entries. Plugins are isolated, validated, and managed through a centralized registry with lifecycle hooks.

## Design Principles

1. **Self-Contained** - Kernel bundles all dependencies including Svelte runtime
2. **Isolation** - Plugins cannot access each other's internals
3. **Registration-Based** - All plugins must register before use
4. **Type-Safe** - Full TypeScript validation at registration
5. **Lifecycle Management** - Install/uninstall hooks for cleanup
6. **Version Control** - Semantic versioning for compatibility
7. **No Side Effects** - Pure registration (no auto-execution)

## Dependency Model

The Abu OS 98 Web Kernel is self-contained and bundles the Svelte runtime completely:

- **Kernel bundles Svelte 5.39.11** - Complete runtime included in distribution
- **Zero framework dependencies** - Applications only install the kernel package
- **Exports Svelte APIs** - `mount`, `unmount`, `hydrate`, `onMount`, `getContext` all exported from kernel
- **Plugin components** - Use kernel's bundled Svelte for compilation and runtime

Consumer applications:
```typescript
// Only kernel import needed
import { mount, Shell, MockKernel } from 'abu-operating-system-98-web-kernel';

// No separate Svelte installation required
mount(Shell, {
  target: document.body,
  props: { kernel: new MockKernel(), plugins: [] }
});
```

## Plugin Types

### 1. Window Plugin

Opens in a draggable, resizable window managed by windowManager.

**Schema:**
```
id: string                      // Unique identifier (kebab-case)
name: string                    // Display name
version: string                 // Semantic version (e.g. "1.0.0")
component: SvelteComponent      // Svelte 5 component
defaultTitle: string            // Window titlebar text
defaultIcon: string             // CSS class (e.g. "icon-apps-calculator")
defaultSize?: {                 // Optional default window size
  width: number,                // Pixels (≥ 200)
  height: number                // Pixels (≥ 100)
}
isResizable?: boolean           // Allow resize (default: true)
onInstall?: () => void          // Called on registration
onUninstall?: () => void        // Called on unregistration
```

**Validation Rules:**
- `id`: Required, non-empty, unique, lowercase-kebab-case
- `name`: Required, non-empty
- `version`: Required, valid semver (e.g. "1.0.0")
- `component`: Required, valid Svelte component
- `defaultTitle`: Required, non-empty
- `defaultIcon`: Required, valid CSS class string
- `defaultSize.width`: If provided, ≥ 200
- `defaultSize.height`: If provided, ≥ 100

**Usage Flow:**
```
1. Application registers plugin: pluginRegistry.registerWindow(plugin)
2. User triggers plugin (desktop icon, Start menu, etc.)
3. Application calls: windowManager.open(plugin.id)
4. Window Manager looks up plugin, creates window, mounts component
5. Component renders inside window chrome
```

### 2. Desktop Plugin (Future)

Adds icon to desktop.

**Schema:**
```
id: string
iconClass: string
label: string
action: () => void
position?: {x: number, y: number}
```

### 3. Start Menu Plugin (Future)

Adds entry to Start menu.

**Schema:**
```
id: string
label: string
iconClass?: string
parent?: string                 // Parent menu ID for nested items
action: () => void
```

## Plugin Registry

### Responsibilities

1. **Registration** - Accept and validate plugins
2. **Storage** - Maintain registry of all plugins
3. **Lookup** - Retrieve plugin by ID
4. **Validation** - Enforce schema rules
5. **Lifecycle** - Call install/uninstall hooks
6. **Isolation** - Prevent cross-plugin access

### Registry State

```
Internal storage (not exposed):
  plugins: `Map<string, WindowPlugin>`

Public API:
  registerWindow(plugin) → void
  unregisterWindow(id) → void
  get(id) → WindowPlugin | undefined
  getAllPlugins() → WindowPlugin[]
  has(id) → boolean
```

### Registration Process

**registerWindow(plugin):**

1. Validate schema (check all required fields)
2. Check ID uniqueness (throw if duplicate)
3. Validate version format (semver)
4. Validate defaultSize constraints (if provided)
5. Store in registry: plugins.set(plugin.id, plugin)
6. Call plugin.onInstall() if defined
7. Add to Start menu "Programs" submenu

**Validation Errors:**
| Condition | Error |
|-----------|-------|
| Missing required field | "Plugin missing required field: \{field\}" |
| Duplicate ID | "Plugin ID already registered: \{id\}" |
| Invalid version | "Invalid version format: \{version\}" |
| Invalid size | "defaultSize must be ≥ 200x100" |

### Unregistration Process

**unregisterWindow(id):**

1. Check plugin exists (throw if not found)
2. Call plugin.onUninstall() if defined
3. Close all open windows of this plugin
4. Remove from registry: plugins.delete(id)
5. Remove from Start menu

**Cleanup:**
- Automatically closes windows when plugin unregistered
- Prevents opening new windows after unregistration

## Plugin Isolation

### Isolation Mechanisms

**1. Separate Component Instances**
- Each window gets own component instance
- No shared state between instances
- Each instance has own lifecycle

**2. No Direct Plugin-to-Plugin Communication**
- Plugins cannot import each other
- Plugins cannot call each other's methods
- Communication only via OS-level events (future)

**3. Registry Encapsulation**
- Plugins cannot access registry internals
- Plugins cannot modify other plugins
- Registry is read-only to plugins

**4. Store Isolation**
- Plugins use kernel stores (windowManager, theme, etc.)
- Plugins cannot create global stores
- Plugin state stays in component ($state)

### Allowed Plugin Capabilities

**✅ Allowed:**
- Render UI in window content area
- Use kernel stores (read-only recommended)
- Call windowManager.open() to open other plugins
- Use theme.current to read theme
- Emit events via callback props
- Use browser APIs (localStorage, fetch, etc.)

**❌ Not Allowed:**
- Access other plugin internals
- Mutate kernel stores directly (use actions only)
- Bypass plugin registry
- Create windows without going through windowManager
- Access plugin registry internals

## Plugin Component Contract

### Props Received by Plugin Component

```
Standard props (provided by Window component):
  windowId: string              // UUID of window instance
  close: () => void             // Callback to close window
```

### Component Requirements

**Must:**
- Be a valid Svelte 5 component
- Use runes ($state, $derived, $effect)
- Handle own state internally
- Clean up side effects (via $effect return)

**Must Not:**
- Access parent window internals
- Mutate global state directly
- Create memory leaks (timer/listener cleanup required)

### Component Example

```html
<script lang="ts">
  interface Props {
    windowId: string;
    close: () => void;
  }
  
  let { windowId, close }: Props = $props();
  
  // Plugin state
  let count = $state(0);
  
  function handleClick() {
    count++;
  }
</script>

<div class="calculator">
  <div class="display">{count}</div>
  <button onclick={handleClick}>+1</button>
  <button onclick={close}>Close</button>
</div>
```

## Lifecycle Hooks

### onInstall()

**When:** Called immediately after registration

**Use Cases:**
- Initialize plugin-specific storage
- Register event listeners
- Load plugin configuration
- Log registration

**Example Use:**
```
onInstall: () => {
  console.log('Calculator plugin installed');
  localStorage.setItem('calculator:installed', Date.now());
}
```

### onUninstall()

**When:** Called immediately before unregistration

**Use Cases:**
- Clean up plugin-specific storage
- Unregister event listeners
- Save final state
- Log unregistration

**Example Use:**
```
onUninstall: () => {
  console.log('Calculator plugin uninstalled');
  localStorage.removeItem('calculator:installed');
}
```

**Important:** Window cleanup is automatic (onUninstall runs after windows closed)

## Version Management

### Semantic Versioning

**Format:** MAJOR.MINOR.PATCH (e.g. "1.0.0", "2.3.1")

- **MAJOR:** Breaking changes (incompatible API)
- **MINOR:** New features (backward-compatible)
- **PATCH:** Bug fixes (backward-compatible)

**Validation:**
- Must match regex: `^\d+\.\d+\.\d+$`
- Examples valid: "1.0.0", "10.2.3"
- Examples invalid: "1.0", "v1.0.0", "1.0.0-beta"

### Version Compatibility (Future)

```
minKernelVersion?: string       // Minimum kernel version required
maxKernelVersion?: string       // Maximum kernel version supported
```

**Check on registration:**
```
If minKernelVersion specified:
  If kernel.version < plugin.minKernelVersion:
    Throw "Plugin requires kernel version {min}, have {current}"
```

## Plugin Discovery (Future)

### Plugin Manifest

**File:** `plugin.json` in plugin directory

```json
{
  "id": "calculator",
  "name": "Calculator",
  "version": "1.0.0",
  "entry": "./Calculator.svelte",
  "defaultTitle": "Calculator",
  "defaultIcon": "icon-apps-calculator",
  "defaultSize": {
    "width": 300,
    "height": 400
  },
  "author": "Your Name",
  "description": "Basic calculator app",
  "license": "MIT"
}
```

### Auto-Discovery

**Process:**
1. Scan specified plugin directories
2. Read plugin.json from each
3. Validate manifest
4. Import entry component
5. Auto-register plugin

## Testing Requirements

### Registry Tests

**Registration:**
- registerWindow() with valid plugin → succeeds
- registerWindow() with duplicate ID → throws error
- registerWindow() with missing field → throws error
- registerWindow() with invalid version → throws error
- registerWindow() calls onInstall() hook

**Lookup:**
- get() with valid ID → returns plugin
- get() with invalid ID → returns undefined
- getAllPlugins() → returns all registered plugins
- has() with valid ID → returns true
- has() with invalid ID → returns false

**Unregistration:**
- unregisterWindow() with valid ID → succeeds
- unregisterWindow() with invalid ID → throws error
- unregisterWindow() calls onUninstall() hook
- unregisterWindow() closes open windows

### Isolation Tests

**Component Instances:**
- Open same plugin twice → creates 2 separate instances
- Change state in window 1 → window 2 unaffected

**Plugin Communication:**
- Plugin A cannot import Plugin B
- Plugin A cannot call Plugin B methods directly

### Integration Tests

**Full Plugin Flow:**
1. Register plugin
2. Verify appears in Start menu
3. Click Start menu item
4. Verify window opens with plugin component
5. Verify component receives correct props
6. Close window
7. Unregister plugin
8. Verify removed from Start menu

## Error Handling

### Registration Errors

| Error Type | When | Recovery |
|------------|------|----------|
| ValidationError | Invalid schema | Fix plugin definition, re-register |
| DuplicateError | ID already exists | Use different ID or unregister first |
| VersionError | Invalid semver | Fix version string |

### Runtime Errors

| Error Type | When | Recovery |
|------------|------|----------|
| PluginNotFoundError | open() invalid ID | Check ID exists in registry |
| ComponentError | Plugin component crashes | Log error, close window |

## Performance Considerations

### Lazy Loading

**Component Loading:**
- Components loaded on-demand (when window opens)
- Not pre-loaded at registration
- Uses dynamic import (future)

**Registry Size:**
- Light weight: Only metadata stored
- Component references, not instances
- O(1) lookup via Map

### Memory Management

**Component Instances:**
- Created when window opens
- Destroyed when window closes
- Automatic cleanup via Svelte lifecycle

**Registry Cleanup:**
- unregisterWindow() removes from memory
- No memory leaks from registered plugins

## Security Considerations

### Plugin Trust Model

**Assumptions:**
- Plugins are trusted (no sandboxing)
- Plugins have full browser API access
- Application is responsible for vetting plugins

**Recommendations:**
- Only use plugins from trusted sources
- Review plugin code before registration
- Monitor plugin behavior (console, network)

### Future: Plugin Permissions

```
permissions?: {
  storage: boolean,              // localStorage access
  network: boolean,              // fetch/XHR access
  notifications: boolean,        // Notification API
}
```

**Enforcement:**
- Check permissions before allowing API access
- Deny by default, explicit grant required

## Summary

Plugin System provides:

- **Window Plugins** - Extend OS with custom draggable windows
- **Type-Safe Registration** - Full validation at registration time
- **Isolation** - Plugins cannot interfere with each other
- **Lifecycle Hooks** - Install/uninstall for cleanup
- **Version Management** - Semantic versioning for compatibility
- **Registry** - Centralized plugin storage and lookup

All schemas, validation rules, and behaviors precisely defined for implementation.
