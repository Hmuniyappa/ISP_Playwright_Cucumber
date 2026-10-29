const { Before, After } = require('@cucumber/cucumber');
const { acknowledgeTeacherNotice } = require('../utils/teacherNotice');

const POLL_INTERVAL_MS = 500;

// Runs alongside the scenario so the popup is cleared even while a step
// (e.g. the login click) is blocked waiting for the home page
Before(function () {
  this.teacherNoticeActive = true;

  this.teacherNoticeWatcher = (async () => {
    while (this.teacherNoticeActive) {
      try {
        if (this.page && !this.page.isClosed()) {
          await acknowledgeTeacherNotice(this.page);
        }
      } catch (error) {
        // Page may be navigating; retry on the next poll
      }
      await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL_MS));
    }
  })();
});

After(async function () {
  this.teacherNoticeActive = false;
  await this.teacherNoticeWatcher;
});
