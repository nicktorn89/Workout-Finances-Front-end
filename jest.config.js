const { defaults } = require('jest-config');

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)" ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  roots: [
    "<rootDir>/src"
  ],
  setupFilesAfterEnv: ["jest-enzyme", "<rootDir>/src/setupTests.ts"],
  testEnvironment: "enzyme"
};