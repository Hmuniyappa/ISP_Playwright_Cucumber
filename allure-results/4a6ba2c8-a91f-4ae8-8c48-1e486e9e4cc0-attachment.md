# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.js >> Home Page >> should navigate to docs via Get started
- Location: tests\home.spec.js:9:3

# Error details

```
TypeError: homePage.clickGetStarted is not a function
```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic:
    - generic:
      - img "logo"
```

# Test source

```ts
  1  | const { test, expect } = require('../fixtures/test.fixtures');
  2  | 
  3  | test.describe('Home Page', () => {
  4  |   test('should display Playwright title', async ({ homePage }) => {
  5  |     await homePage.open();
  6  |     await expect(homePage.page).toHaveTitle(/Playwright/);
  7  |   });
  8  | 
  9  |   test('should navigate to docs via Get started', async ({ homePage }) => {
  10 |     await homePage.open();
> 11 |     await homePage.clickGetStarted();
     |                    ^ TypeError: homePage.clickGetStarted is not a function
  12 |     await expect(homePage.page).toHaveURL(/.*docs/);
  13 |   });
  14 | });
  15 | 
```