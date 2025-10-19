---
id: types
title: Types
---

# TypeScript Types Specification

## Overview

This document defines all TypeScript interfaces, types, and type utilities used throughout the Abu OS 98 Web Kernel. All types are exported from `src/lib/core/types.ts`.

## Core Geometry Types

### Position

2D coordinates in pixels.

```typescript
interface Position {
  x: number;                     // Pixels from left edge
  y: number;                     // Pixels from top edge
}
```

**Usage:**
- Window positions
- Desktop icon positions
- Mouse cursor positions

**Constraints:**
- x: Any number (can be negative for partial off-screen)
- y: Typically ≥ 0 (constrained by viewport)

### Size

2D dimensions in pixels.

```typescript
interface Size {
  width: number;                 // Pixels (≥ 0)
  height: number;                // Pixels (≥ 0)
}
```

**Usage:**
- Window dimensions
- Icon sizes
- Component dimensions

**Constraints:**
- width: ≥ 0, typically ≥ 200 for windows
- height: ≥ 0, typically ≥ 100 for windows

### Bounds

Combined position and size (rectangle).

```typescript
interface Bounds {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

**Usage:**
- Window bounds (pre-maximize save)
- Viewport calculations
- Collision detection

## Window Types

### WindowState

Complete window state managed by windowManager.

```typescript
interface WindowState {
  id: string;                    // UUID v4
  pluginId: string;              // Plugin identifier
  title: string;                 // Titlebar text
  iconClass: string;             // CSS class (e.g. "icon-apps-calculator")
  position: Position;            // Top-left corner
  size: Size;                    // Width and height
  zIndex: number;                // Stacking order (100+)
  isMinimized: boolean;          // Hidden from desktop
  isMaximized: boolean;          // Fills viewport
  isFocused: boolean;            // Top of z-stack
  isResizable: boolean;          // Allow resize operations
  preMaximizeBounds?: Bounds;    // Saved bounds before maximize
}
```

**Field Constraints:**
- `id`: Non-empty, unique, UUID format
- `pluginId`: Must exist in plugin registry
- `title`: Non-empty string
- `iconClass`: Valid CSS class name
- `position.x`: Any number
- `position.y`: ≥ 0
- `size.width`: ≥ 200
- `size.height`: ≥ 100
- `zIndex`: ≥ 100
- `isMinimized` AND `isMaximized`: Never both true
- `preMaximizeBounds`: Only present if isMaximized=true

### WindowPlugin

Plugin definition for registering window applications.

```typescript
interface WindowPlugin {
  id: string;                    // Unique identifier (kebab-case)
  name: string;                  // Display name
  version: string;               // Semantic version (e.g. "1.0.0")
  component: Component;          // Svelte 5 component type
  defaultTitle: string;          // Default window title
  defaultIcon: string;           // CSS class for icon
  defaultSize?: Size;            // Optional default window size
  isResizable?: boolean;         // Allow resize (default: true)
  onInstall?: () => void;        // Called on registration
  onUninstall?: () => void;      // Called on unregistration
}
```

**Field Constraints:**
- `id`: Non-empty, unique, lowercase-kebab-case, no spaces
- `name`: Non-empty, user-friendly
- `version`: Matches `^\d+\.\d+\.\d+$`
- `component`: Valid Svelte component
- `defaultTitle`: Non-empty string
- `defaultIcon`: Valid CSS class (starts with "icon-")
- `defaultSize.width`: If provided, ≥ 200
- `defaultSize.height`: If provided, ≥ 100

## Desktop Types

### DesktopItem

Icon on the desktop.

```typescript
interface DesktopItem {
  id: string;                    // Unique identifier
  label: string;                 // Display label
  iconClass: string;             // CSS class for icon
  type: 'program' | 'folder' | 'file' | 'shortcut';
  action: () => void;            // Executed on double-click
  position?: Position;           // Custom position (null = use grid)
}
```

**Field Constraints:**
- `id`: Non-empty, unique
- `label`: Non-empty, max ~20 chars for display
- `iconClass`: Valid CSS class
- `type`: One of enum values
- `action`: Function reference
- `position`: If null/undefined, use auto-grid

### MenuItem

Start menu or context menu item.

```typescript
interface MenuItem {
  id: string;                    // Unique identifier
  label: string;                 // Display text
  iconClass?: string;            // Optional icon CSS class
  action?: () => void;           // Leaf item (execute action)
  submenu?: MenuItem[];          // Branch item (show submenu)
  divider?: boolean;             // Horizontal divider line
}
```

**Field Constraints:**
- `id`: Non-empty, unique within menu
- `label`: Non-empty (except if divider=true)
- `action` XOR `submenu`: Exactly one must be defined (or divider=true)
- `divider`: If true, label can be empty

## Theme Types

### Theme

Visual theme identifier.

```typescript
type Theme = 'light' | 'dark';
```

**Values:**
- `'light'`: Default Windows 98 gray theme
- `'dark'`: Custom blue gradient theme

### ThemeState

Theme store state.

```typescript
interface ThemeState {
  current: Theme;                // Active theme
}
```

## Audio Types

### AudioState

Audio store state.

```typescript
interface AudioState {
  volume: number;                // 0-1
  muted: boolean;                // Mute toggle
  playing: boolean;              // Playback state
}
```

**Field Constraints:**
- `volume`: 0 ≤ volume ≤ 1

## Kernel Types

### SystemInfo

System information from kernel.

```typescript
interface SystemInfo {
  osName: string;                // e.g. "Abu OS 98"
  version: string;               // e.g. "1.0.0"
  uptime: number;                // Seconds since boot
  totalMemory: number;           // MB
  usedMemory: number;            // MB
}
```

**Field Constraints:**
- `osName`: Non-empty
- `version`: Semantic version format
- `uptime`: ≥ 0
- `totalMemory`: `> 0`
- `usedMemory`: ≥ 0, ≤ totalMemory

### CommandResult

Result of kernel command execution.

```typescript
interface CommandResult {
  exitCode: number;              // 0 = success, non-zero = error
  stdout: string;                // Standard output
  stderr: string;                // Standard error
  executionTime: number;         // Milliseconds
}
```

**Field Constraints:**
- `exitCode`: Integer (typically 0-255)
- `stdout`: Any string (may be empty)
- `stderr`: Any string (may be empty)
- `executionTime`: ≥ 0

### KernelInterface

Abstract kernel interface (implemented by MockKernel, HTTPKernel).

```typescript
interface KernelInterface {
  getSystemInfo(): `Promise<SystemInfo>`;
  executeCommand(cmd: string): `Promise<CommandResult>`;
}
```

## Storage Types

### StoredState

Complete persisted state (localStorage).

```typescript
interface StoredState {
  version: number;               // Schema version (current: 1)
  timestamp: number;             // Unix timestamp (ms) of last save
  ttl: number;                   // Time-to-live in days (default: 7)
  
  windows: {
    open: StoredWindowState[];   // Currently open windows
    history: string[];           // Recently closed plugin IDs (max 10)
  };
  
  desktop: {
    layout: 'grid' | 'custom';   // Auto-grid or custom positions
    icons: StoredDesktopIconState[];
  };
  
  theme: {
    current: Theme;              // Active theme
    auto: boolean;               // Follow system preference (future)
  };
  
  audio: {
    volume: number;              // 0-1
    muted: boolean;
    track: string | null;        // Current track URL (future)
  };
  
  system: {
    taskbarPosition: 'bottom';   // Future: 'top' | 'left' | 'right'
    startMenuPinned: string[];   // Pinned app IDs (future)
  };
}
```

### StoredWindowState

Subset of WindowState for persistence.

```typescript
interface StoredWindowState {
  pluginId: string;
  position: Position;
  size: Size;
  state: 'normal' | 'minimized' | 'maximized';
  preMaximizeBounds?: Bounds;
  pluginState?: unknown;         // Plugin-specific state (future)
}
```

### StoredDesktopIconState

Desktop icon customizations.

```typescript
interface StoredDesktopIconState {
  id: string;                    // Icon ID
  position?: Position;           // Only if layout === 'custom'
  hidden?: boolean;              // User hid this icon (future)
}
```

## Plugin Registry Types

### PluginRegistry

Plugin registry interface.

```typescript
interface PluginRegistry {
  registerWindow(plugin: WindowPlugin): void;
  unregisterWindow(id: string): void;
  get(id: string): WindowPlugin | undefined;
  getAllPlugins(): WindowPlugin[];
  has(id: string): boolean;
}
```

## Error Types

### KernelError

Base error for kernel operations.

```typescript
class KernelError extends Error {
  code: string;                  // Error code (e.g. "NETWORK_ERROR")
  details?: unknown;             // Additional context
}
```

### NetworkError

Network operation failed.

```typescript
class NetworkError extends KernelError {
  code: 'NETWORK_ERROR';
  details: {
    url: string;
    originalError: Error;
  };
}
```

### ValidationError

Invalid input data.

```typescript
class ValidationError extends KernelError {
  code: 'VALIDATION_ERROR';
  details: {
    field: string;
    reason: string;
  };
}
```

### AuthorizationError

Unauthorized operation.

```typescript
class AuthorizationError extends KernelError {
  code: 'AUTHORIZATION_ERROR';
  details: {
    requiredPermission: string;
  };
}
```

### ServiceUnavailableError

Backend service unavailable.

```typescript
class ServiceUnavailableError extends KernelError {
  code: 'SERVICE_UNAVAILABLE';
  details: {
    retryAfter: number;          // Seconds
  };
}
```

### TimeoutError

Request timeout.

```typescript
class TimeoutError extends KernelError {
  code: 'TIMEOUT_ERROR';
  details: {
    timeout: number;             // Milliseconds
    url: string;
  };
}
```

## Utility Types

### Nullable

Type or null.

```typescript
type Nullable<T> = T | null;
```

### Optional

Type or undefined.

```typescript
type Optional<T> = T | undefined;
```

### DeepPartial

Recursively make all properties optional.

```typescript
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

### ReadonlyDeep

Recursively make all properties readonly.

```typescript
type ReadonlyDeep<T> = {
  readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};
```

## Type Guards

### isPosition

```typescript
function isPosition(value: unknown): value is Position {
  return (
    typeof value === 'object' &&
    value !== null &&
    'x' in value &&
    'y' in value &&
    typeof (value as any).x === 'number' &&
    typeof (value as any).y === 'number'
  );
}
```

### isSize

```typescript
function isSize(value: unknown): value is Size {
  return (
    typeof value === 'object' &&
    value !== null &&
    'width' in value &&
    'height' in value &&
    typeof (value as any).width === 'number' &&
    typeof (value as any).height === 'number'
  );
}
```

### isWindowState

```typescript
function isWindowState(value: unknown): value is WindowState {
  if (typeof value !== 'object' || value === null) return false;
  const obj = value as any;
  
  return (
    typeof obj.id === 'string' &&
    typeof obj.pluginId === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.iconClass === 'string' &&
    isPosition(obj.position) &&
    isSize(obj.size) &&
    typeof obj.zIndex === 'number' &&
    typeof obj.isMinimized === 'boolean' &&
    typeof obj.isMaximized === 'boolean' &&
    typeof obj.isFocused === 'boolean' &&
    typeof obj.isResizable === 'boolean'
  );
}
```

## Type Exports

All types exported from `src/lib/core/types.ts`:

```typescript
export type {
  // Geometry
  Position,
  Size,
  Bounds,
  
  // Window
  WindowState,
  WindowPlugin,
  
  // Desktop
  DesktopItem,
  MenuItem,
  
  // Theme
  Theme,
  ThemeState,
  
  // Audio
  AudioState,
  
  // Kernel
  SystemInfo,
  CommandResult,
  KernelInterface,
  
  // Storage
  StoredState,
  StoredWindowState,
  StoredDesktopIconState,
  
  // Plugin
  PluginRegistry,
  
  // Utility
  Nullable,
  Optional,
  DeepPartial,
  ReadonlyDeep,
};

export {
  // Error classes
  KernelError,
  NetworkError,
  ValidationError,
  AuthorizationError,
  ServiceUnavailableError,
  TimeoutError,
  
  // Type guards
  isPosition,
  isSize,
  isWindowState,
};
```

## Usage Examples

### Type Annotations

```typescript
// Function parameters
function moveWindow(id: string, position: Position): void {
  // ...
}

// Variable declarations
const windows: WindowState[] = [];
const size: Size = { width: 600, height: 400 };

// Return types
function getWindow(id: string): WindowState | undefined {
  // ...
}
```

### Type Guards

```typescript
// Runtime type checking
const data: unknown = JSON.parse(stored);

if (isWindowState(data)) {
  // TypeScript knows data is WindowState
  windowManager.restore(data);
}
```

### Generic Types

```typescript
// Optional field
let selectedId: `Nullable<string>` = null;

// Partial update
const updates: `DeepPartial<WindowState>` = {
  position: { x: 100 }
};
```

## Summary

All TypeScript types defined with:

- **Field specifications** - Type, constraints, optional/required
- **Type guards** - Runtime validation functions
- **Error types** - Structured error handling
- **Utility types** - Generic type helpers
- **Export manifest** - Complete type exports

Every type fully specified for type-safe implementation.
