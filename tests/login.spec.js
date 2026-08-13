const { test, expect } = require('../fixtures/test.fixtures');

test.describe('Login Page', () => {
  test('should show error for invalid credentials', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('invalid@example.com', 'wrongpassword');
    await expect(loginPage.errorMessage).toBeVisible();
  });
});
