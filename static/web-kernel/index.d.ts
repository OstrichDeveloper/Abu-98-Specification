/**
 * Abu Operating System 98 Web Kernel
 *
 * Self-contained Windows 98 emulation library with bundled Svelte runtime.
 */
import './styles/main.scss';
export { mount, unmount, hydrate, onMount, getContext, setContext } from 'svelte';
export * from './lib/core/types.js';
export * from './lib/core/constants.js';
export * from './lib/core/validation.js';
export { windowManager } from './lib/stores/windowManager.svelte.js';
export { desktop } from './lib/stores/desktop.svelte.js';
export { theme } from './lib/stores/theme.svelte.js';
export { audio } from './lib/stores/audio.svelte.js';
export { dialogManager } from './lib/stores/dialogManager.svelte.js';
export { pluginRegistry } from './lib/plugins/pluginRegistry.js';
export { builtinPlugins } from './lib/plugins/builtins.js';
export { MockKernel } from './lib/kernel/MockKernel.js';
export { HTTPKernel } from './lib/kernel/HTTPKernel.js';
export { default as Shell } from './lib/components/shell/Shell.svelte';
export { default as Desktop } from './lib/components/shell/Desktop.svelte';
export { default as Taskbar } from './lib/components/shell/Taskbar.svelte';
export { default as StartMenu } from './lib/components/shell/StartMenu.svelte';
export { default as Window } from './lib/components/windows/Window.svelte';
export { default as Button } from './lib/components/controls/Button.svelte';
export { default as Checkbox } from './lib/components/controls/Checkbox.svelte';
export { default as TextInput } from './lib/components/controls/TextInput.svelte';
export { default as Select } from './lib/components/controls/Select.svelte';
export { default as Scrollbar } from './lib/components/controls/Scrollbar.svelte';
export { default as MessageBox } from './lib/components/dialogs/MessageBox.svelte';
export * from './lib/help/index.js';
export { default as HelpSystem } from './lib/help/components/HelpSystem.svelte';
export { default as HelpMenuBar } from './lib/help/components/HelpMenuBar.svelte';
export { default as HelpToolbar } from './lib/help/components/HelpToolbar.svelte';
export { default as HelpTabBar } from './lib/help/components/HelpTabBar.svelte';
export { default as HelpTopicTree } from './lib/help/components/HelpTopicTree.svelte';
export { default as HelpContentArea } from './lib/help/components/HelpContentArea.svelte';
export { default as HelpStatusBar } from './lib/help/components/HelpStatusBar.svelte';
export { default as HelpSearchPanel } from './lib/help/components/HelpSearchPanel.svelte';
export { default as HelpIndexPanel } from './lib/help/components/HelpIndexPanel.svelte';
export { default as HelpFavoritesPanel } from './lib/help/components/HelpFavoritesPanel.svelte';
export { default as HelpHistoryPanel } from './lib/help/components/HelpHistoryPanel.svelte';
export declare const version = "1.0.0";
