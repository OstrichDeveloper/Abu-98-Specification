/**
 * Windows 98 F1 Help System - History Manager
 *
 * This class manages help system navigation history including tracking
 * visited topics, back/forward navigation, and history persistence.
 *
 * @fileoverview Navigation history management for help system
 */
import type { HistoryStats } from './types.js';
/**
 * History manager for help system navigation
 */
export declare class HelpHistoryManager {
    private history;
    private currentIndex;
    private readonly storageKey;
    private readonly maxHistorySize;
    private visitCounts;
    private visitTimestamps;
    /**
     * Navigate to a topic
     *
     * @param topicId - Topic ID to navigate to
     */
    navigateTo(topicId: string): void;
    /**
     * Go back in history
     *
     * @returns Previous topic ID or null if no history
     */
    goBack(): string | null;
    /**
     * Go forward in history
     *
     * @returns Next topic ID or null if no forward history
     */
    goForward(): string | null;
    /**
     * Get navigation history
     *
     * @returns Array of topic IDs in history
     */
    getHistory(): string[];
    /**
     * Get current history index
     *
     * @returns Current index in history
     */
    getCurrentIndex(): number;
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
     * Clear navigation history
     */
    clearHistory(): void;
    /**
     * Remove topic from history
     *
     * @param topicId - Topic ID to remove
     */
    removeFromHistory(topicId: string): void;
    /**
     * Get history entry by index
     *
     * @param index - History index
     * @returns Topic ID or null if index is invalid
     */
    getHistoryEntry(index: number): string | null;
    /**
     * Save history to localStorage
     */
    saveHistory(): void;
    /**
     * Load history from localStorage
     */
    loadHistory(): void;
    /**
     * Get most visited topics
     *
     * @returns Array of topic IDs sorted by visit count
     */
    getMostVisited(): string[];
    /**
     * Get recent topics
     *
     * @param count - Number of recent topics to return
     * @returns Array of recent topic IDs
     */
    getRecentTopics(count?: number): string[];
    /**
     * Get history statistics
     *
     * @returns History statistics
     */
    getHistoryStats(): HistoryStats;
    /**
     * Get visit count for a topic
     *
     * @param topicId - Topic ID
     * @returns Visit count
     */
    getVisitCount(topicId: string): number;
    /**
     * Get visit timestamps for a topic
     *
     * @param topicId - Topic ID
     * @returns Array of visit timestamps
     */
    getVisitTimestamps(topicId: string): Date[];
    /**
     * Get topics visited today
     *
     * @returns Array of topic IDs visited today
     */
    getTopicsVisitedToday(): string[];
    /**
     * Get topics visited this week
     *
     * @returns Array of topic IDs visited this week
     */
    getTopicsVisitedThisWeek(): string[];
    /**
     * Clear old history entries
     *
     * @param daysOld - Number of days old to consider for removal
     */
    clearOldHistory(daysOld?: number): void;
    /**
     * Update visit statistics for a topic
     *
     * @param topicId - Topic ID
     */
    private updateVisitStats;
    /**
     * Remove topic from statistics
     *
     * @param topicId - Topic ID
     */
    private removeTopicFromStats;
    /**
     * Get current topic
     *
     * @returns Current topic ID or null if no current topic
     */
    getCurrentTopic(): string | null;
    /**
     * Get history length
     *
     * @returns Number of entries in history
     */
    getHistoryLength(): number;
    /**
     * Check if history is empty
     *
     * @returns True if history is empty
     */
    isHistoryEmpty(): boolean;
}
