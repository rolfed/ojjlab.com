import { test } from '@playwright/test';
import {
  HomePage,
  NavigationPage,
  ContactPage,
  JoinPage,
  LoginPage,
} from './pages';

test.describe('SPA Router Navigation', () => {
  test('should navigate to all main routes', async ({ page }) => {
    const homePage = new HomePage(page);
    const navigationPage = new NavigationPage(page);
    const contactPage = new ContactPage(page);
    const joinPage = new JoinPage(page);
    const loginPage = new LoginPage(page);

    // Navigate to home and verify
    await homePage.navigateToHome();
    await homePage.expectHomePageLoaded();

    // Test contact page navigation
    await navigationPage.clickContactLink();
    await contactPage.expectContactPageLoaded();

    // Test join page navigation
    await navigationPage.clickJoinLink();
    await joinPage.expectJoinPageLoaded();

    // Test login page navigation
    await navigationPage.clickLoginLink();
    await loginPage.expectLoginPageLoaded();
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    const navigationPage = new NavigationPage(page);
    const contactPage = new ContactPage(page);
    const joinPage = new JoinPage(page);

    // Navigate to home
    await homePage.navigateToHome();
    await homePage.expectHomePageLoaded();

    // Navigate to contact
    await navigationPage.clickContactLink();
    await contactPage.expectContactPageURL();

    // Navigate to join
    await navigationPage.clickJoinLink();
    await joinPage.expectJoinPageURL();

    // Test browser back button
    await page.goBack();
    await contactPage.expectContactPageURL();

    // Test browser forward button
    await page.goForward();
    await joinPage.expectJoinPageURL();
  });
});

test.describe('Theme Switching', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    const homePage = new HomePage(page);
    const navigationPage = new NavigationPage(page);

    await homePage.navigateToHome();
    await homePage.expectHomePageLoaded();

    // Skip theme tests on mobile for now as the mobile menu is complex
    if (await navigationPage.isMobileDevice()) {
      test.skip(
        true,
        'Theme tests skipped on mobile due to complex mobile menu'
      );
      return;
    }

    // Find and click theme toggle button (desktop only)
    await navigationPage.toggleDesktopTheme();
    await navigationPage.expectThemeAttribute('light');

    // Toggle back
    await navigationPage.toggleDesktopTheme();
    await navigationPage.expectThemeAttribute('dark');
  });

  test('should persist theme across navigation', async ({ page }) => {
    const homePage = new HomePage(page);
    const navigationPage = new NavigationPage(page);
    const contactPage = new ContactPage(page);

    await homePage.navigateToHome();
    await homePage.expectHomePageLoaded();

    // Skip theme tests on mobile for now
    if (await navigationPage.isMobileDevice()) {
      test.skip(
        true,
        'Theme tests skipped on mobile due to complex mobile menu'
      );
      return;
    }

    // Toggle to light theme (desktop only)
    await navigationPage.toggleDesktopTheme();

    // Navigate to another page
    await navigationPage.clickContactLink();
    await contactPage.expectContactPageURL();

    // Verify theme persisted
    await navigationPage.expectThemeAttribute('light');
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should be responsive on mobile devices', async ({ page }) => {
    const homePage = new HomePage(page);
    const navigationPage = new NavigationPage(page);

    // Set mobile viewport
    await homePage.setViewportSize(375, 667); // iPhone SE size
    await homePage.navigateToHome();
    await homePage.expectHomePageLoaded();

    // Check that mobile navigation is accessible
    await navigationPage.expectMobileNavigationVisible();

    // Test that app content is properly laid out
    await homePage.expectAppContainerVisible();
  });
});
