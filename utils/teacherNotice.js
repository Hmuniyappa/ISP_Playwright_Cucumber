const { expect } = require('@playwright/test');

const CHECKBOX = '#teacher-responsibility-acknowledgement';

// Handles the "Teacher Responsibility Notice" popup shown after login.
// Returns true if the popup was handled, false if it was not displayed.
async function acknowledgeTeacherNotice(page, { waitMs = 0 } = {}) {
  const checkbox = page.locator(CHECKBOX);

  if (waitMs > 0) {
    await checkbox.waitFor({ state: 'visible', timeout: waitMs }).catch(() => { });
  }
  if (!(await checkbox.isVisible().catch(() => false))) {
    return false;
  }

  const dialog = page
    .locator('[role="alertdialog"], [role="dialog"]')
    .filter({ has: checkbox })
    .first();

  // The checkbox stays disabled until the notice is scrolled to the bottom
  await dialog.evaluate(root => {
    root.querySelectorAll('*').forEach(el => {
      if (el.scrollHeight > el.clientHeight + 1) {
        el.scrollTop = el.scrollHeight;
      }
    });
  });

  await expect(checkbox).toBeEnabled({ timeout: 10000 });
  await checkbox.click();
  await expect(checkbox).toHaveAttribute('aria-checked', 'true');

  const continueButton = dialog.getByRole('button', { name: /^continue$/i });
  await expect(continueButton).toBeEnabled();
  await continueButton.click();
  await expect(dialog).toBeHidden();

  return true;
}

module.exports = { acknowledgeTeacherNotice };
