const { expect } = require('@playwright/test');
const assignmentData = require('../test-data/assignmentData.json');

class AssignmentPage {
    constructor(page) {
        this.page = page;

        this.manageAssignmentBtn = page.getByRole('button', {
            name: 'Manage Assignment'
        });

        this.createAssignmentBtn = page.getByRole('button', {
            name: 'Create Assignment'
        });

        this.titleTxt = page.getByRole('textbox', {
            name: 'Title*'
        });

        this.questionTxt = page.getByRole('textbox', {
            name: 'Assignment questions*'
        });

        this.subjectDropdown = page.getByRole('combobox', {
            name: 'Select Subject'
        });

        this.languageDropdown = page.getByRole('combobox', {
            name: 'Select Language'
        });

        this.curriculumDropdown = page.getByRole('combobox', {
            name: 'Select Curriculum'
        });

        this.ageRangeDropdown = page.getByRole('combobox', {
            name: 'Select Age Range'
        });

        this.classDropdown = page.getByText('Choose a Class');

        this.studentDropdown = page.getByRole('combobox', {
            name: 'Select Students'
        });

        this.markingCriteriaTxt = page.getByRole('textbox', {
            name: 'Marking Criteria/Rubric*'
        });
    }

    async navigateToAssignmentPage() {
        await this.manageAssignmentBtn.click();
        await this.createAssignmentBtn.click();
    }

    async verifyAssignmentPageLoaded() {
        await expect(this.titleTxt).toHaveValue(assignmentData.title);
    }

    // createAssignment method to fill the assignment form with data from assignmentData.json
    async createAssignment() {
        await this.titleTxt.fill(assignmentData.title);
        await this.questionTxt.fill(assignmentData.question);
        await this.subjectDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.subject
        }).click();
        await this.languageDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.language
        }).click();
        await this.curriculumDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.curriculum
        }).click();
        await this.ageRangeDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.ageRange
        }).click();
        await this.classDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.className
        }).click();
        await this.studentDropdown.click();
        await this.page.getByRole('option', {
                name: assignmentData.student
            }).getByRole('checkbox')
            .check();
        await this.page.locator(
            '.MuiBackdrop-root.MuiBackdrop-invisible'
        ).click();
        await this.markingCriteriaTxt.fill(assignmentData.markingCriteria);
    }
}

module.exports = { AssignmentPage };