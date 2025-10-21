import { test, expect } from '@playwright/test';

test.describe('Mobile Navigation Footer Visibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
  });

  test('should hide mobile nav when footer social section enters viewport', async ({
    page,
  }) => {
    // Scroll down past the hero to make mobile nav visible
    await page.evaluate(() => window.scrollTo(0, 800));

    // Wait for mobile nav to appear
    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
    await page.waitForTimeout(400);
    await expect(mobileNav).toHaveClass(/visible/);

    // Scroll to the bottom where footer social is visible
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

    // Wait a moment for scroll detection to trigger
    await page.waitForTimeout(500);

    // Mobile nav should not have visible class when footer social is visible
    await expect(mobileNav).not.toHaveClass(/visible/);
  });

  test('should show mobile nav when scrolling away from footer', async ({
    page,
  }) => {
    // First, scroll to the bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');

    // Mobile nav should not have visible class at the bottom
    await expect(mobileNav).not.toHaveClass(/visible/);

    // Scroll back up to middle of page
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(500);

    // Mobile nav should have visible class
    await expect(mobileNav).toHaveClass(/visible/);
  });

  test('should not show mobile nav when main nav is visible', async ({
    page,
  }) => {
    // At top of page, main nav is visible
    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');

    // Wait for page to be fully loaded and scroll detection to initialize
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(300);

    // Mobile nav should not have visible class
    await expect(mobileNav).not.toHaveClass(/visible/);
  });

  test('should show mobile nav in middle of page', async ({ page }) => {
    // Scroll to middle of page where main nav is out of view
    // but footer is not yet visible
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(500);

    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');

    // Mobile nav should have visible class
    await expect(mobileNav).toHaveClass(/visible/);
  });

  test('should handle rapid scrolling correctly', async ({ page }) => {
    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');

    // Rapidly scroll through different positions
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(100);

    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.waitForTimeout(100);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Should end up without visible class at the bottom
    await expect(mobileNav).not.toHaveClass(/visible/);

    // Scroll back to middle
    await page.evaluate(() => window.scrollTo(0, 1000));
    await page.waitForTimeout(500);

    // Should have visible class again
    await expect(mobileNav).toHaveClass(/visible/);
  });

  test('should not interfere with mobile nav in landscape mode', async ({
    page,
  }) => {
    // Switch to landscape mode
    await page.setViewportSize({ width: 667, height: 375 });

    // Scroll down
    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(300);

    // Mobile nav should be hidden via CSS in landscape (desktop nav shows instead)
    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
    await expect(mobileNav).toBeHidden();
  });

  test('should work correctly on different mobile devices', async ({
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

      // Scroll to middle
      await page.evaluate(() => window.scrollTo(0, 1000));
      await page.waitForTimeout(500);

      const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
      await expect(mobileNav).toHaveClass(/visible/);

      // Scroll to bottom
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(500);

      // Should not have visible class
      await expect(mobileNav).not.toHaveClass(/visible/);
    }
  });

  test('should detect footer social section correctly', async ({ page }) => {
    // Check that footer social section exists
    const footerSocial = page.locator('.footer-social');
    await expect(footerSocial).toBeVisible();

    // Scroll to make it enter viewport
    await page.evaluate(() => {
      const footer = document.querySelector('.footer-social');
      if (footer) {
        footer.scrollIntoView({ behavior: 'instant' });
      }
    });

    await page.waitForTimeout(500);

    // Mobile nav should not have visible class
    const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
    await expect(mobileNav).not.toHaveClass(/visible/);
  });
});
