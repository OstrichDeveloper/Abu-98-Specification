/**
 * Windows 98 F1 Help System - Content Manager
 *
 * This class manages help system content including loading, parsing, validation,
 * and organization of help topics. It handles markdown processing, metadata
 * extraction, and topic hierarchy building.
 *
 * @fileoverview Content management for help system topics and documentation
 */
import type { HelpTopic, TopicMetadata, ValidationResult, HelpCategory, ContentFile, ParsedContent } from './types.js';
/**
 * Content manager for help system topics
 */
export declare class HelpContentManager {
    private topics;
    private topicTree;
    private relationships;
    /**
     * Load all help content from available sources
     *
     * @returns Promise that resolves when content is loaded
     * @throws Error if content loading fails
     */
    loadContent(): Promise<void>;
    /**
     * Load a specific topic by ID
     *
     * @param topicId - The topic ID to load
     * @returns Promise that resolves with the topic
     * @throws Error if topic is not found
     */
    loadTopic(topicId: string): Promise<HelpTopic>;
    /**
     * Load the complete topic tree
     *
     * @returns Promise that resolves with the topic tree
     */
    loadTopicTree(): Promise<HelpTopic[]>;
    /**
     * Parse markdown content to HTML
     *
     * @param content - Markdown content to parse
     * @returns HTML content
     */
    parseMarkdown(content: string): string;
    /**
     * Extract metadata from content
     *
     * @param content - Content to extract metadata from
     * @returns Extracted metadata
     */
    extractMetadata(content: string): TopicMetadata;
    /**
     * Build topic hierarchy from flat topic list
     *
     * @param topics - Flat list of topics
     * @returns Hierarchical topic tree
     */
    buildTopicHierarchy(topics: HelpTopic[]): HelpTopic[];
    /**
     * Validate a topic
     *
     * @param topic - Topic to validate
     * @returns Validation result
     */
    validateTopic(topic: HelpTopic): ValidationResult;
    /**
     * Validate content string
     *
     * @param content - Content to validate
     * @returns Validation result
     */
    validateContent(content: string): ValidationResult;
    /**
     * Update a topic
     *
     * @param topicId - Topic ID to update
     * @param updates - Updates to apply
     * @returns Promise that resolves when update is complete
     * @throws Error if topic is not found
     */
    updateTopic(topicId: string, updates: Partial<HelpTopic>): Promise<void>;
    /**
     * Add a new topic
     *
     * @param topic - Topic to add
     * @returns Promise that resolves when topic is added
     * @throws Error if topic is invalid or already exists
     */
    addTopic(topic: HelpTopic): Promise<void>;
    /**
     * Remove a topic
     *
     * @param topicId - Topic ID to remove
     * @returns Promise that resolves when topic is removed
     * @throws Error if topic is not found
     */
    removeTopic(topicId: string): Promise<void>;
    /**
     * Get related topics for a given topic
     *
     * @param topicId - Topic ID to get related topics for
     * @returns Array of related topics
     */
    getRelatedTopics(topicId: string): HelpTopic[];
    /**
     * Get topic path (breadcrumb) for a given topic
     *
     * @param topicId - Topic ID to get path for
     * @returns Array of topics in path order
     */
    getTopicPath(topicId: string): HelpTopic[];
    /**
     * Build topic relationships
     *
     * @param topics - Topics to build relationships for
     * @returns Map of topic ID to related topic IDs
     */
    buildTopicRelationships(topics: HelpTopic[]): Map<string, string[]>;
    /**
     * Get topic by ID
     *
     * @param topicId - Topic ID
     * @returns Topic or null if not found
     */
    getTopic(topicId: string): HelpTopic | undefined;
    /**
     * Get all topics
     *
     * @returns Array of all topics
     */
    getAllTopics(): HelpTopic[];
    /**
     * Get topics by category
     *
     * @param category - Category to filter by
     * @returns Array of topics in category
     */
    getTopicsByCategory(category: HelpCategory): HelpTopic[];
    /**
     * Load content file
     *
     * @param path - Path to content file
     * @returns Promise that resolves with content file
     */
    loadContentFile(path: string): Promise<ContentFile>;
    /**
     * Load all content files
     *
     * @returns Promise that resolves with all content files
     */
    loadAllContentFiles(): Promise<ContentFile[]>;
    /**
     * Reload content file
     *
     * @param path - Path to content file
     * @returns Promise that resolves with reloaded content file
     */
    reloadContentFile(path: string): Promise<ContentFile>;
    /**
     * Preload content files
     *
     * @param paths - Paths to preload
     * @returns Promise that resolves when preloading is complete
     */
    preloadContentFiles(paths: string[]): Promise<void>;
    /**
     * Parse content file
     *
     * @param contentFile - Content file to parse
     * @returns Promise that resolves with parsed content
     */
    parseContentFile(contentFile: ContentFile): Promise<ParsedContent>;
    /**
     * Build topic from parsed content
     *
     * @param parsedContent - Parsed content
     * @returns Promise that resolves with help topic
     */
    buildTopicFromParsedContent(parsedContent: ParsedContent): Promise<HelpTopic>;
    /**
     * Build category from topics
     *
     * @param topics - Topics to build category from
     * @returns Promise that resolves with help category
     */
    buildCategoryFromTopics(topics: HelpTopic[]): Promise<{
        id: string;
        name: string;
        topics: string[];
    }>;
    /**
     * Process content batch
     *
     * @param files - Content files to process
     * @returns Promise that resolves with processed content
     */
    processContentBatch(files: ContentFile[]): Promise<{
        topics: HelpTopic[];
        categories: string[];
    }>;
    /**
     * Get content file by path
     *
     * @param path - Content file path
     * @returns Content file or null if not found
     */
    getContentFile(_path: string): ContentFile | null;
    /**
     * Get category by ID
     *
     * @param id - Category ID
     * @returns Category or null if not found
     */
    getCategory(id: string): {
        id: string;
        name: string;
        topics: string[];
    } | null;
    /**
     * Get all categories
     *
     * @returns Array of all categories
     */
    getAllCategories(): {
        id: string;
        name: string;
        topics: string[];
    }[];
    /**
     * Get topics by tag
     *
     * @param tag - Tag to filter by
     * @returns Array of topics with tag
     */
    getTopicsByTag(tag: string): HelpTopic[];
    /**
     * Get topics by difficulty
     *
     * @param difficulty - Difficulty level to filter by
     * @returns Array of topics with difficulty
     */
    getTopicsByDifficulty(difficulty: string): HelpTopic[];
    /**
     * Add content file
     *
     * @param contentFile - Content file to add
     * @returns Promise that resolves when content is added
     */
    addContentFile(contentFile: ContentFile): Promise<void>;
    /**
     * Update content file
     *
     * @param path - Path to content file
     * @param contentFile - Updated content file
     * @returns Promise that resolves when content is updated
     */
    updateContentFile(_path: string, contentFile: ContentFile): Promise<void>;
    /**
     * Remove content file
     *
     * @param path - Path to content file
     * @returns Promise that resolves when content is removed
     */
    removeContentFile(path: string): Promise<void>;
    /**
     * Validate content file
     *
     * @param contentFile - Content file to validate
     * @returns Array of validation results
     */
    validateContentFile(contentFile: ContentFile): Promise<ValidationResult[]>;
    /**
     * Clear cache
     */
    clearCache(): void;
    /**
     * Get cache statistics
     *
     * @returns Cache statistics
     */
    getCacheStats(): {
        size: number;
        maxSize: number;
        hitRate: number;
        missRate: number;
        evictions: number;
    };
    /**
     * Set cache size
     *
     * @param size - Maximum cache size
     */
    setCacheSize(size: number): void;
    /**
     * Create default topics for testing
     *
     * @returns Promise that resolves when default topics are created
     */
    private createDefaultTopics;
    /**
     * Load content from path (placeholder implementation)
     *
     * @param path - Content path
     * @returns Promise that resolves with content
     */
    private loadContentFromPath;
    /**
     * Get content paths (placeholder implementation)
     *
     * @returns Promise that resolves with content paths
     */
    private getContentPaths;
    /**
     * Calculate content checksum
     *
     * @param content - Content to calculate checksum for
     * @returns Content checksum
     */
    private calculateChecksum;
    /**
     * Extract table of contents from content
     *
     * @param content - Content to extract TOC from
     * @returns Table of contents
     */
    private extractTableOfContents;
    /**
     * Extract links from content
     *
     * @param content - Content to extract links from
     * @returns Array of content links
     */
    private extractLinks;
    /**
     * Extract images from content
     *
     * @param content - Content to extract images from
     * @returns Array of content images
     */
    private extractImages;
    /**
     * Extract code blocks from content
     *
     * @param content - Content to extract code blocks from
     * @returns Array of code blocks
     */
    private extractCodeBlocks;
    /**
     * Extract tables from content
     *
     * @param content - Content to extract tables from
     * @returns Array of tables
     */
    private extractTables;
    /**
     * Generate topic ID from title
     *
     * @param title - Topic title
     * @returns Generated topic ID
     */
    private generateTopicId;
    /**
     * Generate heading ID from text
     *
     * @param text - Heading text
     * @returns Generated heading ID
     */
    private generateHeadingId;
    /**
     * Get icon for category
     *
     * @param category - Category name
     * @returns Icon class name
     */
    private getIconForCategory;
    /**
     * Format category name
     *
     * @param category - Category ID
     * @returns Formatted category name
     */
    private formatCategoryName;
    /**
     * Validate metadata
     *
     * @param metadata - Metadata to validate
     * @returns Validation result
     */
    private validateMetadata;
}
