const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { StudentGroupPage } = require('../pages/studentGroup.page');
const aiTutorData = require('../test-data/aiTutorData.json');

let studentGroupPage;

Given('User clicks on the Create new Group button', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickCreateNewGroupButton();
});

When('User enters the student group details', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.enterStudentGroupDetails();
});

When('User clicks the Save button', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickSaveButton();
});

Then('The new student group should be created successfully', async function () {
    await studentGroupPage.successMessageVisible();
    console.log('Student group created successfully');
});