---
id: component-api
title: Component Api
---

# Component API Specification

## Shell Components

### Shell

Root component that mounts the entire OS.

```typescript
interface Props {
  plugins: WindowPlugin[];
  kernel?: KernelInterface;
}
```

### Desktop

Desktop background with icon grid.

```typescript
interface Props {
  items: DesktopItem[];
}
```

#### DesktopIcon

Windows Explorer icon styling for desktop icons.

```typescript
interface Props {
  label: string;
  icon: string;
  selected?: boolean;
  dragging?: boolean;
  disabled?: boolean;
  onclick?: () => void;
  ondoubleclick?: () => void;
  ondragstart?: (event: DragEvent) => void;
  ondragend?: (event: DragEvent) => void;
}
```

### Taskbar

Bottom taskbar with Start button and system tray.

```typescript
interface Props {
  // No props - uses windowManager store
}
```

#### StartButton

Start button with pressed/unpressed states.

```typescript
interface Props {
  pressed?: boolean;
  onclick?: (pressed: boolean) => void;
}
```

### Window

Draggable, resizable window chrome.

```typescript
interface Props {
  id: string;
  pluginId: string;
  title: string;
  iconClass: string;
  position: Position;
  size: Size;
  zIndex: number;
  isMinimized: boolean;
  isMaximized: boolean;
  isFocused: boolean;
  isResizable: boolean;
  onclose: () => void;
}
```

#### Titlebar

Window title area with gradient background.

```typescript
interface Props {
  title: string;
  active?: boolean;
  icon?: string; // Path to 16x16px icon
  onminimize?: () => void;
  onmaximize?: () => void;
  onclose?: () => void;
}
```

#### ResizeHandle

Edge and corner resize zones for windows.

```typescript
type ResizePosition =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

interface Props {
  position: ResizePosition;
  disabled?: boolean;
  onresize: (position: ResizePosition, event: MouseEvent) => void;
}
```

## Control Components

### Button

```typescript
interface Props {
  label: string;
  disabled?: boolean;
  variant?: 'default' | 'primary';
  onclick: () => void;
}
```

### Checkbox

```typescript
interface Props {
  checked: boolean;
  label: string;
  disabled?: boolean;
  onchange: (checked: boolean) => void;
}
```

#### Radio

Radio button groups for mutually exclusive selection.

```typescript
interface Props {
  checked: boolean;
  label: string;
  value: string;
  name: string;
  disabled?: boolean;
  onchange: (value: string) => void;
}
```

#### Select

Dropdown select box.

```typescript
interface SelectOption {
  value: string;
  label: string;
}

interface Props {
  value: string;
  options: SelectOption[];
  disabled?: boolean;
  onchange: (value: string) => void;
}
```

#### Slider

Range input with custom Windows 98 styling.

```typescript
interface Props {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  oninput: (value: number) => void;
  onchange?: (value: number) => void;
}
```

#### ProgressBar

Progress indicator with determinate and indeterminate modes.

```typescript
interface Props {
  value?: number; // Current progress (0-100)
  max?: number; // Maximum value, defaults to 100
  indeterminate?: boolean; // If true, shows an indeterminate animation
}
```

#### TabControl

Tabbed content organization.

```typescript
interface Tab {
  id: string;
  label: string;
  content: string; // Can be HTML string
  disabled?: boolean;
}

interface Props {
  tabs: Tab[];
  activeTab: string;
  onchange: (tabId: string) => void;
}
```

### TextInput

```typescript
interface Props {
  value: string;
  placeholder?: string;
  disabled?: boolean;
  type?: 'text' | 'password';
  oninput: (value: string) => void;
  onchange?: (value: string) => void;
}
```

### Select

```typescript
interface Props {
  value: string;
  options: `Array<{value: string; label: string}>`;
  disabled?: boolean;
  onchange: (value: string) => void;
}
```

## Menu Components

### MenuItem

Menu entries for Start Menu and context menus.

```typescript
type MenuItemType = 'standard' | 'separator' | 'header';

interface Props {
  label?: string;
  icon?: string;
  shortcut?: string;
  hasSubmenu?: boolean;
  disabled?: boolean;
  type?: MenuItemType;
  onclick?: () => void;
}
```

### ContextMenu

Right-click context menus.

```typescript
interface MenuItemData {
  label?: string;
  icon?: string;
  shortcut?: string;
  hasSubmenu?: boolean;
  disabled?: boolean;
  type?: 'standard' | 'separator' | 'header';
  onclick?: () => void;
}

interface Props {
  items: MenuItemData[];
  visible?: boolean;
  x?: number;
  y?: number;
  label?: string;
  onclose?: () => void;
}
```

## Dialog Components

### MessageBox

```typescript
interface Props {
  title: string;
  message: string;
  type: 'error' | 'warning' | 'info' | 'question';
  buttons: `Array<{label: string; action: () =>` void}>;
  onclose: () => void;
}
```

See `/docs/architecture/` for detailed component behaviors.
