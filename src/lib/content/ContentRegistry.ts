/**
 * Content Registry
 * 
 * Central registry for managing all help system content
 */

import type {
  ContentFile,
  ParsedContent,
  ContentRegistry as IContentRegistry,
  ContentStats,
  SearchIndex,
  HelpTopic,
  HelpCategory
} from './types.js';
import { ContentLoader } from './ContentLoader.js';
import { MarkdownParser } from './MarkdownParser.js';
import { TopicBuilder } from './TopicBuilder.js';

export class ContentRegistry implements IContentRegistry {
  public files: Map<string, ContentFile> = new Map();
  public categories: Map<string, ContentFile[]> = new Map();
  public tags: Map<string, ContentFile[]> = new Map();
  public searchIndex: SearchIndex = {
    terms: new Map(),
    documents: new Map(),
    frequencies: new Map()
  };
  public stats: ContentStats = {
    totalFiles: 0,
    totalCategories: 0,
    totalTags: 0,
    totalSize: 0,
    averageFileSize: 0,
    commonTags: [],
    categoryDistribution: []
  };

  private loader: ContentLoader;
  private parser: MarkdownParser;
  private builder: TopicBuilder;
  private topics: Map<string, HelpTopic> = new Map();
  private helpCategories: Map<string, HelpCategory> = new Map();
  private isInitialized = false;

  constructor() {
    this.loader = new ContentLoader();
    this.parser = new MarkdownParser();
    this.builder = new TopicBuilder();
  }

  /**
   * Initialize the content registry
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Load all content files
      const loadResult = await this.loader.loadAllContent();
      
      if (loadResult.errors.length > 0) {
        console.warn('Some content files failed to load:', loadResult.errors);
      }

      // Process each successfully loaded file
      for (const contentFile of loadResult.success) {
        await this.registerContentFile(contentFile);
      }

      // Build help system topics and categories
      await this.buildHelpSystemContent();

      // Update statistics
      this.updateStats();

      this.isInitialized = true;
      console.log(`Content registry initialized with ${this.files.size} files`);
    } catch (error) {
      console.error('Failed to initialize content registry:', error);
      throw error;
    }
  }

  /**
   * Register a content file
   */
  async registerContentFile(contentFile: ContentFile): Promise<void> {
    // Store the raw content file
    this.files.set(contentFile.path, contentFile);

    // Organize by category
    const category = contentFile.metadata.category;
    if (!this.categories.has(category)) {
      this.categories.set(category, []);
    }
    this.categories.get(category)!.push(contentFile);

    // Organize by tags
    for (const tag of contentFile.metadata.tags) {
      if (!this.tags.has(tag)) {
        this.tags.set(tag, []);
      }
      this.tags.get(tag)!.push(contentFile);
    }

    // Update search index
    this.updateSearchIndex(contentFile);
  }

  /**
   * Build help system topics and categories
   */
  private async buildHelpSystemContent(): Promise<void> {
    // Parse all content files
    const parsedContents: ParsedContent[] = [];
    
    for (const contentFile of this.files.values()) {
      try {
        const parsed = this.parser.parse(contentFile.content, contentFile.path);
        parsedContents.push(parsed);
      } catch (error) {
        console.error(`Failed to parse content file ${contentFile.path}:`, error);
      }
    }

    // Build topics and categories
    const { topics, categories } = this.builder.buildTopics(parsedContents);

    // Store topics and categories
    for (const topic of topics) {
      this.topics.set(topic.id, topic);
    }

    for (const category of categories) {
      this.helpCategories.set(category.id, category);
    }

    console.log(`Built ${topics.length} help topics and ${categories.length} categories`);
  }

  /**
   * Update search index for a content file
   */
  private updateSearchIndex(contentFile: ContentFile): void {
    const documentId = contentFile.path;
    const terms = this.extractTerms(contentFile);

    // Store document terms
    this.searchIndex.documents.set(documentId, new Set(terms));

    // Update term frequencies
    const termFreq = new Map<string, number>();
    for (const term of terms) {
      termFreq.set(term, (termFreq.get(term) || 0) + 1);
    }
    this.searchIndex.frequencies.set(documentId, termFreq);

    // Update term to document mapping
    for (const term of terms) {
      if (!this.searchIndex.terms.has(term)) {
        this.searchIndex.terms.set(term, new Set());
      }
      this.searchIndex.terms.get(term)!.add(documentId);
    }
  }

  /**
   * Extract searchable terms from content file
   */
  private extractTerms(contentFile: ContentFile): string[] {
    const terms: string[] = [];
    
    // Extract from title
    terms.push(...this.tokenize(contentFile.metadata.title));
    
    // Extract from content
    terms.push(...this.tokenize(contentFile.content));
    
    // Extract from tags
    for (const tag of contentFile.metadata.tags) {
      terms.push(...this.tokenize(tag));
    }
    
    // Extract from category
    terms.push(...this.tokenize(contentFile.metadata.category));

    return terms;
  }

  /**
   * Tokenize text into searchable terms
   */
  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter(term => term.length > 2)
      .filter(term => !this.isStopWord(term));
  }

  /**
   * Check if a term is a stop word
   */
  private isStopWord(term: string): boolean {
    const stopWords = new Set([
      'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with',
      'by', 'from', 'up', 'about', 'into', 'through', 'during', 'before',
      'after', 'above', 'below', 'between', 'among', 'this', 'that', 'these',
      'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'me', 'him',
      'her', 'us', 'them', 'my', 'your', 'his', 'her', 'its', 'our', 'their',
      'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have',
      'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should',
      'may', 'might', 'must', 'can', 'shall'
    ]);
    
    return stopWords.has(term);
  }

  /**
   * Update registry statistics
   */
  private updateStats(): void {
    this.stats.totalFiles = this.files.size;
    this.stats.totalCategories = this.categories.size;
    this.stats.totalTags = this.tags.size;
    
    // Calculate total size
    let totalSize = 0;
    for (const file of this.files.values()) {
      totalSize += file.content.length;
    }
    this.stats.totalSize = totalSize;
    this.stats.averageFileSize = this.files.size > 0 ? totalSize / this.files.size : 0;

    // Calculate common tags
    const tagCounts = new Map<string, number>();
    for (const [tag, files] of this.tags.entries()) {
      tagCounts.set(tag, files.length);
    }
    this.stats.commonTags = Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Calculate category distribution
    this.stats.categoryDistribution = Array.from(this.categories.entries())
      .map(([category, files]) => ({ category, count: files.length }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get all help topics
   */
  getTopics(): HelpTopic[] {
    return Array.from(this.topics.values());
  }

  /**
   * Get help topic by ID
   */
  getTopic(id: string): HelpTopic | undefined {
    return this.topics.get(id);
  }

  /**
   * Get topics by category
   */
  getTopicsByCategory(categoryId: string): HelpTopic[] {
    const category = this.helpCategories.get(categoryId);
    if (!category) {
      return [];
    }

    return category.topics
      .map(topicId => this.topics.get(topicId))
      .filter((topic): topic is HelpTopic => topic !== undefined);
  }

  /**
   * Get all help categories
   */
  getCategories(): HelpCategory[] {
    return Array.from(this.helpCategories.values());
  }

  /**
   * Get help category by ID
   */
  getCategory(id: string): HelpCategory | undefined {
    return this.helpCategories.get(id);
  }

  /**
   * Search content
   */
  search(query: string, options: { limit?: number; category?: string } = {}): HelpTopic[] {
    const { limit = 10, category } = options;
    const queryTerms = this.tokenize(query);
    const scores = new Map<string, number>();

    // Calculate relevance scores
    for (const term of queryTerms) {
      const documents = this.searchIndex.terms.get(term);
      if (documents) {
        for (const docId of documents) {
          const topic = this.findTopicByPath(docId);
          if (topic && (!category || topic.category === category)) {
            const freq = this.searchIndex.frequencies.get(docId)?.get(term) || 0;
            const currentScore = scores.get(topic.id) || 0;
            scores.set(topic.id, currentScore + freq);
          }
        }
      }
    }

    // Sort by score and return top results
    return Array.from(scores.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, limit)
      .map(([topicId]) => this.topics.get(topicId))
      .filter((topic): topic is HelpTopic => topic !== undefined);
  }

  /**
   * Find topic by file path
   */
  private findTopicByPath(path: string): HelpTopic | undefined {
    for (const topic of this.topics.values()) {
      if (topic.id === this.builder['generateIdFromPath'](path)) {
        return topic;
      }
    }
    return undefined;
  }

  /**
   * Get content file by path
   */
  getContentFile(path: string): ContentFile | undefined {
    return this.files.get(path);
  }

  /**
   * Get content files by category
   */
  getContentFilesByCategory(category: string): ContentFile[] {
    return this.categories.get(category) || [];
  }

  /**
   * Get content files by tag
   */
  getContentFilesByTag(tag: string): ContentFile[] {
    return this.tags.get(tag) || [];
  }

  /**
   * Refresh content registry
   */
  async refresh(): Promise<void> {
    this.clear();
    await this.initialize();
  }

  /**
   * Clear all content
   */
  clear(): void {
    this.files.clear();
    this.categories.clear();
    this.tags.clear();
    this.topics.clear();
    this.helpCategories.clear();
    this.searchIndex.terms.clear();
    this.searchIndex.documents.clear();
    this.searchIndex.frequencies.clear();
    this.isInitialized = false;
  }

  /**
   * Get registry status
   */
  getStatus(): {
    isInitialized: boolean;
    fileCount: number;
    topicCount: number;
    categoryCount: number;
    lastUpdated: Date;
  } {
    return {
      isInitialized: this.isInitialized,
      fileCount: this.files.size,
      topicCount: this.topics.size,
      categoryCount: this.helpCategories.size,
      lastUpdated: new Date()
    };
  }
}
