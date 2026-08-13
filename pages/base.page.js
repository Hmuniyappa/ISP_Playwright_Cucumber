class BasePage {
  constructor(page) {
    this.page = page;
  }

  async goto(path = '/') {
    await this.page.goto(path);
  }

  async getTitle() {
    return this.page.title();
  }

  locator(selector) {
    return this.page.locator(selector);
  }

  getByRole(role, options) {
    return this.page.getByRole(role, options);
  }

  getByText(text, options) {
    return this.page.getByText(text, options);
  }
}

module.exports = { BasePage };
