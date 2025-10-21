/**
 * Help System Module
 *
 * This module provides a complete Windows 98 F1 Help System implementation
 * for the Abu Web Kernel ecosystem.
 */
export type { HelpTopic, HelpBookmark, SearchResult, SearchOptions, ParsedQuery, QueryOperator, QueryOperatorType, SearchIndex, TermEntry, DocumentEntry, DocumentMatch, SearchField, HelpCategory, HelpTab, UserPreferences, AccessibilitySettings, HelpSystemState, BookmarkOrganization, BookmarkCategory, HistoryStats, ValidationResult, ValidationWarning, HelpSystemEvents, HelpSystemManager as IHelpSystemManager, // Aliased to avoid conflict with class export
ContentManager, SearchEngine, BookmarkManager, HistoryManager, TopicMetadata, DifficultyLevel, FontSize } from './types.js';
import { HelpSystemManager } from './HelpSystemManager.js';
export { HelpSystemManager } from './HelpSystemManager.js';
export { HelpContentManager } from './HelpContentManager.js';
export { HelpSearchEngine } from './HelpSearchEngine.js';
export { HelpBookmarkManager } from './HelpBookmarkManager.js';
export { HelpHistoryManager } from './HelpHistoryManager.js';
export { HelpStyleManager, HelpStyleUtils, HELP_STYLE_CONSTANTS, initializeHelpStyles, getHelpStyleManager } from './styles/index.js';
export { isHelpCategory, isHelpTab, isHelpTopic, isHelpBookmark, isSearchResult, isHelpSystemState } from './types.js';
/**
 * Create a new help system manager instance
 *
 * @returns New help system manager instance
 */
export declare function createHelpSystemManager(): HelpSystemManager;
/**
 * Help system version
 */
export declare const HELP_SYSTEM_VERSION = "1.0.0";
/**
 * Help system constants
 */
export declare const HELP_SYSTEM_CONSTANTS: {
    readonly MAX_BOOKMARKS: 1000;
    readonly MAX_HISTORY_SIZE: 1000;
    readonly MAX_SEARCH_HISTORY: 20;
    readonly DEFAULT_WINDOW_SIZE: {
        readonly width: 800;
        readonly height: 600;
    };
    readonly DEFAULT_SPLITTER_POSITION: 250;
    readonly STORAGE_KEYS: {
        readonly BOOKMARKS: "abu-help-bookmarks";
        readonly HISTORY: "abu-help-history";
        readonly STATE: "abu-help-system-state";
    };
};
