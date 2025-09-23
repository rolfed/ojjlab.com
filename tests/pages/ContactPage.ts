import { BasePage } from './BasePage';
import type { Page } from '@playwright/test';

export class ContactPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToContact(): Promise<void> {
    await this.goto('/#contact');
  }

  async expectContactPageTitle(): Promise<void> {
    await this.expectTitleContains(/Contact - Oregon Jiu Jitsu Lab/);
  }

  async expectContactPageURL(): Promise<void> {
    await this.expectURLContains('#contact');
  }

  async expectContactPageLoaded(): Promise<void> {
    await this.expectContactPageTitle();
    await this.expectContactPageURL();
    await this.waitForPageLoad();
  }
}
