const { expect } = require('@playwright/test');
const path = require('path');
const publicAssignmentData = require('../test-data/assignmentData.json').PublicAssignment;
const saveDraftAssignmentData = require('../test-data/assignmentData.json').SaveDraftAssignment;
const { getAssignmentTitle, setAssignmentTitle } = require('../utils/assignmentRuntime');
const SaveAssignmentPage = require('./saveAssigment.page');

class StudentAssignmentPage extends SaveAssignmentPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.assignmentTasksLink = page.getByText('Assignment Tasks', { exact: true }).first();
        this.gotoAssigment = page.getByRole('button', { name: 'Go to Assignment' });
        this.yourAnswer =page.getByLabel('Your Answer *', { exact: true });
        this.submitAnswerButton = page.getByRole('button', { name: 'Submit Answer' });
        this.resetAssignmentButton = page.getByRole('button', { name: 'Reset' });
        this.saveDraftButton = page.getByRole('button', { name: 'Save Draft' });
        this.choosefile = page.locator('input[type="file"]').first();
        this.donetab = page.getByRole('tab', { name: 'Done' });
        this.backAssigment = page.getByRole('button', { name: 'Back to Assignments' });
        this.updatedAnswer = page.getByRole('button', { name: 'Update Answer' });
        this.viewAnswer = page.locator('button').filter({ hasText: 'View Answer' }).first();
        this.reworkAssignmenttab = page.getByRole('tab', { name: 'Rework Requested' }).first();
        this.reworkbutton = page.getByRole('button', { name: 'Rework' });
        this.backlink = page.getByText('Back', { exact: true });
    }


    async openAssignmentTasks() {
        if (await this.gotoAssigment.first().isVisible().catch(() => false)) {
            return;
        }
        await this.assignmentTasksLink.click();
        await expect(this.gotoAssigment.first()).toBeVisible({ timeout: 15000 });
    }

    async selectassignmentTask() {
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        await assignmentCard.getByRole('button', { name: 'Go to Assignment' }).click();
    }

    async resetbutton() {
        await this.openAssignmentTasks();
        await this.selectassignmentTask();
        await this.resetAssignmentButton.click();
    }

    async savedraftbutton() {
        await this.openAssignmentTasks();
        await this.selectassignmentTask();
        //await this.yourAnswer.fill(saveDraftAssignmentData.YourAnswer);
        const taskupload = path.resolve(__dirname, '..', 'Imageupload', 'AssigmentTask.txt');
        await this.choosefile.setInputFiles([taskupload]);
        await this.saveDraftButton.click();
    }
    async submitassignment() {
        await this.openAssignmentTasks();
        await this.selectassignmentTask();
        await this.page.waitForLoadState('domcontentloaded');
        await this.yourAnswer.scrollIntoViewIfNeeded();
        await this.yourAnswer.click();
        await this.yourAnswer.fill(saveDraftAssignmentData.YourAnswer);
        await expect(this.yourAnswer).toHaveValue(saveDraftAssignmentData.YourAnswer);
        await this.submitAnswerButton.click();
        await expect(this.backAssigment).toBeVisible({ timeout: 15000 });
        await this.backAssigment.click();
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
    }

    async editassignment() {
        await this.openAssignmentTasks();
        await this.donetab.click();
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        await assignmentCard.getByRole('button', { name: 'Edit' }).click();
        await this.yourAnswer.scrollIntoViewIfNeeded();
        await this.yourAnswer.click();
        await this.yourAnswer.fill(saveDraftAssignmentData.updatedAnswer);
        await expect(this.yourAnswer).toHaveValue(saveDraftAssignmentData.updatedAnswer);
        await this.updatedAnswer.click();
    }
    async viewanswer() {
        await this.openAssignmentTasks();
        await this.donetab.click();
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        await assignmentCard.getByRole('button', { name: 'View Answer' }).click();
        await expect(this.backAssigment).toBeVisible({ timeout: 15000 });
        const assignmentTitleText = this.page.getByText(assignmentTitle, { exact: false }).first();
        await expect(assignmentTitleText).toBeVisible({ timeout: 15000 });
        const titleText = (await assignmentTitleText.textContent()).trim();
        expect(titleText).toContain(assignmentTitle);
        console.log(`Assignment title: ${titleText}`);
        await this.backAssigment.click();
    }

async reworkRequested() {
        await this.openAssignmentTasks();
        await this.reworkAssignmenttab.click();
        await this.page.waitForLoadState('domcontentloaded');
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        await assignmentCard.locator('button').filter({ hasText: 'Rework' }).first().click();
        await this.page.waitForLoadState('domcontentloaded');
        await this.yourAnswer.scrollIntoViewIfNeeded();
        await this.yourAnswer.click();
        await this.yourAnswer.fill(saveDraftAssignmentData.YourAnswer);
        await expect(this.yourAnswer).toHaveValue(saveDraftAssignmentData.YourAnswer);
        await this.submitAnswerButton.click();
        await this.donetab.click();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
    }

    async submitstudnetassignment() {
        await this.openAssignmentTasks();
        await this.selectassignmentTask();
        await this.page.waitForLoadState('domcontentloaded');
        await this.yourAnswer.scrollIntoViewIfNeeded();
        await this.yourAnswer.click();
        await this.yourAnswer.fill(saveDraftAssignmentData.YourAnswer);
        await expect(this.yourAnswer).toHaveValue(saveDraftAssignmentData.YourAnswer);
        await this.submitAnswerButton.click();
         await this.donetab.click();
        const assignmentTitle = getAssignmentTitle() || publicAssignmentData.title;
        const assignmentCard = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ hasText: assignmentTitle })
            .first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
    }
}

module.exports = StudentAssignmentPage;