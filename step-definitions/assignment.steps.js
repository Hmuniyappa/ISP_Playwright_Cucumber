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

When('User creates a new public assignment', async function () {
    await assignmentPage.createPublicAssignment();
});

When('User clicks Save for Later button', async function () {
    await assignmentPage.saveForLater();
    console.log("saved ended");
});

When('User click on reset button', async function () {
    await assignmentPage.clickResetButton();
});

Then('Assignment should be created successfully', async function () {
    await assignmentPage.verifySavedAssignmentDisplayed();
});

Then('Assignment should be reset successfully', async function () {
    await assignmentPage.resetAssignmentForm();
});

Then('User click on cancel button', async function () {
    await assignmentPage.clickCancelButton();
});

Then('Assignment should be cancelled successfully', async function () {
    await assignmentPage.cancelAssignmentForm();
});

Then('User click on create button', async function () {
    await assignmentPage.publicAssignment();
});

Then('Assignment should be created and Public successfully', async function () {
    await assignmentPage.verifyPublicAssignmentDisplayed();
    console.log("published ended");
});