import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export abstract class BasePage {
  protected page: Page;
  protected baseURL: string;

  constructor(page: Page) {
    this.page = page;
    this.baseURL = 'http://localhost:5173';
  }

  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentURL(): Promise<string> {
    return this.page.url();
  }

  async waitForElement(
    selector: string,
    _timeout: number = 10000
  ): Promise<Locator> {
    return this.page.locator(selector).first();
  }

  async clickElement(testId: string): Promise<void> {
    await this.page.getByTestId(testId).click();
  }

  async isElementVisible(testId: string): Promise<boolean> {
    return await this.page.getByTestId(testId).isVisible();
  }

  async expectElementToBeVisible(testId: string): Promise<void> {
    await expect(this.page.getByTestId(testId)).toBeVisible();
  }

  async expectElementToHaveText(
    testId: string,
    text: string | RegExp
  ): Promise<void> {
    await expect(this.page.getByTestId(testId)).toHaveText(text);
  }

  async expectURLContains(urlPart: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(urlPart));
  }

  async expectTitleContains(titlePart: string | RegExp): Promise<void> {
    await expect(this.page).toHaveTitle(titlePart);
  }

  getByTestId(testId: string): Locator {
    return this.page.getByTestId(testId);
  }

  async setViewportSize(width: number, height: number): Promise<void> {
    await this.page.setViewportSize({ width, height });
  }
}
