/**
 * ContentLoader Unit Tests
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContentLoader } from '../../../src/lib/content/ContentLoader.js';
import type { ContentFile, ContentMetadata } from '../../../src/lib/content/types.js';

// Mock fetch for browser environment
global.fetch = vi.fn();

describe('ContentLoader', () => {
  let loader: ContentLoader;

  beforeEach(() => {
    loader = new ContentLoader({
      baseDir: 'docs',
      include: ['**/*.md'],
      exclude: ['**/node_modules/**'],
      maxFileSize: 1024 * 1024,
      cacheTtl: 5000,
      validateContent: true
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    loader.clearCache();
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const defaultLoader = new ContentLoader();
      expect(defaultLoader).toBeInstanceOf(ContentLoader);
    });

    it('should merge provided options with defaults', () => {
      const customLoader = new ContentLoader({
        baseDir: 'custom-docs',
        maxFileSize: 2048
      });
      expect(customLoader).toBeInstanceOf(ContentLoader);
    });
  });

  describe('loadAllContent', () => {
    it('should load all content files successfully', async () => {
      // Mock successful fetch responses
      (global.fetch as any).mockImplementation((url: string) => {
        if (url.includes('intro.md')) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve('# Introduction\n\nThis is the intro content.')
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      const result = await loader.loadAllContent();

      expect(result.success.length).toBeGreaterThan(0);
      expect(result.stats.totalFiles).toBeGreaterThan(0);
      expect(result.stats.successfulFiles).toBeGreaterThan(0);
      expect(result.stats.processingTime).toBeGreaterThan(0);
    });

    it('should handle fetch errors gracefully', async () => {
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      const result = await loader.loadAllContent();

      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors[0].type).toBe('load');
      expect(result.errors[0].message).toContain('Network error');
    });

    it('should handle HTTP errors', async () => {
      (global.fetch as any).mockImplementation(() => 
        Promise.resolve({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error'
        })
      );

      const result = await loader.loadAllContent();

      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('loadFile', () => {
    it('should load a single file successfully', async () => {
      const mockContent = '# Test Document\n\nThis is test content.';
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockContent)
      });

      const result = await loader.loadFile('test.md');

      expect(result).not.toBeNull();
      expect(result!.path).toBe('test.md');
      expect(result!.content).toBe(mockContent);
      expect(result!.metadata.title).toBe('Test Document');
      expect(result!.metadata.category).toBe('general');
      expect(result!.metadata.tags).toContain('general');
      expect(result!.lastModified).toBeInstanceOf(Date);
    });

    it('should return fallback content for failed file loads', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      const result = await loader.loadFile('nonexistent.md');

      expect(result).not.toBeNull();
      expect(result!.path).toBe('nonexistent.md');
      expect(result!.content).toContain('placeholder');
    });

    it('should use cached file if still valid', async () => {
      const mockContent = '# Cached Document\n\nThis is cached content.';
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockContent)
      });

      // Load file first time
      const firstResult = await loader.loadFile('cached.md');
      expect(firstResult).not.toBeNull();

      // Load file second time (should use cache)
      const secondResult = await loader.loadFile('cached.md');
      expect(secondResult).not.toBeNull();
      expect(secondResult).toBe(firstResult);

      // Fetch should only be called once
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should validate content when validation is enabled', async () => {
      const mockContent = '# Test Document\n\nThis is test content.';
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockContent)
      });

      const result = await loader.loadFile('test.md');

      expect(result).not.toBeNull();
      expect(result!.metadata.title).toBe('Test Document');
      expect(result!.metadata.category).toBe('general');
    });
  });

  describe('extractMetadata', () => {
    it('should extract metadata from markdown content', () => {
      const content = `---
title: Test Document
description: A test document
category: testing
tags: [test, example]
difficulty: beginner
author: Test Author
version: 1.0.0
order: 1
---

# Test Document

This is the content.`;

      const metadata = (loader as any).extractMetadata(content, 'test.md');

      expect(metadata.title).toBe('Test Document');
      expect(metadata.description).toBe('A test document');
      expect(metadata.category).toBe('testing');
      expect(metadata.tags).toEqual(['test', 'example', 'testing']);
      expect(metadata.difficulty).toBe('beginner');
      expect(metadata.author).toBe('Test Author');
      expect(metadata.version).toBe('1.0.0');
      expect(metadata.order).toBe(1);
    });

    it('should extract title from first heading if not in frontmatter', () => {
      const content = '# Document Title\n\nThis is the content.';

      const metadata = (loader as any).extractMetadata(content, 'test.md');

      expect(metadata.title).toBe('Document Title');
    });

    it('should extract description from content', () => {
      const content = '# Document Title\n\nThis is the description paragraph.\n\nMore content here.';

      const metadata = (loader as any).extractMetadata(content, 'test.md');

      expect(metadata.description).toBe('This is the description paragraph.');
    });

    it('should generate category from file path', () => {
      const content = '# Document Title\n\nContent.';

      const metadata = (loader as any).extractMetadata(content, 'specifications/test.md');

      expect(metadata.category).toBe('specifications');
    });

    it('should extract tags from content', () => {
      const content = '# Document Title\n\nThis has #tag1 and #tag2 in it.';

      const metadata = (loader as any).extractMetadata(content, 'test.md');

      expect(metadata.tags).toContain('tag1');
      expect(metadata.tags).toContain('tag2');
      expect(metadata.tags).toContain('general'); // category as tag
    });

    it('should determine difficulty from content', () => {
      const beginnerContent = '# Getting Started\n\nThis is a beginner guide.';
      const advancedContent = '# Advanced Topics\n\nThis is complex advanced content.';

      const beginnerMetadata = (loader as any).extractMetadata(beginnerContent, 'test.md');
      const advancedMetadata = (loader as any).extractMetadata(advancedContent, 'test.md');

      expect(beginnerMetadata.difficulty).toBe('beginner');
      expect(advancedMetadata.difficulty).toBe('advanced');
    });
  });

  describe('parseFrontmatter', () => {
    it('should parse YAML frontmatter correctly', () => {
      const frontmatter = `title: Test Document
description: A test document
category: testing
tags: test, example, demo
difficulty: intermediate
author: Test Author
version: 2.0.0
order: 5`;

      const metadata = (loader as any).parseFrontmatter(frontmatter);

      expect(metadata.title).toBe('Test Document');
      expect(metadata.description).toBe('A test document');
      expect(metadata.category).toBe('testing');
      expect(metadata.tags).toEqual(['test', 'example', 'demo']);
      expect(metadata.difficulty).toBe('intermediate');
      expect(metadata.author).toBe('Test Author');
      expect(metadata.version).toBe('2.0.0');
      expect(metadata.order).toBe(5);
    });

    it('should handle quoted values', () => {
      const frontmatter = `title: "Quoted Title"
description: 'Single quoted description'`;

      const metadata = (loader as any).parseFrontmatter(frontmatter);

      expect(metadata.title).toBe('Quoted Title');
      expect(metadata.description).toBe('Single quoted description');
    });

    it('should ignore invalid difficulty values', () => {
      const frontmatter = `difficulty: invalid`;

      const metadata = (loader as any).parseFrontmatter(frontmatter);

      expect(metadata.difficulty).toBeUndefined();
    });

    it('should handle invalid order values', () => {
      const frontmatter = `order: not-a-number`;

      const metadata = (loader as any).parseFrontmatter(frontmatter);

      expect(metadata.order).toBeUndefined();
    });
  });

  describe('validateContent', () => {
    it('should validate content successfully', () => {
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

      expect(() => (loader as any).validateContent(contentFile)).not.toThrow();
    });

    it('should throw error for oversized content', () => {
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

      expect(() => (loader as any).validateContent(contentFile)).toThrow('File size exceeds maximum');
    });

    it('should throw error for missing title', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Content',
        metadata: {
          title: '',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      expect(() => (loader as any).validateContent(contentFile)).toThrow('Content must have a title');
    });

    it('should throw error for missing category', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Content',
        metadata: {
          title: 'Test Title',
          category: '',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      expect(() => (loader as any).validateContent(contentFile)).toThrow('Content must have a category');
    });
  });

  describe('cache management', () => {
    it('should cache files correctly', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      (loader as any).cacheFile('test.md', contentFile);
      const cached = (loader as any).getCachedFile('test.md');

      expect(cached).toBe(contentFile);
    });

    it('should return null for expired cache', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      (loader as any).cacheFile('test.md', contentFile);
      
      // Mock expired timestamp
      const timestamps = (loader as any).cacheTimestamps;
      timestamps.set('test.md', Date.now() - 10000); // 10 seconds ago

      const cached = (loader as any).getCachedFile('test.md');
      expect(cached).toBeNull();
    });

    it('should clear cache', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      (loader as any).cacheFile('test.md', contentFile);
      loader.clearCache();

      const cached = (loader as any).getCachedFile('test.md');
      expect(cached).toBeNull();
    });

    it('should provide cache statistics', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test Title',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      (loader as any).cacheFile('test.md', contentFile);
      const stats = loader.getCacheStats();

      expect(stats.size).toBe(1);
      expect(stats.entries).toContain('test.md');
    });
  });

  describe('utility methods', () => {
    it('should generate title from path', () => {
      const title1 = (loader as any).getTitleFromPath('getting-started.md');
      const title2 = (loader as any).getTitleFromPath('specifications/api-reference.md');

      expect(title1).toBe('Getting Started');
      expect(title2).toBe('Api Reference');
    });

    it('should get category from path', () => {
      const category1 = (loader as any).getCategoryFromPath('specifications/test.md');
      const category2 = (loader as any).getCategoryFromPath('test.md');

      expect(category1).toBe('specifications');
      expect(category2).toBe('general');
    });

    it('should extract tags from content', () => {
      const content = 'This has #tag1 and #tag2 in it.';
      const tags = (loader as any).extractTags(content);

      expect(tags).toContain('tag1');
      expect(tags).toContain('tag2');
    });

    it('should extract difficulty from content', () => {
      const beginnerContent = 'This is a beginner guide with basic concepts.';
      const advancedContent = 'This is complex advanced content for experts.';
      const intermediateContent = 'This is intermediate content.';

      expect((loader as any).extractDifficulty(beginnerContent)).toBe('beginner');
      expect((loader as any).extractDifficulty(advancedContent)).toBe('advanced');
      expect((loader as any).extractDifficulty(intermediateContent)).toBe('intermediate');
    });

    it('should extract order from content', () => {
      const content = 'order: 5\n\nContent here.';
      const order = (loader as any).extractOrder(content);

      expect(order).toBe(5);
    });

    it('should extract description from content', () => {
      const content = '# Title\n\nThis is the description paragraph.\n\nMore content.';
      const description = (loader as any).extractDescription(content);

      expect(description).toBe('This is the description paragraph.');
    });
  });
});
