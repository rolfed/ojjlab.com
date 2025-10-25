import { getAssetUrl } from '../../utils/base-path';
import { gsap } from 'gsap';

export class NavigationComponent extends HTMLElement {
  private phoneMenuOpen = false;

  public connectedCallback(): void {
    this.innerHTML = this.getTemplate();
    this.initializeThemeToggle();
    this.initializeNavigation();
    this.initializePhoneButton();
  }

  private getTemplate(): string {
    return `
            <!-- Mobile Portrait Top Bar -->
            <div class="mobile-portrait-top-bar">
              <!-- Phone Button -->
              <button
                type="button"
                class="mobile-top-bar-btn"
                aria-label="Contact us by phone"
                aria-expanded="false"
                data-testid="mobile-phone-button"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call/Text</span>
              </button>

              <!-- Schedule Trial Button -->
              <a
                href="#/try-a-class"
                data-route="/try-a-class"
                class="mobile-top-bar-btn mobile-top-bar-schedule"
                data-testid="mobile-schedule-button"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Schedule Trial</span>
              </a>

              <!-- Theme Toggle -->
              <button
                class="mobile-top-bar-btn"
                id="mobile-portrait-theme-toggle"
                type="button"
                aria-pressed="false"
                aria-label="Toggle color scheme"
                title="Toggle color scheme"
                data-testid="mobile-portrait-theme-toggle"
                data-theme-toggle
              >
                <span data-theme-label class="sr-only">Toggle Theme</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fill-rule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>

              <!-- Phone Action Menu (dropdown) -->
              <div class="mobile-phone-menu" role="menu" data-testid="mobile-phone-menu" style="display: none;">
                <a href="tel:+15033088455" class="phone-menu-option" role="menuitem" data-testid="phone-menu-call">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Call</span>
                </a>
                <a href="sms:+15033088455" class="phone-menu-option" role="menuitem" data-testid="phone-menu-text">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                  <span>Text</span>
                </a>
              </div>
            </div>

            <nav class="hero-nav" data-testid="desktop-navigation">
                <!-- Logo -->
                <a
                    href="#/"
                    data-route="/"
                    class="flex items-center cursor-pointer"
                    data-testid="desktop-logo-container"
                    aria-label="Go to home page"
                >
                    <img
                        class="block dark:hidden h-8 w-auto"
                        src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab.svg')}"
                        alt="Oregon Jiu Jitsu Lab"
                        data-testid="desktop-logo-light"
                    />
                    <img
                        class="hidden dark:block h-8 w-auto"
                        src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab-light.svg')}"
                        alt="Oregon Jiu Jitsu Lab"
                        data-testid="desktop-logo-dark"
                    />
                </a>

                <!-- Desktop navigation -->
                <nav class="hero-menu" id="hero-menu" aria-label="Main navigation" data-testid="desktop-nav-menu">
                    <ul data-testid="desktop-nav-list">
                        <li><a href="#about" data-testid="nav-about">About Us</a></li>
                        <li><a href="#programs" data-testid="nav-programs">Programs</a></li>
                        <li><a href="#coaches" data-testid="nav-coaches">Coaches</a></li>
                        <li><a href="#schedule" data-testid="nav-schedule">Schedule</a></li>
                        <li><a href="/contact" data-route="/contact" data-testid="nav-contact">Contact</a></li>
                        <li><a href="/shop" data-testid="nav-shop">Shop</a></li>
                        <li><a href="/join" data-route="/join" data-testid="nav-join">Join</a></li>
                        <li><a href="/login" data-route="/login" data-testid="nav-login">Login</a></li>
                    </ul>
                </nav>

                <!-- Theme toggle -->
                <div class="flex items-center gap-4" data-testid="desktop-controls-container">
                    <!-- Theme Toggle -->
                    <button
                        class="theme-toggle"
                        id="theme-toggle"
                        type="button"
                        aria-pressed="false"
                        aria-label="Toggle color scheme"
                        title="Toggle color scheme"
                        data-testid="desktop-theme-toggle"
                        data-theme-toggle
                    >
                        <span data-theme-label class="sr-only">Toggle Theme</span>
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                fill-rule="evenodd"
                                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                                clip-rule="evenodd"
                            ></path>
                        </svg>
                    </button>
                </div>
            </nav>
        `;
  }

  private initializeThemeToggle(): void {
    import('../../functionality/toggle-theme').then(
      ({ themeConfiguration }) => {
        themeConfiguration();
      }
    );
  }

  private initializeNavigation(): void {
    const routeLinks = this.querySelectorAll('[data-route]');
    routeLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = (e.currentTarget as HTMLElement).getAttribute(
          'data-route'
        );
        if (!route || !window.router) return;

        window.router.navigate(route);
      });
    });
  }

  private initializePhoneButton(): void {
    const phoneButton = this.querySelector(
      '[data-testid="mobile-phone-button"]'
    ) as HTMLButtonElement;
    const phoneMenu = this.querySelector(
      '[data-testid="mobile-phone-menu"]'
    ) as HTMLElement;

    if (!phoneButton || !phoneMenu) return;

    const menuOptions = phoneMenu.querySelectorAll('.phone-menu-option');

    // Set initial state - menu hidden
    gsap.set(phoneMenu, { display: 'none', opacity: 0, y: -10 });
    gsap.set(menuOptions, { opacity: 0, x: -20 });

    const openMenu = () => {
      this.phoneMenuOpen = true;
      phoneButton.setAttribute('aria-expanded', 'true');

      const tl = gsap.timeline();

      tl.set(phoneMenu, { display: 'flex' })
        .to(phoneMenu, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        })
        .to(
          menuOptions,
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out',
          },
          '-=0.2'
        );
    };

    const closeMenu = () => {
      this.phoneMenuOpen = false;
      phoneButton.setAttribute('aria-expanded', 'false');

      const tl = gsap.timeline();

      tl.to(menuOptions, {
        opacity: 0,
        x: -20,
        duration: 0.2,
        stagger: 0.05,
        ease: 'power2.in',
      })
        .to(
          phoneMenu,
          {
            opacity: 0,
            y: -10,
            duration: 0.2,
            ease: 'power2.in',
          },
          '-=0.1'
        )
        .set(phoneMenu, { display: 'none' });
    };

    // Toggle phone menu
    phoneButton.addEventListener('click', (e) => {
      e.stopPropagation();

      if (this.phoneMenuOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    // Close menu when clicking Call or Text options
    menuOptions.forEach((option) => {
      option.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (
        this.phoneMenuOpen &&
        !phoneMenu.contains(e.target as Node) &&
        e.target !== phoneButton
      ) {
        closeMenu();
      }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.phoneMenuOpen) {
        closeMenu();
        phoneButton.focus();
      }
    });
  }
}

// Define the custom element
customElements.define('ojj-navigation', NavigationComponent);

export default NavigationComponent;
