---
id: svelte-mapping
title: Svelte Mapping
---

# Svelte 5 Mapping Specification

## Overview

This document defines how Windows 98 UI concepts map to Svelte 5 components and reactive patterns. It bridges the gap between retro OS design and modern web framework capabilities.

## Core Mapping Principles

1. **UI Element → Component** - Each Win98 UI element is a Svelte component
2. **State → Runes** - OS state uses `$state`, `$derived`, `$effect`
3. **Events → Callbacks** - Win98 events map to callback props
4. **Styling → SCSS** - Win98 visual rules in SCSS modules
5. **Isolation → Component Boundaries** - Each component is self-contained

## Windows 98 → Svelte Component Map

### Shell Components

| Win98 Element | Svelte Component | Props | Responsibilities |
|---------------|------------------|-------|------------------|
| Desktop | `Desktop.svelte` | items, theme | Background, icon grid, selection |
| Taskbar | `Taskbar.svelte` | windows, theme | Start button, task buttons, tray |
| Start Menu | `StartMenu.svelte` | items, onclose | Menu rendering, navigation |
| Window | `Window.svelte` | state, plugin | Chrome, drag, resize, content |

### Control Components

| Win98 Element | Svelte Component | Props | Emits |
|---------------|------------------|-------|-------|
| Button | `Button.svelte` | label, disabled, onclick | click |
| Checkbox | `Checkbox.svelte` | checked, label, onchange | change |
| Radio | `Radio.svelte` | checked, name, value, onchange | change |
| Text Input | `TextInput.svelte` | value, placeholder, oninput | input, change |
| Select | `Select.svelte` | value, options, onchange | change |
| Slider | `Slider.svelte` | value, min, max, oninput | input |

### Dialog Components

| Win98 Element | Svelte Component | Props | Responsibilities |
|---------------|------------------|-------|------------------|
| Message Box | `MessageBox.svelte` | title, message, buttons, onclose | Alert, confirm, prompt |
| Dialog | `Dialog.svelte` | title, content, onclose | Custom modal dialogs |

## State Management Mapping

### Win98 Concept → Svelte Runes

| Win98 Concept | Svelte Pattern | Example |
|---------------|----------------|---------|
| Window state | `$state` | `let windows = $state<WindowState[]>([])` |
| Window Z-order | `$derived` | `const sorted = $derived(windows.sort(...))` |
| Taskbar update | `$effect` | `$effect(() => { taskbar.update(windows) })` |
| Theme preference | `$state` | `let theme = $state<Theme>('light')` |
| Desktop selection | `$state` | `let selectedId = $state<string \| null>(null)` |

### State Location Map

| State Type | Location | Access Pattern |
|------------|----------|----------------|
| Window list | windowManager store | Global, reactive |
| Focused window | windowManager store | Global, derived |
| Desktop icons | desktop store | Global, reactive |
| Theme | theme store | Global, reactive |
| Audio | audio store | Global, reactive |
| Component state | Local `$state` | Component-scoped |

## Event Handling Mapping

### Win98 Events → Svelte Callbacks

| Win98 Event | Svelte Pattern | Example |
|-------------|----------------|---------|
| Button click | `onclick` prop | `<Button onclick={() => {...}} />` |
| Window close | `onclose` callback | `<Window onclose={() => close(id)} />` |
| Input change | `oninput` prop | `<TextInput oninput={(e) => {...}} />` |
| Selection change | `onchange` callback | `<Select onchange={(val) => {...}} />` |
| Window drag | Internal handler | Handled in Window component |
| Icon double-click | `ondblclick` prop | `<Icon ondblclick={() => {...}} />` |

### Event Flow

```
User Action (DOM event)
   ↓
Svelte event handler (on:click, on:input, etc.)
   ↓
Callback prop execution (onclick={...})
   ↓
Store action (windowManager.open(), etc.)
   ↓
State mutation ($state change)
   ↓
Reactive update ($derived recompute)
   ↓
$effect side effects (localStorage, DOM)
   ↓
Re-render (Svelte reactivity)
```

## Component Patterns

### Window Component

**Win98 Behavior:**
- Draggable titlebar
- Resizable edges
- Minimize/maximize/close buttons
- Focus on click
- Z-index stacking

**Svelte Implementation:**

**Props:**
```typescript
{
  id: string,
  pluginId: string,
  title: string,
  iconClass: string,
  position: Position,
  size: Size,
  zIndex: number,
  isMinimized: boolean,
  isMaximized: boolean,
  isFocused: boolean,
  isResizable: boolean,
  onclose: () => void
}
```

**Internal State:**
```typescript
let isDragging = $state(false);
let isResizing = $state(false);
let dragOffset = $state({x: 0, y: 0});
```

**Reactivity:**
```typescript
// Re-render when props change
$effect(() => {
  // Apply z-index
  element.style.zIndex = zIndex.toString();
});

// Cleanup on unmount
$effect(() => {
  return () => {
    // Remove event listeners
  };
});
```

### Desktop Icon Component

**Win98 Behavior:**
- Grid positioning
- Single-click selection
- Double-click activation
- Drag to custom position
- Text label below icon

**Svelte Implementation:**

**Props:**
```typescript
{
  id: string,
  label: string,
  iconClass: string,
  position: Position | null,  // null = use grid
  selected: boolean,
  onclick: (id: string) => void,
  ondblclick: (id: string) => void
}
```

**Styling:**
```scss
.desktop-icon {
  width: 80px;
  height: 80px;
  
  &.selected {
    background: var(--color-highlight);
    .label {
      color: var(--color-highlight-text);
    }
  }
}
```

### Button Component

**Win98 Behavior:**
- Raised bevel (normal)
- Inset bevel (pressed)
- Text shifts 1px on press
- No hover state
- Disabled gray text

**Svelte Implementation:**

**Props:**
```typescript
{
  label: string,
  disabled: boolean,
  onclick: () => void
}
```

**State:**
```typescript
let pressed = $state(false);
```

**Handlers:**
```typescript
function handleMouseDown() {
  pressed = true;
}

function handleMouseUp() {
  pressed = false;
  if (!disabled) {
    onclick();
  }
}
```

**Styling:**
```scss
.button {
  &:not(.pressed) {
    border: 2px outset var(--color-button-face);
  }
  
  &.pressed {
    border: 2px inset var(--color-button-face);
    
    .label {
      transform: translate(1px, 1px);
    }
  }
}
```

## Reactivity Patterns

### Derived Window List

**Win98:** Taskbar shows only non-minimized windows

**Svelte:**
```typescript
const visibleWindows = $derived(
  windows.filter(w => !w.isMinimized)
);
```

### Cascading Window Position

**Win98:** New windows offset by 32px from previous

**Svelte:**
```typescript
let cascadeOffset = $state(0);

function getNextPosition(): Position {
  const pos = {
    x: 100 + cascadeOffset,
    y: 100 + cascadeOffset
  };
  
  cascadeOffset = (cascadeOffset + 32) % 160;
  return pos;
}
```

### Theme Application

**Win98:** Theme changes affect all components

**Svelte:**
```typescript
$effect(() => {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme.current}`);
});
```

### localStorage Persistence

**Win98:** State persists across sessions

**Svelte:**
```typescript
$effect(() => {
  const state = { windows, theme, audio };
  
  // Debounced write
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    localStorage.setItem('state', JSON.stringify(state));
  }, 500);
});
```

## Component Communication

### Parent → Child (Props)

**Pattern:**
```html
<!-- Parent -->
<Window 
  title={window.title}
  position={window.position}
  onclose={() => close(window.id)}
/>

<!-- Child receives via $props() -->
<script lang="ts">
  let { title, position, onclose } = $props();
</script>
```

### Child → Parent (Callbacks)

**Pattern:**
```html
<!-- Parent -->
<Button onclick={() => handleClick()} />

<!-- Child calls callback -->
<script lang="ts">
  let { onclick } = $props();
  
  function handleInternalClick() {
    // Do internal work
    onclick(); // Notify parent
  }
</script>
```

### Sibling → Sibling (Store)

**Pattern:**
```html
<!-- Component A -->
<script>
  import { windowManager } from '$lib/stores';
  windowManager.open('calculator');
</script>

<!-- Component B (reacts) -->
<script>
  import { windowManager } from '$lib/stores';
  const windows = windowManager.all; // Reactive
</script>
```

## Style Organization

### Component Styles

**Pattern:**
```html
<script lang="ts">
  let { variant = 'default' } = $props();
</script>

<button class="win98-button {variant}">
  <slot />
</button>

<style lang="scss">
  .win98-button {
    @include bevel-raised;
    
    &.primary {
      font-weight: bold;
    }
    
    &.danger {
      // Win98 doesn't have colored buttons, but could be future theme
    }
  }
</style>
```

### Global Styles

**Location:** `src/lib/styles/`

**Structure:**
```
_vars.scss       // CSS custom properties
_mixins.scss     // Bevel, spacing mixins
_reset.scss      // Browser reset
components/      // Component-specific globals
  _button.scss
  _input.scss
  _window.scss
```

## Testing Patterns

### Component Tests

**Pattern:**
```typescript
import { render } from '@testing-library/svelte';
import Button from './Button.svelte';

test('Button when clicked then calls onclick', async () => {
  const onclick = vi.fn();
  const { getByRole } = render(Button, {
    props: { label: 'Click me', onclick }
  });
  
  await userEvent.click(getByRole('button'));
  
  expect(onclick).toHaveBeenCalled();
});
```

### Store Tests

**Pattern:**
```typescript
import { windowManager } from '$lib/stores';

test('windowManager when window opened then adds to list', () => {
  const id = windowManager.open('test-plugin');
  
  expect(windowManager.all).toContainEqual(
    expect.objectContaining({ id, pluginId: 'test-plugin' })
  );
});
```

## Performance Considerations

### Avoid Over-Reactivity

**❌ Bad:**
```typescript
// Creates new array on every access
get all() {
  return windows.filter(w => !w.deleted);
}
```

**✅ Good:**
```typescript
// Cached, only recomputes when windows changes
const activeWindows = $derived(
  windows.filter(w => !w.deleted)
);
```

### Batch Updates

**❌ Bad:**
```typescript
windows[0].x = 100; // Trigger
windows[0].y = 200; // Trigger
windows[0].width = 300; // Trigger
```

**✅ Good:**
```typescript
windows[0] = {
  ...windows[0],
  x: 100,
  y: 200,
  width: 300
}; // Single trigger
```

### Cleanup Effects

**Pattern:**
```typescript
$effect(() => {
  const handler = () => {...};
  window.addEventListener('resize', handler);
  
  return () => {
    window.removeEventListener('resize', handler);
  };
});
```

## Accessibility Mapping

### Win98 → ARIA

| Win98 Element | ARIA Role | ARIA Attributes |
|---------------|-----------|-----------------|
| Window | `dialog` | `aria-label={title}` |
| Button | `button` | `aria-disabled={disabled}` |
| Checkbox | `checkbox` | `aria-checked={checked}` |
| Input | `textbox` | `aria-label={label}` |
| Menu | `menu` | `aria-expanded={open}` |
| Menu Item | `menuitem` | `aria-disabled={disabled}` |

### Keyboard Navigation

**Pattern:**
```html
<button
  role="button"
  tabindex="0"
  onkeydown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onclick();
    }
  }}
>
```

## Summary

Svelte 5 Mapping defines:

- **Components** - Each Win98 UI element → Svelte component
- **State** - OS state uses runes (`$state`, `$derived`, `$effect`)
- **Events** - Win98 events → callback props
- **Reactivity** - Automatic UI updates via Svelte reactivity
- **Stores** - Global state coordination
- **Patterns** - Reusable component/state patterns

Windows 98 authenticity achieved through modern Svelte 5 patterns.
