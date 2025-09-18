import { getAssetUrl } from '../../utils/base-path';

class OJJFooter extends HTMLElement {
  private isInitialized = false;
  private form: HTMLFormElement | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.initializeForm();
      this.initializeNavigation();
      this.setCurrentYear();
      this.isInitialized = true;
    }
  }

  private render(): void {
    this.innerHTML = `
      <footer
        class="footer"
        role="contentinfo"
        aria-labelledby="site-footer-title"
      >
        <h2 id="site-footer-title" class="sr-only">
          Oregon Jiu Jitsu Lab — Site Footer
        </h2>

        <!-- Main Footer Content -->
        <div class="footer-main">
          <!-- Brand & Stay in Touch Section -->
          <div class="footer-brand">
            <a
              href="/"
              aria-label="Oregon Jiu Jitsu Lab home"
              class="footer-logo"
            >
              <img
                class="footer-logo-img block dark:hidden"
                src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab.svg')}"
                alt="Oregon Jiu Jitsu Lab"
              />
              <img
                class="footer-logo-img hidden dark:block"
                src="${getAssetUrl('/images/brand/oregon-jiu-jitsu-lab-light.svg')}"
                alt="Oregon Jiu Jitsu Lab"
              />
            </a>

            <div class="footer-stay-in-touch">
              <h3 class="footer-section-title">Stay in Touch</h3>
              <p class="footer-form-description">
                Get updates on classes, events, and martial arts tips.
              </p>

              <form class="footer-form" id="stay-in-touch-form">
                <div class="footer-form-group">
                  <label for="footer-email" class="sr-only">Email address</label>
                  <input
                    type="email"
                    id="footer-email"
                    name="email"
                    placeholder="Enter your email"
                    class="footer-form-input"
                    required
                  />
                  <button type="submit" class="footer-form-button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          <!-- Navigation Sections -->
          <div class="footer-nav">
            <!-- Get Started -->
            <div class="footer-section">
              <h3 class="footer-section-title">Get Started</h3>
              <nav aria-label="Get Started">
                <ul class="footer-nav-list">
                  <li>
                    <a
                      href="/try-a-class"
                      data-route="/try-a-class"
                      class="footer-nav-link"
                      >Try a Class</a
                    >
                  </li>
                  <li>
                    <a href="/join" data-route="/join" class="footer-nav-link"
                      >Join the Academy</a
                    >
                  </li>
                  <li>
                    <a href="/waiver" class="footer-nav-link">Sign Waiver</a>
                  </li>
                  <li>
                    <a href="/schedule" class="footer-nav-link">View Schedule</a>
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Programs -->
            <div class="footer-section">
              <h3 class="footer-section-title">Programs</h3>
              <nav aria-label="Programs">
                <ul class="footer-nav-list">
                  <li>
                    <a href="/programs/jiu-jitsu" class="footer-nav-link"
                      >Jiu Jitsu</a
                    >
                  </li>
                  <li>
                    <a href="/programs/wrestling" class="footer-nav-link"
                      >Wrestling</a
                    >
                  </li>
                  <li>
                    <a href="/programs/kickboxing" class="footer-nav-link"
                      >Kickboxing</a
                    >
                  </li>
                  <li>
                    <a href="/programs/competition-team" class="footer-nav-link"
                      >Competition Team</a
                    >
                  </li>
                </ul>
              </nav>
            </div>

            <!-- Company -->
            <div class="footer-section">
              <h3 class="footer-section-title">Company</h3>
              <nav aria-label="Company">
                <ul class="footer-nav-list">
                  <li><a href="/about" class="footer-nav-link">About Us</a></li>
                  <li><a href="/coaches" class="footer-nav-link">Coaches</a></li>
                  <li>
                    <a
                      href="/contact"
                      data-route="/contact"
                      class="footer-nav-link"
                      >Contact</a
                    >
                  </li>
                  <li><a href="/shop" class="footer-nav-link">Shop</a></li>
                </ul>
              </nav>
            </div>

            <!-- Contact Info -->
            <div class="footer-section">
              <h3 class="footer-section-title">Visit Us</h3>
              <address class="footer-address">
                <p class="footer-address-line">
                  3691 NE John Olsen Ave<br />
                  Hillsboro, OR 97124
                </p>
                <p class="footer-contact-info">
                  <a href="tel:+15033088455" class="footer-contact-link"
                    >+1 (503) 308-8455</a
                  ><br />
                  <a href="mailto:hello@ojjlab.com" class="footer-contact-link"
                    >hello@ojjlab.com</a
                  >
                </p>
              </address>
            </div>
          </div>
        </div>

        <!-- Footer Bottom -->
        <div class="footer-bottom">
          <!-- Social Links -->
          <div class="footer-social">
            <a
              href="https://www.instagram.com/ojjlab"
              target="_blank"
              rel="noopener"
              aria-label="Instagram"
              class="footer-social-link"
            >
              <svg
                class="footer-social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
              <span class="footer-social-text">Instagram</span>
            </a>
            <a
              href="https://www.youtube.com/@ojjlab"
              target="_blank"
              rel="noopener"
              aria-label="YouTube"
              class="footer-social-link"
            >
              <svg
                class="footer-social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                />
              </svg>
              <span class="footer-social-text">YouTube</span>
            </a>
            <a
              href="https://www.tiktok.com/@ojjlab"
              target="_blank"
              rel="noopener"
              aria-label="TikTok"
              class="footer-social-link"
            >
              <svg
                class="footer-social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"
                />
              </svg>
              <span class="footer-social-text">TikTok</span>
            </a>
            <a
              href="https://www.facebook.com/ojjlab"
              target="_blank"
              rel="noopener"
              aria-label="Facebook"
              class="footer-social-link"
            >
              <svg
                class="footer-social-icon"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <span class="footer-social-text">Facebook</span>
            </a>
          </div>

          <!-- Legal Info -->
          <div class="footer-legal">
            <p class="footer-copyright">
              © <span id="current-year">2025</span> Oregon Jiu Jitsu Lab. All
              rights reserved.
            </p>
            <div class="footer-legal-links">
              <a href="/legal/privacy" class="footer-legal-link"
                >Privacy Policy</a
              >
              <a href="/legal/terms" class="footer-legal-link"
                >Terms of Service</a
              >
              <a href="/accessibility" class="footer-legal-link">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }

  private initializeForm(): void {
    this.form = this.querySelector('#stay-in-touch-form');

    if (!this.form) return;

    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.handleFormSubmission();
    });
  }

  private handleFormSubmission(): void {
    if (!this.form) return;

    const formData = new FormData(this.form);
    const email = formData.get('email') as string;

    if (!email || !this.isValidEmail(email)) {
      this.showMessage('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate form submission
    this.showMessage('Thank you for subscribing!', 'success');
    this.form.reset();
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private showMessage(message: string, type: 'success' | 'error'): void {
    // Remove existing message
    const existingMessage = this.form?.querySelector('.footer-form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    // Create new message
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = `footer-form-message footer-form-message--${type}`;

    // Insert after form
    this.form?.insertAdjacentElement('afterend', messageElement);

    // Remove message after 5 seconds
    setTimeout(() => {
      messageElement.remove();
    }, 5000);
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

  private setCurrentYear(): void {
    const yearElement = this.querySelector('#current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear().toString();
    }
  }
}

customElements.define('ojj-footer', OJJFooter);

export default OJJFooter;
