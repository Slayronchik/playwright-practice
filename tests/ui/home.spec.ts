import { test, expect } from '@playwright/test';
import { HomePage } from '../../pages/home.page';

test('should search for Pliers and show results', async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.navigateToHomePage();
  await homePage.searchForProduct('Pliers');

  await expect.poll(() => homePage.countVisibleProducts()).toBeGreaterThan(0);
});