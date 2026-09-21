const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const StudentAssignmentPage = require('../pages/studentassignment.page');
const assignmentData = require('../test-data/assignmentData.json');

let studentAssignmentPage;

Then('Student should see the assignment reset successfully', async function () {
    const studentAssignmentPage = new StudentAssignmentPage(this.page);
    await studentAssignmentPage.resetbutton();
    console.log('Assignment has been reset successfully');
});

Then('Student should see the assignment saved as draft successfully', async function () {
    const studentAssignmentPage = new StudentAssignmentPage(this.page);
    await studentAssignmentPage.savedraftbutton();
    console.log('Assignment has been saved as draft successfully');
});

Then('Student should see the assignment submitted successfully', async function () {
    const studentAssignmentPage = new StudentAssignmentPage(this.page);
    await studentAssignmentPage.submitassignment();
    console.log('Assignment has been submitted successfully');
});

Then('Student should see the assignment updated successfully', async function () {
    const studentAssignmentPage = new StudentAssignmentPage(this.page);
    await studentAssignmentPage.editassignment();
    console.log('Assignment has been edited successfully');
});

Then('Student should see the assignment answer successfully', async function () {
    const studentAssignmentPage = new StudentAssignmentPage(this.page);
    await studentAssignmentPage.viewanswer();
    console.log('Student has viewed the assignment answer successfully');
});