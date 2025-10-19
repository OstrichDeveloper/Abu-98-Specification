---
id: plugin-system
title: Plugin System
---

# Plugin System - Technical Specification

## Overview

The Abu Web Kernel Plugin System provides a comprehensive architecture for extending the operating system with custom applications, tools, and services. Plugins can create windows, execute custom logic, manage state, communicate between components, and integrate deeply with the kernel. This specification defines the enhanced plugin architecture that supports complex multi-window applications with custom business logic.

## Architecture

### Plugin Types

The system supports multiple plugin types:

1. **Window Plugins** - Create windowed applications (existing)
2. **Service Plugins** - Background services without UI (new)
3. **Extension Plugins** - Extend existing components (new)
4. **Composite Plugins** - Multi-window applications with custom logic (new)

### Plugin Lifecycle

```
┌─────────────┐
│  Installed  │
└──────┬──────┘
       │
       ├── onInstall()
       │
       ▼
┌─────────────┐
│  Registered │
└──────┬──────┘
       │
       ├── onCreate()
       │
       ▼
┌─────────────┐
│   Active    │◄──┐
└──────┬──────┘   │
       │          │
       ├── onActivate()
       │          │
       ▼          │
┌─────────────┐   │
│  Running    │───┘
└──────┬──────┘
       │
       ├── onDeactivate()
       │
       ▼
┌─────────────┐
│  Inactive   │
└──────┬──────┘
       │
       ├── onDestroy()
       │
       ▼
┌─────────────┐
│ Uninstalled │
└─────────────┘
```

## Plugin Interface

### Composite Plugin Interface

```typescript
interface CompositePlugin {
  // Metadata
  id: string;
  name: string;
  version: string;
  description?: string;
  author?: string;
  type: 'composite';
  
  // Capabilities
  windows?: WindowDefinition[];
  services?: ServiceDefinition[];
  components?: ComponentDefinition[];
  
  // Entry point
  main: (context: PluginContext) => PluginInstance;
  
  // Lifecycle hooks
  onInstall?: () => void | Promise<void>;
  onUninstall?: () => void | Promise<void>;
}
```

### Window Definition

```typescript
interface WindowDefinition {
  id: string;
  component: Component;
  defaultTitle: string;
  defaultIcon: string;
  defaultSize?: Size;
  isResizable?: boolean;
  isSingleton?: boolean;        // Only one instance allowed
  props?: `Record<string, any>`;  // Default props
}
```

### Service Definition

```typescript
interface ServiceDefinition {
  id: string;
  singleton?: boolean;
  autoStart?: boolean;
  factory: (context: PluginContext) => ServiceInstance;
}
```

### Component Definition

```typescript
interface ComponentDefinition {
  id: string;
  component: Component;
  exportAs?: string;  // Export name for other plugins
}
```

## Plugin Context

### Context API

The `PluginContext` provides access to kernel services and APIs:

```typescript
interface PluginContext {
  // Plugin info
  readonly pluginId: string;
  readonly pluginName: string;
  
  // Window management
  windowManager: WindowManagerAPI;
  
  // System services
  kernel: KernelAPI;
  storage: StorageAPI;
  events: EventBusAPI;
  
  // Component registry
  components: ComponentRegistryAPI;
  
  // State management
  state: PluginStateAPI;
  
  // Utilities
  utils: UtilsAPI;
}
```

### Window Manager API

```typescript
interface WindowManagerAPI {
  // Open windows
  open(windowId: string, options?: OpenOptions): string;
  openMultiple(requests: OpenRequest[]): string[];
  
  // Window control
  close(instanceId: string): void;
  closeAll(windowId?: string): void;
  focus(instanceId: string): void;
  minimize(instanceId: string): void;
  maximize(instanceId: string): void;
  restore(instanceId: string): void;
  
  // Window state
  getWindow(instanceId: string): WindowState | null;
  getWindows(windowId?: string): WindowState[];
  isOpen(windowId: string): boolean;
  
  // Window communication
  sendMessage(instanceId: string, message: any): void;
  broadcast(windowId: string, message: any): void;
  
  // Events
  onWindowOpened(callback: (window: WindowState) => void): UnsubscribeFn;
  onWindowClosed(callback: (instanceId: string) => void): UnsubscribeFn;
  onWindowFocused(callback: (instanceId: string) => void): UnsubscribeFn;
}
```

### Open Options

```typescript
interface OpenOptions {
  position?: Position;
  size?: Size;
  title?: string;
  props?: `Record<string, any>`;
  focusOnOpen?: boolean;
  singleton?: boolean;
}
```

### Kernel API

```typescript
interface KernelAPI {
  // System info
  getSystemInfo(): SystemInfo;
  getUptime(): number;
  
  // Process management
  getProcesses(): ProcessInfo[];
  killProcess(pid: number): void;
  
  // File system (future)
  fs?: FileSystemAPI;
  
  // Registry (future)
  registry?: RegistryAPI;
}
```

### Storage API

```typescript
interface StorageAPI {
  // Plugin-scoped storage
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  keys(): string[];
  
  // Structured storage
  getObject<T>(key: string): T | null;
  setObject<T>(key: string, value: T): void;
  
  // Bulk operations
  getAll(): `Record<string, any>`;
  setAll(data: `Record<string, any>`): void;
}
```

### Event Bus API

```typescript
interface EventBusAPI {
  // Emit events
  emit(event: string, data?: any): void;
  
  // Subscribe to events
  on(event: string, handler: EventHandler): UnsubscribeFn;
  once(event: string, handler: EventHandler): UnsubscribeFn;
  off(event: string, handler: EventHandler): void;
  
  // Scoped events
  emitTo(pluginId: string, event: string, data?: any): void;
  onFrom(pluginId: string, event: string, handler: EventHandler): UnsubscribeFn;
}
```

### Component Registry API

```typescript
interface ComponentRegistryAPI {
  // Register components
  register(id: string, component: Component): void;
  unregister(id: string): void;
  
  // Get components
  get(id: string): Component | null;
  getAll(): `Map<string, Component>`;
  
  // Check availability
  has(id: string): boolean;
}
```

### Plugin State API

```typescript
interface PluginStateAPI {
  // Create reactive state
  create<T>(initialValue: T): `ReactiveState<T>`;
  
  // Derived state
  derived<T>(fn: () => T): `ReadonlyReactiveState<T>`;
  
  // Effects
  effect(fn: () => void | (() => void)): void;
  
  // Shared state
  createShared<T>(key: string, initialValue: T): `SharedState<T>`;
  getShared<T>(key: string): `SharedState<T>` | null;
}
```

## Plugin Instance

### Instance Interface

```typescript
interface PluginInstance {
  // State
  state?: any;
  
  // Methods
  activate?: () => void | Promise<void>;
  deactivate?: () => void | Promise<void>;
  destroy?: () => void | Promise<void>;
  
  // Event handlers
  onWindowOpened?: (windowId: string, instanceId: string) => void;
  onWindowClosed?: (windowId: string, instanceId: string) => void;
  onMessage?: (message: PluginMessage) => void;
  
  // Custom methods
  [key: string]: any;
}
```

### Plugin Message

```typescript
interface PluginMessage {
  from: string;          // Source plugin ID
  to: string;            // Target plugin ID
  type: string;          // Message type
  data?: any;            // Message payload
  timestamp: number;     // Message timestamp
  id?: string;           // Message ID for correlation
}
```

## Window Props Interface

### Standard Props

All window components receive these standard props:

```typescript
interface WindowComponentProps {
  // Window identity
  windowId: string;
  pluginId: string;
  instanceId: string;
  
  // Window state (read-only)
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  
  // Communication
  sendMessage: (message: any) => void;
  onMessage?: (message: any) => void;
  
  // Window control
  close: () => void;
  minimize: () => void;
  maximize: () => void;
  
  // Custom props
  [key: string]: any;
}
```

## Example: Composite Plugin

### SSH Terminal Plugin Structure

```typescript
import type { CompositePlugin, PluginContext, PluginInstance } from '@/types';
import ConnectionDialog from './ConnectionDialog.svelte';
import { Terminal } from '@/components/terminal';

export const sshTerminalPlugin: CompositePlugin = {
  id: 'ssh-terminal',
  name: 'SSH Terminal',
  version: '1.0.0',
  type: 'composite',
  
  windows: [
    {
      id: 'connection-dialog',
      component: ConnectionDialog,
      defaultTitle: 'SSH Connection',
      defaultIcon: 'icon-network-network-connections',
      defaultSize: { width: 400, height: 300 },
      isResizable: false,
      isSingleton: true
    }
  ],
  
  components: [
    {
      id: 'terminal',
      component: Terminal
    }
  ],
  
  main: (context: PluginContext): PluginInstance => {
    const connections = new Map();
    
    return {
      state: {
        connections,
        activeConnection: null
      },
      
      activate() {
        // Open connection dialog on activation
        context.windowManager.open('connection-dialog');
      },
      
      async connect(host: string, port: number, username: string) {
        // Create WebSocket connection
        const ws = new WebSocket(`ws://${host}:${port}/ws`);
        
        // Create terminal window
        const terminalId = context.windowManager.open('terminal', {
          title: `SSH - ${username}@${host}`,
          props: {
            mode: 'stream',
            enableInput: true,
            onInput: (data: string) => {
              if (ws.readyState === WebSocket.OPEN) {
                ws.send(data);
              }
            }
          }
        });
        
        // Get terminal API
        const terminalWindow = context.windowManager.getWindow(terminalId);
        const terminalAPI = terminalWindow.props.api;
        
        // Set up stream
        const stream = new ReadableStream({
          start(controller) {
            ws.onmessage = (e) => controller.enqueue(e.data);
            ws.onclose = () => {
              controller.close();
              connections.delete(terminalId);
            };
            ws.onerror = () => {
              controller.error(new Error('Connection failed'));
            };
          }
        });
        
        terminalAPI.attachStream(stream);
        
        // Store connection
        connections.set(terminalId, { ws, host, port, username });
        
        return terminalId;
      },
      
      disconnect(terminalId: string) {
        const connection = connections.get(terminalId);
        if (connection) {
          connection.ws.close();
          connections.delete(terminalId);
          context.windowManager.close(terminalId);
        }
      },
      
      onWindowClosed(windowId, instanceId) {
        // Clean up connection when terminal closes
        const connection = connections.get(instanceId);
        if (connection) {
          connection.ws.close();
          connections.delete(instanceId);
        }
      },
      
      destroy() {
        // Close all connections
        for (const [terminalId, connection] of connections) {
          connection.ws.close();
          context.windowManager.close(terminalId);
        }
        connections.clear();
      }
    };
  }
};
```

## Plugin Registration

### Registry Interface

```typescript
interface PluginRegistryAPI {
  // Register plugins
  register(plugin: CompositePlugin): void;
  registerWindow(plugin: WindowPlugin): void;
  registerService(plugin: ServicePlugin): void;
  
  // Unregister plugins
  unregister(pluginId: string): void;
  
  // Query plugins
  get(pluginId: string): Plugin | undefined;
  getAll(): Plugin[];
  getAllByType(type: string): Plugin[];
  has(pluginId: string): boolean;
  
  // Plugin instances
  getInstance(pluginId: string): PluginInstance | null;
  getInstances(): `Map<string, PluginInstance>`;
  
  // Lifecycle
  activate(pluginId: string): Promise<void>;
  deactivate(pluginId: string): Promise<void>;
  destroy(pluginId: string): Promise<void>;
}
```

### Registration Example

```typescript
import { pluginRegistry } from '@/plugins/pluginRegistry';
import { sshTerminalPlugin } from './plugins/ssh-terminal';

// Register plugin
pluginRegistry.register(sshTerminalPlugin);

// Activate plugin
await pluginRegistry.activate('ssh-terminal');

// Get instance
const instance = pluginRegistry.getInstance('ssh-terminal');

// Call custom method
await instance.connect('192.168.0.254', 7681, 'abu');
```

## Inter-Plugin Communication

### Message Passing

```typescript
// Plugin A sends message to Plugin B
context.events.emitTo('plugin-b', 'data-updated', { value: 42 });

// Plugin B receives message
context.events.onFrom('plugin-a', 'data-updated', (data) => {
  console.log('Received:', data.value);
});
```

### Shared State

```typescript
// Plugin A creates shared state
const counter = context.state.createShared('global-counter', 0);

// Plugin B accesses shared state
const counter = context.state.getShared('global-counter');
counter.value += 1;
```

### Window Messages

```typescript
// Parent window sends to child
context.windowManager.sendMessage(childWindowId, {
  type: 'config',
  data: { theme: 'dark' }
});

// Child window receives in component
export let onMessage;
$effect(() => {
  if (onMessage) {
    onMessage((message) => {
      if (message.type === 'config') {
        applyConfig(message.data);
      }
    });
  }
});
```

## Security & Sandboxing

### Permission System

```typescript
interface PluginPermissions {
  windows?: {
    create?: boolean;
    closeOthers?: boolean;
  };
  storage?: {
    read?: boolean;
    write?: boolean;
  };
  network?: {
    fetch?: boolean;
    websocket?: boolean;
  };
  system?: {
    execute?: boolean;
    registry?: boolean;
  };
}
```

### Validation

```typescript
function validatePluginOperation(
  pluginId: string,
  operation: string
): boolean {
  const plugin = pluginRegistry.get(pluginId);
  const permissions = plugin.permissions || {};
  
  // Check if plugin has permission
  return hasPermission(permissions, operation);
}
```

## Plugin Development

### Project Structure

```
my-plugin/
├── package.json
├── tsconfig.json
├── src/
│   ├── index.ts           # Plugin definition
│   ├── components/
│   │   ├── MainWindow.svelte
│   │   └── SettingsDialog.svelte
│   ├── services/
│   │   └── DataService.ts
│   └── utils/
│       └── helpers.ts
├── tests/
│   ├── unit/
│   └── integration/
└── README.md
```

### Plugin Definition Template

```typescript
import type { CompositePlugin } from '@/types';

export const myPlugin: CompositePlugin = {
  id: 'my-plugin',
  name: 'My Plugin',
  version: '1.0.0',
  description: 'A sample plugin',
  type: 'composite',
  
  windows: [
    // Window definitions
  ],
  
  main: (context) => {
    // Plugin instance
    return {
      activate() {
        // Initialization logic
      },
      
      deactivate() {
        // Cleanup logic
      }
    };
  }
};
```

## Testing

### Unit Tests

```typescript
describe('MyPlugin', () => {
  let context: PluginContext;
  let instance: PluginInstance;
  
  beforeEach(() => {
    context = createMockContext();
    instance = myPlugin.main(context);
  });
  
  test('activates correctly', async () => {
    await instance.activate();
    expect(context.windowManager.open).toHaveBeenCalled();
  });
  
  test('handles messages', () => {
    instance.onMessage({ type: 'test', data: 'hello' });
    // Assertions
  });
});
```

### Integration Tests

```typescript
describe('Plugin Integration', () => {
  test('plugin opens windows', async () => {
    await pluginRegistry.register(myPlugin);
    await pluginRegistry.activate('my-plugin');
    
    const windows = windowManager.getWindows('my-plugin');
    expect(windows.length).toBeGreaterThan(0);
  });
});
```

## Performance Considerations

- **Lazy Loading**: Load plugin code only when activated
- **Memory Management**: Clean up resources on deactivation
- **Event Throttling**: Limit high-frequency events
- **State Batching**: Batch state updates to minimize renders
- **Window Limits**: Enforce maximum window count per plugin

## Error Handling

```typescript
try {
  await pluginRegistry.activate('my-plugin');
} catch (error) {
  if (error instanceof PluginActivationError) {
    console.error('Failed to activate plugin:', error.message);
    // Show error dialog
  } else if (error instanceof PermissionError) {
    console.error('Insufficient permissions:', error.message);
    // Request permissions
  } else {
    throw error;
  }
}
```

## Migration from Old System

### Old Window Plugin

```typescript
// Old
const oldPlugin: WindowPlugin = {
  id: 'my-app',
  name: 'My App',
  version: '1.0.0',
  component: MyComponent,
  defaultTitle: 'My App',
  defaultIcon: 'icon-app'
};
```

### New Composite Plugin

```typescript
// New
const newPlugin: CompositePlugin = {
  id: 'my-app',
  name: 'My App',
  version: '1.0.0',
  type: 'composite',
  windows: [{
    id: 'main',
    component: MyComponent,
    defaultTitle: 'My App',
    defaultIcon: 'icon-app'
  }],
  main: (context) => ({
    activate() {
      context.windowManager.open('main');
    }
  })
};
```

## Summary

The enhanced Plugin System provides a powerful, flexible architecture for building complex applications in the Abu Web Kernel. Plugins can create multiple windows, execute custom logic, manage state, and communicate with other plugins and the kernel. The system is designed for extensibility, security, and developer productivity, enabling rich application development while maintaining system integrity.
