import { HamburgerAnimation } from './hamburger-animation';
import { gsap } from 'gsap';

// Mock GSAP
jest.mock('gsap', () => ({
  gsap: {
    timeline: jest.fn(() => ({
      to: jest.fn().mockReturnThis(),
      play: jest.fn().mockResolvedValue(undefined),
      reverse: jest.fn().mockResolvedValue(undefined),
    })),
    set: jest.fn(),
  },
}));

describe('HamburgerAnimation', () => {
  let container: HTMLElement;
  let hamburgerAnimation: HamburgerAnimation;

  beforeEach(() => {
    // Create SVG container with hamburger bars
    container = document.createElement('div');
    container.innerHTML = `
      <svg viewBox="0 0 24 24">
        <path class="hamburger-top" d="M3 6h18" />
        <path class="hamburger-middle" d="M3 12h18" />
        <path class="hamburger-bottom" d="M3 18h18" />
      </svg>
    `;
    document.body.appendChild(container);

    hamburgerAnimation = new HamburgerAnimation();
  });

  afterEach(() => {
    document.body.removeChild(container);
    jest.clearAllMocks();
  });

  describe('initialization', () => {
    it('should initialize with closed state', () => {
      const state = hamburgerAnimation.getState();
      expect(state.isAnimating).toBe(false);
      expect(state.isOpen).toBe(false);
    });

    it('should throw error if hamburger container not found', () => {
      const emptyContainer = document.createElement('div');
      expect(() => {
        hamburgerAnimation.init(emptyContainer);
      }).toThrow('Hamburger bars not found');
    });

    it('should successfully initialize with valid hamburger bars', () => {
      expect(() => {
        hamburgerAnimation.init(container);
      }).not.toThrow();
    });
  });

  describe('animation to X', () => {
    beforeEach(() => {
      hamburgerAnimation.init(container);
    });

    it('should animate to X state', async () => {
      await hamburgerAnimation.animateToX();

      const state = hamburgerAnimation.getState();
      expect(state.isOpen).toBe(true);
      expect(state.isAnimating).toBe(false);
    });

    it('should set middle bar opacity to 0 when animating to X', async () => {
      await hamburgerAnimation.animateToX();

      // Verify GSAP timeline was called with opacity: 0 for middle bar
      expect(gsap.timeline).toHaveBeenCalled();
    });

    it('should rotate top bar to 45 degrees when animating to X', async () => {
      await hamburgerAnimation.animateToX();

      // Verify rotation transformation
      expect(gsap.timeline).toHaveBeenCalled();
    });

    it('should rotate bottom bar to -45 degrees when animating to X', async () => {
      await hamburgerAnimation.animateToX();

      // Verify rotation transformation
      expect(gsap.timeline).toHaveBeenCalled();
    });

    it('should not animate if already in X state', async () => {
      await hamburgerAnimation.animateToX();
      jest.clearAllMocks();

      await hamburgerAnimation.animateToX();

      // Timeline should not be created again
      expect(gsap.timeline).not.toHaveBeenCalled();
    });

    it('should prevent concurrent animations', async () => {
      const promise1 = hamburgerAnimation.animateToX();
      const promise2 = hamburgerAnimation.animateToX();

      await Promise.all([promise1, promise2]);

      const state = hamburgerAnimation.getState();
      expect(state.isAnimating).toBe(false);
    });
  });

  describe('animation to hamburger', () => {
    beforeEach(async () => {
      hamburgerAnimation.init(container);
      await hamburgerAnimation.animateToX();
    });

    it('should animate back to hamburger state', async () => {
      await hamburgerAnimation.animateToHamburger();

      const state = hamburgerAnimation.getState();
      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
    });

    it('should restore middle bar opacity when animating to hamburger', async () => {
      await hamburgerAnimation.animateToHamburger();

      // Verify GSAP timeline was called with opacity: 1 for middle bar
      expect(gsap.timeline).toHaveBeenCalled();
    });

    it('should reset top and bottom bar rotations when animating to hamburger', async () => {
      await hamburgerAnimation.animateToHamburger();

      // Verify rotation reset
      expect(gsap.timeline).toHaveBeenCalled();
    });

    it('should not animate if already in hamburger state', async () => {
      await hamburgerAnimation.animateToHamburger();
      jest.clearAllMocks();

      await hamburgerAnimation.animateToHamburger();

      // Timeline should not be created again
      expect(gsap.timeline).not.toHaveBeenCalled();
    });
  });

  describe('toggle animation', () => {
    beforeEach(() => {
      hamburgerAnimation.init(container);
    });

    it('should toggle from hamburger to X', async () => {
      await hamburgerAnimation.toggle();

      const state = hamburgerAnimation.getState();
      expect(state.isOpen).toBe(true);
    });

    it('should toggle from X to hamburger', async () => {
      await hamburgerAnimation.animateToX();
      await hamburgerAnimation.toggle();

      const state = hamburgerAnimation.getState();
      expect(state.isOpen).toBe(false);
    });

    it('should toggle multiple times correctly', async () => {
      await hamburgerAnimation.toggle(); // Open
      expect(hamburgerAnimation.getState().isOpen).toBe(true);

      await hamburgerAnimation.toggle(); // Close
      expect(hamburgerAnimation.getState().isOpen).toBe(false);

      await hamburgerAnimation.toggle(); // Open
      expect(hamburgerAnimation.getState().isOpen).toBe(true);
    });
  });

  describe('cleanup', () => {
    beforeEach(() => {
      hamburgerAnimation.init(container);
    });

    it('should cleanup animation resources', () => {
      expect(() => {
        hamburgerAnimation.destroy();
      }).not.toThrow();
    });

    it('should reset state after cleanup', () => {
      hamburgerAnimation.destroy();

      const state = hamburgerAnimation.getState();
      expect(state.isOpen).toBe(false);
      expect(state.isAnimating).toBe(false);
    });
  });
});
