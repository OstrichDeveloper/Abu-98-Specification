---
id: plugin-api
title: Plugin Api
---

# Plugin API Specification

## WindowPlugin Interface

```typescript
interface WindowPlugin {
  id: string;                    // Required: unique identifier (kebab-case)
  name: string;                  // Required: display name
  version: string;               // Required: semantic version (e.g. "1.0.0")
  component: SvelteComponent;    // Required: Svelte 5 component
  defaultTitle: string;          // Required: window titlebar text
  defaultIcon: string;           // Required: CSS class (e.g. "icon-apps-calculator")
  defaultSize?: {                // Optional: default window size
    width: number;               // Min: 200px
    height: number;              // Min: 100px
  };
  isResizable?: boolean;         // Optional: allow resize (default: true)
  onInstall?: () => void;        // Optional: called on registration
  onUninstall?: () => void;      // Optional: called on unregistration
}
```

## PluginRegistry Interface

```typescript
interface PluginRegistry {
  registerWindow(plugin: WindowPlugin): void;
  unregisterWindow(id: string): void;
  get(id: string): WindowPlugin | undefined;
  getAllPlugins(): WindowPlugin[];
  has(id: string): boolean;
}
```

## Plugin Component Contract

Plugins receive these props:

```typescript
interface PluginComponentProps {
  windowId: string;              // UUID of window instance
  close: () => void;             // Callback to close window
}
```

## Registration Example

```typescript
import Calculator from './Calculator.svelte';

const plugin: WindowPlugin = {
  id: 'calculator',
  name: 'Calculator',
  version: '1.0.0',
  component: Calculator,
  defaultTitle: 'Calculator',
  defaultIcon: 'icon-apps-calculator',
  defaultSize: {
    width: 300,
    height: 400
  },
  isResizable: false,
  onInstall: () => console.log('Calculator installed'),
  onUninstall: () => console.log('Calculator uninstalled')
};

pluginRegistry.registerWindow(plugin);
```

See `/docs/architecture/plugin-system.md` for detailed specifications.
