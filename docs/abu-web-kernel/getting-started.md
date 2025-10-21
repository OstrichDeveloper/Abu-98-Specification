---
id: getting-started
title: Getting Started
sidebar_position: 2
---

# Getting Started with Abu Web Kernel

Quick guide to get up and running with the Abu Web Kernel library.

## Installation

```bash
npm install @melalawi/abu-web-kernel
```

## Basic Usage

```javascript
import { Shell, MockKernel, mount } from '@melalawi/abu-web-kernel';
import '@melalawi/abu-web-kernel/styles';

// Create a kernel instance
const kernel = new MockKernel();

// Mount the shell
mount(Shell, {
  target: document.getElementById('app'),
  props: {
    kernel,
    plugins: []
  }
});
```

## Development

```bash
# Clone the repository
git clone https://github.com/melalawi/Abu-98-OS-Web-Kernel
cd Abu-98-OS-Web-Kernel

# Install dependencies
npm install

# Run tests
npm run test:all

# Build the library
npm run build

# Development mode
npm run dev
```

## Testing

Run the complete test suite:

```bash
npm run lint       # Run linting
npm run test:unit  # Run unit tests
npm run test:integration  # Run integration tests
npm run test:all   # Run all tests
```

## Local Development with Abu-Specification

For development with Abu-Specification, use local linking:

```bash
# In Abu-98-OS-Web-Kernel directory
npm link

# In Abu-Specification directory  
npm link @melalawi/abu-web-kernel
```

This allows real-time development and testing of kernel changes in the specification site.

## Next Steps

- Explore the [Component Library](../design/components/)
- Learn about [Plugin Development](./guides/plugin-development.md)
- Read the [Testing Guide](./guides/testing-guide.md)

