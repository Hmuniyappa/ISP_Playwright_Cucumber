const { When } = require('@cucumber/cucumber');
const { LoginPage } = require('../pages/LoginPage');
const { MarkingCredintial } = require('../test-data/Login.json');

When('User enter UsernameStudent1 and Password', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(MarkingCredintial.UsernameStudent1, MarkingCredintial.Password);
});

When('User enter UsernameStudent2 and Password', async function () {
    const loginPage = new LoginPage(this.page);
    await loginPage.login(MarkingCredintial.UsernameStudent2, MarkingCredintial.Password);
});