/**
 * Windows 98 F1 Help System - Bookmark Manager
 *
 * This class manages help system bookmarks including adding, removing,
 * organizing, and persisting bookmarks to localStorage.
 *
 * @fileoverview Bookmark management for help system topics
 */
import type { HelpBookmark, BookmarkOrganization } from './types.js';
/**
 * Bookmark manager for help system topics
 */
export declare class HelpBookmarkManager {
    private bookmarks;
    private readonly storageKey;
    private readonly maxBookmarks;
    /**
     * Add a bookmark for a topic
     *
     * @param topicId - Topic ID to bookmark
     * @param title - Optional bookmark title
     * @returns Promise that resolves with the created bookmark
     * @throws Error if bookmark creation fails
     */
    addBookmark(topicId: string, title?: string): Promise<HelpBookmark>;
    /**
     * Remove a bookmark
     *
     * @param topicId - Topic ID to remove bookmark for
     * @returns Promise that resolves when bookmark is removed
     * @throws Error if bookmark removal fails
     */
    removeBookmark(topicId: string): Promise<void>;
    /**
     * Get all bookmarks
     *
     * @returns Array of all bookmarks
     */
    getBookmarks(): HelpBookmark[];
    /**
     * Get a specific bookmark by topic ID
     *
     * @param topicId - Topic ID to get bookmark for
     * @returns Bookmark or null if not found
     */
    getBookmark(topicId: string): HelpBookmark | null;
    /**
     * Check if a topic is bookmarked
     *
     * @param topicId - Topic ID to check
     * @returns True if topic is bookmarked
     */
    isBookmarked(topicId: string): boolean;
    /**
     * Update a bookmark
     *
     * @param bookmarkId - Bookmark ID to update
     * @param updates - Updates to apply
     * @returns Promise that resolves when bookmark is updated
     * @throws Error if bookmark update fails
     */
    updateBookmark(bookmarkId: string, updates: Partial<HelpBookmark>): Promise<void>;
    /**
     * Organize bookmarks
     *
     * @param organization - Organization configuration
     * @returns Promise that resolves when bookmarks are organized
     * @throws Error if organization fails
     */
    organizeBookmarks(organization: BookmarkOrganization): Promise<void>;
    /**
     * Save bookmarks to localStorage
     *
     * @returns Promise that resolves when bookmarks are saved
     * @throws Error if saving fails
     */
    saveBookmarks(): Promise<void>;
    /**
     * Load bookmarks from localStorage
     *
     * @returns Promise that resolves when bookmarks are loaded
     * @throws Error if loading fails
     */
    loadBookmarks(): Promise<void>;
    /**
     * Export bookmarks to JSON string
     *
     * @returns Promise that resolves with exported bookmarks JSON
     */
    exportBookmarks(): Promise<string>;
    /**
     * Import bookmarks from JSON string
     *
     * @param data - JSON string containing bookmarks
     * @returns Promise that resolves when bookmarks are imported
     * @throws Error if import fails
     */
    importBookmarks(data: string): Promise<void>;
    /**
     * Get bookmarks by category
     *
     * @param category - Category to filter by
     * @returns Array of bookmarks in category
     */
    getBookmarksByCategory(category: string): HelpBookmark[];
    /**
     * Get bookmark categories
     *
     * @returns Array of unique categories
     */
    getCategories(): string[];
    /**
     * Search bookmarks
     *
     * @param query - Search query
     * @returns Array of matching bookmarks
     */
    searchBookmarks(query: string): HelpBookmark[];
    /**
     * Get bookmark statistics
     *
     * @returns Bookmark statistics
     */
    getBookmarkStats(): {
        total: number;
        byCategory: Record<string, number>;
        oldest: Date | null;
        newest: Date | null;
    };
    /**
     * Clear all bookmarks
     *
     * @returns Promise that resolves when bookmarks are cleared
     */
    clearAllBookmarks(): Promise<void>;
    /**
     * Generate unique bookmark ID
     *
     * @returns Unique bookmark ID
     */
    private generateBookmarkId;
    /**
     * Get bookmark by ID
     *
     * @param bookmarkId - Bookmark ID
     * @returns Bookmark or null if not found
     */
    private getBookmarkById;
    /**
     * Sort bookmarks
     *
     * @param sortBy - Sort field
     * @param sortOrder - Sort order
     * @returns Sorted bookmarks array
     */
    private sortBookmarks;
    /**
     * Validate bookmark
     *
     * @param bookmark - Bookmark to validate
     * @returns True if bookmark is valid
     */
    private validateBookmark;
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
}
