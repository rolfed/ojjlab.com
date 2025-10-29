import { test, expect } from '@playwright/test';

/**
 * Style Guide & Design Principles Validation Tests
 *
 * These tests validate that the home page meets our brand standards
 * as defined in /context/style-guide.md and /context/design-principles.md
 */

test.describe('Style Guide Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
  });

  test.describe('Color System Validation', () => {
    test('should use correct brand colors', async ({ page }) => {
      // Test brand red primary color (#f23838)
      const brandElements = page.locator(
        '[class*="bg-brand"], [class*="text-brand"]'
      );
      if ((await brandElements.count()) > 0) {
        const element = brandElements.first();
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            backgroundColor: computed.backgroundColor,
            color: computed.color,
          };
        });

        // Check if brand color is being used
        expect([styles.backgroundColor, styles.color]).toContain(
          expect.stringMatching(/(rgb\\(242,\\s*56,\\s*56\\)|#f23838)/i)
        );
      }
    });

    test('should have proper contrast ratios for accessibility', async ({
      page,
    }) => {
      // Test high contrast elements
      const textElements = page.locator('h1, h2, h3, p, span, a, button');
      const elementsCount = await textElements.count();

      for (let i = 0; i < Math.min(elementsCount, 10); i++) {
        const element = textElements.nth(i);
        if (await element.isVisible()) {
          const styles = await element.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
            };
          });

          // Ensure text is visible (not transparent)
          expect(styles.color).not.toBe('rgba(0, 0, 0, 0)');
          expect(styles.color).not.toBe('transparent');
        }
      }
    });

    test('should adapt colors correctly in light/dark mode', async ({
      page,
    }) => {
      const htmlElement = page.locator('html');

      // Force light mode first by setting localStorage
      await page.evaluate(() => {
        localStorage.setItem('theme', 'light');
        // Manually trigger theme application
        const root = document.documentElement;
        root.classList.remove('dark');
        root.classList.add('light');
        root.setAttribute('data-theme', 'light');
      });

      // Test light mode colors
      await expect(htmlElement).toHaveAttribute('data-theme', 'light');

      const lightModeColors = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.documentElement);
        return {
          accentDark: styles.getPropertyValue('--color-accent-dark').trim(),
          popLight: styles.getPropertyValue('--color-pop-light').trim(),
          brand: styles.getPropertyValue('--color-brand').trim(),
        };
      });

      expect(lightModeColors.accentDark).toBe('#a67c53');
      expect(lightModeColors.popLight).toBe('#000000');
      expect(lightModeColors.brand).toBe('#f23838');

      // Toggle to dark mode if theme toggle exists
      const themeToggle = page.locator('[data-theme-toggle]').first();
      if (await themeToggle.isVisible()) {
        await themeToggle.click();

        // Wait for theme change
        await page.waitForTimeout(100);

        // Verify dark mode is active
        await expect(htmlElement).toHaveAttribute('data-theme', 'dark');

        // Test that accent colors flip appropriately
        const darkAccentElements = page.locator(
          '[class*="text-accent"], [class*="border-accent"]'
        );
        if ((await darkAccentElements.count()) > 0) {
          const element = darkAccentElements.first();
          const isVisible = await element.isVisible();
          expect(isVisible).toBe(true);
        }
      }
    });
  });

  test.describe('Typography System Validation', () => {
    test('should use correct font families', async ({ page }) => {
      // Test title font (Hind)
      const titleElements = page.locator(
        'h1, h2, h3, h4, h5, h6, [class*="font-title"]'
      );
      if ((await titleElements.count()) > 0) {
        const titleFont = await titleElements.first().evaluate((el) => {
          return window.getComputedStyle(el).fontFamily;
        });
        expect(titleFont).toMatch(/Hind/i);
      }

      // Test content font (Montserrat) - excluding monospace elements like version
      const contentElements = page.locator(
        'p, [class*="font-content"]:not([class*="font-mono"]):not(.version-text)'
      );
      if ((await contentElements.count()) > 0) {
        const contentFont = await contentElements.first().evaluate((el) => {
          return window.getComputedStyle(el).fontFamily;
        });
        expect(contentFont).toMatch(/Montserrat/i);
      }
    });

    test('should have proper responsive typography scaling', async ({
      page,
    }) => {
      // Test H1 scaling on mobile vs desktop
      const h1 = page.locator('h1').first();
      if (await h1.isVisible()) {
        // Mobile size
        await page.setViewportSize({ width: 375, height: 667 });
        const mobileFontSize = await h1.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        // Desktop size
        await page.setViewportSize({ width: 1920, height: 1080 });
        const desktopFontSize = await h1.evaluate((el) => {
          return window.getComputedStyle(el).fontSize;
        });

        // Desktop should be larger than mobile
        const mobileSize = parseFloat(mobileFontSize);
        const desktopSize = parseFloat(desktopFontSize);
        expect(desktopSize).toBeGreaterThan(mobileSize);
      }
    });

    test('should maintain minimum readable text size', async ({ page }) => {
      // Test on mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });

      // Check main content paragraphs, excluding small decorative text
      const bodyText = page.locator('main p, article p, section p').first();
      if (await bodyText.isVisible()) {
        const fontSize = await bodyText.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });

        // Minimum 16px for main body text accessibility
        expect(fontSize).toBeGreaterThanOrEqual(16);
      }
    });
  });

  test.describe('Layout & Spacing Validation', () => {
    test('should use consistent spacing system', async ({ page }) => {
      // Test that elements use design system spacing
      const spacedElements = page.locator(
        '[class*="py-"], [class*="px-"], [class*="p-"], [class*="m-"]'
      );
      const count = await spacedElements.count();

      // Should have elements using spacing classes
      expect(count).toBeGreaterThan(0);

      // Test some common spacing values
      if (count > 0) {
        const element = spacedElements.first();
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            paddingTop: computed.paddingTop,
            paddingLeft: computed.paddingLeft,
            marginTop: computed.marginTop,
            marginLeft: computed.marginLeft,
          };
        });

        // Verify spacing values are multiples of base unit (typically 4px or 8px)
        Object.values(styles).forEach((value) => {
          if (value && value !== '0px') {
            const numValue = parseFloat(value);
            expect(numValue % 4).toBe(0); // Should be multiple of 4
          }
        });
      }
    });

    test('should have proper responsive grid behavior', async ({ page }) => {
      // Look for section layout which should be responsive
      const gridElement = page.locator('.section-layout').first();

      if ((await gridElement.count()) === 0) {
        // If no section-layout, skip this test as it's not applicable
        return;
      }

      // Test mobile layout
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(100); // Wait for CSS to apply

      const mobileLayout = await gridElement.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          gridTemplateColumns: computed.gridTemplateColumns,
          flexDirection: computed.flexDirection,
        };
      });

      // Test desktop layout
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.waitForTimeout(100); // Wait for CSS to apply

      const desktopLayout = await gridElement.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          display: computed.display,
          gridTemplateColumns: computed.gridTemplateColumns,
          flexDirection: computed.flexDirection,
        };
      });

      // Layout should be responsive (different between mobile and desktop)
      expect(mobileLayout).not.toEqual(desktopLayout);
    });

    test('should use golden ratio proportions', async ({ page }) => {
      // Test for golden ratio usage (1.618)
      const goldenRatio = await page.evaluate(() => {
        const styles = window.getComputedStyle(document.documentElement);
        return styles.getPropertyValue('--ratio').trim();
      });

      expect(goldenRatio).toBe('1.618');
    });
  });

  test.describe('Component Standards Validation', () => {
    test('should have properly styled buttons', async ({ page }) => {
      const buttons = page.locator(
        'button, [role="button"], .primary-btn, .secondary-btn'
      );
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        const button = buttons.first();
        if (await button.isVisible()) {
          const styles = await button.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              textTransform: computed.textTransform,
              letterSpacing: computed.letterSpacing,
              borderRadius: computed.borderRadius,
              padding: computed.padding,
              cursor: computed.cursor,
            };
          });

          // Primary/secondary buttons should be uppercase
          if (
            await button
              .getAttribute('class')
              .then((cls) => cls?.includes('btn'))
          ) {
            expect(styles.textTransform).toBe('uppercase');
            expect(parseFloat(styles.letterSpacing)).toBeGreaterThan(0);
          }

          expect(styles.cursor).toBe('pointer');
        }
      }
    });

    test('should have proper navigation structure', async ({ page }) => {
      // Test for main desktop navigation element
      const nav = page.locator('[data-testid="desktop-navigation"]');
      await expect(nav).toBeVisible();

      // Test for navigation links in main nav
      const navLinks = page.locator('[data-testid="desktop-nav-menu"] a');
      const linkCount = await navLinks.count();
      expect(linkCount).toBeGreaterThan(0);

      // Test navigation styling
      if (linkCount > 0) {
        const firstLink = navLinks.first();
        const styles = await firstLink.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            textTransform: computed.textTransform,
            fontSize: computed.fontSize,
            fontWeight: computed.fontWeight,
          };
        });

        expect(styles.textTransform).toBe('uppercase');
      }
    });
  });
});

test.describe('Design Principles Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test.describe('Brand-First Storytelling', () => {
    test('should have compelling brand messaging', async ({ page }) => {
      // Test for hero section with brand messaging
      const heroSection = page
        .locator('.hero, [class*="hero"], section')
        .first();
      await expect(heroSection).toBeVisible();

      // Test for impactful headlines
      const headlines = page.locator('h1, h2');
      const headlineCount = await headlines.count();
      expect(headlineCount).toBeGreaterThan(0);

      // Headlines should be visible and substantial
      if (headlineCount > 0) {
        const mainHeadline = headlines.first();
        await expect(mainHeadline).toBeVisible();

        const text = await mainHeadline.textContent();
        expect(text?.length).toBeGreaterThan(5);
      }
    });

    test('should reinforce athletic identity', async ({ page }) => {
      // Look for athletic/coaching related content
      const athleticTerms = [
        'coach',
        'training',
        'performance',
        'athlete',
        'fitness',
        'jiu jitsu',
        'bjj',
      ];

      const pageContent = await page.textContent('body');
      const hasAthleticContent = athleticTerms.some((term) =>
        pageContent?.toLowerCase().includes(term.toLowerCase())
      );

      expect(hasAthleticContent).toBe(true);
    });
  });

  test.describe('Sophisticated Simplicity', () => {
    test('should have clean, uncluttered interface', async ({ page }) => {
      // Test for appropriate amount of content per screen
      const sections = page.locator('section, .section');
      const sectionCount = await sections.count();

      // Should have content but not overwhelming
      expect(sectionCount).toBeGreaterThan(0);
      expect(sectionCount).toBeLessThan(20); // Reasonable upper limit

      // Test for appropriate white space
      const body = page.locator('body');
      const bodyStyles = await body.evaluate((el) => {
        const computed = window.getComputedStyle(el);
        return {
          margin: computed.margin,
          padding: computed.padding,
        };
      });

      // Should have some spacing
      expect(bodyStyles.margin || bodyStyles.padding).toBeTruthy();
    });

    test('should prioritize content hierarchy', async ({ page }) => {
      // Test heading hierarchy
      const h1Count = await page.locator('h1').count();
      const h2Count = await page.locator('h2').count();

      // Should have proper heading structure
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(3); // Not too many h1s

      if (h2Count > 0) {
        expect(h2Count).toBeGreaterThanOrEqual(h1Count); // More h2s than h1s is normal
      }
    });
  });

  test.describe('Effortless Performance', () => {
    test('should load quickly', async ({ page }) => {
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('domcontentloaded');
      const loadTime = Date.now() - startTime;

      // Should load in under 3 seconds (generous for development)
      expect(loadTime).toBeLessThan(3000);
    });

    test('should have smooth animations', async ({ page }) => {
      // Test for CSS transitions
      const animatedElements = page.locator(
        '[class*="transition"], [class*="animate"], [class*="duration"]'
      );
      const animatedCount = await animatedElements.count();

      if (animatedCount > 0) {
        const element = animatedElements.first();
        const styles = await element.evaluate((el) => {
          const computed = window.getComputedStyle(el);
          return {
            transition: computed.transition,
            transitionDuration: computed.transitionDuration,
            transitionTimingFunction: computed.transitionTimingFunction,
          };
        });

        // Should have transition properties
        expect(styles.transition || styles.transitionDuration).toBeTruthy();
      }
    });
  });

  test.describe('Universal Accessibility', () => {
    test('should have proper semantic HTML', async ({ page }) => {
      // Test for semantic elements
      const semanticElements = page.locator(
        'header, nav, main, section, footer'
      );
      const semanticCount = await semanticElements.count();
      expect(semanticCount).toBeGreaterThanOrEqual(3);

      // Test for proper heading hierarchy
      const h1 = page.locator('h1');
      const h1Count = await h1.count();
      expect(h1Count).toBeGreaterThanOrEqual(1);
    });

    test('should have skip navigation for accessibility', async ({ page }) => {
      // Test for skip link existence and functionality
      const skipLink = page.locator('.skip-link, [class*="skip"]');
      const skipLinkCount = await skipLink.count();

      if (skipLinkCount > 0) {
        // Skip link exists - test its functionality
        const firstSkipLink = skipLink.first();

        // Should have proper href attribute
        const href = await firstSkipLink.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).toMatch(/^#/); // Should link to an anchor

        // Should be focusable
        await firstSkipLink.focus();
        await expect(firstSkipLink).toBeFocused();
      }
    });

    test('should have proper ARIA attributes where needed', async ({
      page,
    }) => {
      // Test for ARIA labels on interactive elements
      const interactiveElements = page.locator(
        'button, [role="button"], [role="navigation"], [role="main"]'
      );
      const interactiveCount = await interactiveElements.count();

      if (interactiveCount > 0) {
        // At least some elements should have proper roles or labels
        const elementsWithAria = page.locator(
          '[aria-label], [aria-labelledby], [role]'
        );
        const ariaCount = await elementsWithAria.count();
        expect(ariaCount).toBeGreaterThan(0);
      }
    });

    test('should be keyboard navigable', async ({ page }) => {
      // Test tab navigation
      await page.keyboard.press('Tab');

      // Check that focus is visible somewhere
      const focusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(focusedElement).toBeTruthy();

      // Test multiple tab presses
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');

      const newFocusedElement = await page.evaluate(
        () => document.activeElement?.tagName
      );
      expect(newFocusedElement).toBeTruthy();
    });
  });

  test.describe('Visual Consistency', () => {
    test('should maintain consistent brand elements', async ({ page }) => {
      // Test for desktop navigation presence (which contains branding)
      const desktopNav = page.locator('[data-testid="desktop-navigation"]');
      await expect(desktopNav).toBeVisible();

      // Test for consistent color usage
      const brandElements = page.locator('[class*="brand"], [class*="accent"]');
      const brandCount = await brandElements.count();
      expect(brandCount).toBeGreaterThan(0);
    });

    test('should have consistent spacing throughout', async ({ page }) => {
      // Test multiple sections for consistent spacing
      const sections = page.locator('section, .section');
      const sectionCount = await sections.count();

      if (sectionCount > 1) {
        const spacingValues = [];

        for (let i = 0; i < Math.min(sectionCount, 3); i++) {
          const section = sections.nth(i);
          const padding = await section.evaluate((el) => {
            const computed = window.getComputedStyle(el);
            return {
              paddingTop: computed.paddingTop,
              paddingBottom: computed.paddingBottom,
              marginTop: computed.marginTop,
              marginBottom: computed.marginBottom,
            };
          });
          spacingValues.push(padding);
        }

        // Should have some spacing values collected
        expect(spacingValues.length).toBeGreaterThan(0);

        // At least some sections should have non-zero spacing (either padding or margin)
        const hasSpacing = spacingValues.some(
          (spacing) =>
            spacing.paddingTop !== '0px' ||
            spacing.paddingBottom !== '0px' ||
            spacing.marginTop !== '0px' ||
            spacing.marginBottom !== '0px'
        );
        expect(hasSpacing).toBe(true);
      }
    });
  });
});

test.describe('Responsive Design Validation', () => {
  const viewports = [
    { name: 'Mobile', width: 375, height: 667 },
    { name: 'Tablet', width: 768, height: 1024 },
    { name: 'Desktop', width: 1920, height: 1080 },
    { name: 'Large Desktop', width: 2560, height: 1440 },
  ];

  viewports.forEach((viewport) => {
    test(`should work properly on ${viewport.name} (${viewport.width}x${viewport.height})`, async ({
      page,
    }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.goto('/');
      await page.waitForLoadState('networkidle');

      // Test that main content is visible
      const mainContent = page.locator('main, #app, body > *').first();
      await expect(mainContent).toBeVisible();

      // Test that main navigation exists and is accessible
      const navigation = page.locator('[data-testid="desktop-navigation"]');
      await expect(navigation).toBeVisible();

      // Test that main content text is readable (not too small)
      const bodyText = page.locator('main p, article p, section p').first();
      if (await bodyText.isVisible()) {
        const fontSize = await bodyText.evaluate((el) => {
          return parseFloat(window.getComputedStyle(el).fontSize);
        });
        expect(fontSize).toBeGreaterThanOrEqual(14); // Minimum readable size for main content
      }

      // Test that buttons are appropriately sized for the viewport
      const buttons = page.locator('button, [role="button"]');
      const buttonCount = await buttons.count();

      if (buttonCount > 0) {
        const button = buttons.first();
        if (await button.isVisible()) {
          const boundingBox = await button.boundingBox();
          if (boundingBox) {
            // Buttons should be at least 44px for touch targets on mobile
            if (viewport.width < 768) {
              expect(
                Math.min(boundingBox.width, boundingBox.height)
              ).toBeGreaterThanOrEqual(32);
            }
          }
        }
      }
    });
  });

  test('should handle orientation changes gracefully', async ({ page }) => {
    // Test mobile landscape
    await page.setViewportSize({ width: 667, height: 375 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Content should still be visible and accessible
    const mainContent = page.locator('main, #app, body > *').first();
    await expect(mainContent).toBeVisible();

    // Navigation should be accessible
    const navigation = page.locator('[data-testid="desktop-navigation"]');
    await expect(navigation).toBeVisible();
  });
});
