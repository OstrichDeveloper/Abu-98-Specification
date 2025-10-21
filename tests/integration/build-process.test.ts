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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });


  describe('Package.json Build Scripts', () => {
    it('should have build scripts defined', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.scripts).toBeDefined();
      expect(packageJson.scripts['build']).toBe('docusaurus build');
      expect(packageJson.scripts['dev']).toBe('docusaurus start');
    });

    it('should have test scripts defined', () => {
      const packageJsonPath = join(projectRoot, 'package.json');
      const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
      
      expect(packageJson.scripts.test).toBe('npm run test:unit && npm run test:integration && npm run test:e2e');
      expect(packageJson.scripts['test:unit']).toBe('vitest run --coverage');
      expect(packageJson.scripts['test:integration']).toBe('vitest run --coverage');
      expect(packageJson.scripts['test:e2e']).toBe('playwright test --config playwright.config.ts');
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
        expect(workflowContent).toContain('npm run build');
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
        expect(indexContent).toContain('Welcome to Abu OS Documentation');
        expect(indexContent).toContain('HomepageFeatures');
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
      expect(packageJson.dependencies['@melalawi/abu-web-kernel']).toBe('^1.0.1');
    });

    it('should have HelpSystem component integration', () => {
      const helpSystemPath = join(projectRoot, 'src', 'components', 'HelpSystem.tsx');
      
      if (existsSync(helpSystemPath)) {
        const helpSystemContent = readFileSync(helpSystemPath, 'utf-8');
        
        // Verify iframe-based Web Kernel integration
        expect(helpSystemContent).toContain('iframe');
        expect(helpSystemContent).toContain('web-kernel-demo.html');
        expect(helpSystemContent).toContain('useDocusaurusContext');
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

    it('should have documentation', () => {
      const projectRoot = process.cwd();
      
      expect(existsSync(join(projectRoot, 'README.md'))).toBe(true);
    });
  });

});
