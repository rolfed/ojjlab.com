/** @type {import('jest').Config} */
export default {
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'jsdom',

  // Performance optimizations for CI
  maxWorkers: '50%', // Use half of available CPU cores for optimal CI performance

  // Test file patterns
  testMatch: ['<rootDir>/src/**/*.test.ts', '<rootDir>/src/**/*.spec.ts'],

  // Module name mapping for resolving imports
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },

  // Transform configuration
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          target: 'ES2022',
          module: 'esnext', // Changed to esnext to support import.meta
          moduleResolution: 'bundler',
          allowImportingTsExtensions: false, // Jest doesn't support .ts extensions
          verbatimModuleSyntax: false,
        },
      },
    ],
  },

  // Setup files - will be created if needed
  // setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],

  // Coverage configuration for PR reporting
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text', // For console output
    'lcov', // For detailed HTML reports
    'json-summary', // For GitHub Actions PR comments
  ],

  // Coverage thresholds (starting low, increase gradually)
  coverageThreshold: {
    global: {
      branches: 0, // Set to 0 since utility functions may not have branches
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },

  // Files to collect coverage from - initially only tested files
  collectCoverageFrom: [
    'src/utils/**/*.ts', // Start with utils that have tests
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/vite-env.d.ts',
    '!src/utils/base-path.ts', // Skip Vite-specific files for now
  ],

  // Performance: Skip unnecessary file processing
  transformIgnorePatterns: [
    'node_modules/(?!(gsap)/)', // Transform GSAP since it's ESM
  ],

  // Cache configuration for faster CI runs
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',

  // Verbose output for CI debugging
  verbose: process.env.CI === 'true',

  // Fail fast in CI to save time
  bail: process.env.CI === 'true' ? 1 : 0,

  // Timeout configuration
  testTimeout: 10000, // 10 seconds - reasonable for unit tests

  // Clear mocks between tests for clean state
  clearMocks: true,
  restoreMocks: true,
};
