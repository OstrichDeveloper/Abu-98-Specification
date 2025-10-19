/**
 * Topic Builder
 * 
 * Converts parsed content into help system topics
 */

import type {
  ParsedContent,
  TopicBuilderOptions,
  HelpTopic,
  HelpCategory
} from './types.js';

export class TopicBuilder {
  private options: TopicBuilderOptions;

  constructor(options: Partial<TopicBuilderOptions> = {}) {
    this.options = {
      defaultCategory: 'general',
      defaultDifficulty: 'intermediate',
      autoOrder: true,
      idStrategy: 'path',
      ...options
    };
  }

  /**
   * Build help topics from parsed content
   */
  buildTopics(parsedContents: ParsedContent[]): { topics: HelpTopic[]; categories: HelpCategory[] } {
    const topics: HelpTopic[] = [];
    const categoryMap = new Map<string, HelpTopic[]>();

    // Sort content by category and order
    const sortedContent = this.sortContent(parsedContents);

    for (const content of sortedContent) {
      const topic = this.buildTopic(content);
      topics.push(topic);

      // Group by category
      const category = topic.category;
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(topic);
    }

    // Build categories
    const categories = this.buildCategories(categoryMap);

    return { topics, categories };
  }

  /**
   * Build a single help topic from parsed content
   */
  private buildTopic(content: ParsedContent): HelpTopic {
    const id = this.generateTopicId(content);
    const category = content.metadata.category || this.options.defaultCategory;
    const difficulty = content.metadata.difficulty || this.options.defaultDifficulty;

    return {
      id,
      title: content.metadata.title,
      content: content.html,
      category,
      tags: content.metadata.tags || [],
      difficulty,
      order: content.metadata.order || 0,
      lastModified: new Date(),
      metadata: {
        author: content.metadata.author,
        version: content.metadata.version,
        description: content.metadata.description,
        wordCount: content.searchableText.split(/\s+/).length,
        hasCodeBlocks: content.codeBlocks.length > 0,
        hasImages: content.images.length > 0,
        hasLinks: content.internalLinks.length > 0 || content.externalLinks.length > 0,
        toc: content.toc,
        internalLinks: content.internalLinks,
        externalLinks: content.externalLinks,
        images: content.images,
        codeBlocks: content.codeBlocks
      }
    };
  }

  /**
   * Generate topic ID based on strategy
   */
  private generateTopicId(content: ParsedContent): string {
    switch (this.options.idStrategy) {
      case 'path':
        return this.generateIdFromPath(content.path);
      case 'title':
        return this.generateIdFromTitle(content.metadata.title);
      case 'custom':
        return this.generateCustomId(content);
      default:
        return this.generateIdFromPath(content.path);
    }
  }

  /**
   * Generate ID from file path
   */
  public generateIdFromPath(path: string): string {
    return path
      .replace(/\.(md|mdx)$/, '')
      .replace(/\//g, '-')
      .replace(/[^a-zA-Z0-9-]/g, '')
      .toLowerCase();
  }

  /**
   * Generate ID from title
   */
  private generateIdFromTitle(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  /**
   * Generate custom ID
   */
  private generateCustomId(content: ParsedContent): string {
    // Use a combination of category and title
    const category = content.metadata.category || this.options.defaultCategory;
    const title = content.metadata.title;
    
    return `${category}-${this.generateIdFromTitle(title)}`;
  }

  /**
   * Sort content by category and order
   */
  private sortContent(contents: ParsedContent[]): ParsedContent[] {
    return contents.sort((a, b) => {
      // First sort by category
      const categoryA = a.metadata.category || this.options.defaultCategory;
      const categoryB = b.metadata.category || this.options.defaultCategory;
      
      if (categoryA !== categoryB) {
        return categoryA.localeCompare(categoryB);
      }

      // Then sort by order within category
      const orderA = a.metadata.order || 0;
      const orderB = b.metadata.order || 0;
      
      if (orderA !== orderB) {
        return orderA - orderB;
      }

      // Finally sort by title
      const titleA = a.metadata.title || '';
      const titleB = b.metadata.title || '';
      return titleA.localeCompare(titleB);
    });
  }

  /**
   * Build help categories from topic groups
   */
  private buildCategories(categoryMap: Map<string, HelpTopic[]>): HelpCategory[] {
    const categories: HelpCategory[] = [];

    for (const [categoryName, topics] of categoryMap) {
      const category: HelpCategory = {
        id: this.generateCategoryId(categoryName),
        name: this.formatCategoryName(categoryName),
        description: this.generateCategoryDescription(categoryName, topics),
        topics: topics.map(topic => topic.id),
        order: this.getCategoryOrder(categoryName),
        icon: this.getCategoryIcon(categoryName),
        color: this.getCategoryColor(categoryName),
        metadata: {
          topicCount: topics.length,
          totalWordCount: topics.reduce((sum, topic) => sum + (topic.metadata?.wordCount || 0), 0),
          difficultyDistribution: this.getDifficultyDistribution(topics),
          lastUpdated: this.getLastUpdated(topics),
          tags: this.getCategoryTags(topics)
        }
      };

      categories.push(category);
    }

    // Sort categories by order
    return categories.sort((a, b) => a.order - b.order);
  }

  /**
   * Generate category ID
   */
  private generateCategoryId(categoryName: string): string {
    return categoryName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
  }

  /**
   * Format category name for display
   */
  private formatCategoryName(categoryName: string): string {
    return categoryName
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Generate category description
   */
  private generateCategoryDescription(categoryName: string, topics: HelpTopic[]): string {
    const topicCount = topics.length;
    const difficultyLevels = this.getDifficultyDistribution(topics);
    
    let description = `This category contains ${topicCount} topic${topicCount !== 1 ? 's' : ''}`;
    
    if (difficultyLevels.length > 0) {
      const primaryDifficulty = difficultyLevels[0].difficulty;
      description += `, primarily at the ${primaryDifficulty} level`;
    }
    
    description += '.';
    
    return description;
  }

  /**
   * Get category order
   */
  private getCategoryOrder(categoryName: string): number {
    const categoryOrder: Record<string, number> = {
      'getting-started': 1,
      'specifications': 2,
      'design': 3,
      'abu-web-kernel': 4,
      'abu-enterprise': 5,
      'abu-service': 6,
      'api': 7,
      'guides': 8,
      'general': 999
    };

    return categoryOrder[categoryName] || 100;
  }

  /**
   * Get category icon
   */
  private getCategoryIcon(categoryName: string): string {
    const categoryIcons: Record<string, string> = {
      'getting-started': 'icon-play',
      'specifications': 'icon-document',
      'design': 'icon-palette',
      'abu-web-kernel': 'icon-cog',
      'abu-enterprise': 'icon-building',
      'abu-service': 'icon-server',
      'api': 'icon-code',
      'guides': 'icon-book',
      'general': 'icon-folder'
    };

    return categoryIcons[categoryName] || 'icon-folder';
  }

  /**
   * Get category color
   */
  private getCategoryColor(categoryName: string): string {
    const categoryColors: Record<string, string> = {
      'getting-started': '#4CAF50',
      'specifications': '#2196F3',
      'design': '#9C27B0',
      'abu-web-kernel': '#FF9800',
      'abu-enterprise': '#607D8B',
      'abu-service': '#795548',
      'api': '#E91E63',
      'guides': '#3F51B5',
      'general': '#9E9E9E'
    };

    return categoryColors[categoryName] || '#9E9E9E';
  }

  /**
   * Get difficulty distribution for topics
   */
  private getDifficultyDistribution(topics: HelpTopic[]): Array<{ difficulty: string; count: number }> {
    const distribution = new Map<string, number>();
    
    for (const topic of topics) {
      const difficulty = topic.difficulty;
      distribution.set(difficulty, (distribution.get(difficulty) || 0) + 1);
    }

    return Array.from(distribution.entries())
      .map(([difficulty, count]) => ({ difficulty, count }))
      .sort((a, b) => b.count - a.count);
  }

  /**
   * Get last updated timestamp for category
   */
  private getLastUpdated(topics: HelpTopic[]): Date {
    let lastUpdated = new Date(0);
    
    for (const topic of topics) {
      if (topic.lastModified > lastUpdated) {
        lastUpdated = topic.lastModified;
      }
    }
    
    return lastUpdated;
  }

  /**
   * Get all tags used in category topics
   */
  private getCategoryTags(topics: HelpTopic[]): string[] {
    const tagSet = new Set<string>();
    
    for (const topic of topics) {
      for (const tag of topic.tags) {
        tagSet.add(tag);
      }
    }
    
    return Array.from(tagSet).sort();
  }

  /**
   * Build topic relationships
   */
  buildTopicRelationships(topics: HelpTopic[]): Map<string, string[]> {
    const relationships = new Map<string, string[]>();

    for (const topic of topics) {
      const relatedTopics: string[] = [];

      // Find topics with similar tags
      for (const otherTopic of topics) {
        if (otherTopic.id === topic.id) continue;

        const commonTags = topic.tags.filter(tag => otherTopic.tags.includes(tag));
        if (commonTags.length > 0) {
          relatedTopics.push(otherTopic.id);
        }
      }

      // Find topics in the same category
      const sameCategoryTopics = topics.filter(t => 
        t.id !== topic.id && t.category === topic.category
      );
      relatedTopics.push(...sameCategoryTopics.map(t => t.id));

      // Remove duplicates and limit to top 5
      const uniqueRelated = [...new Set(relatedTopics)].slice(0, 5);
      relationships.set(topic.id, uniqueRelated);
    }

    return relationships;
  }

  /**
   * Build topic index for search
   */
  buildTopicIndex(topics: HelpTopic[]): Map<string, string[]> {
    const index = new Map<string, string[]>();

    for (const topic of topics) {
      // Index by title words
      const titleWords = topic.title.toLowerCase().split(/\s+/);
      for (const word of titleWords) {
        if (word.length > 2) { // Skip short words
          if (!index.has(word)) {
            index.set(word, []);
          }
          index.get(word)!.push(topic.id);
        }
      }

      // Index by tags
      for (const tag of topic.tags) {
        const tagKey = tag.toLowerCase();
        if (!index.has(tagKey)) {
          index.set(tagKey, []);
        }
        index.get(tagKey)!.push(topic.id);
      }

      // Index by category
      const categoryKey = topic.category.toLowerCase();
      if (!index.has(categoryKey)) {
        index.set(categoryKey, []);
      }
      index.get(categoryKey)!.push(topic.id);
    }

    return index;
  }
}
