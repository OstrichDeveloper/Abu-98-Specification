/**
 * Help System Integration Tests
 * 
 * Tests the complete integration of the Help System with content processing
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ContentRegistry } from '../../src/lib/content/ContentRegistry.js';
import { ContentLoader } from '../../src/lib/content/ContentLoader.js';
import { MarkdownParser } from '../../src/lib/content/MarkdownParser.js';
import { TopicBuilder } from '../../src/lib/content/TopicBuilder.js';
import type { ContentFile, HelpTopic, HelpCategory } from '../../src/lib/content/types.js';

// Mock fetch for browser environment
global.fetch = vi.fn();

describe('Help System Integration', () => {
  let contentRegistry: ContentRegistry;
  let contentLoader: ContentLoader;
  let markdownParser: MarkdownParser;
  let topicBuilder: TopicBuilder;

  beforeEach(() => {
    // Create fresh instances for each test
    contentRegistry = new ContentRegistry();
    contentLoader = new ContentLoader({
      baseDir: 'docs',
      include: ['**/*.md'],
      exclude: ['**/node_modules/**'],
      maxFileSize: 1024 * 1024,
      cacheTtl: 5000,
      validateContent: true
    });
    markdownParser = new MarkdownParser({
      allowHtml: true,
      highlightCode: true,
      generateToc: true,
      maxTocLevel: 3,
      validateLinks: true,
      baseUrl: '/docs'
    });
    topicBuilder = new TopicBuilder({
      defaultCategory: 'general',
      defaultDifficulty: 'intermediate',
      autoOrder: true,
      idStrategy: 'path'
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    contentRegistry.clear();
  });

  describe('Content Loading and Processing Pipeline', () => {
    it('should load and process content files end-to-end', async () => {
      // Mock successful content loading
      const mockContentFiles: ContentFile[] = [
        {
          path: 'specifications/help-system.md',
          content: `---
title: Help System Overview
description: Overview of the Windows 98 Help System
category: specifications
tags: [help-system, overview, windows-98]
difficulty: beginner
author: Abu OS Team
version: 1.0.0
order: 1
---

# Help System Overview

The Abu OS 98 Web Kernel includes a faithful recreation of the Windows 98 F1 Help System.

## Features

- **Contents Tab**: Hierarchical navigation
- **Index Tab**: Keyword search
- **Search Tab**: Full-text search
- **Favorites Tab**: Bookmark management

\`\`\`javascript
// Example code
console.log('Hello, Help System!');
\`\`\`

[Learn more about the API](/docs/specifications/api-reference)`,
          metadata: {
            title: 'Help System Overview',
            category: 'specifications',
            tags: ['help-system', 'overview', 'windows-98'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'design/help-system-visual.md',
          content: `---
title: Help System Visual Design
description: Visual design guide for the Help System
category: design
tags: [design, visual, help-system]
difficulty: intermediate
author: Design Team
version: 1.0.0
order: 2
---

# Help System Visual Design

This document outlines the visual design principles for the Help System.

## Color Scheme

The Help System uses the classic Windows 98 color palette:

- **Window Background**: #C0C0C0
- **Text**: #000000
- **Links**: #0000FF
- **Highlighted Text**: #FFFFFF on #0000FF

## Typography

- **Font Family**: MS Sans Serif, 8pt
- **Headings**: Bold, larger size
- **Code**: Courier New, monospace`,
          metadata: {
            title: 'Help System Visual Design',
            category: 'design',
            tags: ['design', 'visual', 'help-system'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        }
      ];

      // Mock fetch responses
      (global.fetch as any).mockImplementation((url: string) => {
        const file = mockContentFiles.find(f => url.includes(f.path));
        if (file) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(file.content)
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      // Initialize content registry
      await contentRegistry.initialize();

      // Verify content was loaded and processed
      expect(contentRegistry.files.size).toBeGreaterThan(0);
      expect(contentRegistry.topics.size).toBeGreaterThan(0);
      expect(contentRegistry.helpCategories.size).toBeGreaterThan(0);

      // Get topics and verify structure
      const topics = contentRegistry.getTopics();
      expect(topics.length).toBeGreaterThan(0);

      const helpSystemTopic = topics.find(t => t.id.includes('help-system'));
      expect(helpSystemTopic).toBeDefined();
      expect(helpSystemTopic!.title).toBe('Help System Overview');
      expect(helpSystemTopic!.category).toBe('specifications');
      expect(helpSystemTopic!.tags).toContain('help-system');
      expect(helpSystemTopic!.content).toContain('Windows 98 F1 Help System');
      expect(helpSystemTopic!.content).toContain('<pre class="code-block">');
      expect(helpSystemTopic!.content).toContain('<a href="/docs/specifications/api-reference"');

      // Verify categories
      const categories = contentRegistry.getCategories();
      expect(categories.length).toBeGreaterThan(0);

      const specificationsCategory = categories.find(c => c.id === 'specifications');
      expect(specificationsCategory).toBeDefined();
      expect(specificationsCategory!.name).toBe('Specifications');
      expect(specificationsCategory!.topics.length).toBeGreaterThan(0);

      const designCategory = categories.find(c => c.id === 'design');
      expect(designCategory).toBeDefined();
      expect(designCategory!.name).toBe('Design');
    });

    it('should handle content loading errors gracefully', async () => {
      // Mock fetch to reject
      (global.fetch as any).mockRejectedValue(new Error('Network error'));

      // Initialize should not throw
      await expect(contentRegistry.initialize()).rejects.toThrow('Network error');
    });

    it('should process content with different metadata formats', async () => {
      const mockContentFiles: ContentFile[] = [
        {
          path: 'guides/quick-start.md',
          content: `# Quick Start Guide

This is a quick start guide without frontmatter.

## Getting Started

Follow these steps to get started with Abu OS.

\`\`\`bash
npm install @melalawi/abu-web-kernel
\`\`\`

## Next Steps

- Read the [API documentation](/docs/api)
- Check out the [examples](/docs/examples)`,
          metadata: {
            title: 'Quick Start Guide',
            category: 'guides',
            tags: ['quick-start', 'getting-started'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = mockContentFiles.find(f => url.includes(f.path));
        if (file) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(file.content)
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      await contentRegistry.initialize();

      const topics = contentRegistry.getTopics();
      const quickStartTopic = topics.find(t => t.id.includes('quick-start'));
      
      expect(quickStartTopic).toBeDefined();
      expect(quickStartTopic!.title).toBe('Quick Start Guide');
      expect(quickStartTopic!.category).toBe('guides');
      expect(quickStartTopic!.content).toContain('Getting Started');
      expect(quickStartTopic!.content).toContain('<pre class="code-block">');
    });
  });

  describe('Search Functionality Integration', () => {
    beforeEach(async () => {
      // Set up test content
      const mockContentFiles: ContentFile[] = [
        {
          path: 'specifications/help-system.md',
          content: '# Help System\n\nThis is about the help system functionality.',
          metadata: {
            title: 'Help System',
            category: 'specifications',
            tags: ['help-system', 'specifications'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'design/help-system-visual.md',
          content: '# Visual Design\n\nThis covers the visual design of the help system.',
          metadata: {
            title: 'Visual Design',
            category: 'design',
            tags: ['design', 'visual', 'help-system'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'api/reference.md',
          content: '# API Reference\n\nComplete API documentation for developers.',
          metadata: {
            title: 'API Reference',
            category: 'api',
            tags: ['api', 'reference', 'documentation'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = mockContentFiles.find(f => url.includes(f.path));
        if (file) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(file.content)
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      await contentRegistry.initialize();
    });

    it('should search across all content', () => {
      const results = contentRegistry.search('help system');

      expect(results.length).toBeGreaterThan(0);
      expect(results.some(r => r.title.includes('Help System'))).toBe(true);
      expect(results.some(r => r.title.includes('Visual Design'))).toBe(true);
    });

    it('should filter search results by category', () => {
      const specificationsResults = contentRegistry.search('help', { category: 'specifications' });
      const designResults = contentRegistry.search('help', { category: 'design' });

      expect(specificationsResults.length).toBeGreaterThan(0);
      expect(designResults.length).toBeGreaterThan(0);
      expect(specificationsResults.every(r => r.category === 'specifications')).toBe(true);
      expect(designResults.every(r => r.category === 'design')).toBe(true);
    });

    it('should limit search results', () => {
      const results = contentRegistry.search('help', { limit: 1 });

      expect(results.length).toBeLessThanOrEqual(1);
    });

    it('should return empty results for non-existent queries', () => {
      const results = contentRegistry.search('nonexistent query');

      expect(results.length).toBe(0);
    });
  });

  describe('Content Categories and Organization', () => {
    beforeEach(async () => {
      const mockContentFiles: ContentFile[] = [
        {
          path: 'getting-started/intro.md',
          content: '# Introduction\n\nWelcome to Abu OS.',
          metadata: {
            title: 'Introduction',
            category: 'getting-started',
            tags: ['intro', 'getting-started'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'specifications/help-system.md',
          content: '# Help System\n\nHelp system specifications.',
          metadata: {
            title: 'Help System',
            category: 'specifications',
            tags: ['help-system', 'specifications'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'design/visual-guide.md',
          content: '# Visual Guide\n\nVisual design guidelines.',
          metadata: {
            title: 'Visual Guide',
            category: 'design',
            tags: ['design', 'visual'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = mockContentFiles.find(f => url.includes(f.path));
        if (file) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(file.content)
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      await contentRegistry.initialize();
    });

    it('should organize content by categories', () => {
      const categories = contentRegistry.getCategories();
      
      expect(categories.length).toBeGreaterThan(0);
      
      const gettingStartedCategory = categories.find(c => c.id === 'gettingstarted');
      expect(gettingStartedCategory).toBeDefined();
      expect(gettingStartedCategory!.name).toBe('Gettingstarted');
      expect(gettingStartedCategory!.topics.length).toBeGreaterThan(0);

      const specificationsCategory = categories.find(c => c.id === 'specifications');
      expect(specificationsCategory).toBeDefined();
      expect(specificationsCategory!.name).toBe('Specifications');
    });

    it('should get topics by category', () => {
      const gettingStartedTopics = contentRegistry.getTopicsByCategory('gettingstarted');
      const specificationsTopics = contentRegistry.getTopicsByCategory('specifications');

      expect(gettingStartedTopics.length).toBeGreaterThan(0);
      expect(specificationsTopics.length).toBeGreaterThan(0);
      expect(gettingStartedTopics.every(t => t.category === 'getting-started')).toBe(true);
      expect(specificationsTopics.every(t => t.category === 'specifications')).toBe(true);
    });

    it('should return empty array for non-existent category', () => {
      const topics = contentRegistry.getTopicsByCategory('non-existent');

      expect(topics.length).toBe(0);
    });
  });

  describe('Content Metadata and Relationships', () => {
    beforeEach(async () => {
      const mockContentFiles: ContentFile[] = [
        {
          path: 'specifications/help-system.md',
          content: `# Help System

This is the main help system specification.

## Related Topics

- [API Reference](/docs/api/reference)
- [Visual Design](/docs/design/visual)

\`\`\`javascript
// Example usage
const helpSystem = new HelpSystem();
\`\`\``,
          metadata: {
            title: 'Help System',
            category: 'specifications',
            tags: ['help-system', 'specifications', 'api'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = mockContentFiles.find(f => url.includes(f.path));
        if (file) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(file.content)
          });
        }
        return Promise.resolve({
          ok: false,
          status: 404,
          statusText: 'Not Found'
        });
      });

      await contentRegistry.initialize();
    });

    it('should extract and store content metadata', () => {
      const topics = contentRegistry.getTopics();
      const helpSystemTopic = topics.find(t => t.id.includes('help-system'));

      expect(helpSystemTopic).toBeDefined();
      expect(helpSystemTopic!.metadata).toBeDefined();
      expect(helpSystemTopic!.metadata.wordCount).toBeGreaterThan(0);
      expect(helpSystemTopic!.metadata.hasCodeBlocks).toBe(true);
      expect(helpSystemTopic!.metadata.hasLinks).toBe(true);
      expect(helpSystemTopic!.metadata.internalLinks.length).toBeGreaterThan(0);
    });

    it('should build topic relationships', () => {
      const topics = contentRegistry.getTopics();
      expect(topics.length).toBeGreaterThan(0);

      // Each topic should have relationships based on shared tags
      for (const topic of topics) {
        expect(topic.tags.length).toBeGreaterThan(0);
        expect(topic.category).toBeDefined();
        expect(topic.difficulty).toBeDefined();
      }
    });
  });

  describe('Performance and Caching', () => {
    it('should cache content for performance', async () => {
      const mockContent = '# Test Content\n\nThis is test content.';
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(mockContent)
      });

      // Load content first time
      const firstResult = await contentLoader.loadFile('test.md');
      expect(firstResult).not.toBeNull();

      // Load content second time (should use cache)
      const secondResult = await contentLoader.loadFile('test.md');
      expect(secondResult).not.toBeNull();
      expect(secondResult).toBe(firstResult);

      // Fetch should only be called once
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should provide cache statistics', () => {
      const stats = contentLoader.getCacheStats();
      
      expect(stats).toBeDefined();
      expect(typeof stats.size).toBe('number');
      expect(Array.isArray(stats.entries)).toBe(true);
    });

    it('should clear cache when needed', () => {
      contentLoader.clearCache();
      const stats = contentLoader.getCacheStats();
      
      expect(stats.size).toBe(0);
      expect(stats.entries.length).toBe(0);
    });
  });

  describe('Error Handling and Edge Cases', () => {
    it('should handle malformed markdown gracefully', async () => {
      const malformedContent = `---
title: Malformed Document
invalid: yaml: [content
---

# Malformed Document

This has [unclosed links and **unclosed bold text.`;
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(malformedContent)
      });

      const result = await contentLoader.loadFile('malformed.md');
      
      expect(result).not.toBeNull();
      expect(result!.metadata.title).toBe('Malformed Document');
    });

    it('should handle empty content files', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve('')
      });

      const result = await contentLoader.loadFile('empty.md');
      
      expect(result).not.toBeNull();
      expect(result!.content).toBe('');
    });

    it('should handle very large content files', async () => {
      const largeContent = '# Large Document\n\n' + 'x'.repeat(10000);
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(largeContent)
      });

      const result = await contentLoader.loadFile('large.md');
      
      expect(result).not.toBeNull();
      expect(result!.content.length).toBeGreaterThan(10000);
    });
  });

  describe('Content Validation and Quality', () => {
    it('should validate content structure', async () => {
      const validContent = `---
title: Valid Document
description: A valid document
category: test
tags: [test, valid]
difficulty: beginner
---

# Valid Document

This is a properly structured document.`;
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(validContent)
      });

      const result = await contentLoader.loadFile('valid.md');
      
      expect(result).not.toBeNull();
      expect(result!.metadata.title).toBe('Valid Document');
      expect(result!.metadata.category).toBe('test');
      expect(result!.metadata.tags).toEqual(['test', 'valid']);
      expect(result!.metadata.difficulty).toBe('beginner');
    });

    it('should extract and validate links', async () => {
      const contentWithLinks = `# Document with Links

[Internal Link](/docs/internal)
[External Link](https://example.com)
[Email Link](mailto:test@example.com)`;
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(contentWithLinks)
      });

      const result = await contentLoader.loadFile('links.md');
      const parsed = markdownParser.parse(result!.content, result!.path);
      
      expect(parsed.internalLinks).toContain('/docs/internal');
      expect(parsed.externalLinks).toContain('https://example.com');
      expect(parsed.externalLinks).toContain('mailto:test@example.com');
    });
  });
});
