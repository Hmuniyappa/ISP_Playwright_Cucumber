const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const saveAssignmentPage = require('../pages/saveAssigment.page');
const assignmentData = require('../test-data/assignmentData.json');

let saveAssignment;

When('User deletes the assignment', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.verifydeleteAssignment();
});

Then('Assignment should be deleted successfully', async function () {
    await saveAssignment.verifydeleteAssignmentnotDisplayed();
    console.log("delete verification ended");
});

When('User continues the draft assignment', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.continueDraftAssignment();
});

When('User continues the edited assignment', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.continueeditedAssignment();
});

Then('Draft assignment should be continued successfully', async function () {
    await saveAssignment.verifyContinueDraftAssignment();
    console.log("continue draft verification ended");
});

When('Updated assignment should be saved successfully', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.updateCreatedAssignment();
    console.log("update assignment verification ended");
});

When('Edited assignment should be saved successfully', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.editAssignment();
    console.log("edit assignment verification ended");
});

When('User continues the copy assignment', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.continuecopydAssignment();
});

When('Copied assignment should be saved successfully', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.copyAssignment();
    console.log("copy assignment verification ended");
});

When('User continues the publish assignment', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.continuepublishAssignment();
});
When('Assignment should be published successfully', async function () {
    saveAssignment = new saveAssignmentPage(this.page);
    await saveAssignment.publishAssigment();
    console.log("publish assignment verification ended")
});
