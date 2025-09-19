import gsap from 'gsap';

export interface MobileNavAnimationOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
}

export interface MenuState {
  isOpen: boolean;
  isAnimating: boolean;
  currentLevel: 'main' | 'programs';
}

export class MobileNavAnimation {
  private menuContainer: HTMLElement | null = null;
  private menuItems: HTMLElement[] = [];
  private mainNavItems: HTMLElement[] = [];
  private programsNavItems: HTMLElement[] = [];
  private currentLevel: 'main' | 'programs' = 'main';
  private options: Required<MobileNavAnimationOptions>;
  private timeline: gsap.core.Timeline | null = null;

  constructor(options: MobileNavAnimationOptions = {}) {
    this.options = {
      duration: 0.6,
      stagger: 0.04,
      ease: 'power3.out',
      ...options,
    };
  }

  public init(menuContainer: HTMLElement): void {
    this.menuContainer = menuContainer;
    this.menuItems = Array.from(
      menuContainer.querySelectorAll('[data-animation="nav-item"]')
    );

    // Separate main nav and programs nav items
    this.mainNavItems = Array.from(
      menuContainer.querySelectorAll(
        '[data-nav-level="main"] [data-animation="nav-item"]'
      )
    );
    this.programsNavItems = Array.from(
      menuContainer.querySelectorAll(
        '[data-nav-level="programs"] [data-animation="nav-item"]'
      )
    );

    this.setupInitialState();
  }

  private setupInitialState(): void {
    if (!this.menuContainer) return;

    gsap.set(this.menuContainer, {
      visibility: 'hidden',
      opacity: 0,
    });

    gsap.set(this.menuItems, {
      x: 100,
      opacity: 0,
    });

    // Hide programs submenu initially with proper positioning
    const programsSubmenu = this.menuContainer.querySelector(
      '[data-nav-level="programs"]'
    );
    if (programsSubmenu) {
      gsap.set(programsSubmenu, {
        x: '100%',
        opacity: 0,
        visibility: 'hidden',
      });
    }
  }

  public openMenuTimeline(): gsap.core.Timeline {
    if (!this.menuContainer) {
      throw new Error('Menu container not initialized');
    }

    const timeline = gsap.timeline();

    timeline
      .set(this.menuContainer, { visibility: 'visible' })
      .to(this.menuContainer, {
        opacity: 1,
        duration: 0.1,
        ease: this.options.ease,
      })
      .to(
        this.menuItems,
        {
          x: 0,
          opacity: 1,
          duration: this.options.duration,
          stagger: this.options.stagger,
          ease: this.options.ease,
        },
        '-=0.1'
      );

    return timeline;
  }

  public createCloseAnimation(): gsap.core.Timeline {
    if (!this.menuContainer) {
      throw new Error('Menu container not initialized');
    }

    console.log('close');
    const timeline = this.openMenuTimeline();
    timeline.progress(1); // Set to end state

    // Add close cleanup
    timeline.set(this.menuContainer, { visibility: 'hidden' }, '+=0');

    return timeline;
  }

  public async showProgramsSubmenu(): Promise<MenuState> {
    if (!this.menuContainer || this.currentLevel === 'programs') {
      return this.getCurrentState();
    }

    const timeline = gsap.timeline();
    const programsSubmenu = this.menuContainer.querySelector(
      '[data-nav-level="programs"]'
    );

    // Animate main nav items out and submenu in
    timeline
      .to(this.mainNavItems, {
        x: -100,
        opacity: 0,
        duration: this.options.duration / 2,
        stagger: this.options.stagger,
        ease: this.options.ease,
      })
      .set(programsSubmenu, {
        visibility: 'visible',
        x: '100%',
        opacity: 0,
      })
      .to(
        programsSubmenu,
        {
          x: '0%',
          opacity: 1,
          duration: this.options.duration / 2,
          ease: this.options.ease,
        },
        '-=0.1'
      )
      .to(
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
      timeline.eventCallback('onComplete', () => {
        this.currentLevel = 'programs';
        resolve(this.getCurrentState());
      });
      timeline.play();
    });
  }

  public async showMainNavigation(): Promise<MenuState> {
    if (!this.menuContainer || this.currentLevel === 'main') {
      return this.getCurrentState();
    }

    const timeline = gsap.timeline();
    const programsSubmenu = this.menuContainer.querySelector(
      '[data-nav-level="programs"]'
    );

    // Animate submenu out and main nav in
    timeline
      .to(this.programsNavItems, {
        x: 100,
        opacity: 0,
        duration: this.options.duration / 2,
        stagger: this.options.stagger,
        ease: this.options.ease,
      })
      .to(
        programsSubmenu,
        {
          x: '100%',
          opacity: 0,
          duration: this.options.duration / 2,
          ease: this.options.ease,
        },
        '-=0.3'
      )
      .set(programsSubmenu, {
        visibility: 'hidden',
      })
      .fromTo(
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
      timeline.eventCallback('onComplete', () => {
        this.currentLevel = 'main';
        resolve(this.getCurrentState());
      });
      timeline.play();
    });
  }

  public getCurrentState(): MenuState {
    const isVisible = this.menuContainer
      ? getComputedStyle(this.menuContainer).visibility === 'visible'
      : false;
    const opacity = this.menuContainer
      ? parseFloat(getComputedStyle(this.menuContainer).opacity)
      : 0;

    return {
      isOpen: isVisible && opacity > 0,
      isAnimating: this.timeline ? this.timeline.isActive() : false,
      currentLevel: this.currentLevel,
    };
  }

  public async openMenu(): Promise<MenuState> {
    const currentState = this.getCurrentState();

    if (currentState.isAnimating || currentState.isOpen) {
      return currentState;
    }

    // Reset to main navigation level when opening
    this.currentLevel = 'main';
    const programsSubmenu = this.menuContainer?.querySelector(
      '[data-nav-level="programs"]'
    );
    if (programsSubmenu) {
      gsap.set(programsSubmenu, {
        x: '100%',
        opacity: 0,
        visibility: 'hidden',
      });
    }

    this.timeline = this.openMenuTimeline();

    return new Promise((resolve) => {
      this.timeline!.eventCallback('onComplete', () => {
        resolve(this.getCurrentState());
      });

      // Ensure normal speed for opening
      this.timeline!.timeScale(1);
      this.timeline!.play();
    });
  }

  public async closeMenu(): Promise<MenuState> {
    const currentState = this.getCurrentState();

    if (currentState.isAnimating || !currentState.isOpen || !this.timeline) {
      return currentState;
    }

    return new Promise((resolve) => {
      this.timeline!.eventCallback('onReverseComplete', () => {
        if (this.menuContainer) {
          gsap.set(this.menuContainer, { visibility: 'hidden' });

          // Reset navigation state when closing
          this.currentLevel = 'main';
          const programsSubmenu = this.menuContainer.querySelector(
            '[data-nav-level="programs"]'
          );
          if (programsSubmenu) {
            gsap.set(programsSubmenu, {
              x: '100%',
              opacity: 0,
              visibility: 'hidden',
            });
          }
        }
        resolve(this.getCurrentState());
      });

      // Make close animation 2.4x faster (was 3x, now 0.125 slower)
      this.timeline!.timeScale(2.4);
      this.timeline!.reverse();
    });
  }

  public get menuIsOpen(): boolean {
    return this.getCurrentState().isOpen;
  }
}
