import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { Timeline } from '../model/gsap';

gsap.registerPlugin(ScrollTrigger);

class OJJLocation extends HTMLElement {
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.initializeInteractions();
      this.animateElements();
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
              aria-label="Open address in maps app">
              3691 NE John Olsen Ave<br>
              Hillsboro, OR 97124
            </a>

            <!-- Get Directions Button -->
            <button class="location-directions-btn" id="get-directions-btn">
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
                <span class="location-time">5:00 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Tuesday</span>
                <span class="location-time">5:00 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Wednesday</span>
                <span class="location-time">5:00 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Thursday</span>
                <span class="location-time">5:00 PM - 9:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Friday</span>
                <span class="location-time">5:00 PM - 8:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Saturday</span>
                <span class="location-time">9:00 AM - 12:00 PM</span>
              </div>
              <div class="location-hours-row">
                <span class="location-day">Sunday</span>
                <span class="location-time">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private initializeInteractions(): void {
    const addressLink = this.querySelector(
      '.location-address'
    ) as HTMLAnchorElement;

    if (addressLink) {
      addressLink.addEventListener('click', (e: Event) => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        if (isIOS || isAndroid) {
          e.preventDefault();

          if (isIOS) {
            window.open(
              'maps://maps.apple.com/?address=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
              '_system'
            );
          } else if (isAndroid) {
            window.open(
              'geo:45.5546891,-122.947397?q=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
              '_system'
            );
          }
        }
      });
    }

    // Get Directions button functionality
    const directionsBtn = this.querySelector('#get-directions-btn') as HTMLButtonElement;

    if (directionsBtn) {
      directionsBtn.addEventListener('click', () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        if (isIOS) {
          // iOS - Use Apple Maps
          window.open(
            'maps://maps.apple.com/?daddr=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
            '_system'
          );
        } else if (isAndroid) {
          // Android - Use Google Maps
          window.open(
            'google.navigation:q=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
            '_system'
          );
        } else {
          // Desktop/other - Use Google Maps web
          window.open(
            'https://www.google.com/maps/dir/?api=1&destination=3691%20NE%20John%20Olsen%20Ave%2C%20Hillsboro%2C%20OR%2097124',
            '_blank'
          );
        }
      });
    }
  }

  private animateElements(): void {
    const header = this.querySelector('.location-header');
    const mapContainer = this.querySelector('.location-map-container');
    const infoContainer = this.querySelector('.location-info');

    gsap.set([header, mapContainer, infoContainer], {
      opacity: 0,
      y: 30,
    });

    const tl: Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: 'top 80%',
        once: true,
      },
    });

    tl.to(header, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
    })
      .to(
        mapContainer,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .to(
        infoContainer,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      );
  }
}

customElements.define('ojj-location', OJJLocation);

export default OJJLocation;
