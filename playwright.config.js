const { defineConfig } = require('@playwright/test');
//read the environment variable 
require('dotenv').config();

module.exports = defineConfig({
  testDir: './tests',
  outputDir: 'test-results',
  use: {
    baseURL: '/',
    browserName: 'chromium',
    viewport: null,
    launchOptions:{
      // Start maximized
      args: ['--start-maximized']
    },
    headless: false,
    slowMo: 10000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.js/,
    },
    {
      name: 'chromium',
      launchOptions: {
        // Start maximized
        args: ['--start-maximized']
      },
      use: {
        storageState: './storageState.json', 
      },
      dependencies: ['setup'],
    },
  ],

  reporter: [
    ['json'],
    ['html'],
    ['line'],
    ['allure-playwright']
  ],

});