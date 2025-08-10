import { type Config } from '@jest/types'

const config: Config.InitialOptions = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**'],
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: ['/dist/', '/node_modules/'],
  coverageReporters: ['json-summary', 'lcov', 'text'],
  extensionsToTreatAsEsm: ['.ts'],
  moduleFileExtensions: ['ts', 'js'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  preset: 'ts-jest',
  reporters: ['default'],
  resolver: 'ts-jest-resolver',
  silent: true,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
    '__tests__/test-helpers.ts',
  ],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.jest.json',
        useESM: true,
      },
    ],
  },
  verbose: true,
}

export default config
