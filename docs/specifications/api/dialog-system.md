---
id: dialog-system
title: Dialog System
---

# Dialog System

## Overview

The Abu OS 98 Web Kernel provides a custom dialog system that replaces native browser alerts with authentic Windows 98-styled message boxes. This system integrates seamlessly with the kernel's visual design and provides better control, testability, and user experience.

## Rationale

### Why Custom Dialogs?

**Visual Consistency**
- Native browser `alert()`, `confirm()`, and `prompt()` dialogs don't match the Windows 98 aesthetic
- Cannot style native dialogs to fit the retro theme
- Custom dialogs maintain authentic Windows 98 look with proper fonts, bevels, and colors

**Control & Customization**
- Full control over button labels, icons, and behavior
- Support for custom button configurations (OK, Yes/No, Retry/Cancel, etc.)
- Can add application-specific functionality

**Non-blocking Architecture**
- Native `alert()` blocks JavaScript execution, freezing the entire page
- Custom dialogs use promises/async-await for modern, non-blocking behavior
- Better integration with Svelte's reactive system

**Testability**
- Cannot properly test code that uses native alerts
- Custom dialogs can be mocked and tested programmatically
- Automated tests can simulate user interactions

**Accessibility**
- Better control over ARIA labels and keyboard navigation
- Can implement custom focus management
- Screen reader friendly

## Architecture

```
┌─────────────────────────────────────────────────┐
│          Application Code                        │
│  dialogManager.alert('Message')                  │
│  dialogManager.confirm('Are you sure?')          │
│  dialogManager.error('Failed to load')           │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│      Dialog Manager Store                        │
│  (stores/dialogManager.svelte.ts)                │
│                                                   │
│  - Manages queue of pending dialogs              │
│  - Tracks active dialog state                    │
│  - Returns promises for user responses           │
│  - Handles keyboard events (Enter, Esc)          │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│          Shell Component                         │
│  Conditionally renders active dialog             │
│  `{#if activeDialog}<MessageBox .../>{/if}`      │
└─────────────────────────────────────────────────┘
                     ↓
┌─────────────────────────────────────────────────┐
│      MessageBox Component                        │
│  (components/dialogs/MessageBox.svelte)          │
│                                                   │
│  - Windows 98 styled dialog                      │
│  - Configurable icon, title, message, buttons    │
│  - Backdrop prevents OS interaction              │
│  - Z-index: 2000 (above all windows)             │
└─────────────────────────────────────────────────┘
```

## API Reference

### Basic Methods

#### `alert(message: string, title?: string): Promise<void>`

Displays an informational message with an OK button.

```typescript
await dialogManager.alert('Settings saved successfully');
await dialogManager.alert('File uploaded', 'Success');
```

**Parameters:**
- `message` - The message to display
- `title` - Optional title (defaults to application name)

**Returns:** Promise that resolves when user clicks OK

---

#### `confirm(message: string, title?: string): Promise<boolean>`

Displays a question with Yes/No buttons.

```typescript
const confirmed = await dialogManager.confirm('Delete this file?');
if (confirmed) {
  // User clicked Yes
} else {
  // User clicked No
}
```

**Parameters:**
- `message` - The question to ask
- `title` - Optional title (defaults to "Confirm")

**Returns:** Promise that resolves to `true` (Yes) or `false` (No)

---

#### `error(message: string, title?: string): Promise<void>`

Displays an error message with error icon and OK button.

```typescript
await dialogManager.error('Failed to connect to server');
await dialogManager.error('Invalid input', 'Validation Error');
```

**Parameters:**
- `message` - The error message to display
- `title` - Optional title (defaults to "Error")

**Returns:** Promise that resolves when user clicks OK

---

#### `warning(message: string, title?: string): Promise<void>`

Displays a warning message with warning icon and OK button.

```typescript
await dialogManager.warning('Disk space is running low');
await dialogManager.warning('Unsaved changes will be lost', 'Warning');
```

**Parameters:**
- `message` - The warning message to display
- `title` - Optional title (defaults to "Warning")

**Returns:** Promise that resolves when user clicks OK

---

### Advanced Method

#### `show(options: DialogOptions): Promise<any>`

Displays a fully customizable dialog.

```typescript
const result = await dialogManager.show({
  title: 'Format Drive C:',
  message: 'All data will be permanently lost. Continue?',
  type: 'warning',
  buttons: [
    { label: 'Format', value: 'format' },
    { label: 'Cancel', value: 'cancel' }
  ]
});

if (result === 'format') {
  // User chose to format
}
```

**Parameters:**

```typescript
interface DialogOptions {
  title: string;
  message: string;
  type: 'info' | 'error' | 'warning' | 'question';
  buttons: DialogButton[];
}

interface DialogButton {
  label: string;      // Button text
  value: any;         // Value returned when button clicked
  default?: boolean;  // If true, triggered by Enter key
}
```

**Returns:** Promise that resolves to the `value` of the clicked button

---

## Dialog Types & Icons

| Type | Icon | Usage |
|------|------|-------|
| `info` | ℹ️ | Informational messages, confirmations |
| `error` | ⚠️ | Error messages, failures |
| `warning` | ⚠️ | Warnings, cautionary messages |
| `question` | ❓ | Questions requiring user decision |

## Integration Guide

### 1. Import the Dialog Manager

```typescript
import { dialogManager } from 'abu-os-98-web-kernel';
```

### 2. Use in Your Code

```typescript
// Simple alert
await dialogManager.alert('Operation completed');

// Confirmation
const proceed = await dialogManager.confirm('Save changes?');
if (proceed) {
  saveData();
}

// Error handling
try {
  await loadData();
} catch (error) {
  await dialogManager.error('Failed to load data');
}
```

### 3. In Svelte Components

```svelte
<script lang="ts">
  import { dialogManager } from 'abu-os-98-web-kernel';
  
  async function handleDelete() {
    const confirmed = await dialogManager.confirm(
      'Delete this item permanently?',
      'Confirm Delete'
    );
    
    if (confirmed) {
      // Delete the item
    }
  }
</script>

<button onclick={handleDelete}>Delete</button>
```

## Migration from Native `alert()`

### Before (Native Alerts)

```typescript
alert('Settings saved');

if (confirm('Delete file?')) {
  deleteFile();
}
```

### After (Dialog Manager)

```typescript
await dialogManager.alert('Settings saved');

if (await dialogManager.confirm('Delete file?')) {
  deleteFile();
}
```

**Key Differences:**
- Add `await` keyword (dialogs are async)
- Use `dialogManager.alert()` instead of `alert()`
- Use `dialogManager.confirm()` instead of `confirm()`
- Function containing dialog calls must be `async`

## Queue Management

The dialog system automatically queues multiple dialogs:

```typescript
// All three will display in sequence
dialogManager.alert('First message');
dialogManager.alert('Second message');
dialogManager.alert('Third message');
```

Only one dialog is shown at a time. When the user closes a dialog, the next one in the queue is automatically displayed.

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `Enter` | Click default/first button |
| `Esc` | Close dialog (same as clicking X or Cancel) |
| `Tab` | Navigate between buttons |
| `Space` | Activate focused button |

## Accessibility Features

### ARIA Labels

All dialogs include proper ARIA attributes:

```html
<div role="dialog" aria-label="Error">
  <div class="messagebox-content">
    <div aria-live="polite">Error message text</div>
  </div>
</div>
```

### Focus Management

- When dialog opens, focus moves to first button
- Focus is trapped within dialog (can't tab out)
- When dialog closes, focus returns to triggering element

### Screen Reader Support

- Dialog title announced when opened
- Message text read by screen readers
- Button labels clearly identified

## Testing Patterns

### Unit Tests

```typescript
import { dialogManager } from '$lib/stores/dialogManager.svelte';
import { describe, it, expect, beforeEach } from 'vitest';

describe('dialogManager', () => {
  beforeEach(() => {
    dialogManager.closeAll(); // Clear any pending dialogs
  });
  
  it('should show alert dialog', () => {
    const promise = dialogManager.alert('Test message');
    
    const state = dialogManager.getState();
    expect(state.activeDialog).toBeDefined();
    expect(state.activeDialog?.message).toBe('Test message');
    expect(state.activeDialog?.type).toBe('info');
  });
  
  it('should resolve when dialog closed', async () => {
    const promise = dialogManager.alert('Test');
    dialogManager.close('ok'); // Simulate user clicking OK
    
    await expect(promise).resolves.toBeUndefined();
  });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent } from '@testing-library/svelte';
import Shell from '$lib/components/shell/Shell.svelte';

it('should display dialog when triggered', async () => {
  render(Shell);
  
  // Trigger dialog
  dialogManager.alert('Test message');
  
  // Check dialog appears
  await screen.findByText('Test message');
  expect(screen.getByRole('dialog')).toBeInTheDocument();
  
  // Close dialog
  const okButton = screen.getByText('OK');
  await fireEvent.click(okButton);
  
  // Check dialog disappeared
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
```

## Future Enhancements

### Sound Effects
Play authentic Windows 98 system sounds:
- Error beep for error dialogs
- Question beep for confirm dialogs
- Default beep for info dialogs

```typescript
dialogManager.alert('Message', { sound: true });
```

### Custom Themes
Support themed dialogs:

```typescript
dialogManager.show({
  theme: 'classic', // or 'modern', 'high-contrast'
  // ... other options
});
```

### Progress Dialogs
Show progress bars in dialogs:

```typescript
const dialog = dialogManager.progress('Loading files...');
dialog.updateProgress(50); // 50%
dialog.close();
```

### Modal vs Modeless
Support modeless dialogs that don't block interaction:

```typescript
dialogManager.show({
  message: 'Background task running',
  modal: false // Can interact with windows behind it
});
```

## Implementation Details

### Store Structure

```typescript
interface DialogState {
  title: string;
  message: string;
  type: 'info' | 'error' | 'warning' | 'question';
  buttons: DialogButton[];
  resolver: (value: any) => void;
}

interface DialogManagerState {
  activeDialog: DialogState | null;
  queue: DialogState[];
}
```

### Promise Resolution

Each dialog creates a promise that's stored with the dialog state. When the user clicks a button, the dialog's resolver is called with the button's value.

### Z-Index Layers

| Layer | Z-Index | Purpose |
|-------|---------|---------|
| Desktop | 0 | Desktop background |
| Windows | 100-999 | Application windows |
| Taskbar | 1000 | Always visible taskbar |
| Start Menu | 1100 | Above taskbar |
| Dialogs | 2000 | Above everything |

## Best Practices

1. **Always await dialogs** - Dialogs are asynchronous, use `await`
2. **Provide context** - Use clear, descriptive messages
3. **Set appropriate types** - Use `error` for errors, `warning` for warnings
4. **Handle cancellation** - User can always close dialog with X or Esc
5. **Keep messages concise** - Short, actionable messages work best
6. **Use proper button labels** - "Delete" is better than "OK" for destructive actions

## Examples

### Confirmation Before Delete

```typescript
async function deleteItem(id: string) {
  const confirmed = await dialogManager.confirm(
    'This item will be permanently deleted. Continue?',
    'Confirm Delete'
  );
  
  if (!confirmed) return;
  
  try {
    await api.delete(id);
    await dialogManager.alert('Item deleted successfully');
  } catch (error) {
    await dialogManager.error('Failed to delete item');
  }
}
```

### Save/Don't Save/Cancel Pattern

```typescript
async function handleClose() {
  if (!hasUnsavedChanges) {
    closeWindow();
    return;
  }
  
  const result = await dialogManager.show({
    title: 'Unsaved Changes',
    message: 'Do you want to save changes before closing?',
    type: 'question',
    buttons: [
      { label: 'Save', value: 'save' },
      { label: "Don't Save", value: 'discard' },
      { label: 'Cancel', value: 'cancel' }
    ]
  });
  
  if (result === 'save') {
    await saveChanges();
    closeWindow();
  } else if (result === 'discard') {
    closeWindow();
  }
  // If 'cancel', do nothing
}
```

### Form Validation

```typescript
async function handleSubmit() {
  if (!validateForm()) {
    await dialogManager.warning(
      'Please fill in all required fields',
      'Validation Error'
    );
    return;
  }
  
  try {
    await submitForm();
    await dialogManager.alert('Form submitted successfully');
  } catch (error) {
    await dialogManager.error('Failed to submit form. Please try again.');
  }
}
```

## See Also

- [Component API](./component-api.md) - MessageBox component reference
- [Store API](./store-api.md) - Store implementation details
- [Testing Guide](../../abu-web-kernel/guides/testing-guide.md) - Testing patterns
- [Accessibility](../../design/accessibility.md) - Accessibility guidelines
