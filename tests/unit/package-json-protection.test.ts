/**
 * Package.json Script Protection Test
 * 
 * DO NOT MODIFY OR EXTEND package.json scripts.
 * This test ensures no additional scripts are added to package.json.
 * The current scripts are locked and should not be changed.
 * 
 * @author Abu OS Team
 * @locked true
 * @policy NO_SCRIPT_MODIFICATIONS
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';

describe('Package.json Script Protection', () => {
  it('should have exactly the allowed scripts and no more', () => {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    const allowedScripts = [
      'build',
      'autolint',
      'test:unit',
      'test:integration',
      'test:e2e',
      'test',
      'dev'
    ];
    
    const actualScripts = Object.keys(packageJson.scripts);
    
    // Check that we have exactly the allowed scripts
    expect(actualScripts.sort()).toEqual(allowedScripts.sort());
    
    // Check that no additional scripts exist
    expect(actualScripts.length).toBe(allowedScripts.length);
  });

  it('should have correct script values', () => {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    expect(packageJson.scripts.build).toBe('docusaurus build');
    expect(packageJson.scripts.autolint).toBe("echo 'No linting configured for Abu Specification'");
    expect(packageJson.scripts['test:unit']).toBe('vitest run --coverage');
    expect(packageJson.scripts['test:integration']).toBe('vitest run --coverage');
    expect(packageJson.scripts['test:e2e']).toBe('playwright test --config playwright.config.ts');
    expect(packageJson.scripts.test).toBe('npm run test:unit && npm run test:integration && npm run test:e2e');
    expect(packageJson.scripts.dev).toBe('docusaurus start');
  });

  it('should not have any unauthorized scripts', () => {
    const packageJsonPath = join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    
    const unauthorizedScripts = [
      'build:dual',
      'build:web-kernel',
      'test:run',
      'test:coverage',
      'test:watch',
      'deploy',
      'lint',
      'format',
      'prebuild',
      'postbuild',
      'precommit',
      'postcommit'
    ];
    
    const actualScripts = Object.keys(packageJson.scripts);
    
    for (const unauthorizedScript of unauthorizedScripts) {
      expect(actualScripts).not.toContain(unauthorizedScript);
    }
  });
});

