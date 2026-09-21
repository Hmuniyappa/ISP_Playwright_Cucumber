const { expect } = require('@playwright/test');
const path = require('path');
const createAssignmentData = require('../test-data/assignmentData.json').CreateAssignment;
const publicAssignmentData = require('../test-data/assignmentData.json').PublicAssignment;
const { setAssignmentTitle } = require('../utils/assignmentRuntime');
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

        this.uploadImagesInput = page.locator('input[type="file"]').first();
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
        // enable with LC drop down when the feature is implemented
        //this.lifeCompetencyDropdown = page.locator('#lifeCompetencies');
        //this.lifeCompetencyCheckbox = page.getByRole('listitem')
        //    .filter({ hasText: assignmentData.lifeCompetency });
        this.dueDaySpinbutton = this.page.getByRole('spinbutton', { name: 'Day' });
        this.dueMonthSpinbutton = this.page.getByRole('spinbutton', { name: 'Month' });
        this.dueYearSpinbutton = this.page.getByRole('spinbutton', { name: 'Year' });
        this.producemarking = page.getByRole('checkbox', { name: 'Produce marking' });
        this.producemarkingLabel = page.getByRole('textbox', { name: 'Please provide total mark' });
        this.producegrading = page.getByRole('checkbox', { name: 'Produce grading' });
        this.producegradingLabel = page.getByRole('textbox', { name: 'Provide grading criteria here' });
        this.saveForLaterBtn = page.getByRole('button', {
            name: 'Save For Later'
        });
        this.savedTab = page.getByRole('tab', { name: 'Saved' });
        this.resetbutton = page.getByRole('button', { name: 'Reset' });
        this.cancelbutton = page.getByRole('button', { name: 'Cancel' });
        this.createdbutton = page.getByRole('button', { name: 'Create' });
        this.publishedTab = page.getByRole('tab', { name: 'Published' });
        this.confirmBtn = page.getByRole('button', { name: 'Confirm' });
    }

    async navigateToAssignmentPage() {
        await this.manageAssignmentBtn.click();
        await this.createAssignmentBtn.click();
    }

    async verifyAssignmentPageLoaded() {
        await expect(this.titleTxt).toHaveValue(this.randomAssignmentId);
    }

    async verifySavedAssignmentDisplayed() {
        await this.savedTab.click();
        await expect(
            this.page.getByText(this.randomAssignmentId, { exact: true })
        ).toBeVisible();
        console.log("verifySavedAssignmentDisplayed ended");
    }

    // createAssignment method to fill the assignment form with data from assignmentData.json
    async createAssignment() {
        // A unique title lets the saved assignment be identified in the list
        this.randomAssignmentId = `${createAssignmentData.title} ${Date.now()}`.trim();
        setAssignmentTitle(this.randomAssignmentId);
        await this.titleTxt.fill(this.randomAssignmentId);
        await this.questionTxt.fill(createAssignmentData.question);
        const imagePath1 = path.resolve(__dirname, '..', 'Imageupload', 'Reading book.png');
        const imagePath2 = path.resolve(__dirname, '..', 'Imageupload', 'Book 1 image.png');
        await this.uploadImagesInput.setInputFiles([imagePath1, imagePath2]);
        await this.subjectDropdown.click();
        await this.page.getByRole('option', {
            name: createAssignmentData.subject
        }).click();
        await this.languageDropdown.click();
        await this.page.getByRole('option', {
            name: createAssignmentData.language
        }).click();
        await this.curriculumDropdown.click();
        await this.page.getByRole('option', {
            name: createAssignmentData.curriculum
        }).click();
        await this.ageRangeDropdown.click();
        await this.page.getByRole('option', {
            name: createAssignmentData.ageRange
        }).click();
        await this.classDropdown.click();
        // MUI renders the option list in a portal outside the combobox
        await this.page.getByRole('option', {
            name: createAssignmentData.className
        }).click();
        await this.selectStudents(createAssignmentData.student);
        await this.markingCriteriaTxt.fill(createAssignmentData.markingCriteria);
        await this.exampleAnswerTxt.fill(createAssignmentData.exampleAnswer);
        // enable with LC drop down when the feature is implemented
        //await this.selectLifeCompetencies();
        await this.setDueDate(createAssignmentData.dueDate); 
        await this.producemarking.check();
        await this.producemarkingLabel.click();
        await this.producemarkingLabel.fill(createAssignmentData.Producemarking);
        await this.producegrading.check();
        await this.producegradingLabel.click();
        await this.producegradingLabel.fill(createAssignmentData.Producegrading);
    }

    async createPublicAssignment() {
        // A unique title lets the saved assignment be identified in the list
        this.randomAssignmentId = `${publicAssignmentData.title} ${Date.now()}`.trim();
        setAssignmentTitle(this.randomAssignmentId);
        await this.titleTxt.fill(this.randomAssignmentId);
        await this.questionTxt.fill(publicAssignmentData.question);
        await this.subjectDropdown.click();
        await this.page.getByRole('option', {
            name: publicAssignmentData.subject
        }).click();
        await this.languageDropdown.click();
        await this.page.getByRole('option', {
            name: publicAssignmentData.language
        }).click();
        await this.curriculumDropdown.click();
        await this.page.getByRole('option', {
            name: publicAssignmentData.curriculum
        }).click();
        await this.ageRangeDropdown.click();
        await this.page.getByRole('option', {
            name: publicAssignmentData.ageRange
        }).click();
        await this.classDropdown.click();
        // MUI renders the option list in a portal outside the combobox
        await this.page.getByRole('option', {
            name: publicAssignmentData.className
        }).click();
        await this.selectStudents(publicAssignmentData.student);
        await this.markingCriteriaTxt.fill(publicAssignmentData.markingCriteria);
        await this.exampleAnswerTxt.fill(publicAssignmentData.exampleAnswer);
        //await this.selectLifeCompetencies();
        await this.setDueDate(publicAssignmentData.dueDate);
        this.createdTitle = this.randomAssignmentId;
}

    // MUI menus stay open with an invisible backdrop that blocks later clicks
    async closeOpenMenu() {
        await this.page.keyboard.press('Escape');
        await this.page.locator('.MuiBackdrop-root.MuiBackdrop-invisible')
            .waitFor({ state: 'detached' });
    }

    async selectStudents(students) {
        const studentNames = Array.isArray(students) ? students : [students];

        await this.studentDropdown.click();
        for (const studentName of studentNames) {
            await this.page.getByRole('option', {
                name: studentName
            }).getByRole('checkbox')
                .check();
        }
        await this.closeOpenMenu();
    }

    // The due date is a MUI segmented field: DD / MM / YYYY sections, not a single input
    async setDueDate(date) {
        await this.page.waitForTimeout(5000);
        const [day, month, year] = date.split('/');
        await this.dueDaySpinbutton.fill(day);
        await this.dueMonthSpinbutton.fill(month);
        await this.dueYearSpinbutton.fill(year);
        await expect(this.dueDaySpinbutton).toHaveText(day);
        await expect(this.dueMonthSpinbutton).toHaveText(month);
        await expect(this.dueYearSpinbutton).toHaveText(year);
        await this.page.waitForTimeout(5000);
    }

    async saveForLater() {
        await this.saveForLaterBtn.scrollIntoViewIfNeeded();
        await this.saveForLaterBtn.click();
        console.log("end saveForLater");
    }
   
    async publicAssignment() {
        await this.createdbutton.scrollIntoViewIfNeeded();
        await this.createdbutton.click();
        // Create only saves the assignment; it lands on the Saved list where it must be published
        const card = this.page.locator('.MuiPaper-root')
            .filter({ hasText: this.createdTitle })
            .first();
        await card.getByRole('button', { name: 'Publish' }).click();
        await this.confirmBtn.click();
        console.log("end publicAssignmentForm");
    }

    async clickResetButton() {
        // A unique title proves the reset entry never reached the Saved list
        this.resetTitle = `${createAssignmentData.title} Reset ${Date.now()}`;
        await this.titleTxt.fill(this.resetTitle);
        await this.questionTxt.fill(createAssignmentData.question);
        await this.markingCriteriaTxt.fill(createAssignmentData.markingCriteria);
        await this.resetbutton.scrollIntoViewIfNeeded();
        await this.resetbutton.click();
    }

    async resetAssignmentForm() {
        // The Saved tab lives on the assignment list page, not on the create form
        await this.manageAssignmentBtn.click();
        await this.savedTab.click();
        await expect(
            this.page.getByText(this.resetTitle, { exact: false })
        ).toHaveCount(0);
        console.log("end resetAssignmentForm");
    }

    async clickCancelButton() {
        // A unique title proves the cancel entry never reached the Saved list
        this.cancelTitle = `${createAssignmentData.title} Cancel ${Date.now()}`;
        await this.titleTxt.fill(this.cancelTitle);
        await this.questionTxt.fill(createAssignmentData.question);
        await this.markingCriteriaTxt.fill(createAssignmentData.markingCriteria);
        await this.cancelbutton.scrollIntoViewIfNeeded();
        await this.cancelbutton.click();
    }
    async cancelAssignmentForm() {
        // The Saved tab lives on the assignment list page, not on the create form
        await this.manageAssignmentBtn.click();
        await this.savedTab.click();
        await expect(
            this.page.getByText(this.cancelTitle, { exact: false })
        ).toHaveCount(0);
        console.log("end cancelAssignmentForm");
    }

    async verifyPublicAssignmentDisplayed() {
        await this.publishedTab.click();
        await expect(
            this.page.getByText(this.randomAssignmentId, { exact: false }).first()
        ).toBeVisible({ timeout: 15000 });
    }

    // async selectLifeCompetencies() {
    //     await this.lifeCompetencyDropdown.waitFor();
    //     if (await this.lifeCompetencyDropdown.locator('.MuiChip-root').count() > 0) {
    //         return;
    //     }
    //     await this.lifeCompetencyDropdown.click();
    //     await this.lifeCompetencyCheckbox.first().getByRole('checkbox').check();
    //     await this.closeOpenMenu();
    // }
}

module.exports = { AssignmentPage };