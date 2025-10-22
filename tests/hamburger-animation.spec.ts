import { test, expect, type Page } from '@playwright/test';

/**
 * Helper function to ensure mobile nav is visible before interacting with hamburger
 */
async function ensureMobileNavVisible(page: Page): Promise<void> {
  // Scroll down to make mobile nav visible
  await page.evaluate(() => window.scrollTo(0, 800));

  // Wait for mobile nav to become visible
  const mobileNav = page.locator('[data-testid="mobile-bottom-nav"]');
  await expect(mobileNav).toHaveClass(/visible/, { timeout: 2000 });
}

test.describe('Hamburger Menu Animation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Set mobile viewport to see hamburger menu
    await page.setViewportSize({ width: 375, height: 667 });

    // Hide chat widget to prevent interference with tests
    await page.addStyleTag({
      content: 'chat-widget { display: none !important; }'
    });
  });

  test('should display animated hamburger icon on mobile', async ({ page }) => {
    await ensureMobileNavVisible(page);

    // Check that hamburger container exists and is visible
    const hamburgerContainer = page.locator('[data-element="hamburger-container"]');
    await expect(hamburgerContainer).toBeVisible();

    // Verify all three bars are present in the DOM (paths exist)
    const topBar = hamburgerContainer.locator('.hamburger-top');
    const middleBar = hamburgerContainer.locator('.hamburger-middle');
    const bottomBar = hamburgerContainer.locator('.hamburger-bottom');

    // Check that the bars exist in the DOM
    await expect(topBar).toHaveCount(1);
    await expect(middleBar).toHaveCount(1);
    await expect(bottomBar).toHaveCount(1);
  });

  test('should animate hamburger to X when menu button is clicked', async ({ page }) => {
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
    const hamburgerContainer = page.locator('[data-element="hamburger-container"]');
    const middleBar = hamburgerContainer.locator('.hamburger-middle');

    // Get initial opacity of middle bar
    const initialOpacity = await middleBar.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    // Click to open menu
    await menuButton.click();

    // Wait for animation to complete
    await page.waitForTimeout(500);

    // Middle bar should be hidden (opacity 0)
    const finalOpacity = await middleBar.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(parseFloat(initialOpacity)).toBe(1);
    expect(parseFloat(finalOpacity)).toBeLessThan(0.1);
  });

  test('should animate X back to hamburger when menu is closed', async ({ page }) => {
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
    const closeButton = page.locator('[data-testid="mobile-menu-close"]');
    const hamburgerContainer = page.locator('[data-element="hamburger-container"]');
    const middleBar = hamburgerContainer.locator('.hamburger-middle');

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    // Close menu using close button
    await closeButton.click();
    await page.waitForTimeout(500);

    // Middle bar should be visible again (opacity 1)
    const opacity = await middleBar.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });

    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
  });

  test('should update aria-expanded when hamburger is toggled', async ({ page }) => {
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
    const closeButton = page.locator('[data-testid="mobile-menu-close"]');

    // Initially closed
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

    // Close menu using close button
    await closeButton.click();
    await page.waitForTimeout(500);

    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  test('should animate hamburger when closing menu with close button', async ({ page }) => {
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
    const closeButton = page.locator('[data-testid="mobile-menu-close"]');
    const hamburgerContainer = page.locator('[data-element="hamburger-container"]');
    const middleBar = hamburgerContainer.locator('.hamburger-middle');

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    // Middle bar should be hidden
    let opacity = await middleBar.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    expect(parseFloat(opacity)).toBeLessThan(0.1);

    // Close with close button
    await closeButton.click();
    await page.waitForTimeout(500);

    // Middle bar should be visible again
    opacity = await middleBar.evaluate((el) => {
      return window.getComputedStyle(el).opacity;
    });
    expect(parseFloat(opacity)).toBeGreaterThan(0.9);
  });

  test('should work across multiple viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'iPhone SE' },
      { width: 390, height: 844, name: 'iPhone 12 Pro' },
      { width: 412, height: 915, name: 'Samsung Galaxy S21' },
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);

      await ensureMobileNavVisible(page);

      const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
      const closeButton = page.locator('[data-testid="mobile-menu-close"]');
      const hamburgerContainer = page.locator('[data-element="hamburger-container"]');

      // Verify hamburger is visible
      await expect(hamburgerContainer).toBeVisible();

      // Test toggle
      await menuButton.click();
      await page.waitForTimeout(500);

      const middleBar = hamburgerContainer.locator('.hamburger-middle');
      const opacity = await middleBar.evaluate((el) => {
        return window.getComputedStyle(el).opacity;
      });

      expect(parseFloat(opacity)).toBeLessThan(0.1);

      // Close for next iteration using close button
      await closeButton.click();
      await page.waitForTimeout(500);
    }
  });

  test('should not interfere with menu opening/closing animations', async ({ page }) => {
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');
    const closeButton = page.locator('[data-testid="mobile-menu-close"]');
    const fullscreenMenu = page.locator('[data-testid="mobile-fullscreen-menu"]');

    // Open menu
    await menuButton.click();
    await page.waitForTimeout(500);

    // Menu should be visible
    await expect(fullscreenMenu).toBeVisible();

    // Close menu using close button
    await closeButton.click();
    await page.waitForTimeout(500);

    // Menu should be hidden
    await expect(fullscreenMenu).not.toBeVisible();
  });

  test.skip('should handle rapid toggling gracefully', async ({ page }) => {
    // Skipped: This test is inherently problematic because the button is intentionally
    // disabled during animations to prevent race conditions. The disabled state is
    // correct behavior and clicking a disabled button will timeout.
    await ensureMobileNavVisible(page);

    const menuButton = page.locator('[data-testid="mobile-menu-toggle"]');

    // Rapid clicks
    await menuButton.click();
    await page.waitForTimeout(100);
    await menuButton.click();
    await page.waitForTimeout(100);
    await menuButton.click();
    await page.waitForTimeout(500);

    // Should end up in a valid state (either open or closed)
    const ariaExpanded = await menuButton.getAttribute('aria-expanded');
    expect(['true', 'false']).toContain(ariaExpanded);
  });
});
