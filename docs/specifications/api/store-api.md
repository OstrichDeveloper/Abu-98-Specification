---
id: store-api
title: Store Api
---

# Store API Specification

## windowManager

```typescript
interface WindowManager {
  // State (read-only)
  get all(): WindowState[];
  get count(): number;
  get focused(): WindowState | null;
  
  // Actions
  open(pluginId: string, options?: {
    position?: Position;
    size?: Size;
    title?: string;
  }): string;
  
  close(windowId: string): void;
  minimize(windowId: string): void;
  maximize(windowId: string): void;
  restore(windowId: string): void;
  focus(windowId: string): void;
  move(windowId: string, position: Position): void;
  resize(windowId: string, size: Size, position?: Position): void;
  
  // Lifecycle
  init(): void;
}
```

## desktop

```typescript
interface Desktop {
  // State (read-only)
  get items(): DesktopItem[];
  get selectedItemId(): string | null;
  get sortedItems(): DesktopItem[];
  
  // Actions
  addItem(item: DesktopItem): void;
  removeItem(itemId: string): void;
  moveItem(itemId: string, position: Position): void;
  selectItem(itemId: string): void;
  clearSelection(): void;
  activate(itemId: string): void;
  
  // Lifecycle
  init(): void;
}
```

## theme

```typescript
interface Theme {
  // State (read-only)
  get current(): 'light' | 'dark';
  get isDark(): boolean;
  get isLight(): boolean;
  
  // Actions
  set(theme: 'light' | 'dark'): void;
  toggle(): void;
  
  // Lifecycle
  init(): void;
}
```

## audio

```typescript
interface Audio {
  // State (read-only)
  get volume(): number;  // 0-1
  get muted(): boolean;
  get playing(): boolean;
  get volumePercent(): number;  // 0-100
  
  // Actions
  setVolume(value: number): void;  // 0-1
  toggleMute(): void;
  play(trackUrl?: string): void;
  pause(): void;
  stop(): void;
  
  // Lifecycle
  init(): void;
}
```

See `/docs/architecture/state-management.md` for detailed behavior specifications.
