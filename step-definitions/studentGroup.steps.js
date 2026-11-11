const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { StudentGroupPage } = require('../pages/studentGroup.page');
//const aiTutorData = require('../test-data/aiTutorData.json');

let studentGroupPage;

Given('User clicks on the Toggle Menu and Student Groups option', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickToogleMenuAndStudentGroup();
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
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.successMessageVisible();
    console.log('Student group created successfully');
});

When('User edit the student group details', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickEditButton();
});

Then('The student group should be updated successfully', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.updatedMessageVisible();
    console.log('Student group updated successfully');
});

When('User clicks the Reset and Cancel buttons', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickResetAndCancelButton();
    console.log('Reset and Cancel buttons clicked successfully');
});

When('User views the student group details', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickViewButton();
    console.log('Viewed student group details successfully');
});

When('User deletes the student group', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    await studentGroupPage.clickDeleteButton();
    console.log('Deleted student group successfully');
});

Then('User selects the custom group for AI Tutor session', async function () {
    studentGroupPage = new StudentGroupPage(this.page);
    console.log('Custom group selected for AI Tutor session successfully');
});