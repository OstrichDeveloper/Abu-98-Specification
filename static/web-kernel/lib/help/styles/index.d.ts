/**
 * Windows 98 F1 Help System - Styles Export
 *
 * This file exports all help system styles and provides utilities
 * for style management and theming.
 *
 * @fileoverview Main export file for help system styles
 */
import './help-system.scss';
/**
 * Help system style utilities
 */
export declare class HelpStyleManager {
    private static instance;
    private currentTheme;
    private constructor();
    /**
     * Get singleton instance
     */
    static getInstance(): HelpStyleManager;
    /**
     * Set theme
     */
    setTheme(theme: 'light' | 'dark' | 'high-contrast'): void;
    /**
     * Get current theme
     */
    getTheme(): 'light' | 'dark' | 'high-contrast';
    /**
     * Apply Windows 98 styling to element
     */
    applyWin98Styling(element: HTMLElement, type: 'button' | 'input' | 'panel' | 'dialog'): void;
    /**
     * Remove Windows 98 styling from element
     */
    removeWin98Styling(element: HTMLElement): void;
    /**
     * Initialize help system styles
     */
    initialize(): void;
    /**
     * Set up theme change listeners
     */
    private setupThemeListeners;
    /**
     * Get CSS custom property value
     */
    getCSSProperty(property: string): string;
    /**
     * Set CSS custom property value
     */
    setCSSProperty(property: string, value: string): void;
    /**
     * Get Windows 98 color value
     */
    getWin98Color(colorName: string): string;
    /**
     * Set Windows 98 color value
     */
    setWin98Color(colorName: string, value: string): void;
}
/**
 * Style constants
 */
export declare const HELP_STYLE_CONSTANTS: {
    readonly THEMES: {
        readonly LIGHT: "light";
        readonly DARK: "dark";
        readonly HIGH_CONTRAST: "high-contrast";
    };
    readonly COLORS: {
        readonly FACE: "3d-face";
        readonly HIGHLIGHT: "3d-highlight";
        readonly SHADOW: "3d-shadow";
        readonly DARK_SHADOW: "3d-darkshadow";
        readonly WINDOW_TEXT: "window-text";
        readonly BUTTON_TEXT: "button-text";
        readonly HIGHLIGHT_TEXT: "highlight-text";
        readonly DISABLED_TEXT: "disabled-text";
        readonly LINK_TEXT: "link-text";
        readonly VISITED_LINK: "visited-link";
        readonly HIGHLIGHT_BACKGROUND: "highlight";
        readonly ACTIVE_BORDER: "active-border";
        readonly INACTIVE_BORDER: "inactive-border";
        readonly WINDOW_FRAME: "window-frame";
        readonly SCROLLBAR: "scrollbar";
        readonly SCROLLBAR_THUMB: "scrollbar-thumb";
        readonly SCROLLBAR_HIGHLIGHT: "scrollbar-highlight";
        readonly SCROLLBAR_SHADOW: "scrollbar-shadow";
        readonly STATUS_BAR: "status-bar";
        readonly STATUS_TEXT: "status-text";
        readonly STATUS_BORDER: "status-border";
    };
    readonly FONTS: {
        readonly FAMILY: "win98-font-family";
        readonly FAMILY_MONO: "win98-font-family-mono";
        readonly SIZE_BASE: "win98-font-size-base";
        readonly SIZE_SMALL: "win98-font-size-small";
        readonly SIZE_LARGE: "win98-font-size-large";
        readonly SIZE_TITLE: "win98-font-size-title";
        readonly SIZE_HEADING: "win98-font-size-heading";
        readonly WEIGHT_NORMAL: "win98-font-weight-normal";
        readonly WEIGHT_BOLD: "win98-font-weight-bold";
        readonly LINE_HEIGHT_BASE: "win98-line-height-base";
        readonly LINE_HEIGHT_TIGHT: "win98-line-height-tight";
        readonly LINE_HEIGHT_LOOSE: "win98-line-height-loose";
    };
    readonly SPACING: {
        readonly XS: "win98-spacing-xs";
        readonly SM: "win98-spacing-sm";
        readonly MD: "win98-spacing-md";
        readonly LG: "win98-spacing-lg";
        readonly XL: "win98-spacing-xl";
        readonly XXL: "win98-spacing-xxl";
    };
};
/**
 * Style utility functions
 */
export declare const HelpStyleUtils: {
    /**
     * Create Windows 98 button element
     */
    createButton(text: string, className?: string): HTMLButtonElement;
    /**
     * Create Windows 98 input element
     */
    createInput(type?: string, placeholder?: string, className?: string): HTMLInputElement;
    /**
     * Create Windows 98 panel element
     */
    createPanel(className?: string): HTMLDivElement;
    /**
     * Create Windows 98 dialog element
     */
    createDialog(className?: string): HTMLDivElement;
    /**
     * Apply Windows 98 border to element
     */
    applyBorder(element: HTMLElement, type: "raised" | "inset" | "groove" | "ridge"): void;
    /**
     * Apply Windows 98 scrollbar to element
     */
    applyScrollbar(element: HTMLElement): void;
    /**
     * Check if element has Windows 98 styling
     */
    hasWin98Styling(element: HTMLElement): boolean;
    /**
     * Get element's Windows 98 style type
     */
    getWin98StyleType(element: HTMLElement): string | null;
};
/**
 * Initialize help system styles
 */
export declare function initializeHelpStyles(): HelpStyleManager;
/**
 * Get help system style manager
 */
export declare function getHelpStyleManager(): HelpStyleManager;
