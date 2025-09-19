class OJJPage extends HTMLElement {
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.validateSlots();
      this.isInitialized = true;
    }
  }

  private render(): void {
    // Get layout type from attribute (default: 'centered')
    const layout = this.getAttribute('layout') || 'centered';

    this.innerHTML = `
      <div class="page-wrapper">
        <!-- Navigation Component -->
        <ojj-navigation></ojj-navigation>

        <!-- Page Content -->
        <main class="page-main page-layout-${layout}" id="main-content">
          <!-- Page Header -->
          <header class="page-header">
            <ojj-section-title id="page-section-title"></ojj-section-title>
          </header>

          <!-- Main Content -->
          <div class="page-content">
            <slot name="content"></slot>
          </div>
        </main>

        <!-- Footer Component -->
        <ojj-footer></ojj-footer>

        <!-- Mobile Navigation Component -->
        <ojj-mobile-navigation></ojj-mobile-navigation>
      </div>
    `;
  }

  private validateSlots(): void {
    // Check for required title slot and update section-title component
    const titleSlot = this.querySelector('[slot="title"]');
    const subtitleSlot = this.querySelector('[slot="subtitle"]');
    const sectionTitle = this.querySelector('#page-section-title') as HTMLElement;

    if (titleSlot && sectionTitle) {
      const titleText = titleSlot.textContent?.trim() || '';
      const subtitleText = subtitleSlot?.textContent?.trim() || '';

      sectionTitle.setAttribute('title', titleText);
      if (subtitleText) {
        sectionTitle.setAttribute('subtitle', subtitleText);
      }
    } else if (!titleSlot) {
      console.warn('OJJPage: Missing required "title" slot');
      this.addDefaultTitle();
    }

    // Check for content slot
    const contentSlot = this.querySelector('[slot="content"]');
    if (!contentSlot) {
      console.warn('OJJPage: Missing "content" slot - page will appear empty');
    }
  }

  private addDefaultTitle(): void {
    const sectionTitle = this.querySelector('#page-section-title') as HTMLElement;
    if (sectionTitle) {
      sectionTitle.setAttribute('title', 'Page Title');
    }
  }

  // Utility method to set page title (for SEO)
  public setPageTitle(title: string): void {
    document.title = `${title} - Oregon Jiu Jitsu Lab`;
  }

  // Utility method to get layout type
  public getLayout(): string {
    return this.getAttribute('layout') || 'centered';
  }

  // Method to update layout dynamically
  public setLayout(layout: string): void {
    this.setAttribute('layout', layout);
    const mainElement = this.querySelector('.page-main');
    if (mainElement) {
      // Remove old layout classes
      mainElement.className = mainElement.className.replace(/page-layout-\w+/g, '');
      // Add new layout class
      mainElement.classList.add(`page-layout-${layout}`);
    }
  }
}

customElements.define('ojj-page', OJJPage);

export default OJJPage;