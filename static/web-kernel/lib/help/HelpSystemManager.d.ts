/**
 * Windows 98 F1 Help System - System Manager
 *
 * This class is the main coordinator for the help system, managing all
 * subsystems including content, search, bookmarks, and history. It provides
 * the primary API for help system functionality.
 *
 * @fileoverview Main help system manager and coordinator
 */
import type { HelpTopic, HelpBookmark, SearchResult, HelpSystemState, HelpTab, WindowState, UserPreferences, EventHandler, UnsubscribeFn, HelpSystemConfig, HelpSystemStats, NavigationHistory, EnhancedSearchResult, SearchOptions, ValidationResult } from './types.js';
/**
 * Main help system manager
 */
export declare class HelpSystemManager {
    private contentManager;
    private searchEngine;
    private bookmarkManager;
    private historyManager;
    private state;
    private eventListeners;
    private readonly storageKey;
    private isInitialized;
    private config;
    constructor(config?: Partial<HelpSystemConfig>);
    /**
     * Initialize the help system
     *
     * @returns Promise that resolves when initialization is complete
     * @throws Error if initialization fails
     */
    initialize(): Promise<void>;
    /**
     * Navigate to a topic
     *
     * @param topicId - Topic ID to navigate to
     * @returns Promise that resolves when navigation is complete
     * @throws Error if navigation fails
     */
    navigateTo(topicId: string): Promise<void>;
    /**
     * Go back in history
     *
     * @returns Promise that resolves when navigation is complete
     * @throws Error if navigation fails
     */
    goBack(): Promise<void>;
    /**
     * Go forward in history
     *
     * @returns Promise that resolves when navigation is complete
     * @throws Error if navigation fails
     */
    goForward(): Promise<void>;
    /**
     * Go to home topic
     *
     * @returns Promise that resolves when navigation is complete
     * @throws Error if navigation fails
     */
    goHome(): Promise<void>;
    /**
     * Search topics
     *
     * @param query - Search query
     * @returns Promise that resolves with search results
     * @throws Error if search fails
     */
    search(query: string): Promise<SearchResult[]>;
    /**
     * Get search history
     *
     * @returns Array of recent search queries
     */
    getSearchHistory(): string[];
    /**
     * Add bookmark
     *
     * @param topicId - Topic ID to bookmark
     * @param title - Optional bookmark title
     * @returns Promise that resolves when bookmark is added
     * @throws Error if bookmark addition fails
     */
    addBookmark(topicId: string, title?: string): Promise<void>;
    /**
     * Remove bookmark
     *
     * @param topicId - Topic ID to remove bookmark for
     * @returns Promise that resolves when bookmark is removed
     * @throws Error if bookmark removal fails
     */
    removeBookmark(topicId: string): Promise<void>;
    /**
     * Get bookmarks
     *
     * @returns Array of all bookmarks
     */
    getBookmarks(): HelpBookmark[];
    /**
     * Check if topic is bookmarked
     *
     * @param topicId - Topic ID to check
     * @returns True if topic is bookmarked
     */
    isBookmarked(topicId: string): boolean;
    /**
     * Get navigation history
     *
     * @returns Array of topic IDs in history
     */
    getHistory(): string[];
    /**
     * Clear navigation history
     */
    clearHistory(): void;
    /**
     * Get topic by ID
     *
     * @param topicId - Topic ID
     * @returns Topic or null if not found
     */
    getTopic(topicId: string): HelpTopic | undefined;
    /**
     * Get topic tree
     *
     * @returns Hierarchical topic tree
     */
    getTopicTree(): HelpTopic[];
    /**
     * Get related topics
     *
     * @param topicId - Topic ID to get related topics for
     * @returns Array of related topics
     */
    getRelatedTopics(topicId: string): HelpTopic[];
    /**
     * Get current system state
     *
     * @returns Current system state
     */
    getState(): HelpSystemState;
    /**
     * Save system state to localStorage
     */
    saveState(): void;
    /**
     * Load system state from localStorage
     */
    loadState(): void;
    /**
     * Reset system state to defaults
     */
    resetState(): void;
    /**
     * Set active tab
     *
     * @param tab - Tab to set as active
     */
    setActiveTab(tab: HelpTab): void;
    /**
     * Set window state
     *
     * @param windowState - Window state to set
     */
    setWindowState(windowState: Partial<WindowState>): void;
    /**
     * Set user preferences
     *
     * @param preferences - User preferences to set
     */
    setUserPreferences(preferences: Partial<UserPreferences>): void;
    /**
     * Add event listener
     *
     * @param event - Event name
     * @param callback - Event handler
     * @returns Unsubscribe function
     */
    on(event: string, callback: EventHandler): UnsubscribeFn;
    /**
     * Remove event listener
     *
     * @param event - Event name
     * @param callback - Event handler
     */
    off(event: string, callback: EventHandler): void;
    /**
     * Emit event
     *
     * @param event - Event name
     * @param data - Event data
     */
    emit(event: string, data?: any): void;
    /**
     * Create default system state
     *
     * @returns Default system state
     */
    private createDefaultState;
    /**
     * Validate loaded state
     *
     * @param state - State to validate
     * @returns True if state is valid
     */
    private validateState;
    /**
     * Date replacer for JSON serialization
     *
     * @param key - JSON key
     * @param value - JSON value
     * @returns Serialized value
     */
    private dateReplacer;
    /**
     * Date reviver for JSON deserialization
     *
     * @param key - JSON key
     * @param value - JSON value
     * @returns Deserialized value
     */
    private dateReviver;
    /**
     * Get initialization status
     *
     * @returns True if system is initialized
     */
    isSystemInitialized(): boolean;
    /**
     * Get system statistics
     *
     * @returns System statistics
     */
    getSystemStats(): HelpSystemStats;
    /**
     * Get system configuration
     *
     * @returns Current configuration
     */
    getConfig(): HelpSystemConfig;
    /**
     * Update system configuration
     *
     * @param config - Configuration updates
     */
    updateConfig(config: Partial<HelpSystemConfig>): Promise<void>;
    /**
     * Reset configuration to defaults
     */
    resetConfig(): Promise<void>;
    /**
     * Get categories
     *
     * @returns Array of categories
     */
    getCategories(): string[];
    /**
     * Get topics by category
     *
     * @param category - Category to filter by
     * @returns Array of topics in category
     */
    getTopicsByCategory(category: string): HelpTopic[];
    /**
     * Get all topics
     *
     * @returns Array of all topics
     */
    getAllTopics(): HelpTopic[];
    /**
     * Search with options
     *
     * @param query - Search query
     * @param options - Search options
     * @returns Promise that resolves with search results
     */
    searchWithOptions(query: string, options?: SearchOptions): Promise<EnhancedSearchResult[]>;
    /**
     * Get search suggestions
     *
     * @param query - Partial search query
     * @returns Array of search suggestions
     */
    getSearchSuggestions(query: string): Promise<string[]>;
    /**
     * Clear search history
     */
    clearSearchHistory(): Promise<void>;
    /**
     * Check if can go back
     *
     * @returns True if can go back
     */
    canGoBack(): boolean;
    /**
     * Check if can go forward
     *
     * @returns True if can go forward
     */
    canGoForward(): boolean;
    /**
     * Get navigation history
     *
     * @returns Navigation history
     */
    getNavigationHistory(): NavigationHistory;
    /**
     * Get history item by index
     *
     * @param index - History index
     * @returns Topic or null
     */
    getHistoryItem(index: number): HelpTopic | null;
    /**
     * Add bookmark with folder
     *
     * @param topicId - Topic ID to bookmark
     * @param folder - Optional folder name
     * @param notes - Optional notes
     */
    addBookmarkWithFolder(topicId: string, folder?: string, notes?: string): Promise<void>;
    /**
     * Organize bookmarks
     *
     * @param bookmarks - Bookmarks to organize
     */
    organizeBookmarks(bookmarks: HelpBookmark[]): Promise<void>;
    /**
     * Export bookmarks
     *
     * @returns Exported bookmark data
     */
    exportBookmarks(): Promise<string>;
    /**
     * Import bookmarks
     *
     * @param data - Bookmark data to import
     */
    importBookmarks(data: string): Promise<void>;
    /**
     * Validate content
     *
     * @returns Array of validation results
     */
    validateContent(): Promise<ValidationResult[]>;
    /**
     * Refresh system
     */
    refresh(): Promise<void>;
    /**
     * Destroy the help system
     */
    destroy(): Promise<void>;
    /**
     * Create default configuration
     *
     * @param overrides - Configuration overrides
     * @returns Default configuration
     */
    private createDefaultConfig;
}
