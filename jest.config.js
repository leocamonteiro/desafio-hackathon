module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    globalSetup: 'jest-preset-angular/global-setup',
    collectCoverage: true,
    coverageDirectory: 'coverage',
    
    moduleNameMapper: {
        '^src/(.*)$': '<rootDir>/src/$1'
    },

    coverageReporters: ['html', 'text-summary'],
    collectCoverageFrom: [
      "src/app/**/*.ts",
      "!src/app/**/*.spec.ts",
      "!src/main.ts",
      "!src/environments/**"
    ]
  };
  