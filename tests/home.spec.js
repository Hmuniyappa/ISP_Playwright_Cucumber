const { test, expect } = require('../fixtures/test.fixtures');

test.describe('Home Page', () => {
  test('should display Playwright title', async ({ homePage }) => {
    await homePage.open();
    await expect(homePage.page).toHaveTitle(/Playwright/);
  });

  test('should navigate to docs via Get started', async ({ homePage }) => {
    await homePage.open();
    await homePage.clickGetStarted();
    await expect(homePage.page).toHaveURL(/.*docs/);
  });
});
