/**
 * Integration Tests Setup
 */

import { beforeAll, afterAll } from 'vitest';

// Mock global fetch for browser environment
global.fetch = global.fetch || (() => Promise.resolve({
  ok: true,
  text: () => Promise.resolve('Mock content')
}));

// Mock console methods to avoid noise in tests
const originalConsole = { ...console };

beforeAll(() => {
  // Suppress console output during tests
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
});

afterAll(() => {
  // Restore console methods
  Object.assign(console, originalConsole);
});

