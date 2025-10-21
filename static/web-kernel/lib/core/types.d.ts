import type { Component } from 'svelte';
export interface Position {
    x: number;
    y: number;
}
export interface Size {
    width: number;
    height: number;
}
export interface Bounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface WindowState {
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
    preMaximizeBounds?: Bounds;
}
export interface WindowPlugin {
    id: string;
    name: string;
    version: string;
    component: Component;
    defaultTitle: string;
    defaultIcon: string;
    defaultSize?: Size;
    isResizable?: boolean;
    onInstall?: () => void;
    onUninstall?: () => void;
}
export interface WindowDefinition {
    id: string;
    component: Component;
    defaultTitle: string;
    defaultIcon: string;
    defaultSize?: Size;
    isResizable?: boolean;
    isSingleton?: boolean;
    props?: Record<string, any>;
}
export interface ServiceDefinition {
    id: string;
    singleton?: boolean;
    autoStart?: boolean;
    factory: (context: PluginContext) => ServiceInstance;
}
export interface ServiceInstance {
    start?: () => void | Promise<void>;
    stop?: () => void | Promise<void>;
    [key: string]: any;
}
export interface ComponentDefinition {
    id: string;
    component: Component;
    exportAs?: string;
}
export interface PluginInstance {
    state?: any;
    activate?: () => void | Promise<void>;
    deactivate?: () => void | Promise<void>;
    destroy?: () => void | Promise<void>;
    onWindowOpened?: (windowId: string, instanceId: string) => void;
    onWindowClosed?: (windowId: string, instanceId: string) => void;
    onMessage?: (message: PluginMessage) => void;
    [key: string]: any;
}
export interface PluginMessage {
    from: string;
    to: string;
    type: string;
    data?: any;
    timestamp: number;
    id?: string;
}
export interface CompositePlugin {
    id: string;
    name: string;
    version: string;
    description?: string;
    author?: string;
    type: 'composite';
    windows?: WindowDefinition[];
    services?: ServiceDefinition[];
    components?: ComponentDefinition[];
    main: (context: PluginContext) => PluginInstance;
    onInstall?: () => void | Promise<void>;
    onUninstall?: () => void | Promise<void>;
}
export type Plugin = WindowPlugin | CompositePlugin;
export interface PluginContext {
    readonly pluginId: string;
    readonly pluginName: string;
    windowManager: WindowManagerAPI;
    kernel: KernelAPI;
    storage: StorageAPI;
    events: EventBusAPI;
    components: ComponentRegistryAPI;
    state: PluginStateAPI;
    utils: UtilsAPI;
}
export interface WindowManagerAPI {
    open(windowId: string, options?: OpenOptions): string;
    openMultiple(requests: OpenRequest[]): string[];
    close(instanceId: string): void;
    closeAll(windowId?: string): void;
    focus(instanceId: string): void;
    minimize(instanceId: string): void;
    maximize(instanceId: string): void;
    restore(instanceId: string): void;
    getWindow(instanceId: string): WindowState | null;
    getWindows(windowId?: string): WindowState[];
    isOpen(windowId: string): boolean;
    sendMessage(instanceId: string, message: any): void;
    broadcast(windowId: string, message: any): void;
    onWindowOpened(callback: (window: WindowState) => void): UnsubscribeFn;
    onWindowClosed(callback: (instanceId: string) => void): UnsubscribeFn;
    onWindowFocused(callback: (instanceId: string) => void): UnsubscribeFn;
}
export interface OpenOptions {
    position?: Position;
    size?: Size;
    title?: string;
    props?: Record<string, any>;
    focusOnOpen?: boolean;
    singleton?: boolean;
}
export interface OpenRequest {
    windowId: string;
    options?: OpenOptions;
}
export interface KernelAPI {
    getSystemInfo(): SystemInfo;
    getUptime(): number;
    getProcesses(): ProcessInfo[];
    killProcess(pid: number): void;
}
export interface ProcessInfo {
    pid: number;
    name: string;
    pluginId: string;
    startTime: number;
}
export interface StorageAPI {
    get<T>(key: string): T | null;
    set<T>(key: string, value: T): void;
    remove(key: string): void;
    clear(): void;
    keys(): string[];
    getObject<T>(key: string): T | null;
    setObject<T>(key: string, value: T): void;
    getAll(): Record<string, any>;
    setAll(data: Record<string, any>): void;
}
export type EventHandler = (data?: any) => void;
export type UnsubscribeFn = () => void;
export interface EventBusAPI {
    emit(event: string, data?: any): void;
    on(event: string, handler: EventHandler): UnsubscribeFn;
    once(event: string, handler: EventHandler): UnsubscribeFn;
    off(event: string, handler: EventHandler): void;
    emitTo(pluginId: string, event: string, data?: any): void;
    onFrom(pluginId: string, event: string, handler: EventHandler): UnsubscribeFn;
}
export interface ComponentRegistryAPI {
    register(id: string, component: Component): void;
    unregister(id: string): void;
    get(id: string): Component | null;
    getAll(): Map<string, Component>;
    has(id: string): boolean;
}
export interface ReactiveState<T> {
    value: T;
}
export interface ReadonlyReactiveState<T> {
    readonly value: T;
}
export interface SharedState<T> {
    value: T;
}
export interface PluginStateAPI {
    create<T>(initialValue: T): ReactiveState<T>;
    derived<T>(fn: () => T): ReadonlyReactiveState<T>;
    effect(fn: () => void | (() => void)): void;
    createShared<T>(key: string, initialValue: T): SharedState<T>;
    getShared<T>(key: string): SharedState<T> | null;
}
export interface UtilsAPI {
    generateId(): string;
    formatBytes(bytes: number): string;
    formatDuration(ms: number): string;
}
export interface DesktopItem {
    id: string;
    label: string;
    iconClass: string;
    type: 'program' | 'folder' | 'file' | 'shortcut';
    action: () => void;
    position?: Position;
}
export interface MenuItem {
    id: string;
    label: string;
    iconClass?: string;
    action?: () => void;
    submenu?: MenuItem[];
    divider?: boolean;
}
export type Theme = 'light' | 'dark';
export interface ThemeState {
    current: Theme;
}
export interface AudioState {
    volume: number;
    muted: boolean;
    playing: boolean;
}
export interface SystemInfo {
    osName: string;
    version: string;
    uptime: number;
    totalMemory: number;
    usedMemory: number;
}
export interface CommandResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    executionTime: number;
}
export interface KernelInterface {
    getSystemInfo(): Promise<SystemInfo>;
    executeCommand(cmd: string): Promise<CommandResult>;
}
export interface StoredState {
    version: number;
    timestamp: number;
    ttl: number;
    windows: {
        open: StoredWindowState[];
        history: string[];
    };
    desktop: {
        layout: 'grid' | 'custom';
        icons: StoredDesktopIconState[];
    };
    theme: {
        current: Theme;
        auto: boolean;
    };
    audio: {
        volume: number;
        muted: boolean;
        track: string | null;
    };
    system: {
        taskbarPosition: 'bottom';
        startMenuPinned: string[];
    };
}
export interface StoredWindowState {
    pluginId: string;
    position: Position;
    size: Size;
    state: 'normal' | 'minimized' | 'maximized';
    preMaximizeBounds?: Bounds;
    pluginState?: unknown;
}
export interface StoredDesktopIconState {
    id: string;
    label?: string;
    iconClass?: string;
    type?: 'file' | 'folder' | 'program' | 'shortcut';
    position?: Position;
    hidden?: boolean;
}
export interface PluginRegistry {
    registerWindow(plugin: WindowPlugin): void;
    unregisterWindow(id: string): void;
    get(id: string): WindowPlugin | undefined;
    getAllPlugins(): WindowPlugin[];
    has(id: string): boolean;
}
export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type ReadonlyDeep<T> = {
    readonly [P in keyof T]: T[P] extends object ? ReadonlyDeep<T[P]> : T[P];
};
export declare class KernelError extends Error {
    code: string;
    details?: unknown;
    constructor(message: string, code: string, details?: unknown);
}
export declare class NetworkError extends KernelError {
    code: 'NETWORK_ERROR';
    details: {
        url: string;
        originalError: Error;
    };
    constructor(url: string, originalError: Error);
}
export declare class ValidationError extends KernelError {
    code: 'VALIDATION_ERROR';
    details: {
        field: string;
        reason: string;
    };
    constructor(field: string, reason: string);
}
export declare class AuthorizationError extends KernelError {
    code: 'AUTHORIZATION_ERROR';
    details: {
        requiredPermission: string;
    };
    constructor(requiredPermission: string);
}
export declare class ServiceUnavailableError extends KernelError {
    code: 'SERVICE_UNAVAILABLE';
    details: {
        retryAfter: number;
    };
    constructor(retryAfter: number);
}
export declare class TimeoutError extends KernelError {
    code: 'TIMEOUT_ERROR';
    details: {
        timeout: number;
        url: string;
    };
    constructor(timeout: number, url: string);
}
/**
 *
 * @param value
 */
export declare function isPosition(value: unknown): value is Position;
/**
 *
 * @param value
 */
export declare function isSize(value: unknown): value is Size;
/**
 *
 * @param value
 */
export declare function isBounds(value: unknown): value is Bounds;
/**
 *
 * @param value
 */
export declare function isWindowState(value: unknown): value is WindowState;
/**
 *
 * @param value
 */
export declare function isStoredState(value: unknown): value is StoredState;
