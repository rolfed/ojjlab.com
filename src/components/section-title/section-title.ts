class OJJSectionTitle extends HTMLElement {
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
    const title = this.getAttribute('title') || '';
    const subtitle = this.getAttribute('subtitle') || '';
    const alignment = this.getAttribute('align') || 'center';

    this.innerHTML = `
      <header class="section-title-header section-title-${alignment}">
        <h2 class="section-title">${title}</h2>
        ${subtitle ? `<p class="section-subtitle">${subtitle}</p>` : ''}
      </header>
    `;
  }

  static get observedAttributes() {
    return ['title', 'subtitle', 'align'];
  }

  attributeChangedCallback() {
    if (this.isInitialized) {
      this.render();
    }
  }
}

customElements.define('ojj-section-title', OJJSectionTitle);

export default OJJSectionTitle;
