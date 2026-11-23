export default {
  "roots": ["<rootDir>/src"],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  // Resolve the source's .js-extension ESM imports back to their .ts sources
  // so ts-jest can run the suite (the repo uses `"type": "module"` with
  // explicit .js import specifiers).
  "moduleNameMapper": {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  "testEnvironment": 'jsdom',
  "collectCoverage": true,
  "collectCoverageFrom": ["src/**"],
  "coverageThreshold": {
    "global": {
      "branches": 100,
      "functions": 100,
      "lines": 100,
      "statements": 100
    }
  }
}
