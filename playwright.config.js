const { defineConfig } = require('@playwright/test');
//read the environment variable 
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  use: {
    baseURL: '/',
    browserName: 'chromium',
    headless: false,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      use: {
        storageState: './storageState.json', 
      },
      dependencies: ['setup'],
    },
  ],

  reporter: [
    ['json'],
    ['html'],
    ['allure-playwright']
  ],

});