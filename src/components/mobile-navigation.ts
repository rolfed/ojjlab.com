import { MobileNavAnimation } from '../animations/mobile-nav';

export class MobileNavigationComponent extends HTMLElement {
  private mobileNavAnimation: MobileNavAnimation;
  private bottomNav: HTMLElement | null = null;
  private fullscreenMenu: HTMLElement | null = null;
  private hamburgerButton: HTMLElement | null = null;
  private isMainNavVisible = true;

  constructor() {
    super();
    this.mobileNavAnimation = new MobileNavAnimation();
  }

  public connectedCallback(): void {
    this.innerHTML = this.getTemplate();
    this.initializeElements();
    this.setupEventListeners();
    this.initializeScrollDetection();
    this.mobileNavAnimation.init(this.fullscreenMenu!);
  }

  private getTemplate(): string {
    return `
            <!-- Bottom Navigation Bar (appears when main nav is scrolled out of view) -->
            <nav class="mobile-bottom-nav" aria-label="Mobile navigation">
                <div class="mobile-bottom-nav-container">
                    <!-- Logo -->
                    <div class="mobile-nav-logo">
                        <a href="/" data-route="/">
                            <img class="block dark:hidden h-6 w-auto" src="/images/brand/oregon-jiu-jitsu-lab.svg" alt="Oregon Jiu Jitsu Lab"/>
                            <img class="hidden dark:block h-6 w-auto" src="/images/brand/oregon-jiu-jitsu-lab-light.svg" alt="Oregon Jiu Jitsu Lab"/>
                        </a>
                    </div>

                    <!-- Hamburger Menu Button -->
                    <button class="mobile-hamburger-btn" aria-label="Toggle mobile menu" aria-expanded="false" data-element="menu-toggle">
                        <svg data-animation="hamburger-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12h18M3 6h18M3 18h18"/>
                        </svg>
                        <svg data-animation="close-icon" class="hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </nav>

            <!-- Fullscreen Mobile Menu -->
            <div class="mobile-fullscreen-menu" data-element="mobile-menu">
                <!-- Theme Toggle at Top -->
                <div class="mobile-menu-header">
                    <div class="mobile-theme-toggle">
                        <button id="mobile-theme-toggle" type="button"
                            aria-pressed="false"
                            aria-label="Toggle color scheme"
                            title="Toggle color scheme"
                            data-element="theme-toggle">
                            <span class="sr-only">Toggle Theme</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Main Content -->
                <div class="mobile-menu-content">
                    <nav class="mobile-nav-items" aria-label="Mobile menu navigation" data-element="nav-items">
                        <a href="/" data-route="/" class="mobile-nav-item" data-animation="nav-item">
                            <span>Home</span>
                        </a>
                        <a href="#about" class="mobile-nav-item" data-animation="nav-item">
                            <span>About</span>
                        </a>
                        <a href="#programs" class="mobile-nav-item" data-animation="nav-item">
                            <span>Programs</span>
                        </a>
                        <a href="#instructors" class="mobile-nav-item" data-animation="nav-item">
                            <span>Instructors</span>
                        </a>
                        <a href="/contact" data-route="/contact" class="mobile-nav-item" data-animation="nav-item">
                            <span>Contact</span>
                        </a>
                        <a href="/join" data-route="/join" class="mobile-nav-item" data-animation="nav-item">
                            <span>Join</span>
                        </a>
                        <a href="/try-a-class" data-route="/try-a-class" class="mobile-nav-item" data-animation="nav-item">
                            <span>Try a Class</span>
                        </a>
                    </nav>
                </div>

                <!-- Close Button at Bottom Center -->
                <div class="mobile-menu-footer">
                    <button class="mobile-close-btn" aria-label="Close mobile menu" data-element="close-button">
                        <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
  }

  private initializeElements(): void {
    this.bottomNav = this.querySelector('.mobile-bottom-nav');
    this.fullscreenMenu = this.querySelector('[data-element="mobile-menu"]');
    this.hamburgerButton = this.querySelector('[data-element="menu-toggle"]');
  }

  private setupEventListeners(): void {
    if (this.hamburgerButton) {
      this.hamburgerButton.addEventListener(
        'click',
        this.toggleMobileMenu.bind(this)
      );
    }

    // Close button event listener
    const closeButton = this.querySelector('[data-element="close-button"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        this.closeMobileMenuWithIconUpdate();
      });
    }

    // Close menu when clicking navigation items
    const navItems = this.querySelectorAll('[data-animation="nav-item"]');
    navItems.forEach((item) => {
      item.addEventListener('click', () => {
        const currentState = this.mobileNavAnimation.getCurrentState();
        if (currentState.isOpen) {
          this.closeMobileMenuWithIconUpdate();
        }
      });
    });

    // Initialize mobile theme toggle
    this.initializeMobileThemeToggle();
  }

  private initializeScrollDetection(): void {
    const mainNav = document.querySelector(
      '.hero-nav, .site-nav'
    ) as HTMLElement;

    if (!mainNav || !this.bottomNav) return;

    let ticking = false;

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
        // Consider footer visible if it's within the bottom 20% of the viewport
        isFooterSocialVisible = footerRect.top < viewportHeight * 0.8;
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

    const requestTick = (): void => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial check
    handleScroll();
  }

  private toggleBottomNav(show: boolean): void {
    if (!this.bottomNav) return;

    if (show) {
      this.bottomNav.classList.add('visible');
    } else {
      this.bottomNav.classList.remove('visible');
    }
  }

  private async toggleMobileMenu(): Promise<void> {
    if (!this.hamburgerButton) return;

    const currentState = this.mobileNavAnimation.getCurrentState();

    this.setButtonsDisabled(true);

    const newState = currentState.isOpen
      ? await this.closeMobileMenu()
      : await this.openMobileMenu();

    this.updateButtonState(newState.isOpen);
    this.setButtonsDisabled(false);
  }

  private updateButtonState(isOpen: boolean): void {
    if (!this.hamburgerButton) return;

    const hamburgerIcon = this.hamburgerButton.querySelector(
      '[data-animation="hamburger-icon"]'
    );
    const closeIcon = this.hamburgerButton.querySelector(
      '[data-animation="close-icon"]'
    );

    if (hamburgerIcon && closeIcon) {
      if (isOpen) {
        hamburgerIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
      } else {
        hamburgerIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }

    this.hamburgerButton.setAttribute('aria-expanded', isOpen.toString());
  }

  private async openMobileMenu(): Promise<
    import('../animations/mobile-nav').MenuState
  > {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    return await this.mobileNavAnimation.openMenu();
  }

  private async closeMobileMenu(): Promise<
    import('../animations/mobile-nav').MenuState
  > {
    document.body.style.overflow = ''; // Restore scrolling
    return await this.mobileNavAnimation.closeMenu();
  }

  private async closeMobileMenuWithIconUpdate(): Promise<void> {
    this.setButtonsDisabled(true);
    const newState = await this.closeMobileMenu();
    this.updateButtonState(newState.isOpen);
    this.setButtonsDisabled(false);
  }

  private setButtonsDisabled(disabled: boolean): void {
    const hamburgerButton = this.querySelector(
      '[data-element="menu-toggle"]'
    ) as HTMLButtonElement;
    const closeButton = this.querySelector(
      '[data-element="close-button"]'
    ) as HTMLButtonElement;

    if (hamburgerButton) {
      hamburgerButton.disabled = disabled;
    }
    if (closeButton) {
      closeButton.disabled = disabled;
    }
  }

  private initializeMobileThemeToggle(): void {
    const mobileThemeToggle = this.querySelector(
      '[data-element="theme-toggle"]'
    );
    if (mobileThemeToggle) {
      // Sync with existing theme toggle functionality
      import('../functionality/toggle-theme').then(({ themeConfiguration }) => {
        // Re-run theme configuration to include the mobile button
        themeConfiguration();
      });
    }
  }
}

// Define the custom element
customElements.define('ojj-mobile-navigation', MobileNavigationComponent);
