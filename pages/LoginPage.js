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
    await this.SignInButton.click();
  }

  async navigateToDashboard() {
    await this.page.goto('https://develop.dyhlucn3il1ki.amplifyapp.com/dashboard');
}
}

module.exports = { LoginPage };