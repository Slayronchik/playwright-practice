import { expect, test, type Page } from '@playwright/test';
import { CartPage } from '../../pages/cart.page';
import { HomePage } from '../../pages/home.page';
import { ProductPage } from '../../pages/product.page';

async function addFirstProductToCart(
  page: Page,
): Promise<{ cartPage: CartPage; productName: string }> {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.navigateToHomePage();
  await expect(homePage.productCards.first()).toBeVisible();
  await homePage.openFirstProduct();
  await expect(page).toHaveURL(/\/product\/[^/]+$/);
  await expect(productPage.productName).toBeVisible();
  const productName = (await productPage.productName.innerText()).trim();

  await productPage.addToCart();
  await cartPage.open();
  await expect(cartPage.productRows.first()).toBeVisible();

  return { cartPage, productName };
}

test.describe('Shopping cart', () => {
  test('shows a product added from its product page', async ({ page }) => {
    const { cartPage, productName } = await addFirstProductToCart(page);

    await expect(cartPage.productRows).toContainText(productName);
  });

  test('recalculates the total when the quantity changes', async ({ page }) => {
    const { cartPage } = await addFirstProductToCart(page);
    const initialTotal = await cartPage.getCartTotal();

    await cartPage.changeQuantity(2);

    await expect.poll(() => cartPage.getCartTotal()).toBeCloseTo(initialTotal * 2, 2);
  });

  test('removes a product from the cart', async ({ page }) => {
    const { cartPage } = await addFirstProductToCart(page);

    await cartPage.removeProduct();

    await expect(cartPage.productRows).toHaveCount(0);
  });
});
