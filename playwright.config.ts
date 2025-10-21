import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 2,
  workers: 1,
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: [
    ['github'],
    ['json', { outputFile: 'test-results/e2e-results.json' }],
    ['junit', { outputFile: 'test-results/e2e-results.xml' }],
    ['list']
  ],
  use: {
    baseURL: 'http://localhost:3000/Abu-98-Specification/',
    trace: 'retain-on-failure',
    headless: true,
    actionTimeout: 5000,
    navigationTimeout: 15000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    launchOptions: {
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  },
  projects: [
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        headless: true,
        viewport: { width: 1280, height: 720 }
      },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000/Abu-98-Specification/',
    reuseExistingServer: true,
    timeout: 60000,
    stdout: 'pipe',
    stderr: 'pipe',
    env: {
      NODE_ENV: 'test',
      CI: 'true'
    }
  },
});

