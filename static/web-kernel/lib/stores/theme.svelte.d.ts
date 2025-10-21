import type { Theme } from '../core/types.js';
export declare const theme: {
    readonly current: Theme;
    readonly isDark: boolean;
    readonly isLight: boolean;
    set(newTheme: Theme): void;
    toggle(): void;
    setTheme(newTheme: Theme): void;
    toggleTheme(): void;
    getTheme(): Theme;
    init(): void;
    _reset(): void;
};
