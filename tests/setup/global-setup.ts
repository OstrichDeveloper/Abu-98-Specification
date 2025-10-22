import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // This setup runs once before all tests
  console.log('Setting up global test environment...');
  
  // We don't need to do anything special here for the webpack overlay issue
  // The issue will be handled in individual tests by removing the overlay
}

export default globalSetup;
