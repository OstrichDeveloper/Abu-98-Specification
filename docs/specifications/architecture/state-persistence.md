---
id: state-persistence
title: State Persistence
---

# State Persistence Specification

## Overview

State persistence provides automatic save and restore of the complete desktop environment across browser sessions using localStorage. The system is designed for forward compatibility, extensibility, and graceful degradation.

## Design Principles

1. **Automatic** - No user action required
2. **Forward Compatible** - Schema versioning for future changes
3. **Extensible** - Easy to add new state types
4. **Privacy-First** - All data local to browser
5. **Graceful Degradation** - Works without localStorage
6. **Performance-Conscious** - Debounced writes, efficient serialization

## Storage Schema

### Root Schema Structure

All localStorage keys use a versioned schema to support future migrations.

```
Key Format: abu-os-98:{domain}:v{version}

Examples:
- abu-os-98:state:v1
- abu-os-98:preferences:v1
- abu-os-98:workspaces:v1 (future)
```

### Primary State Key

**Key:** `abu-os-98:state:v1`

**Schema:**
```typescript
{
  version: 1,                    // Schema version for migrations
  timestamp: number,             // Unix timestamp (ms) of last save
  ttl: number,                   // Time-to-live in days (default: 7)
  
  windows: {
    open: WindowState[],         // Currently open windows
    history: string[],           // Recently closed window plugin IDs (max 10)
  },
  
  desktop: {
    layout: 'grid' | 'custom',   // Grid auto-layout or custom positions
    icons: DesktopIconState[],   // Icon customizations
  },
  
  theme: {
    current: 'light' | 'dark',   // Active theme
    auto: boolean,               // Follow system preference (future)
  },
  
  audio: {
    volume: number,              // 0-1
    muted: boolean,
    track: string | null,        // Current track URL (future)
  },
  
  system: {
    taskbarPosition: 'bottom',   // Future: 'top' | 'left' | 'right'
    startMenuPinned: string[],   // Pinned app IDs (future)
  }
}
```

### WindowState Schema

```typescript
{
  pluginId: string,              // Plugin ID to restore
  position: {
    x: number,                   // Pixels from left
    y: number,                   // Pixels from top
  },
  size: {
    width: number,               // Pixels (≥ 200)
    height: number,              // Pixels (≥ 100)
  },
  state: 'normal' | 'minimized' | 'maximized',
  preMaximizeBounds?: {          // Saved bounds before maximize
    x: number,
    y: number,
    width: number,
    height: number,
  },
  pluginState?: unknown,         // Plugin-specific state (future)
}
```

### DesktopIconState Schema

```typescript
{
  id: string,                    // Icon ID
  position?: {                   // Only if layout === 'custom'
    x: number,
    y: number,
  },
  hidden?: boolean,              // User hid this icon (future)
}
```

## Persistence Behavior

### Write Strategy

**Debouncing:**
- Window position/size changes: 500ms debounce
- Theme changes: Immediate write
- Audio changes: 500ms debounce
- Desktop layout changes: 500ms debounce

**Batching:**
- Multiple state changes within debounce window are batched into single write

**Error Handling:**
- Quota exceeded: Clear old state (timestamp > TTL), retry once
- SecurityError: Fall back to in-memory storage
- Parse errors: Log warning, use defaults

### Read Strategy

**On Application Startup:**

1. Read `abu-os-98:state:v1` from localStorage
2. Validate schema version (current: 1)
3. Check TTL (default: 7 days)
   - If timestamp > TTL: Ignore state, use defaults
   - Else: Continue restoration
4. Validate each field exists and has correct type
5. Restore state in order:
   a. Theme (affects visual rendering)
   b. Audio (user preference)
   c. Desktop layout (positions desktop icons)
   d. Windows (requires plugins to be registered first)

**Validation Rules:**
- Unknown fields: Ignore (forward compatibility)
- Missing required fields: Use defaults
- Invalid types: Use defaults, log warning
- Invalid plugin IDs: Skip window, log warning

## Storage Limits

### Browser Limits

| Browser | Quota | Notes |
|---------|-------|-------|
| Chrome/Edge | 10MB | Per origin |
| Firefox | 10MB | Per origin |
| Safari | 10MB | 5MB in private mode |

### Kernel Usage Estimate

| Data Type | Size | Notes |
|-----------|------|-------|
| Window state (20 windows) | ~5KB | Positions, sizes, states |
| Desktop layout | ~2KB | Icon positions |
| Theme | ~50 bytes | Single value |
| Audio | ~50 bytes | Volume, muted |
| **Total** | **~7KB** | Well within limits |

### Quota Management

**Strategies:**
1. TTL enforcement (default: 7 days)
2. Window history limit (max 10 recent)
3. Compression for large states (future)
4. Move large assets to IndexedDB (future)

## Schema Versioning

### Version Migration

Future schema changes require migration logic:

```
Schema v1 → v2 Migration:
1. Read abu-os-98:state:v1
2. Transform to v2 format
3. Write to abu-os-98:state:v2
4. Delete abu-os-98:state:v1
5. Update version flag
```

**Migration Example (v1 → v2):**

Hypothetical v2 adds workspace support:

```
v1: { windows: [...], theme: {...}, audio: {...} }
   ↓
v2: { 
  version: 2,
  workspaces: {
    active: 'default',
    list: {
      default: { windows: [...] }
    }
  },
  theme: {...},
  audio: {...}
}
```

### Version Detection

```
Read key: abu-os-98:state:v2
  - If exists: Use v2 schema
  - If not exists:
      Read key: abu-os-98:state:v1
        - If exists: Migrate to v2
        - If not exists: Initialize new v2
```

## Fallback Storage

### In-Memory Fallback

When localStorage unavailable (private mode, SecurityError):

**Behavior:**
- Use `Map<string, string>` as in-memory storage
- Same API as localStorage (getItem, setItem)
- Data lost on page refresh (expected)
- Log warning once on startup

### Storage Detection

```
Test: Write/read/delete test key
  - Success: localStorage available
  - Failure: Use in-memory fallback
```

## Privacy & Security

### Data Stored

**Non-Sensitive Data:**
- Window positions, sizes, states
- Desktop icon positions
- Theme preference
- Audio volume, muted state

**NOT Stored:**
- User personal information
- Plugin content/data
- Authentication tokens
- Browsing history

### Security Considerations

**localStorage Security:**
- Origin-bound (same-origin policy)
- No cross-site access
- Cleared when user clears browser data
- No encryption needed (non-sensitive data)

## Error Conditions

### Error Types & Handling

| Error | Condition | Handling |
|-------|-----------|----------|
| QuotaExceededError | Storage full | Clear old state, retry once |
| SecurityError | Private mode / disabled | Use in-memory fallback |
| SyntaxError | JSON parse failure | Log warning, use defaults |
| TypeError | Invalid schema | Log warning, use defaults |

### Error Recovery

**Invalid State:**
1. Log error with context
2. Use default values
3. Continue application startup
4. Overwrite with valid state on next save

**Corrupted Data:**
1. Detect via JSON.parse error
2. Delete corrupted key
3. Initialize fresh state
4. Log incident

## Testing Requirements

### Unit Test Coverage

**Persistence Layer:**
- Write to localStorage (success)
- Write to localStorage (quota exceeded)
- Write to localStorage (SecurityError)
- Read from localStorage (valid data)
- Read from localStorage (corrupted data)
- Read from localStorage (missing key)
- Read from localStorage (expired TTL)
- Debouncing (multiple writes → single save)

**Schema Validation:**
- Valid v1 schema → passes
- Invalid field types → uses defaults
- Missing required fields → uses defaults
- Unknown fields → ignores (forward compat)

**Migration:**
- No existing state → creates v1
- v1 exists → uses v1
- Future: v1 exists → migrates to v2

### Integration Test Coverage

**Full Persistence Flow:**
1. Open window → wait debounce → verify localStorage
2. Drag window → wait debounce → verify localStorage
3. Close window → verify immediate write
4. Change theme → verify immediate write
5. Refresh page → verify state restored
6. Clear localStorage → verify defaults used

## Future Enhancements

### Multi-Workspace Support

```typescript
workspaces: {
  active: string,                // Active workspace ID
  list: {
    [id: string]: {
      name: string,
      windows: WindowState[],
      desktop: DesktopState,
    }
  }
}
```

### Cloud Sync

```typescript
sync: {
  enabled: boolean,
  lastSync: number,
  remoteUrl: string,
  strategy: 'merge' | 'replace',
}
```

### Export/Import

**Export Format (JSON):**
```
{
  version: 1,
  exportDate: '2025-10-13T12:00:00Z',
  state: { ...full state... }
}
```

**Import Behavior:**
- Validate version compatibility
- Merge or replace local state
- Prompt user for conflicts

## Summary

State persistence provides:

- **Automatic save/restore** across browser sessions
- **Forward-compatible schema** with versioning
- **Extensible structure** for future features
- **Graceful degradation** when unavailable
- **Privacy-first** local-only storage
- **7KB footprint** well within browser limits

All state changes automatically persist with intelligent debouncing for performance.
