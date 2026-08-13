# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.js >> Login Page >> should show error for invalid credentials
- Location: tests\login.spec.js:4:3

# Error details

```
TypeError: loginPage.open is not a function
```

# Test source

```ts
  1  | const { test, expect } = require('../fixtures/test.fixtures');
  2  | 
  3  | test.describe('Login Page', () => {
  4  |   test('should show error for invalid credentials', async ({ loginPage }) => {
> 5  |     await loginPage.open();
     |                     ^ TypeError: loginPage.open is not a function
  6  |     await loginPage.login('invalid@example.com', 'wrongpassword');
  7  |     await expect(loginPage.errorMessage).toBeVisible();
  8  |   });
  9  | });
  10 | 
```