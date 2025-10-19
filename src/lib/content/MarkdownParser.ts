/**
 * Markdown Parser
 * 
 * Parses markdown content into HTML with Windows 98 Help System styling
 */

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
      const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
      if (headingMatch) {
        const level = headingMatch[1].length;
        const text = headingMatch[2].trim();
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

    return toc;
  }

  /**
   * Generate heading ID from text
   */
  private generateHeadingId(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  /**
   * Parse markdown to HTML
   */
  private parseMarkdownToHtml(content: string): string {
    let html = content;

    // Convert headings
    html = html.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, text) => {
      const level = hashes.length;
      const id = this.generateHeadingId(text);
      return `<h${level} id="${id}">${text}</h${level}>`;
    });

    // Convert bold text
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/__(.*?)__/g, '<strong>$1</strong>');

    // Convert italic text
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/_(.*?)_/g, '<em>$1</em>');

    // Convert inline code
    html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

    // Convert code blocks
    html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
      const lang = language || 'text';
      const highlightedCode = this.options.highlightCode ? 
        this.highlightCode(code, lang) : 
        this.escapeHtml(code);
      return `<pre class="code-block"><code class="language-${lang}">${highlightedCode}</code></pre>`;
    });

    // Convert blockquotes
    html = html.replace(/^>\s*(.+)$/gm, '<blockquote class="help-blockquote">$1</blockquote>');

    // Convert unordered lists
    html = html.replace(/^[\s]*[-*+]\s+(.+)$/gm, '<li class="help-list-item">$1</li>');
    html = html.replace(/(<li class="help-list-item">.*<\/li>)/s, '<ul class="help-list">$1</ul>');

    // Convert ordered lists
    html = html.replace(/^[\s]*\d+\.\s+(.+)$/gm, '<li class="help-list-item">$1</li>');
    html = html.replace(/(<li class="help-list-item">.*<\/li>)/s, '<ol class="help-list">$1</ol>');

    // Convert links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, url) => {
      const isExternal = this.isExternalLink(url);
      const className = isExternal ? 'help-link external' : 'help-link internal';
      const target = isExternal ? ' target="_blank" rel="noopener noreferrer"' : '';
      return `<a href="${url}" class="${className}"${target}>${text}</a>`;
    });

    // Convert images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
      return `<img src="${src}" alt="${alt}" class="help-image" />`;
    });

    // Convert horizontal rules
    html = html.replace(/^---$/gm, '<hr class="help-hr" />');

    // Convert paragraphs
    html = html.replace(/^(?!<[h1-6]|<ul|<ol|<li|<blockquote|<pre|<hr)(.+)$/gm, '<p class="help-paragraph">$1</p>');

    // Clean up empty paragraphs
    html = html.replace(/<p class="help-paragraph"><\/p>/g, '');

    // Add Windows 98 Help System styling classes
    html = this.addHelpSystemStyling(html);

    return html;
  }

  /**
   * Add Windows 98 Help System styling classes
   */
  private addHelpSystemStyling(html: string): string {
    // Add help system container
    html = `<div class="help-content win98-help-content">${html}</div>`;

    // Add specific styling for help system elements
    html = html.replace(/<h([1-6])/g, '<h$1 class="help-heading help-heading-$1"');
    html = html.replace(/<p class="help-paragraph"/g, '<p class="help-paragraph win98-text"');
    html = html.replace(/<ul class="help-list"/g, '<ul class="help-list win98-list"');
    html = html.replace(/<ol class="help-list"/g, '<ol class="help-list win98-list"');
    html = html.replace(/<li class="help-list-item"/g, '<li class="help-list-item win98-list-item"');
    html = html.replace(/<blockquote class="help-blockquote"/g, '<blockquote class="help-blockquote win98-blockquote"');
    html = html.replace(/<pre class="code-block"/g, '<pre class="code-block win98-code-block"');
    html = html.replace(/<code class="inline-code"/g, '<code class="inline-code win98-inline-code"');

    return html;
  }

  /**
   * Highlight code syntax (basic implementation)
   */
  private highlightCode(code: string, language: string): string {
    // Basic syntax highlighting for common languages
    const escapedCode = this.escapeHtml(code);
    
    if (language === 'javascript' || language === 'js') {
      return this.highlightJavaScript(escapedCode);
    } else if (language === 'typescript' || language === 'ts') {
      return this.highlightTypeScript(escapedCode);
    } else if (language === 'html') {
      return this.highlightHtml(escapedCode);
    } else if (language === 'css') {
      return this.highlightCss(escapedCode);
    } else if (language === 'json') {
      return this.highlightJson(escapedCode);
    }
    
    return escapedCode;
  }

  /**
   * Basic JavaScript highlighting
   */
  private highlightJavaScript(code: string): string {
    return code
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
  }

  /**
   * Basic TypeScript highlighting
   */
  private highlightTypeScript(code: string): string {
    return code
      .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|interface|type|enum)\b/g, '<span class="keyword">$1</span>')
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="literal">$1</span>')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/'([^']*)'/g, '<span class="string">\'$1\'</span>')
      .replace(/\/\/.*$/gm, '<span class="comment">$&</span>');
  }

  /**
   * Basic HTML highlighting
   */
  private highlightHtml(code: string): string {
    return code
      .replace(/&lt;(\/?[^&]+)&gt;/g, '<span class="tag">&lt;$1&gt;</span>')
      .replace(/(\w+)=/g, '<span class="attribute">$1</span>=')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
  }

  /**
   * Basic CSS highlighting
   */
  private highlightCss(code: string): string {
    return code
      .replace(/([.#]?[\w-]+)\s*{/g, '<span class="selector">$1</span> {')
      .replace(/(\w+):/g, '<span class="property">$1</span>:')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
  }

  /**
   * Basic JSON highlighting
   */
  private highlightJson(code: string): string {
    return code
      .replace(/"([^"]*)":/g, '<span class="key">"$1"</span>:')
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>')
      .replace(/\b(true|false|null)\b/g, '<span class="literal">$1</span>');
  }

  /**
   * Escape HTML characters
   */
  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  /**
   * Extract searchable text from content
   */
  private extractSearchableText(content: string): string {
    // Remove markdown syntax and extract plain text
    let text = content
      .replace(/^#{1,6}\s+/gm, '') // Remove heading markers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markers
      .replace(/__(.*?)__/g, '$1') // Remove bold markers
      .replace(/\*(.*?)\*/g, '$1') // Remove italic markers
      .replace(/_(.*?)_/g, '$1') // Remove italic markers
      .replace(/`([^`]+)`/g, '$1') // Remove inline code markers
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Remove link syntax, keep text
      .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1') // Remove image syntax, keep alt text
      .replace(/^>\s*/gm, '') // Remove blockquote markers
      .replace(/^[-*+]\s+/gm, '') // Remove list markers
      .replace(/^\d+\.\s+/gm, '') // Remove numbered list markers
      .replace(/^---$/gm, '') // Remove horizontal rules
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim();

    return text;
  }

  /**
   * Extract links from content
   */
  private extractLinks(content: string): { internalLinks: string[]; externalLinks: string[] } {
    const internalLinks: string[] = [];
    const externalLinks: string[] = [];

    const linkMatches = content.match(/\[([^\]]+)\]\(([^)]+)\)/g);
    if (linkMatches) {
      for (const match of linkMatches) {
        const urlMatch = match.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (urlMatch) {
          const url = urlMatch[2];
          if (this.isExternalLink(url)) {
            externalLinks.push(url);
          } else {
            internalLinks.push(url);
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
    const imageMatches = content.match(/!\[([^\]]*)\]\(([^)]+)\)/g);

    if (imageMatches) {
      for (const match of imageMatches) {
        const imageMatch = match.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (imageMatch) {
          images.push({
            src: imageMatch[2],
            alt: imageMatch[1] || '',
            title: imageMatch[1] || undefined
          });
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
    const codeMatches = content.match(/```(\w+)?\n([\s\S]*?)```/g);

    if (codeMatches) {
      for (const match of codeMatches) {
        const codeMatch = match.match(/```(\w+)?\n([\s\S]*?)```/);
        if (codeMatch) {
          codeBlocks.push({
            language: codeMatch[1] || 'text',
            code: codeMatch[2].trim()
          });
        }
      }
    }

    return codeBlocks;
  }

  /**
   * Extract metadata from content (basic implementation)
   */
  private extractMetadata(content: string): any {
    // This is a basic implementation - in a real scenario,
    // you'd want to extract more comprehensive metadata
    return {
      wordCount: content.split(/\s+/).length,
      hasCodeBlocks: /```/.test(content),
      hasImages: /!\[/.test(content),
      hasLinks: /\[.*?\]\(/.test(content)
    };
  }
}
