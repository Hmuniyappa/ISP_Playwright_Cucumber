const { expect } = require('@playwright/test');
const assignmentData = require('../test-data/assignmentData.json').CreateAssignment;

class AssignmentPage {
    constructor(page) {
        this.page = page;

        // Dashboard renders both a nav button and a card button with this name
        this.manageAssignmentBtn = page.getByRole('button', {
            name: 'Manage Assignments'
        }).first();

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
        // These two selects have no accessible label - only placeholder text
        this.classDropdown = page.getByText('Choose a Class', { exact: true });
        this.studentDropdown = page.getByText('Select Students', { exact: true });
        this.markingCriteriaTxt = page.getByRole('textbox', {
            name: 'Marking Criteria/Rubric*'
        });

        this.exampleAnswerTxt = page.getByRole('textbox', {
            name: 'Example Answer*'
        });
        this.lifeCompetencyDropdown = page.locator('#lifeCompetencies');
        this.lifeCompetencyCheckbox = page.getByRole('listitem')
            .filter({ hasText: assignmentData.lifeCompetency });
        this.dueDaySpinbutton = this.page.getByRole('spinbutton', { name: 'Day' });
        this.dueMonthSpinbutton = this.page.getByRole('spinbutton', { name: 'Month' });
        this.dueYearSpinbutton = this.page.getByRole('spinbutton', { name: 'Year' });
        this.saveForLaterBtn = page.getByRole('button', {
            name: 'Save For Later'
        });
        this.savedTab = page.getByRole('tab', { name: 'Saved' });
    }

    async navigateToAssignmentPage() {
        await this.manageAssignmentBtn.click();
        await this.createAssignmentBtn.click();
    }

    async verifyAssignmentPageLoaded() {
        await expect(this.titleTxt).toHaveValue(this.createdTitle);
    }

    async verifySavedAssignmentDisplayed() {
        await this.savedTab.click();
        await expect(
            this.page.getByText(this.createdTitle, { exact: true })
        ).toBeVisible();
    }

    // createAssignment method to fill the assignment form with data from assignmentData.json
    async createAssignment() {
        // A unique title lets the saved assignment be identified in the list
        this.createdTitle = `${assignmentData.title} ${Date.now()}`;
        await this.titleTxt.fill(this.createdTitle);
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
        // MUI renders the option list in a portal outside the combobox
        await this.page.getByRole('option', {
            name: assignmentData.className
        }).click();
        await this.studentDropdown.click();
        await this.page.getByRole('option', {
            name: assignmentData.student
        }).getByRole('checkbox')
            .check();
        await this.closeOpenMenu();
        await this.markingCriteriaTxt.fill(assignmentData.markingCriteria);
        await this.exampleAnswerTxt.fill(assignmentData.exampleAnswer);
        await this.selectLifeCompetencies();
        await this.setDueDate(assignmentData.dueDate);
    }

    // The subject can pre-fill up to the max of 3 competencies; only pick one when empty
    async selectLifeCompetencies() {
        await this.lifeCompetencyDropdown.waitFor();
        if (await this.lifeCompetencyDropdown.locator('.MuiChip-root').count() > 0) {
            return;
        }
        await this.lifeCompetencyDropdown.click();
        await this.lifeCompetencyCheckbox.first().getByRole('checkbox').check();
        await this.closeOpenMenu();
    }

    // MUI menus stay open with an invisible backdrop that blocks later clicks
    async closeOpenMenu() {
        await this.page.keyboard.press('Escape');
        await this.page.locator('.MuiBackdrop-root.MuiBackdrop-invisible')
            .waitFor({ state: 'detached' });
    }

    // The due date is a MUI segmented field: DD / MM / YYYY sections, not a single input
    async setDueDate(date) {
        const [day, month, year] = date.split('/');
        await this.dueDaySpinbutton.fill(day);
        await this.dueMonthSpinbutton.fill(month);
        await this.dueYearSpinbutton.fill(year);
        await expect(this.dueDaySpinbutton).toHaveText(day);
        await expect(this.dueMonthSpinbutton).toHaveText(month);
        await expect(this.dueYearSpinbutton).toHaveText(year);
    }

    async saveForLater() {
        await this.saveForLaterBtn.scrollIntoViewIfNeeded();
        await this.saveForLaterBtn.click();
    }
}

module.exports = { AssignmentPage };