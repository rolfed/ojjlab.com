import { MobileMenuAnimation } from './mobile-menu-animation';
import { gsap } from 'gsap';

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    timeline: jest.fn(() => {
      let onCompleteCallback: (() => void) | null = null;
      let onReverseCompleteCallback: (() => void) | null = null;
      let onStartCallback: (() => void) | null = null;
      let currentTimeScale = 1;

      return {
        to: jest.fn().mockReturnThis(),
        set: jest.fn().mockReturnThis(),
        fromTo: jest.fn().mockReturnThis(),
        add: jest.fn().mockReturnThis(),
        play: jest.fn(function (this: any) {
          if (onStartCallback) {
            setTimeout(() => onStartCallback!(), 0);
          }
          if (onCompleteCallback) {
            setTimeout(() => onCompleteCallback!(), 10);
          }
          return this;
        }),
        reverse: jest.fn(function (this: any) {
          if (onReverseCompleteCallback) {
            setTimeout(() => onReverseCompleteCallback!(), 10);
          }
          return this;
        }),
        eventCallback: jest.fn(function (
          this: any,
          event: string,
          callback: () => void
        ) {
          if (event === 'onComplete') {
            onCompleteCallback = callback;
          } else if (event === 'onReverseComplete') {
            onReverseCompleteCallback = callback;
          } else if (event === 'onStart') {
            onStartCallback = callback;
          }
          return this;
        }),
        timeScale: jest.fn(function (this: any, scale?: number) {
          if (scale !== undefined) {
            currentTimeScale = scale;
            return this;
          }
          return currentTimeScale;
        }),
        kill: jest.fn(),
        isActive: jest.fn(() => false),
      };
    }),
    set: jest.fn(),
  },
}));

describe('MobileMenuAnimation', () => {
  let animation: MobileMenuAnimation;
  let container: HTMLElement;

  beforeEach(() => {
    // Create DOM structure for mobile menu
    container = document.createElement('div');
    container.innerHTML = `
      <div class="mobile-bottom-nav">
        <div class="mobile-nav-logo">
          <svg class="hamburger-icon">
            <path class="hamburger-top" d="M3 6h18" />
            <path class="hamburger-middle" d="M3 12h18" />
            <path class="hamburger-bottom" d="M3 18h18" />
          </svg>
        </div>
      </div>
      <div class="mobile-fullscreen-menu">
        <div data-nav-level="main">
          <div data-animation="nav-item">Home</div>
          <div data-animation="nav-item">About</div>
        </div>
        <div data-nav-level="programs">
          <div data-animation="nav-item">Jiu Jitsu</div>
          <div data-animation="nav-item">Wrestling</div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    animation = new MobileMenuAnimation();
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with closed state', () => {
      const state = animation.getState();

      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
      expect(state.currentLevel).toBe('main');
      expect(state.isBottomNavVisible).toBe(false);
    });

    it('should throw error if required elements not found', () => {
      const emptyContainer = document.createElement('div');

      expect(() => {
        animation.init(emptyContainer);
      }).toThrow('Required mobile menu elements not found');
    });

    it('should successfully initialize with valid container', () => {
      expect(() => {
        animation.init(container);
      }).not.toThrow();
    });

    it('should set initial GSAP states on initialization', () => {
      animation.init(container);

      expect(gsap.set).toHaveBeenCalled();
    });
  });

  describe('state management', () => {
    beforeEach(() => {
      animation.init(container);
    });

    it('should return current state via getState()', () => {
      const state = animation.getState();

      expect(state).toHaveProperty('isOpen');
      expect(state).toHaveProperty('isAnimating');
      expect(state).toHaveProperty('currentLevel');
      expect(state).toHaveProperty('isBottomNavVisible');
    });

    it('should update state when menu opens', async () => {
      await animation.open();

      const state = animation.getState();
      expect(state.isOpen).toBe(true);
      expect(state.isAnimating).toBe(false);
    });

    it('should update state when menu closes', async () => {
      await animation.open();
      await animation.close();

      const state = animation.getState();
      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
    });
  });

  describe('unified open animation', () => {
    beforeEach(() => {
      animation.init(container);
    });

    it('should animate hamburger and menu together when opening', async () => {
      await animation.open();

      // Verify gsap.timeline was called
      expect(gsap.timeline).toHaveBeenCalled();

      const state = animation.getState();
      expect(state.isOpen).toBe(true);
      expect(state.isAnimating).toBe(false);
    });

    it('should not open if already open', async () => {
      await animation.open();
      jest.clearAllMocks();

      await animation.open();

      // Timeline should not be created again
      expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('should not open if currently animating', async () => {
      const openPromise = animation.open();
      const secondOpenPromise = animation.open();

      await Promise.all([openPromise, secondOpenPromise]);

      // Only one timeline should be created
      const timelineCalls = (gsap.timeline as jest.Mock).mock.calls.length;
      expect(timelineCalls).toBeLessThanOrEqual(1);
    });

    it('should set body overflow hidden when opening', async () => {
      await animation.open();

      expect(document.body.style.overflow).toBe('hidden');
    });
  });

  describe('unified close animation', () => {
    beforeEach(async () => {
      animation.init(container);
      await animation.open();
      jest.clearAllMocks();
    });

    it('should animate hamburger and menu together when closing', async () => {
      await animation.close();

      const state = animation.getState();
      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
    });

    it('should not close if already closed', async () => {
      await animation.close();
      jest.clearAllMocks();

      await animation.close();

      // No new timeline operations
      expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('should restore body overflow when closing', async () => {
      await animation.close();

      expect(document.body.style.overflow).toBe('');
    });

    it('should reset to main navigation level when closing', async () => {
      await animation.showProgramsSubmenu();
      await animation.close();

      const state = animation.getState();
      expect(state.currentLevel).toBe('main');
    });
  });

  describe('toggle functionality', () => {
    beforeEach(() => {
      animation.init(container);
    });

    it('should open menu when closed', async () => {
      await animation.toggle();

      const state = animation.getState();
      expect(state.isOpen).toBe(true);
    });

    it('should close menu when open', async () => {
      await animation.open();
      await animation.toggle();

      const state = animation.getState();
      expect(state.isOpen).toBe(false);
    });

    it('should toggle multiple times correctly', async () => {
      await animation.toggle(); // Open
      expect(animation.getState().isOpen).toBe(true);

      await animation.toggle(); // Close
      expect(animation.getState().isOpen).toBe(false);

      await animation.toggle(); // Open
      expect(animation.getState().isOpen).toBe(true);
    });
  });

  describe('programs submenu navigation', () => {
    beforeEach(async () => {
      animation.init(container);
      await animation.open();
    });

    it('should show programs submenu', async () => {
      await animation.showProgramsSubmenu();

      const state = animation.getState();
      expect(state.currentLevel).toBe('programs');
    });

    it('should not show programs if already on programs level', async () => {
      await animation.showProgramsSubmenu();
      jest.clearAllMocks();

      await animation.showProgramsSubmenu();

      expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('should show main navigation from programs', async () => {
      await animation.showProgramsSubmenu();
      await animation.showMainNavigation();

      const state = animation.getState();
      expect(state.currentLevel).toBe('main');
    });

    it('should not show main if already on main level', async () => {
      jest.clearAllMocks();

      await animation.showMainNavigation();

      expect(gsap.timeline).not.toHaveBeenCalled();
    });
  });

  describe('bottom nav visibility', () => {
    beforeEach(() => {
      animation.init(container);
    });

    it('should show bottom nav', () => {
      animation.showBottomNav();

      const state = animation.getState();
      expect(state.isBottomNavVisible).toBe(true);
    });

    it('should hide bottom nav', () => {
      animation.showBottomNav();
      animation.hideBottomNav();

      const state = animation.getState();
      expect(state.isBottomNavVisible).toBe(false);
    });
  });

  describe('cleanup', () => {
    beforeEach(() => {
      animation.init(container);
    });

    it('should cleanup animation resources', () => {
      expect(() => {
        animation.destroy();
      }).not.toThrow();
    });

    it('should reset state after cleanup', () => {
      animation.destroy();

      const state = animation.getState();
      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
      expect(state.currentLevel).toBe('main');
      expect(state.isBottomNavVisible).toBe(false);
    });

    it('should restore body overflow after cleanup', () => {
      document.body.style.overflow = 'hidden';

      animation.destroy();

      expect(document.body.style.overflow).toBe('');
    });
  });
});
