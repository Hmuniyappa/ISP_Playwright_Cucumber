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

Then('The submissions for the published assignment should be displayed successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.clickViewSubmissionsButton();
    console.log('Student has viewed the submissions for the published assignment successfully');
});

Then('The assignment should be regenerated with feedback successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.regenerateAssignment();
    console.log('Student has regenerated the assignment with feedback successfully');
});

Then('The assignment edit feedback should be updated successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.editassigmentfeedback();
    console.log('Student has updated the assignment feedback successfully');
});

Then('User should be able to publish and finish the assignment successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.publishandfinishButton();
    console.log('Student has published and finished the assignment successfully');
});

Then('The history for the published assignment should be displayed successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.viewhistoryassigment();
    console.log('Student has viewed the history for the published assignment successfully');
});

Then('The closed assignment should be updated successfully', async function () {
    publishedAssignment = new publishedAssignmentPage(this.page);
    await publishedAssignment.closeAssignment();
    console.log('Student has closed the assignment successfully');
});