---
id: plugin-development
title: Plugin Development
---

# Plugin Development Guide

## Overview

This comprehensive guide teaches you how to build production-quality plugins for the Abu OS 98 Web Kernel. You'll learn best practices, advanced patterns, and how to create complex, stateful applications.

## Important: Self-Contained Architecture

The Abu OS 98 Web Kernel is **self-contained** and bundles all dependencies including the Svelte runtime. Your application does not need to install Svelte separately. Simply install the kernel:

```bash
npm install abu-operating-system-98-web-kernel
```

All Svelte components, the `mount()` API, and reactive primitives are exported directly from the kernel package.

## Plugin Lifecycle

### 1. Component Creation

Every plugin uses kernel-provided components and APIs through the bundled Svelte runtime.

**Minimal Plugin Component:**

```svelte
<!-- src/plugins/MyPlugin.svelte -->
<script lang="ts">
  interface Props {
    windowId: string;       // Unique window instance ID
    close: () => void;      // Function to close this window
  }
  
  let { windowId, close }: Props = $props();
</script>

<div class="my-plugin">
  <p>Window ID: {windowId}</p>
  <button onclick={close}>Close</button>
</div>

<style>
  .my-plugin {
    padding: 16px;
  }
</style>
```

### 2. Plugin Registration

Register your plugin with the plugin registry.

```typescript
// src/plugins/index.ts
import type { WindowPlugin } from 'abu-operating-system-98-web-kernel';
import MyPlugin from './MyPlugin.svelte';

export const myPlugin: WindowPlugin = {
  id: 'my-plugin',              // Unique ID (kebab-case)
  name: 'My Plugin',            // Display name
  version: '1.0.0',             // Semantic version
  component: MyPlugin,          // Svelte component
  defaultTitle: 'My Plugin',    // Window title
  defaultIcon: 'icon-apps-notepad',  // Icon class
  defaultSize: {                // Optional default size
    width: 600,
    height: 400
  },
  isResizable: true,            // Allow resize
  onInstall: () => {            // Called on registration
    console.log('MyPlugin installed');
  },
  onUninstall: () => {          // Called on unregistration
    console.log('MyPlugin uninstalled');
  }
};
```

### 3. Shell Integration

Add your plugin to the Shell using kernel's `mount()` API:

```typescript
// src/app.ts
import { 
  Shell, 
  MockKernel, 
  mount 
} from 'abu-operating-system-98-web-kernel';
import { myPlugin } from './plugins';

const kernel = new MockKernel();

mount(Shell, {
  target: document.getElementById('app')!,
  props: {
    kernel,
    plugins: [myPlugin]
  }
});
```

## Component State Management

### Local State ($state)

Use `$state` for component-scoped reactive variables.

```html
<script lang="ts">
  // Props
  let { windowId, close }: Props = $props();
  
  // Local state
  let count = $state(0);
  let inputValue = $state('');
  let items = $state<string[]>([]);
  let isLoading = $state(false);
  
  // Derived state
  const doubled = $derived(count * 2);
  const hasItems = $derived(items.length > 0);
</script>

<div>
  <p>Count: {count} (Doubled: {doubled})</p>
  <button onclick={() => count++}>Increment</button>
  
  <input bind:value={inputValue} placeholder="Type something..." />
  
  {#if hasItems}
    <ul>
      {#each items as item}
        <li>{item}</li>
      {/each}
    </ul>
  {/if}
</div>
```

### Persisting Plugin State

Use localStorage for state that should persist across sessions.

```svelte
<script lang="ts">
  import { onMount } from 'abu-operating-system-98-web-kernel';
  
  let { windowId, close }: Props = $props();
  
  // State
  let notes = $state<string>('');
  const storageKey = 'my-plugin:notes';
  
  // Load from localStorage on mount
  onMount(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      notes = stored;
    }
  });
  
  // Save to localStorage when notes change
  $effect(() => {
    localStorage.setItem(storageKey, notes);
  });
</script>

<div>
  <textarea bind:value={notes} placeholder="Your notes..."></textarea>
</div>
```

### Sharing State Between Windows

Multiple windows of the same plugin get separate component instances. To share state, use a module-level store.

```typescript
// src/plugins/stores/sharedNotes.svelte.ts
let notes = $state<string[]>([]);

export const sharedNotes = {
  get all() {
    return notes;
  },
  
  add(note: string) {
    notes.push(note);
  },
  
  remove(index: number) {
    notes.splice(index, 1);
  },
  
  clear() {
    notes = [];
  }
};
```

Use in plugin:

```svelte
<script lang="ts">
  import { sharedNotes } from './stores/sharedNotes.svelte';
  
  let newNote = $state('');
  
  function addNote() {
    if (newNote.trim()) {
      sharedNotes.add(newNote);
      newNote = '';
    }
  }
</script>

<div>
  <input bind:value={newNote} placeholder="New note..." />
  <button onclick={addNote}>Add</button>
  
  <ul>
    {#each sharedNotes.all as note, index}
      <li>
        {note}
        <button onclick={() => sharedNotes.remove(index)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>
```

## Using Kernel Interface

Access kernel functions for system info and command execution.

### Getting Kernel Instance

```svelte
<script lang="ts">
  import { getContext } from 'abu-operating-system-98-web-kernel';
  import type { KernelInterface } from 'abu-operating-system-98-web-kernel';
  
  let { windowId, close }: Props = $props();
  
  const kernel = getContext<KernelInterface>('kernel');
  
  let systemInfo = $state<SystemInfo | null>(null);
  let loading = $state(false);
  
  async function loadSystemInfo() {
    loading = true;
    try {
      systemInfo = await kernel.getSystemInfo();
    } catch (error) {
      console.error('Failed to load system info:', error);
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    loadSystemInfo();
  });
</script>

<div>
  {#if loading}
    <p>Loading...</p>
  {:else if systemInfo}
    <h2>{systemInfo.osName} v{systemInfo.version}</h2>
    <p>Uptime: {systemInfo.uptime} seconds</p>
    <p>Memory: {systemInfo.usedMemory}MB / {systemInfo.totalMemory}MB</p>
  {:else}
    <p>Failed to load system info</p>
  {/if}
</div>
```

### Executing Commands

```svelte
<script lang="ts">
  import { getContext } from 'abu-operating-system-98-web-kernel';
  import type { KernelInterface, CommandResult } from 'abu-operating-system-98-web-kernel';
  
  const kernel = getContext<KernelInterface>('kernel');
  
  let command = $state('ping google.com');
  let result = $state<CommandResult | null>(null);
  let executing = $state(false);
  
  async function executeCommand() {
    executing = true;
    try {
      result = await kernel.executeCommand(command);
    } catch (error) {
      console.error('Command failed:', error);
    } finally {
      executing = false;
    }
  }
</script>

<div class="terminal">
  <div class="input-row">
    <input bind:value={command} disabled={executing} />
    <button onclick={executeCommand} disabled={executing}>
      {executing ? 'Executing...' : 'Execute'}
    </button>
  </div>
  
  {#if result}
    <div class="result">
      <p>Exit Code: {result.exitCode}</p>
      <p>Execution Time: {result.executionTime}ms</p>
      
      {#if result.stdout}
        <pre class="stdout">{result.stdout}</pre>
      {/if}
      
      {#if result.stderr}
        <pre class="stderr">{result.stderr}</pre>
      {/if}
    </div>
  {/if}
</div>
```

## Accessing OS Stores

Use kernel stores to interact with the OS.

### Opening Other Plugins

```svelte
<script lang="ts">
  import { windowManager } from 'abu-operating-system-98-web-kernel';
  
  function openCalculator() {
    windowManager.open('calculator');
  }
  
  function openNotepad() {
    windowManager.open('notepad', {
      position: { x: 200, y: 200 },
      size: { width: 500, height: 600 },
      title: 'My Notes'
    });
  }
</script>

<div>
  <button onclick={openCalculator}>Open Calculator</button>
  <button onclick={openNotepad}>Open Notepad</button>
</div>
```

### Monitoring Window State

```svelte
<script lang="ts">
  import { windowManager } from 'abu-operating-system-98-web-kernel';
  
  const windowCount = $derived(windowManager.all.length);
  const openWindows = $derived(windowManager.all.map(w => w.title));
</script>

<div>
  <p>Open Windows: {windowCount}</p>
  <ul>
    {#each openWindows as title}
      <li>{title}</li>
    {/each}
  </ul>
</div>
```

### Using Theme

```svelte
<script lang="ts">
  import { theme } from 'abu-operating-system-98-web-kernel';
</script>

<div>
  <p>Current theme: {theme.current}</p>
  <button onclick={() => theme.toggle()}>Toggle Theme</button>
  
  <div class="themed-content" class:dark={theme.isDark}>
    This content changes based on theme
  </div>
</div>

<style>
  .themed-content {
    padding: 16px;
    background: #fff;
    color: #000;
  }
  
  .themed-content.dark {
    background: #1a1a2e;
    color: #fff;
  }
</style>
```

## Advanced Patterns

### Modal Dialogs

Create modal confirmation dialogs.

```svelte
<script lang="ts">
  let showDialog = $state(false);
  let dialogResult = $state<string | null>(null);
  
  function confirmDelete() {
    showDialog = true;
  }
  
  function handleYes() {
    dialogResult = 'User clicked Yes';
    showDialog = false;
    // Perform delete action
  }
  
  function handleNo() {
    dialogResult = 'User clicked No';
    showDialog = false;
  }
</script>

<div>
  <button onclick={confirmDelete}>Delete Item</button>
  
  {#if dialogResult}
    <p>{dialogResult}</p>
  {/if}
</div>

{#if showDialog}
  <div class="modal-overlay" onclick={() => showDialog = false}>
    <div class="dialog" onclick={(e) => e.stopPropagation()}>
      <div class="dialog-titlebar">
        <span>Confirm Delete</span>
      </div>
      <div class="dialog-content">
        <p>Are you sure you want to delete this item?</p>
        <div class="dialog-buttons">
          <button onclick={handleYes}>Yes</button>
          <button onclick={handleNo}>No</button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
  }
  
  .dialog {
    background: #c0c0c0;
    border: 2px outset #c0c0c0;
    min-width: 300px;
    box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.5);
  }
  
  .dialog-titlebar {
    background: #000080;
    color: #fff;
    padding: 2px 4px;
    font-weight: bold;
    font-size: 11px;
  }
  
  .dialog-content {
    padding: 16px;
  }
  
  .dialog-buttons {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
    margin-top: 16px;
  }
</style>
```

### Async Data Loading

Handle async data with loading and error states.

```svelte
<script lang="ts">
  interface User {
    id: number;
    name: string;
    email: string;
  }
  
  let users = $state<User[]>([]);
  let loading = $state(false);
  let error = $state<string | null>(null);
  
  async function loadUsers() {
    loading = true;
    error = null;
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch');
      users = await response.json();
    } catch (err) {
      error = err instanceof Error ? err.message : 'Unknown error';
    } finally {
      loading = false;
    }
  }
  
  onMount(() => {
    loadUsers();
  });
</script>

<div>
  {#if loading}
    <p>Loading users...</p>
  {:else if error}
    <div class="error">
      <p>Error: {error}</p>
      <button onclick={loadUsers}>Retry</button>
    </div>
  {:else if users.length > 0}
    <ul>
      {#each users as user}
        <li>{user.name} ({user.email})</li>
      {/each}
    </ul>
  {:else}
    <p>No users found</p>
  {/if}
</div>
```

### Form Handling

Build forms with validation.

```svelte
<script lang="ts">
  let formData = $state({
    name: '',
    email: '',
    message: ''
  });
  
  let errors = $state<`Record<string, string>`>({});
  let submitting = $state(false);
  let submitted = $state(false);
  
  function validate() {
    const newErrors: `Record<string, string>` = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    errors = newErrors;
    return Object.keys(newErrors).length === 0;
  }
  
  async function handleSubmit(event: Event) {
    event.preventDefault();
    
    if (!validate()) return;
    
    submitting = true;
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      submitted = true;
      
      // Reset form
      formData = { name: '', email: '', message: '' };
      errors = {};
    } catch (error) {
      console.error('Submission failed:', error);
    } finally {
      submitting = false;
    }
  }
</script>

<form onsubmit={handleSubmit}>
  <div class="field">
    <label for="name">Name:</label>
    <input
      id="name"
      bind:value={formData.name}
      disabled={submitting}
      class:error={errors.name}
    />
    {#if errors.name}
      <span class="error-text">{errors.name}</span>
    {/if}
  </div>
  
  <div class="field">
    <label for="email">Email:</label>
    <input
      id="email"
      type="email"
      bind:value={formData.email}
      disabled={submitting}
      class:error={errors.email}
    />
    {#if errors.email}
      <span class="error-text">{errors.email}</span>
    {/if}
  </div>
  
  <div class="field">
    <label for="message">Message:</label>
    <textarea
      id="message"
      bind:value={formData.message}
      disabled={submitting}
      class:error={errors.message}
    />
    {#if errors.message}
      <span class="error-text">{errors.message}</span>
    {/if}
  </div>
  
  <button type="submit" disabled={submitting}>
    {submitting ? 'Submitting...' : 'Submit'}
  </button>
  
  {#if submitted}
    <p class="success">Form submitted successfully!</p>
  {/if}
</form>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
  }
  
  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  
  input, textarea {
    padding: 4px;
    border: 2px inset #808080;
    font-family: inherit;
    font-size: 11px;
  }
  
  input.error, textarea.error {
    border-color: red;
  }
  
  .error-text {
    color: red;
    font-size: 10px;
  }
  
  .success {
    color: green;
    font-weight: bold;
  }
</style>
```

## Testing Plugins

### Unit Testing Component Logic

```typescript
// src/plugins/__tests__/MyPlugin.test.ts
import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/svelte';
import MyPlugin from '../MyPlugin.svelte';

describe('MyPlugin', () => {
  test('renders with window ID', () => {
    const { getByText } = render(MyPlugin, {
      props: {
        windowId: 'test-123',
        close: () => {}
      }
    });
    
    expect(getByText(/test-123/)).toBeInTheDocument();
  });
  
  test('closes when close button clicked', async () => {
    const close = vi.fn();
    const { getByText } = render(MyPlugin, {
      props: {
        windowId: 'test-123',
        close
      }
    });
    
    await userEvent.click(getByText('Close'));
    
    expect(close).toHaveBeenCalled();
  });
});
```

## Best Practices

### 1. Use Semantic IDs

```typescript
// ❌ Bad
id: 'myPlugin'
id: 'plugin1'

// ✅ Good
id: 'text-editor'
id: 'image-viewer'
id: 'system-monitor'
```

### 2. Handle Errors Gracefully

```typescript
// ❌ Bad
const data = await fetch(url).then(r => r.json());

// ✅ Good
try {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  const data = await response.json();
  // Use data
} catch (error) {
  console.error('Failed to fetch:', error);
  // Show error to user
}
```

### 3. Clean Up Side Effects

```typescript
// ✅ Always clean up timers, listeners, etc.
$effect(() => {
  const timer = setInterval(() => {
    // Do something
  }, 1000);
  
  return () => clearInterval(timer);
});

$effect(() => {
  const handler = () => {
    // Handle event
  };
  
  window.addEventListener('resize', handler);
  
  return () => window.removeEventListener('resize', handler);
});
```

### 4. Provide Good UX

- Show loading states for async operations
- Display error messages clearly
- Disable buttons during submission
- Provide confirmation for destructive actions
- Save state frequently

### 5. Follow Windows 98 Aesthetic

- Use system fonts (MS Sans Serif 11px)
- Use beveled borders
- No smooth animations
- Fixed pixel dimensions
- Use Win98 color palette

## Summary

You now know how to:

- ✅ Create plugin components with props and state
- ✅ Register plugins with the plugin registry
- ✅ Manage local and shared state
- ✅ Use kernel interface for system operations
- ✅ Access OS stores (windowManager, theme, etc.)
- ✅ Build advanced features (modals, forms, async data)
- ✅ Test your plugins
- ✅ Follow best practices

## Next Steps

- Read `/docs/examples/` for complete plugin examples
- See `/docs/guides/testing-guide.md` for comprehensive testing strategies
- Check `/docs/technical-specs/` for detailed API references

Happy plugin development! 🚀
