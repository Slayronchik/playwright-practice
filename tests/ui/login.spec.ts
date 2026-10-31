import { expect, test } from '@playwright/test';
import { LoginPage } from '../../pages/login.page';
import process from 'process';

test.describe('Authentication', () => {
  test('logs in and navigates to the account page', async ({ page }) => {
    const email = process.env.TEST_EMAIL;
    const password = process.env.TEST_PASSWORD;

    test.skip(!email || !password, 'Set TEST_EMAIL and TEST_PASSWORD to run this test.');

    if (!email || !password) {
      return;
    }

    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(email, password);

    await expect(page).toHaveURL(/\/account\/?$/);
  });

  test('shows an error when the password is incorrect', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(
      process.env.TEST_EMAIL ?? 'invalid.login@example.com',
      'WrongPassword123!',
    );

    await loginPage.expectLoginError();
  });

  test('opens the registration form', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.openRegistration();

    await expect(page).toHaveURL(/\/auth\/register\/?$/);
  });
});