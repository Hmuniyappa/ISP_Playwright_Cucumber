const { test: base, expect } = require('@playwright/test');
const { HomePage } = require('../pages/home.page');
const { LoginPage } = require('../pages/LoginPage');

const test = base.extend({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

module.exports = { test, expect };
