/**
 * ContentRegistry Unit Tests
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ContentRegistry } from '../../../src/lib/content/ContentRegistry.js';
import { ContentLoader } from '../../../src/lib/content/ContentLoader.js';
import { MarkdownParser } from '../../../src/lib/content/MarkdownParser.js';
import { TopicBuilder } from '../../../src/lib/content/TopicBuilder.js';
import type { ContentFile, HelpTopic, HelpCategory } from '../../../src/lib/content/types.js';

// Mock the dependencies
vi.mock('../../../src/lib/content/ContentLoader.js');
vi.mock('../../../src/lib/content/MarkdownParser.js');
vi.mock('../../../src/lib/content/TopicBuilder.js');

describe('ContentRegistry', () => {
  let registry: ContentRegistry;
  let mockLoader: any;
  let mockParser: any;
  let mockBuilder: any;

  beforeEach(() => {
    // Reset mocks
    vi.clearAllMocks();

    // Create mock instances
    mockLoader = {
      loadAllContent: vi.fn(),
      loadFile: vi.fn(),
      clearCache: vi.fn(),
      getCacheStats: vi.fn()
    };

    mockParser = {
      parse: vi.fn()
    };

    mockBuilder = {
      buildTopics: vi.fn(),
      buildTopicRelationships: vi.fn(),
      buildTopicIndex: vi.fn()
    };

    // Mock the constructors
    (ContentLoader as any).mockImplementation(() => mockLoader);
    (MarkdownParser as any).mockImplementation(() => mockParser);
    (TopicBuilder as any).mockImplementation(() => mockBuilder);

    registry = new ContentRegistry();
  });

  afterEach(() => {
    registry.clear();
  });

  describe('constructor', () => {
    it('should initialize with default state', () => {
      expect(registry.files).toBeInstanceOf(Map);
      expect(registry.categories).toBeInstanceOf(Map);
      expect(registry.tags).toBeInstanceOf(Map);
      expect(registry.searchIndex).toBeDefined();
      expect(registry.stats).toBeDefined();
      expect(registry.topics).toBeInstanceOf(Map);
      expect(registry.helpCategories).toBeInstanceOf(Map);
    });

    it('should create dependency instances', () => {
      expect(ContentLoader).toHaveBeenCalled();
      expect(MarkdownParser).toHaveBeenCalled();
      expect(TopicBuilder).toHaveBeenCalled();
    });
  });

  describe('initialize', () => {
    it('should initialize successfully with content', async () => {
      const mockContentFiles: ContentFile[] = [
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

      const mockParsedContents = [
        {
          path: 'test1.md',
          html: '<h1>Test 1</h1><p>Content 1</p>',
          metadata: { title: 'Test 1', category: 'test', tags: ['test'], difficulty: 'beginner' },
          toc: [],
          searchableText: 'Test 1 Content 1',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        },
        {
          path: 'test2.md',
          html: '<h1>Test 2</h1><p>Content 2</p>',
          metadata: { title: 'Test 2', category: 'test', tags: ['test'], difficulty: 'intermediate' },
          toc: [],
          searchableText: 'Test 2 Content 2',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        }
      ];

      const mockTopics: HelpTopic[] = [
        {
          id: 'test-1',
          title: 'Test 1',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner',
          order: 1,
          lastModified: new Date(),
          content: '<h1>Test 1</h1><p>Content 1</p>',
          metadata: {}
        },
        {
          id: 'test-2',
          title: 'Test 2',
          category: 'test',
          tags: ['test'],
          difficulty: 'intermediate',
          order: 2,
          lastModified: new Date(),
          content: '<h1>Test 2</h1><p>Content 2</p>',
          metadata: {}
        }
      ];

      const mockCategories: HelpCategory[] = [
        {
          id: 'test',
          name: 'Test',
          description: 'Test category',
          topics: ['test-1', 'test-2'],
          order: 1,
          icon: 'icon-folder',
          color: '#9E9E9E',
          metadata: {
            topicCount: 2,
            totalWordCount: 0,
            difficultyDistribution: [],
            lastUpdated: new Date(),
            tags: ['test']
          }
        }
      ];

      mockLoader.loadAllContent.mockResolvedValue({
        success: mockContentFiles,
        errors: [],
        stats: { totalFiles: 2, successfulFiles: 2, failedFiles: 0, processingTime: 100 }
      });

      mockParser.parse
        .mockReturnValueOnce(mockParsedContents[0])
        .mockReturnValueOnce(mockParsedContents[1]);

      mockBuilder.buildTopics.mockReturnValue({
        topics: mockTopics,
        categories: mockCategories
      });

      await registry.initialize();

      expect(registry.files.size).toBe(2);
      expect(registry.topics.size).toBe(2);
      expect(registry.helpCategories.size).toBe(1);
      expect(registry.stats.totalFiles).toBe(2);
      expect(registry.stats.totalCategories).toBe(1);
    });

    it('should handle initialization errors gracefully', async () => {
      mockLoader.loadAllContent.mockRejectedValue(new Error('Load error'));

      await expect(registry.initialize()).rejects.toThrow('Load error');
    });

    it('should not initialize twice', async () => {
      mockLoader.loadAllContent.mockResolvedValue({
        success: [],
        errors: [],
        stats: { totalFiles: 0, successfulFiles: 0, failedFiles: 0, processingTime: 0 }
      });

      mockBuilder.buildTopics.mockReturnValue({
        topics: [],
        categories: []
      });

      await registry.initialize();
      await registry.initialize();

      expect(mockLoader.loadAllContent).toHaveBeenCalledTimes(1);
    });
  });

  describe('registerContentFile', () => {
    it('should register a content file successfully', async () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '# Test\n\nContent',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test', 'example'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      await registry.registerContentFile(contentFile);

      expect(registry.files.has('test.md')).toBe(true);
      expect(registry.categories.get('test')).toContain(contentFile);
      expect(registry.tags.get('test')).toContain(contentFile);
      expect(registry.tags.get('example')).toContain(contentFile);
    });

    it('should update search index when registering content', async () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '# Test Document\n\nThis is test content.',
        metadata: {
          title: 'Test Document',
          category: 'test',
          tags: ['test', 'document'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      await registry.registerContentFile(contentFile);

      expect(registry.searchIndex.documents.has('test.md')).toBe(true);
      expect(registry.searchIndex.frequencies.has('test.md')).toBe(true);
    });
  });

  describe('getTopics', () => {
    beforeEach(async () => {
      const mockTopics: HelpTopic[] = [
        {
          id: 'topic-1',
          title: 'Topic 1',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner',
          order: 1,
          lastModified: new Date(),
          content: 'Content 1',
          metadata: {}
        },
        {
          id: 'topic-2',
          title: 'Topic 2',
          category: 'test',
          tags: ['test'],
          difficulty: 'intermediate',
          order: 2,
          lastModified: new Date(),
          content: 'Content 2',
          metadata: {}
        }
      ];

      registry.topics.set('topic-1', mockTopics[0]);
      registry.topics.set('topic-2', mockTopics[1]);
    });

    it('should return all topics', () => {
      const topics = registry.getTopics();

      expect(topics).toHaveLength(2);
      expect(topics.map(t => t.id)).toEqual(['topic-1', 'topic-2']);
    });
  });

  describe('getTopic', () => {
    beforeEach(async () => {
      const mockTopic: HelpTopic = {
        id: 'topic-1',
        title: 'Topic 1',
        category: 'test',
        tags: ['test'],
        difficulty: 'beginner',
        order: 1,
        lastModified: new Date(),
        content: 'Content 1',
        metadata: {}
      };

      registry.topics.set('topic-1', mockTopic);
    });

    it('should return topic by ID', () => {
      const topic = registry.getTopic('topic-1');

      expect(topic).toBeDefined();
      expect(topic!.id).toBe('topic-1');
      expect(topic!.title).toBe('Topic 1');
    });

    it('should return undefined for non-existent topic', () => {
      const topic = registry.getTopic('non-existent');

      expect(topic).toBeUndefined();
    });
  });

  describe('getTopicsByCategory', () => {
    beforeEach(async () => {
      const mockCategory: HelpCategory = {
        id: 'test',
        name: 'Test',
        description: 'Test category',
        topics: ['topic-1', 'topic-2'],
        order: 1,
        icon: 'icon-folder',
        color: '#9E9E9E',
        metadata: {
          topicCount: 2,
          totalWordCount: 0,
          difficultyDistribution: [],
          lastUpdated: new Date(),
          tags: ['test']
        }
      };

      const mockTopics: HelpTopic[] = [
        {
          id: 'topic-1',
          title: 'Topic 1',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner',
          order: 1,
          lastModified: new Date(),
          content: 'Content 1',
          metadata: {}
        },
        {
          id: 'topic-2',
          title: 'Topic 2',
          category: 'test',
          tags: ['test'],
          difficulty: 'intermediate',
          order: 2,
          lastModified: new Date(),
          content: 'Content 2',
          metadata: {}
        }
      ];

      registry.helpCategories.set('test', mockCategory);
      registry.topics.set('topic-1', mockTopics[0]);
      registry.topics.set('topic-2', mockTopics[1]);
    });

    it('should return topics by category', () => {
      const topics = registry.getTopicsByCategory('test');

      expect(topics).toHaveLength(2);
      expect(topics.map(t => t.id)).toEqual(['topic-1', 'topic-2']);
    });

    it('should return empty array for non-existent category', () => {
      const topics = registry.getTopicsByCategory('non-existent');

      expect(topics).toHaveLength(0);
    });
  });

  describe('getCategories', () => {
    beforeEach(async () => {
      const mockCategory: HelpCategory = {
        id: 'test',
        name: 'Test',
        description: 'Test category',
        topics: ['topic-1'],
        order: 1,
        icon: 'icon-folder',
        color: '#9E9E9E',
        metadata: {
          topicCount: 1,
          totalWordCount: 0,
          difficultyDistribution: [],
          lastUpdated: new Date(),
          tags: ['test']
        }
      };

      registry.helpCategories.set('test', mockCategory);
    });

    it('should return all categories', () => {
      const categories = registry.getCategories();

      expect(categories).toHaveLength(1);
      expect(categories[0].id).toBe('test');
    });
  });

  describe('getCategory', () => {
    beforeEach(async () => {
      const mockCategory: HelpCategory = {
        id: 'test',
        name: 'Test',
        description: 'Test category',
        topics: ['topic-1'],
        order: 1,
        icon: 'icon-folder',
        color: '#9E9E9E',
        metadata: {
          topicCount: 1,
          totalWordCount: 0,
          difficultyDistribution: [],
          lastUpdated: new Date(),
          tags: ['test']
        }
      };

      registry.helpCategories.set('test', mockCategory);
    });

    it('should return category by ID', () => {
      const category = registry.getCategory('test');

      expect(category).toBeDefined();
      expect(category!.id).toBe('test');
      expect(category!.name).toBe('Test');
    });

    it('should return undefined for non-existent category', () => {
      const category = registry.getCategory('non-existent');

      expect(category).toBeUndefined();
    });
  });

  describe('search', () => {
    beforeEach(async () => {
      // Set up search index
      registry.searchIndex.terms.set('test', new Set(['test.md']));
      registry.searchIndex.terms.set('document', new Set(['test.md']));
      registry.searchIndex.documents.set('test.md', new Set(['test', 'document']));
      registry.searchIndex.frequencies.set('test.md', new Map([
        ['test', 2],
        ['document', 1]
      ]));

      // Set up topic
      const mockTopic: HelpTopic = {
        id: 'test-document',
        title: 'Test Document',
        category: 'test',
        tags: ['test'],
        difficulty: 'beginner',
        order: 1,
        lastModified: new Date(),
        content: 'Test document content',
        metadata: {}
      };

      registry.topics.set('test-document', mockTopic);

      // Mock the findTopicByPath method
      (registry as any).findTopicByPath = vi.fn().mockReturnValue(mockTopic);
    });

    it('should search topics by query', () => {
      const results = registry.search('test document');

      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('test-document');
    });

    it('should filter by category', () => {
      const results = registry.search('test', { category: 'test' });

      expect(results).toHaveLength(1);
      expect(results[0].category).toBe('test');
    });

    it('should limit results', () => {
      const results = registry.search('test', { limit: 1 });

      expect(results.length).toBeLessThanOrEqual(1);
    });

    it('should return empty array for no matches', () => {
      const results = registry.search('nonexistent');

      expect(results).toHaveLength(0);
    });
  });

  describe('getContentFile', () => {
    beforeEach(async () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '# Test\n\nContent',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      registry.files.set('test.md', contentFile);
    });

    it('should return content file by path', () => {
      const file = registry.getContentFile('test.md');

      expect(file).toBeDefined();
      expect(file!.path).toBe('test.md');
    });

    it('should return undefined for non-existent file', () => {
      const file = registry.getContentFile('non-existent.md');

      expect(file).toBeUndefined();
    });
  });

  describe('getContentFilesByCategory', () => {
    beforeEach(async () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '# Test\n\nContent',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      registry.categories.set('test', [contentFile]);
    });

    it('should return content files by category', () => {
      const files = registry.getContentFilesByCategory('test');

      expect(files).toHaveLength(1);
      expect(files[0].path).toBe('test.md');
    });

    it('should return empty array for non-existent category', () => {
      const files = registry.getContentFilesByCategory('non-existent');

      expect(files).toHaveLength(0);
    });
  });

  describe('getContentFilesByTag', () => {
    beforeEach(async () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: '# Test\n\nContent',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test', 'example'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      registry.tags.set('test', [contentFile]);
    });

    it('should return content files by tag', () => {
      const files = registry.getContentFilesByTag('test');

      expect(files).toHaveLength(1);
      expect(files[0].path).toBe('test.md');
    });

    it('should return empty array for non-existent tag', () => {
      const files = registry.getContentFilesByTag('non-existent');

      expect(files).toHaveLength(0);
    });
  });

  describe('refresh', () => {
    it('should clear and reinitialize registry', async () => {
      // Set up some initial data
      registry.files.set('test.md', {} as ContentFile);
      registry.topics.set('topic-1', {} as HelpTopic);

      mockLoader.loadAllContent.mockResolvedValue({
        success: [],
        errors: [],
        stats: { totalFiles: 0, successfulFiles: 0, failedFiles: 0, processingTime: 0 }
      });

      mockBuilder.buildTopics.mockReturnValue({
        topics: [],
        categories: []
      });

      await registry.refresh();

      expect(registry.files.size).toBe(0);
      expect(registry.topics.size).toBe(0);
      expect(mockLoader.loadAllContent).toHaveBeenCalled();
    });
  });

  describe('clear', () => {
    it('should clear all data', () => {
      // Set up some data
      registry.files.set('test.md', {} as ContentFile);
      registry.topics.set('topic-1', {} as HelpTopic);
      registry.helpCategories.set('test', {} as HelpCategory);

      registry.clear();

      expect(registry.files.size).toBe(0);
      expect(registry.topics.size).toBe(0);
      expect(registry.helpCategories.size).toBe(0);
      expect(registry.searchIndex.terms.size).toBe(0);
      expect(registry.searchIndex.documents.size).toBe(0);
      expect(registry.searchIndex.frequencies.size).toBe(0);
    });
  });

  describe('getStatus', () => {
    it('should return registry status', () => {
      registry.files.set('test.md', {} as ContentFile);
      registry.topics.set('topic-1', {} as HelpTopic);
      registry.helpCategories.set('test', {} as HelpCategory);

      const status = registry.getStatus();

      expect(status.isInitialized).toBe(false);
      expect(status.fileCount).toBe(1);
      expect(status.topicCount).toBe(1);
      expect(status.categoryCount).toBe(1);
      expect(status.lastUpdated).toBeInstanceOf(Date);
    });
  });

  describe('updateStats', () => {
    it('should update statistics correctly', () => {
      // Set up data
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'Test content',
        metadata: {
          title: 'Test',
          category: 'test',
          tags: ['test', 'example'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      registry.files.set('test.md', contentFile);
      registry.categories.set('test', [contentFile]);
      registry.tags.set('test', [contentFile]);
      registry.tags.set('example', [contentFile]);

      (registry as any).updateStats();

      expect(registry.stats.totalFiles).toBe(1);
      expect(registry.stats.totalCategories).toBe(1);
      expect(registry.stats.totalTags).toBe(2);
      expect(registry.stats.totalSize).toBe(12); // "Test content" length
      expect(registry.stats.averageFileSize).toBe(12);
      expect(registry.stats.commonTags).toHaveLength(2);
      expect(registry.stats.categoryDistribution).toHaveLength(1);
    });
  });

  describe('extractTerms', () => {
    it('should extract terms from content file', () => {
      const contentFile: ContentFile = {
        path: 'test.md',
        content: 'This is test content with JavaScript and API examples.',
        metadata: {
          title: 'Test Document',
          category: 'programming',
          tags: ['javascript', 'api'],
          difficulty: 'beginner'
        },
        lastModified: new Date()
      };

      const terms = (registry as any).extractTerms(contentFile);

      expect(terms).toContain('test');
      expect(terms).toContain('document');
      expect(terms).toContain('javascript');
      expect(terms).toContain('api');
      expect(terms).toContain('programming');
    });
  });

  describe('tokenize', () => {
    it('should tokenize text correctly', () => {
      const text = 'This is a test document with JavaScript and API examples.';
      const tokens = (registry as any).tokenize(text);

      expect(tokens).not.toContain('this'); // 'this' is a stop word
      expect(tokens).toContain('test');
      expect(tokens).toContain('document');
      expect(tokens).toContain('javascript');
      expect(tokens).toContain('api');
      expect(tokens).toContain('examples');
      expect(tokens).not.toContain('is'); // stop word
      expect(tokens).not.toContain('a'); // stop word
      expect(tokens).not.toContain('with'); // stop word
    });

    it('should filter out short words', () => {
      const text = 'A B C test document';
      const tokens = (registry as any).tokenize(text);

      expect(tokens).not.toContain('a');
      expect(tokens).not.toContain('b');
      expect(tokens).not.toContain('c');
      expect(tokens).toContain('test');
      expect(tokens).toContain('document');
    });
  });

  describe('isStopWord', () => {
    it('should identify stop words correctly', () => {
      expect((registry as any).isStopWord('the')).toBe(true);
      expect((registry as any).isStopWord('and')).toBe(true);
      expect((registry as any).isStopWord('test')).toBe(false);
      expect((registry as any).isStopWord('document')).toBe(false);
    });
  });
});
