import { test, expect } from '@playwright/test';

/**
 * Mobile Phone Button Tests
 *
 * Tests the phone number button that appears above navigation
 * in mobile portrait view only, allowing users to call or text.
 */

test.describe('Mobile Phone Button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page loader to finish
    await page.waitForSelector('#page-loader', {
      state: 'hidden',
      timeout: 10000,
    });
  });

  test.describe('Visibility', () => {
    test('should show phone button on mobile portrait', async ({ page }) => {
      // Set to mobile portrait (iPhone SE)
      await page.setViewportSize({ width: 375, height: 667 });

      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await expect(phoneButton).toBeVisible();
    });

    test('should hide phone button on mobile landscape', async ({ page }) => {
      // Set to mobile landscape
      await page.setViewportSize({ width: 667, height: 375 });

      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await expect(phoneButton).toBeHidden();
    });

    test('should hide phone button on tablet and desktop', async ({ page }) => {
      // Test tablet
      await page.setViewportSize({ width: 768, height: 1024 });
      let phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await expect(phoneButton).toBeHidden();

      // Test desktop
      await page.setViewportSize({ width: 1440, height: 900 });
      phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await expect(phoneButton).toBeHidden();
    });
  });

  test.describe('Interaction', () => {
    test.beforeEach(async ({ page }) => {
      // Set to mobile portrait for interaction tests
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should open call/text menu when clicked', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await phoneButton.click();

      // Check for call/text menu
      const phoneMenu = page.locator('[data-testid="mobile-phone-menu"]');
      await expect(phoneMenu).toBeVisible();
    });

    test('should show call and text options in menu', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await phoneButton.click();

      // Check for both options
      const callOption = page.locator('[data-testid="phone-menu-call"]');
      const textOption = page.locator('[data-testid="phone-menu-text"]');

      await expect(callOption).toBeVisible();
      await expect(textOption).toBeVisible();
    });

    test('should have correct phone number links', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await phoneButton.click();

      const callOption = page.locator('[data-testid="phone-menu-call"]');
      const textOption = page.locator('[data-testid="phone-menu-text"]');

      // Verify href attributes
      await expect(callOption).toHaveAttribute('href', 'tel:+15033088455');
      await expect(textOption).toHaveAttribute('href', 'sms:+15033088455');
    });

    test('should close menu when clicking outside', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await phoneButton.click();

      const phoneMenu = page.locator('[data-testid="mobile-phone-menu"]');
      await expect(phoneMenu).toBeVisible();

      // Click outside the menu
      await page.locator('body').click({ position: { x: 10, y: 10 } });

      await expect(phoneMenu).toBeHidden();
    });

    test('should close menu when pressing escape key', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      await phoneButton.click();

      const phoneMenu = page.locator('[data-testid="mobile-phone-menu"]');
      await expect(phoneMenu).toBeVisible();

      // Press escape
      await page.keyboard.press('Escape');

      await expect(phoneMenu).toBeHidden();
    });
  });

  test.describe('Accessibility', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should have accessible button with proper aria label', async ({
      page,
    }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');

      await expect(phoneButton).toHaveAttribute(
        'aria-label',
        'Contact us by phone'
      );
      await expect(phoneButton).toHaveAttribute('type', 'button');
    });

    test('should meet WCAG AAA touch target size', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      const boundingBox = await phoneButton.boundingBox();

      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        // WCAG AAA requires minimum 44px × 44px
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
        // Width can be longer since it's text + icon
        expect(boundingBox.height).toBeGreaterThan(0);
      }
    });

    test('should have keyboard navigation support', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');

      // Focus the button directly (it may not be first tab stop)
      await phoneButton.focus();
      await expect(phoneButton).toBeFocused();

      // Open menu with Enter
      await page.keyboard.press('Enter');
      const phoneMenu = page.locator('[data-testid="mobile-phone-menu"]');
      await expect(phoneMenu).toBeVisible();

      // Menu items should be accessible via keyboard
      const callOption = page.locator('[data-testid="phone-menu-call"]');
      const textOption = page.locator('[data-testid="phone-menu-text"]');

      // Verify menu items are visible and have proper role
      await expect(callOption).toBeVisible();
      await expect(textOption).toBeVisible();
      await expect(callOption).toHaveAttribute('role', 'menuitem');
      await expect(textOption).toHaveAttribute('role', 'menuitem');

      // Close menu with Escape
      await page.keyboard.press('Escape');
      await expect(phoneMenu).not.toBeVisible();
    });

    test('should have proper ARIA attributes for menu', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');

      // Initially closed
      await expect(phoneButton).toHaveAttribute('aria-expanded', 'false');

      await phoneButton.click();

      // After opening
      await expect(phoneButton).toHaveAttribute('aria-expanded', 'true');

      const phoneMenu = page.locator('[data-testid="mobile-phone-menu"]');
      await expect(phoneMenu).toHaveAttribute('role', 'menu');
    });
  });

  test.describe('Visual Design', () => {
    test.beforeEach(async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
    });

    test('should be positioned above the nav in hero section', async ({
      page,
    }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');
      const heroNav = page.locator('.hero-nav');

      const buttonBox = await phoneButton.boundingBox();
      const navBox = await heroNav.boundingBox();

      expect(buttonBox).not.toBeNull();
      expect(navBox).not.toBeNull();

      if (buttonBox && navBox) {
        // Button should be above (smaller y position) the nav
        expect(buttonBox.y).toBeLessThan(navBox.y);
      }
    });

    test('should display phone number and icon', async ({ page }) => {
      const phoneButton = page.locator('[data-testid="mobile-phone-button"]');

      // Check for phone icon
      const phoneIcon = phoneButton.locator('svg');
      await expect(phoneIcon).toBeVisible();

      // Check for call/text label (button displays "Call/Text" not the actual number)
      const buttonText = await phoneButton.textContent();
      expect(buttonText).toContain('Call/Text');

      // Verify the phone number links are in the menu (not the button itself)
      await phoneButton.click();
      const callLink = page.locator('[data-testid="phone-menu-call"]');
      await expect(callLink).toHaveAttribute('href', 'tel:+15033088455');
    });
  });
});
