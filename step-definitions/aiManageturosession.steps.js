const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const AiManageTutorSessionPage = require('../pages/aiManageturosession.page');

let aiManageTutorSessionPage;

Given('User navigates to AI Tutor Published session tab', async function () {
    aiManageTutorSessionPage = new AiManageTutorSessionPage(this.page);
    await aiManageTutorSessionPage.goToPublishedSessionTab();
    console.log('Navigated to AI Tutor Published session tab');
});

Then('User should be able to view AI Tutor session', async function () {
    aiManageTutorSessionPage = new AiManageTutorSessionPage(this.page);
    await aiManageTutorSessionPage.viewPublishedSession();
    console.log('Viewed AI Tutor Published session');
});

Then('User should be able to unpublish AI Tutor session', async function () {
    aiManageTutorSessionPage = new AiManageTutorSessionPage(this.page);
    await aiManageTutorSessionPage.unpublishedSession();
    console.log('Unpublished AI Tutor session');
});
