import { test, expect } from '@playwright/test';

test.describe('SPA Router Navigation', () => {
  test('should navigate to all main routes', async ({ page }) => {
    await page.goto('/');

    // Test home page
    await expect(page).toHaveTitle(/Oregon Jiu Jitsu Lab/);

    // Test contact page navigation
    await page.click('[data-route="/contact"]');
    await expect(page).toHaveURL('/contact');
    await expect(page).toHaveTitle(/Contact - Oregon Jiu Jitsu Lab/);

    // Test join page navigation
    await page.click('[data-route="/join"]');
    await expect(page).toHaveURL('/join');
    await expect(page).toHaveTitle(/Join - Oregon Jiu Jitsu Lab/);

    // Test try-a-class page navigation
    await page.click('[data-route="/try-a-class"]');
    await expect(page).toHaveURL('/try-a-class');
    await expect(page).toHaveTitle(/Try a Class - Oregon Jiu Jitsu Lab/);

    // Test login page navigation
    await page.click('[data-route="/login"]');
    await expect(page).toHaveURL('/login');
    await expect(page).toHaveTitle(/Login - Oregon Jiu Jitsu Lab/);
  });

  test('should handle browser back/forward navigation', async ({ page }) => {
    await page.goto('/');

    // Navigate to contact
    await page.click('[data-route="/contact"]');
    await expect(page).toHaveURL('/contact');

    // Navigate to join
    await page.click('[data-route="/join"]');
    await expect(page).toHaveURL('/join');

    // Test browser back button
    await page.goBack();
    await expect(page).toHaveURL('/contact');

    // Test browser forward button
    await page.goForward();
    await expect(page).toHaveURL('/join');
  });
});

test.describe('Theme Switching', () => {
  test('should toggle between light and dark themes', async ({ page }) => {
    await page.goto('/');

    // Check initial theme (assuming light theme by default)
    const htmlElement = page.locator('html');

    // Find and click theme toggle button
    const themeToggle = page.locator('[data-theme-toggle]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Verify theme changed
      await expect(htmlElement).toHaveAttribute('data-theme', 'dark');

      // Toggle back
      await themeToggle.click();
      await expect(htmlElement).toHaveAttribute('data-theme', 'light');
    }
  });

  test('should persist theme across navigation', async ({ page }) => {
    await page.goto('/');

    // Toggle to dark theme
    const themeToggle = page.locator('[data-theme-toggle]').first();
    if (await themeToggle.isVisible()) {
      await themeToggle.click();

      // Navigate to another page
      await page.click('[data-route="/contact"]');

      // Verify theme persisted
      const htmlElement = page.locator('html');
      await expect(htmlElement).toHaveAttribute('data-theme', 'dark');
    }
  });
});

test.describe('Mobile Responsiveness', () => {
  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }); // iPhone SE size
    await page.goto('/');

    // Check that navigation is accessible on mobile
    const navigation = page.locator('nav');
    await expect(navigation).toBeVisible();

    // Test that content is properly laid out
    const mainContent = page.locator('main, #app');
    await expect(mainContent).toBeVisible();
  });
});
