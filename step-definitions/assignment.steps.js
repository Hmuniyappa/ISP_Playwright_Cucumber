const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { AssignmentPage } = require('../pages/assignment.page');
const assignmentData = require('../test-data/assignmentData.json');

let assignmentPage;

When('User navigates to assignment page', async function () {
    assignmentPage = new AssignmentPage(this.page);
    await assignmentPage.navigateToAssignmentPage();
});

When('User creates a new assignment', async function () {
    await assignmentPage.createAssignment();
});

Then('Assignment should be created successfully', async function () {
    await assignmentPage.verifyAssignmentPageLoaded();
});