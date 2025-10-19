/**
 * Content Processing Module
 * 
 * Main entry point for runtime content processing in the Help System
 */

// Export all types
export type {
  ContentFile,
  ContentMetadata,
  ParsedContent,
  TableOfContentsItem,
  ContentImage,
  CodeBlock,
  ContentRegistry as IContentRegistry,
  SearchIndex,
  ContentStats,
  ContentLoaderOptions,
  MarkdownParserOptions,
  TopicBuilderOptions,
  ContentProcessingError,
  ContentProcessingResult
} from './types.js';

// Export all classes
export { ContentLoader } from './ContentLoader.js';
export { MarkdownParser } from './MarkdownParser.js';
export { TopicBuilder } from './TopicBuilder.js';
export { ContentRegistry } from './ContentRegistry.js';

// Export type guards
export {
  isContentFile,
  isParsedContent,
  isContentMetadata
} from './types.js';

// Export utility functions
export {
  createContentRegistry,
  processContentFiles,
  buildHelpSystemContent
} from './utils.js';

// Export constants
export const CONTENT_PROCESSING_VERSION = '1.0.0';

export const CONTENT_PROCESSING_CONSTANTS = {
  DEFAULT_CACHE_TTL: 5 * 60 * 1000, // 5 minutes
  DEFAULT_MAX_FILE_SIZE: 1024 * 1024, // 1MB
  DEFAULT_MAX_TOC_LEVEL: 3,
  DEFAULT_SEARCH_LIMIT: 10,
  SUPPORTED_FILE_TYPES: ['.md', '.mdx'],
  SUPPORTED_LANGUAGES: ['javascript', 'typescript', 'html', 'css', 'json', 'markdown']
} as const;
