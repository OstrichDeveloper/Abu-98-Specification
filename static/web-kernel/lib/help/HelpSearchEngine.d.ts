/**
 * Windows 98 F1 Help System - Search Engine
 *
 * This class provides full-text search functionality for the help system,
 * including query parsing, indexing, ranking, and result highlighting.
 *
 * @fileoverview Search engine for help system content
 */
import type { HelpTopic, SearchResult, SearchOptions, ParsedQuery, SearchIndex, SearchQuery, EnhancedSearchResult, SearchIndexStats, SearchConfig } from './types.js';
/**
 * Search engine for help system content
 */
export declare class HelpSearchEngine {
    private searchIndex;
    private searchHistory;
    private readonly maxHistorySize;
    private config;
    constructor(config?: Partial<SearchConfig>);
    /**
     * Search topics with query
     *
     * @param query - Search query string
     * @param options - Search options
     * @returns Array of search results
     */
    search(query: string, options?: SearchOptions): SearchResult[];
    /**
     * Build search index from topics
     *
     * @param topics - Topics to index
     * @returns Promise that resolves when index is built
     */
    buildSearchIndex(topics: HelpTopic[]): Promise<void>;
    /**
     * Update search index for a specific topic
     *
     * @param topicId - Topic ID to update
     * @param topic - Topic to index
     * @returns Promise that resolves when index is updated
     */
    updateSearchIndex(topicId: string, topic: HelpTopic): Promise<void>;
    /**
     * Tokenize text into search terms
     *
     * @param text - Text to tokenize
     * @returns Array of normalized terms
     */
    tokenize(text: string): string[];
    /**
     * Normalize search term
     *
     * @param term - Term to normalize
     * @returns Normalized term
     */
    normalize(term: string): string;
    /**
     * Parse search query
     *
     * @param query - Query string to parse
     * @returns Parsed query object
     */
    parseQuery(query: string): ParsedQuery;
    /**
     * Find documents matching the parsed query
     *
     * @param parsedQuery - Parsed query object
     * @returns Array of matching document IDs with scores
     */
    private findMatchingDocuments;
    /**
     * Rank search results by relevance
     *
     * @param matchingDocs - Documents with scores
     * @param parsedQuery - Parsed query
     * @returns Ranked search results
     */
    rankResults(matchingDocs: Array<{
        documentId: string;
        score: number;
    }>, parsedQuery: ParsedQuery): SearchResult[];
    /**
     * Calculate maximum possible score for a document
     *
     * @param document - Document to calculate max score for
     * @param parsedQuery - Parsed query
     * @returns Maximum possible score
     */
    private calculateMaxScore;
    /**
     * Create content snippet with highlighted matches
     *
     * @param content - Content to create snippet from
     * @param parsedQuery - Parsed query
     * @returns Content snippet
     */
    private createSnippet;
    /**
     * Get matched terms for a document
     *
     * @param document - Document
     * @param parsedQuery - Parsed query
     * @returns Array of matched terms
     */
    private getMatchedTerms;
    /**
     * Highlight matches in content
     *
     * @param content - Content to highlight
     * @param terms - Terms to highlight
     * @returns Content with highlighted terms
     */
    highlightMatches(content: string, terms: string[]): string;
    /**
     * Add query to search history
     *
     * @param query - Query to add
     */
    addToHistory(query: string): void;
    /**
     * Get search history
     *
     * @returns Array of recent search queries
     */
    getSearchHistory(): string[];
    /**
     * Clear search history
     */
    clearSearchHistory(): void;
    /**
     * Add term to search index
     *
     * @param term - Term to add
     * @param documentId - Document ID
     * @param position - Position in document
     * @param field - Field where term appears
     */
    private addTermToIndex;
    /**
     * Get the search index
     *
     * @returns The current search index
     */
    getSearchIndex(): SearchIndex;
    /**
     * Check if the search index is built
     *
     * @returns True if index is built, false otherwise
     */
    isIndexBuilt(): boolean;
    /**
     * Execute a parsed query
     *
     * @param parsedQuery - The parsed query to execute
     * @returns Array of search results
     */
    executeQuery(parsedQuery: ParsedQuery): SearchResult[];
    /**
     * Calculate relevance score for a term match
     *
     * @param term - The search term
     * @param text - The text to search in
     * @returns Relevance score between 0 and 1
     */
    calculateRelevance(term: string, text: string): number;
    /**
     * Generate a snippet from content with highlighted terms
     *
     * @param content - The content to generate snippet from
     * @param terms - Terms to highlight
     * @param maxLength - Maximum snippet length (default: 200)
     * @returns Generated snippet with highlighted terms
     */
    generateSnippet(content: string, terms: string, maxLength?: number): string;
    /**
     * Search with advanced query
     *
     * @param query - Advanced search query
     * @returns Promise that resolves with enhanced search results
     */
    searchAdvanced(query: SearchQuery): Promise<EnhancedSearchResult[]>;
    /**
     * Search by category
     *
     * @param query - Search query
     * @param category - Category to filter by
     * @returns Promise that resolves with search results
     */
    searchByCategory(query: string, category: string): Promise<SearchResult[]>;
    /**
     * Search by tag
     *
     * @param query - Search query
     * @param tag - Tag to filter by
     * @returns Promise that resolves with search results
     */
    searchByTag(query: string, tag: string): Promise<SearchResult[]>;
    /**
     * Get search suggestions
     *
     * @param query - Partial search query
     * @returns Promise that resolves with suggestions
     */
    getSuggestions(query: string): Promise<string[]>;
    /**
     * Get related topics
     *
     * @param topicId - Topic ID to get related topics for
     * @returns Promise that resolves with related topics
     */
    getRelatedTopics(topicId: string): Promise<SearchResult[]>;
    /**
     * Get popular searches
     *
     * @returns Promise that resolves with popular search queries
     */
    getPopularSearches(): Promise<string[]>;
    /**
     * Get search suggestions for partial query
     *
     * @param query - Partial search query
     * @returns Array of search suggestions
     */
    getSearchSuggestions(query: string): string[];
    /**
     * Check if search index is built
     *
     * @returns True if index is built
     */
    isIndexed(): boolean;
    /**
     * Remove from search index
     *
     * @param path - Path to remove from index
     * @returns Promise that resolves when removal is complete
     */
    removeFromIndex(path: string): Promise<void>;
    /**
     * Clear search index
     *
     * @returns Promise that resolves when index is cleared
     */
    clearIndex(): Promise<void>;
    /**
     * Rebuild search index
     *
     * @returns Promise that resolves when index is rebuilt
     */
    rebuildIndex(): Promise<void>;
    /**
     * Get search index statistics
     *
     * @returns Search index statistics
     */
    getIndexStats(): SearchIndexStats;
    /**
     * Set search configuration
     *
     * @param config - Search configuration
     */
    setConfig(config: SearchConfig): void;
    /**
     * Get search configuration
     *
     * @returns Current search configuration
     */
    getConfig(): SearchConfig;
    /**
     * Set stop words
     *
     * @param words - Array of stop words
     */
    setStopWords(words: string[]): void;
    /**
     * Set minimum score threshold
     *
     * @param score - Minimum score threshold
     */
    setMinScore(score: number): void;
    /**
     * Enhance search result with additional data
     *
     * @param result - Basic search result
     * @param query - Search query
     * @returns Enhanced search result
     */
    private enhanceSearchResult;
    /**
     * Generate search highlights
     *
     * @param result - Search result
     * @param query - Search query
     * @returns Array of search highlights
     */
    private generateHighlights;
    /**
     * Create enhanced snippet
     *
     * @param result - Search result
     * @param query - Search query
     * @returns Enhanced snippet
     */
    private createEnhancedSnippet;
    /**
     * Get matched terms from query
     *
     * @param result - Search result
     * @param query - Search query
     * @returns Array of matched terms
     */
    private getMatchedTermsFromQuery;
    /**
     * Create topic from search result
     *
     * @param result - Search result
     * @returns Help topic
     */
    private createTopicFromResult;
    /**
     * Calculate index size in bytes
     *
     * @returns Index size in bytes
     */
    private calculateIndexSize;
    /**
     * Create default search configuration
     *
     * @param overrides - Configuration overrides
     * @returns Default search configuration
     */
    private createDefaultConfig;
}
