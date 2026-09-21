const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const saveAssignmentPage = require('../pages/saveAssigment.page');
const publishedAssignmentPage = require('../pages/published.page');
const assignmentData = require('../test-data/assignmentData.json');

let publishedAssignment;

When('The assignment details popup should be displayed with the correct title', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.clickViewButton();
});
    
When('User continues the copy published assignment', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.continueCopyPublishedAssignment();
});

Then('Copied published assignment should be saved successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.verifyCopiedAssignmentSaved();
});

When('User unpublishes the assignment', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.unPublishedAssignment();
});

Then('The unpublished assignment should be deleted successfully', async function () {
    await publishedAssignment.verifyunPublishedAssignmentdeleted();
});
