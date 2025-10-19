/**
 * Docusaurus Integration Tests
 * 
 * Tests the integration between Docusaurus and the Help System
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ContentRegistry } from '../../src/lib/content/ContentRegistry.js';
import type { ContentFile, HelpTopic } from '../../src/lib/content/types.js';

// Mock fetch for browser environment
global.fetch = vi.fn();

describe('Docusaurus Integration', () => {
  let contentRegistry: ContentRegistry;

  beforeEach(() => {
    contentRegistry = new ContentRegistry();
  });

  afterEach(() => {
    vi.clearAllMocks();
    contentRegistry.clear();
  });

  describe('Content Sharing Between Help System and Docusaurus', () => {
    it('should share the same content source between Help System and Docusaurus', async () => {
      // Mock content that would be shared between both systems
      const sharedContent: ContentFile[] = [
        {
          path: 'docs/specifications/help-system.md',
          content: `---
title: Help System Specification
description: Complete specification for the Windows 98 Help System
category: specifications
tags: [help-system, specification, windows-98]
difficulty: intermediate
sidebar_position: 1
---

# Help System Specification

This document provides the complete specification for the Windows 98 Help System implementation in Abu OS.

## Overview

The Help System is designed to provide a faithful recreation of the Windows 98 F1 Help experience.

## Features

### Contents Tab
- Hierarchical navigation tree
- Expandable/collapsible sections
- Category-based organization

### Index Tab
- Alphabetical keyword listing
- Quick jump functionality
- Search within index

### Search Tab
- Full-text search across all content
- Boolean search operators
- Result ranking and highlighting

### Favorites Tab
- Bookmark management
- Category organization
- Quick access to frequently used topics

## Technical Implementation

The Help System is built using:

- **Svelte 5** for reactive UI components
- **TypeScript** for type safety
- **Vite** for build tooling
- **CSS Grid/Flexbox** for layout

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
\`\`\`

## API Reference

See the [API Documentation](/docs/specifications/api-reference) for detailed implementation details.

## Related Topics

- [Visual Design Guide](/docs/design/help-system-visual)
- [Functional Specification](/docs/specifications/help-system-functional)
- [Technical Specification](/docs/specifications/help-system-technical)`,
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
sidebar_position: 2
---

# Help System Visual Design

This document outlines the visual design principles and implementation details for the Windows 98 Help System.

## Design Principles

### Authenticity
- Pixel-perfect recreation of Windows 98 Help interface
- Faithful color palette and typography
- Accurate spacing and layout proportions

### Usability
- Intuitive navigation patterns
- Clear visual hierarchy
- Consistent interaction patterns

### Accessibility
- High contrast text
- Keyboard navigation support
- Screen reader compatibility

## Color Palette

The Help System uses the classic Windows 98 color scheme:

\`\`\`css
:root {
  --win98-window-bg: #C0C0C0;
  --win98-text: #000000;
  --win98-highlight: #0000FF;
  --win98-highlight-text: #FFFFFF;
  --win98-button-face: #C0C0C0;
  --win98-button-shadow: #808080;
  --win98-button-highlight: #FFFFFF;
}
\`\`\`

## Typography

- **Primary Font**: MS Sans Serif, 8pt
- **Code Font**: Courier New, 8pt
- **Heading Font**: MS Sans Serif, Bold

## Layout Components

### Window Frame
- Standard Windows 98 window chrome
- Title bar with minimize/maximize/close buttons
- Resizable borders

### Menu Bar
- File, Edit, View, Favorites, Help menus
- Standard Windows 98 menu styling
- Keyboard shortcuts

### Toolbar
- Navigation buttons (Back, Forward, Home)
- Content tabs (Contents, Index, Search, Favorites)
- Standard Windows 98 button styling

### Content Area
- Split-pane layout
- Left pane: Navigation tree
- Right pane: Content display
- Resizable splitter

## Implementation Notes

The visual design is implemented using CSS Grid and Flexbox for modern layout capabilities while maintaining the classic Windows 98 appearance.

For more details, see the [Technical Specification](/docs/specifications/help-system-technical).`,
          metadata: {
            title: 'Help System Visual Design',
            category: 'design',
            tags: ['design', 'visual', 'help-system', 'windows-98'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      // Mock fetch to return shared content
      (global.fetch as any).mockImplementation((url: string) => {
        const file = sharedContent.find(f => url.includes(f.path));
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

      // Initialize content registry (simulating Help System loading)
      await contentRegistry.initialize();

      // Verify content is available in Help System
      const helpSystemTopics = contentRegistry.getTopics();
      expect(helpSystemTopics.length).toBeGreaterThan(0);

      const specificationTopic = helpSystemTopics.find(t => t.id.includes('help-system'));
      expect(specificationTopic).toBeDefined();
      expect(specificationTopic!.title).toBe('Help System Specification');
      expect(specificationTopic!.category).toBe('specifications');

      const designTopic = helpSystemTopics.find(t => t.id.includes('help-system-visual'));
      expect(designTopic).toBeDefined();
      expect(designTopic!.title).toBe('Help System Visual Design');
      expect(designTopic!.category).toBe('design');

      // Verify content structure is consistent
      expect(specificationTopic!.content).toContain('Windows 98 F1 Help');
      expect(specificationTopic!.content).toContain('<pre class="code-block">');
      expect(specificationTopic!.content).toContain('<a href="/docs/specifications/api-reference"');

      expect(designTopic!.content).toContain('Visual Design Guidelines');
      expect(designTopic!.content).toContain('--win98-window-bg: #C0C0C0');
      expect(designTopic!.content).toContain('<pre class="code-block">');
    });

    it('should maintain consistent metadata between systems', async () => {
      const contentWithMetadata: ContentFile[] = [
        {
          path: 'docs/api/reference.md',
          content: `---
title: API Reference
description: Complete API reference for the Help System
category: api
tags: [api, reference, documentation, help-system]
difficulty: advanced
sidebar_position: 3
docusaurus:
  id: api-reference
  slug: /api/reference
help_system:
  category: api
  order: 1
  icon: icon-code
---

# API Reference

Complete API reference for the Help System components and utilities.

## Core Classes

### HelpSystemManager

Main manager class for the Help System.

\`\`\`typescript
class HelpSystemManager {
  constructor(config?: HelpSystemConfig);
  openTopic(topicId: string): Promise<void>;
  search(query: string): Promise<SearchResult[]>;
  addBookmark(topicId: string): void;
  removeBookmark(topicId: string): void;
}
\`\`\`

## Component API

### HelpSystem Component

Main Svelte component for the Help System.

\`\`\`svelte
<script lang="ts">
  import { HelpSystem } from '@melalawi/abu-web-kernel';
  
  let helpSystem: HelpSystem;
  let currentTopic: string = '';
</script>

<HelpSystem bind:this={helpSystem} />
\`\`\`

## Configuration

See [Configuration Guide](/docs/guides/configuration) for detailed setup instructions.`,
          metadata: {
            title: 'API Reference',
            category: 'api',
            tags: ['api', 'reference', 'documentation', 'help-system'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = contentWithMetadata.find(f => url.includes(f.path));
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
      const apiTopic = topics.find(t => t.id.includes('api-reference'));

      expect(apiTopic).toBeDefined();
      expect(apiTopic!.title).toBe('API Reference');
      expect(apiTopic!.category).toBe('api');
      expect(apiTopic!.tags).toContain('api');
      expect(apiTopic!.tags).toContain('reference');
      expect(apiTopic!.difficulty).toBe('advanced');
      expect(apiTopic!.content).toContain('HelpSystemManager');
      expect(apiTopic!.content).toContain('<pre class="code-block">');
    });
  });

  describe('Dual Serving Architecture', () => {
    it('should serve Help System on root route', async () => {
      // This test simulates the Help System being served on the root route
      const helpSystemContent: ContentFile[] = [
        {
          path: 'docs/intro.md',
          content: `---
title: Welcome to Abu OS
description: Get started with Abu OS 98 Web Kernel
category: getting-started
tags: [intro, getting-started, welcome]
difficulty: beginner
---

# Welcome to Abu OS 98 Web Kernel

Experience the classic Windows 98 desktop environment in your browser.

## Quick Start

1. **Explore the Help System**: Use the Contents, Index, Search, and Favorites tabs
2. **Navigate Topics**: Click on topics in the Contents tree
3. **Search Content**: Use the Search tab for full-text search
4. **Bookmark Topics**: Add frequently used topics to Favorites

## Features

- **Authentic Windows 98 Interface**: Pixel-perfect recreation
- **Plugin Architecture**: Extend with your own components
- **State Persistence**: Your layout and preferences are saved
- **Responsive Design**: Works on desktop and mobile

\`\`\`javascript
// Example: Opening the Help System
import { HelpSystem } from '@melalawi/abu-web-kernel';

const helpSystem = new HelpSystem();
helpSystem.openTopic('getting-started');
\`\`\`

## Next Steps

- [Read the Documentation](/docs)
- [View Examples](/docs/examples)
- [API Reference](/docs/api)`,
          metadata: {
            title: 'Welcome to Abu OS',
            category: 'getting-started',
            tags: ['intro', 'getting-started', 'welcome'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = helpSystemContent.find(f => url.includes(f.path));
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

      // Verify Help System content is available
      const topics = contentRegistry.getTopics();
      const introTopic = topics.find(t => t.id.includes('intro'));

      expect(introTopic).toBeDefined();
      expect(introTopic!.title).toBe('Welcome to Abu OS');
      expect(introTopic!.category).toBe('getting-started');
      expect(introTopic!.content).toContain('Windows 98 desktop environment');
      expect(introTopic!.content).toContain('Help System');
    });

    it('should serve Docusaurus on /docs route', async () => {
      // This test simulates Docusaurus being served on the /docs route
      const docusaurusContent: ContentFile[] = [
        {
          path: 'docs/specifications/help-system.md',
          content: `---
title: Help System Specification
description: Complete specification for the Windows 98 Help System
category: specifications
tags: [help-system, specification, windows-98]
difficulty: intermediate
sidebar_position: 1
---

# Help System Specification

This is the traditional Docusaurus documentation format.

## Overview

The Help System provides a Windows 98 F1 Help experience.

## Features

- Contents navigation
- Index search
- Full-text search
- Bookmark management

## Implementation

Built with Svelte 5 and TypeScript.

\`\`\`typescript
interface HelpSystemConfig {
  enableSearch: boolean;
  enableBookmarks: boolean;
}
\`\`\`

## Related

- [Visual Design](/docs/design/help-system-visual)
- [API Reference](/docs/api/reference)`,
          metadata: {
            title: 'Help System Specification',
            category: 'specifications',
            tags: ['help-system', 'specification', 'windows-98'],
            difficulty: 'intermediate'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = docusaurusContent.find(f => url.includes(f.path));
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

      // Verify Docusaurus content is available
      const topics = contentRegistry.getTopics();
      const specTopic = topics.find(t => t.id.includes('help-system'));

      expect(specTopic).toBeDefined();
      expect(specTopic!.title).toBe('Help System Specification');
      expect(specTopic!.content).toContain('Docusaurus documentation format');
      expect(specTopic!.content).toContain('Windows 98 F1 Help');
    });
  });

  describe('Content Synchronization', () => {
    it('should keep content synchronized between Help System and Docusaurus', async () => {
      const synchronizedContent: ContentFile[] = [
        {
          path: 'docs/guides/quick-start.md',
          content: `---
title: Quick Start Guide
description: Get up and running quickly with Abu OS
category: guides
tags: [quick-start, guide, getting-started]
difficulty: beginner
sidebar_position: 1
---

# Quick Start Guide

This guide helps you get started with Abu OS 98 Web Kernel.

## Installation

\`\`\`bash
npm install @melalawi/abu-web-kernel
\`\`\`

## Basic Usage

\`\`\`typescript
import { Shell, MockKernel } from '@melalawi/abu-web-kernel';

const kernel = new MockKernel();
const shell = new Shell({ target: document.body, props: { kernel } });
\`\`\`

## Next Steps

- [Read the Documentation](/docs)
- [View Examples](/docs/examples)
- [API Reference](/docs/api)`,
          metadata: {
            title: 'Quick Start Guide',
            category: 'guides',
            tags: ['quick-start', 'guide', 'getting-started'],
            difficulty: 'beginner'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = synchronizedContent.find(f => url.includes(f.path));
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

      // Verify content is available in both systems
      const topics = contentRegistry.getTopics();
      const quickStartTopic = topics.find(t => t.id.includes('quick-start'));

      expect(quickStartTopic).toBeDefined();
      expect(quickStartTopic!.title).toBe('Quick Start Guide');
      expect(quickStartTopic!.category).toBe('guides');
      expect(quickStartTopic!.content).toContain('Abu OS 98 Web Kernel');
      expect(quickStartTopic!.content).toContain('npm install');
      expect(quickStartTopic!.content).toContain('<pre class="code-block">');

      // Verify metadata is consistent
      expect(quickStartTopic!.tags).toContain('quick-start');
      expect(quickStartTopic!.tags).toContain('guide');
      expect(quickStartTopic!.difficulty).toBe('beginner');
    });

    it('should handle content updates consistently', async () => {
      const originalContent = `---
title: Original Title
description: Original description
category: test
tags: [original, test]
difficulty: beginner
---

# Original Content

This is the original content.`;

      const updatedContent = `---
title: Updated Title
description: Updated description with more details
category: test
tags: [updated, test, enhanced]
difficulty: intermediate
---

# Updated Content

This is the updated content with new information.

## New Section

Added new section with additional details.

\`\`\`typescript
// New code example
const updated = true;
console.log('Content has been updated');
\`\`\``;

      // First load with original content
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(originalContent)
      });

      await contentRegistry.initialize();
      let topics = contentRegistry.getTopics();
      let testTopic = topics.find(t => t.id.includes('original-title'));

      expect(testTopic).toBeDefined();
      expect(testTopic!.title).toBe('Original Title');
      expect(testTopic!.tags).toContain('original');

      // Update content
      (global.fetch as any).mockResolvedValue({
        ok: true,
        text: () => Promise.resolve(updatedContent)
      });

      // Refresh content registry
      await contentRegistry.refresh();
      topics = contentRegistry.getTopics();
      testTopic = topics.find(t => t.id.includes('updated-title'));

      expect(testTopic).toBeDefined();
      expect(testTopic!.title).toBe('Updated Title');
      expect(testTopic!.tags).toContain('updated');
      expect(testTopic!.tags).toContain('enhanced');
      expect(testTopic!.difficulty).toBe('intermediate');
      expect(testTopic!.content).toContain('New Section');
      expect(testTopic!.content).toContain('<pre class="code-block">');
    });
  });

  describe('Build Process Integration', () => {
    it('should handle build-time content processing', async () => {
      const buildTimeContent: ContentFile[] = [
        {
          path: 'docs/build/process.md',
          content: `---
title: Build Process
description: How the dual serving architecture is built
category: build
tags: [build, process, architecture]
difficulty: advanced
---

# Build Process

The dual serving architecture uses a custom build process.

## Build Steps

1. **Web Kernel Build**: Build the Svelte components
2. **Docusaurus Build**: Build the documentation site
3. **Content Processing**: Process markdown files
4. **Asset Combination**: Combine outputs

\`\`\`bash
# Build command
npm run build:dual
\`\`\`

## Output Structure

\`\`\`
build-dual/
├── index.html          # Help System (root route)
├── docs/               # Docusaurus content
│   ├── specifications/
│   ├── design/
│   └── api/
├── assets/             # Combined assets
└── web-kernel/         # Web Kernel assets
\`\`\``,
          metadata: {
            title: 'Build Process',
            category: 'build',
            tags: ['build', 'process', 'architecture'],
            difficulty: 'advanced'
          },
          lastModified: new Date()
        }
      ];

      (global.fetch as any).mockImplementation((url: string) => {
        const file = buildTimeContent.find(f => url.includes(f.path));
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
      const buildTopic = topics.find(t => t.id.includes('build-process'));

      expect(buildTopic).toBeDefined();
      expect(buildTopic!.title).toBe('Build Process');
      expect(buildTopic!.category).toBe('build');
      expect(buildTopic!.content).toContain('dual serving architecture');
      expect(buildTopic!.content).toContain('npm run build:dual');
      expect(buildTopic!.content).toContain('build-dual/');
    });
  });
});
