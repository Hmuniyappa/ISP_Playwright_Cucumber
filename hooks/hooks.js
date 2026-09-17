const {
  Before,
  After,
  setDefaultTimeout,
  Status
} = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');
const fs = require('fs');
require('dotenv').config();
setDefaultTimeout(60 * 1000);

Before(async function () {
  // Create folders if not present
  if (!fs.existsSync('test-results/videos')) {
    fs.mkdirSync('test-results/videos', { recursive: true });
  }
  if (!fs.existsSync('test-results/traces')) {
    fs.mkdirSync('test-results/traces', { recursive: true });
  }
  if (!fs.existsSync('test-results/screenshots')) {
    fs.mkdirSync('test-results/screenshots', { recursive: true });
  }

  // Arrays to store logs
  this.consoleLogs = [];
  this.pageErrors = [];
  this.networkFailures = [];

  // Launch Browser
  this.browser = await chromium.launch({
    headless: false
  });

  const contextOptions = {};

  // Record Videos
  contextOptions.recordVideo = {
    dir: 'test-results/videos/',
    size: {
      width: 1280,
      height: 720
    }
  };

  // Create Context
  this.context = await this.browser.newContext(contextOptions);

  // Start Trace Recording
  await this.context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true
  });

  // Create New Page
  this.page = await this.context.newPage();

  // Capture Browser Console Logs
  this.page.on('console', (msg) => {
    this.consoleLogs.push(
      `[${msg.type().toUpperCase()}] ${msg.text()}`
    );
  });

  // Capture JavaScript Errors
  this.page.on('pageerror', (error) => {
    this.pageErrors.push(
      error.message
    );
  });

  // Capture Network Failures
  this.page.on('requestfailed', (request) => {
    this.networkFailures.push(
      `${request.method()} ${request.url()}`
    );
  });

});

After(async function (scenario) {

  const hasFailed = scenario.result.status === Status.FAILED;
  const video = this.page?.video();
  const videoPath = `test-results/videos/${Date.now()}.webm`;

  try {

    if (hasFailed) {

      // Screenshot

      const screenshot = await this.page.screenshot({
        path: `test-results/screenshots/${Date.now()}.png`
      });

      await this.attach(
        screenshot,
        'image/png'
      );

      // Trace

      const traceFile =
        `test-results/traces/${Date.now()}.zip`;

      await this.context.tracing.stop({
        path: traceFile
      });

      const traceBuffer =
        fs.readFileSync(traceFile);

      await this.attach(
        traceBuffer,
        'application/zip'
      );

    }
    else {
      await this.context.tracing.stop();
    }
  } catch (error) {
    console.log(
      'After Hook Error:',
      error.message
    );
  }
  finally {
    try {
      await this.page?.close().catch(() => { });
      await this.context?.close().catch(() => { });

      if (hasFailed && video) {
        await video.saveAs(videoPath);

        if (fs.existsSync(videoPath)) {
          const videoBuffer = fs.readFileSync(videoPath);
          await this.attach(
            videoBuffer,
            'video/webm'
          );
        }
      }
    } catch (error) {
      console.log(
        'After Hook Cleanup Error:',
        error.message
      );
    } finally {
      await this.browser?.close().catch(() => { });
    }
  }

});