/** @type {import('jest').Config} */
export default {
  // Use ts-jest preset for TypeScript support
  preset: 'ts-jest/presets/default-esm',

  // Use jsdom environment for DOM testing
  testEnvironment: 'jsdom',

  // Support ES modules
  extensionsToTreatAsEsm: ['.ts'],

  // Module name mapping for path aliases and assets
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg|webp)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },

  // Test file patterns
  testMatch: [
    '<rootDir>/src/**/*.test.ts',
    '<rootDir>/src/**/*.test.tsx',
    '<rootDir>/tests/unit/**/*.test.ts',
    '<rootDir>/tests/unit/**/*.test.tsx',
  ],

  // Files to ignore
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/tests/.*\\.spec\\.ts$', // Ignore Playwright integration tests
  ],

  // Coverage configuration
  collectCoverage: false, // Disable by default, enable with --coverage flag
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.ts', // Entry point
    '!src/vite-env.d.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  // Coverage thresholds can be enabled once tests are written
  // coverageThreshold: {
  //   global: {
  //     branches: 80,
  //     functions: 90,
  //     lines: 90,
  //     statements: 90
  //   }
  // },

  // Setup files
  setupFilesAfterEnv: ['<rootDir>/tests/setup/jest.setup.ts'],

  // Transform configuration for TypeScript and ES modules
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          module: 'ES2022',
          target: 'ES2022',
          verbatimModuleSyntax: false,
        },
      },
    ],
  },

  // Module file extensions
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // Clear mocks between tests
  clearMocks: true,
  restoreMocks: true,

  // Verbose output for better debugging
  verbose: true,

  // Maximum number of concurrent workers
  maxWorkers: '50%',

  // Timeout for tests (30 seconds)
  testTimeout: 30000,
};
