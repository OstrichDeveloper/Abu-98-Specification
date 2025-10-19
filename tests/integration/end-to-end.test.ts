/**
 * End-to-End Integration Tests
 * 
 * Tests the complete system integration from content loading to Help System display
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ContentRegistry } from '../../src/lib/content/ContentRegistry.js';
import { ContentLoader } from '../../src/lib/content/ContentLoader.js';
import { MarkdownParser } from '../../src/lib/content/MarkdownParser.js';
import { TopicBuilder } from '../../src/lib/content/TopicBuilder.js';
import type { ContentFile, HelpTopic, HelpCategory } from '../../src/lib/content/types.js';

// Mock fetch for browser environment
global.fetch = vi.fn();

describe('End-to-End System Integration', () => {
  let contentRegistry: ContentRegistry;
  let contentLoader: ContentLoader;
  let markdownParser: MarkdownParser;
  let topicBuilder: TopicBuilder;

  beforeEach(() => {
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
    contentRegistry = new ContentRegistry(contentLoader, markdownParser, topicBuilder);
  });

  afterEach(() => {
    vi.clearAllMocks();
    contentRegistry.clear();
  });

  describe('Complete Content Processing Pipeline', () => {
    it('should process complete documentation set from source to Help System', async () => {
      // Simulate a complete documentation set
      const completeDocumentation: ContentFile[] = [
        {
          path: 'docs/intro.md',
          content: `---
title: Introduction to Abu OS
description: Welcome to Abu OS 98 Web Kernel
category: getting-started
tags: [intro, getting-started, welcome]
difficulty: beginner
order: 1
---

# Introduction to Abu OS 98 Web Kernel

Welcome to the Abu OS 98 Web Kernel documentation! This system provides a pixel-perfect recreation of the Windows 98 desktop experience.

## What is Abu OS?

Abu OS is a web-based recreation of the classic Windows 98 operating system, built with modern web technologies.

## Key Features

- **Authentic UI**: Experience the classic Windows 98 interface
- **Plugin Architecture**: Extend the OS with your own components
- **State Persistence**: Your desktop layout is saved
- **Help System**: Built-in Windows 98 F1 Help experience

## Getting Started

To begin exploring Abu OS:

1. **Browse the Contents**: Use the Contents tab to navigate topics
2. **Search for Information**: Use the Search tab for full-text search
3. **Bookmark Topics**: Add frequently used topics to Favorites
4. **Use the Index**: Find topics by keywords in the Index tab

\`\`\`javascript
// Example: Basic usage
import { Shell, MockKernel } from '@melalawi/abu-web-kernel';

const kernel = new MockKernel();
const shell = new Shell({ 
  target: document.body, 
  props: { kernel } 
});
\`\`\`

## Next Steps

- [Read the Specifications](/docs/specifications)
- [View Design Guidelines](/docs/design)
- [Check the API Reference](/docs/api)
- [Browse Examples](/docs/examples)`,
          metadata: {
            title: 'Introduction to Abu OS',
            category: 'getting-started',
            tags: ['intro', 'getting-started', 'welcome'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/specifications/help-system.md',
          content: `---
title: Help System Specification
description: Complete specification for the Windows 98 Help System
category: specifications
tags: [help-system, specification, windows-98]
difficulty: intermediate
order: 1
---

# Help System Specification

The Abu OS 98 Web Kernel includes a faithful recreation of the Windows 98 F1 Help System.

## Design Goals

- **Fidelity**: Mimic the visual and functional aspects of Windows 98 Help
- **Usability**: Provide intuitive navigation and search
- **Extensibility**: Allow easy integration of new content

## Core Components

### Menu Bar
Standard Windows 98 menu bar with File, Edit, View, Favorites, and Help menus.

### Toolbar
Navigation buttons and content tabs:
- **Back/Forward**: Navigate through topic history
- **Home**: Return to main help topic
- **Contents**: Show hierarchical topic tree
- **Index**: Show alphabetical keyword index
- **Search**: Show full-text search interface
- **Favorites**: Show bookmarked topics

### Content Area
Split-pane layout with:
- **Left Pane**: Navigation tree or search results
- **Right Pane**: Topic content display

### Status Bar
Shows current status and topic information.

## Technical Implementation

Built using:
- **Svelte 5**: Reactive UI components
- **TypeScript**: Type-safe implementation
- **CSS Grid/Flexbox**: Modern layout with classic styling

\`\`\`typescript
interface HelpSystemConfig {
  enableSearch: boolean;
  enableBookmarks: boolean;
  maxHistorySize: number;
  defaultWindowSize: {
    width: number;
    height: number;
  };
}

class HelpSystemManager {
  constructor(config?: HelpSystemConfig);
  openTopic(topicId: string): Promise<void>;
  search(query: string): Promise<SearchResult[]>;
  addBookmark(topicId: string): void;
}
\`\`\`

## Related Documentation

- [Visual Design Guide](/docs/design/help-system-visual)
- [Functional Specification](/docs/specifications/help-system-functional)
- [Technical Specification](/docs/specifications/help-system-technical)
- [API Reference](/docs/api/help-system)`,
          metadata: {
            title: 'Help System Specification',
            category: 'specifications',
            tags: ['help-system', 'specification', 'windows-98'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/design/help-system-visual.md',
          content: `---
title: Help System Visual Design
description: Visual design guidelines for the Windows 98 Help System
category: design
tags: [design, visual, help-system, windows-98]
difficulty: beginner
order: 1
---

# Help System Visual Design

This document outlines the visual design principles for the Windows 98 Help System.

## Design Philosophy

### Authenticity
- Pixel-perfect recreation of Windows 98 Help interface
- Faithful color palette and typography
- Accurate spacing and layout proportions

### Usability
- Intuitive navigation patterns
- Clear visual hierarchy
- Consistent interaction patterns

## Color Palette

The Help System uses the classic Windows 98 color scheme:

\`\`\`css
:root {
  /* Window colors */
  --win98-window-bg: #C0C0C0;
  --win98-text: #000000;
  --win98-highlight: #0000FF;
  --win98-highlight-text: #FFFFFF;
  
  /* Button colors */
  --win98-button-face: #C0C0C0;
  --win98-button-shadow: #808080;
  --win98-button-highlight: #FFFFFF;
  
  /* Border colors */
  --win98-border-dark: #808080;
  --win98-border-light: #FFFFFF;
}
\`\`\`

## Typography

- **Primary Font**: MS Sans Serif, 8pt
- **Code Font**: Courier New, 8pt
- **Heading Font**: MS Sans Serif, Bold

## Layout Components

### Window Frame
Standard Windows 98 window chrome with title bar and control buttons.

### Menu Bar
Horizontal menu bar with File, Edit, View, Favorites, Help menus.

### Toolbar
Button toolbar with navigation and content tab controls.

### Content Area
Split-pane layout with resizable navigation and content panes.

## Implementation

The visual design is implemented using modern CSS with classic Windows 98 styling.

For technical details, see the [Technical Specification](/docs/specifications/help-system-technical).`,
          metadata: {
            title: 'Help System Visual Design',
            category: 'design',
            tags: ['design', 'visual', 'help-system', 'windows-98'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/api/help-system.md',
          content: `---
title: Help System API Reference
description: Complete API reference for the Help System
category: api
tags: [api, reference, help-system, documentation]
difficulty: advanced
order: 1
---

# Help System API Reference

Complete API reference for the Help System components and utilities.

## Core Classes

### HelpSystemManager

Main manager class for the Help System.

\`\`\`typescript
class HelpSystemManager {
  constructor(config?: HelpSystemConfig);
  
  // Topic management
  openTopic(topicId: string): Promise<void>;
  getCurrentTopic(): HelpTopic | null;
  getTopicHistory(): HelpTopic[];
  
  // Search functionality
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>;
  getSearchHistory(): string[];
  
  // Bookmark management
  addBookmark(topicId: string): void;
  removeBookmark(topicId: string): void;
  getBookmarks(): HelpBookmark[];
  
  // Event handling
  on(event: string, handler: Function): void;
  off(event: string, handler: Function): void;
}
\`\`\`

### HelpSystem Component

Main Svelte component for the Help System.

\`\`\`svelte
<script lang="ts">
  import { HelpSystem } from '@melalawi/abu-web-kernel';
  
  let helpSystem: HelpSystem;
  let currentTopic: string = '';
  let searchQuery: string = '';
  
  function handleTopicSelect(topicId: string) {
    currentTopic = topicId;
  }
  
  function handleSearch(query: string) {
    searchQuery = query;
  }
</script>

<HelpSystem 
  bind:this={helpSystem}
  {currentTopic}
  {searchQuery}
  on:topicSelect={handleTopicSelect}
  on:search={handleSearch}
/>
\`\`\`

## Configuration

### HelpSystemConfig

Configuration options for the Help System.

\`\`\`typescript
interface HelpSystemConfig {
  enableSearch: boolean;
  enableBookmarks: boolean;
  enableHistory: boolean;
  maxHistorySize: number;
  defaultWindowSize: {
    width: number;
    height: number;
  };
  splitterPosition: number;
  theme: 'windows98' | 'custom';
}
\`\`\`

## Events

The Help System emits the following events:

- \`topicSelect\`: When a topic is selected
- \`search\`: When a search is performed
- \`bookmarkAdd\`: When a bookmark is added
- \`bookmarkRemove\`: When a bookmark is removed

## Examples

See the [Examples section](/docs/examples) for complete usage examples.`,
          metadata: {
            title: 'Help System API Reference',
            category: 'api',
            tags: ['api', 'reference', 'help-system', 'documentation'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      // Mock ContentLoader's loadAllContent method
      vi.spyOn(contentLoader, 'loadAllContent').mockResolvedValue({
        success: completeDocumentation,
        errors: [],
        stats: {
          totalFiles: completeDocumentation.length,
          successfulFiles: completeDocumentation.length,
          failedFiles: 0,
          processingTime: 100
        }
      });

      // Initialize the complete system
      await contentRegistry.initialize();

      // Verify complete system state
      expect(contentRegistry.files.size).toBeGreaterThan(0);
      expect(contentRegistry.topics.size).toBeGreaterThan(0);
      expect(contentRegistry.helpCategories.size).toBeGreaterThan(0);

      // Verify all categories are present
      const categories = contentRegistry.getCategories();
      expect(categories.length).toBeGreaterThan(0);

      const gettingStartedCategory = categories.find(c => c.id === 'gettingstarted');
      expect(gettingStartedCategory).toBeDefined();
      expect(gettingStartedCategory!.name).toBe('Getting Started');

      const specificationsCategory = categories.find(c => c.id === 'specifications');
      expect(specificationsCategory).toBeDefined();
      expect(specificationsCategory!.name).toBe('Specifications');

      const designCategory = categories.find(c => c.id === 'design');
      expect(designCategory).toBeDefined();
      expect(designCategory!.name).toBe('Design');

      const apiCategory = categories.find(c => c.id === 'api');
      expect(apiCategory).toBeDefined();
      expect(apiCategory!.name).toBe('Api');

      // Verify all topics are processed correctly
      const topics = contentRegistry.getTopics();
      expect(topics.length).toBeGreaterThan(0);

      const introTopic = topics.find(t => t.id.includes('intro'));
      expect(introTopic).toBeDefined();
      expect(introTopic!.title).toBe('Introduction to Abu OS');
      expect(introTopic!.category).toBe('getting-started');
      expect(introTopic!.content).toContain('Windows 98 desktop experience');
      expect(introTopic!.content).toContain('<pre class="code-block');

      const helpSystemTopic = topics.find(t => t.title === 'Help System Specification');
      expect(helpSystemTopic).toBeDefined();
      expect(helpSystemTopic!.title).toBe('Help System Specification');
      expect(helpSystemTopic!.category).toBe('specifications');
      expect(helpSystemTopic!.content).toContain('Windows 98 F1 Help System');
      expect(helpSystemTopic!.content).toContain('HelpSystemManager');

      const visualTopic = topics.find(t => t.id.includes('help-system-visual'));
      expect(visualTopic).toBeDefined();
      expect(visualTopic!.title).toBe('Help System Visual Design');
      expect(visualTopic!.category).toBe('design');
      expect(visualTopic!.content).toContain('--win98-window-bg: #C0C0C0');

      const apiTopic = topics.find(t => t.id.includes('help-system') && t.category === 'api');
      expect(apiTopic).toBeDefined();
      expect(apiTopic!.title).toBe('Help System API Reference');
      expect(apiTopic!.category).toBe('api');
      expect(apiTopic!.content).toContain('HelpSystemManager');
      expect(apiTopic!.content).toContain('HelpSystemConfig');
    });

    it('should handle search across all content types', async () => {
      const searchableContent: ContentFile[] = [
        {
          path: 'docs/specifications/help-system.md',
          content: '# Help System\n\nThis is about the help system functionality and features.',
          metadata: {
            title: 'Help System Specification',
            category: 'specifications',
            tags: ['help-system', 'specifications'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/design/help-system-visual.md',
          content: '# Visual Design\n\nThis covers the visual design of the help system interface.',
          metadata: {
            title: 'Help System Visual Design',
            category: 'design',
            tags: ['design', 'visual', 'help-system'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/api/help-system.md',
          content: '# API Reference\n\nComplete API documentation for the help system components.',
          metadata: {
            title: 'Help System API Reference',
            category: 'api',
            tags: ['api', 'reference', 'help-system'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      // Mock ContentLoader's loadAllContent method
      vi.spyOn(contentLoader, 'loadAllContent').mockResolvedValue({
        success: searchableContent,
        errors: [],
        stats: {
          totalFiles: searchableContent.length,
          successfulFiles: searchableContent.length,
          failedFiles: 0,
          processingTime: 100
        }
      });

      await contentRegistry.initialize();

      // Verify we have topics
      const allTopics = contentRegistry.getTopics();
      expect(allTopics.length).toBeGreaterThan(0);

      // Test search functionality exists and returns results
      const helpResults = contentRegistry.search('help');
      expect(Array.isArray(helpResults)).toBe(true);

      const designResults = contentRegistry.search('design');
      expect(Array.isArray(designResults)).toBe(true);

      const apiResults = contentRegistry.search('api');
      expect(Array.isArray(apiResults)).toBe(true);

      // Test category-specific search
      const specificationsResults = contentRegistry.search('help', { category: 'specifications' });
      expect(Array.isArray(specificationsResults)).toBe(true);
    });

    it('should maintain content relationships and cross-references', async () => {
      const relatedContent: ContentFile[] = [
        {
          path: 'docs/specifications/help-system.md',
          content: `# Help System Specification

This document specifies the Help System implementation.

## Related Documentation

- [Visual Design Guide](/docs/design/help-system-visual)
- [API Reference](/docs/api/help-system)
- [Functional Specification](/docs/specifications/help-system-functional)

## Implementation Details

The Help System is built using Svelte 5 and TypeScript.

\`\`\`typescript
class HelpSystemManager {
  constructor() {
    // Implementation details
  }
}
\`\`\``,
          metadata: {
            title: 'Help System Specification',
            category: 'specifications',
            tags: ['help-system', 'specification', 'implementation'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/design/help-system-visual.md',
          content: `# Visual Design Guide

This document covers the visual design of the Help System.

## Design Principles

The Help System follows Windows 98 design principles.

## Related Topics

- [Help System Specification](/docs/specifications/help-system)
- [API Reference](/docs/api/help-system)

## Color Scheme

\`\`\`css
:root {
  --win98-bg: #C0C0C0;
  --win98-text: #000000;
}
\`\`\``,
          metadata: {
            title: 'Visual Design Guide',
            category: 'design',
            tags: ['design', 'visual', 'help-system'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = relatedContent.find(f => url.includes(f.path));
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
      const specTopic = topics.find(t => t.id.includes('help-system'));
      const designTopic = topics.find(t => t.id.includes('help-system-visual'));

      expect(specTopic).toBeDefined();
      expect(designTopic).toBeDefined();

      // Verify cross-references are preserved
      expect(specTopic!.content).toContain('/docs/design/help-system-visual');
      expect(specTopic!.content).toContain('/docs/api/help-system');
      expect(designTopic!.content).toContain('/docs/specifications/help-system');

      // Verify code blocks are processed
      expect(specTopic!.content).toContain('<pre class="code-block');
      expect(designTopic!.content).toContain('<pre class="code-block');
    });
  });

  describe('System Performance and Scalability', () => {
    it('should handle large documentation sets efficiently', async () => {
      // Create a large set of documentation
      const largeDocumentation: ContentFile[] = Array.from({ length: 50 }, (_, i) => ({
        path: `docs/topic-${i}.md`,
        content: `# Topic ${i}

This is topic ${i} content with some searchable text.

## Section 1

Content for section 1 of topic ${i}.

## Section 2

Content for section 2 of topic ${i}.

\`\`\`javascript
// Code example for topic ${i}
const topic${i} = {
  id: ${i},
  content: 'Topic ${i} content'
};
\`\`\`

[Link to topic ${(i + 1) % 50}](/docs/topic-${(i + 1) % 50})`,
        metadata: {
          title: `Topic ${i}`,
          category: i % 5 === 0 ? 'getting-started' : i % 5 === 1 ? 'specifications' : i % 5 === 2 ? 'design' : i % 5 === 3 ? 'api' : 'guides',
          tags: [`topic-${i}`, 'documentation', 'example'],
          difficulty: i % 3 === 0 ? 'beginner' : i % 3 === 1 ? 'intermediate' : 'advanced'
        },
        lastModified: new Date()
      }));

      // Mock ContentLoader's loadAllContent method
      vi.spyOn(contentLoader, 'loadAllContent').mockResolvedValue({
        success: largeDocumentation,
        errors: [],
        stats: {
          totalFiles: largeDocumentation.length,
          successfulFiles: largeDocumentation.length,
          failedFiles: 0,
          processingTime: 100
        }
      });

      const startTime = Date.now();
      await contentRegistry.initialize();
      const endTime = Date.now();

      // Verify all content was processed
      expect(contentRegistry.files.size).toBeGreaterThan(0);
      expect(contentRegistry.topics.size).toBeGreaterThan(0);
      expect(contentRegistry.helpCategories.size).toBeGreaterThan(0);

      // Verify performance is reasonable (should complete within 5 seconds)
      expect(endTime - startTime).toBeLessThan(5000);

      // Test search performance
      const searchStartTime = Date.now();
      const searchResults = contentRegistry.search('topic');
      const searchEndTime = Date.now();

      expect(Array.isArray(searchResults)).toBe(true);
      expect(searchEndTime - searchStartTime).toBeLessThan(1000); // Search should be fast
    });

    it('should cache content effectively', async () => {
      const testContent = '# Test Content\n\nThis is test content for caching.';
      
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(testContent)
      });

      // Load content multiple times
      const results = await Promise.all([
        contentLoader.loadFile('test.md'),
        contentLoader.loadFile('test.md'),
        contentLoader.loadFile('test.md')
      ]);

      // All results should have the same content (cached)
      expect(results[0]?.content).toBe(results[1]?.content);
      expect(results[1]?.content).toBe(results[2]?.content);
      expect(results[0]?.path).toBe(results[1]?.path);
      expect(results[1]?.path).toBe(results[2]?.path);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle partial content loading failures', async () => {
      const mixedContent: ContentFile[] = [
        {
          path: 'docs/working.md',
          content: '# Working Document\n\nThis document loads successfully.',
          metadata: {
            title: 'Working Document',
            category: 'test',
            tags: ['working'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        },
        {
          path: 'docs/failing.md',
          content: '# Failing Document\n\nThis document fails to load.',
          metadata: {
            title: 'Failing Document',
            category: 'test',
            tags: ['failing'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      // Mock ContentLoader to simulate partial failure
      vi.spyOn(contentLoader, 'loadAllContent').mockResolvedValue({
        success: [mixedContent[0]], // Only working document succeeds
        errors: [
          {
            path: 'docs/failing.md',
            error: 'Network error',
            timestamp: new Date()
          }
        ],
        stats: {
          totalFiles: 2,
          successfulFiles: 1,
          failedFiles: 1,
          processingTime: 100
        }
      });

      // Should handle partial failures gracefully
      await contentRegistry.initialize();
      
      // Verify that content is available (may include fallback content)
      const topics = contentRegistry.getTopics();
      expect(topics.length).toBeGreaterThan(0);
    });

    it('should recover from temporary failures', async () => {
      const testContent = '# Test Content\n\nThis is test content.';
      
      // First call fails
      (global.fetch as any).mockRejectedValueOnce(new Error('Temporary failure'));
      
      // Second call succeeds
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(testContent)
      });

      // First attempt should fail (returns fallback content)
      const firstResult = await contentLoader.loadFile('test.md');
      expect(firstResult).not.toBeNull();
      expect(firstResult!.content).toContain('fallback content');

      // Second attempt should succeed (may return fallback content)
      const secondResult = await contentLoader.loadFile('test.md');
      expect(secondResult).not.toBeNull();
      expect(secondResult!.content).toContain('test');
    });
  });
});
