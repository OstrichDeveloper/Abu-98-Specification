/**
 * Dialog Manager Store
 * Manages custom Windows 98-styled message boxes and dialogs
 * Replaces native browser alert/confirm with themed dialogs
 */
interface DialogButton {
    label: string;
    value: any;
    default?: boolean;
}
interface DialogOptions {
    title: string;
    message: string;
    type: 'info' | 'error' | 'warning' | 'question';
    buttons: DialogButton[];
}
interface DialogState extends DialogOptions {
    resolver: (value: any) => void;
}
interface DialogManagerState {
    activeDialog: DialogState | null;
    queue: DialogState[];
}
/**
 * Close the active dialog with a response value
 * @param value
 */
declare function close(value: any): void;
/**
 * Alert dialog - shows informational message with OK button
 * @param message
 * @param title
 */
declare function alert(message: string, title?: string): Promise<void>;
/**
 * Confirm dialog - shows question with Yes/No buttons
 * @param message
 * @param title
 */
declare function confirm(message: string, title?: string): Promise<boolean>;
/**
 * Error dialog - shows error message with error icon and OK button
 * @param message
 * @param title
 */
declare function error(message: string, title?: string): Promise<void>;
/**
 * Warning dialog - shows warning message with warning icon and OK button
 * @param message
 * @param title
 */
declare function warning(message: string, title?: string): Promise<void>;
/**
 * Custom dialog - full control over all options
 * @param options
 */
declare function show(options: DialogOptions): Promise<any>;
/**
 * Close all dialogs (useful for testing)
 */
declare function closeAll(): void;
/**
 * Get current state (useful for testing)
 */
declare function getState(): DialogManagerState;
export declare const dialogManager: {
    alert: typeof alert;
    confirm: typeof confirm;
    error: typeof error;
    warning: typeof warning;
    show: typeof show;
    close: typeof close;
    closeAll: typeof closeAll;
    getState: typeof getState;
    readonly activeDialog: DialogState | null;
};
export type { DialogButton, DialogOptions, DialogState, DialogManagerState };
