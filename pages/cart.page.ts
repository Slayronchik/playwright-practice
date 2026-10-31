import { BasePage } from './base.page';

export class CartPage extends BasePage {
  readonly productRows = this.page
    .locator('tbody tr')
    .filter({ has: this.page.locator('[data-test="product-title"]') });
  readonly quantityInput = this.productRows.first().locator('[data-test="product-quantity"]');
  readonly removeProductButton = this.productRows.first().locator('a.btn-danger');
  readonly cartTotal = this.page.locator('[data-test="cart-total"]');
  readonly proceedToCheckoutButton = this.page.getByRole('button', {
    name: 'Proceed to checkout',
  });

  async open(): Promise<void> {
    await this.navigateTo('/checkout');
  }

  async changeQuantity(amount: number): Promise<void> {
    if (!Number.isInteger(amount) || amount < 1 || amount > 99) {
      throw new RangeError('Quantity must be an integer between 1 and 99.');
    }

    await this.quantityInput.fill(String(amount));
    await this.quantityInput.press('Tab');
  }

  async removeProduct(): Promise<void> {
    await this.removeProductButton.click();
  }

  async getCartTotal(): Promise<number> {
    const totalText = await this.cartTotal.innerText();
    const total = Number(totalText.replace(/[^\d.]/g, ''));

    if (!Number.isFinite(total)) {
      throw new Error(`Unable to parse cart total: "${totalText}".`);
    }

    return total;
  }
}
