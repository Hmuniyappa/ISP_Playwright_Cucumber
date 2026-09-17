const { expect } = require('@playwright/test');
const createAssignmentData = require('../test-data/assignmentData.json').CreateAssignment;
const publicAssignmentData = require('../test-data/assignmentData.json').PublicAssignment;
const { getAssignmentTitle, setAssignmentTitle } = require('../utils/assignmentRuntime');

class saveAssignmentPage {
    constructor(page) {
        this.page = page;
        this.assignmentTitle = getAssignmentTitle();
        this.manageAssignmentHeading = page.getByRole('heading', { name: 'Manage Assignments' });
        this.manageAssignmentLink = page.getByRole('button', { name: 'Manage Assignments' }).first();
        this.savedTab = page.getByRole('tab', { name: 'Saved' });
        this.search = page.getByRole('textbox', { name: 'Search all assignments by title, content, subject...' });
        this.continueDraftButton = page.getByRole('button', { name: 'Continue Draft' });
        this.updatebtn = page.getByText('Update', { exact: true });
        this.questionTxt = page.getByRole('textbox', {
            name: 'Assignment questions*'
        });
        this.titleTxt = page.getByRole('textbox', {
            name: 'Title*'
        });
        this.createdbutton = page.getByRole('button', { name: 'Create' });
        this.editbtn = page.getByRole('button', { name: 'Edit' });
        this.copybtn = page.getByRole('button', { name: 'Copy' });
        this.publish = page.getByRole('button', { name: 'Publish' });
    }

    async selectAssignmentTitle() {
        await this.savedTab.click();
        if (!this.assignmentTitle) {
            const assignmentCard = this.page.locator('.MuiPaper-root').first();
            await expect(assignmentCard).toBeVisible({ timeout: 15000 });
            this.assignmentTitle = (await assignmentCard
                .getByRole('heading')
                .first()
                .textContent()).trim();
            setAssignmentTitle(this.assignmentTitle);
        }
        await this.search.fill(this.assignmentTitle.trim());
    }

    async getSavedAssignmentCard(title = this.assignmentTitle) {
        const assignmentTitle = title.trim();
        await this.search.fill(assignmentTitle);
        const assignmentCard = this.page.locator('.MuiPaper-root')
            .filter({ has: this.page.getByRole('heading', { name: assignmentTitle }) })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        return assignmentCard;
    }

    async openManageAssignments() {
        if (await this.manageAssignmentHeading.isVisible().catch(() => false)) {
            return;
        }
        await this.manageAssignmentLink.click();
    }

    async verifydeleteAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        this.deletedAssignmentTitle = (await assignmentCard.getByText(this.assignmentTitle, { exact: false })
            .first()
            .textContent()).trim();
        const deleteAction = assignmentCard.locator('button[iconsrc="/assets/icons/delete-button.svg"][iconalt="Delete"]').first();
        await deleteAction.click();
        const confirmDialog = this.page.getByRole('dialog').filter({ hasText: 'Confirm Delete' });
        const deleteResponsePromise = this.page.waitForResponse(response =>
            response.request().method() === 'POST' &&
            response.request().postData()?.includes('removeAssignment'),
            { timeout: 15000 }
        ).catch(() => null);
        await confirmDialog.getByRole('button', { name: 'Confirm' }).click();
        const deleteResponse = await deleteResponsePromise;
        expect(deleteResponse).not.toBeNull();
        await expect(confirmDialog).toHaveCount(0, { timeout: 15000 });
        console.log("verifydeleteAssignment ended");
    }

    async verifydeleteAssignmentnotDisplayed() {
        await this.page.reload({ waitUntil: 'networkidle' });
        await this.savedTab.click();
        await this.search.fill(this.deletedAssignmentTitle);
        await expect(
            this.page.getByText(this.deletedAssignmentTitle, { exact: true })
        ).toHaveCount(0, { timeout: 15000 });
        console.log("verifydeleteAssignmentnotDisplayed ended");
    }

    async continueDraftAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.continueDraftButton).click();
        await expect(this.questionTxt).toBeVisible({ timeout: 15000 });
        console.log("continueDraftAssignment ended");
    }

    async verifyContinueDraftAssignment() {
        await this.questionTxt.clear();
        await this.questionTxt.fill(createAssignmentData.updatedescription);
        await this.updatebtn.click();
        await this.getSavedAssignmentCard();
        console.log("verifyContinueDraftAssignment ended");
    }

    async updateCreatedAssignment() {
        const updateAssignmentTitle = createAssignmentData.updatetitle.trim();
        await this.titleTxt.clear();
        await this.titleTxt.fill(updateAssignmentTitle);
        await this.updatebtn.click();
        this.assignmentTitle = updateAssignmentTitle;
        setAssignmentTitle(this.assignmentTitle);
        await this.getSavedAssignmentCard();
        console.log("updateCreatedAssignment ended");
    }

    async editAssignment() {
        await expect(this.questionTxt).toBeVisible({ timeout: 15000 });
        await this.questionTxt.clear();
        await this.questionTxt.fill(createAssignmentData.editdescription);
        await this.updatebtn.click();
        console.log("editAssignment ended");
    }

    async copyAssignment() {
        await expect(this.questionTxt).toBeVisible({ timeout: 15000 });
        await this.titleTxt.clear();
        await this.titleTxt.fill(createAssignmentData.copytitle);
        await this.updatebtn.click();
        console.log("copyAssignment ended");
    }
}

module.exports = saveAssignmentPage;