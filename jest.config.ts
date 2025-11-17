// jest.config.ts
import type { Config } from 'jest';

const baseConfig: NonNullable<Config['projects']>[number] = {
  moduleNameMapper: {
    '@infra/(.*)': '<rootDir>/src/infra/$1',
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@shared/(.*)': '<rootDir>/src/shared/$1',
    '@domain/(.*)': '<rootDir>/src/domain/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleFileExtensions: ['js', 'json', 'ts'],
  coverageDirectory: 'test-report',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(t|j)s$': [
      '@swc/jest',
      {
        jsc: {
          parser: {
            syntax: 'typescript',
            decorators: true,
            dynamicImport: true,
          },
          transform: { decoratorMetadata: true, legacyDecorator: true },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transformIgnorePatterns: [
    '/node_modules/(?!(nanoid|uuid|@faker-js/faker|chalk)/)',
  ],
};

const config: Config = {
  projects: [
    {
      ...baseConfig,
      displayName: 'unit',
      testMatch: ['<rootDir>/src/**/*.spec.ts'],
    },
    {
      ...baseConfig,
      displayName: 'e2e',
      testMatch: ['<rootDir>/src/**/*.e2e-spec.ts'],
      globalSetup: '<rootDir>/jest-global.setup.ts',
      globalTeardown: '<rootDir>/jest-global.teardown.ts',
    },
  ],
  passWithNoTests: true,
  testTimeout: 40000,
};
export default config;
