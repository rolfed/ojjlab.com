class OJJSection extends HTMLElement {
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
    const fullHeight = this.getAttribute('full-height') === 'true';
    const id = this.getAttribute('id') || '';

    const sectionClass = fullHeight ? 'ojj-section ojj-section-full-height' : 'ojj-section';

    // Clear existing content but preserve any slotted elements
    const existingSlottedContent = this.querySelector('[slot="content"]');

    // Create the section structure
    const section = document.createElement('section');
    section.className = sectionClass;
    if (id) {
      section.id = id;
    }

    // Add title if provided
    if (title) {
      const sectionTitle = document.createElement('ojj-section-title');
      sectionTitle.setAttribute('title', title);
      if (subtitle) {
        sectionTitle.setAttribute('subtitle', subtitle);
      }
      if (alignment !== 'center') {
        sectionTitle.setAttribute('align', alignment);
      }
      section.appendChild(sectionTitle);
    }

    // Create content container with slot
    const contentDiv = document.createElement('div');
    contentDiv.className = 'ojj-section-content';

    const slot = document.createElement('slot');
    slot.setAttribute('name', 'content');
    contentDiv.appendChild(slot);

    section.appendChild(contentDiv);

    // Clear and append the new structure
    this.innerHTML = '';
    this.appendChild(section);

    // If there was existing slotted content, re-append it
    if (existingSlottedContent) {
      this.appendChild(existingSlottedContent);
    }
  }

  static get observedAttributes() {
    return ['title', 'subtitle', 'align', 'full-height', 'id'];
  }

  attributeChangedCallback() {
    if (this.isInitialized) {
      this.render();
    }
  }
}

customElements.define('ojj-section', OJJSection);

export default OJJSection;