const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { MarkingCredintial, TutorCredintial } = require('../test-data/Login.json');
//const LoginPage = require('../pages/LoginPage');

let loginPage;
//
// Common Login Page Open
//
Given('User is on Marking login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToDashboard();
});

When('User enters usernameteacher1 and password', async function () {
  await loginPage.login(MarkingCredintial.UsernameTeacher1, MarkingCredintial.Password);
});

When('User enters usernameteacher2 and password', async function () {
  await loginPage.login(MarkingCredintial.UsernameTeacher2, MarkingCredintial.Password);
});

When('User clicks login button', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.clickSignInButton();
});

Then('User should be redirected to dashboard', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToDashboard();
  await expect(this.page).toHaveURL(/dashboard|launchpad|ispsandbox/i);
});

When('User enter Usernamestudent1 and Password', async function () {
  await loginPage.login(MarkingCredintial.UsernameStudent1, MarkingCredintial.Password);
});

Given('User is on AI Tutor login page', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.navigateToAItutor();
  await expect(loginPage.classLinkTutorButton).toBeVisible();
});

When('User enters usernameteacher3 and password', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.loginAItutor(TutorCredintial.UsernameTeacher3, TutorCredintial.Password);
});

When('User clicks Tutor login button', async function () {
  loginPage = new LoginPage(this.page);
  await loginPage.loginbutton();
});

Then('User should be redirected to AI tutor dashboard', async function () {
  loginPage = new LoginPage(this.page);
  await expect(this.page).toHaveURL(/teacher/i);
});




