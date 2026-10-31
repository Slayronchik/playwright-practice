import type { Locator } from '@playwright/test';
import { BasePage } from './base.page';

export class HomePage extends BasePage {
  readonly searchInput = this.page.getByPlaceholder('Search', { exact: true });
  readonly searchButton = this.page.getByRole('button', { name: 'Search', exact: true });
  readonly productCards = this.page.locator('a.card:visible');
  readonly pageButtons = this.page.getByRole('button', { name: /^Page-\d+$/ });
  readonly nextPageButton = this.page.getByRole('button', { name: 'Next' });

  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('/');
  }

  async searchForProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async openFirstProduct(): Promise<void> {
    const productUrl = await this.productCards.first().getAttribute('href');

    if (!productUrl) {
      throw new Error('The first product card does not have a product URL.');
    }

    await this.navigateTo(productUrl);
  }

  categoryCheckbox(categoryName: string): Locator {
    return this.page.getByRole('checkbox', { name: categoryName, exact: true });
  }

  async selectCategory(categoryName: string): Promise<void> {
    await this.categoryCheckbox(categoryName).check();
  }

  async getVisibleProductTitles(): Promise<string[]> {
    const titles = await this.productCards.locator('h5').allTextContents();
    return titles.map((title) => title.trim()).filter(Boolean);
  }

  async goToNextPage(): Promise<void> {
    await this.nextPageButton.click();
  }

  async countVisibleProducts(): Promise<number> {
    return this.productCards.count();
  }
}