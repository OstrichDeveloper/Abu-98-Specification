/**
 * Content Processing Utils Unit Tests
 */

import { describe, it, expect, vi } from 'vitest';
import {
  createContentRegistry,
  processContentFiles,
  buildHelpSystemContent,
  validateContentFile,
  extractMetadataFromMarkdown,
  generateContentStats,
  searchContent,
  formatFileSize,
  formatProcessingTime
} from '../../../src/lib/content/utils.js';
import {
  isContentFile,
  isParsedContent,
  isContentMetadata
} from '../../../src/lib/content/types.js';
import type { ContentFile, ParsedContent, HelpTopic, HelpCategory } from '../../../src/lib/content/types.js';

// Mock the dependencies
vi.mock('../../../src/lib/content/ContentRegistry.js', () => ({
  ContentRegistry: vi.fn().mockImplementation(() => ({
    initialize: vi.fn(),
    search: vi.fn(),
    getTopicsByCategory: vi.fn(),
    getCategories: vi.fn()
  }))
}));

vi.mock('../../../src/lib/content/MarkdownParser.js', () => ({
  MarkdownParser: vi.fn().mockImplementation(() => ({
    parse: vi.fn().mockImplementation((content, path) => ({
      path,
      html: content.replace(/^#\s+(.+)$/m, '<h1>$1</h1>'),
      metadata: { title: 'Test', category: 'test', tags: ['test'], difficulty: 'beginner' },
      toc: [],
      searchableText: content,
      internalLinks: [],
      externalLinks: [],
      images: [],
      codeBlocks: []
    }))
  }))
}));

vi.mock('../../../src/lib/content/TopicBuilder.js', () => ({
  TopicBuilder: vi.fn().mockImplementation(() => ({
    buildTopics: vi.fn().mockImplementation((parsedContents) => ({
      topics: parsedContents.map((content: any) => ({
        id: content.path,
        title: content.metadata.title,
        category: content.metadata.category,
        tags: content.metadata.tags,
        difficulty: content.metadata.difficulty,
        content: content.html,
        order: 0
      })),
      categories: [
        {
          id: 'test',
          name: 'Test',
          topics: []
        }
      ]
    }))
  }))
}));

describe('Content Processing Utils', () => {
  describe('createContentRegistry', () => {
    it('should create a new ContentRegistry instance', () => {
      const registry = createContentRegistry();
      expect(registry).toBeDefined();
    });
  });

  describe('processContentFiles', () => {
    it('should process content files successfully', async () => {
      const files: ContentFile[] = [
        {
          path: 'test1.md',
          content: '# Test 1\n\nContent 1',
          metadata: {
            title: 'Test 1',
            category: 'test',
            tags: ['test'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'test2.md',
          content: '# Test 2\n\nContent 2',
          metadata: {
            title: 'Test 2',
            category: 'test',
            tags: ['test'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        }
      ];

      const result = await processContentFiles(files);

      expect(result.success).toHaveLength(2);
      expect(result.errors).toHaveLength(0);
      expect(result.stats.totalFiles).toBe(2);
      expect(result.stats.successfulFiles).toBe(2);
      expect(result.stats.failedFiles).toBe(0);
      expect(result.stats.processingTime).toBeGreaterThanOrEqual(0);
    });

    it('should handle parsing errors', async () => {
      const files: ContentFile[] = [
        {
          path: 'test1.md',
          content: '# Test 1\n\nContent 1',
          metadata: {
            title: 'Test 1',
            category: 'test',
            tags: ['test'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      // Mock parser to throw error
      const { MarkdownParser } = await import('../../../src/lib/content/MarkdownParser.js');
      (MarkdownParser as any).mockImplementation(() => ({
        parse: vi.fn().mockImplementation(() => {
          throw new Error('Parse error');
        })
      }));

      const result = await processContentFiles(files);

      expect(result.success).toHaveLength(0);
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].type).toBe('parse');
      expect(result.errors[0].message).toContain('Parse error');
      expect(result.stats.failedFiles).toBe(1);
    });
  });

  describe('buildHelpSystemContent', () => {
    it('should build help system content from parsed content', () => {
      const parsedContents: ParsedContent[] = [
        {
          path: 'test1.md',
          html: '<h1>Test 1</h1>',
          metadata: {
            title: 'Test 1',
            category: 'test',
            tags: ['test'],
            difficulty: 'beginner'
          },
          toc: [],
          searchableText: 'Test 1 content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        }
      ];

      const result = buildHelpSystemContent(parsedContents);

      expect(result).toBeDefined();
      expect(result.topics).toBeDefined();
      expect(result.categories).toBeDefined();
    });
  });

  describe('validateContentFile', () => {
    it('should validate valid content file', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should reject content file with missing path', () => {
      const contentFile: ContentFile = {
        path: '',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File path is required');
    });

    it('should handle edge case with empty content', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File content is required');
    });

    it('should reject content file with missing content', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File content is required');
    });

    it('should reject content file with missing metadata', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: null as any,
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File metadata is required');
    });

    it('should reject content file with missing title', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: '',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File metadata must include a title');
    });

    it('should reject content file with missing category', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: '',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File metadata must include a category');
    });

    it('should reject content file with invalid tags', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: null as any,
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File metadata must include tags array');
    });

    it('should reject content file with invalid difficulty', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'invalid' as any
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File metadata must include valid difficulty level');
    });

    it('should reject content file with invalid lastModified', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Valid content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: null as any
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File must include valid lastModified date');
    });

    it('should reject oversized content file', () => {
      const largeContent = 'x'.repeat(1024 * 1024 + 1);
      const contentFile: ContentFile = {
        path: 'test.md',
        content: largeContent,
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const result = validateContentFile(contentFile);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('File content exceeds maximum size limit');
    });
  });

  describe('extractMetadataFromMarkdown', () => {
    it('should extract metadata from frontmatter', () => {
      const content = `---
title: Test Document
description: A test document
category: testing
tags: test, example, demo
difficulty: intermediate
author: Test Author
version: 2.0.0
order: 5
---

# Test Document

This is the content.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.title).toBe('Test Document');
      expect(metadata.description).toBe('A test document');
      expect(metadata.category).toBe('testing');
      expect(metadata.tags).toEqual(['test', 'example', 'demo']);
      expect(metadata.difficulty).toBe('intermediate');
      expect(metadata.author).toBe('Test Author');
      expect(metadata.version).toBe('2.0.0');
      expect(metadata.order).toBe(5);
    });

    it('should extract title from first heading if not in frontmatter', () => {
      const content = `# Document Title

This is the content.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.title).toBe('Document Title');
    });

    it('should extract description from first paragraph', () => {
      const content = `# Title

This is the description paragraph.

More content here.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.description).toBe('This is the description paragraph.');
    });

    it('should handle quoted values in frontmatter', () => {
      const content = `---
title: "Quoted Title"
description: 'Single quoted description'
---

# Title

Content.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.title).toBe('Quoted Title');
      expect(metadata.description).toBe('Single quoted description');
    });

    it('should ignore invalid difficulty values', () => {
      const content = `---
difficulty: invalid
---

# Title

Content.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.difficulty).toBeUndefined();
    });

    it('should handle invalid order values', () => {
      const content = `---
order: not-a-number
---

# Title

Content.`;

      const metadata = extractMetadataFromMarkdown(content);

      expect(metadata.order).toBeUndefined();
    });
  });

  describe('generateContentStats', () => {
    it('should generate correct statistics', () => {
      const files: ContentFile[] = [
        {
          path: 'test1.md',
          content: 'Content 1',
          metadata: {
            title: 'Test 1',
            category: 'test',
            tags: ['test', 'example'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'test2.md',
          content: 'Content 2',
          metadata: {
            title: 'Test 2',
            category: 'test',
            tags: ['test', 'demo'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'test3.md',
          content: 'Content 3',
          metadata: {
            title: 'Test 3',
            category: 'other',
            tags: ['other'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      const stats = generateContentStats(files);

      expect(stats.totalFiles).toBe(3);
      expect(stats.totalSize).toBe(27); // Sum of content lengths
      expect(stats.averageFileSize).toBe(9); // 27 / 3
      expect(stats.categoryDistribution).toHaveLength(2);
      expect(stats.categoryDistribution[0].category).toBe('test');
      expect(stats.categoryDistribution[0].count).toBe(2);
      expect(stats.categoryDistribution[1].category).toBe('other');
      expect(stats.categoryDistribution[1].count).toBe(1);
      expect(stats.tagDistribution).toHaveLength(4);
      expect(stats.tagDistribution[0].tag).toBe('test');
      expect(stats.tagDistribution[0].count).toBe(2);
      expect(stats.difficultyDistribution).toHaveLength(3);
      expect(stats.difficultyDistribution[0].difficulty).toBe('beginner');
      expect(stats.difficultyDistribution[0].count).toBe(1);
    });
  });

  describe('searchContent', () => {
    const files: ContentFile[] = [
      {
        path: 'test1.md',
        content: 'This is a test document about JavaScript programming.',
        metadata: {
          title: 'JavaScript Guide',
          category: 'programming',
          tags: ['javascript', 'programming'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      },
      {
        path: 'test2.md',
        content: 'This is about API development and REST services.',
        metadata: {
          title: 'API Development',
          category: 'programming',
          tags: ['api', 'rest'],
          difficulty: 'intermediate'
        },
        lastModified: new Date()
      },
      {
        path: 'test3.md',
        content: 'This is about design principles and UI/UX.',
        metadata: {
          title: 'Design Principles',
          category: 'design',
          tags: ['design', 'ui', 'ux'],
          difficulty: 'advanced'
        },
        lastModified: new Date()
      }
    ];

    it('should search content by query', () => {
      const results = searchContent(files, 'javascript');

      expect(results).toHaveLength(1);
      expect(results[0].path).toBe('test1.md');
    });

    it('should filter by category', () => {
      const results = searchContent(files, 'programming', { category: 'programming' });

      expect(results.length).toBeGreaterThan(0);
      expect(results.every(r => r.metadata.category === 'programming')).toBe(true);
    });

    it('should filter by tags', () => {
      const results = searchContent(files, 'api', { tags: ['api'] });

      expect(results).toHaveLength(1);
      expect(results[0].path).toBe('test2.md');
    });

    it('should limit results', () => {
      const results = searchContent(files, 'this', { limit: 2 });

      expect(results.length).toBeLessThanOrEqual(2);
    });

    it('should return empty array for no matches', () => {
      const results = searchContent(files, 'nonexistent');

      expect(results).toHaveLength(0);
    });

    it('should prioritize title matches', () => {
      const results = searchContent(files, 'javascript');

      expect(results[0].metadata.title).toBe('JavaScript Guide');
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0.0 B');
      expect(formatFileSize(500)).toBe('500.0 B');
      expect(formatFileSize(1024)).toBe('1.0 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1.0 MB');
      expect(formatFileSize(1024 * 1024 * 1.5)).toBe('1.5 MB');
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1.0 GB');
    });
  });

  describe('formatProcessingTime', () => {
    it('should format processing time correctly', () => {
      expect(formatProcessingTime(500)).toBe('500ms');
      expect(formatProcessingTime(1500)).toBe('1.5s');
      expect(formatProcessingTime(60000)).toBe('1.0m');
      expect(formatProcessingTime(90000)).toBe('1.5m');
    });
  });

  describe('type guards', () => {
    it('should validate ContentFile objects', () => {
      const validContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const invalidContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: null,
        lastModified: new Date()
      };

      expect(isContentFile(validContentFile)).toBe(true);
      expect(isContentFile(invalidContentFile)).toBeFalsy();
      expect(isContentFile(null)).toBeFalsy();
    });

    it('should validate ParsedContent objects', () => {
      const validParsedContent = {
        path: 'test.md',
        html: '<h1>Test</h1>',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        toc: [],
        searchableText: 'Test content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const invalidParsedContent = {
        path: 'test.md',
        html: '<h1>Test</h1>',
        metadata: null,
        toc: [],
        searchableText: 'Test content'
      };

      expect(isParsedContent(validParsedContent)).toBe(true);
      expect(isParsedContent(invalidParsedContent)).toBeFalsy();
      expect(isParsedContent(null)).toBeFalsy();
    });

    it('should validate ContentMetadata objects', () => {
      const validMetadata = {
        title: 'Test',
        category: 'test',
        tags: ['test'],
        difficulty: 'beginner'
      };

      const invalidMetadata = {
        title: 'Test',
        category: 'test',
        tags: ['test'],
        difficulty: 'invalid'
      };

      expect(isContentMetadata(validMetadata)).toBe(true);
      expect(isContentMetadata(invalidMetadata)).toBe(false);
      expect(isContentMetadata(null)).toBeFalsy();
    });
  });
});
