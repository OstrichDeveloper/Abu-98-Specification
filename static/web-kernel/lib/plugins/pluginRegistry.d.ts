import type { WindowPlugin, CompositePlugin, Plugin, PluginInstance, WindowDefinition } from '../core/types.js';
export declare const pluginRegistry: {
    registerWindow(plugin: WindowPlugin): void;
    registerComposite(plugin: CompositePlugin): void;
    unregisterWindow(id: string): void;
    unregister(id: string): void;
    activate(pluginId: string): Promise<PluginInstance>;
    deactivate(pluginId: string): Promise<void>;
    destroy(pluginId: string): Promise<void>;
    getInstance(pluginId: string): PluginInstance | null;
    getInstances(): Map<string, PluginInstance>;
    get(id: string): Plugin | undefined;
    getAllPlugins(): Plugin[];
    getAllByType(type: string): Plugin[];
    has(id: string): boolean;
    getWindowDefinitions(pluginId: string): WindowDefinition[];
    clear(): void;
    _clear(): void;
};
