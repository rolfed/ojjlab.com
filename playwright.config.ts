import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 * Optimized configuration for fast, comprehensive device testing
 */
export default defineConfig({
  testDir: './tests',
  /* Enhanced parallel execution */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Optimized retry strategy */
  retries: process.env.CI ? 1 : 0, // Reduced from 2 to 1 for speed
  /* Optimized worker allocation */
  workers: process.env.CI ? 4 : undefined, // Increased for parallel execution
  /* Enhanced reporting */
  reporter: process.env.CI ? [['github'], ['html']] : 'html',
  /* Shared settings optimized for speed */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5173',
    /* Optimized trace collection */
    trace: 'retain-on-failure',
    /* Performance optimizations */
    actionTimeout: 10000,
    navigationTimeout: 15000,
  },

  /* Comprehensive device matrix */
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    // Mobile Android devices
    {
      name: 'mobile-android-pixel7',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'mobile-android-galaxy',
      use: {
        ...devices['Galaxy S23 Ultra'],
        deviceScaleFactor: 3,
        hasTouch: true,
        isMobile: true,
        viewport: { width: 412, height: 915 },
      },
    },
    {
      name: 'mobile-android-oneplus',
      use: {
        browserName: 'chromium',
        deviceScaleFactor: 2.5,
        hasTouch: true,
        isMobile: true,
        viewport: { width: 412, height: 915 },
        userAgent:
          'Mozilla/5.0 (Linux; Android 11; OnePlus 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36',
      },
    },

    // Mobile iOS devices
    {
      name: 'mobile-ios-iphone14',
      use: { ...devices['iPhone 14'] },
    },
    {
      name: 'mobile-ios-iphone-se',
      use: { ...devices['iPhone SE'] },
    },
    {
      name: 'mobile-ios-iphone14-pro-max',
      use: { ...devices['iPhone 14 Pro Max'] },
    },

    // Tablet devices
    {
      name: 'tablet-ipad-pro',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'tablet-galaxy-tab',
      use: {
        browserName: 'chromium',
        deviceScaleFactor: 2,
        hasTouch: true,
        viewport: { width: 1280, height: 800 },
        userAgent:
          'Mozilla/5.0 (Linux; Android 12; SM-X906C) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36',
      },
    },

    // Legacy mobile devices (for compatibility testing)
    {
      name: 'mobile-legacy-pixel5',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-legacy-iphone12',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Optimized dev server configuration */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // 2 minutes timeout
    stdout: 'ignore',
    stderr: 'pipe',
  },

  /* Global test timeout */
  timeout: 30 * 1000, // 30 seconds per test

  /* Expect timeout */
  expect: {
    timeout: 5 * 1000, // 5 seconds for assertions
  },
});
