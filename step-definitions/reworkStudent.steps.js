const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const publishedAssignmentPage = require('../pages/published.page');
const StudentAssignmentPage = require('../pages/studentassignment.page');
const assignmentData = require('../test-data/assignmentData.json');
const { restartBrowserSession } = require('../hooks/browserSession');

let mystudent;

When('User starts a new browser session', async function () {
    await restartBrowserSession(this);
});

When('User logs out', async function () {
    await this.page.getByText('Log Out', { exact: true }).click();
    await this.page.waitForURL(url => new URL(url).pathname === '/', { timeout: 15000 });
});

Then('Assignment should be published and reworked successfully', async function () {
    mystudent = new publishedAssignmentPage(this.page);
    await mystudent.publishandReworkButton();
    console.log('Rework requested for the assignment');
});

Then('Student should see the assignment reworked successfully', async function () {
    mystudent = new StudentAssignmentPage(this.page);
    await mystudent.reworkRequested();
    console.log('Assignment reworked successfully');
});


Then('Student submits the assignment task', async function () {
    mystudent = new StudentAssignmentPage(this.page);
    await mystudent.submitstudnetassignment();
    console.log('Assignment submitted successfully');
});