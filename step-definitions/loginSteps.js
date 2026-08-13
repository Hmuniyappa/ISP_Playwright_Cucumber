const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

let loginPage;

//
// Common Login Page Open
//
Given('User is on Marking login page', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigateToDashboard();
});

When('User enters username and password', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login('teacher1@ispschool.com', 'TempPassword123!');
});

When('User clicks login button', async function () {
    await loginPage.clickSignInButton();
});

Then('User should be redirected to dashboard', async function () {
    await loginPage.navigateToDashboard();
    await expect(this.page).toHaveURL(/dashboard|launchpad|ispsandbox/i);
});

