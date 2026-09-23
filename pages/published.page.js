const { expect } = require('@playwright/test');
const createAssignmentData = require('../test-data/assignmentData.json').CreateAssignment;
const publicAssignmentData = require('../test-data/assignmentData.json').PublicAssignment;
const { getAssignmentTitle, setAssignmentTitle } = require('../utils/assignmentRuntime');
const SaveAssignmentPage = require('./saveAssigment.page');

class publishedAssignmentPage extends SaveAssignmentPage {
    constructor(page) {
        super(page);
        this.page = page;
        this.publishedtab = page.getByRole('tab', { name: 'Published' });
        this.viewbtn = page.getByRole('button', { name: 'View' });
        this.unPublishbtn = page.getByRole('button', { name: 'Unpublish' });
        this.closebtn = page.getByRole('button', { name: 'Close' });
        this.createdbutton = page.getByRole('button', { name: 'Create' });
        this.copybtn = page.getByRole('button', { name: 'Copy' });
        this.submissionsbtn = page.getByRole('button', { name: 'View Submissions' });
        this.regeneratebtn = page.getByRole('button', { name: /Regenerate/i }).first();
        this.regeneratewithfeedbackbtn = page.getByRole('button', { name: 'Regenerate with Feedback' });
        this.editicon = page.locator('[aria-label="Edit AI Generated Feedback"], button:has-text("Edit"), [title*="Edit"]').first();
        this.savebutton = page.getByRole('button', { name: 'Save' });
        this.publicreworkbtn = page.getByRole('button', { name: 'Publish + Rework' });
        this.publicfinialisebtn = page.getByRole('button', { name: 'Publish + Finalize' });
        this.backlink = page.getByText('Back', { exact: true });
        this.confirm = page.getByRole('button', { name: 'Confirm' });
        this.cancel = page.getByRole('button', { name: 'Cancel' });
        this.feedbacktext = page.locator('textarea:not([aria-hidden="true"]):not([readonly]), [contenteditable="true"]').last();
        this.studentfeedbacktext = page.locator('div').filter({ hasText: 'Student Feedback' }).first();
        this.aifeedbacktext = page.locator('div').filter({ hasText: 'Please share any comments or suggestions' }).first();
        this.starticon = page.getByText('4 Stars, Good', { exact: true });
        this.submitbtn = page.getByRole('button', { name: 'Submit' });
        this.viewHistorybtn = page.getByText('View History', { exact: true });
        this.closeassigmnetbtn = page.getByText('Close', { exact: true });
    }


    async getViewAssignmentHeader() {
        this.closebtn = this.page.getByRole('button', { name: 'Close', exact: true });
        await expect(this.closebtn).toBeVisible({ timeout: 15000 });
        return await this.page.locator('body').textContent();
    }

    async getCardTitle(assignmentCard) {
        return await assignmentCard.getByRole('heading').textContent();
    }
    async selectAssignmentPublishedTitle() {
        await this.publishedtab.click();
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
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        return assignmentCard;
    }
    async clickViewButton() {
        await this.openManageAssignments();
        await this.publishedtab.click();
        const assignmentCard = this.page.locator('.MuiPaper-root').first();
        await expect(assignmentCard).toBeVisible({ timeout: 15000 });
        const cardTitle = await this.getCardTitle(assignmentCard);
        await assignmentCard.getByRole('button', { name: 'View', exact: true }).click();
        const popupHeader = await this.getViewAssignmentHeader();
        console.log('Card Title:', cardTitle);
        console.log('Popup Header:', popupHeader);
        const stableTitle = value => value.trim().replace(/\s+\d+$/, '');
        expect(stableTitle(popupHeader)).toContain(stableTitle(cardTitle));
        await this.closebtn.click();
    }

    async continueCopyPublishedAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.copybtn).click();
    }

    async clickViewSubmissionsButton() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        if (receivedCount === 0) {
            await expect(this.page.getByText('No. of submissions received')).toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText('No. of remaining submissions')).toBeVisible({ timeout: 15000 });
            await this.backlink.click();
            return;
        }
        const firstSubmission = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ has: this.page.getByRole('button', { name: /View|Review|Feedback|Regenerate/i }) })
            .first();
        if (await firstSubmission.isVisible().catch(() => false)) {
            await firstSubmission.click();
        }
        await this.regeneratebtn.scrollIntoViewIfNeeded();
        await expect(this.regeneratebtn).toBeVisible({ timeout: 15000 });
        await this.regeneratebtn.click();
        const studentFeedback = this.page.getByText(/Student Feedback/i).first();
        await expect(studentFeedback).toBeVisible({ timeout: 15000 });
        await this.backlink.click();
        console.log("continuecopydAssignment ended");
    }

    async verifyCopiedAssignmentSaved() {
        await expect(this.questionTxt).toBeVisible({ timeout: 15000 });
        await this.titleTxt.clear();
        await this.titleTxt.fill(createAssignmentData.publishedtitle);
        await this.createdbutton.click();
        console.log("copy published Assignment ended");
    }

    async unPublishedAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        this.deletedAssignmentTitle = (await assignmentCard.getByRole('heading').first().textContent()).trim();
        await assignmentCard.locator(this.unPublishbtn).click();
        const confirmDialog = this.page.getByRole('dialog').filter({ hasText: 'Cancel Publish' });
        await expect(confirmDialog).toBeVisible({ timeout: 15000 });
        const publishResponsePromise = this.page.waitForResponse(response =>
            ['POST', 'PUT', 'PATCH'].includes(response.request().method()),
            { timeout: 15000 }
        ).catch(() => null);
        await confirmDialog.getByRole('button', { name: 'Confirm' }).click();
        const publishResponse = await publishResponsePromise;
        expect(publishResponse).not.toBeNull();
        await expect(confirmDialog).toHaveCount(0, { timeout: 15000 });
    }

    async verifyunPublishedAssignmentdeleted() {
        await this.page.reload({ waitUntil: 'networkidle' });
        await this.savedTab.click();
        await this.search.fill(this.deletedAssignmentTitle.trim());
        await expect(
            this.page.getByText(this.deletedAssignmentTitle, { exact: true })
        ).toHaveCount(0, { timeout: 15000 });
        console.log("unpublished Assignment verification ended");
    }

    async regenerateAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        console.log(`Received count text: ${receivedCountText}`);
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        console.log(`Received count: ${receivedCount}`);
        if (receivedCount === 0) {
            await expect(this.page.getByText('No. of submissions received')).toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText('No. of remaining submissions')).toBeVisible({ timeout: 15000 });
            await this.backlink.click();
            return;
        }
        const firstSubmission = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ has: this.page.getByRole('button', { name: /View|Review|Feedback|Regenerate/i }) })
            .first();
        if (await firstSubmission.isVisible().catch(() => false)) {
            await firstSubmission.click();
        }
        await this.regeneratewithfeedbackbtn.scrollIntoViewIfNeeded();
        await expect(this.regeneratewithfeedbackbtn).toBeVisible({ timeout: 15000 });
        await this.regeneratewithfeedbackbtn.click();
        const studentFeedback = this.page.getByText(/Student Feedback/i).first();
        await expect(studentFeedback).toBeVisible({ timeout: 15000 });
        await this.cancel.click(); // Optional: Click cancel if needed before confirming
        await this.regeneratewithfeedbackbtn.click();
        await this.feedbacktext.fill(publicAssignmentData.feedback);
        await this.confirm.click();
        await this.backlink.click();
    }

    async editassigmentfeedback() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        expect(receivedCount).toBeGreaterThan(0);
        const firstSubmission = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ has: this.page.getByRole('button', { name: /View|Review|Feedback|Regenerate/i }) })
            .first();
        if (await firstSubmission.isVisible().catch(() => false)) {
            await firstSubmission.click();
        }
        await this.expandStudentFeedback();
        await this.scrollFeedbackToEnd();
        if (await this.page.getByText(publicAssignmentData.editFeedback, { exact: false }).first().isVisible().catch(() => false)) {
            console.log('Assignment feedback already edited successfully');
            return;
        }
        if (!await this.editicon.isVisible().catch(() => false)) {
            console.log('Assignment feedback already saved; edit icon is not visible');
            return;
        }
        await this.editicon.scrollIntoViewIfNeeded();
        await expect(this.editicon).toBeVisible({ timeout: 15000 });
        await this.editicon.click();
        await this.fillFeedbackEditor(publicAssignmentData.editFeedback);
        await this.savebutton.click();
        await this.validateToastMessage('successfully');
        await expect(this.editicon).toBeHidden({ timeout: 15000 });
        console.log('Assignment feedback edited successfully');
    }

    async expandStudentFeedback() {
        const studentFeedbackHeader = this.page.getByText('Student Feedback', { exact: true }).first();
        await expect(studentFeedbackHeader).toBeVisible({ timeout: 15000 });
        await studentFeedbackHeader.scrollIntoViewIfNeeded();
        if (await this.editicon.isVisible().catch(() => false)) {
            return;
        }
        await studentFeedbackHeader.click();
        await expect(this.page.getByText(/About the task/i).first()).toBeVisible({ timeout: 15000 });
    }

    async fillFeedbackEditor(feedback) {
        if (await this.feedbacktext.isVisible().catch(() => false)) {
            await this.feedbacktext.fill(feedback);
            return;
        }

        const editableFeedback = this.page.locator('[contenteditable="true"], textarea:not([aria-hidden="true"]):not([readonly]), input:not([readonly])').last();
        if (await editableFeedback.isVisible().catch(() => false)) {
            await editableFeedback.fill(feedback);
            return;
        }

        await this.page.keyboard.press('Control+A');
        await this.page.keyboard.type(feedback);
    }

    async scrollFeedbackToEnd() {
        const feedbackPanel = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"], div')
            .filter({ hasText: /Student Feedback/ })
            .last();
        await feedbackPanel.evaluate(element => {
            const scrollable = [...element.querySelectorAll('*')]
                .find(child => child.scrollHeight > child.clientHeight);
            (scrollable || element).scrollTop = (scrollable || element).scrollHeight;
        });
    }

    async validateToastMessage(expectedMessage) {
        const toast = this.page.getByText(new RegExp(expectedMessage, 'i')).first();
        await expect(toast).toBeVisible({ timeout: 10000 });
        const actualMessage = await toast.textContent();
        expect(actualMessage.trim().toLowerCase()).toContain(expectedMessage.toLowerCase());
    }

    async publishandfinishButton() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        if (receivedCount === 0) {
            await expect(this.page.getByText('No. of submissions received')).toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText('No. of remaining submissions')).toBeVisible({ timeout: 15000 });
            await this.backlink.click();
            return;
        }
        let finalizedCount = 0;
        const studentNames = Array.isArray(publicAssignmentData.student)
            ? publicAssignmentData.student
            : [publicAssignmentData.student];
        const studentSearch = this.page.getByRole('textbox', { name: /Search student by name/i });
        if (await studentSearch.isVisible().catch(() => false)) {
            await studentSearch.clear();
        }

        for (let pass = 0; pass < 2; pass++) {
            for (const studentName of studentNames) {
                finalizedCount += await this.publishFinalizeForStudent(studentName);
            }
        }

        for (const studentName of studentNames) {
            await this.selectStudentSubmission(studentName);
            await this.scrollFeedbackToEnd();
            const publishFinalizeButton = this.page.locator('button').filter({ hasText: 'Publish + Finalize' }).first();
            await expect(publishFinalizeButton).toHaveCount(0, { timeout: 15000 });
        }

        console.log(`Published and finalized ${finalizedCount} student submission(s)`);
        await this.backlink.click();
    }

    async publishFinalizeForStudent(studentName) {
        await this.selectStudentSubmission(studentName);
        await expect(this.page.getByText('Student Feedback', { exact: true }).first()).toBeVisible({ timeout: 15000 });
        await this.scrollFeedbackToEnd();

        const publishFinalizeButton = this.page.locator('button').filter({ hasText: 'Publish + Finalize' }).first();
        if (!await publishFinalizeButton.isVisible().catch(() => false)) {
            return 0;
        }

        await publishFinalizeButton.scrollIntoViewIfNeeded();
        await expect(publishFinalizeButton).toBeVisible({ timeout: 15000 });
        await publishFinalizeButton.click();
        await this.closeAiFeedbackDialog();
        await expect(publishFinalizeButton).toBeHidden({ timeout: 15000 });
        return 1;
    }

    async closeAiFeedbackDialog() {
        const feedbackDialog = this.page.getByRole('dialog').filter({ hasText: 'How would you rate the AI feedback?' });
        if (!await feedbackDialog.isVisible().catch(() => false)) {
            return;
        }
        const skipButton = feedbackDialog.getByRole('button', { name: 'Skip' });
        if (await skipButton.isVisible().catch(() => false)) {
            await skipButton.click();
        }
        else {
            await feedbackDialog.getByRole('button', { name: 'Submit' }).click();
        }
        await expect(feedbackDialog).toHaveCount(0, { timeout: 15000 });
    }

    async selectStudentSubmission(studentName) {
        await this.scrollSubmissionsListIntoView();
        const submissionsPanel = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ has: this.page.getByText('Submissions', { exact: true }) })
            .first();
        const studentRow = submissionsPanel.getByText(new RegExp(`^\\s*${studentName}\\s*$`)).first();
        await studentRow.scrollIntoViewIfNeeded();
        await expect(studentRow).toBeVisible({ timeout: 15000 });
        await studentRow.click();
    }

    async scrollSubmissionsListIntoView() {
        await this.page.evaluate(() => {
            const scrollables = [...document.querySelectorAll('*')]
                .filter(element => element.scrollHeight > element.clientHeight);
            for (const scrollable of scrollables) {
                scrollable.scrollTop = Math.min(scrollable.scrollHeight, scrollable.scrollTop + 900);
            }
            if (document.scrollingElement) {
                document.scrollingElement.scrollTop = Math.min(
                    document.scrollingElement.scrollHeight,
                    document.scrollingElement.scrollTop + 900
                );
            }
        });
    }

    async viewhistoryassigment() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        if (receivedCount === 0) {
            await expect(this.page.getByText('No. of submissions received')).toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText('No. of remaining submissions')).toBeVisible({ timeout: 15000 });
            await this.backlink.click();
            return;
        }
        const firstSubmission = this.page.locator('.MuiPaper-root, [class*="card"], [class*="Card"]')
            .filter({ has: this.page.getByRole('button', { name: /View|Review|Feedback|Regenerate/i }) })
            .first();
        if (await firstSubmission.isVisible().catch(() => false)) {
            await firstSubmission.click();
        }
        await this.viewHistorybtn.scrollIntoViewIfNeeded();
        await expect(this.viewHistorybtn).toBeVisible({ timeout: 15000 });
        await this.viewHistorybtn.click();
        await expect(this.page.getByText(/History/i).first()).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        if (await this.editicon.isVisible().catch(() => false)) {
            await this.editicon.click();
        }
        await this.backlink.click();
    }

    async closeAssignment() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        this.closeassignmentTitle = (await assignmentCard.getByRole('heading').first().textContent()).trim();
        await assignmentCard.locator(this.closeassigmnetbtn).click();
        const confirmDialog = this.page.getByRole('dialog').filter({ hasText: 'Confirm Close' });
        await expect(confirmDialog).toBeVisible({ timeout: 15000 });
        const publishResponsePromise = this.page.waitForResponse(response =>
            ['POST', 'PUT', 'PATCH'].includes(response.request().method()),
            { timeout: 15000 }
        ).catch(() => null);
        await confirmDialog.getByRole('button', { name: 'Confirm' }).click();
        const publishResponse = await publishResponsePromise;
        expect(publishResponse).not.toBeNull();
        await expect(confirmDialog).toHaveCount(0, { timeout: 15000 });
    }
    async verifycloseAssignment() {
        await this.page.reload({ waitUntil: 'networkidle' });
        await this.savedTab.click();
        await this.search.fill(this.closeassignmentTitle.trim());
        await expect(
            this.page.getByText(this.closeassignmentTitle, { exact: true })
        ).toHaveCount(0, { timeout: 15000 });
        console.log("closed Assignment verification ended");
    }

    async publishandReworkButton() {
        await this.openManageAssignments();
        await this.selectAssignmentPublishedTitle();
        const assignmentCard = await this.getSavedAssignmentCard();
        await assignmentCard.locator(this.submissionsbtn).click();
        await expect(this.page.getByRole('heading', { name: 'View Submissions' })).toBeVisible({ timeout: 15000 });
        await expect(this.page.getByText(this.assignmentTitle, { exact: false }).first()).toBeVisible({ timeout: 15000 });
        const receivedCountText = await this.page.getByText(/\d+\s*\/\s*\d+/).first().textContent();
        const receivedCount = Number(receivedCountText.split('/')[0].trim());
        if (receivedCount === 0) {
            await expect(this.page.getByText('No. of submissions received')).toBeVisible({ timeout: 15000 });
            await expect(this.page.getByText('No. of remaining submissions')).toBeVisible({ timeout: 15000 });
            await this.backlink.click();
            return;
        }
        let finalizedCount = 0;
        const studentNames = Array.isArray(publicAssignmentData.student)
            ? publicAssignmentData.student
            : [publicAssignmentData.student];
        const studentSearch = this.page.getByRole('textbox', { name: /Search student by name/i });
        if (await studentSearch.isVisible().catch(() => false)) {
            await studentSearch.clear();
        }

        for (let pass = 0; pass < 2; pass++) {
            for (const studentName of studentNames) {
                finalizedCount += await this.publishandReworkForStudent(studentName);
            }
        }

        for (const studentName of studentNames) {
            await this.selectStudentSubmission(studentName);
            await this.scrollFeedbackToEnd();
            const publishReworkButton = this.page.locator('button').filter({ hasText: 'Publish + Rework' }).first();
            await expect(publishReworkButton).toHaveCount(0, { timeout: 15000 });
        }

        console.log(`Published and Reworked ${finalizedCount} student submission(s)`);
        await this.backlink.click();
    }
    
    async publishandReworkForStudent(studentName) {
        await this.selectStudentSubmission(studentName);
        await expect(this.page.getByText('Student Feedback', { exact: true }).first()).toBeVisible({ timeout: 15000 });
        await this.scrollFeedbackToEnd();
        const publishReworkButton = this.page.locator('button').filter({ hasText: 'Publish + Rework' }).first();
        if (!await publishReworkButton.isVisible().catch(() => false)) {
            return 0;
        }
        await publishReworkButton.scrollIntoViewIfNeeded();
        await expect(publishReworkButton).toBeVisible({ timeout: 15000 });
        await publishReworkButton.click();
        await this.closeAiFeedbackDialog();
        await expect(publishReworkButton).toBeHidden({ timeout: 15000 });
        return 1;
    }
}
module.exports = publishedAssignmentPage;   