# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> Home Page >> should display Playwright title
- Location: tests\home.spec.js:4:3

# Error details

```
Error: expect(page).toHaveTitle(expected) failed

Expected pattern: /Playwright/
Received string:  "Marking AI"
Timeout: 5000ms

Call log:
  - Expect "toHaveTitle" with timeout 5000ms
    6 × locator resolved to <html lang="en">…</html>
      - unexpected value "Marking AI"
    7 × locator resolved to <html lang="en" dir="ltr">…</html>
      - unexpected value "Marking AI"

```

```yaml
- region "Notifications Alt+T"
- main:
  - img "logo"
  - heading "Sign in" [level=1]
  - text: Email
  - textbox "Email"
  - text: Password
  - textbox "Password"
  - button "Sign in" [disabled]
  - paragraph: Or
  - button "Sign in with ClassLink SSO"
```

# Test source

```ts
  1  | const { test, expect } = require('../fixtures/test.fixtures');
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test('should display Playwright title', async ({ homePage }) => {
  5  |     await homePage.open();
> 6  |     await expect(homePage.page).toHaveTitle(/Playwright/);
     |                                 ^ Error: expect(page).toHaveTitle(expected) failed
  7  |   });
  8  | 
  9  |   test('should navigate to docs via Get started', async ({ homePage }) => {
  10 |     await homePage.open();
  11 |     await homePage.clickGetStarted();
  12 |     await expect(homePage.page).toHaveURL(/.*docs/);
  13 |   });
  14 | });
  15 | 
```