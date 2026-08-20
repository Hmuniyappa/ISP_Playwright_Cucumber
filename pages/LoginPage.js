class LoginPage {

  constructor(page) {
    this.page = page;
    this.classLinkSSOButton = page.getByRole('button', { name: 'Sign in with ClassLink SSO' });
    this.UsernameField  = page.getByRole('textbox', { name: 'Username' });
    this.PasswordField = page.getByRole('textbox', { name: 'Password' });
    this.SignInButton = page.getByRole('button', { name: 'Sign In' }); 
  }

  async login(username, password) {
    await this.classLinkSSOButton.click();
    await this.UsernameField.fill(username);
    await this.PasswordField.fill(password);
  }
  async clickSignInButton() {
  await this.page.waitForLoadState('networkidle');   
  await this.SignInButton.click();
  await this.page.waitForURL('**/dashboard', { timeout: 60000 });
  }

  async navigateToDashboard() {
    console.log("MarkingURL =", process.env.MarkingURL);
    await this.page.goto(process.env.MarkingURL);
}
}

module.exports = { LoginPage };