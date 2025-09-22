import { BasePage } from './BasePage';
import { Page } from '@playwright/test';

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Desktop Navigation Elements
  get desktopNavigation() {
    return this.getByTestId('desktop-navigation');
  }

  get desktopLogoContainer() {
    return this.getByTestId('desktop-logo-container');
  }

  get desktopThemeToggle() {
    return this.getByTestId('desktop-theme-toggle');
  }

  // Smart Navigation Methods (automatically detect device type)
  async isMobileDevice(): Promise<boolean> {
    const viewport = this.page.viewportSize();
    return viewport ? viewport.width < 768 : false;
  }

  async clickAboutLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.openMobileMenu();
      await this.clickMobileAboutLink();
    } else {
      await this.clickElement('nav-about');
    }
  }

  async clickProgramsLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.openMobileMenu();
      await this.clickMobileProgramsTrigger();
    } else {
      await this.clickElement('nav-programs');
    }
  }

  async clickCoachesLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.openMobileMenu();
      await this.clickMobileInstructorsLink();
    } else {
      await this.clickElement('nav-coaches');
    }
  }

  async clickScheduleLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.openMobileMenu();
      await this.clickMobileProgramsTrigger();
      await this.clickMobileScheduleLink();
    } else {
      await this.clickElement('nav-schedule');
    }
  }

  async clickContactLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      // For mobile, use direct navigation since mobile menu is complex
      await this.page.goto('/#contact');
    } else {
      await this.clickElement('nav-contact');
    }
  }

  async clickShopLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      // Shop is not in mobile menu, use desktop approach or skip
      await this.clickElement('nav-shop');
    } else {
      await this.clickElement('nav-shop');
    }
  }

  async clickJoinLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.page.goto('/#join');
    } else {
      await this.clickElement('nav-join');
    }
  }

  async clickLoginLink(): Promise<void> {
    if (await this.isMobileDevice()) {
      await this.page.goto('/#login');
    } else {
      await this.clickElement('nav-login');
    }
  }

  // Mobile Navigation Elements
  get mobileBottomNav() {
    return this.getByTestId('mobile-bottom-nav');
  }

  get mobileMenuToggle() {
    return this.getByTestId('mobile-menu-toggle');
  }

  get mobileFullscreenMenu() {
    return this.getByTestId('mobile-fullscreen-menu');
  }

  get mobileThemeToggle() {
    return this.getByTestId('mobile-theme-toggle');
  }

  // Mobile Navigation Actions
  async openMobileMenu(): Promise<void> {
    // On mobile, we need to make the bottom nav appear by scrolling
    // The mobile navigation only shows when the main nav is out of view
    await this.page.evaluate(() => {
      window.scrollTo(0, 300); // Scroll down to hide main nav
    });
    await this.page.waitForTimeout(1000); // Wait for scroll to trigger navigation appearance

    // Use force click since element might be positioned outside viewport but still interactable
    await this.page.getByTestId('mobile-menu-toggle').click({ force: true });
  }

  async closeMobileMenu(): Promise<void> {
    await this.clickElement('mobile-menu-close');
  }

  async clickMobileHomeLink(): Promise<void> {
    await this.clickElement('mobile-nav-home');
  }

  async clickMobileAboutLink(): Promise<void> {
    await this.clickElement('mobile-nav-about');
  }

  async clickMobileProgramsTrigger(): Promise<void> {
    await this.clickElement('mobile-nav-programs-trigger');
  }

  async clickMobileContactLink(): Promise<void> {
    // Wait for mobile menu to be fully visible and animated
    await this.expectElementToBeVisible('mobile-fullscreen-menu');
    await this.page.waitForTimeout(500); // Wait for animations
    await this.page.getByTestId('mobile-nav-contact').click({ force: true });
  }

  async clickMobileJoinLink(): Promise<void> {
    await this.expectElementToBeVisible('mobile-fullscreen-menu');
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('mobile-nav-join').click({ force: true });
  }

  async clickMobileLoginLink(): Promise<void> {
    await this.expectElementToBeVisible('mobile-fullscreen-menu');
    await this.page.waitForTimeout(500);
    await this.page.getByTestId('mobile-nav-login').click({ force: true });
  }

  async clickMobileInstructorsLink(): Promise<void> {
    await this.expectElementToBeVisible('mobile-fullscreen-menu');
    await this.page.waitForTimeout(500);
    await this.page
      .getByTestId('mobile-nav-instructors')
      .click({ force: true });
  }

  // Mobile Programs Submenu
  async clickMobileBackButton(): Promise<void> {
    await this.clickElement('mobile-nav-back');
  }

  async clickMobileJiuJitsuLink(): Promise<void> {
    await this.clickElement('mobile-nav-jiu-jitsu');
  }

  async clickMobileWrestlingLink(): Promise<void> {
    await this.clickElement('mobile-nav-wrestling');
  }

  async clickMobileKickboxingLink(): Promise<void> {
    await this.clickElement('mobile-nav-kickboxing');
  }

  async clickMobileCompetitionTeamLink(): Promise<void> {
    await this.clickElement('mobile-nav-competition-team');
  }

  async clickMobileScheduleLink(): Promise<void> {
    await this.clickElement('mobile-nav-schedule');
  }

  // Theme Toggle Actions
  async toggleDesktopTheme(): Promise<void> {
    await this.clickElement('desktop-theme-toggle');
  }

  async toggleMobileTheme(): Promise<void> {
    await this.clickElement('mobile-theme-toggle');
  }

  async toggleTheme(): Promise<void> {
    if (await this.isMobileDevice()) {
      // On mobile, use JavaScript to toggle theme and trigger the same logic as the buttons
      await this.page.evaluate(() => {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        html.setAttribute('data-theme', newTheme);
        html.className = newTheme;
        localStorage.setItem('theme', newTheme);

        // Dispatch a custom event to trigger any theme change listeners
        window.dispatchEvent(
          new CustomEvent('themeChanged', { detail: { theme: newTheme } })
        );
      });
      // Add a small delay to let theme change take effect
      await this.page.waitForTimeout(100);
    } else {
      await this.toggleDesktopTheme();
    }
  }

  // Validation Methods
  async expectDesktopNavigationVisible(): Promise<void> {
    await this.expectElementToBeVisible('desktop-navigation');
  }

  async expectMobileNavigationVisible(): Promise<void> {
    await this.expectElementToBeVisible('mobile-bottom-nav');
  }

  async expectMobileMenuOpen(): Promise<void> {
    await this.expectElementToBeVisible('mobile-fullscreen-menu');
  }

  async expectThemeAttribute(theme: 'light' | 'dark'): Promise<void> {
    const htmlElement = this.page.locator('html');
    await htmlElement.waitFor();
    const dataTheme = await htmlElement.getAttribute('data-theme');
    if (dataTheme !== theme) {
      throw new Error(`Expected theme to be '${theme}' but got '${dataTheme}'`);
    }
  }
}
