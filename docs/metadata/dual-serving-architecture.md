---
id: dual-serving-architecture
title: Dual Serving Architecture
---

# Dual Serving Architecture

## Overview

The Abu-Specification project implements a **dual serving architecture** that provides both a Windows 98 F1 Help System experience and traditional Docusaurus documentation.

## Architecture Components

### 1. Docusaurus Documentation (`/`)
- **Purpose**: Main documentation website
- **Technology**: Docusaurus with MDX
- **Content**: Comprehensive documentation for the Abu OS ecosystem
- **Features**:
  - Search functionality
  - Responsive design
  - Markdown-based content
  - Navigation to demo

### 2. Web Kernel Demo (`/demo`)
- **Purpose**: Windows 98 F1 Help System demo
- **Technology**: Built with the Abu Web Kernel
- **Entry Point**: `src/pages/demo.tsx` → `src/components/HelpSystem.tsx`
- **Features**: 
  - Authentic Windows 98 desktop environment
  - Help system with topic navigation
  - Plugin-based architecture

## Implementation Details

### Build Process

The dual architecture is integrated into the single `npm run build` command through:

1. **Docusaurus Plugin**: `src/plugins/dual-architecture-plugin.js`
   - Automatically builds Web Kernel if available
   - Copies Web Kernel assets to build directory
   - Creates main index.html for help system
   - Generates routing configuration
   - Creates service worker for offline support

2. **Web Kernel Integration**:
   - Uses npm link to connect to local Web Kernel development
   - Falls back to published package if local not available
   - Copies assets from either build directory or linked package

### Routing Strategy

- **Root Route (`/`)**: Redirects to Docusaurus documentation
- **Documentation Routes (`/docs/*`)**: Serves Docusaurus documentation
- **Demo Route (`/demo`)**: Serves Web Kernel Help System demo
- **Fallback**: Documentation with link to demo

### Development Workflow

1. **Standard Development**: `npm run dev` - Docusaurus only
2. **With Web Kernel**: 
   - Link Web Kernel: `npm link @melalawi/abu-web-kernel`
   - Start dev server: `npm run dev`
   - Web Kernel changes reflect in real-time

## Benefits

1. **Primary Documentation**: Main site serves comprehensive technical documentation
2. **Interactive Demo**: Demo provides hands-on Windows 98 experience
3. **Authentic Experience**: Demo shows genuine Windows 98 F1 help interface
4. **Single Deployment**: Both systems served from same build
5. **Easy Navigation**: Clear separation with navigation between both interfaces

## Technical Considerations

- **Bundle Size**: Web Kernel adds ~50KB gzipped
- **Performance**: Lazy loading of Web Kernel components
- **Compatibility**: Demo accessible via navigation from main docs
- **SEO**: Documentation routes are fully crawlable
- **Accessibility**: Both systems maintain accessibility standards

## Future Enhancements

- **Progressive Enhancement**: Start with docs, enhance with Web Kernel
- **User Preferences**: Remember user's preferred interface
- **Hybrid Navigation**: Cross-linking between systems
- **Offline Sync**: Sync help topics with documentation updates
