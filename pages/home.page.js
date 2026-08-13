const { BasePage } = require('./base.page');

class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async open() {
    await this.goto('/');
  }

  async getTitle() {
    return await this.page.title();
  }
}

module.exports = { HomePage };
