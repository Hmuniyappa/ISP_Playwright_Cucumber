const path = require('path');
const { expect } = require('@playwright/test');
const aiTutorsessionData = require('../test-data/aiTutorSession.json').aitutorcreation;

class aiManageTutorSessionPage {
    constructor(page) {
        this.page = page;
        this.manageaiTutorsessionicon = page.locator("//a[@href='/teacher/manage-buddy-sessions']//div[@class='bg-card border-border text-center p-6 rounded-lg shadow-md transition-shadow border hover:shadow-lg min-h-[250px]']//div[@class='place-self-center-safe mb-2']//img[@alt='Buddy Session icon']");
        this.viewbutton = page.locator('button').filter({ hasText: 'View' }).first();
        this.unPublishbutton = page.locator('button').filter({ hasText: 'Unpublish' }).first();
        this.publishedSessionTab = page.getByText('Published Sessions', { exact: true });
        this.editButton = page.getByText('Back', { exact: true });
        this.continueButton = page.getByText('Continue', { exact: true });
        this.cancelButton = page.getByText('Cancel', { exact: true });
        this.savedSession = page.getByText('Saved Sessions', { exact: true });
    }

    async goToPublishedSessionTab() {
        await this.manageaiTutorsessionicon.click();
        await this.publishedSessionTab.click();
    }

    async viewPublishedSession() {
        const sessionCard = this.page.locator('div')
            .filter({ hasText: aiTutorsessionData.title })
            .filter({
                has: this.page.locator('button').filter({ hasText: 'View' })
            })
            .first();
        await expect(sessionCard).toBeVisible();
        // Click view session button for that particular session
        await sessionCard.locator('button').filter({ hasText: 'View' }).first().click();
        await expect(this.page.getByPlaceholder('Enter the title')).toHaveValue(aiTutorsessionData.title);
    }

    async unpublishedSession() {
        const sessionCard = this.page.locator('div')
            .filter({ hasText: aiTutorsessionData.title })
            .filter({
                has: this.page.locator('button').filter({ hasText: 'Unpublish' })
            })
            .first();
        await expect(sessionCard).toBeVisible();
        // Click unpublish session button for that particular session
        await sessionCard.locator('button').filter({ hasText: 'Unpublish' }).first().click();
        await expect(this.page.locator('p').filter({ hasText: 'Are you sure you want to unpublish this AI Tutor session ?' })).toBeVisible();
        await this.cancelButton.click();
        await sessionCard.locator('button').filter({ hasText: 'Unpublish' }).first().click();
        await expect(this.page.locator('p').filter({ hasText: 'Are you sure you want to unpublish this AI Tutor session ?' })).toBeVisible();
        await this.continueButton.click();
        await this.savedSession.click();
        const savedSessionCard = this.page.locator('div')
            .filter({ hasText: aiTutorsessionData.title })
            .first();
        await expect(savedSessionCard).toBeVisible();
    }
}
module.exports = aiManageTutorSessionPage;