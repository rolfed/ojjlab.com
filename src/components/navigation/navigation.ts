import { getAssetUrl } from '../../utils/base-path';

export class NavigationComponent extends HTMLElement {
  public connectedCallback(): void {
    this.innerHTML = this.getTemplate();
    this.initializeThemeToggle();
    this.initializeNavigation();
  }

  private getTemplate(): string {
    return `
            <nav class="hero-nav">
                <!-- Logo -->
                <div class="flex items-center">
                    <img
                        class="block dark:hidden h-8 w-auto"
                        src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab.svg')}"
                        alt="Oregon Jiu Jitsu Lab"
                    />
                    <img
                        class="hidden dark:block h-8 w-auto"
                        src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab-light.svg')}"
                        alt="Oregon Jiu Jitsu Lab"
                    />
                </div>

                <!-- Desktop navigation -->
                <nav class="hero-menu" id="hero-menu" aria-label="Main navigation">
                    <ul>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#programs">Programs</a></li>
                        <li><a href="#coaches">Coaches</a></li>
                        <li><a href="#schedule">Schedule</a></li>
                        <li><a href="/contact" data-route="/contact">Contact</a></li>
                        <li><a href="/shop">Shop</a></li>
                        <li><a href="/join" data-route="/join">Join</a></li>
                        <li><a href="/login" data-route="/login">Login</a></li>
                    </ul>
                </nav>

                <!-- Theme toggle -->
                <div class="flex items-center">
                    <button
                        class="theme-toggle"
                        id="theme-toggle"
                        type="button"
                        aria-pressed="false"
                        aria-label="Toggle color scheme"
                        title="Toggle color scheme"
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
        const route = (e.target as HTMLElement).getAttribute('data-route');
        if (route && window.router) {
          window.router.navigate(route);
        }
      });
    });
  }
}

// Define the custom element
customElements.define('ojj-navigation', NavigationComponent);

export default NavigationComponent;
