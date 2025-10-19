---
id: theming
title: Theming
---

# Theming Guide

## Overview

Abu OS 98 Web Kernel includes two built-in themes: Light (classic Windows 98 gray) and Dark (blue gradient). This guide shows you how to use themes, create custom themes, and theme-aware plugins.

## Using Built-In Themes

### Switching Themes

The kernel includes a theme store that can be accessed from any component.

```html
<script lang="ts">
  import { theme } from 'abu-operating-system-98-web-kernel';
</script>

<div>
  <p>Current theme: {theme.current}</p>
  <button onclick={() => theme.toggle()}>Toggle Theme</button>
  <button onclick={() => theme.set('light')}>Light</button>
  <button onclick={() => theme.set('dark')}>Dark</button>
</div>
```

### Theme-Aware Components

Make your plugin components respond to theme changes.

```html
<script lang="ts">
  import { theme } from 'abu-operating-system-98-web-kernel';
</script>

<div class="content" class:dark-mode={theme.isDark}>
  <h1>My Plugin</h1>
  <p>This content changes based on the theme</p>
</div>

<style>
  .content {
    padding: 16px;
    background: #ffffff;
    color: #000000;
  }
  
  .content.dark-mode {
    background: #1a1a2e;
    color: #ffffff;
  }
</style>
```

## Theme Specifications

### Light Theme

**Colors:**
- Desktop: #008080 (teal)
- Button face: #C0C0C0 (gray)
- Active titlebar: #000080 (navy blue)
- Window text: #000000 (black)

**Usage:**
- Default theme
- Matches Windows 98 exactly
- High contrast for accessibility

### Dark Theme

**Colors:**
- Desktop: linear-gradient(#000080 → #1084D0)
- Button face: #1A1A2E (dark gray-blue)
- Active titlebar: #000080 (same as light)
- Window text: #FFFFFF (white)

**Usage:**
- Modern dark mode
- Reduced eye strain
- Custom Abu OS aesthetic

## Creating Custom Themes (Future)

The kernel is designed for theme extensibility. Here's the planned API:

```typescript
// Future feature
import { themeRegistry } from 'abu-operating-system-98-web-kernel';

themeRegistry.register({
  id: 'high-contrast',
  name: 'High Contrast',
  colors: {
    desktop: '#000000',
    buttonFace: '#000000',
    buttonText: '#FFFFFF',
    activeTitle: '#FFFFFF',
    titleText: '#000000',
    // ... all color variables
  }
});
```

## Best Practices

### 1. Always Support Both Themes

```html
<!-- ✅ Good - works in both themes -->
<div class="panel" class:dark={theme.isDark}>
  Content
</div>

<style>
  .panel {
    background: var(--color-button-face);
    color: var(--color-window-text);
  }
</style>
```

### 2. Use CSS Variables

```scss
/* ✅ Preferred - uses theme variables */
.my-element {
  background: var(--color-button-face);
  color: var(--color-window-text);
  border: 2px solid var(--color-button-shadow);
}

/* ❌ Avoid - hardcoded colors */
.my-element {
  background: #C0C0C0;
  color: #000000;
}
```

### 3. Test Both Themes

Always test your plugins in both light and dark themes to ensure readability and aesthetics.

## Summary

- ✅ Two built-in themes (Light, Dark)
- ✅ Easy theme switching via theme store
- ✅ Theme-aware components with CSS classes
- ✅ Forward-compatible for custom themes

See `/docs/design/visual-system.md` for complete color specifications.
