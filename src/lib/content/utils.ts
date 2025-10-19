/**
 * Content Processing Utilities
 * 
 * Utility functions for content processing operations
 */

import { ContentRegistry } from './ContentRegistry.js';
import { ContentLoader } from './ContentLoader.js';
import { MarkdownParser } from './MarkdownParser.js';
import { TopicBuilder } from './TopicBuilder.js';
import type {
  ContentFile,
  ParsedContent,
  ContentProcessingResult,
  HelpTopic,
  HelpCategory
} from './types.js';

/**
 * Create a new content registry instance
 */
export function createContentRegistry(): ContentRegistry {
  return new ContentRegistry();
}

/**
 * Process content files and return parsed results
 */
export async function processContentFiles(
  files: ContentFile[],
  options: {
    parser?: Partial<MarkdownParserOptions>;
    builder?: Partial<TopicBuilderOptions>;
  } = {}
): Promise<ContentProcessingResult> {
  const parser = new MarkdownParser(options.parser);
  const builder = new TopicBuilder(options.builder);
  
  const result: ContentProcessingResult = {
    success: [],
    errors: [],
    stats: {
      totalFiles: files.length,
      successfulFiles: 0,
      failedFiles: 0,
      processingTime: 0
    }
  };

  const startTime = Date.now();

  for (const file of files) {
    try {
      const parsed = parser.parse(file.content, file.path);
      result.success.push(parsed);
      result.stats.successfulFiles++;
    } catch (error) {
      result.errors.push({
        type: 'parse',
        message: `Failed to parse file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        filePath: file.path,
        timestamp: new Date()
      });
      result.stats.failedFiles++;
    }
  }

  result.stats.processingTime = Date.now() - startTime;
  return result;
}

/**
 * Build help system content from parsed content
 */
export function buildHelpSystemContent(
  parsedContents: ParsedContent[],
  options: Partial<TopicBuilderOptions> = {}
): { topics: HelpTopic[]; categories: HelpCategory[] } {
  const builder = new TopicBuilder(options);
  return builder.buildTopics(parsedContents);
}

/**
 * Validate content file
 */
export function validateContentFile(file: ContentFile): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  if (!file.path) {
    errors.push('File path is required');
  }

  if (!file.content) {
    errors.push('File content is required');
  }

  if (!file.metadata) {
    errors.push('File metadata is required');
  } else {
    if (!file.metadata.title) {
      errors.push('File metadata must include a title');
    }

    if (!file.metadata.category) {
      errors.push('File metadata must include a category');
    }

    if (!Array.isArray(file.metadata.tags)) {
      errors.push('File metadata must include tags array');
    }

    if (!['beginner', 'intermediate', 'advanced'].includes(file.metadata.difficulty)) {
      errors.push('File metadata must include valid difficulty level');
    }
  }

  if (!(file.lastModified instanceof Date)) {
    errors.push('File must include valid lastModified date');
  }

  // Check content size
  if (file.content.length > 1024 * 1024) { // 1MB limit
    errors.push('File content exceeds maximum size limit');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Extract metadata from markdown content
 */
export function extractMetadataFromMarkdown(content: string): Partial<ContentMetadata> {
  const metadata: Partial<ContentMetadata> = {};
  const lines = content.split('\n');

  // Check for frontmatter
  if (lines[0] === '---') {
    const frontmatterEnd = lines.findIndex((line, index) => index > 0 && line === '---');
    if (frontmatterEnd > 0) {
      const frontmatter = lines.slice(1, frontmatterEnd).join('\n');
      const frontmatterData = parseYamlFrontmatter(frontmatter);
      Object.assign(metadata, frontmatterData);
    }
  }

  // Extract title from first heading if not in frontmatter
  if (!metadata.title) {
    const titleMatch = content.match(/^#\s+(.+)$/m);
    if (titleMatch) {
      metadata.title = titleMatch[1].trim();
    }
  }

  // Extract description from first paragraph
  if (!metadata.description) {
    const descriptionMatch = content.match(/^#\s+.+\n\n(.+?)(?:\n\n|\n#)/s);
    if (descriptionMatch) {
      metadata.description = descriptionMatch[1].trim();
    }
  }

  return metadata;
}

/**
 * Parse YAML frontmatter
 */
function parseYamlFrontmatter(frontmatter: string): Partial<ContentMetadata> {
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
 * Generate content statistics
 */
export function generateContentStats(files: ContentFile[]): {
  totalFiles: number;
  totalSize: number;
  averageFileSize: number;
  categoryDistribution: Array<{ category: string; count: number }>;
  tagDistribution: Array<{ tag: string; count: number }>;
  difficultyDistribution: Array<{ difficulty: string; count: number }>;
} {
  const stats = {
    totalFiles: files.length,
    totalSize: 0,
    averageFileSize: 0,
    categoryDistribution: [] as Array<{ category: string; count: number }>,
    tagDistribution: [] as Array<{ tag: string; count: number }>,
    difficultyDistribution: [] as Array<{ difficulty: string; count: number }>
  };

  const categoryCounts = new Map<string, number>();
  const tagCounts = new Map<string, number>();
  const difficultyCounts = new Map<string, number>();

  for (const file of files) {
    // Calculate total size
    stats.totalSize += file.content.length;

    // Count categories
    const category = file.metadata.category;
    categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);

    // Count tags
    for (const tag of file.metadata.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
    }

    // Count difficulties
    const difficulty = file.metadata.difficulty;
    difficultyCounts.set(difficulty, (difficultyCounts.get(difficulty) || 0) + 1);
  }

  // Calculate average file size
  stats.averageFileSize = files.length > 0 ? stats.totalSize / files.length : 0;

  // Convert maps to arrays and sort
  stats.categoryDistribution = Array.from(categoryCounts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);

  stats.tagDistribution = Array.from(tagCounts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 20); // Top 20 tags

  stats.difficultyDistribution = Array.from(difficultyCounts.entries())
    .map(([difficulty, count]) => ({ difficulty, count }))
    .sort((a, b) => b.count - a.count);

  return stats;
}

/**
 * Search content using simple text matching
 */
export function searchContent(
  files: ContentFile[],
  query: string,
  options: {
    limit?: number;
    category?: string;
    tags?: string[];
  } = {}
): ContentFile[] {
  const { limit = 10, category, tags } = options;
  const queryTerms = query.toLowerCase().split(/\s+/).filter(term => term.length > 2);
  const results: Array<{ file: ContentFile; score: number }> = [];

  for (const file of files) {
    // Filter by category if specified
    if (category && file.metadata.category !== category) {
      continue;
    }

    // Filter by tags if specified
    if (tags && tags.length > 0) {
      const hasMatchingTag = tags.some(tag => file.metadata.tags.includes(tag));
      if (!hasMatchingTag) {
        continue;
      }
    }

    // Calculate relevance score
    let score = 0;
    const searchableText = `${file.metadata.title} ${file.metadata.description || ''} ${file.content}`.toLowerCase();

    for (const term of queryTerms) {
      // Title matches get higher weight
      if (file.metadata.title.toLowerCase().includes(term)) {
        score += 3;
      }

      // Description matches get medium weight
      if (file.metadata.description?.toLowerCase().includes(term)) {
        score += 2;
      }

      // Content matches get lower weight
      const contentMatches = (searchableText.match(new RegExp(term, 'g')) || []).length;
      score += contentMatches;

      // Tag matches get medium weight
      if (file.metadata.tags.some(tag => tag.toLowerCase().includes(term))) {
        score += 2;
      }
    }

    if (score > 0) {
      results.push({ file, score });
    }
  }

  // Sort by score and return top results
  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(result => result.file);
}

/**
 * Format file size for display
 */
export function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

/**
 * Format processing time for display
 */
export function formatProcessingTime(milliseconds: number): string {
  if (milliseconds < 1000) {
    return `${milliseconds}ms`;
  } else if (milliseconds < 60000) {
    return `${(milliseconds / 1000).toFixed(1)}s`;
  } else {
    return `${(milliseconds / 60000).toFixed(1)}m`;
  }
}
