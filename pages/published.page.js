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
            .first();
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
        await expect(this.questionTxt).toBeVisible({ timeout: 15000 });
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
        console.log("continueunpublishedAssignment ended");
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

}


module.exports = publishedAssignmentPage;