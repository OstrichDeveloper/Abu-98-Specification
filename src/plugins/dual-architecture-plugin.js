/**
 * Docusaurus Plugin for Dual Architecture Integration
 * 
 * This plugin integrates the Web Kernel Help System with Docusaurus documentation
 * during the build process, creating a unified deployment structure.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

module.exports = function dualArchitecturePlugin(context, options) {
  return {
    name: 'dual-architecture-plugin',
    
    async loadContent() {
      // Copy Web Kernel assets for development and test modes
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
        console.log('🔧 Setting up Web Kernel assets for development/test...');
        await copyWebKernelAssetsForDev(context.siteConfig.baseUrl);
      }
    },
    
    async postBuild({ siteDir, routesPaths, outDir }) {
      console.log('🚀 Starting dual architecture integration...');
      
      const ROOT_DIR = siteDir;
      const WEB_KERNEL_DIR = path.resolve(ROOT_DIR, '../Abu-98-OS-Web-Kernel');
      const WEB_KERNEL_BUILD_DIR = path.resolve(WEB_KERNEL_DIR, 'dist');
      const WEB_KERNEL_LINKED_DIR = path.resolve(ROOT_DIR, 'node_modules/@melalawi/abu-web-kernel');
      const baseUrl = context.siteConfig.baseUrl;
      
      // Step 1: Build the Web Kernel if it exists
      
      if (fs.existsSync(WEB_KERNEL_DIR)) {
        console.log('📦 Building Web Kernel...');
        try {
          execSync('npm run build', { 
            cwd: WEB_KERNEL_DIR, 
            stdio: 'inherit' 
          });
          console.log('✅ Web Kernel build completed');
        } catch (error) {
          console.warn('⚠️ Web Kernel build failed, continuing with Docusaurus only:', error.message);
        }
      } else {
        console.log('ℹ️ Web Kernel directory not found, building Docusaurus only');
      }
      
      // Step 2: Create combined build structure
      console.log('🔧 Creating combined build structure...');
      
      // Copy Web Kernel assets to build directory
      const webKernelAssetsDir = path.resolve(outDir, 'web-kernel');
      if (fs.existsSync(webKernelAssetsDir)) {
        fs.rmSync(webKernelAssetsDir, { recursive: true, force: true });
      }
      
      // Try to copy from build directory first, then from linked package
      let webKernelSource = null;
      if (fs.existsSync(WEB_KERNEL_BUILD_DIR)) {
        webKernelSource = WEB_KERNEL_BUILD_DIR;
        console.log('📦 Using Web Kernel build directory');
      } else if (fs.existsSync(WEB_KERNEL_LINKED_DIR)) {
        webKernelSource = WEB_KERNEL_LINKED_DIR;
        console.log('📦 Using linked Web Kernel package');
      }
      
      if (webKernelSource) {
        fs.mkdirSync(webKernelAssetsDir, { recursive: true });
        copyDirectory(webKernelSource, webKernelAssetsDir);
        console.log('✅ Web Kernel assets copied');
      }
      
      // Step 3: Create standalone Web Kernel demo HTML
      console.log('📄 Creating standalone Web Kernel demo...');
      const webKernelDemoHtml = createWebKernelDemoHtml(baseUrl);
      fs.writeFileSync(path.resolve(outDir, 'web-kernel-demo.html'), webKernelDemoHtml);
      
      // Step 4: Create routing configuration
      console.log('🛣️ Creating routing configuration...');
      const routingConfig = createRoutingConfig();
      fs.writeFileSync(path.resolve(outDir, 'routing.json'), JSON.stringify(routingConfig, null, 2));
      
      // Step 5: Create service worker for offline support
      console.log('⚙️ Creating service worker...');
      const serviceWorker = createServiceWorker(baseUrl);
      fs.writeFileSync(path.resolve(outDir, 'sw.js'), serviceWorker);
      
      console.log('✅ Dual architecture integration completed successfully!');
      console.log('📁 Build output:', outDir);
      console.log('🌐 Main route: / (Docusaurus Documentation)');
      console.log('🎮 Demo route: /demo (Web Kernel Help System)');
    }
  };
};

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
 * Create demo index.html for Web Kernel Help System
 */
function createWebKernelDemoHtml(baseUrl) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Abu OS 98 Demo</title>
  <meta name="description" content="Windows 98 F1 Help System Demo - Experience the authentic Windows 98 interface">
  
  <!-- Web Kernel Styles -->
  <link rel="stylesheet" href="${baseUrl}web-kernel/index.css">
  
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      font-family: 'MS Sans Serif', Arial, sans-serif;
    }

    #app {
      width: 100%;
      height: 100%;
    }

    /* Loading screen */
    .loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background: #008080;
      color: white;
      font-size: 16px;
      font-weight: bold;
    }

    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 5px solid rgba(255, 255, 255, 0.3);
      border-top-color: white;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-bottom: 16px;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div id="app">
    <div class="loading">
      <div class="loading-spinner"></div>
      <div>Loading Abu OS 98 Demo...</div>
    </div>
  </div>
  
  <!-- Web Kernel Scripts -->
  <script type="module">
    import { 
      Shell, 
      pluginRegistry, 
      MockKernel,
      desktop,
      windowManager,
      mount,
      HelpSystem
    } from '${baseUrl}web-kernel/index.js';
    
    // Create the Help System plugin
    const helpSystemPlugin = {
      id: 'help-system',
      name: 'Help Topics',
      version: '1.0.0',
      component: HelpSystem,
      defaultTitle: 'Help Topics',
      defaultIcon: 'icon-help-book',
      defaultSize: {
        width: 800,
        height: 600
      },
      isResizable: true,
      onInstall: () => {
        console.log('✓ Help System plugin installed');
      },
      onUninstall: () => {
        console.log('✗ Help System plugin uninstalled');
      }
    };

    // Initialize the application
    function initializeApp() {
      console.log('🚀 Initializing Abu OS 98 Demo...');

      const kernel = new MockKernel();
      console.log('✓ Mock kernel created');

      mount(Shell, {
        target: document.getElementById('app'),
        props: {
          plugins: [helpSystemPlugin],
          kernel: kernel
        }
      });
      console.log('✓ Shell mounted successfully');

      // Add desktop icon for Help System
      desktop.addItem({
        id: 'help-system-icon',
        label: 'Help Topics',
        iconClass: 'icon-help-book',
        type: 'program',
        action: () => {
          console.log('Opening Help System window...');
          windowManager.open('help-system');
        }
      });
      console.log('✓ Desktop icon added');

      // Open Help System window on first launch
      setTimeout(() => {
        if (windowManager.count === 0) {
          console.log('Opening Help System window (first launch)...');
          windowManager.open('help-system');
        }
      }, 100);

      console.log('✅ Abu OS 98 Demo initialized successfully!');
    }

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
      initializeApp();
    }
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
        type: 'docusaurus',
        description: 'Docusaurus documentation (main interface)'
      },
      {
        path: '/demo',
        type: 'web-kernel',
        description: 'Web Kernel Help System Demo (Windows 98 F1 Help)'
      },
      {
        path: '/docs/*',
        type: 'docusaurus',
        description: 'Docusaurus documentation'
      }
    ],
    fallback: {
      type: 'docusaurus',
      description: 'Default to Docusaurus documentation'
    },
    buildInfo: {
      timestamp: new Date().toISOString(),
      version: '1.0.0',
      architecture: 'dual-serving'
    }
  };
}

/**
 * Create service worker for offline support
 */
function createServiceWorker(baseUrl) {
  return `const CACHE_NAME = 'abu-help-system-v1';
  const urlsToCache = [
    '${baseUrl}',
    '${baseUrl}demo',
    '${baseUrl}web-kernel-demo.html',
    '${baseUrl}web-kernel/index.js',
    '${baseUrl}web-kernel/index.css',
    '${baseUrl}docs/intro'
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

// Function to copy Web Kernel assets for development mode
async function copyWebKernelAssetsForDev(baseUrl) {
  const ROOT_DIR = process.cwd();
  const WEB_KERNEL_DIR = path.resolve(ROOT_DIR, '../Abu-98-OS-Web-Kernel');
  const WEB_KERNEL_BUILD_DIR = path.resolve(WEB_KERNEL_DIR, 'dist');
  const WEB_KERNEL_LINKED_DIR = path.resolve(ROOT_DIR, 'node_modules/@melalawi/abu-web-kernel');
  const STATIC_DIR = path.resolve(ROOT_DIR, 'static');
  
  // Create static directory if it doesn't exist
  if (!fs.existsSync(STATIC_DIR)) {
    fs.mkdirSync(STATIC_DIR, { recursive: true });
  }
  
  const webKernelAssetsDir = path.resolve(STATIC_DIR, 'web-kernel');
  
  // Remove existing assets
  if (fs.existsSync(webKernelAssetsDir)) {
    fs.rmSync(webKernelAssetsDir, { recursive: true, force: true });
  }
  
  // Try to copy from build directory first, then from linked package
  let webKernelSource = null;
  if (fs.existsSync(WEB_KERNEL_BUILD_DIR)) {
    webKernelSource = WEB_KERNEL_BUILD_DIR;
    console.log('📦 Using Web Kernel build directory for development');
  } else if (fs.existsSync(WEB_KERNEL_LINKED_DIR)) {
    webKernelSource = WEB_KERNEL_LINKED_DIR;
    console.log('📦 Using linked Web Kernel package for development');
  }
  
  if (webKernelSource) {
    fs.mkdirSync(webKernelAssetsDir, { recursive: true });
    copyDirectory(webKernelSource, webKernelAssetsDir);
    console.log('✅ Web Kernel assets copied for development');
    
    // Also create the demo HTML file in static directory
    const webKernelDemoHtml = createWebKernelDemoHtml(baseUrl);
    fs.writeFileSync(path.resolve(STATIC_DIR, 'web-kernel-demo.html'), webKernelDemoHtml);
    console.log('✅ Web Kernel demo HTML created for development');
  } else {
    console.log('⚠️ Web Kernel assets not found for development mode');
  }
}
