/** @type {import('jest').Config} */
export default {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest/presets/default-esm',

  // Use jsdom environment for DOM testing
  testEnvironment: 'jsdom',

  // Support ES modules
  extensionsToTreatAsEsm: ['.ts'],

  // Performance optimizations for CI
  maxWorkers: '50%', // Use half of available CPU cores for optimal CI performance

  // Test file patterns - combine both approaches
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx',
    '<rootDir>/src/**/*.spec.ts',
    '<rootDir>/tests/unit/**/*.test.ts',
    '<rootDir>/tests/unit/**/*.test.tsx',
  ],

  // Files to ignore
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/tests/.*\\.spec\\.ts$', // Ignore Playwright integration tests
  ],

  // Module name mapping for path aliases and assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/tests/__mocks__/fileMock.js',
  },

  // Transform configuration for TypeScript and ES modules
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          target: 'ES2022',
          module: 'ES2022',
          verbatimModuleSyntax: false,
        },
      },
    ],
  },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],

  // Coverage configuration - merge both approaches
  collectCoverage: false, // Disable by default, enable with --coverage flag
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.test.ts',
    '!src/**/*.spec.ts',
    '!src/main.ts', // Entry point
    '!src/vite-env.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text', // For console output
    'lcov', // For detailed HTML reports and GitHub Actions
    'html', // For detailed HTML reports
    'json-summary', // For GitHub Actions PR comments
  ],

  // Coverage thresholds - enable when needed
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90
  //   }
  // },

  // Performance: Skip unnecessary file processing
  transformIgnorePatterns: [
    'node_modules/(?!(gsap)/)', // Transform GSAP since it's ESM
  ],

  // Cache configuration for faster CI runs
  cacheDirectory: '<rootDir>/node_modules/.cache/jest',

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,

  // Verbose output - conditional based on environment
  verbose: process.env.CI === 'true',

  // Timeout configuration - reasonable for unit tests
  testTimeout: 10000, // 10 seconds for unit tests

  // Fail fast in CI to save time
  bail: process.env.CI === 'true' ? 1 : 0,
};
