/**
 * Build Process Integration Tests
 * 
 * Tests the dual serving architecture build process
 */

import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { execSync } from 'child_process';
import { existsSync, readFileSync, statSync } from 'fs';
import { join } from 'path';

// Mock file system operations
vi.mock('fs-extra', () => ({
  default: {
    existsSync: vi.fn(),
    remove: vi.fn(),
    mkdirp: vi.fn(),
    move: vi.fn(),
    copy: vi.fn(),
    readFileSync: vi.fn(),
    writeFileSync: vi.fn()
  }
}));

describe('Build Process Integration', () => {
  const projectRoot = process.cwd();
  const buildScriptPath = join(projectRoot, 'scripts', 'build-dual.js');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Dual Architecture Build Script', () => {
    it('should exist and be executable', () => {
      expect(existsSync(buildScriptPath)).toBe(true);
      
      const stats = statSync(buildScriptPath);
      expect(stats.isFile()).toBe(true);
    });

    it('should have correct script content structure', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify key components are present
      expect(scriptContent).toContain('Starting dual serving architecture build');
      expect(scriptContent).toContain('Building Web Kernel');
      expect(scriptContent).toContain('Building Docusaurus documentation');
      expect(scriptContent).toContain('BUILD_DIR');
      expect(scriptContent).toContain('console.log');
    });

    it('should define correct build directories', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify directory paths are defined
      expect(scriptContent).toContain('ROOT_DIR');
      expect(scriptContent).toContain('WEB_KERNEL_DIR');
      expect(scriptContent).toContain('BUILD_DIR');
      expect(scriptContent).toContain('WEB_KERNEL_BUILD_DIR');
      expect(scriptContent).toContain('webKernelAssetsDir');
    });
  });

  describe('Package.json Build Scripts', () => {
    it('should have dual build script defined', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts['build:dual']).toBe('node scripts/build-dual.js');
      expect(packageJson.scripts['build:web-kernel']).toBe('cd ../Abu-98-OS-Web-Kernel && npm run build');
    });

    it('should have test scripts defined', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.scripts.test).toBe('vitest');
      expect(packageJson.scripts['test:run']).toBe('vitest run');
      expect(packageJson.scripts['test:coverage']).toBe('vitest run --coverage');
      expect(packageJson.scripts['test:watch']).toBe('vitest --watch');
    });
  });

  describe('GitHub Actions Workflow', () => {
    it('should have dual deployment workflow', () => {
      const workflowPath = join(projectRoot, '.github', 'workflows', 'deploy-dual.yml');
      
      if (existsSync(workflowPath)) {
        const workflowContent = readFileSync(workflowPath, 'utf-8');
        
        // Verify key workflow components
        expect(workflowContent).toContain('Deploy Dual Serving Architecture');
        expect(workflowContent).toContain('mainline');
        expect(workflowContent).toContain('npm run build:dual');
        expect(workflowContent).toContain('Build dual architecture');
        expect(workflowContent).toContain('actions/deploy-pages@v4');
      }
    });

    it('should have correct repository configurations', () => {
      const workflowPath = join(projectRoot, '.github', 'workflows', 'deploy-dual.yml');
      
      if (existsSync(workflowPath)) {
        const workflowContent = readFileSync(workflowPath, 'utf-8');
        
        // Verify repository references
        expect(workflowContent).toContain('actions/checkout@v4');
        expect(workflowContent).toContain('actions/setup-node@v4');
        expect(workflowContent).toContain('actions/configure-pages@v4');
        expect(workflowContent).toContain('actions/upload-pages-artifact@v3');
      }
    });
  });

  describe('Docusaurus Configuration', () => {
    it('should have dual serving configuration', () => {
      const docusaurusConfigPath = join(projectRoot, 'docusaurus.config.ts');
      
      if (existsSync(docusaurusConfigPath)) {
        const configContent = readFileSync(docusaurusConfigPath, 'utf-8');
        
        // Verify dual serving configuration
        expect(configContent).toContain('trailingSlash: false');
      }
    });

    it('should have custom pages for dual serving', () => {
      const indexPagePath = join(projectRoot, 'src', 'pages', 'index.tsx');
      const docusaurusPagePath = join(projectRoot, 'src', 'pages', 'docusaurus.tsx');
      
      if (existsSync(indexPagePath)) {
        const indexContent = readFileSync(indexPagePath, 'utf-8');
        expect(indexContent).toContain('HelpSystem');
        expect(indexContent).toContain('Windows 98 F1 Help System');
      }
      
      if (existsSync(docusaurusPagePath)) {
        const docusaurusContent = readFileSync(docusaurusPagePath, 'utf-8');
        expect(docusaurusContent).toContain('Redirect');
        expect(docusaurusContent).toContain('/docs/intro');
      }
    });
  });

  describe('Web Kernel Integration', () => {
    it('should have Web Kernel dependency configured', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.dependencies).toBeDefined();
      expect(packageJson.dependencies['@melalawi/abu-web-kernel']).toBe('file:../Abu-98-OS-Web-Kernel');
    });

    it('should have HelpSystem component integration', () => {
      const helpSystemPath = join(projectRoot, 'src', 'components', 'HelpSystem.tsx');
      
      if (existsSync(helpSystemPath)) {
        const helpSystemContent = readFileSync(helpSystemPath, 'utf-8');
        
        // Verify Web Kernel integration
        expect(helpSystemContent).toContain('@melalawi/abu-web-kernel');
        expect(helpSystemContent).toContain('Shell');
        expect(helpSystemContent).toContain('MockKernel');
        expect(helpSystemContent).toContain('HelpSystem');
        expect(helpSystemContent).toContain('BrowserOnly');
      }
    });
  });

  describe('Content Processing Integration', () => {
    it('should have content processing modules', () => {
      const contentDir = join(projectRoot, 'src', 'lib', 'content');
      
      expect(existsSync(join(contentDir, 'types.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'ContentLoader.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'MarkdownParser.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'TopicBuilder.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'ContentRegistry.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'utils.ts'))).toBe(true);
      expect(existsSync(join(contentDir, 'index.ts'))).toBe(true);
    });

    it('should have content processing tests', () => {
      const testDir = join(projectRoot, 'tests', 'unit', 'content');
      
      expect(existsSync(join(testDir, 'ContentLoader.test.ts'))).toBe(true);
      expect(existsSync(join(testDir, 'MarkdownParser.test.ts'))).toBe(true);
      expect(existsSync(join(testDir, 'TopicBuilder.test.ts'))).toBe(true);
      expect(existsSync(join(testDir, 'ContentRegistry.test.ts'))).toBe(true);
      expect(existsSync(join(testDir, 'utils.test.ts'))).toBe(true);
    });
  });

  describe('Test Configuration', () => {
    it('should have Vitest configuration', () => {
      const vitestConfigPath = join(projectRoot, 'vitest.config.ts');
      
      if (existsSync(vitestConfigPath)) {
        const configContent = readFileSync(vitestConfigPath, 'utf-8');
        
        // Verify test configuration
        expect(configContent).toContain('defineConfig');
        expect(configContent).toContain('vitest');
        expect(configContent).toContain('coverage');
        expect(configContent).toContain('100');
      }
    });

    it('should have test dependencies', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.devDependencies).toBeDefined();
      expect(packageJson.devDependencies.vitest).toBeDefined();
      expect(packageJson.devDependencies['@vitest/coverage-v8']).toBeDefined();
      expect(packageJson.devDependencies.jsdom).toBeDefined();
    });
  });

  describe('Documentation Structure', () => {
    it('should have specification documents', () => {
      const docsDir = join(projectRoot, 'docs');
      
      if (existsSync(docsDir)) {
        expect(existsSync(join(docsDir, 'specifications', 'help-system.md'))).toBe(true);
        expect(existsSync(join(docsDir, 'specifications', 'help-system-functional.md'))).toBe(true);
        expect(existsSync(join(docsDir, 'specifications', 'help-system-technical.md'))).toBe(true);
        expect(existsSync(join(docsDir, 'design', 'help-system-visual.md'))).toBe(true);
      }
    });

    it('should have architecture documentation', () => {
      const projectRoot = process.cwd();
      
      expect(existsSync(join(projectRoot, 'DUAL-SERVING-ARCHITECTURE.md'))).toBe(true);
      expect(existsSync(join(projectRoot, 'README.md'))).toBe(true);
    });
  });

  describe('Build Output Structure', () => {
    it('should define correct build output directories', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify build output structure
      expect(scriptContent).toContain('BUILD_DIR');
      expect(scriptContent).toContain('web-kernel');
      expect(scriptContent).toContain('index.html');
      expect(scriptContent).toContain('assets');
    });

    it('should handle build cleanup', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify cleanup operations
      expect(scriptContent).toContain('rmSync');
      expect(scriptContent).toContain('mkdirSync');
      expect(scriptContent).toContain('copyDirectory');
      expect(scriptContent).toContain('copy');
    });
  });

  describe('Error Handling in Build Process', () => {
    it('should handle build failures gracefully', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify error handling
      expect(scriptContent).toContain('try');
      expect(scriptContent).toContain('catch');
      expect(scriptContent).toContain('process.exit(1)');
      expect(scriptContent).toContain('console.error');
    });

    it('should provide build status feedback', () => {
      const scriptContent = readFileSync(buildScriptPath, 'utf-8');
      
      // Verify status logging
      expect(scriptContent).toContain('console.log');
      expect(scriptContent).toContain('Building Web Kernel');
      expect(scriptContent).toContain('Building Docusaurus');
      expect(scriptContent).toContain('build complete');
    });
  });
});
