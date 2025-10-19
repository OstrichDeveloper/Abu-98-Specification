/**
 * Markdown Parser
 * 
 * Parses markdown content into HTML with Windows 98 Help System styling
 */

import markdownWasm from 'markdown-wasm';
import type {
  ParsedContent,
  TableOfContentsItem,
  ContentImage,
  CodeBlock,
  MarkdownParserOptions
} from './types.js';

export class MarkdownParser {
  private options: MarkdownParserOptions;

  constructor(options: Partial<MarkdownParserOptions> = {}) {
    this.options = {
      allowHtml: true,
      highlightCode: true,
      generateToc: true,
      maxTocLevel: 3,
      validateLinks: true,
      baseUrl: '/docs',
      ...options
    };
  }

  /**
   * Parse markdown content into HTML
   */
  parse(content: string, filePath: string): ParsedContent {
    // Remove frontmatter if present
    const cleanContent = this.removeFrontmatter(content);
    
    // Generate table of contents
    const toc = this.options.generateToc ? this.generateTableOfContents(cleanContent) : [];
    
    // Parse markdown to HTML
    const html = this.parseMarkdownToHtml(cleanContent);
    
    // Extract searchable text
    const searchableText = this.extractSearchableText(cleanContent);
    
    // Extract links
    const { internalLinks, externalLinks } = this.extractLinks(cleanContent);
    
    // Extract images
    const images = this.extractImages(cleanContent);
    
    // Extract code blocks
    const codeBlocks = this.extractCodeBlocks(cleanContent);

    return {
      path: filePath,
      html,
      metadata: this.extractMetadata(content),
      toc,
      searchableText,
      internalLinks,
      externalLinks,
      images,
      codeBlocks
    };
  }

  /**
   * Remove YAML frontmatter from content
   */
  private removeFrontmatter(content: string): string {
    const lines = content.split('\n');
    if (lines[0] === '---') {
      const endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
      if (endIndex > 0) {
        return lines.slice(endIndex + 1).join('\n');
      }
    }
    return content;
  }

  /**
   * Generate table of contents from markdown content
   */
  private generateTableOfContents(content: string): TableOfContentsItem[] {
    const toc: TableOfContentsItem[] = [];
    const lines = content.split('\n');
    const stack: TableOfContentsItem[] = [];

    for (const line of lines) {
      // Check if line starts with # characters (heading)
      if (line.startsWith('#')) {
        let level = 0;
        let text = '';
        
        // Count # characters to determine level
        for (let i = 0; i < line.length; i++) {
          if (line[i] === '#') {
            level++;
          } else {
            break;
          }
        }
        
        // Extract text after # characters and whitespace
        if (level > 0 && level <= 6) {
          text = line.substring(level).trim();
          const id = this.generateHeadingId(text);

          if (level <= this.options.maxTocLevel) {
            const item: TableOfContentsItem = {
              level,
              text,
              id,
              children: []
            };

            // Find the correct parent in the stack
            while (stack.length > 0 && stack[stack.length - 1].level >= level) {
              stack.pop();
            }

            if (stack.length === 0) {
              toc.push(item);
            } else {
              stack[stack.length - 1].children.push(item);
            }

            stack.push(item);
          }
        }
      }
    }

    return toc;
  }

  /**
   * Generate heading ID from text
   */
  private generateHeadingId(text: string): string {
    return text
      .toLowerCase()
      .split('')
      .map(char => {
        if (char >= 'a' && char <= 'z') return char;
        if (char >= '0' && char <= '9') return char;
        if (char === ' ') return '-';
        if (char === '-') return '-';
        return '';
      })
      .join('')
      .split('-')
      .filter(part => part.length > 0)
      .join('-');
  }

  /**
   * Parse markdown to HTML using markdown-wasm
   */
  private parseMarkdownToHtml(content: string): string {
    // Use markdown-wasm to parse markdown to HTML
    const html = markdownWasm.parse(content, {
      format: 'html',
      parseFlags: markdownWasm.ParseFlags.DEFAULT
    });

    // Add Windows 98 Help System styling classes
    return this.addHelpSystemStyling(html);
  }

  /**
   * Add Windows 98 Help System styling classes
   */
  private addHelpSystemStyling(html: string): string {
    // Add help system container
    let styledHtml = `<div class="help-content win98-help-content">${html}</div>`;

    // Add specific styling for help system elements using string replacement
    styledHtml = styledHtml.split('<h1').join('<h1 class="help-heading help-heading-1"');
    styledHtml = styledHtml.split('<h2').join('<h2 class="help-heading help-heading-2"');
    styledHtml = styledHtml.split('<h3').join('<h3 class="help-heading help-heading-3"');
    styledHtml = styledHtml.split('<h4').join('<h4 class="help-heading help-heading-4"');
    styledHtml = styledHtml.split('<h5').join('<h5 class="help-heading help-heading-5"');
    styledHtml = styledHtml.split('<h6').join('<h6 class="help-heading help-heading-6"');
    
    styledHtml = styledHtml.split('<p>').join('<p class="help-paragraph win98-text">');
    styledHtml = styledHtml.split('<ul>').join('<ul class="help-list win98-list">');
    styledHtml = styledHtml.split('<ol>').join('<ol class="help-list win98-list">');
    styledHtml = styledHtml.split('<li>').join('<li class="help-list-item win98-list-item">');
    styledHtml = styledHtml.split('<blockquote>').join('<blockquote class="help-blockquote win98-blockquote">');
    styledHtml = styledHtml.split('<pre>').join('<pre class="code-block win98-code-block">');
    styledHtml = styledHtml.split('<code>').join('<code class="inline-code win98-inline-code">');

    return styledHtml;
  }


  /**
   * Extract searchable text from content
   */
  private extractSearchableText(content: string): string {
    // Parse markdown to HTML first, then extract text content
    const html = markdownWasm.parse(content, {
      format: 'html',
      parseFlags: markdownWasm.ParseFlags.DEFAULT
    });
    
    // Simple HTML tag removal for text extraction
    let text = html
      .split('<')
      .map(part => part.includes('>') ? part.split('>').slice(1).join('>') : part)
      .join('')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .join(' ');

    return text;
  }

  /**
   * Extract links from content
   */
  private extractLinks(content: string): { internalLinks: string[]; externalLinks: string[] } {
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    // Parse to HTML and extract links from href attributes
    const html = markdownWasm.parse(content, {
      format: 'html',
      parseFlags: markdownWasm.ParseFlags.DEFAULT
    });

    // Extract href attributes from anchor tags
    const lines = html.split('\n');
    for (const line of lines) {
      if (line.includes('<a href=')) {
        const hrefStart = line.indexOf('href="');
        if (hrefStart !== -1) {
          const hrefEnd = line.indexOf('"', hrefStart + 6);
          if (hrefEnd !== -1) {
            const url = line.substring(hrefStart + 6, hrefEnd);
            if (this.isExternalLink(url)) {
              externalLinks.push(url);
            } else {
              internalLinks.push(url);
            }
          }
        }
      }
    }

    return { internalLinks, externalLinks };
  }

  /**
   * Check if a link is external
   */
  private isExternalLink(url: string): boolean {
    return url.startsWith('http://') || 
           url.startsWith('https://') || 
           url.startsWith('mailto:') || 
           url.startsWith('tel:');
  }

  /**
   * Extract images from content
   */
  private extractImages(content: string): ContentImage[] {
    const images: ContentImage[] = [];

    // Parse to HTML and extract images from img tags
    const html = markdownWasm.parse(content, {
      format: 'html',
      parseFlags: markdownWasm.ParseFlags.DEFAULT
    });

    // Extract src and alt attributes from img tags
    const lines = html.split('\n');
    for (const line of lines) {
      if (line.includes('<img')) {
        const srcStart = line.indexOf('src="');
        const altStart = line.indexOf('alt="');
        const titleStart = line.indexOf('title="');
        
        let src = '';
        let alt = '';
        let title: string | undefined = undefined;
        
        if (srcStart !== -1) {
          const srcEnd = line.indexOf('"', srcStart + 5);
          if (srcEnd !== -1) {
            src = line.substring(srcStart + 5, srcEnd);
          }
        }
        
        if (altStart !== -1) {
          const altEnd = line.indexOf('"', altStart + 5);
          if (altEnd !== -1) {
            alt = line.substring(altStart + 5, altEnd);
          }
        }
        
        if (titleStart !== -1) {
          const titleEnd = line.indexOf('"', titleStart + 7);
          if (titleEnd !== -1) {
            title = line.substring(titleStart + 7, titleEnd);
          }
        }
        
        if (src) {
          images.push({ src, alt, title });
        }
      }
    }

    return images;
  }

  /**
   * Extract code blocks from content
   */
  private extractCodeBlocks(content: string): CodeBlock[] {
    const codeBlocks: CodeBlock[] = [];
    const lines = content.split('\n');
    let inCodeBlock = false;
    let currentCode = '';
    let currentLanguage = 'text';
    
    for (const line of lines) {
      // Check for code block start
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // End of code block
          inCodeBlock = false;
          if (currentCode.trim()) {
            codeBlocks.push({
              language: currentLanguage,
              code: currentCode.trim()
            });
          }
          currentCode = '';
          currentLanguage = 'text';
        } else {
          // Start of code block
          inCodeBlock = true;
          const language = line.substring(3).trim();
          currentLanguage = language || 'text';
          currentCode = '';
        }
      } else if (inCodeBlock) {
        currentCode += line + '\n';
      }
    }

    return codeBlocks;
  }

  /**
   * Extract metadata from content (basic implementation)
   */
  private extractMetadata(content: string): any {
    const metadata: any = {};
    
    // Extract frontmatter if present
    const lines = content.split('\n');
    if (lines[0] === '---') {
      const endIndex = lines.findIndex((line, index) => index > 0 && line === '---');
      if (endIndex > 0) {
        const frontmatterLines = lines.slice(1, endIndex);
        for (const line of frontmatterLines) {
          const match = line.match(/^(\w+):\s*(.+)$/);
          if (match) {
            const [, key, value] = match;
            // Parse arrays
            if (value.startsWith('[') && value.endsWith(']')) {
              metadata[key] = value
                .slice(1, -1)
                .split(',')
                .map(v => v.trim())
                .filter(v => v.length > 0);
            } else {
              metadata[key] = value;
            }
          }
        }
      }
    }
    
    // Add computed metadata
    metadata.wordCount = content.split(/\s+/).length;
    metadata.hasCodeBlocks = /```/.test(content);
    metadata.hasImages = /!\[/.test(content);
    metadata.hasLinks = /\[.*?\]\(/.test(content);
    
    return metadata;
  }
}
