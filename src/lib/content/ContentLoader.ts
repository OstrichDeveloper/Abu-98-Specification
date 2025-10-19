/**
 * Content Loader
 * 
 * Handles loading and caching of documentation content files
 */

import type {
  ContentFile,
  ContentMetadata,
  ContentLoaderOptions,
  ContentProcessingError,
  ContentProcessingResult
} from './types.js';

export class ContentLoader {
  private options: ContentLoaderOptions;
  private cache: Map<string, ContentFile> = new Map();
  private cacheTimestamps: Map<string, number> = new Map();

  constructor(options: Partial<ContentLoaderOptions> = {}) {
    this.options = {
      baseDir: 'docs',
      include: ['**/*.md', '**/*.mdx'],
      exclude: ['**/node_modules/**', '**/.git/**'],
      maxFileSize: 1024 * 1024, // 1MB
      cacheTtl: 5 * 60 * 1000, // 5 minutes
      validateContent: true,
      ...options
    };
  }

  /**
   * Load all content files from the base directory
   */
  async loadAllContent(): Promise<ContentProcessingResult> {
    const startTime = Date.now();
    const result: ContentProcessingResult = {
      success: [],
      errors: [],
      stats: {
        totalFiles: 0,
        successfulFiles: 0,
        failedFiles: 0,
        processingTime: 0
      }
    };

    try {
      // In a browser environment, we need to use a different approach
      // since we can't directly access the file system
      const contentFiles = await this.loadContentFromBuild();
      
      result.stats.totalFiles = contentFiles.length;

      for (const filePath of contentFiles) {
        try {
          const content = await this.loadFile(filePath);
          if (content) {
            result.success.push(content);
            result.stats.successfulFiles++;
          }
        } catch (error) {
          result.errors.push({
            type: 'load',
            message: `Failed to load file: ${error instanceof Error ? error.message : 'Unknown error'}`,
            filePath,
            timestamp: new Date()
          });
          result.stats.failedFiles++;
        }
      }

      result.stats.processingTime = Date.now() - startTime;
      return result;
    } catch (error) {
      result.errors.push({
        type: 'load',
        message: `Failed to load content: ${error instanceof Error ? error.message : 'Unknown error'}`,
        filePath: this.options.baseDir,
        timestamp: new Date()
      });
      result.stats.processingTime = Date.now() - startTime;
      return result;
    }
  }

  /**
   * Load a single content file
   */
  async loadFile(filePath: string): Promise<ContentFile | null> {
    // Check cache first
    const cached = this.getCachedFile(filePath);
    if (cached) {
      return cached;
    }

    try {
      // In a browser environment, load from the built documentation
      const content = await this.loadFileContent(filePath);
      const metadata = this.extractMetadata(content, filePath);
      
      const contentFile: ContentFile = {
        path: filePath,
        content,
        metadata,
        lastModified: new Date()
      };

      // Validate content if enabled
      if (this.options.validateContent) {
        this.validateContent(contentFile);
      }

      // Cache the file
      this.cacheFile(filePath, contentFile);
      
      return contentFile;
    } catch (error) {
      console.error(`Failed to load file ${filePath}:`, error);
      return null;
    }
  }

  /**
   * Load content from the built documentation (browser environment)
   */
  private async loadContentFromBuild(): Promise<string[]> {
    // This would typically fetch from a content manifest or API
    // For now, we'll return a list of known documentation files
    return [
      'intro.md',
      'specifications/help-system.md',
      'specifications/help-system-functional.md',
      'specifications/help-system-technical.md',
      'design/help-system-visual.md',
      'design/accessibility.md',
      'design/color-system.md',
      'design/component-design.md',
      'design/typography.md',
      'abu-web-kernel/getting-started.md',
      'abu-web-kernel/guides/quick-start.md',
      'abu-web-kernel/guides/plugin-development.md',
      'abu-web-kernel/guides/theming.md',
      'abu-web-kernel/guides/testing-guide.md',
      'abu-enterprise/getting-started.md',
      'abu-enterprise/development/testing.md',
      'abu-enterprise/deployment/production.md',
      'abu-service/getting-started.md',
      'abu-service/development/local-development.md',
      'abu-service/api/endpoints.md'
    ];
  }

  /**
   * Load file content from the built documentation
   */
  private async loadFileContent(filePath: string): Promise<string> {
    try {
      // In a browser environment, we need to fetch from the built docs
      const response = await fetch(`/docs/${filePath}`);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return await response.text();
    } catch (error) {
      // Fallback: try to load from a content API or static files
      console.warn(`Could not load ${filePath} from built docs, using fallback`);
      return this.getFallbackContent(filePath);
    }
  }

  /**
   * Get fallback content for files that can't be loaded
   */
  private getFallbackContent(filePath: string): string {
    // Return basic markdown content as fallback
    const title = this.getTitleFromPath(filePath);
    return `# ${title}

This is a placeholder for the ${filePath} documentation.

## Overview

This document is part of the Abu OS 98 documentation system.

## Content

The full content for this document will be loaded when the documentation system is fully deployed.

---

*This is a fallback content. The actual documentation will be available in the production build.*`;
  }

  /**
   * Extract title from file path
   */
  private getTitleFromPath(filePath: string): string {
    const parts = filePath.split('/');
    const fileName = parts[parts.length - 1];
    const nameWithoutExt = fileName.replace(/\.(md|mdx)$/, '');
    return nameWithoutExt
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Extract metadata from markdown content
   */
  private extractMetadata(content: string, filePath: string): ContentMetadata {
    const lines = content.split('\n');
    const metadata: ContentMetadata = {
      title: this.getTitleFromPath(filePath),
      category: this.getCategoryFromPath(filePath),
      tags: this.extractTags(content),
      difficulty: this.extractDifficulty(content),
      order: this.extractOrder(content)
    };

    // Extract frontmatter if present
    if (lines[0] === '---') {
      const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
      if (frontmatterEnd > 0) {
        const frontmatter = lines.slice(1, frontmatterEnd).join('\n');
        const frontmatterData = this.parseFrontmatter(frontmatter);
        Object.assign(metadata, frontmatterData);
      }
    }

    // Extract title from first heading if not in frontmatter
    if (!metadata.title || metadata.title === this.getTitleFromPath(filePath)) {
      const titleMatch = content.match(/^#\s+(.+)$/m);
      if (titleMatch) {
        metadata.title = titleMatch[1].trim();
      }
    }

    // Extract description from content
    metadata.description = this.extractDescription(content);

    return metadata;
  }

  /**
   * Parse YAML frontmatter
   */
  private parseFrontmatter(frontmatter: string): Partial<ContentMetadata> {
    const metadata: Partial<ContentMetadata> = {};
    const lines = frontmatter.split('\n');

    for (const line of lines) {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        const [, key, value] = match;
        const cleanValue = value.replace(/^["']|["']$/g, ''); // Remove quotes

        switch (key) {
          case 'title':
            metadata.title = cleanValue;
            break;
          case 'description':
            metadata.description = cleanValue;
            break;
          case 'category':
            metadata.category = cleanValue;
            break;
          case 'tags':
            // Handle both YAML array format [tag1, tag2] and comma-separated format tag1, tag2
            if (cleanValue.startsWith('[') && cleanValue.endsWith(']')) {
              // YAML array format: [tag1, tag2]
              const arrayContent = cleanValue.slice(1, -1);
              metadata.tags = arrayContent.split(',').map(tag => tag.trim());
            } else {
              // Comma-separated format: tag1, tag2
              metadata.tags = cleanValue.split(',').map(tag => tag.trim());
            }
            break;
          case 'difficulty':
            if (['beginner', 'intermediate', 'advanced'].includes(cleanValue)) {
              metadata.difficulty = cleanValue as 'beginner' | 'intermediate' | 'advanced';
            }
            break;
          case 'author':
            metadata.author = cleanValue;
            break;
          case 'version':
            metadata.version = cleanValue;
            break;
          case 'order':
            const order = parseInt(cleanValue, 10);
            if (!isNaN(order)) {
              metadata.order = order;
            }
            break;
        }
      }
    }

    return metadata;
  }

  /**
   * Get category from file path
   */
  private getCategoryFromPath(filePath: string): string {
    const parts = filePath.split('/');
    if (parts.length > 1) {
      return parts[0];
    }
    return 'general';
  }

  /**
   * Extract tags from content
   */
  private extractTags(content: string): string[] {
    const tags: string[] = [];
    
    // Look for tag patterns in content
    const tagMatches = content.match(/#(\w+)/g);
    if (tagMatches) {
      tags.push(...tagMatches.map(tag => tag.substring(1)));
    }

    // Add category as a tag
    const category = this.getCategoryFromPath(content);
    if (category && !tags.includes(category)) {
      tags.push(category);
    }

    return [...new Set(tags)]; // Remove duplicates
  }

  /**
   * Extract difficulty level from content
   */
  private extractDifficulty(content: string): 'beginner' | 'intermediate' | 'advanced' {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('beginner') || lowerContent.includes('basic') || lowerContent.includes('getting started')) {
      return 'beginner';
    }
    
    if (lowerContent.includes('advanced') || lowerContent.includes('expert') || lowerContent.includes('complex')) {
      return 'advanced';
    }
    
    return 'intermediate';
  }

  /**
   * Extract order from content
   */
  private extractOrder(content: string): number {
    const orderMatch = content.match(/order:\s*(\d+)/i);
    if (orderMatch) {
      return parseInt(orderMatch[1], 10);
    }
    return 0;
  }

  /**
   * Extract description from content
   */
  private extractDescription(content: string): string {
    // Look for description in frontmatter first
    const frontmatterMatch = content.match(/description:\s*["']?([^"'\n]+)["']?/i);
    if (frontmatterMatch) {
      return frontmatterMatch[1].trim();
    }

    // Look for first paragraph after title
    const lines = content.split('\n');
    let foundTitle = false;
    
    for (const line of lines) {
      if (line.startsWith('# ')) {
        foundTitle = true;
        continue;
      }
      
      if (foundTitle && line.trim() && !line.startsWith('#')) {
        return line.trim();
      }
    }

    return '';
  }

  /**
   * Validate content file
   */
  private validateContent(contentFile: ContentFile): void {
    if (contentFile.content.length > this.options.maxFileSize) {
      throw new Error(`File size exceeds maximum allowed size of ${this.options.maxFileSize} bytes`);
    }

    if (!contentFile.metadata.title) {
      throw new Error('Content must have a title');
    }

    if (!contentFile.metadata.category) {
      throw new Error('Content must have a category');
    }
  }

  /**
   * Get cached file if still valid
   */
  private getCachedFile(filePath: string): ContentFile | null {
    const timestamp = this.cacheTimestamps.get(filePath);
    if (!timestamp || Date.now() - timestamp > this.options.cacheTtl) {
      this.cache.delete(filePath);
      this.cacheTimestamps.delete(filePath);
      return null;
    }

    return this.cache.get(filePath) || null;
  }

  /**
   * Cache a file
   */
  private cacheFile(filePath: string, contentFile: ContentFile): void {
    this.cache.set(filePath, contentFile);
    this.cacheTimestamps.set(filePath, Date.now());
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
    this.cacheTimestamps.clear();
  }

  /**
   * Get cache statistics
   */
  getCacheStats(): { size: number; entries: string[] } {
    return {
      size: this.cache.size,
      entries: Array.from(this.cache.keys())
    };
  }
}
