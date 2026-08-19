const {
  Before,
  After,
  setDefaultTimeout,
  Status
} = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const allure = require("allure-js-commons");
require('dotenv').config();

setDefaultTimeout(60 * 1000);

Before(async function () {

  this.browser = await chromium.launch({
    headless: false
  });

  let contextOptions = {};

  try {
    const fs = require('fs');

    if (fs.existsSync('./storageState.json')) {
      contextOptions.storageState = './storageState.json';
    }
  } catch (e) {
    console.log("No storageState found, starting fresh session");
  }

  this.context = await this.browser.newContext(contextOptions);
  this.page = await this.context.newPage();

});

After(async function (scenario) {

  if (this.page && scenario.result && scenario.result.status === Status.FAILED) {
    try {
      const screenshot = await this.page.screenshot({
        fullPage: true
      });

      // This attaches screenshot to Allure
      await this.attach(screenshot, 'image/png');
    } catch (error) {
      // Browser may not have launched successfully.
    }
  }

  if (this.page) await this.page.close().catch(() => {});
  if (this.context) await this.context.close().catch(() => {});
  if (this.browser) await this.browser.close().catch(() => {});

});