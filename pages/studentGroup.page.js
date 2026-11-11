const { expect } = require('@playwright/test');
const path = require('path');
const aiTutorgroupData = require('../test-data/aiTutorData.json').studentGroup;

class StudentGroupPage {
    constructor(page) {
        this.page = page;
        this.tooglemenu = page.getByRole('img', { name: /Toggle Menu/i });
        this.studentGroup = page.getByText('Student Groups', { exact: true });
        this.createNewGroupButton = page.getByRole('button', { name: 'Create New group' });
        this.name = page.getByRole('textbox', { name: 'Enter name' });
        this.description = page.getByRole('textbox', { name: 'Enter description' });
        this.createButton = page.getByRole('button', { name: 'Create' });
        this.resetbutton = page.getByRole('button', { name: 'Reset' });
        this.cancelButton = page.getByRole('button', { name: 'Cancel' });
        this.closeButton = page.getByRole('button', { name: /Close/i });
        this.editbutton = page.locator('button').filter({ hasText: 'Edit' }).first();
        this.updateButton = page.getByRole('button', { name: 'Update' });
        this.viewButton = page.locator('button').filter({ hasText: 'View' }).first();
        this.assignButton = page.getByRole('button', { name: /Assign/i });
        this.studenttab = page.getByRole('tab', { name: 'Students' });
        this.blacklink = page.getByRole('button', { name: 'Back' }).first();
        this.deleteButton = page.getByRole('img', { name: 'Delete Student Group' });
        this.cancelButtonicon=page.getByRole('button', { name: 'Cancel' });
        this.deletecontinueicon=page.getByRole('button', { name: 'Continue' });
    }

    async clickToogleMenuAndStudentGroup() {
        await this.tooglemenu.click();
        await this.studentGroup.click();
    }

    async enterStudentGroupDetails() {
        await this.createNewGroupButton.click();
        await this.name.fill(aiTutorgroupData.name);
        await this.description.fill(aiTutorgroupData.description);
    }

    async clickSaveButton() {
        await this.createButton.click();
    }

    async successMessageVisible() {
        await expect(this.page.getByText(/Student Group Created Successfully!/i)).toBeVisible({ timeout: 30000 });
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
    }

    async clickEditButton() {
        const groupCard = this.page.locator('div')
            .filter({ hasText: aiTutorgroupData.name })
            .filter({
                has: this.page.locator('button').filter({ hasText: 'Edit' })
            })
            .first();
        // Verify created group is displayed
        await expect(groupCard).toBeVisible();
        // Click Edit for that particular group
        await groupCard.locator('button').filter({ hasText: 'Edit' }).first().click();
        await this.description.clear();
        await this.description.fill(aiTutorgroupData.updatedDescription);
        await this.updateButton.click();
    }

    async updatedMessageVisible() {
        await expect(this.page.getByText(/Student Group Updated Successfully!/i)).toBeVisible();
        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
    }

    async clickResetAndCancelButton() {
        const groupCard = this.page.locator('div')
            .filter({ hasText: aiTutorgroupData.name })
            .filter({
                has: this.page.locator('button').filter({ hasText: 'Edit' })
            })
            .first();
        // Verify created group is displayed
        await expect(groupCard).toBeVisible();
        // Click Edit for that particular group
        await groupCard.locator('button').filter({ hasText: 'Edit' }).first().click();
        await this.description.clear();
        await this.description.fill(aiTutorgroupData.updatedDescription);
        await this.resetbutton.click();
        await expect(this.description).toBeEmpty();
        await this.cancelButton.click();
    }

    async clickViewButton() {
        const groupCard = this.page.locator('div')
            .filter({ hasText: aiTutorgroupData.name })
            .filter({
                has: this.page.locator('button').filter({ hasText: 'View' })
            })
            .first();
        // Verify created group is displayed
        await expect(groupCard).toBeVisible();
        // Click Edit for that particular group
        await groupCard.locator('button').filter({ hasText: 'View' }).first().click();
        await this.studenttab.click();
        await this.selectStudent(aiTutorgroupData.students[0]);
        await this.selectStudent(aiTutorgroupData.students[1]);
        await this.assignButton.click();
        await this.blacklink.click();
    }

    async clickDeleteButton() {
        const groupTitle = this.page.getByText(aiTutorgroupData.name, { exact: true });
        await expect(groupTitle.first()).toBeVisible();
        await this.page.waitForLoadState('networkidle');
        const countBefore = await groupTitle.count();
        const groupCard = this.page.locator('div')
            .filter({ hasText: aiTutorgroupData.name })
            .filter({ has: this.page.getByRole('button', { name: 'Delete Student Group' }) })
            .first();
        const openDeleteDialog = () => groupCard
            .getByRole('button', { name: 'Delete Student Group' })
            .first()
            .click();
        await openDeleteDialog();
        await this.cancelButtonicon.click();
        await openDeleteDialog();
        await this.deletecontinueicon.click();
        await expect(groupTitle).toHaveCount(countBefore - 1);
    }

    async selectStudent(studentName) {
        const checkbox = this.page
            .locator('p')
            .filter({ hasText: new RegExp(`^${studentName}$`) })
            .getByRole('checkbox');
        const isSelected = await checkbox.getAttribute('aria-checked');
        if (isSelected !== 'true') {
            await checkbox.click();
        }
    }
}
module.exports = { StudentGroupPage };
