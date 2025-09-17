import gsap from 'gsap';

export interface MobileNavAnimationOptions {
  duration?: number;
  stagger?: number;
  ease?: string;
}

export interface MenuState {
  isOpen: boolean;
  isAnimating: boolean;
}

export class MobileNavAnimation {
  private menuContainer: HTMLElement | null = null;
  private menuItems: HTMLElement[] = [];
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

  public getCurrentState(): MenuState {
    const isVisible = this.menuContainer
      ? getComputedStyle(this.menuContainer).visibility === 'visible'
      : false;
    const opacity = this.menuContainer
      ? parseFloat(getComputedStyle(this.menuContainer).opacity)
      : 0;

    return {
      isOpen: isVisible && opacity > 0,
      isAnimating: this.timeline ? this.timeline.isActive() : false
    };
  }

  public async openMenu(): Promise<MenuState> {
    const currentState = this.getCurrentState();

    if (currentState.isAnimating || currentState.isOpen) {
      return currentState;
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
