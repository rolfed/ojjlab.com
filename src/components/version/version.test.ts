import { VersionComponent } from './version';

describe('VersionComponent', () => {
  let component: VersionComponent;

  beforeEach(() => {
    // Clear all cookies before each test
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.split('=')[0].trim();
      document.cookie = `${name}=; path=/; max-age=0`;
    });

    // Create a fresh component instance
    component = new VersionComponent();
    document.body.appendChild(component);
  });

  afterEach(() => {
    // Clean up
    document.body.removeChild(component);
  });

  describe('Debug Mode Detection', () => {
    it('should not render when debug cookie is not set', () => {
      component.connectedCallback();
      expect(component.innerHTML).toBe('');
    });

    it('should not render when debug cookie is set to "off"', () => {
      document.cookie = 'debug=off; path=/';
      component.connectedCallback();
      expect(component.innerHTML).toBe('');
    });

    it('should render when debug cookie is set to "on"', () => {
      document.cookie = 'debug=on; path=/';
      component.connectedCallback();
      expect(component.innerHTML).not.toBe('');
      expect(component.querySelector('.version-badge')).not.toBeNull();
    });

    it('should handle multiple cookies correctly', () => {
      document.cookie = 'other=value; path=/';
      document.cookie = 'debug=on; path=/';
      document.cookie = 'another=test; path=/';
      component.connectedCallback();
      expect(component.innerHTML).not.toBe('');
    });
  });

  describe('Version Display', () => {
    beforeEach(() => {
      document.cookie = 'debug=on; path=/';
    });

    it('should display version badge when debug is enabled', () => {
      component.connectedCallback();
      const badge = component.querySelector('.version-badge');
      expect(badge).not.toBeNull();
    });

    it('should display version text', () => {
      component.connectedCallback();
      const versionText = component.querySelector('.version-text');
      expect(versionText).not.toBeNull();
      expect(versionText?.textContent).toMatch(/v\d+\.\d+\.\d+/);
    });

    it('should have proper ARIA attributes', () => {
      component.connectedCallback();
      const versionText = component.querySelector('.version-text');
      expect(versionText?.getAttribute('aria-label')).toContain(
        'Application version'
      );
    });

    it('should have data-testid attribute', () => {
      component.connectedCallback();
      const badge = component.querySelector('[data-testid="version-badge"]');
      expect(badge).not.toBeNull();
    });
  });

  describe('Tooltip Interaction', () => {
    beforeEach(() => {
      document.cookie = 'debug=on; path=/';
      component.connectedCallback();
    });

    it('should update aria-expanded on mouseenter', () => {
      const versionText = component.querySelector('.version-text');
      expect(versionText).not.toBeNull();

      const mouseEnterEvent = new MouseEvent('mouseenter');
      versionText?.dispatchEvent(mouseEnterEvent);

      expect(versionText?.getAttribute('aria-expanded')).toBe('true');
    });

    it('should update aria-expanded on mouseleave', () => {
      const versionText = component.querySelector('.version-text');
      expect(versionText).not.toBeNull();

      // First trigger mouseenter
      versionText?.dispatchEvent(new MouseEvent('mouseenter'));
      expect(versionText?.getAttribute('aria-expanded')).toBe('true');

      // Then trigger mouseleave
      versionText?.dispatchEvent(new MouseEvent('mouseleave'));
      expect(versionText?.getAttribute('aria-expanded')).toBe('false');
    });

    it('should log version info on Enter key press', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const versionText = component.querySelector('.version-text');

      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      versionText?.dispatchEvent(enterEvent);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Version Info:',
        expect.any(String)
      );

      consoleSpy.mockRestore();
    });

    it('should log version info on Space key press', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      const versionText = component.querySelector('.version-text');

      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      versionText?.dispatchEvent(spaceEvent);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Version Info:',
        expect.any(String)
      );

      consoleSpy.mockRestore();
    });
  });

  describe('Custom Element Registration', () => {
    it('should be registered as a custom element', () => {
      expect(customElements.get('version-component')).toBeDefined();
    });

    it('should create instance via document.createElement', () => {
      const element = document.createElement('version-component');
      expect(element).toBeInstanceOf(VersionComponent);
    });
  });
});
