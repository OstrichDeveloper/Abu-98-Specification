import type { DesktopItem, Position } from '../core/types.js';
export declare const desktop: {
    readonly items: DesktopItem[];
    readonly selectedItemId: string | null;
    readonly selected: DesktopItem | null;
    readonly sortedItems: DesktopItem[];
    readonly gridEnabled: boolean;
    getItem(itemId: string): DesktopItem | null;
    addItem(item: DesktopItem): void;
    removeItem(itemId: string): void;
    moveItem(itemId: string, position: Position): void;
    selectItem(itemId: string): void;
    clearSelection(): void;
    activate(itemId: string): void;
    setGridEnabled(enabled: boolean): void;
    init(initialItems?: DesktopItem[]): void;
    clear(): void;
    _reset(): void;
};
