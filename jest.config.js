// module.exports = {
//   preset: 'ts-jest',
//   testEnvironment: 'node',
// };

// import type { Config } from '@jest/types';

// const config: Config.InitialOptions = {
//   moduleFileExtensions: ['ts', 'js'],
//   moduleNameMapper: {
//     '^(.*)\\.js$': '$1',
//   },
//   testEnvironment: 'jest-environment-node',
//   transformIgnorePatterns: ['node_modules/(?!aggregate-error|clean-stack|escape-string-regexp|indent-string|p-map)'],
// };

// export default config;

/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  setupFiles: ['./tests/setupJest.js'],
  // setupFilesAfterEnv: ['./test/setup.ts'],
};
