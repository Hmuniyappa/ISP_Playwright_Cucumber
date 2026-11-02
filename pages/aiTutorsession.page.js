const path = require('path');
const { expect } = require('@playwright/test');
const aiTutorsessionData = require('../test-data/aiTutorSession.json').aiTutorcreation;

class AITutorSessionPage {
    constructor(page) {
        this.page = page;
        this.aiTutorSessionButton = page.locator("//a[@href='/teacher/create-buddy-session']//div[@class='bg-card border-border text-center p-6 rounded-lg shadow-md transition-shadow border hover:shadow-lg min-h-[250px]']//div[@class='place-self-center-safe mb-2']//img[@alt='Buddy Session icon']");
        this.title = page.getByPlaceholder('Enter the title');
        this.subject = page.getByRole('combobox', { name: 'Subject' });
        this.topic = page.getByPlaceholder('Enter the topic');
        this.learningLanguage = page.getByRole('combobox', { name: 'Learning Language' });
        this.curriculum = page.getByRole('combobox', { name: 'Curriculum' });
        this.studentAge = page.getByRole('combobox', { name: 'Student Age' });
        this.selectSource = page.getByLabel('Custom Group', { exact: true });
        this.customGroup = page.getByRole('combobox', { name: 'Custom Group' });
        this.expiry = page.locator('[role="button"][type="button"]');
        this.learningOutcome = page.getByPlaceholder('Enter learning outcomes');
        this.publishButton = page.getByRole('button', { name: 'Publish', exact: true });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.resetButton = page.getByRole('button', { name: 'Reset' });
        this.fileInput = page.locator('input[type="file"]');
    }

    async clickAITutorSessionButton() {
        await this.aiTutorSessionButton.click();
    }

    async createAITutorSession() {
        await this.title.fill(aiTutorsessionData.title);
        await this.selectOption(this.subject, aiTutorsessionData.subject);
        await this.topic.fill(aiTutorsessionData.topic);
        await this.selectOption(this.learningLanguage, aiTutorsessionData['learning Language']);
        await this.selectOption(this.curriculum, aiTutorsessionData.curriculum);
        await this.selectOption(this.studentAge, aiTutorsessionData['student age']);
        await this.selectSource.check();
        await this.selectOption(this.customGroup, aiTutorsessionData['custom group']);
        await this.setDueDate(aiTutorsessionData.expirydate);
        await this.learningOutcome.fill(aiTutorsessionData['learning Outcome']);
        await this.publishButton.click();
        await expect(this.page.getByText('Session Published Successfully!', { exact: true }))
            .toBeVisible({ timeout: 30000 });
        await this.page.getByRole('button', { name: 'Close', exact: true }).click();
    }
    async createAITutorSessionfile() {
        await this.title.fill(aiTutorsessionData.title);
        await this.selectOption(this.subject, aiTutorsessionData.subject);
        await this.topic.fill(aiTutorsessionData.topic);
        await this.selectOption(this.learningLanguage, aiTutorsessionData['learning Language']);
        await this.selectOption(this.curriculum, aiTutorsessionData.curriculum);
        await this.selectOption(this.studentAge, aiTutorsessionData['student age']);
        await this.selectSource.check();
        await this.selectOption(this.customGroup, aiTutorsessionData['custom group']);
        await this.setDueDate(aiTutorsessionData.expirydate);
        await this.learningOutcome.fill(aiTutorsessionData['learning Outcome']);
        const imagePath1 = path.resolve(__dirname, '..', 'Imageupload', 'Greatest Events of World War.jpg');
        const imagePath2 = path.resolve(__dirname, '..', 'Imageupload', 'World War II.jpg');
        await this.fileInput.setInputFiles([imagePath1, imagePath2]);
        await this.publishButton.click();
        await expect(this.page.getByText('Session Published Successfully!', { exact: true }))
            .toBeVisible({ timeout: 30000 });
        await this.page.getByRole('button', { name: 'Close', exact: true }).click();

    }
    async selectOption(locator, label) {
        await locator.click();
        const option = this.page.getByRole('option', { name: label, exact: true });
        await expect(option).toBeVisible();
        await option.click();
    }

    async setDueDate(date) {
        await this.expiry.click();
        const [day, month, year] = date.split('/').map(Number);
        const monthName = new Date(year, month - 1, day).toLocaleString('en-US', { month: 'long' });
        const suffix = day % 100 >= 11 && day % 100 <= 13 ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[day % 10] || 'th');
        const dateButton = this.page.getByRole('button', {
            name: new RegExp(`${monthName} ${day}${suffix}, ${year}`)
        });
        await expect(dateButton).toBeVisible();
        await dateButton.click();
        await expect(this.expiry).toHaveText(date);
    }
}
module.exports = { AITutorSessionPage };
