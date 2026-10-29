const { expect } = require('@playwright/test');
const path = require('path');
const aiTutorData = require('../test-data/aiTutorData.json');

class StudentGroupPage {
    constructor(page) {
        this.page = page;
        this.tooglemenu=page.getByRole('img', { name: /Toggle Menu/i });
        this.studentGroup=page.getByText('Student Groups', { exact: true });
        this.createNewGroupButton=page.getByRole('button', { name: 'Create New group' });
        this.name=page.getByRole('textbox', { name: 'Enter name' });
        this.description=page.getByRole('textbox', { name: 'Enter description' });
        this.createButton=page.getByRole('button', { name: 'Create' });
        this.resetbutton=page.getByRole('button', { name: 'Reset' });
        this.cancelButton=page.getByRole('button', { name: 'Cancel' });
        this.closeButton=page.getByRole('button', { name: 'Close' });
        this.editbutton=page.locator('button').filter({ hasText: 'Edit' }).first();
        this.updateButton=page.getByRole('button', { name: 'Update' });
        this.cancelButton=page.getByRole('button', { name: 'Cancel' });
    }

    async clickCreateNewGroupButton() {
        await this.tooglemenu.click();
        await this.studentGroup.click();
        await this.createNewGroupButton.click();
    }

    async enterStudentGroupDetails() {
        await this.name.fill(aiTutorData.studentGroup.name);
        await this.description.fill(aiTutorData.studentGroup.description);
    }

    async clickSaveButton() {
        await this.createButton.click();
    }
    
    async successMessageVisible() {
        await expect(this.page.getByText(/Student Group Created Successfully!/i)).toBeVisible();
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
    }

    async clickResetButton() {
        await this.resetbutton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }
    async clickEditButton() {
        await this.tooglemenu.click();
        await this.studentGroup.click();
        await this.description.clear();
        await this.description.fill(aiTutorData.studentGroup.updatedDescription);
        await this.editbutton.click();
    }

    async clickUpdateButton() {
        await this.updateButton.click();
    }
}

module.exports = { StudentGroupPage };
