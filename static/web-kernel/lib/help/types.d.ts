/**
 * Windows 98 F1 Help System - Type Definitions
 *
 * This file contains all TypeScript type definitions for the Windows 98 F1 Help System,
 * including interfaces for topics, bookmarks, search results, and system state.
 *
 * @fileoverview Complete type definitions for help system functionality
 */
/**
 * Help topic category enumeration
 */
export type HelpCategory = 'getting-started' | 'design' | 'specifications' | 'api' | 'guides' | 'kernel' | 'enterprise' | 'service' | 'shared' | 'build' | 'general';
/**
 * Help tab enumeration
 */
export type HelpTab = 'contents' | 'index' | 'search' | 'favorites' | 'history';
/**
 * Search field enumeration
 */
export type SearchField = 'title' | 'content' | 'keywords' | 'category';
/**
 * Query operator enumeration
 */
export type QueryOperatorType = 'AND' | 'OR' | 'NOT';
/**
 * User preference font size enumeration
 */
export type FontSize = 'small' | 'medium' | 'large';
/**
 * User preference theme enumeration
 */
export type Theme = 'windows98' | 'custom';
/**
 * Topic difficulty level enumeration
 */
export type DifficultyLevel = 'beginner' | 'intermediate' | 'advanced';
/**
 * Main help topic interface
 */
export interface HelpTopic {
    /** Unique topic identifier */
    id: string;
    /** Display title for the topic */
    title: string;
    /** HTML content of the topic */
    content: string;
    /** Icon class name for the topic */
    icon: string;
    /** Parent topic ID for hierarchical organization */
    parentId?: string;
    /** Child topics */
    children: HelpTopic[];
    /** Search keywords for the topic */
    keywords: string[];
    /** Topic category classification */
    category: HelpCategory;
    /** Last modification date */
    lastModified: Date;
    /** Related topic IDs */
    relatedTopics: string[];
    /** Bookmark status */
    bookmarked?: boolean;
    /** Additional topic metadata */
    metadata?: TopicMetadata;
}
/**
 * Topic metadata interface
 */
export interface TopicMetadata {
    /** Topic title */
    title: string;
    /** Topic category */
    category: string;
    /** Topic author */
    author?: string;
    /** Topic version */
    version?: string;
    /** Topic tags */
    tags?: string[];
    /** Topic difficulty level */
    difficulty?: DifficultyLevel;
    /** Estimated read time in minutes */
    estimatedReadTime?: number;
}
/**
 * Help bookmark interface
 */
export interface HelpBookmark {
    /** Unique bookmark identifier */
    id: string;
    /** Referenced topic ID */
    topicId: string;
    /** Bookmark title */
    title: string;
    /** Creation date */
    dateAdded: Date;
    /** Bookmark category */
    category?: string;
    /** User notes */
    notes?: string;
    /** User tags */
    tags?: string[];
}
/**
 * Search result interface
 */
export interface SearchResult {
    /** Topic ID */
    topicId: string;
    /** Topic title */
    title: string;
    /** Content snippet */
    snippet: string;
    /** Relevance score (0-1) */
    relevance: number;
    /** Matched search terms */
    matchedTerms: string[];
    /** Topic category */
    category: string;
    /** Last modification date */
    lastModified: Date;
    /** Bookmark status */
    bookmarked?: boolean;
}
/**
 * Search options interface
 */
export interface SearchOptions {
    /** Maximum number of results */
    limit?: number;
    /** Category filter */
    category?: string;
    /** Enable fuzzy matching */
    fuzzy?: boolean;
    /** Case sensitive search */
    caseSensitive?: boolean;
    /** Include content in search */
    includeContent?: boolean;
}
/**
 * Parsed query interface
 */
export interface ParsedQuery {
    /** Search terms */
    terms: string[];
    /** Quoted phrases */
    phrases: string[];
    /** Boolean operators */
    operators: QueryOperator[];
    /** Fuzzy matching enabled */
    fuzzy: boolean;
    /** Case sensitive search */
    caseSensitive: boolean;
}
/**
 * Query operator interface
 */
export interface QueryOperator {
    /** Operator type */
    type: QueryOperatorType;
    /** Operand */
    operand: string;
    /** Position in query */
    position: number;
}
/**
 * Window state interface
 */
export interface WindowState {
    /** Window position */
    position: {
        x: number;
        y: number;
    };
    /** Window size */
    size: {
        width: number;
        height: number;
    };
    /** Splitter position between panes */
    splitterPosition: number;
    /** Maximized state */
    maximized: boolean;
}
/**
 * User preferences interface
 */
export interface UserPreferences {
    /** Font size preference */
    fontSize: FontSize;
    /** Theme preference */
    theme: Theme;
    /** Language preference */
    language: string;
    /** Accessibility settings */
    accessibility: AccessibilitySettings;
}
/**
 * Accessibility settings interface
 */
export interface AccessibilitySettings {
    /** High contrast mode */
    highContrast: boolean;
    /** Reduced motion */
    reducedMotion: boolean;
    /** Screen reader support */
    screenReader: boolean;
    /** Keyboard navigation */
    keyboardNavigation: boolean;
}
/**
 * Main help system state interface
 */
export interface HelpSystemState {
    /** Currently displayed topic */
    currentTopic: string | null;
    /** Active tab */
    activeTab: HelpTab;
    /** Current search query */
    searchQuery: string;
    /** Search results */
    searchResults: SearchResult[];
    /** User bookmarks */
    bookmarks: HelpBookmark[];
    /** Navigation history */
    history: string[];
    /** Window state */
    windowState: WindowState;
    /** User preferences */
    userPreferences: UserPreferences;
}
/**
 * Search index structure interface
 */
export interface SearchIndex {
    /** Term to document mapping */
    terms: Map<string, TermEntry>;
    /** Document metadata */
    documents: Map<string, DocumentEntry>;
    /** Index last update time */
    lastUpdated: Date;
}
/**
 * Term entry interface
 */
export interface TermEntry {
    /** Search term */
    term: string;
    /** Documents containing term */
    documents: DocumentMatch[];
    /** Total frequency */
    frequency: number;
}
/**
 * Document match interface
 */
export interface DocumentMatch {
    /** Document ID */
    documentId: string;
    /** Term frequency in document */
    frequency: number;
    /** Term positions */
    positions: number[];
    /** Fields where term appears */
    fields: SearchField[];
}
/**
 * Document entry interface
 */
export interface DocumentEntry {
    /** Document ID */
    id: string;
    /** Document title */
    title: string;
    /** Document content */
    content: string;
    /** Document keywords */
    keywords: string[];
    /** Document category */
    category: string;
    /** Last modification date */
    lastModified: Date;
}
/**
 * Bookmark organization interface
 */
export interface BookmarkOrganization {
    /** Bookmark categories */
    categories: BookmarkCategory[];
    /** Sort field */
    sortBy: 'title' | 'dateAdded' | 'category';
    /** Sort order */
    sortOrder: 'asc' | 'desc';
}
/**
 * Bookmark category interface
 */
export interface BookmarkCategory {
    /** Category name */
    name: string;
    /** Bookmark IDs in category */
    bookmarks: string[];
    /** Category color */
    color?: string;
}
/**
 * History statistics interface
 */
export interface HistoryStats {
    /** Total visits */
    totalVisits: number;
    /** Unique topics visited */
    uniqueTopics: number;
    /** Most visited topics */
    mostVisited: {
        topicId: string;
        count: number;
    }[];
    /** Average session length */
    averageSessionLength: number;
    /** Last visit date */
    lastVisit: Date;
}
/**
 * Validation result interface
 */
export interface ValidationResult {
    /** Validation success */
    valid: boolean;
    /** Validation errors */
    errors: ValidationError[];
    /** Validation warnings */
    warnings: ValidationWarning[];
}
/**
 * Validation error interface
 */
export interface ValidationError {
    /** Error field */
    field: string;
    /** Error message */
    message: string;
    /** Error code */
    code: string;
}
/**
 * Validation warning interface
 */
export interface ValidationWarning {
    /** Warning field */
    field: string;
    /** Warning message */
    message: string;
    /** Warning code */
    code: string;
}
/**
 * Help system events interface
 */
export interface HelpSystemEvents {
    /** Topic changed event */
    'topic:changed': {
        topicId: string;
        topic: HelpTopic;
    };
    /** Search performed event */
    'search:performed': {
        query: string;
        results: SearchResult[];
    };
    /** Bookmark added event */
    'bookmark:added': {
        bookmark: HelpBookmark;
    };
    /** Bookmark removed event */
    'bookmark:removed': {
        topicId: string;
    };
    /** History updated event */
    'history:updated': {
        history: string[];
    };
    /** State changed event */
    'state:changed': {
        state: HelpSystemState;
    };
    /** Error occurred event */
    'error:occurred': {
        error: Error;
        context: string;
    };
}
/**
 * Event handler function type
 */
export type EventHandler = (data?: any) => void;
/**
 * Unsubscribe function type
 */
export type UnsubscribeFn = () => void;
/**
 * Help system manager interface
 */
export interface HelpSystemManager {
    /** Navigate to topic */
    navigateTo(topicId: string): Promise<void>;
    /** Go back in history */
    goBack(): Promise<void>;
    /** Go forward in history */
    goForward(): Promise<void>;
    /** Go to home topic */
    goHome(): Promise<void>;
    /** Search topics */
    search(query: string): Promise<SearchResult[]>;
    /** Get search history */
    getSearchHistory(): string[];
    /** Clear search history */
    clearSearchHistory(): void;
    /** Add bookmark */
    addBookmark(topicId: string, title?: string): Promise<void>;
    /** Remove bookmark */
    removeBookmark(topicId: string): Promise<void>;
    /** Get bookmarks */
    getBookmarks(): HelpBookmark[];
    /** Check if topic is bookmarked */
    isBookmarked(topicId: string): boolean;
    /** Get navigation history */
    getHistory(): string[];
    /** Clear navigation history */
    clearHistory(): void;
    /** Get topic by ID */
    getTopic(topicId: string): HelpTopic | null;
    /** Get topic tree */
    getTopicTree(): HelpTopic[];
    /** Get related topics */
    getRelatedTopics(topicId: string): HelpTopic[];
    /** Get current state */
    getState(): HelpSystemState;
    /** Save state to storage */
    saveState(): void;
    /** Load state from storage */
    loadState(): void;
    /** Reset state to defaults */
    resetState(): void;
    /** Add event listener */
    on(event: string, callback: EventHandler): UnsubscribeFn;
    /** Remove event listener */
    off(event: string, callback: EventHandler): void;
    /** Emit event */
    emit(event: string, data?: any): void;
}
/**
 * Content manager interface
 */
export interface ContentManager {
    /** Load all content */
    loadContent(): Promise<void>;
    /** Load specific topic */
    loadTopic(topicId: string): Promise<HelpTopic>;
    /** Load topic tree */
    loadTopicTree(): Promise<HelpTopic[]>;
    /** Parse markdown content */
    parseMarkdown(content: string): string;
    /** Extract metadata from content */
    extractMetadata(content: string): TopicMetadata;
    /** Build topic hierarchy */
    buildTopicHierarchy(topics: HelpTopic[]): HelpTopic[];
    /** Validate topic */
    validateTopic(topic: HelpTopic): ValidationResult;
    /** Validate content */
    validateContent(content: string): ValidationResult;
    /** Update topic */
    updateTopic(topicId: string, updates: Partial<HelpTopic>): Promise<void>;
    /** Add new topic */
    addTopic(topic: HelpTopic): Promise<void>;
    /** Remove topic */
    removeTopic(topicId: string): Promise<void>;
    /** Get related topics */
    getRelatedTopics(topicId: string): HelpTopic[];
    /** Build topic relationships */
    buildTopicRelationships(topics: HelpTopic[]): Map<string, string[]>;
}
/**
 * Search engine interface
 */
export interface SearchEngine {
    /** Search topics */
    search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
    /** Build search index */
    buildSearchIndex(topics: HelpTopic[]): Promise<void>;
    /** Update search index for topic */
    updateSearchIndex(topicId: string, topic: HelpTopic): Promise<void>;
    /** Tokenize search query */
    tokenize(query: string): string[];
    /** Normalize search term */
    normalize(term: string): string;
    /** Parse search query */
    parseQuery(query: string): ParsedQuery;
    /** Rank search results */
    rankResults(results: SearchResult[], query: string): SearchResult[];
    /** Highlight matches in content */
    highlightMatches(content: string, terms: string[]): string;
    /** Add query to history */
    addToHistory(query: string): void;
    /** Get search history */
    getSearchHistory(): string[];
    /** Clear search history */
    clearSearchHistory(): void;
}
/**
 * Bookmark manager interface
 */
export interface BookmarkManager {
    /** Add bookmark */
    addBookmark(topicId: string, title?: string): Promise<HelpBookmark>;
    /** Remove bookmark */
    removeBookmark(topicId: string): Promise<void>;
    /** Get all bookmarks */
    getBookmarks(): HelpBookmark[];
    /** Get specific bookmark */
    getBookmark(topicId: string): HelpBookmark | null;
    /** Check if topic is bookmarked */
    isBookmarked(topicId: string): boolean;
    /** Update bookmark */
    updateBookmark(bookmarkId: string, updates: Partial<HelpBookmark>): Promise<void>;
    /** Organize bookmarks */
    organizeBookmarks(organization: BookmarkOrganization): Promise<void>;
    /** Save bookmarks to storage */
    saveBookmarks(): Promise<void>;
    /** Load bookmarks from storage */
    loadBookmarks(): Promise<void>;
    /** Export bookmarks */
    exportBookmarks(): Promise<string>;
    /** Import bookmarks */
    importBookmarks(data: string): Promise<void>;
}
/**
 * History manager interface
 */
export interface HistoryManager {
    /** Navigate to topic */
    navigateTo(topicId: string): void;
    /** Go back in history */
    goBack(): string | null;
    /** Go forward in history */
    goForward(): string | null;
    /** Get navigation history */
    getHistory(): string[];
    /** Get current history index */
    getCurrentIndex(): number;
    /** Check if can go back */
    canGoBack(): boolean;
    /** Check if can go forward */
    canGoForward(): boolean;
    /** Clear navigation history */
    clearHistory(): void;
    /** Remove topic from history */
    removeFromHistory(topicId: string): void;
    /** Get history entry by index */
    getHistoryEntry(index: number): string | null;
    /** Save history to storage */
    saveHistory(): void;
    /** Load history from storage */
    loadHistory(): void;
    /** Get most visited topics */
    getMostVisited(): string[];
    /** Get recent topics */
    getRecentTopics(count: number): string[];
    /** Get history statistics */
    getHistoryStats(): HistoryStats;
}
/**
 * Content file interface for loading and processing
 */
export interface ContentFile {
    path: string;
    content: string;
    metadata: ContentMetadata;
    lastModified: Date;
    size: number;
    checksum: string;
}
/**
 * Content metadata interface
 */
export interface ContentMetadata {
    title: string;
    description?: string;
    category: string;
    tags: string[];
    difficulty: DifficultyLevel;
    order?: number;
    author?: string;
    version?: string;
    lastUpdated?: Date;
    language?: string;
    keywords?: string[];
    estimatedReadTime?: number;
}
/**
 * Parsed content interface
 */
export interface ParsedContent {
    html: string;
    toc: TableOfContents;
    metadata: ContentMetadata;
    links: ContentLink[];
    images: ContentImage[];
    codeBlocks: CodeBlock[];
    tables: Table[];
}
/**
 * Table of contents interface
 */
export interface TableOfContents {
    items: TOCItem[];
}
/**
 * Table of contents item interface
 */
export interface TOCItem {
    id: string;
    text: string;
    level: number;
    children: TOCItem[];
}
/**
 * Content link interface
 */
export interface ContentLink {
    text: string;
    url: string;
    type: 'internal' | 'external';
    target?: string;
}
/**
 * Content image interface
 */
export interface ContentImage {
    src: string;
    alt: string;
    title?: string;
    width?: number;
    height?: number;
}
/**
 * Code block interface
 */
export interface CodeBlock {
    language: string;
    code: string;
    filename?: string;
    lineNumbers?: boolean;
}
/**
 * Table interface
 */
export interface Table {
    headers: string[];
    rows: string[][];
    caption?: string;
}
/**
 * Search highlight interface
 */
export interface SearchHighlight {
    start: number;
    end: number;
    type: 'title' | 'content' | 'tag';
    term: string;
}
/**
 * Enhanced search result interface
 */
export interface EnhancedSearchResult extends SearchResult {
    topic: HelpTopic;
    highlights: SearchHighlight[];
    snippet: string;
    matchedTerms: string[];
}
/**
 * Search query interface
 */
export interface SearchQuery {
    terms: string[];
    operators: QueryOperator[];
    filters: SearchFilter[];
    options: SearchOptions;
}
/**
 * Search filter interface
 */
export interface SearchFilter {
    field: 'category' | 'tag' | 'difficulty' | 'author';
    value: string;
    operator: 'equals' | 'contains' | 'startsWith' | 'endsWith';
}
/**
 * Navigation history interface
 */
export interface NavigationHistory {
    topics: string[];
    currentIndex: number;
    maxSize: number;
    timestamps: number[];
}
/**
 * Enhanced bookmark interface
 */
export interface EnhancedBookmark extends HelpBookmark {
    folder?: string;
    isFavorite: boolean;
    modified: Date;
}
/**
 * Bookmark folder interface
 */
export interface BookmarkFolder {
    id: string;
    name: string;
    parent?: string;
    children: string[];
    created: Date;
    modified: Date;
    color?: string;
    icon?: string;
}
/**
 * Help system configuration interface
 */
export interface HelpSystemConfig {
    enableSearch: boolean;
    enableBookmarks: boolean;
    enableHistory: boolean;
    maxHistorySize: number;
    defaultWindowSize: {
        width: number;
        height: number;
    };
    splitterPosition: number;
    theme: Theme;
    fontSize: FontSize;
    showStatusBar: boolean;
    autoSave: boolean;
    searchConfig: SearchConfig;
    cacheConfig: CacheConfig;
    performanceConfig: PerformanceConfig;
}
/**
 * Search configuration interface
 */
export interface SearchConfig {
    maxResults: number;
    minScore: number;
    enableFuzzy: boolean;
    fuzzyThreshold: number;
    enableStemming: boolean;
    stopWords: string[];
    enableSuggestions: boolean;
    maxSuggestions: number;
}
/**
 * Cache configuration interface
 */
export interface CacheConfig {
    maxSize: number;
    ttl: number;
    enableCompression: boolean;
    enablePersistence: boolean;
}
/**
 * Performance configuration interface
 */
export interface PerformanceConfig {
    enableLazyLoading: boolean;
    enableVirtualScrolling: boolean;
    preloadCount: number;
    debounceDelay: number;
}
/**
 * Help system statistics interface
 */
export interface HelpSystemStats {
    totalTopics: number;
    totalCategories: number;
    totalBookmarks: number;
    historySize: number;
    cacheSize: number;
    lastUpdated: Date;
    uptime: number;
}
/**
 * Cache statistics interface
 */
export interface CacheStats {
    size: number;
    maxSize: number;
    hitRate: number;
    missRate: number;
    evictions: number;
}
/**
 * Search index statistics interface
 */
export interface SearchIndexStats {
    totalTerms: number;
    totalDocuments: number;
    averageTermsPerDocument: number;
    indexSize: number;
    buildTime: number;
    lastUpdated: Date;
}
/**
 * Bookmark statistics interface
 */
export interface BookmarkStats {
    topicId: string;
    title: string;
    bookmarkCount: number;
    lastBookmarked: Date;
}
/**
 * Sort option enumeration
 */
export type SortOption = 'title' | 'date' | 'category' | 'difficulty' | 'custom';
/**
 * Event types for help system
 */
export type HelpSystemEvent = 'initialized' | 'destroyed' | 'topicLoaded' | 'topicChanged' | 'searchPerformed' | 'bookmarkAdded' | 'bookmarkRemoved' | 'historyChanged' | 'configChanged' | 'error';
export type ContentEvent = 'contentLoaded' | 'contentParsed' | 'contentUpdated' | 'contentRemoved' | 'cacheCleared' | 'validationCompleted';
export type SearchEvent = 'indexBuilt' | 'indexUpdated' | 'searchPerformed' | 'suggestionsGenerated' | 'indexCleared';
export type BookmarkEvent = 'bookmarkAdded' | 'bookmarkRemoved' | 'bookmarkUpdated' | 'folderCreated' | 'folderDeleted' | 'bookmarksOrganized';
export type HistoryEvent = 'historyChanged' | 'navigationPerformed' | 'historyCleared' | 'historyOptimized';
/**
 * Type guard functions
 */
/**
 * Check if value is a valid HelpCategory
 */
export declare function isHelpCategory(value: unknown): value is HelpCategory;
/**
 * Check if value is a valid HelpTab
 */
export declare function isHelpTab(value: unknown): value is HelpTab;
/**
 * Check if value is a valid HelpTopic
 */
export declare function isHelpTopic(value: unknown): value is HelpTopic;
/**
 * Check if value is a valid HelpBookmark
 */
export declare function isHelpBookmark(value: unknown): value is HelpBookmark;
/**
 * Check if value is a valid SearchResult
 */
export declare function isSearchResult(value: unknown): value is SearchResult;
/**
 * Check if value is a valid HelpSystemState
 */
export declare function isHelpSystemState(value: unknown): value is HelpSystemState;
/**
 * Check if value is a valid ContentFile
 */
export declare function isContentFile(value: unknown): value is ContentFile;
/**
 * Check if value is a valid ContentMetadata
 */
export declare function isContentMetadata(value: unknown): value is ContentMetadata;
/**
 * Check if value is a valid ParsedContent
 */
export declare function isParsedContent(value: unknown): value is ParsedContent;
/**
 * Check if value is a valid SearchHighlight
 */
export declare function isSearchHighlight(value: unknown): value is SearchHighlight;
/**
 * Check if value is a valid HelpSystemConfig
 */
export declare function isHelpSystemConfig(value: unknown): value is HelpSystemConfig;
