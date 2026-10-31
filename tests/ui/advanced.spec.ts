import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';
import { LoginPage } from '../../pages/login.page';

test.use({ serviceWorkers: 'block' });

interface InvalidLoginCase {
  name: string;
  email: string;
  password: string;
  expectedError: string;
}

const invalidLoginCases: InvalidLoginCase[] = [
  {
    name: 'shows a validation error for an invalid email format',
    email: 'not-an-email',
    password: 'SomePass123!',
    expectedError: 'Email format is invalid',
  },
  {
    name: 'rejects a short password with invalid credentials',
    email: 'valid.format@example.com',
    password: '123',
    expectedError: 'Invalid email or password',
  },
  {
    name: 'requires a password',
    email: 'valid.format@example.com',
    password: '',
    expectedError: 'Password is required',
  },
];

test.describe('Advanced scenarios', () => {
  for (const loginCase of invalidLoginCases) {
    test(loginCase.name, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.open();
      await loginPage.login(loginCase.email, loginCase.password);

      await expect(loginPage.validationError(loginCase.expectedError)).toBeVisible();
    });
  }

  test('renders an empty product grid when the catalog API returns no products', async ({
    page,
  }) => {
    let interceptedCatalogRequest = false;

    // Intercept the catalog endpoint so the test never depends on backend product data.
    await page.route(/https:\/\/api\.practicesoftwaretesting\.com\/products$/, async (route) => {
      const method = route.request().method();
      if (method !== 'GET' && method !== 'QUERY') {
        await route.continue();
        return;
      }

      interceptedCatalogRequest = true;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          current_page: 1,
          data: [],
          from: null,
          last_page: 1,
          per_page: 9,
          to: null,
          total: 0,
        }),
      });
    });

    const catalogResponse = page.waitForResponse(
      (response) =>
        response.url() === 'https://api.practicesoftwaretesting.com/products' &&
        (response.request().method() === 'GET' || response.request().method() === 'QUERY'),
    );

    const homePage = new HomePage(page);

    await homePage.navigateToHomePage();

    const response = await catalogResponse;
    expect(response.status()).toBe(200);
    expect(interceptedCatalogRequest).toBe(true);
    await expect.poll(() => homePage.countVisibleProducts()).toBe(0);
  });
});
