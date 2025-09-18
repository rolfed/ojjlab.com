class OJJLocation extends HTMLElement {
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.initializeInteractions();
      this.isInitialized = true;
    }
  }

  private render(): void {
    this.innerHTML = `
      <section class="section" id="location">
        <header class="location-header">
          <h2 class="location-title">Visit Us</h2>
          <p class="location-subtitle">
            Find us in Hillsboro, Oregon.
          </p>
        </header>

        <!-- Google Map -->
        <div class="location-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2789.862742614284!2d-122.947397!3d45.5546891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549509c8a7c7e307%3A0x9c4c4c4c4c4c4c4c!2s3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
            width="100%"
            height="400"
            style="border:0;"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            title="Oregon Jiu Jitsu Lab Location"
            class="location-map">
          </iframe>
        </div>

        <!-- Address and Hours -->
        <div class="location-info">
          <div class="location-address-container">
            <h3 class="location-info-title">Address</h3>
            <a
              href="https://maps.apple.com/?address=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124"
              class="location-address"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open address in maps app"
              data-action="address-link">
              3691 NE John Olsen Ave<br>
              Hillsboro, OR 97124
            </a>

            <!-- Get Directions Button -->
            <button class="location-directions-btn" data-action="directions-btn">
              Get Directions
            </button>

            <!-- Phone Number -->
            <div class="location-phone-container">
              <span class="location-phone">(503) 555-0123</span>
              <div class="location-phone-actions">
                <a href="tel:+15035550123" class="location-phone-btn call-btn">
                  Call Us
                </a>
                <a href="sms:+15035550123" class="location-phone-btn text-btn">
                  Text Us
                </a>
              </div>
            </div>
          </div>

          <div class="location-hours-container">
            <h3 class="location-info-title">Hours</h3>
            <div class="location-hours">
              <div class="location-hours-row">
                <span class="location-day">Monday</span>
                <span class="location-time">5:15 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Tuesday</span>
                <span class="location-time">5:15 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Wednesday</span>
                <span class="location-time">5:15 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Thursday</span>
                <span class="location-time">5:15 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Friday</span>
                <span class="location-time">5:15 PM - 8:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Saturday</span>
                <span class="location-time">11:00 AM - 1:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Sunday</span>
                <span class="location-time">11:00 AM - 1:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private getUserAgent() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isIOS = /iphone|ipad|ipod/.test(userAgent);
    const isAndroid = /android/.test(userAgent);

    if (isIOS) return 'ios';
    if (isAndroid) return 'android';
    return 'desktop';
  }

  private getNavigationStrategy() {
    const strategies = new Map([
      [
        'ios',
        {
          address:
            'maps://maps.apple.com/?address=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          directions:
            'maps://maps.apple.com/?daddr=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          target: '_system',
        },
      ],
      [
        'android',
        {
          address:
            'geo:45.5546891,-122.947397?q=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          directions:
            'google.navigation:q=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          target: '_system',
        },
      ],
      [
        'desktop',
        {
          address:
            'https://maps.apple.com/?address=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          directions:
            'https://www.google.com/maps/dir/?api=1&destination=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
          target: '_blank',
        },
      ],
    ]);

    return strategies.get(this.getUserAgent());
  }

  private initializeInteractions(): void {
    const addressLink = this.querySelector(
      '[data-action="address-link"]'
    ) as HTMLAnchorElement;

    if (addressLink) {
      addressLink.addEventListener('click', (e: Event) => {
        const platform = this.getUserAgent();

        if (platform !== 'desktop') {
          e.preventDefault();
          const strategy = this.getNavigationStrategy();
          if (strategy) {
            window.open(strategy.address, strategy.target);
          }
        }
      });
    }

    // Get Directions button functionality
    const directionsBtn = this.querySelector(
      '[data-action="directions-btn"]'
    ) as HTMLButtonElement;

    if (directionsBtn) {
      directionsBtn.addEventListener('click', () => {
        const strategy = this.getNavigationStrategy();
        if (strategy) {
          window.open(strategy.directions, strategy.target);
        }
      });
    }
  }
}

customElements.define('ojj-location', OJJLocation);

export default OJJLocation;
