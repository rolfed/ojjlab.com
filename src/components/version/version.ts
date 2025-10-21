import { getDisplayVersion, getDetailedVersion } from '../../utils/version';

/**
 * Version Component
 *
 * Displays the application version in the footer for debugging purposes.
 * Only visible when debug cookie is set to 'on'
 *
 * To enable: document.cookie = "debug=on; path=/";
 * To disable: document.cookie = "debug=off; path=/; max-age=0";
 */
export class VersionComponent extends HTMLElement {
  public connectedCallback(): void {
    // Only render if debug mode is enabled
    if (this.isDebugMode()) {
      this.innerHTML = this.getTemplate();
      this.initializeTooltip();
    }
  }

  /**
   * Check if debug mode is enabled via cookie
   */
  private isDebugMode(): boolean {
    const cookies = document.cookie.split(';');
    const debugCookie = cookies.find((cookie) =>
      cookie.trim().startsWith('debug=')
    );
    return debugCookie?.trim() === 'debug=on';
  }

  private getTemplate(): string {
    const displayVersion = getDisplayVersion();
    const detailedVersion = getDetailedVersion();

    return `<div class="version-badge" data-testid="version-badge"><span class="version-text" title="${detailedVersion}" data-testid="version-text" aria-label="Application version ${displayVersion}">${displayVersion}</span></div>`;
  }

  private initializeTooltip(): void {
    const versionText = this.querySelector('.version-text');
    if (!versionText) return;

    // Enhanced accessibility and interaction
    versionText.addEventListener('mouseenter', () => {
      versionText.setAttribute('aria-expanded', 'true');
    });

    versionText.addEventListener('mouseleave', () => {
      versionText.setAttribute('aria-expanded', 'false');
    });

    // Keyboard support
    versionText.addEventListener('keydown', (event: Event) => {
      const keyboardEvent = event as KeyboardEvent;
      if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
        keyboardEvent.preventDefault();
        const detailedVersion = getDetailedVersion();
        // Show detailed version in console for debugging
        console.log('Version Info:', detailedVersion);
      }
    });
  }
}

// Register the custom element
customElements.define('version-component', VersionComponent);
