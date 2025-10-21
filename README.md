# Abu-Specification

> Comprehensive documentation for the Abu OS 98 ecosystem

This website features a **dual serving architecture** that provides both traditional Docusaurus documentation and a Windows 98 F1 Help System demo.

## Architecture

- **Docusaurus Documentation** (`/`) - Main documentation website built with Docusaurus
- **Web Kernel Demo** (`/demo`) - Windows 98 F1 Help System demo built with the Abu Web Kernel

See [Dual Serving Architecture](./docs/metadata/dual-serving-architecture.md) for detailed information about the dual serving architecture.

## Installation

```bash
npm install
```

## Local Development

### Standard Development

```bash
npm run dev
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Development with Local Web Kernel

For development with the local Web Kernel (real-time testing):

```bash
# Setup local linking (one-time setup)
./scripts/setup-local-linking.sh

# Terminal 1: Web Kernel watch mode
cd ../Abu-98-OS-Web-Kernel
npm run dev

# Terminal 2: Abu-Specification dev server
cd Abu-Specification
npm run dev
```

See [Local Linking Development Workflow](./docs/development/local-linking.md) for detailed instructions.

## Build

### Traditional Docusaurus Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

### Dual Architecture Build

```bash
npm run build:dual
```

This command builds both the Web Kernel Help System and Docusaurus documentation, then combines them into a single deployment structure.

### Web Kernel Build Only

```bash
npm run build:web-kernel
```

This command builds only the Web Kernel component.

## Deployment

Using SSH:

```bash
USE_SSH=true npm run deploy
```

Not using SSH:

```bash
GIT_USER=<Your GitHub username> npm run deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Documentation Structure

This repository contains the centralized documentation for the Abu OS 98 ecosystem:

- **Design** - Visual design system, colors, typography, and component specifications
- **Specifications** - Technical architecture, APIs, and protocol documentation  
- **Web Kernel** - Core framework documentation and guides
- **Enterprise** - Desktop application documentation and deployment guides
- **Service** - Backend service documentation and operations guides

## Contributing

Documentation is maintained alongside the codebase. For updates and contributions, please refer to the individual repository documentation.