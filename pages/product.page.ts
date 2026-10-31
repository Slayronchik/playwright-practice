import { expect } from '@playwright/test';
import { BasePage } from './base.page';

export class ProductPage extends BasePage {
  readonly productName = this.page.getByRole('heading', { level: 1 });
  readonly productPrice = this.page.getByText(/^\$\d+\.\d{2}$/, { exact: true }).first();
  readonly addToCartButton = this.page.getByRole('button', { name: 'Add to cart' });
  readonly addedToCartMessage = this.page.getByRole('alert', {
    name: 'Product added to shopping cart.',
  });

  async addToCart(): Promise<void> {
    await this.addToCartButton.click();
    await expect(this.addedToCartMessage).toBeVisible();
  }
}
