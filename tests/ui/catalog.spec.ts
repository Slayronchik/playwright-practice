import { expect, test } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test.describe('Product catalog', () => {
  test('searches for a product by name', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();

    await expect(homePage.productCards.first()).toBeVisible();
    await homePage.searchForProduct('Pliers');

    await expect
      .poll(() => homePage.getVisibleProductTitles())
      .toEqual(expect.arrayContaining([expect.stringMatching(/pliers/i)]));
  });

  test('filters products by category', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await expect(homePage.productCards.first()).toBeVisible();

    const initialTitles = await homePage.getVisibleProductTitles();
    await homePage.selectCategory('Power Tools');

    await expect(homePage.categoryCheckbox('Power Tools')).toBeChecked();
    await expect.poll(() => homePage.getVisibleProductTitles()).not.toHaveLength(0);
    await expect
      .poll(() => homePage.getVisibleProductTitles())
      .not.toEqual(initialTitles);
  });

  test('shows different products on the next page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.navigateToHomePage();
    await expect(homePage.productCards.first()).toBeVisible();
    await expect(homePage.pageButtons.first()).toBeVisible();

    const firstPageTitles = await homePage.getVisibleProductTitles();
    await expect(homePage.nextPageButton).toBeEnabled();
    await homePage.goToNextPage();

    await expect
      .poll(() => homePage.getVisibleProductTitles())
      .not.toEqual(firstPageTitles);
  });
});
