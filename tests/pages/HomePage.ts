import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async navigateToHome(): Promise<void> {
    await this.goto('/');
  }

  // App Container
  get appContainer() {
    return this.getByTestId('app-container');
  }

  // Skip Link
  get skipLink() {
    return this.getByTestId('skip-link');
  }

  // Main Content
  get mainContent() {
    return this.page.locator('main#main-content');
  }

  // Sections
  get aboutSection() {
    return this.page.locator('section#about');
  }

  get programsSection() {
    return this.page.locator('section#programs');
  }

  get coachesSection() {
    return this.page.locator('section#coaches');
  }

  get scheduleSection() {
    return this.page.locator('section#schedule');
  }

  // Validation Methods
  async expectAppContainerVisible(): Promise<void> {
    await this.expectElementToBeVisible('app-container');
  }

  async expectSkipLinkVisible(): Promise<void> {
    await this.expectElementToBeVisible('skip-link');
  }

  async expectMainContentVisible(): Promise<void> {
    await this.page.locator('main#main-content').waitFor({ state: 'visible' });
  }

  async expectHomePageTitle(): Promise<void> {
    await this.expectTitleContains(/Oregon Jiu Jitsu Lab/);
  }

  async expectHomePageLoaded(): Promise<void> {
    await this.expectHomePageTitle();
    await this.expectAppContainerVisible();
    await this.waitForPageLoad();
  }

  // Navigation to sections
  async scrollToAbout(): Promise<void> {
    await this.aboutSection.scrollIntoViewIfNeeded();
  }

  async scrollToPrograms(): Promise<void> {
    await this.programsSection.scrollIntoViewIfNeeded();
  }

  async scrollToCoaches(): Promise<void> {
    await this.coachesSection.scrollIntoViewIfNeeded();
  }

  async scrollToSchedule(): Promise<void> {
    await this.scheduleSection.scrollIntoViewIfNeeded();
  }
}
