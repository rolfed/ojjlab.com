import { gsap } from 'gsap';

/**
 * State of the mobile menu
 */
export interface MenuState {
  isOpen: boolean;
  isAnimating: boolean;
  currentLevel: 'main' | 'programs';
  isBottomNavVisible: boolean;
}

/**
 * Animation options
 */
export interface MobileMenuAnimationOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
}

/**
 * Unified mobile menu animation
 *
 * Combines hamburger icon animation and fullscreen menu animation
 * into a single, synchronized timeline to eliminate timing issues.
 *
 * @example
 * ```typescript
 * const menuAnimation = new MobileMenuAnimation();
 * menuAnimation.init(containerElement);
 * await menuAnimation.toggle();
 * ```
 */
export class MobileMenuAnimation {
  // DOM elements
  private bottomNav: HTMLElement | null = null;
  private bottomNavLogo: HTMLElement | null = null;
  private fullscreenMenu: HTMLElement | null = null;
  private menuLogo: HTMLElement | null = null;
  private hamburgerTop: SVGElement | null = null;
  private hamburgerMiddle: SVGElement | null = null;
  private hamburgerBottom: SVGElement | null = null;
  private mainNavItems: HTMLElement[] = [];
  private programsNavItems: HTMLElement[] = [];
  private programsSubmenu: HTMLElement | null = null;

  // Animation
  private masterTimeline: gsap.core.Timeline | null = null;
  private options: Required<MobileMenuAnimationOptions>;

  // State
  private state: MenuState = {
    isOpen: false,
    isAnimating: false,
    currentLevel: 'main',
    isBottomNavVisible: false,
  };

  constructor(options: MobileMenuAnimationOptions = {}) {
    this.options = {
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
      ...options,
    };
  }

  /**
   * Initialize the animation with container element
   * @param container - Element containing the mobile menu
   * @throws Error if required elements are not found
   */
  public init(container: HTMLElement): void {
    // Find bottom nav and fullscreen menu
    this.bottomNav = container.querySelector('.mobile-bottom-nav');
    this.bottomNavLogo = container.querySelector('.mobile-nav-logo');
    this.fullscreenMenu = container.querySelector('.mobile-fullscreen-menu');
    this.menuLogo = container.querySelector('[data-animation="menu-logo"]');

    // Find hamburger bars
    this.hamburgerTop = container.querySelector('.hamburger-top');
    this.hamburgerMiddle = container.querySelector('.hamburger-middle');
    this.hamburgerBottom = container.querySelector('.hamburger-bottom');

    // Find navigation items
    this.mainNavItems = Array.from(
      container.querySelectorAll(
        '[data-nav-level="main"] [data-animation="nav-item"]'
      )
    );
    this.programsNavItems = Array.from(
      container.querySelectorAll(
        '[data-nav-level="programs"] [data-animation="nav-item"]'
      )
    );
    this.programsSubmenu = container.querySelector(
      '[data-nav-level="programs"]'
    );

    // Validate required elements
    if (
      !this.bottomNav ||
      !this.bottomNavLogo ||
      !this.fullscreenMenu ||
      !this.menuLogo ||
      !this.hamburgerTop ||
      !this.hamburgerMiddle ||
      !this.hamburgerBottom
    ) {
      throw new Error('Required mobile menu elements not found');
    }

    this.setupInitialState();
  }

  /**
   * Set initial GSAP states for all elements
   */
  private setupInitialState(): void {
    // Hamburger icon initial state
    gsap.set([this.hamburgerTop, this.hamburgerBottom], {
      rotation: 0,
      y: 0,
      transformOrigin: 'center',
    });
    gsap.set(this.hamburgerMiddle, {
      opacity: 1,
    });

    // Bottom nav logo initial state (visible)
    gsap.set(this.bottomNavLogo, {
      opacity: 1,
    });

    // Fullscreen menu initial state
    gsap.set(this.fullscreenMenu, {
      visibility: 'hidden',
      opacity: 0,
    });

    // Menu logo initial state (hidden)
    gsap.set(this.menuLogo, {
      opacity: 0,
    });

    // Nav items initial state
    const allNavItems = [...this.mainNavItems, ...this.programsNavItems];
    gsap.set(allNavItems, {
      x: 100,
      opacity: 0,
    });

    // Programs submenu initial state
    if (this.programsSubmenu) {
      gsap.set(this.programsSubmenu, {
        x: '100%',
        opacity: 0,
        visibility: 'hidden',
      });
    }
  }

  /**
   * Get current menu state
   */
  public getState(): MenuState {
    return { ...this.state };
  }

  /**
   * Create unified open animation timeline
   * Combines hamburger transform and menu slide-in
   */
  private createOpenTimeline(): gsap.core.Timeline {
    const tl = gsap.timeline();

    // Set menu visible immediately
    tl.set(this.fullscreenMenu, { visibility: 'visible' });

    // Logo crossfade (0s - 0.24s) - Bottom nav logo fades out
    tl.to(
      this.bottomNavLogo,
      {
        opacity: 0,
        duration: 0.24,
        ease: this.options.ease,
      },
      0
    );

    // Hamburger animation (0s - 0.64s) - 20% faster
    // Middle bar fades out quickly
    tl.to(
      this.hamburgerMiddle,
      {
        opacity: 0,
        duration: 0.24,
        ease: this.options.ease,
      },
      0
    );

    // Top bar rotates to 45deg and moves down
    tl.to(
      this.hamburgerTop,
      {
        rotation: 45,
        y: 6,
        duration: 0.64,
        ease: this.options.ease,
      },
      0
    );

    // Bottom bar rotates to -45deg and moves up
    tl.to(
      this.hamburgerBottom,
      {
        rotation: -45,
        y: -6,
        duration: 0.64,
        ease: this.options.ease,
      },
      0
    );

    // Menu background fades in (0.24s - 0.40s)
    // Wait for hamburger to mostly complete before showing menu
    tl.to(
      this.fullscreenMenu,
      {
        opacity: 1,
        duration: 0.16,
        ease: this.options.ease,
      },
      0.24
    );

    // Menu logo fades in first (0.32s - 0.56s)
    // Starts after menu background is visible
    tl.to(
      this.menuLogo,
      {
        opacity: 1,
        duration: 0.24,
        ease: this.options.ease,
      },
      0.32
    );

    // Nav items slide in after logo (0.56s onwards)
    // Start after logo animation completes
    tl.to(
      this.mainNavItems,
      {
        x: 0,
        opacity: 1,
        duration: this.options.duration,
        stagger: this.options.stagger,
        ease: this.options.ease,
      },
      0.56
    );

    return tl;
  }

  /**
   * Open the mobile menu
   */
  public async open(): Promise<MenuState> {
    if (this.state.isOpen || this.state.isAnimating) {
      return this.getState();
    }

    // Set animating state
    this.state.isAnimating = true;

    // Reset to main navigation level
    this.state.currentLevel = 'main';
    if (this.programsSubmenu) {
      gsap.set(this.programsSubmenu, {
        x: '100%',
        opacity: 0,
        visibility: 'hidden',
      });
    }

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    this.masterTimeline = this.createOpenTimeline();

    return new Promise((resolve) => {
      this.masterTimeline!.eventCallback('onComplete', () => {
        this.state.isOpen = true;
        this.state.isAnimating = false;
        resolve(this.getState());
      });
      this.masterTimeline!.play();
    });
  }

  /**
   * Close the mobile menu
   */
  public async close(): Promise<MenuState> {
    if (!this.state.isOpen || this.state.isAnimating || !this.masterTimeline) {
      return this.getState();
    }

    this.state.isAnimating = true;

    // If we're on the programs submenu, instantly hide it without animation
    // This prevents the main menu from flashing during close
    if (this.state.currentLevel === 'programs' && this.programsSubmenu) {
      gsap.set(this.programsSubmenu, {
        x: '100%',
        opacity: 0,
        visibility: 'hidden',
      });
      gsap.set(this.programsNavItems, { x: 100, opacity: 0 });
      this.state.currentLevel = 'main';
    }

    return new Promise((resolve) => {
      this.masterTimeline!.eventCallback('onReverseComplete', () => {
        // Hide menu
        if (this.fullscreenMenu) {
          gsap.set(this.fullscreenMenu, { visibility: 'hidden' });
        }

        // Reset navigation level and programs submenu
        this.state.currentLevel = 'main';
        if (this.programsSubmenu) {
          gsap.set(this.programsSubmenu, {
            x: '100%',
            opacity: 0,
            visibility: 'hidden',
          });
        }

        // Restore body scroll
        document.body.style.overflow = '';

        this.state.isOpen = false;
        this.state.isAnimating = false;

        resolve(this.getState());
      });

      // Same speed for close animation (1.0x = normal speed, matching open)
      this.masterTimeline!.timeScale(1.0);
      this.masterTimeline!.reverse();
    });
  }

  /**
   * Toggle menu between open and closed states
   */
  public async toggle(): Promise<MenuState> {
    if (this.state.isOpen) {
      return await this.close();
    } else {
      return await this.open();
    }
  }

  /**
   * Show programs submenu
   */
  public async showProgramsSubmenu(): Promise<MenuState> {
    if (
      !this.fullscreenMenu ||
      !this.programsSubmenu ||
      this.state.currentLevel === 'programs'
    ) {
      return this.getState();
    }

    const tl = gsap.timeline();

    // Animate main nav out
    tl.to(this.mainNavItems, {
      x: -100,
      opacity: 0,
      duration: this.options.duration / 2,
      stagger: this.options.stagger,
      ease: this.options.ease,
    });

    // Show programs submenu
    tl.set(this.programsSubmenu, {
      visibility: 'visible',
      x: '100%',
      opacity: 0,
    });

    tl.to(
      this.programsSubmenu,
      {
        x: '0%',
        opacity: 1,
        duration: this.options.duration / 2,
        ease: this.options.ease,
      },
      '-=0.1'
    );

    // Stagger in programs items
    tl.to(
      this.programsNavItems,
      {
        x: 0,
        opacity: 1,
        duration: this.options.duration / 2,
        stagger: this.options.stagger,
        ease: this.options.ease,
      },
      '-=0.2'
    );

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => {
        this.state.currentLevel = 'programs';
        resolve(this.getState());
      });
      tl.play();
    });
  }

  /**
   * Show main navigation
   */
  public async showMainNavigation(): Promise<MenuState> {
    if (
      !this.fullscreenMenu ||
      !this.programsSubmenu ||
      this.state.currentLevel === 'main'
    ) {
      return this.getState();
    }

    const tl = gsap.timeline();

    // Animate programs out
    tl.to(this.programsNavItems, {
      x: 100,
      opacity: 0,
      duration: this.options.duration / 2,
      stagger: this.options.stagger,
      ease: this.options.ease,
    });

    tl.to(
      this.programsSubmenu,
      {
        x: '100%',
        opacity: 0,
        duration: this.options.duration / 2,
        ease: this.options.ease,
      },
      '-=0.3'
    );

    tl.set(this.programsSubmenu, {
      visibility: 'hidden',
    });

    // Animate main nav back in
    tl.fromTo(
      this.mainNavItems,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: this.options.duration / 2,
        stagger: this.options.stagger,
        ease: this.options.ease,
      },
      '-=0.1'
    );

    return new Promise((resolve) => {
      tl.eventCallback('onComplete', () => {
        this.state.currentLevel = 'main';
        resolve(this.getState());
      });
      tl.play();
    });
  }

  /**
   * Show bottom nav bar (scroll-triggered)
   */
  public showBottomNav(): void {
    if (!this.bottomNav || this.state.isBottomNavVisible) return;

    this.state.isBottomNavVisible = true;
    this.bottomNav.classList.add('visible');
  }

  /**
   * Hide bottom nav bar (scroll-triggered)
   */
  public hideBottomNav(): void {
    if (!this.bottomNav || !this.state.isBottomNavVisible) return;

    this.state.isBottomNavVisible = false;
    this.bottomNav.classList.remove('visible');
  }

  /**
   * Clean up animation resources
   */
  public destroy(): void {
    if (this.masterTimeline) {
      this.masterTimeline.kill();
      this.masterTimeline = null;
    }

    // Restore body scroll
    document.body.style.overflow = '';

    // Reset state
    this.state = {
      isOpen: false,
      isAnimating: false,
      currentLevel: 'main',
      isBottomNavVisible: false,
    };

    // Clear element references
    this.bottomNav = null;
    this.bottomNavLogo = null;
    this.fullscreenMenu = null;
    this.menuLogo = null;
    this.hamburgerTop = null;
    this.hamburgerMiddle = null;
    this.hamburgerBottom = null;
    this.mainNavItems = [];
    this.programsNavItems = [];
    this.programsSubmenu = null;
  }
}
