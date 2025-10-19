---
id: quick-start
title: Quick Start
---

# Quick Start Guide

## Overview

This guide gets you up and running with the Abu OS 98 Web Kernel in 10 minutes. You'll create a simple application with a working Windows 98 desktop environment and a custom plugin.

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Basic knowledge of Svelte and TypeScript
- Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

## Step 1: Create New Project

```bash
# Create new Vite + Svelte project
npm create vite@latest my-abu-app -- --template svelte-ts
cd my-abu-app
npm install
```

## Step 2: Install Abu OS 98 Web Kernel

```bash
npm install abu-operating-system-98-web-kernel
```

The kernel is self-contained and bundles the Svelte runtime. No additional framework dependencies are required.

## Step 3: Create Your First Plugin

Create `src/plugins/HelloWorld.svelte`:

```html
<script lang="ts">
  interface Props {
    windowId: string;
    close: () => void;
  }
  
  let { windowId, close }: Props = $props();
  let count = $state(0);
</script>

<div class="hello-world">
  <h1>Hello, Abu OS 98!</h1>
  <p>This is your first plugin window.</p>
  <p>Window ID: <code>{windowId}</code></p>
  
  <div class="counter">
    <p>Counter: {count}</p>
    <button onclick={() => count++}>Increment</button>
    <button onclick={() => count--}>Decrement</button>
  </div>
  
  <button class="close-btn" onclick={close}>Close Window</button>
</div>

<style>
  .hello-world {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  h1 {
    margin: 0;
    font-size: 16px;
  }
  
  .counter {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 12px;
    background: #fff;
    border: 2px inset #808080;
  }
  
  button {
    padding: 4px 12px;
    font-size: 11px;
  }
  
  .close-btn {
    align-self: flex-start;
  }
</style>
```

## Step 4: Register Plugin

Create `src/plugins/index.ts`:

```typescript
import type { WindowPlugin } from 'abu-operating-system-98-web-kernel';
import HelloWorld from './HelloWorld.svelte';

export const helloWorldPlugin: WindowPlugin = {
  id: 'hello-world',
  name: 'Hello World',
  version: '1.0.0',
  component: HelloWorld,
  defaultTitle: 'Hello World',
  defaultIcon: 'icon-apps-notepad',
  defaultSize: {
    width: 400,
    height: 300
  },
  isResizable: true,
  onInstall: () => {
    console.log('Hello World plugin installed');
  },
  onUninstall: () => {
    console.log('Hello World plugin uninstalled');
  }
};
```

## Step 5: Mount the OS Shell

Replace `src/main.ts` (or create `src/app.ts`):

```typescript
import { Shell, MockKernel, mount } from 'abu-operating-system-98-web-kernel';
import { helloWorldPlugin } from './plugins';
import 'abu-operating-system-98-web-kernel/styles';

const kernel = new MockKernel();

mount(Shell, {
  target: document.getElementById('app')!,
  props: {
    kernel,
    plugins: [helloWorldPlugin]
  }
});
```

And update `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Abu OS 98</title>
    <style>
      body {
        margin: 0;
        padding: 0;
        overflow: hidden;
        font-family: 'MS Sans Serif', sans-serif;
      }
      * {
        box-sizing: border-box;
      }
    </style>
  </head>
  `<body>`
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  `</body>`
</html>
```

## Step 6: Run Development Server

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

## Step 7: Explore the Desktop

You should now see:

1. **Desktop** - Teal background (Windows 98 style)
2. **Taskbar** - Bottom of screen with Start button
3. **Start Menu** - Click "Start" → "Programs" → "Hello World"
4. **Window** - Your plugin opens in a draggable, resizable window

### Try These Interactions:

- **Drag** - Click and drag the titlebar to move the window
- **Resize** - Drag window edges to resize
- **Minimize** - Click minimize button (left titlebar button)
- **Maximize** - Click maximize button (middle titlebar button)
- **Close** - Click X button or your custom close button
- **Taskbar** - Click task button to restore minimized window
- **Theme** - Toggle light/dark theme (if implemented in system tray)

## Step 8: Add Desktop Icon

Modify `src/main.ts` to add desktop icons:

```typescript
import { 
  Shell, 
  MockKernel, 
  mount, 
  desktop, 
  windowManager 
} from 'abu-operating-system-98-web-kernel';
import { helloWorldPlugin } from './plugins';
import 'abu-operating-system-98-web-kernel/styles';

const kernel = new MockKernel();

mount(Shell, {
  target: document.getElementById('app')!,
  props: {
    kernel,
    plugins: [helloWorldPlugin]
  }
});

// Add desktop icons
desktop.addItem({
  id: 'hello-world-icon',
  label: 'Hello World',
  iconClass: 'icon-apps-notepad',
  type: 'program',
  action: () => windowManager.open('hello-world')
});

desktop.addItem({
  id: 'my-computer',
  label: 'My Computer',
  iconClass: 'icon-system-computer',
  type: 'program',
  action: () => alert('My Computer clicked!')
});
```

Now you have desktop icons! Single-click to select, double-click to open.

## Step 9: Add Multiple Plugins

Create `src/plugins/Calculator.svelte`:

```html
<script lang="ts">
  interface Props {
    windowId: string;
    close: () => void;
  }
  
  let { windowId, close }: Props = $props();
  
  let display = $state('0');
  let currentValue = $state(0);
  let operation = $state<string | null>(null);
  let newNumber = $state(true);
  
  function inputNumber(num: number) {
    if (newNumber) {
      display = num.toString();
      newNumber = false;
    } else {
      display = display === '0' ? num.toString() : display + num;
    }
  }
  
  function inputOperation(op: string) {
    currentValue = parseFloat(display);
    operation = op;
    newNumber = true;
  }
  
  function calculate() {
    const value = parseFloat(display);
    let result = 0;
    
    switch (operation) {
      case '+': result = currentValue + value; break;
      case '-': result = currentValue - value; break;
      case '*': result = currentValue * value; break;
      case '/': result = currentValue / value; break;
      default: result = value;
    }
    
    display = result.toString();
    operation = null;
    newNumber = true;
  }
  
  function clear() {
    display = '0';
    currentValue = 0;
    operation = null;
    newNumber = true;
  }
</script>

<div class="calculator">
  <div class="display">{display}</div>
  
  <div class="buttons">
    <button onclick={() => inputNumber(7)}>7</button>
    <button onclick={() => inputNumber(8)}>8</button>
    <button onclick={() => inputNumber(9)}>9</button>
    <button onclick={() => inputOperation('/')}>/</button>
    
    <button onclick={() => inputNumber(4)}>4</button>
    <button onclick={() => inputNumber(5)}>5</button>
    <button onclick={() => inputNumber(6)}>6</button>
    <button onclick={() => inputOperation('*')}>*</button>
    
    <button onclick={() => inputNumber(1)}>1</button>
    <button onclick={() => inputNumber(2)}>2</button>
    <button onclick={() => inputNumber(3)}>3</button>
    <button onclick={() => inputOperation('-')}>-</button>
    
    <button onclick={() => inputNumber(0)}>0</button>
    <button onclick={clear}>C</button>
    <button onclick={calculate}>=</button>
    <button onclick={() => inputOperation('+')}>+</button>
  </div>
</div>

<style>
  .calculator {
    padding: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    background: #C0C0C0;
  }
  
  .display {
    padding: 8px;
    background: #fff;
    border: 2px inset #808080;
    text-align: right;
    font-family: 'Courier New', monospace;
    font-size: 16px;
    min-height: 32px;
  }
  
  .buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 4px;
  }
  
  button {
    padding: 12px;
    font-size: 14px;
    font-weight: bold;
  }
</style>
```

Update `src/plugins/index.ts`:

```typescript
import type { WindowPlugin } from 'abu-operating-system-98-web-kernel';
import HelloWorld from './HelloWorld.svelte';
import Calculator from './Calculator.svelte';

export const helloWorldPlugin: WindowPlugin = {
  // ... existing config
};

export const calculatorPlugin: WindowPlugin = {
  id: 'calculator',
  name: 'Calculator',
  version: '1.0.0',
  component: Calculator,
  defaultTitle: 'Calculator',
  defaultIcon: 'icon-apps-calculator',
  defaultSize: {
    width: 240,
    height: 320
  },
  isResizable: false
};

export const allPlugins = [helloWorldPlugin, calculatorPlugin];
```

Update `src/App.svelte`:

```html
<script lang="ts">
  import { Shell, MockKernel, windowManager } from 'abu-operating-system-98-web-kernel';
  import { allPlugins } from './plugins';
  import 'abu-operating-system-98-web-kernel/styles';
  
  const kernel = new MockKernel();
  
  const desktopItems = [
    {
      id: 'hello-world-icon',
      label: 'Hello World',
      iconClass: 'icon-apps-notepad',
      type: 'program' as const,
      action: () => windowManager.open('hello-world')
    },
    {
      id: 'calculator-icon',
      label: 'Calculator',
      iconClass: 'icon-apps-calculator',
      type: 'program' as const,
      action: () => windowManager.open('calculator')
    }
  ];
</script>

<Shell kernel={kernel} plugins={allPlugins} {desktopItems} />
```

## Step 10: Build for Production

```bash
# Build optimized bundle
npm run build

# Preview production build
npm run preview
```

Your production build will be in `dist/`. Deploy it to any static hosting service (Netlify, Vercel, GitHub Pages, etc.).

## Next Steps

### Learn More

- Read `/docs/guides/plugin-development.md` for advanced plugin patterns
- See `/docs/guides/theming.md` to customize the visual appearance
- Check `/docs/examples/` for more complex plugin examples

### Add More Features

- **System Info Plugin** - Display kernel system information
- **Text Editor** - Notepad-style text editor with save/load
- **Image Viewer** - Display images in a window
- **Terminal** - Execute kernel commands

### Customize

- **Desktop Icons** - Add custom icons for your plugins
- **Start Menu** - Organize plugins in submenus
- **Themes** - Create custom color schemes
- **Sounds** - Add Windows 98 sound effects

## Troubleshooting

### "Cannot find module" errors

Make sure the kernel is installed:
```bash
npm install abu-operating-system-98-web-kernel
```

The kernel is self-contained and bundles Svelte. No additional framework dependencies needed.

### Window doesn't open

Check browser console for errors. Ensure:
1. Plugin ID is unique
2. Plugin is registered in plugins array
3. Component is valid Svelte component

### Styles look wrong

Import kernel styles in App.svelte:
```typescript
import 'abu-operating-system-98-web-kernel/styles';
```

### TypeScript errors

Ensure `tsconfig.json` includes:
```json
{
  "compilerOptions": {
    "moduleResolution": "bundler",
    "module": "ES2022",
    "target": "ES2022"
  }
}
```

## Summary

You've now:

1. ✅ Created a new project
2. ✅ Installed Abu OS 98 Web Kernel
3. ✅ Built your first plugin
4. ✅ Mounted the OS Shell
5. ✅ Added desktop icons
6. ✅ Created multiple plugins
7. ✅ Built for production

You have a fully functional Windows 98-style desktop environment running in the browser!

## Resources

- **Documentation:** `/docs/`
- **Examples:** `/docs/examples/`
- **API Reference:** `/docs/technical-specs/`
- **Architecture:** `/docs/architecture/`

Happy coding! 🎉
