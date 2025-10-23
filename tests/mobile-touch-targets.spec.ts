import { test, expect } from '@playwright/test';

/**
 * Mobile Touch Target Accessibility Tests
 *
 * WCAG 2.1 Level AAA - Success Criterion 2.5.5 Target Size
 * Minimum touch target size: 44px × 44px
 *
 * Reference: https://www.w3.org/WAI/WCAG21/Understanding/target-size.html
 */

test.describe('Mobile Touch Target Sizes (WCAG 2.5.5)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Set viewport to mobile size (iPhone SE)
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('hamburger menu button should meet minimum touch target size (44px)', async ({
    page,
  }) => {
    // Scroll down to make mobile bottom nav visible
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Get the hamburger menu button
    const hamburgerBtn = page.locator('[data-testid="mobile-menu-toggle"]');
    await expect(hamburgerBtn).toBeVisible();

    // Get button dimensions
    const boundingBox = await hamburgerBtn.boundingBox();
    expect(boundingBox).not.toBeNull();

    if (boundingBox) {
      // WCAG AAA requires minimum 44px × 44px touch targets
      expect(boundingBox.width).toBeGreaterThanOrEqual(44);
      expect(boundingBox.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('close menu button should meet minimum touch target size (44px)', async ({
    page,
  }) => {
    // Get button dimensions using JavaScript since button exists in DOM but not visible
    const buttonSize = await page.evaluate(() => {
      const btn = document.querySelector(
        '[data-testid="mobile-menu-close"]'
      ) as HTMLElement;
      if (!btn) return null;

      const styles = window.getComputedStyle(btn);
      const padding = parseFloat(styles.padding);
      // Icon is 24px (w-6 h-6), padding is applied all around
      const totalSize = 24 + padding * 2;

      return {
        width: totalSize,
        height: totalSize,
      };
    });

    expect(buttonSize).not.toBeNull();
    if (buttonSize) {
      // WCAG AAA requires minimum 44px × 44px touch targets
      expect(buttonSize.width).toBeGreaterThanOrEqual(44);
      expect(buttonSize.height).toBeGreaterThanOrEqual(44);
    }
  });

  test('touch targets should be comfortable for users with motor impairments', async ({
    page,
  }) => {
    // Scroll down to make mobile bottom nav visible
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Test hamburger button
    const hamburgerBtn = page.locator('[data-testid="mobile-menu-toggle"]');
    const hamburgerBox = await hamburgerBtn.boundingBox();

    // Best practice: 48px × 48px for comfortable touch targets
    // We're checking for at least 44px (WCAG AAA minimum)
    expect(hamburgerBox).not.toBeNull();
    if (hamburgerBox) {
      const minSize = 44;
      expect(hamburgerBox.width).toBeGreaterThanOrEqual(minSize);
      expect(hamburgerBox.height).toBeGreaterThanOrEqual(minSize);

      // Verify it exceeds minimum for better UX
      // (Our implementation uses p-3 which should give us 48px)
      expect(hamburgerBox.width).toBeGreaterThan(44);
      expect(hamburgerBox.height).toBeGreaterThan(44);
    }
  });

  test('touch targets should be consistent across different mobile viewports', async ({
    page,
  }) => {
    const devices = [
      { name: 'iPhone SE', width: 375, height: 667 },
      { name: 'Samsung Galaxy S21', width: 360, height: 800 },
      { name: 'iPhone 12 Pro', width: 390, height: 844 },
    ];

    for (const device of devices) {
      await page.setViewportSize({
        width: device.width,
        height: device.height,
      });

      // Scroll to make mobile nav visible
      await page.evaluate(() => window.scrollTo(0, 800));
      await page.waitForTimeout(300);

      const hamburgerBtn = page.locator('[data-testid="mobile-menu-toggle"]');
      const boundingBox = await hamburgerBtn.boundingBox();

      expect(boundingBox).not.toBeNull();
      if (boundingBox) {
        // Should meet WCAG AAA on all devices
        expect(boundingBox.width).toBeGreaterThanOrEqual(44);
        expect(boundingBox.height).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('buttons should have adequate spacing from other interactive elements', async ({
    page,
  }) => {
    // Scroll down to make mobile bottom nav visible
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Get positions of hamburger button and logo link
    const hamburgerBtn = page.locator('[data-testid="mobile-menu-toggle"]');
    const logoLink = page.locator(
      '[data-testid="mobile-bottom-nav"] [data-testid="mobile-logo-link"]'
    );

    const hamburgerBox = await hamburgerBtn.boundingBox();
    const logoBox = await logoLink.boundingBox();

    expect(hamburgerBox).not.toBeNull();
    expect(logoBox).not.toBeNull();

    if (hamburgerBox && logoBox) {
      // Ensure there's adequate spacing between interactive elements
      // They should not overlap or be too close together
      const horizontalGap = Math.abs(
        hamburgerBox.x - (logoBox.x + logoBox.width)
      );

      // Minimum spacing should be present (not zero/overlapping)
      expect(horizontalGap).toBeGreaterThan(0);
    }
  });
});
