/**
 * MarkdownParser Unit Tests
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { MarkdownParser } from '../../../src/lib/content/MarkdownParser.js';
import type { ParsedContent } from '../../../src/lib/content/types.js';

describe('MarkdownParser', () => {
  let parser: MarkdownParser;

  beforeEach(() => {
    parser = new MarkdownParser({
      allowHtml: true,
      highlightCode: true,
      generateToc: true,
      maxTocLevel: 3,
      validateLinks: true,
      baseUrl: '/docs'
    });
  });

  describe('constructor', () => {
    it('should initialize with default options', () => {
      const defaultParser = new MarkdownParser();
      expect(defaultParser).toBeInstanceOf(MarkdownParser);
    });

    it('should merge provided options with defaults', () => {
      const customParser = new MarkdownParser({
        maxTocLevel: 4,
        baseUrl: '/custom'
      });
      expect(customParser).toBeInstanceOf(MarkdownParser);
    });
  });

  describe('parse', () => {
    it('should parse basic markdown content', () => {
      const content = `# Test Document

This is a test document with **bold** and *italic* text.

## Section 1

Some content here.

### Subsection

More content.`;

      const result = parser.parse(content, 'test.md');

      expect(result.path).toBe('test.md');
      expect(result.html).toContain('<h1 class="help-heading help-heading-1"><a id="test-document" class="anchor" aria-hidden="true" href="#test-document"></a>Test Document</h1>');
      expect(result.html).toContain('<b>bold</b>');
      expect(result.html).toContain('<em>italic</em>');
      expect(result.html).toContain('<h2 class="help-heading help-heading-2"><a id="section-1" class="anchor" aria-hidden="true" href="#section-1"></a>Section 1</h2>');
      expect(result.html).toContain('<h3 class="help-heading help-heading-3"><a id="subsection" class="anchor" aria-hidden="true" href="#subsection"></a>Subsection</h3>');
      expect(result.searchableText).toContain('Test Document');
      expect(result.searchableText).toContain('bold');
      expect(result.searchableText).toContain('italic');
    });

    it('should remove frontmatter before parsing', () => {
      const content = `---
title: Test Document
description: A test document
---

# Test Document

This is the content.`;

      const result = parser.parse(content, 'test.md');

      expect(result.html).not.toContain('---');
      expect(result.html).toContain('<h1 class="help-heading help-heading-1"><a id="test-document" class="anchor" aria-hidden="true" href="#test-document"></a>Test Document</h1>');
    });

    it('should generate table of contents', () => {
      const content = `# Main Title

## Section 1

### Subsection 1.1

## Section 2

### Subsection 2.1

#### Subsection 2.1.1`;

      const result = parser.parse(content, 'test.md');

      expect(result.toc).toHaveLength(1); // Main Title
      expect(result.toc[0].text).toBe('Main Title');
      expect(result.toc[0].level).toBe(1);
      expect(result.toc[0].children).toHaveLength(2); // Section 1 and Section 2
      expect(result.toc[0].children[0].text).toBe('Section 1');
      expect(result.toc[0].children[0].children).toHaveLength(1); // Subsection 1.1
    });

    it('should respect maxTocLevel setting', () => {
      const limitedParser = new MarkdownParser({ maxTocLevel: 2 });
      const content = `# Title

## Section

### Subsection

#### Sub-subsection`;

      const result = limitedParser.parse(content, 'test.md');

      // Should only include h1 and h2, not h3 or h4
      const allTocItems = getAllTocItems(result.toc);
      const levels = allTocItems.map(item => item.level);
      expect(Math.max(...levels)).toBeLessThanOrEqual(2);
    });

    it('should extract internal and external links', () => {
      const content = `# Test Document

[Internal Link](/docs/internal)
[External Link](https://example.com)
[Email Link](mailto:test@example.com)`;

      const result = parser.parse(content, 'test.md');

      expect(result.internalLinks).toContain('/docs/internal');
      expect(result.externalLinks).toContain('https://example.com');
      expect(result.externalLinks).toContain('mailto:test@example.com');
    });

    it('should extract images', () => {
      const content = `# Test Document

![Alt text](/images/test.png "Title")
![Another image](/images/another.jpg)`;

      const result = parser.parse(content, 'test.md');

      expect(result.images).toHaveLength(2);
      expect(result.images[0].src).toBe('/images/test.png');
      expect(result.images[0].alt).toBe('Alt text');
      expect(result.images[0].title).toBe('Title');
      expect(result.images[1].src).toBe('/images/another.jpg');
      expect(result.images[1].alt).toBe('Another image');
    });

    it('should extract code blocks', () => {
      const content = `# Test Document

\`\`\`javascript
function test() {
  return "hello";
}
\`\`\`

\`\`\`python
def test():
    return "hello"
\`\`\``;

      const result = parser.parse(content, 'test.md');

      expect(result.codeBlocks).toHaveLength(2);
      expect(result.codeBlocks[0].language).toBe('javascript');
      expect(result.codeBlocks[0].code).toContain('return "hello";');
      expect(result.codeBlocks[1].language).toBe('python');
      expect(result.codeBlocks[1].code).toContain('def test():');
    });

    it('should extract searchable text', () => {
      const content = `# Test Document

This is **bold** text and *italic* text.

\`\`\`javascript
// This is code
function test() {}
\`\`\`

[Link text](https://example.com)`;

      const result = parser.parse(content, 'test.md');

      expect(result.searchableText).toContain('Test Document');
      expect(result.searchableText).toContain('bold');
      expect(result.searchableText).toContain('italic');
      expect(result.searchableText).toContain('Link text');
      expect(result.searchableText).not.toContain('```');
      expect(result.searchableText).not.toContain('**');
      expect(result.searchableText).not.toContain('*');
    });
  });

  describe('parseMarkdownToHtml', () => {
    it('should convert headings to HTML', () => {
      const content = `# Heading 1
## Heading 2
### Heading 3`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<h1 class="help-heading help-heading-1"><a id="heading-1" class="anchor" aria-hidden="true" href="#heading-1"></a>Heading 1</h1>');
      expect(html).toContain('<h2 class="help-heading help-heading-2"><a id="heading-2" class="anchor" aria-hidden="true" href="#heading-2"></a>Heading 2</h2>');
      expect(html).toContain('<h3 class="help-heading help-heading-3"><a id="heading-3" class="anchor" aria-hidden="true" href="#heading-3"></a>Heading 3</h3>');
    });

    it('should convert bold and italic text', () => {
      const content = `**Bold text** and *italic text*`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<b>Bold text</b>');
      expect(html).toContain('<em>italic text</em>');
    });

    it('should convert inline code', () => {
      const content = `This is \`inline code\` text.`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<code class="inline-code win98-inline-code">inline code</code>');
    });

    it('should convert code blocks', () => {
      const content = `\`\`\`javascript
function test() {
  return "hello";
}
\`\`\``;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<pre class="code-block win98-code-block">');
      expect(html).toContain('<code class="language-javascript">');
      expect(html).toContain('function test()');
    });

    it('should convert blockquotes', () => {
      const content = `> This is a blockquote`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<blockquote class="help-blockquote win98-blockquote">');
      expect(html).toContain('This is a blockquote');
    });

    it('should convert unordered lists', () => {
      const content = `- Item 1
- Item 2
- Item 3`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<ul class="help-list win98-list">');
      expect(html).toContain('<li class="help-list-item win98-list-item">Item 1</li>');
      expect(html).toContain('<li class="help-list-item win98-list-item">Item 2</li>');
      expect(html).toContain('<li class="help-list-item win98-list-item">Item 3</li>');
    });

    it('should convert ordered lists', () => {
      const content = `1. First item
2. Second item
3. Third item`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<ol class="help-list win98-list">');
      expect(html).toContain('<li class="help-list-item win98-list-item">First item</li>');
      expect(html).toContain('<li class="help-list-item win98-list-item">Second item</li>');
      expect(html).toContain('<li class="help-list-item win98-list-item">Third item</li>');
    });

    it('should convert links', () => {
      const content = `[Internal Link](/docs/internal)
[External Link](https://example.com)`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<a href="/docs/internal">Internal Link</a>');
      expect(html).toContain('<a href="https://example.com">External Link</a>');
    });

    it('should convert images', () => {
      const content = `![Alt text](/images/test.png "Title")`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<img src="/images/test.png" alt="Alt text" title="Title">');
    });

    it('should convert horizontal rules', () => {
      const content = `Content above

---

Content below`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<hr>');
    });

    it('should convert paragraphs', () => {
      const content = `This is a paragraph.

This is another paragraph.`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<p class="help-paragraph win98-text">This is a paragraph.</p>');
      expect(html).toContain('<p class="help-paragraph win98-text">This is another paragraph.</p>');
    });

    it('should add help system styling classes', () => {
      const content = `# Test Document

This is content.`;

      const html = (parser as any).parseMarkdownToHtml(content);

      expect(html).toContain('<div class="help-content win98-help-content">');
      expect(html).toContain('<h1 class="help-heading help-heading-1"');
      expect(html).toContain('<p class="help-paragraph win98-text"');
    });
  });

  describe('generateTableOfContents', () => {
    it('should generate correct TOC structure', () => {
      const content = `# Main Title

## Section 1

### Subsection 1.1

### Subsection 1.2

## Section 2

### Subsection 2.1`;

      const toc = (parser as any).generateTableOfContents(content);

      expect(toc).toHaveLength(1);
      expect(toc[0].text).toBe('Main Title');
      expect(toc[0].level).toBe(1);
      expect(toc[0].id).toBe('main-title');
      expect(toc[0].children).toHaveLength(2);
      expect(toc[0].children[0].text).toBe('Section 1');
      expect(toc[0].children[0].children).toHaveLength(2);
      expect(toc[0].children[1].text).toBe('Section 2');
      expect(toc[0].children[1].children).toHaveLength(1);
    });

    it('should respect maxTocLevel', () => {
      const limitedParser = new MarkdownParser({ maxTocLevel: 2 });
      const content = `# Title

## Section

### Subsection

#### Sub-subsection`;

      const toc = (limitedParser as any).generateTableOfContents(content);

      const allItems = getAllTocItems(toc);
      const maxLevel = Math.max(...allItems.map(item => item.level));
      expect(maxLevel).toBeLessThanOrEqual(2);
    });
  });


  describe('utility methods', () => {
    it('should generate heading IDs correctly', () => {
      const id1 = (parser as any).generateHeadingId('Test Document');
      const id2 = (parser as any).generateHeadingId('API Reference & Examples');
      const id3 = (parser as any).generateHeadingId('Getting Started (v2.0)');

      expect(id1).toBe('test-document');
      expect(id2).toBe('api-reference-examples');
      expect(id3).toBe('getting-started-v20');
    });


    it('should identify external links correctly', () => {
      expect((parser as any).isExternalLink('https://example.com')).toBe(true);
      expect((parser as any).isExternalLink('http://example.com')).toBe(true);
      expect((parser as any).isExternalLink('mailto:test@example.com')).toBe(true);
      expect((parser as any).isExternalLink('tel:+1234567890')).toBe(true);
      expect((parser as any).isExternalLink('/docs/internal')).toBe(false);
      expect((parser as any).isExternalLink('./relative')).toBe(false);
    });
  });

  // Helper method for tests
  function getAllTocItems(toc: any[]): any[] {
    const items: any[] = [];
    for (const item of toc) {
      items.push(item);
      if (item.children) {
        items.push(...getAllTocItems(item.children));
      }
    }
    return items;
  }
});
