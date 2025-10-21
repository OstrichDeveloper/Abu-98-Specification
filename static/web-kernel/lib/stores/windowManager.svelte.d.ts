import type { WindowState, Position, Size } from '../core/types.js';
export declare const windowManager: {
    readonly all: WindowState[];
    readonly count: number;
    readonly focused: WindowState | null;
    readonly visible: WindowState[];
    readonly minimized: WindowState[];
    readonly windows: WindowState[];
    getWindow(windowId: string): WindowState | null;
    getWindowWithAliases(windowId: string): (WindowState & {
        minimized: boolean;
        maximized: boolean;
        focused: boolean;
    }) | null;
    setPluginRegistry(): void;
    open(pluginId: string, options?: {
        position?: Position;
        size?: Size;
        title?: string;
    }): string;
    close(windowId: string): void;
    closeAll(): void;
    minimize(windowId: string): void;
    maximize(windowId: string): void;
    restore(windowId: string): void;
    focus(windowId: string): void;
    clearAllFocus(): void;
    move(windowId: string, position: Position): void;
    resize(windowId: string, size: Size, position?: Position): void;
    init(): void;
    _reset(): void;
};
