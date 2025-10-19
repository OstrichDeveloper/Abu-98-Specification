#!/usr/bin/env node

/**
 * Build script for dual serving architecture
 * 
 * This script builds both the Web Kernel Help System and Docusaurus documentation,
 * then combines them into a single deployment structure.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT_DIR = path.resolve(__dirname, '..');
const WEB_KERNEL_DIR = path.resolve(ROOT_DIR, '../Abu-98-OS-Web-Kernel');
const BUILD_DIR = path.resolve(ROOT_DIR, 'build');
const WEB_KERNEL_BUILD_DIR = path.resolve(WEB_KERNEL_DIR, 'dist');

console.log('🚀 Starting dual serving architecture build...');

// Step 1: Build the Web Kernel
console.log('📦 Building Web Kernel...');
try {
  execSync('npm run build', { 
    cwd: WEB_KERNEL_DIR, 
    stdio: 'inherit' 
  });
  console.log('✅ Web Kernel build completed');
} catch (error) {
  console.error('❌ Web Kernel build failed:', error.message);
  process.exit(1);
}

// Step 2: Build Docusaurus
console.log('📚 Building Docusaurus documentation...');
try {
  execSync('npm run build', { 
    cwd: ROOT_DIR, 
    stdio: 'inherit' 
  });
  console.log('✅ Docusaurus build completed');
} catch (error) {
  console.error('❌ Docusaurus build failed:', error.message);
  process.exit(1);
}

// Step 3: Create combined build structure
console.log('🔧 Creating combined build structure...');

// Ensure build directory exists
if (!fs.existsSync(BUILD_DIR)) {
  fs.mkdirSync(BUILD_DIR, { recursive: true });
}

// Copy Web Kernel assets to build directory
const webKernelAssetsDir = path.resolve(BUILD_DIR, 'web-kernel');
if (fs.existsSync(webKernelAssetsDir)) {
  fs.rmSync(webKernelAssetsDir, { recursive: true, force: true });
}
fs.mkdirSync(webKernelAssetsDir, { recursive: true });

// Copy Web Kernel dist files
if (fs.existsSync(WEB_KERNEL_BUILD_DIR)) {
  copyDirectory(WEB_KERNEL_BUILD_DIR, webKernelAssetsDir);
}

// Step 4: Create main index.html for Web Kernel Help System
console.log('📄 Creating main index.html...');
const mainIndexHtml = createMainIndexHtml();
fs.writeFileSync(path.resolve(BUILD_DIR, 'index.html'), mainIndexHtml);

// Step 5: Create routing configuration
console.log('🛣️ Creating routing configuration...');
const routingConfig = createRoutingConfig();
fs.writeFileSync(path.resolve(BUILD_DIR, 'routing.json'), JSON.stringify(routingConfig, null, 2));

// Step 6: Create service worker for offline support
console.log('⚙️ Creating service worker...');
const serviceWorker = createServiceWorker();
fs.writeFileSync(path.resolve(BUILD_DIR, 'sw.js'), serviceWorker);

console.log('✅ Dual serving architecture build completed successfully!');
console.log('📁 Build output:', BUILD_DIR);
console.log('🌐 Main route: / (Web Kernel Help System)');
console.log('📚 Docs route: /docs/* (Docusaurus)');

/**
 * Copy directory recursively
 */
function copyDirectory(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Create main index.html for Web Kernel Help System
 */
function createMainIndexHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abu OS 98 Help System</title>
  <meta name="description" content="Windows 98 F1 Help System for Abu OS Documentation">
  
  <!-- Web Kernel Styles -->
  <link rel="stylesheet" href="/web-kernel/index.css">
  
  <!-- Help System Styles -->
  <style>
    body {
      margin: 0;
      padding: 0;
      font-family: 'MS Sans Serif', sans-serif;
      background: #c0c0c0;
      overflow: hidden;
    }
    
    #help-system-container {
      width: 100vw;
      height: 100vh;
      position: relative;
    }
    
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 14px;
      color: #000;
    }
  </style>
</head>
<body>
  <div id="help-system-container">
    <div class="loading">Loading Abu OS 98 Help System...</div>
  </div>
  
  <!-- Web Kernel Scripts -->
  <script type="module">
    import { AbuWebKernel } from '/web-kernel/index.js';
    
    // Initialize the Web Kernel
    const kernel = new AbuWebKernel({
      container: document.getElementById('help-system-container'),
      theme: 'windows98',
      enablePlugins: true,
      enableHelpSystem: true
    });
    
    // Initialize and open help system
    kernel.initialize().then(() => {
      kernel.openHelpSystem();
    }).catch((error) => {
      console.error('Failed to initialize Web Kernel:', error);
      document.querySelector('.loading').textContent = 'Failed to load help system';
    });
  </script>
</body>
</html>`;
}

/**
 * Create routing configuration
 */
function createRoutingConfig() {
  return {
    routes: [
      {
        path: '/',
        type: 'web-kernel',
        description: 'Web Kernel Help System (Windows 98 F1 Help)'
      },
      {
        path: '/docs/*',
        type: 'docusaurus',
        description: 'Docusaurus documentation'
      },
      {
        path: '/docusaurus',
        type: 'redirect',
        target: '/docs/intro',
        description: 'Redirect to Docusaurus intro'
      }
    ],
    fallback: {
      type: 'web-kernel',
      description: 'Default to Web Kernel Help System'
    }
  };
}

/**
 * Create service worker for offline support
 */
function createServiceWorker() {
  return `const CACHE_NAME = 'abu-help-system-v1';
const urlsToCache = [
  '/',
  '/web-kernel/index.js',
  '/web-kernel/index.css',
  '/docs/intro'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});`;
}
