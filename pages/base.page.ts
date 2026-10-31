import type { Page } from '@playwright/test';

export class BasePage {
	constructor(protected readonly page: Page) {}

	async navigateTo(url: string): Promise<void> {
		await this.page.goto(url);
	}

	async getTitle(): Promise<string> {
		return this.page.title();
	}

	getCurrentUrl(): string {
		return this.page.url();
	}
}
