const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MarkingCredintial } =require('../test-data/Login.json');

let loginPage;

//
// Common Login Page Open
//
Given('User is on Marking login page', async function () {
    loginPage = new LoginPage(this.page);
    await loginPage.navigateToDashboard();
});

When('User enters usernameteacher1 and password', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login(MarkingCredintial.UsernameTeacher1, MarkingCredintial.Password);
});

When('User enters usernameteacher2 and password', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login(MarkingCredintial.UsernameTeacher2, MarkingCredintial.Password);
});

When('User clicks login button', async function () {
    await loginPage.clickSignInButton();
});

Then('User should be redirected to dashboard', async function () {
    await loginPage.navigateToDashboard();
    await expect(this.page).toHaveURL(/dashboard|launchpad|ispsandbox/i);
});

When('User enter Usernamestudent1 and Password', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.login(MarkingCredintial.UsernameStudent1, MarkingCredintial.Password);
});



