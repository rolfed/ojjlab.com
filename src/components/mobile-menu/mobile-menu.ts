import { MobileMenuAnimation } from './mobile-menu-animation';
import { getAssetUrl } from '../../utils/base-path';

/**
 * Unified Mobile Menu Component
 *
 * Single web component that encapsulates:
 * - Bottom navigation bar (scroll-triggered)
 * - Hamburger icon animation
 * - Fullscreen menu with navigation
 * - Submenu navigation (Programs)
 *
 * This eliminates timing issues by having a single state machine
 * and unified GSAP timeline for all animations.
 *
 * @example
 * ```html
 * <mobile-menu></mobile-menu>
 * ```
 */
export class MobileMenuComponent extends HTMLElement {
  private animation: MobileMenuAnimation;
  private isMainNavVisible = true;
  private scrollRaf: number | null = null;

  constructor() {
    super();
    this.animation = new MobileMenuAnimation();
  }

  public connectedCallback(): void {
    this.innerHTML = this.getTemplate();
    this.animation.init(this);
    this.setupEventListeners();
    this.initializeScrollDetection();
    this.updateActiveNavItem();
  }

  public disconnectedCallback(): void {
    this.animation.destroy();

    if (this.scrollRaf) {
      cancelAnimationFrame(this.scrollRaf);
    }

    // Remove scroll listener
    window.removeEventListener('scroll', this.handleScroll);
  }

  /**
   * Get component template with all mobile menu HTML
   */
  private getTemplate(): string {
    return `
      <!-- Bottom Navigation Bar (appears when main nav is scrolled out of view) -->
      <nav class="mobile-bottom-nav" aria-label="Mobile navigation" data-testid="mobile-bottom-nav">
        <div class="mobile-bottom-nav-container" data-testid="mobile-nav-container">
          <!-- Logo -->
          <div class="mobile-nav-logo" data-testid="mobile-logo-container">
            <a href="/" data-route="/" data-testid="mobile-logo-link">
              <img class="block dark:hidden h-6 w-auto" src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab.svg')}" alt="Oregon Jiu Jitsu Lab" data-testid="mobile-logo-light"/>
              <img class="hidden dark:block h-6 w-auto" src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab-light.svg')}" alt="Oregon Jiu Jitsu Lab" data-testid="mobile-logo-dark"/>
            </a>
          </div>

          <!-- Animated Hamburger Menu Button -->
          <button class="mobile-hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" data-element="menu-toggle" data-testid="mobile-menu-toggle">
            <svg class="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" class="w-6 h-6">
              <path class="hamburger-top" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6h18"/>
              <path class="hamburger-middle" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18"/>
              <path class="hamburger-bottom" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 18h18"/>
            </svg>
          </button>
        </div>
      </nav>

      <!-- Fullscreen Mobile Menu -->
      <div class="mobile-fullscreen-menu" data-element="mobile-menu" data-testid="mobile-fullscreen-menu">
        <!-- Theme Toggle at Top -->
        <div class="mobile-menu-header" data-testid="mobile-menu-header">
          <div class="mobile-theme-toggle" data-testid="mobile-theme-toggle-container">
            <button id="mobile-theme-toggle" type="button"
              aria-pressed="false"
              aria-label="Toggle color scheme"
              title="Toggle color scheme"
              data-element="theme-toggle"
              data-testid="mobile-theme-toggle"
              data-theme-toggle>
              <span class="sr-only">Toggle Theme</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- Main Content -->
        <div class="mobile-menu-content" data-testid="mobile-menu-content">
          <!-- Logo in Menu -->
          <div class="mobile-menu-logo" data-animation="menu-logo" data-testid="mobile-menu-logo">
            <a href="/" data-route="/" data-testid="mobile-menu-logo-link">
              <img class="block dark:hidden h-8 w-auto" src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab.svg')}" alt="Oregon Jiu Jitsu Lab" data-testid="mobile-menu-logo-light"/>
              <img class="hidden dark:block h-8 w-auto" src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab-light.svg')}" alt="Oregon Jiu Jitsu Lab" data-testid="mobile-menu-logo-dark"/>
            </a>
          </div>

          <!-- Navigation Container -->
          <div class="mobile-nav-container" data-testid="mobile-nav-container">
            <!-- Main Navigation -->
            <nav class="mobile-nav-items mobile-nav-main" aria-label="Mobile menu navigation" data-element="nav-items" data-nav-level="main" data-testid="mobile-main-nav">
              <a href="/" data-route="/" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-home">
                <span>Home</span>
              </a>
              <a href="/about" data-route="/about" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-about">
                <span>About</span>
              </a>
              <button class="mobile-nav-item mobile-nav-programs-trigger" data-animation="nav-item" data-element="programs-trigger" data-testid="mobile-nav-programs-trigger">
                <span>Programs</span>
                <svg class="mobile-nav-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
              <a href="/instructors" data-route="/instructors" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-instructors">
                <span>Instructors</span>
              </a>
              <a href="/contact" data-route="/contact" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-contact">
                <span>Contact</span>
              </a>
              <a href="/join" data-route="/join" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-join">
                <span>Join</span>
              </a>
              <a href="/login" data-route="/login" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-login">
                <span>Login</span>
              </a>
            </nav>

            <!-- Programs Submenu -->
            <nav class="mobile-nav-items mobile-nav-submenu" aria-label="Programs submenu" data-element="programs-submenu" data-nav-level="programs" data-testid="mobile-programs-submenu">
              <button class="mobile-nav-item mobile-nav-back" data-animation="nav-item" data-element="back-button" data-testid="mobile-nav-back">
                <svg class="mobile-nav-back-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                <span>Back</span>
              </button>
              <a href="/jiu-jitsu" data-route="/jiu-jitsu" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-jiu-jitsu">
                <span>Jiu Jitsu</span>
              </a>
              <a href="/wrestling" data-route="/wrestling" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-wrestling">
                <span>Wrestling</span>
              </a>
              <a href="/kickboxing" data-route="/kickboxing" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-kickboxing">
                <span>Kickboxing</span>
              </a>
              <a href="/competition-team" data-route="/competition-team" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-competition-team">
                <span>Competition Team</span>
              </a>
              <a href="/schedule" data-route="/schedule" class="mobile-nav-item" data-animation="nav-item" data-testid="mobile-nav-schedule">
                <span>Schedule</span>
              </a>
            </nav>
          </div>
        </div>

        <!-- Close Button at Bottom Center -->
        <div class="mobile-menu-footer" data-testid="mobile-menu-footer">
          <button class="mobile-close-btn" aria-label="Close mobile menu" data-element="close-button" data-testid="mobile-menu-close">
            <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    `;
  }

  /**
   * Setup all event listeners for the component
   */
  private setupEventListeners(): void {
    // Menu toggle button
    const menuToggle = this.querySelector('[data-element="menu-toggle"]');
    if (menuToggle) {
      menuToggle.addEventListener('click', this.handleMenuToggle.bind(this));
    }

    // Close button
    const closeButton = this.querySelector('[data-element="close-button"]');
    if (closeButton) {
      closeButton.addEventListener('click', this.handleMenuClose.bind(this));
    }

    // Navigation item clicks (close menu after navigation)
    const navItems = this.querySelectorAll(
      '[data-animation="nav-item"]:not([data-element="programs-trigger"]):not([data-element="back-button"])'
    );
    navItems.forEach((item) => {
      item.addEventListener('click', this.handleNavItemClick.bind(this));
    });

    // Programs trigger
    const programsTrigger = this.querySelector(
      '[data-element="programs-trigger"]'
    );
    if (programsTrigger) {
      programsTrigger.addEventListener(
        'click',
        this.handleProgramsTrigger.bind(this)
      );
    }

    // Back button
    const backButton = this.querySelector('[data-element="back-button"]');
    if (backButton) {
      backButton.addEventListener('click', this.handleBackButton.bind(this));
    }

    // Initialize mobile theme toggle
    this.initializeMobileThemeToggle();
  }

  /**
   * Handle menu toggle button click
   */
  private async handleMenuToggle(): Promise<void> {
    const button = this.querySelector(
      '[data-element="menu-toggle"]'
    ) as HTMLButtonElement;
    if (!button) return;

    // Disable button during animation
    button.disabled = true;

    await this.animation.toggle();

    // Update ARIA state
    const state = this.animation.getState();
    button.setAttribute('aria-expanded', state.isOpen.toString());
    button.disabled = false;
  }

  /**
   * Handle close button click
   */
  private async handleMenuClose(): Promise<void> {
    const buttons = [
      this.querySelector('[data-element="menu-toggle"]') as HTMLButtonElement,
      this.querySelector('[data-element="close-button"]') as HTMLButtonElement,
    ];

    // Disable buttons during animation
    buttons.forEach((btn) => btn && (btn.disabled = true));

    await this.animation.close();

    // Update ARIA state
    const state = this.animation.getState();
    const menuToggle = buttons[0];
    if (menuToggle) {
      menuToggle.setAttribute('aria-expanded', state.isOpen.toString());
    }

    buttons.forEach((btn) => btn && (btn.disabled = false));
  }

  /**
   * Handle navigation item click
   * Closes menu and allows router to handle navigation
   */
  private async handleNavItemClick(): Promise<void> {
    const state = this.animation.getState();
    if (!state.isOpen) return;

    // Close menu immediately - router will handle navigation
    await this.handleMenuClose();
    this.updateActiveNavItem();
  }

  /**
   * Handle programs trigger click
   */
  private async handleProgramsTrigger(): Promise<void> {
    const state = this.animation.getState();
    if (state.isOpen && state.currentLevel === 'main') {
      await this.animation.showProgramsSubmenu();
    }
  }

  /**
   * Handle back button click
   */
  private async handleBackButton(): Promise<void> {
    const state = this.animation.getState();
    if (state.isOpen && state.currentLevel === 'programs') {
      await this.animation.showMainNavigation();
    }
  }

  /**
   * Initialize scroll detection for bottom nav visibility
   */
  private initializeScrollDetection(): void {
    const findAndInitializeScrollDetection = () => {
      const mainNav = document.querySelector(
        '.hero-nav, .site-nav'
      ) as HTMLElement;

      if (!mainNav) {
        // Retry after a short delay if navigation not found
        setTimeout(findAndInitializeScrollDetection, 100);
        return;
      }

      const handleScroll = (): void => {
        const rect = mainNav.getBoundingClientRect();
        const isMainNavVisible = rect.bottom > 0;

        // Check if footer social section is visible
        const footerSocial = document.querySelector(
          '.footer-social'
        ) as HTMLElement;
        let isFooterSocialVisible = false;

        if (footerSocial) {
          const footerRect = footerSocial.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          isFooterSocialVisible = footerRect.top < viewportHeight;
        }

        // Show bottom nav only if main nav is hidden AND footer social is not visible
        const shouldShowBottomNav = !isMainNavVisible && !isFooterSocialVisible;

        if (isMainNavVisible !== this.isMainNavVisible) {
          this.isMainNavVisible = isMainNavVisible;
          this.toggleBottomNav(shouldShowBottomNav);
        } else if (!isMainNavVisible) {
          // If main nav is already hidden, just update based on footer visibility
          this.toggleBottomNav(shouldShowBottomNav);
        }
      };

      this.handleScroll = (): void => {
        if (!this.scrollRaf) {
          this.scrollRaf = requestAnimationFrame(() => {
            handleScroll();
            this.scrollRaf = null;
          });
        }
      };

      window.addEventListener('scroll', this.handleScroll, { passive: true });

      // Initial check
      handleScroll();
    };

    // Start the initialization process
    findAndInitializeScrollDetection();
  }

  /**
   * Toggle bottom nav visibility
   */
  private toggleBottomNav(show: boolean): void {
    if (show) {
      this.animation.showBottomNav();
    } else {
      this.animation.hideBottomNav();
    }
  }

  /**
   * Update active nav item based on current route
   */
  private updateActiveNavItem(): void {
    const currentPath = window.location.pathname;
    const navItems = this.querySelectorAll('.mobile-nav-item[data-route]');

    navItems.forEach((item) => {
      const route = item.getAttribute('data-route');
      if (route === currentPath) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * Initialize mobile theme toggle functionality
   */
  private initializeMobileThemeToggle(): void {
    const mobileThemeToggle = this.querySelector(
      '[data-element="theme-toggle"]'
    );
    if (mobileThemeToggle) {
      // Sync with existing theme toggle functionality
      import('../../functionality/toggle-theme').then(
        ({ themeConfiguration }) => {
          // Re-run theme configuration to include the mobile button
          themeConfiguration();
        }
      );
    }
  }

  // Type-safe scroll handler reference
  private handleScroll: () => void = () => {};
}

// Define the custom element
customElements.define('mobile-menu', MobileMenuComponent);

export default MobileMenuComponent;
