import type { Writable } from 'svelte/store';
export interface ContextMenuData {
    items: Array<{
        label?: string;
        icon?: string;
        shortcut?: string;
        hasSubmenu?: boolean;
        disabled?: boolean;
        type?: 'standard' | 'separator' | 'header';
        onclick?: () => void;
        submenu?: ContextMenuData['items'];
    }>;
    x: number;
    y: number;
    label?: string;
}
interface ContextMenuState {
    visible: boolean;
    data: ContextMenuData | null;
}
declare class ContextMenuManager {
    private store;
    constructor();
    private setupGlobalHandlers;
    private showContextMenuForElement;
    private showDesktopIconContextMenu;
    private showDesktopContextMenu;
    private showWindowContextMenu;
    private showWindowContentContextMenu;
    private showTextSelectionContextMenu;
    private showDefaultContextMenu;
    show(data: ContextMenuData): void;
    close(): void;
    hideContextMenu(): void;
    showCustom(items: ContextMenuData['items'], x: number, y: number, label?: string): void;
    getStore(): Writable<ContextMenuState>;
}
export declare const contextMenuManager: ContextMenuManager;
export declare const contextMenu: Writable<ContextMenuState>;
export {};
