/**
 * Content Processing Types
 * 
 * Type definitions for runtime content processing in the Help System
 */

export interface ContentFile {
  /** File path relative to docs directory */
  path: string;
  /** File content as string */
  content: string;
  /** File metadata */
  metadata: ContentMetadata;
  /** Last modified timestamp */
  lastModified: Date;
}

export interface ContentMetadata {
  /** Document title */
  title: string;
  /** Document description */
  description?: string;
  /** Document category */
  category: string;
  /** Document tags */
  tags: string[];
  /** Document difficulty level */
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Document author */
  author?: string;
  /** Document version */
  version?: string;
  /** Document last updated */
  lastUpdated?: Date;
  /** Related documents */
  related?: string[];
  /** Document order in category */
  order?: number;
}

export interface ParsedContent {
  /** Original file path */
  path: string;
  /** Parsed HTML content */
  html: string;
  /** Document metadata */
  metadata: ContentMetadata;
  /** Table of contents */
  toc: TableOfContentsItem[];
  /** Searchable text content */
  searchableText: string;
  /** Internal links */
  internalLinks: string[];
  /** External links */
  externalLinks: string[];
  /** Images */
  images: ContentImage[];
  /** Code blocks */
  codeBlocks: CodeBlock[];
}

export interface TableOfContentsItem {
  /** Heading level (1-6) */
  level: number;
  /** Heading text */
  text: string;
  /** Heading ID */
  id: string;
  /** Children headings */
  children: TableOfContentsItem[];
}

export interface ContentImage {
  /** Image source path */
  src: string;
  /** Image alt text */
  alt: string;
  /** Image title */
  title?: string;
  /** Image width */
  width?: number;
  /** Image height */
  height?: number;
}

export interface CodeBlock {
  /** Code language */
  language: string;
  /** Code content */
  code: string;
  /** Line numbers */
  lineNumbers?: number[];
  /** Code block title */
  title?: string;
}

export interface ContentRegistry {
  /** All registered content files */
  files: Map<string, ContentFile>;
  /** Content organized by category */
  categories: Map<string, ContentFile[]>;
  /** Content organized by tags */
  tags: Map<string, ContentFile[]>;
  /** Search index */
  searchIndex: SearchIndex;
  /** Content statistics */
  stats: ContentStats;
}

export interface SearchIndex {
  /** Term to document mapping */
  terms: Map<string, Set<string>>;
  /** Document to terms mapping */
  documents: Map<string, Set<string>>;
  /** Term frequencies */
  frequencies: Map<string, Map<string, number>>;
}

export interface ContentStats {
  /** Total number of files */
  totalFiles: number;
  /** Total number of categories */
  totalCategories: number;
  /** Total number of tags */
  totalTags: number;
  /** Total content size in bytes */
  totalSize: number;
  /** Average file size */
  averageFileSize: number;
  /** Most common tags */
  commonTags: Array<{ tag: string; count: number }>;
  /** Category distribution */
  categoryDistribution: Array<{ category: string; count: number }>;
}

export interface ContentLoaderOptions {
  /** Base directory for content files */
  baseDir: string;
  /** File patterns to include */
  include: string[];
  /** File patterns to exclude */
  exclude: string[];
  /** Maximum file size in bytes */
  maxFileSize: number;
  /** Cache TTL in milliseconds */
  cacheTtl: number;
  /** Enable content validation */
  validateContent: boolean;
}

export interface MarkdownParserOptions {
  /** Enable HTML in markdown */
  allowHtml: boolean;
  /** Enable code highlighting */
  highlightCode: boolean;
  /** Enable table of contents generation */
  generateToc: boolean;
  /** Maximum heading level for TOC */
  maxTocLevel: number;
  /** Enable link validation */
  validateLinks: boolean;
  /** Base URL for relative links */
  baseUrl: string;
}

export interface TopicBuilderOptions {
  /** Default category for topics */
  defaultCategory: string;
  /** Default difficulty level */
  defaultDifficulty: 'beginner' | 'intermediate' | 'advanced';
  /** Enable automatic topic ordering */
  autoOrder: boolean;
  /** Topic ID generation strategy */
  idStrategy: 'path' | 'title' | 'custom';
}

export interface ContentProcessingError {
  /** Error type */
  type: 'parse' | 'validation' | 'load' | 'build';
  /** Error message */
  message: string;
  /** File path that caused the error */
  filePath: string;
  /** Error details */
  details?: any;
  /** Error timestamp */
  timestamp: Date;
}

export interface ContentProcessingResult {
  /** Successfully processed files */
  success: ParsedContent[];
  /** Failed files */
  errors: ContentProcessingError[];
  /** Processing statistics */
  stats: {
    totalFiles: number;
    successfulFiles: number;
    failedFiles: number;
    processingTime: number;
  };
}

// Type guards
export function isContentFile(obj: any): obj is ContentFile {
  return obj && 
    typeof obj.path === 'string' &&
    typeof obj.content === 'string' &&
    obj.metadata &&
    obj.lastModified instanceof Date;
}

export function isParsedContent(obj: any): obj is ParsedContent {
  return obj &&
    typeof obj.path === 'string' &&
    typeof obj.html === 'string' &&
    obj.metadata &&
    Array.isArray(obj.toc) &&
    typeof obj.searchableText === 'string';
}

export function isContentMetadata(obj: any): obj is ContentMetadata {
  return obj &&
    typeof obj.title === 'string' &&
    typeof obj.category === 'string' &&
    Array.isArray(obj.tags) &&
    ['beginner', 'intermediate', 'advanced'].includes(obj.difficulty);
}

