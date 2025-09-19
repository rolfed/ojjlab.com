class OJJCoach extends HTMLElement {
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.isInitialized = true;
    }
  }

  private render(): void {
    const name = this.getAttribute('name') || '';
    const title = this.getAttribute('title') || '';
    const image = this.getAttribute('image') || '';
    const description = this.getAttribute('description') || '';

    // Generate unique pattern ID from name
    const patternId = `${name.toLowerCase().replace(/\s+/g, '-')}-pattern`;

    this.innerHTML = `
      <div class="coach-card">
        <svg
          class="coach-svg"
          viewBox="0 0 200 300"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="${patternId}"
              patternUnits="objectBoundingBox"
              width="1"
              height="1"
            >
              <image
                href="${image}"
                x="0"
                y="0"
                width="120"
                height="120"
                preserveAspectRatio="xMidYMid slice"
              />
            </pattern>
          </defs>
          <!-- Outer border circle -->
          <circle
            cx="100"
            cy="70"
            r="62"
            fill="none"
            class="coach-circle-border"
            stroke-width="4"
          />
          <!-- Inner circle with background image -->
          <circle cx="100" cy="70" r="58" fill="url(#${patternId})" />
          <!-- Name text -->
          <text x="100" y="160" text-anchor="middle" class="coach-name-text">
            ${name}
          </text>
          <!-- Title text -->
          <text x="100" y="180" text-anchor="middle" class="coach-title-text">
            ${title}
          </text>
        </svg>
        ${
          description
            ? `
          <div class="coach-description">
            <p>${description}</p>
          </div>
        `
            : ''
        }
      </div>
    `;
  }

  static get observedAttributes() {
    return ['name', 'title', 'image', 'description'];
  }

  attributeChangedCallback() {
    if (this.isInitialized) {
      this.render();
    }
  }
}

customElements.define('ojj-coach', OJJCoach);

export default OJJCoach;
