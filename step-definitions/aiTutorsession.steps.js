const { Then } = require('@cucumber/cucumber');
const { AITutorSessionPage } = require('../pages/aiTutorsession.page');

let aiTutorSessionPage;

Then('user click on AI tutor session', async function () {
    aiTutorSessionPage = new AITutorSessionPage(this.page);
    await aiTutorSessionPage.clickAITutorSessionButton();
});

Then('AI Tutor session should be created successfully', async function () {
    aiTutorSessionPage = new AITutorSessionPage(this.page);
    await aiTutorSessionPage.createAITutorSession();
    console.log('AI Tutor session created successfully');
});

Then('AI Tutor session should be created successfully with file upload', async function () {
    aiTutorSessionPage = new AITutorSessionPage(this.page);
    await aiTutorSessionPage.createAITutorSessionfile();
    console.log('AI Tutor session created successfully with file upload');
});

Then('AI Tutor session should be reset tutor successfully', async function () {
    aiTutorSessionPage = new AITutorSessionPage(this.page);
    await aiTutorSessionPage.resetAITutorSession();
    console.log('AI Tutor session reset successfully');
});

Then('AI Tutor session should be cancelled tutor successfully', async function () {
    aiTutorSessionPage = new AITutorSessionPage(this.page);
    await aiTutorSessionPage.cancelAITutorSession();
    console.log('AI Tutor session cancelled successfully');
});
