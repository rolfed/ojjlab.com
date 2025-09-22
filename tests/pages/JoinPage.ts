import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class JoinPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToJoin(): Promise<void> {
    await this.goto('/#join');
  }

  async expectJoinPageTitle(): Promise<void> {
    await this.expectTitleContains(/Join/);
  }

  async expectJoinPageURL(): Promise<void> {
    await this.expectURLContains('#join');
  }

  async expectJoinPageLoaded(): Promise<void> {
    await this.expectJoinPageTitle();
    await this.expectJoinPageURL();
    await this.waitForPageLoad();
  }
}
