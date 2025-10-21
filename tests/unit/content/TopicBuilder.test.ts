/**
 * TopicBuilder Unit Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TopicBuilder } from '../../../src/lib/content/TopicBuilder.js';
import type { ParsedContent, HelpTopic, HelpCategory } from '../../../src/lib/content/types.js';

describe('TopicBuilder', () => {
  let builder: TopicBuilder;

  beforeEach(() => {
    builder = new TopicBuilder({
      defaultCategory: 'general',
      defaultDifficulty: 'intermediate',
      autoOrder: true,
      idStrategy: 'path'
    });
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const defaultBuilder = new TopicBuilder();
      expect(defaultBuilder).toBeInstanceOf(TopicBuilder);
    });

    it('should merge provided options with defaults', () => {
      const customBuilder = new TopicBuilder({
        defaultCategory: 'custom',
        idStrategy: 'title'
      });
      expect(customBuilder).toBeInstanceOf(TopicBuilder);
    });
  });

  describe('buildTopics', () => {
    it('should build topics and categories from parsed content', () => {
      const parsedContents: ParsedContent[] = [
        {
          path: 'specifications/test.md',
          html: '<h1>Test Document</h1>',
          metadata: {
            title: 'Test Document',
            category: 'specifications',
            tags: ['test', 'spec'],
            difficulty: 'beginner'
          },
          toc: [],
          searchableText: 'Test Document content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        },
        {
          path: 'design/colors.md',
          html: '<h1>Color System</h1>',
          metadata: {
            title: 'Color System',
            category: 'design',
            tags: ['design', 'colors'],
            difficulty: 'intermediate'
          },
          toc: [],
          searchableText: 'Color System content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        }
      ];

      const result = builder.buildTopics(parsedContents);

      expect(result.topics).toHaveLength(2);
      expect(result.categories).toHaveLength(2);

      // Check topics
      const testTopic = result.topics.find(t => t.id === 'specifications-test');
      expect(testTopic).toBeDefined();
      expect(testTopic!.title).toBe('Test Document');
      expect(testTopic!.category).toBe('specifications');
      expect(testTopic!.tags).toEqual(['test', 'spec']);

      const colorTopic = result.topics.find(t => t.id === 'design-colors');
      expect(colorTopic).toBeDefined();
      expect(colorTopic!.title).toBe('Color System');
      expect(colorTopic!.category).toBe('design');

      // Check categories
      const specCategory = result.categories.find(c => c.id === 'specifications');
      expect(specCategory).toBeDefined();
      expect(specCategory!.name).toBe('Specifications');
      expect(specCategory!.topics).toContain('specifications-test');

      const designCategory = result.categories.find(c => c.id === 'design');
      expect(designCategory).toBeDefined();
      expect(designCategory!.name).toBe('Design');
      expect(designCategory!.topics).toContain('design-colors');
    });

    it('should sort content by category and order', () => {
      const parsedContents: ParsedContent[] = [
        {
          path: 'specifications/b.md',
          html: '<h1>B Document</h1>',
          metadata: {
            title: 'B Document',
            category: 'specifications',
            tags: ['test'],
            difficulty: 'beginner',
            order: 2
          },
          toc: [],
          searchableText: 'B Document content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        },
        {
          path: 'design/a.md',
          html: '<h1>A Document</h1>',
          metadata: {
            title: 'A Document',
            category: 'design',
            tags: ['design'],
            difficulty: 'intermediate',
            order: 1
          },
          toc: [],
          searchableText: 'A Document content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        },
        {
          path: 'specifications/a.md',
          html: '<h1>A Document</h1>',
          metadata: {
            title: 'A Document',
            category: 'specifications',
            tags: ['test'],
            difficulty: 'beginner',
            order: 1
          },
          toc: [],
          searchableText: 'A Document content',
          internalLinks: [],
          externalLinks: [],
          images: [],
          codeBlocks: []
        }
      ];

      const result = builder.buildTopics(parsedContents);

      // Should be sorted by category first, then by order within category
      expect(result.topics[0].category).toBe('design'); // design comes before specifications
      expect(result.topics[1].category).toBe('specifications');
      expect(result.topics[2].category).toBe('specifications');
      expect(result.topics[1].order).toBe(1); // A comes before B
      expect(result.topics[2].order).toBe(2);
    });
  });

  describe('buildTopic', () => {
    it('should build a single topic from parsed content', () => {
      const parsedContent: ParsedContent = {
        path: 'specifications/test.md',
        html: '<h1>Test Document</h1><p>Content</p>',
        metadata: {
          title: 'Test Document',
          category: 'specifications',
          tags: ['test', 'spec'],
          difficulty: 'beginner',
          author: 'Test Author',
          version: '1.0.0',
          description: 'A test document'
        },
        toc: [
          { level: 1, text: 'Test Document', id: 'test-document', children: [] }
        ],
        searchableText: 'Test Document content',
        internalLinks: ['/docs/other'],
        externalLinks: ['https://example.com'],
        images: [{ src: '/images/test.png', alt: 'Test image' }],
        codeBlocks: [{ language: 'javascript', code: 'console.log("test");' }]
      };

      const topic = (builder as any).buildTopic(parsedContent);

      expect(topic.id).toBe('specifications-test');
      expect(topic.title).toBe('Test Document');
      expect(topic.content).toBe('<h1>Test Document</h1><p>Content</p>');
      expect(topic.category).toBe('specifications');
      expect(topic.tags).toEqual(['test', 'spec']);
      expect(topic.difficulty).toBe('beginner');
      expect(topic.order).toBe(0);
      expect(topic.lastModified).toBeInstanceOf(Date);
      expect(topic.metadata.author).toBe('Test Author');
      expect(topic.metadata.version).toBe('1.0.0');
      expect(topic.metadata.description).toBe('A test document');
      expect(topic.metadata.wordCount).toBe(3); // "Test Document content"
      expect(topic.metadata.hasCodeBlocks).toBe(true);
      expect(topic.metadata.hasImages).toBe(true);
      expect(topic.metadata.hasLinks).toBe(true);
      expect(topic.metadata.toc).toHaveLength(1);
      expect(topic.metadata.internalLinks).toEqual(['/docs/other']);
      expect(topic.metadata.externalLinks).toEqual(['https://example.com']);
      expect(topic.metadata.images).toHaveLength(1);
      expect(topic.metadata.codeBlocks).toHaveLength(1);
    });

    it('should use custom ID strategy', () => {
      const builder = new TopicBuilder({ idStrategy: 'custom' });
      const parsedContent: ParsedContent = {
        path: 'test.md',
        html: '<h1>Test Document</h1>',
        metadata: {
          title: 'Test Document',
          category: 'test',
          tags: [],
          difficulty: 'beginner'
        },
        toc: [],
        searchableText: 'Test Document content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const topic = (builder as any).buildTopic(parsedContent);
      
      expect(topic.id).toBe('test-test-document');
    });

    it('should use default values when metadata is missing', () => {
      const parsedContent: ParsedContent = {
        path: 'test.md',
        html: '<h1>Test Document</h1>',
        metadata: {
          title: 'Test Document',
          category: '',
          tags: [],
          difficulty: 'beginner'
        },
        toc: [],
        searchableText: 'Test Document content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const topic = (builder as any).buildTopic(parsedContent);

      expect(topic.category).toBe('general'); // default category
      expect(topic.difficulty).toBe('beginner'); // from metadata
      expect(topic.tags).toEqual([]);
    });
  });

  describe('generateTopicId', () => {
    it('should generate ID from path when strategy is path', () => {
      const parsedContent: ParsedContent = {
        path: 'specifications/api-reference.md',
        html: '<h1>API Reference</h1>',
        metadata: {
          title: 'API Reference',
          category: 'specifications',
          tags: ['api'],
          difficulty: 'intermediate'
        },
        toc: [],
        searchableText: 'API Reference content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const id = (builder as any).generateTopicId(parsedContent);

      expect(id).toBe('specifications-api-reference');
    });

    it('should generate ID from title when strategy is title', () => {
      const titleBuilder = new TopicBuilder({ idStrategy: 'title' });
      const parsedContent: ParsedContent = {
        path: 'specifications/api-reference.md',
        html: '<h1>API Reference</h1>',
        metadata: {
          title: 'API Reference & Examples',
          category: 'specifications',
          tags: ['api'],
          difficulty: 'intermediate'
        },
        toc: [],
        searchableText: 'API Reference content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const id = (titleBuilder as any).generateTopicId(parsedContent);

      expect(id).toBe('api-reference-examples');
    });

    it('should generate custom ID when strategy is custom', () => {
      const customBuilder = new TopicBuilder({ idStrategy: 'custom' });
      const parsedContent: ParsedContent = {
        path: 'specifications/api-reference.md',
        html: '<h1>API Reference</h1>',
        metadata: {
          title: 'API Reference',
          category: 'specifications',
          tags: ['api'],
          difficulty: 'intermediate'
        },
        toc: [],
        searchableText: 'API Reference content',
        internalLinks: [],
        externalLinks: [],
        images: [],
        codeBlocks: []
      };

      const id = (customBuilder as any).generateTopicId(parsedContent);

      expect(id).toBe('specifications-api-reference');
    });
  });

  describe('buildCategories', () => {
    it('should build categories with correct metadata', () => {
      const categoryMap = new Map([
        ['specifications', [
          {
            id: 'spec-1',
            title: 'Spec 1',
            category: 'specifications',
            tags: ['spec'],
            difficulty: 'beginner' as const,
            order: 1,
            lastModified: new Date(),
            content: 'Content 1',
            metadata: { wordCount: 10 }
          },
          {
            id: 'spec-2',
            title: 'Spec 2',
            category: 'specifications',
            tags: ['spec', 'advanced'],
            difficulty: 'advanced' as const,
            order: 2,
            lastModified: new Date(),
            content: 'Content 2',
            metadata: { wordCount: 20 }
          }
        ]]
      ]);

      const categories = (builder as any).buildCategories(categoryMap);

      expect(categories).toHaveLength(1);
      const category = categories[0];
      expect(category.id).toBe('specifications');
      expect(category.name).toBe('Specifications');
      expect(category.description).toContain('2 topics');
      expect(category.topics).toEqual(['spec-1', 'spec-2']);
      expect(category.order).toBe(2); // specifications order
      expect(category.icon).toBe('icon-document');
      expect(category.color).toBe('#2196F3');
      expect(category.metadata.topicCount).toBe(2);
      expect(category.metadata.totalWordCount).toBe(30);
      expect(category.metadata.difficultyDistribution).toHaveLength(2);
      expect(category.metadata.tags).toEqual(['advanced', 'spec']);
    });

    it('should sort categories by order', () => {
      const categoryMap = new Map([
        ['specifications', []],
        ['getting-started', []],
        ['design', []]
      ]);

      const categories = (builder as any).buildCategories(categoryMap);

      expect(categories[0].id).toBe('gettingstarted'); // order 1
      expect(categories[1].id).toBe('specifications'); // order 2
      expect(categories[2].id).toBe('design'); // order 3
    });
  });

  describe('buildTopicRelationships', () => {
    it('should build topic relationships based on tags', () => {
      const topics: HelpTopic[] = [
        {
          id: 'topic-1',
          title: 'Topic 1',
          category: 'test',
          tags: ['javascript', 'api'],
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
          tags: ['javascript', 'guide'],
          difficulty: 'intermediate',
          order: 2,
          lastModified: new Date(),
          content: 'Content 2',
          metadata: {}
        },
        {
          id: 'topic-3',
          title: 'Topic 3',
          category: 'other',
          tags: ['python', 'api'],
          difficulty: 'advanced',
          order: 3,
          lastModified: new Date(),
          content: 'Content 3',
          metadata: {}
        }
      ];

      const relationships = builder.buildTopicRelationships(topics);

      expect(relationships.get('topic-1')).toContain('topic-2'); // shared 'javascript' tag
      expect(relationships.get('topic-1')).toContain('topic-3'); // shared 'api' tag
      expect(relationships.get('topic-2')).toContain('topic-1'); // shared 'javascript' tag
      expect(relationships.get('topic-3')).toContain('topic-1'); // shared 'api' tag
    });

    it('should limit relationships to top 5', () => {
      const topics: HelpTopic[] = Array.from({ length: 10 }, (_, i) => ({
        id: `topic-${i}`,
        title: `Topic ${i}`,
        category: 'test',
        tags: ['shared-tag'],
        difficulty: 'beginner' as const,
        order: i,
        lastModified: new Date(),
        content: `Content ${i}`,
        metadata: {}
      }));

      const relationships = builder.buildTopicRelationships(topics);

      for (const relatedTopics of relationships.values()) {
        expect(relatedTopics.length).toBeLessThanOrEqual(5);
      }
    });
  });

  describe('buildTopicIndex', () => {
    it('should build search index from topics', () => {
      const topics: HelpTopic[] = [
        {
          id: 'javascript-guide',
          title: 'JavaScript Guide',
          category: 'programming',
          tags: ['javascript', 'guide'],
          difficulty: 'beginner',
          order: 1,
          lastModified: new Date(),
          content: 'JavaScript content',
          metadata: {}
        },
        {
          id: 'api-reference',
          title: 'API Reference',
          category: 'programming',
          tags: ['api', 'reference'],
          difficulty: 'intermediate',
          order: 2,
          lastModified: new Date(),
          content: 'API content',
          metadata: {}
        }
      ];

      const index = builder.buildTopicIndex(topics);

      expect(index.get('javascript')).toContain('javascript-guide');
      expect(index.get('guide')).toContain('javascript-guide');
      expect(index.get('api')).toContain('api-reference');
      expect(index.get('reference')).toContain('api-reference');
      expect(index.get('programming')).toContain('javascript-guide');
      expect(index.get('programming')).toContain('api-reference');
    });

    it('should filter out short words', () => {
      const topics: HelpTopic[] = [
        {
          id: 'test-topic',
          title: 'A Test Topic',
          category: 'test',
          tags: ['test'],
          difficulty: 'beginner',
          order: 1,
          lastModified: new Date(),
          content: 'Test content',
          metadata: {}
        }
      ];

      const index = builder.buildTopicIndex(topics);

      expect(index.has('a')).toBe(false); // short word
      expect(index.has('test')).toBe(true); // long enough word
    });
  });

  describe('utility methods', () => {
    it('should generate category ID correctly', () => {
      const id1 = (builder as any).generateCategoryId('Getting Started');
      const id2 = (builder as any).generateCategoryId('API Reference & Examples');

      expect(id1).toBe('getting-started');
      expect(id2).toBe('api-reference-examples');
    });

    it('should format category name correctly', () => {
      const name1 = (builder as any).formatCategoryName('getting-started');
      const name2 = (builder as any).formatCategoryName('api-reference');

      expect(name1).toBe('Getting Started');
      expect(name2).toBe('Api Reference');
    });

    it('should get category order correctly', () => {
      expect((builder as any).getCategoryOrder('getting-started')).toBe(1);
      expect((builder as any).getCategoryOrder('specifications')).toBe(2);
      expect((builder as any).getCategoryOrder('design')).toBe(3);
      expect((builder as any).getCategoryOrder('unknown')).toBe(100);
    });

    it('should get category icon correctly', () => {
      expect((builder as any).getCategoryIcon('getting-started')).toBe('icon-play');
      expect((builder as any).getCategoryIcon('specifications')).toBe('icon-document');
      expect((builder as any).getCategoryIcon('design')).toBe('icon-palette');
      expect((builder as any).getCategoryIcon('unknown')).toBe('icon-folder');
    });

    it('should get category color correctly', () => {
      expect((builder as any).getCategoryColor('getting-started')).toBe('#4CAF50');
      expect((builder as any).getCategoryColor('specifications')).toBe('#2196F3');
      expect((builder as any).getCategoryColor('design')).toBe('#9C27B0');
      expect((builder as any).getCategoryColor('unknown')).toBe('#9E9E9E');
    });

    it('should get difficulty distribution correctly', () => {
      const topics: HelpTopic[] = [
        { id: '1', title: 'T1', category: 'test', tags: [], difficulty: 'beginner', order: 1, lastModified: new Date(), content: '', metadata: {} },
        { id: '2', title: 'T2', category: 'test', tags: [], difficulty: 'beginner', order: 2, lastModified: new Date(), content: '', metadata: {} },
        { id: '3', title: 'T3', category: 'test', tags: [], difficulty: 'advanced', order: 3, lastModified: new Date(), content: '', metadata: {} }
      ];

      const distribution = (builder as any).getDifficultyDistribution(topics);

      expect(distribution).toHaveLength(2);
      expect(distribution[0].difficulty).toBe('beginner');
      expect(distribution[0].count).toBe(2);
      expect(distribution[1].difficulty).toBe('advanced');
      expect(distribution[1].count).toBe(1);
    });

    it('should get last updated correctly', () => {
      const oldDate = new Date('2023-01-01');
      const newDate = new Date('2023-12-31');
      
      const topics: HelpTopic[] = [
        { id: '1', title: 'T1', category: 'test', tags: [], difficulty: 'beginner', order: 1, lastModified: oldDate, content: '', metadata: {} },
        { id: '2', title: 'T2', category: 'test', tags: [], difficulty: 'beginner', order: 2, lastModified: newDate, content: '', metadata: {} }
      ];

      const lastUpdated = (builder as any).getLastUpdated(topics);

      expect(lastUpdated).toEqual(newDate);
    });

    it('should get category tags correctly', () => {
      const topics: HelpTopic[] = [
        { id: '1', title: 'T1', category: 'test', tags: ['tag1', 'tag2'], difficulty: 'beginner', order: 1, lastModified: new Date(), content: '', metadata: {} },
        { id: '2', title: 'T2', category: 'test', tags: ['tag2', 'tag3'], difficulty: 'beginner', order: 2, lastModified: new Date(), content: '', metadata: {} }
      ];

      const tags = (builder as any).getCategoryTags(topics);

      expect(tags).toEqual(['tag1', 'tag2', 'tag3']);
    });
  });
});
