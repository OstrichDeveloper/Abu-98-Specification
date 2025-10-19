---
id: state-persistence-guide
title: State Persistence Guide
---

# State Persistence Guide

## Overview

This guide shows you how state persistence works in Abu OS 98 Web Kernel and how to leverage it in your plugins. All state automatically saves to localStorage and restores on page load - no configuration needed!

## How It Works

### Automatic Persistence

The kernel automatically persists:
- Open windows (positions, sizes, states)
- Theme preference (light/dark)
- Audio settings (volume, muted)
- Desktop icon positions (if customized)

**You don't need to do anything - it just works!**

### localStorage Schema

State is stored in a single key: `abu-os-98:state:v1`

```json
{
  "version": 1,
  "timestamp": 1697120000000,
  "ttl": 7,
  "windows": {
    "open": [
      {
        "pluginId": "calculator",
        "position": {"x": 100, "y": 100},
        "size": {"width": 300, "height": 400},
        "state": "normal"
      }
    ],
    "history": ["notepad", "paint"]
  },
  "desktop": {
    "layout": "grid",
    "icons": []
  },
  "theme": {
    "current": "light",
    "auto": false
  },
  "audio": {
    "volume": 0.5,
    "muted": false,
    "track": null
  },
  "system": {
    "taskbarPosition": "bottom",
    "startMenuPinned": []
  }
}
```

## Plugin State Persistence

### Simple Plugin State

Store plugin-specific data in localStorage using a namespaced key.

```html
<!-- NotesPlugin.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  
  let { windowId, close }: Props = $props();
  
  // State
  let notes = $state('');
  const STORAGE_KEY = 'notes-plugin:content';
  
  // Load on mount
  onMount(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      notes = stored;
    }
  });
  
  // Save on change (debounced)
  let saveTimer: number;
  $effect(() => {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, notes);
    }, 500); // Save 500ms after typing stops
  });
</script>

<div>
  <textarea
    bind:value={notes}
    placeholder="Your notes will be saved automatically..."
    rows="20"
    cols="60"
  />
  <p class="status">Changes saved automatically</p>
</div>

<style>
  textarea {
    width: 100%;
    padding: 8px;
    font-family: 'Courier New', monospace;
    border: 2px inset #808080;
  }
  
  .status {
    font-size: 10px;
    color: #808080;
    margin-top: 8px;
  }
</style>
```

### Complex Plugin State

Use a helper function for complex state objects.

```typescript
// src/plugins/utils/storage.ts
export function createPersistedState<T>(key: string, defaultValue: T) {
  let state = $state<T>(defaultValue);
  let initialized = false;
  
  // Load from localStorage
  function load() {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        state = JSON.parse(stored);
      }
    } catch (error) {
      console.warn(`Failed to load ${key}:`, error);
    }
    initialized = true;
  }
  
  // Save to localStorage (debounced)
  let saveTimer: number;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error(`Failed to save ${key}:`, error);
      }
    }, 500);
  }
  
  return {
    get value() { return state; },
    set value(newValue: T) {
      state = newValue;
      if (initialized) save();
    },
    load,
    save: () => {
      clearTimeout(saveTimer);
      localStorage.setItem(key, JSON.stringify(state));
    },
    clear: () => {
      localStorage.removeItem(key);
      state = defaultValue;
    }
  };
}
```

Usage in plugin:

```html
<script lang="ts">
  import { onMount } from 'svelte';
  import { createPersistedState } from './utils/storage';
  
  interface TodoItem {
    id: string;
    text: string;
    completed: boolean;
  }
  
  const todos = createPersistedState<TodoItem[]>('todo-plugin:items', []);
  
  onMount(() => {
    todos.load();
  });
  
  function addTodo(text: string) {
    todos.value = [...todos.value, {
      id: crypto.randomUUID(),
      text,
      completed: false
    }];
  }
  
  function toggleTodo(id: string) {
    todos.value = todos.value.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    );
  }
  
  function deleteTodo(id: string) {
    todos.value = todos.value.filter(todo => todo.id !== id);
  }
</script>

<div>
  <ul>
    {#each todos.value as todo}
      <li>
        <input
          type="checkbox"
          checked={todo.completed}
          onchange={() => toggleTodo(todo.id)}
        />
        <span class:completed={todo.completed}>{todo.text}</span>
        <button onclick={() => deleteTodo(todo.id)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  .completed {
    text-decoration: line-through;
    color: #808080;
  }
</style>
```

### Per-Window State

Store state specific to each window instance.

```html
<script lang="ts">
  import { onMount } from 'svelte';
  
  let { windowId, close }: Props = $props();
  
  // Window-specific state
  let windowNotes = $state('');
  const storageKey = `notes-plugin:window-${windowId}`;
  
  onMount(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      windowNotes = stored;
    }
    
    // Clean up on close
    return () => {
      localStorage.removeItem(storageKey);
    };
  });
  
  $effect(() => {
    localStorage.setItem(storageKey, windowNotes);
  });
</script>
```

## Best Practices

### 1. Use Namespaced Keys

```typescript
// ❌ Bad - could conflict
localStorage.setItem('notes', data);

// ✅ Good - namespaced
localStorage.setItem('my-plugin:notes', data);
localStorage.setItem('my-plugin:settings', data);
```

### 2. Debounce Writes

```typescript
// ❌ Bad - writes on every keystroke
$effect(() => {
  localStorage.setItem(key, value);
});

// ✅ Good - debounced
let timer: number;
$effect(() => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    localStorage.setItem(key, value);
  }, 500);
});
```

### 3. Handle Errors

```typescript
// ✅ Always wrap in try/catch
try {
  localStorage.setItem(key, JSON.stringify(data));
} catch (error) {
  if (error instanceof DOMException && error.name === 'QuotaExceededError') {
    console.error('localStorage quota exceeded');
    // Clear old data or notify user
  } else {
    console.error('Failed to save:', error);
  }
}
```

### 4. Validate Restored Data

```typescript
// ✅ Validate schema
try {
  const stored = localStorage.getItem(key);
  if (stored) {
    const data = JSON.parse(stored);
    
    // Validate structure
    if (data && typeof data === 'object' && 'version' in data) {
      if (data.version === 1) {
        state = data;
      } else {
        console.warn('Unsupported version, using defaults');
      }
    }
  }
} catch (error) {
  console.error('Failed to restore:', error);
}
```

### 5. Provide Clear/Reset

```typescript
// ✅ Let users clear data
function clearAllData() {
  if (confirm('Clear all saved data?')) {
    localStorage.removeItem('my-plugin:notes');
    localStorage.removeItem('my-plugin:settings');
    notes = '';
    settings = defaultSettings;
  }
}
```

## Testing State Persistence

### Manual Testing

1. Open your plugin
2. Make changes
3. Refresh page
4. Verify state restored

### Automated Testing

```typescript
// src/plugins/__tests__/persistence.test.ts
import { describe, test, expect, beforeEach } from 'vitest';

describe('Plugin State Persistence', () => {
  beforeEach(() => {
    localStorage.clear();
  });
  
  test('saves notes to localStorage', () => {
    const notes = 'Test notes';
    localStorage.setItem('notes-plugin:content', notes);
    
    const stored = localStorage.getItem('notes-plugin:content');
    expect(stored).toBe(notes);
  });
  
  test('restores notes from localStorage', () => {
    localStorage.setItem('notes-plugin:content', 'Saved notes');
    
    // Simulate component mount
    const restored = localStorage.getItem('notes-plugin:content');
    expect(restored).toBe('Saved notes');
  });
  
  test('handles missing data gracefully', () => {
    const restored = localStorage.getItem('nonexistent-key');
    expect(restored).toBeNull();
  });
  
  test('handles corrupted data', () => {
    localStorage.setItem('notes-plugin:content', '{invalid json');
    
    let restored;
    try {
      restored = JSON.parse(localStorage.getItem('notes-plugin:content')!);
    } catch (error) {
      restored = null; // Fallback to default
    }
    
    expect(restored).toBeNull();
  });
});
```

## Debugging State

### View Stored State

```typescript
// In browser console
localStorage.getItem('abu-os-98:state:v1');

// Pretty print
JSON.parse(localStorage.getItem('abu-os-98:state:v1'));

// View all keys
Object.keys(localStorage);
```

### Clear All State

```typescript
// Clear kernel state
localStorage.removeItem('abu-os-98:state:v1');

// Clear all plugin state
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('my-plugin:')) {
    localStorage.removeItem(key);
  }
});

// Nuclear option - clear everything
localStorage.clear();
```

### Monitor Changes

```typescript
// Log all localStorage writes
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  console.log(`localStorage.setItem('${key}', ...)`, value.length, 'bytes');
  originalSetItem.call(this, key, value);
};
```

## Summary

State persistence in Abu OS 98:

- ✅ Automatic for OS state (windows, theme, audio)
- ✅ Manual for plugin state (you control what/when)
- ✅ localStorage-based (simple, fast, private)
- ✅ Debounced writes (performance optimized)
- ✅ Schema versioning (forward compatible)

## Next Steps

- See `/docs/architecture/state-persistence.md` for technical details
- Read `/docs/examples/stateful-plugin/` for a complete example
- Check `/docs/guides/testing-guide.md` for testing strategies

Your plugins now persist state like a real operating system! 💾
