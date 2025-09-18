import { getAssetUrl } from '../../utils/base-path';

class OJJHero extends HTMLElement {
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.initializeHeroInteractions();
      this.isInitialized = true;
    }
  }

  private render(): void {
    this.innerHTML = `
      <!-- SITE HEADER -->
      <header>
        <ojj-navigation></ojj-navigation>
      </header>

      <!-- HERO SECTION -->
      <section class="hero border-b">
        <img
          class="hero-overlay"
          alt="Oregon Jiu Jitsu Lab training facility with students practicing martial arts"
          src="${getAssetUrl('/images/hero/hero.jpeg')}"
        />

        <div class="hero-overlay-content"></div>

        <div class="hero-content">
          <h1 class="title">
            <div data-animation="hero-title-1">American Jiu Jitsu</div>
            <div data-animation="hero-title-2">Wrestling</div>
            <div data-animation="hero-title-3">Kickboxing</div>
          </h1>

          <p data-animation="hero-subtitle">
            <span>Strength for kids.</span>
            <span>Confidence for adults.</span>
            <span>Community for everyone.</span>
          </p>

          <div class="flex flex-row my-8 w-full justify-end" data-animation="hero-cta">
            <a class="primary-btn mr-2" href="/join" data-route="/join">Join Today</a>
            <a class="secondary-btn" href="/schedule">View Schedule</a>
          </div>
        </div>
      </section>
    `;
  }

  private initializeHeroInteractions(): void {
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

customElements.define('ojj-hero', OJJHero);

export default OJJHero;
