---
id: kernel-overview
title: Abu Web Kernel
sidebar_position: 1
---

# Abu Web Kernel

The Abu Web Kernel is a pixel-perfect Windows 98 desktop environment library for the web, built with Svelte 5.

## Overview

A self-contained library that provides complete Windows 98 UI components, stores, plugins, and kernel interfaces for building retro desktop applications in the browser.

## Quick Start

```bash
npm install @melalawi/abu-web-kernel
```

```javascript
import { Shell, MockKernel, mount } from '@melalawi/abu-web-kernel';
import '@melalawi/abu-web-kernel/styles';

const kernel = new MockKernel();
mount(Shell, {
  target: document.getElementById('app'),
  props: { kernel }
});
```

## Documentation Sections

- **Components** - Complete component library (shell, windows, controls, dialogs)
- **Plugins** - Plugin development and builtin plugins
- **Guides** - Usage guides for theming, state persistence, and testing
- **Reference** - Technical reference for types, stores, and utilities

## Features

- Pixel-perfect Windows 98 recreation
- Complete component library
- Plugin architecture
- State management and persistence
- TypeScript support
- Svelte 5 runes

