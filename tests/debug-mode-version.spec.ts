import { test, expect } from '@playwright/test';

test.describe('Debug Mode Version Display', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should not display version by default', async ({ page }) => {
    // Version badge should not be visible without debug cookie
    const versionBadge = page.locator('[data-testid="version-badge"]');
    await expect(versionBadge).not.toBeVisible();
  });

  test('should display version when debug cookie is set to "on"', async ({
    page,
    context,
  }) => {
    // Set debug cookie
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Reload page
    await page.reload();

    // Version badge should now be visible
    const versionBadge = page.locator('[data-testid="version-badge"]');
    await expect(versionBadge).toBeVisible();
  });

  test('should not display version when debug cookie is set to "off"', async ({
    page,
    context,
  }) => {
    // Set debug cookie to "off"
    await context.addCookies([
      {
        name: 'debug',
        value: 'off',
        domain: 'localhost',
        path: '/',
      },
    ]);

    // Reload page
    await page.reload();

    // Version badge should not be visible
    const versionBadge = page.locator('[data-testid="version-badge"]');
    await expect(versionBadge).not.toBeVisible();
  });

  test('should display version text in correct format', async ({
    page,
    context,
  }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    // Check version text format (e.g., v1.0.0)
    const versionText = page.locator('[data-testid="version-text"]');
    await expect(versionText).toBeVisible();

    const text = await versionText.textContent();
    expect(text).toMatch(/^v\d+\.\d+\.\d+$/);
  });

  test('should have proper ARIA attributes', async ({ page, context }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    const versionText = page.locator('[data-testid="version-text"]');
    const ariaLabel = await versionText.getAttribute('aria-label');

    expect(ariaLabel).toContain('Application version');
  });

  test('should display version in footer location', async ({
    page,
    context,
  }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    // Version should be in the footer
    const footer = page.locator('footer');
    const versionInFooter = footer.locator('[data-testid="version-badge"]');

    await expect(versionInFooter).toBeVisible();
  });

  test('should have detailed version in title attribute', async ({
    page,
    context,
  }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    const versionText = page.locator('[data-testid="version-text"]');
    const title = await versionText.getAttribute('title');

    // Title should contain detailed version info
    expect(title).toBeTruthy();
    expect(title?.length).toBeGreaterThan(0);
  });

  test('should update aria-expanded on hover', async ({ page, context }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    const versionText = page.locator('[data-testid="version-text"]');

    // Hover over version text
    await versionText.hover();

    // Wait a moment for event handler
    await page.waitForTimeout(100);

    // Check aria-expanded attribute
    const ariaExpanded = await versionText.getAttribute('aria-expanded');
    expect(ariaExpanded).toBe('true');
  });

  test('should persist across navigation', async ({ page, context }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Verify version is visible on home page
    let versionBadge = page.locator('[data-testid="version-badge"]').first();
    await expect(versionBadge).toBeVisible();

    // Navigate to contact page using direct navigation (works across all viewports)
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');

    // Wait for version to render on new page
    await page.waitForTimeout(200);

    // Version should still be visible (use .first() in case of duplicates during transition)
    versionBadge = page.locator('[data-testid="version-badge"]').first();
    await expect(versionBadge).toBeVisible();
  });

  test('should work on mobile viewport', async ({ page, context }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Scroll to footer and wait for it to be in view
    await page.evaluate(() => {
      const footer = document.querySelector('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'instant', block: 'end' });
      }
    });
    await page.waitForTimeout(300);

    // Version should be visible in footer
    const versionBadge = page.locator('[data-testid="version-badge"]');
    await expect(versionBadge).toBeVisible();
  });

  test('should not appear in header or navigation', async ({
    page,
    context,
  }) => {
    // Enable debug mode
    await context.addCookies([
      {
        name: 'debug',
        value: 'on',
        domain: 'localhost',
        path: '/',
      },
    ]);

    await page.reload();

    // Check that version is NOT in header
    const header = page.locator('header, nav.hero-nav');
    const versionInHeader = header.locator('[data-testid="version-badge"]');
    await expect(versionInHeader).not.toBeVisible();

    // Version should only be in footer
    const footer = page.locator('footer');
    const versionInFooter = footer.locator('[data-testid="version-badge"]');
    await expect(versionInFooter).toBeVisible();
  });
});
