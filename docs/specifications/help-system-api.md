---
title: Help System API Reference
description: Complete API reference for the Windows 98 Help System
category: api
tags: [help-system, api-reference, documentation, typescript]
difficulty: advanced
order: 1
---

# Help System API Reference

## Overview

This document provides the complete API reference for the Windows 98 Help System implementation in the Abu OS 98 Web Kernel. The API is designed to be type-safe, well-documented, and easy to use for both internal components and external integrations.

## Core Classes

### HelpSystemManager

The main controller class that manages all help system operations.

```typescript
class HelpSystemManager {
  constructor(config?: HelpSystemConfig);
  
  // Lifecycle Methods
  async initialize(): Promise<void>;
  async destroy(): Promise<void>;
  isInitialized(): boolean;
  
  // Content Management
  async loadContent(path: string): Promise<HelpTopic>;
  async getTopic(id: string): Promise<HelpTopic | null>;
  async getTopicsByCategory(category: string): Promise<HelpTopic[]>;
  async getAllTopics(): Promise<HelpTopic[]>;
  async getCategories(): Promise<HelpCategory[]>;
  
  // Search Operations
  async search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  async getSearchSuggestions(query: string): Promise<string[]>;
  async clearSearchHistory(): Promise<void>;
  
  // Navigation
  async navigateToTopic(topicId: string): Promise<void>;
  async goBack(): Promise<void>;
  async goForward(): Promise<void>;
  async goHome(): Promise<void>;
  canGoBack(): boolean;
  canGoForward(): boolean;
  
  // Bookmarks
  async addBookmark(topicId: string, folder?: string, notes?: string): Promise<void>;
  async removeBookmark(topicId: string): Promise<void>;
  async getBookmarks(folder?: string): Promise<Bookmark[]>;
  async organizeBookmarks(bookmarks: Bookmark[]): Promise<void>;
  async exportBookmarks(): Promise<string>;
  async importBookmarks(data: string): Promise<void>;
  
  // History
  async getHistory(): Promise<NavigationHistory>;
  async clearHistory(): Promise<void>;
  async getHistoryItem(index: number): Promise<HelpTopic | null>;
  
  // Configuration
  async updateConfig(config: Partial<HelpSystemConfig>): Promise<void>;
  async getConfig(): Promise<HelpSystemConfig>;
  async resetConfig(): Promise<void>;
  
  // Events
  on(event: HelpSystemEvent, handler: Function): void;
  off(event: HelpSystemEvent, handler: Function): void;
  emit(event: HelpSystemEvent, data?: any): void;
  
  // Utility Methods
  async refresh(): Promise<void>;
  async validateContent(): Promise<ValidationResult[]>;
  getStats(): HelpSystemStats;
}
```

### ContentManager

Manages content loading, parsing, and organization.

```typescript
class ContentManager {
  constructor(
    loader: ContentLoader,
    parser: MarkdownParser,
    builder: TopicBuilder
  );
  
  // Content Loading
  async loadContent(path: string): Promise<ContentFile>;
  async loadAllContent(): Promise<ContentFile[]>;
  async reloadContent(path: string): Promise<ContentFile>;
  async preloadContent(paths: string[]): Promise<void>;
  
  // Content Processing
  async parseContent(contentFile: ContentFile): Promise<ParsedContent>;
  async buildTopic(parsedContent: ParsedContent): Promise<HelpTopic>;
  async buildCategory(topics: HelpTopic[]): Promise<HelpCategory>;
  async processContentBatch(files: ContentFile[]): Promise<ProcessedContent[]>;
  
  // Content Access
  getContentFile(path: string): ContentFile | null;
  getTopic(id: string): HelpTopic | null;
  getCategory(id: string): HelpCategory | null;
  getAllTopics(): HelpTopic[];
  getAllCategories(): HelpCategory[];
  getTopicsByTag(tag: string): HelpTopic[];
  getTopicsByDifficulty(difficulty: string): HelpTopic[];
  
  // Content Management
  async addContent(contentFile: ContentFile): Promise<void>;
  async updateContent(path: string, contentFile: ContentFile): Promise<void>;
  async removeContent(path: string): Promise<void>;
  async validateContent(contentFile: ContentFile): Promise<ValidationResult[]>;
  
  // Cache Management
  clearCache(): void;
  getCacheStats(): CacheStats;
  setCacheSize(size: number): void;
  
  // Events
  on(event: ContentEvent, handler: Function): void;
  off(event: ContentEvent, handler: Function): void;
}
```

### SearchEngine

Provides full-text search capabilities with advanced features.

```typescript
class SearchEngine {
  constructor(index?: SearchIndex);
  
  // Index Management
  async buildIndex(contentFiles: ContentFile[]): Promise<void>;
  async updateIndex(contentFile: ContentFile): Promise<void>;
  async removeFromIndex(path: string): Promise<void>;
  async clearIndex(): Promise<void>;
  async rebuildIndex(): Promise<void>;
  
  // Search Operations
  async search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  async searchAdvanced(query: SearchQuery): Promise<SearchResult[]>;
  async searchByCategory(query: string, category: string): Promise<SearchResult[]>;
  async searchByTag(query: string, tag: string): Promise<SearchResult[]>;
  
  // Search Features
  async getSuggestions(query: string): Promise<string[]>;
  async getRelatedTopics(topicId: string): Promise<SearchResult[]>;
  async getPopularSearches(): Promise<string[]>;
  async getSearchHistory(): Promise<string[]>;
  
  // Index Access
  getIndex(): SearchIndex;
  getIndexStats(): SearchIndexStats;
  isIndexBuilt(): boolean;
  
  // Configuration
  setConfig(config: SearchConfig): void;
  getConfig(): SearchConfig;
  setStopWords(words: string[]): void;
  setMinScore(score: number): void;
  
  // Events
  on(event: SearchEvent, handler: Function): void;
  off(event: SearchEvent, handler: Function): void;
}
```

### BookmarkManager

Manages user bookmarks and favorites with organization features.

```typescript
class BookmarkManager {
  constructor(storage: Storage);
  
  // Bookmark Operations
  async addBookmark(topicId: string, folder?: string, notes?: string): Promise<void>;
  async removeBookmark(topicId: string): Promise<void>;
  async updateBookmark(bookmarkId: string, updates: Partial<Bookmark>): Promise<void>;
  async getBookmark(bookmarkId: string): Promise<Bookmark | null>;
  
  // Bookmark Access
  async getBookmarks(folder?: string): Promise<Bookmark[]>;
  async getAllBookmarks(): Promise<Bookmark[]>;
  async getBookmarksByTopic(topicId: string): Promise<Bookmark[]>;
  async getBookmarksByTag(tag: string): Promise<Bookmark[]>;
  
  // Folder Management
  async createFolder(name: string, parent?: string): Promise<void>;
  async deleteFolder(folderId: string): Promise<void>;
  async renameFolder(folderId: string, newName: string): Promise<void>;
  async getFolders(): Promise<BookmarkFolder[]>;
  async moveBookmark(bookmarkId: string, folderId: string): Promise<void>;
  
  // Organization
  async organizeBookmarks(bookmarks: Bookmark[]): Promise<void>;
  async sortBookmarks(folderId: string, sortBy: SortOption): Promise<void>;
  async searchBookmarks(query: string): Promise<Bookmark[]>;
  
  // Import/Export
  async exportBookmarks(): Promise<string>;
  async importBookmarks(data: string): Promise<void>;
  async exportToHTML(): Promise<string>;
  
  // Statistics
  getBookmarkStats(): BookmarkStats;
  getMostBookmarkedTopics(): BookmarkStats[];
  
  // Events
  on(event: BookmarkEvent, handler: Function): void;
  off(event: BookmarkEvent, handler: Function): void;
}
```

### HistoryManager

Tracks and manages navigation history with optimization features.

```typescript
class HistoryManager {
  constructor(maxSize?: number);
  
  // Navigation
  async navigateToTopic(topicId: string): Promise<void>;
  async goBack(): Promise<HelpTopic | null>;
  async goForward(): Promise<HelpTopic | null>;
  async goToHistoryItem(index: number): Promise<HelpTopic | null>;
  
  // History Access
  getHistory(): NavigationHistory;
  getCurrentTopic(): HelpTopic | null;
  getHistoryItem(index: number): HelpTopic | null;
  getHistoryRange(start: number, end: number): HelpTopic[];
  
  // History Management
  async clearHistory(): Promise<void>;
  async removeHistoryItem(index: number): Promise<void>;
  async truncateHistory(maxSize: number): Promise<void>;
  
  // State Management
  canGoBack(): boolean;
  canGoForward(): boolean;
  getCurrentIndex(): number;
  getHistorySize(): number;
  
  // Optimization
  async optimizeHistory(): Promise<void>;
  async deduplicateHistory(): Promise<void>;
  async compressHistory(): Promise<void>;
  
  // Persistence
  async saveHistory(): Promise<void>;
  async loadHistory(): Promise<void>;
  async clearPersistedHistory(): Promise<void>;
  
  // Events
  on(event: HistoryEvent, handler: Function): void;
  off(event: HistoryEvent, handler: Function): void;
}
```

## Data Types

### Core Types

```typescript
// Content Types
interface ContentFile {
  path: string;
  content: string;
  metadata: ContentMetadata;
  lastModified: Date;
  size: number;
  checksum: string;
}

interface ContentMetadata {
  title: string;
  description?: string;
  category: string;
  tags: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  order?: number;
  author?: string;
  version?: string;
  lastUpdated?: Date;
  language?: string;
  keywords?: string[];
}

interface ParsedContent {
  html: string;
  toc: TableOfContents;
  metadata: ContentMetadata;
  links: ContentLink[];
  images: ContentImage[];
  codeBlocks: CodeBlock[];
  tables: Table[];
}

interface HelpTopic {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  difficulty: string;
  order: number;
  parent?: string;
  children: string[];
  lastModified: Date;
  wordCount: number;
  readingTime: number;
  relatedTopics: string[];
}

interface HelpCategory {
  id: string;
  name: string;
  description?: string;
  topics: string[];
  order: number;
  parent?: string;
  children: string[];
  icon?: string;
  color?: string;
}

// Search Types
interface SearchResult {
  topic: HelpTopic;
  score: number;
  highlights: SearchHighlight[];
  snippet: string;
  matchedTerms: string[];
  category: string;
}

interface SearchHighlight {
  start: number;
  end: number;
  type: 'title' | 'content' | 'tag';
  term: string;
}

interface SearchQuery {
  terms: string[];
  operators: SearchOperator[];
  filters: SearchFilter[];
  options: SearchOptions;
}

interface SearchOptions {
  limit?: number;
  offset?: number;
  category?: string;
  difficulty?: string;
  tags?: string[];
  sortBy?: 'relevance' | 'title' | 'date' | 'category';
  sortOrder?: 'asc' | 'desc';
  includeContent?: boolean;
  highlight?: boolean;
}

// Navigation Types
interface NavigationHistory {
  topics: string[];
  currentIndex: number;
  maxSize: number;
  timestamps: number[];
}

interface Bookmark {
  id: string;
  topicId: string;
  title: string;
  category: string;
  created: Date;
  modified: Date;
  folder?: string;
  notes?: string;
  tags: string[];
  isFavorite: boolean;
}

interface BookmarkFolder {
  id: string;
  name: string;
  parent?: string;
  children: string[];
  created: Date;
  modified: Date;
  color?: string;
  icon?: string;
}

// Configuration Types
interface HelpSystemConfig {
  enableSearch: boolean;
  enableBookmarks: boolean;
  enableHistory: boolean;
  maxHistorySize: number;
  defaultWindowSize: {
    width: number;
    height: number;
  };
  splitterPosition: number;
  theme: 'windows98' | 'custom';
  fontSize: 'small' | 'normal' | 'large';
  showStatusBar: boolean;
  autoSave: boolean;
  searchConfig: SearchConfig;
  cacheConfig: CacheConfig;
  performanceConfig: PerformanceConfig;
}

interface SearchConfig {
  maxResults: number;
  minScore: number;
  enableFuzzy: boolean;
  fuzzyThreshold: number;
  enableStemming: boolean;
  stopWords: string[];
  enableSuggestions: boolean;
  maxSuggestions: number;
}

interface CacheConfig {
  maxSize: number;
  ttl: number;
  enableCompression: boolean;
  enablePersistence: boolean;
}

interface PerformanceConfig {
  enableLazyLoading: boolean;
  enableVirtualScrolling: boolean;
  preloadCount: number;
  debounceDelay: number;
}
```

### Event Types

```typescript
// Event Types
type HelpSystemEvent = 
  | 'initialized'
  | 'destroyed'
  | 'topicLoaded'
  | 'topicChanged'
  | 'searchPerformed'
  | 'bookmarkAdded'
  | 'bookmarkRemoved'
  | 'historyChanged'
  | 'configChanged'
  | 'error';

type ContentEvent = 
  | 'contentLoaded'
  | 'contentParsed'
  | 'contentUpdated'
  | 'contentRemoved'
  | 'cacheCleared'
  | 'validationCompleted';

type SearchEvent = 
  | 'indexBuilt'
  | 'indexUpdated'
  | 'searchPerformed'
  | 'suggestionsGenerated'
  | 'indexCleared';

type BookmarkEvent = 
  | 'bookmarkAdded'
  | 'bookmarkRemoved'
  | 'bookmarkUpdated'
  | 'folderCreated'
  | 'folderDeleted'
  | 'bookmarksOrganized';

type HistoryEvent = 
  | 'historyChanged'
  | 'navigationPerformed'
  | 'historyCleared'
  | 'historyOptimized';
```

### Utility Types

```typescript
// Utility Types
interface ValidationResult {
  type: 'error' | 'warning' | 'info';
  message: string;
  field?: string;
  line?: number;
  column?: number;
}

interface HelpSystemStats {
  totalTopics: number;
  totalCategories: number;
  totalBookmarks: number;
  historySize: number;
  cacheSize: number;
  lastUpdated: Date;
  uptime: number;
}

interface CacheStats {
  size: number;
  maxSize: number;
  hitRate: number;
  missRate: number;
  evictions: number;
}

interface SearchIndexStats {
  totalTerms: number;
  totalDocuments: number;
  averageTermsPerDocument: number;
  indexSize: number;
  buildTime: number;
  lastUpdated: Date;
}

interface BookmarkStats {
  topicId: string;
  title: string;
  bookmarkCount: number;
  lastBookmarked: Date;
}

type SortOption = 'title' | 'date' | 'category' | 'difficulty' | 'custom';
```

## Usage Examples

### Basic Usage

```typescript
// Initialize help system
const helpSystem = new HelpSystemManager({
  enableSearch: true,
  enableBookmarks: true,
  enableHistory: true,
  maxHistorySize: 100
});

await helpSystem.initialize();

// Load content
const topic = await helpSystem.loadContent('getting-started.md');
console.log('Loaded topic:', topic.title);

// Search for content
const results = await helpSystem.search('help system');
console.log('Found', results.length, 'results');

// Navigate to a topic
await helpSystem.navigateToTopic(results[0].topic.id);

// Add bookmark
await helpSystem.addBookmark(results[0].topic.id, 'My Favorites');
```

### Advanced Search

```typescript
// Advanced search with filters
const results = await helpSystem.search('help system', {
  category: 'specifications',
  difficulty: 'intermediate',
  tags: ['help-system', 'windows-98'],
  limit: 10,
  sortBy: 'relevance'
});

// Search with boolean operators
const advancedResults = await helpSystem.searchEngine.searchAdvanced({
  terms: ['help', 'system'],
  operators: [{ type: 'AND', position: 1 }],
  filters: [
    { field: 'category', value: 'specifications', operator: 'equals' }
  ],
  options: {
    limit: 20,
    highlight: true,
    includeContent: true
  }
});
```

### Event Handling

```typescript
// Listen for events
helpSystem.on('topicChanged', (topic: HelpTopic) => {
  console.log('Topic changed to:', topic.title);
  updateUI(topic);
});

helpSystem.on('searchPerformed', (query: string, results: SearchResult[]) => {
  console.log('Search performed:', query, 'found', results.length, 'results');
  updateSearchResults(results);
});

helpSystem.on('bookmarkAdded', (bookmark: Bookmark) => {
  console.log('Bookmark added:', bookmark.title);
  updateBookmarkList();
});

// Remove event listeners
helpSystem.off('topicChanged', updateUI);
```

### Configuration Management

```typescript
// Update configuration
await helpSystem.updateConfig({
  fontSize: 'large',
  showStatusBar: false,
  searchConfig: {
    maxResults: 50,
    enableFuzzy: true,
    fuzzyThreshold: 0.8
  }
});

// Get current configuration
const config = await helpSystem.getConfig();
console.log('Current config:', config);

// Reset to defaults
await helpSystem.resetConfig();
```

### Bookmark Management

```typescript
// Create bookmark folder
await helpSystem.bookmarkManager.createFolder('Work Projects');

// Add bookmark to folder
await helpSystem.addBookmark('project-overview.md', 'Work Projects', 'Important project documentation');

// Get bookmarks by folder
const workBookmarks = await helpSystem.getBookmarks('Work Projects');

// Organize bookmarks
const bookmarks = await helpSystem.getAllBookmarks();
const organizedBookmarks = bookmarks.map(bookmark => ({
  ...bookmark,
  folder: bookmark.category === 'work' ? 'Work Projects' : 'General'
}));
await helpSystem.organizeBookmarks(organizedBookmarks);

// Export bookmarks
const bookmarkData = await helpSystem.exportBookmarks();
console.log('Exported bookmarks:', bookmarkData);
```

### Performance Optimization

```typescript
// Configure performance settings
await helpSystem.updateConfig({
  performanceConfig: {
    enableLazyLoading: true,
    enableVirtualScrolling: true,
    preloadCount: 5,
    debounceDelay: 300
  },
  cacheConfig: {
    maxSize: 1000,
    ttl: 300000, // 5 minutes
    enableCompression: true,
    enablePersistence: true
  }
});

// Get system statistics
const stats = helpSystem.getStats();
console.log('System stats:', stats);

// Validate content
const validationResults = await helpSystem.validateContent();
validationResults.forEach(result => {
  if (result.type === 'error') {
    console.error('Validation error:', result.message);
  }
});
```

## Error Handling

### Error Types

```typescript
class HelpSystemError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: any
  ) {
    super(message);
    this.name = 'HelpSystemError';
  }
}

class ContentLoadError extends HelpSystemError {
  constructor(path: string, reason: string) {
    super(`Failed to load content from ${path}: ${reason}`, 'CONTENT_LOAD_ERROR', { path, reason });
  }
}

class SearchError extends HelpSystemError {
  constructor(query: string, reason: string) {
    super(`Search failed for "${query}": ${reason}`, 'SEARCH_ERROR', { query, reason });
  }
}

class BookmarkError extends HelpSystemError {
  constructor(operation: string, reason: string) {
    super(`Bookmark operation failed (${operation}): ${reason}`, 'BOOKMARK_ERROR', { operation, reason });
  }
}
```

### Error Handling Examples

```typescript
try {
  const topic = await helpSystem.loadContent('nonexistent.md');
} catch (error) {
  if (error instanceof ContentLoadError) {
    console.error('Content load failed:', error.details);
    // Handle content load error
  } else {
    console.error('Unexpected error:', error);
  }
}

// Global error handling
helpSystem.on('error', (error: HelpSystemError) => {
  console.error('Help system error:', error.message, error.details);
  // Handle error appropriately
});
```

## Browser Compatibility

### Supported Browsers
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Polyfills Required
- `Promise` (IE 11)
- `Map` and `Set` (IE 11)
- `Array.from` (IE 11)
- `Object.assign` (IE 11)

### Feature Detection

```typescript
// Check for required features
function checkBrowserSupport(): boolean {
  return (
    typeof Promise !== 'undefined' &&
    typeof Map !== 'undefined' &&
    typeof Set !== 'undefined' &&
    typeof Array.from !== 'undefined' &&
    typeof Object.assign !== 'undefined'
  );
}

if (!checkBrowserSupport()) {
  console.error('Browser does not support required features');
  // Load polyfills or show error message
}
```

## Conclusion

This API reference provides comprehensive documentation for the Windows 98 Help System implementation. The API is designed to be intuitive, type-safe, and powerful, enabling developers to create rich help system experiences while maintaining the authentic Windows 98 feel.

The API supports both simple use cases and advanced scenarios, with extensive configuration options and event handling capabilities. All methods are well-documented with TypeScript types, making development easier and more reliable.

