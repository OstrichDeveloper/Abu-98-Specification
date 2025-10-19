# Abu-Specification

> Comprehensive documentation for the Abu OS 98 ecosystem

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

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