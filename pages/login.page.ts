import { expect, Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  readonly emailInput = this.page.getByPlaceholder('Your email');
  readonly passwordInput = this.page.getByPlaceholder('Your password');
  readonly loginButton = this.page.getByRole('button', { name: 'Login', exact: true });
  readonly registrationLink = this.page.getByRole('link', { name: 'Register your account' });
  readonly loginError = this.page.getByText('Invalid email or password', { exact: true });

  validationError(message: string): Locator {
    return this.page.getByText(message, { exact: true });
  }

  async open(): Promise<void> {
    await this.navigateTo('/auth/login');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async expectLoginError(): Promise<void> {
    await expect(this.loginError).toBeVisible();
  }

  async openRegistration(): Promise<void> {
    await this.registrationLink.click();
  }
}