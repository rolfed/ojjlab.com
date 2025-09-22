import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToLogin(): Promise<void> {
    await this.goto('/#login');
  }

  async expectLoginPageTitle(): Promise<void> {
    await this.expectTitleContains(/Login - Oregon Jiu Jitsu Lab/);
  }

  async expectLoginPageURL(): Promise<void> {
    await this.expectURLContains('#login');
  }

  async expectLoginPageLoaded(): Promise<void> {
    await this.expectLoginPageTitle();
    await this.expectLoginPageURL();
    await this.waitForPageLoad();
  }
}
