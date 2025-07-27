/** @type {import('ts-jest').JestConfigWithTsJest} */
export default {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  moduleNameMapper: { '^(\\.{1,2}/.*)\\.js$': '$1' },
  extensionsToTreatAsEsm: ['.ts'],
  transform: { '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: 'tsconfig.esm.json' }] },
  setupFiles: ['./tests/setupJest.js'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/generated/**/*.ts', // Exclude auto-generated API files
    '!src/**/*.d.ts',         // Exclude TypeScript declaration files
  ],
  coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'clover'],
  coverageDirectory: './coverage',
};
