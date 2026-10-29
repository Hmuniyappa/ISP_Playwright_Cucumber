const { acknowledgeTeacherNotice } = require('../utils/teacherNotice');

class LoginPage {

  constructor(page) {
    this.page = page;
    this.classLinkSSOButton = page.getByRole('button', { name: 'Sign in with ClassLink' });
    this.classLinkTutorButton = page.getByRole('button', { name: 'Sign in with ClassLink SSO' });
    this.UsernameField = page.getByRole('textbox', { name: 'Username' });
    this.PasswordField = page.getByRole('textbox', { name: 'Password' });
    this.SignInButton = page.getByRole('button', { name: 'Sign In' });
    this.acknowledge = page.getByRole('checkbox', { name: /I acknowledge/i });
    this.Continue=page.getByRole('button', { name: 'Continue' });
  }

  async login(username, password) {
    await this.classLinkSSOButton.click();
    await this.UsernameField.fill(username);
    await this.PasswordField.fill(password);
  }
  async clickSignInButton() {
    await this.page.waitForLoadState('networkidle');
    await this.SignInButton.click();
    await acknowledgeTeacherNotice(this.page, { waitMs: 5000 });  
  }

  async loginbutton()
  {
    await this.page.waitForLoadState('networkidle');
    await this.SignInButton.click();
    await this.page.waitForURL('**/teacher/i', { timeout: 90000 }); 
    //await this.acknowledge.check();
    //await this.Continue.click();
  }

  async navigateToDashboard() {
    console.log("MarkingURL =", process.env.MarkingURL);
    await this.page.goto(process.env.MarkingURL);
  }

  async loginAItutor(username, password) {
    await this.classLinkTutorButton.click();
    await this.UsernameField.fill(username);
    await this.PasswordField.fill(password);
  }

  async navigateToAItutor() {
    console.log("AI tutor", process.env.TutorBuddy);
    await this.page.goto(process.env.TutorBuddy);
  }
}

module.exports = { LoginPage };