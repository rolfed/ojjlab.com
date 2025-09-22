import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class TryAClassPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToTryAClass(): Promise<void> {
    await this.goto('/#try-a-class');
  }

  async expectTryAClassPageTitle(): Promise<void> {
    await this.expectTitleContains(/Try a Class - Oregon Jiu Jitsu Lab/);
  }

  async expectTryAClassPageURL(): Promise<void> {
    await this.expectURLContains('#try-a-class');
  }

  async expectTryAClassPageLoaded(): Promise<void> {
    await this.expectTryAClassPageTitle();
    await this.expectTryAClassPageURL();
    await this.waitForPageLoad();
  }
}