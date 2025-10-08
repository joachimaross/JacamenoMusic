module.exports = {
  projects: [
    {
      displayName: 'web',
      testEnvironment: 'jsdom',
      testMatch: ['<rootDir>/apps/web/**/*.test.{ts,tsx}'],
      setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/web/src/$1',
      },
      transform: {
        '^.+\\.(ts|tsx)$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/apps/web/tsconfig.json',
          },
        ],
      },
      collectCoverageFrom: [
        'apps/web/src/**/*.{ts,tsx}',
        '!apps/web/src/**/*.d.ts',
        '!apps/web/src/**/*.stories.{ts,tsx}',
      ],
    },
    {
      displayName: 'api',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/services/api/**/*.test.ts'],
      transform: {
        '^.+\\.ts$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/services/api/tsconfig.json',
          },
        ],
      },
      collectCoverageFrom: ['services/api/src/**/*.ts', '!services/api/src/**/*.d.ts'],
    },
    {
      displayName: 'packages',
      testEnvironment: 'node',
      testMatch: ['<rootDir>/packages/**/*.test.ts'],
      transform: {
        '^.+\\.ts$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/tsconfig.base.json',
          },
        ],
      },
      collectCoverageFrom: ['packages/*/src/**/*.ts', '!packages/*/src/**/*.d.ts'],
    },
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],
  coverageDirectory: '<rootDir>/coverage',
  collectCoverage: false, // Enable with --coverage flag
  verbose: true,
};
