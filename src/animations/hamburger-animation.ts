import { gsap } from 'gsap';

/**
 * State of the hamburger animation
 */
export interface HamburgerState {
  isOpen: boolean;
  isAnimating: boolean;
}

/**
 * GSAP-powered hamburger menu animation
 *
 * Animates three horizontal bars into an X shape:
 * - Top bar rotates 45 degrees and moves down
 * - Middle bar fades out
 * - Bottom bar rotates -45 degrees and moves up
 *
 * @example
 * ```typescript
 * const hamburger = new HamburgerAnimation();
 * hamburger.init(buttonElement);
 * await hamburger.toggle();
 * ```
 */
export class HamburgerAnimation {
  private topBar: SVGElement | null = null;
  private middleBar: SVGElement | null = null;
  private bottomBar: SVGElement | null = null;
  private timeline: gsap.core.Timeline | null = null;
  private state: HamburgerState = {
    isOpen: false,
    isAnimating: false,
  };

  /**
   * Initialize the animation with hamburger bars
   * @param container - Element containing the hamburger SVG bars
   * @throws Error if hamburger bars are not found
   */
  public init(container: HTMLElement): void {
    this.topBar = container.querySelector('.hamburger-top');
    this.middleBar = container.querySelector('.hamburger-middle');
    this.bottomBar = container.querySelector('.hamburger-bottom');

    if (!this.topBar || !this.middleBar || !this.bottomBar) {
      throw new Error('Hamburger bars not found');
    }

    // Set initial state
    gsap.set([this.topBar, this.bottomBar], {
      rotation: 0,
      transformOrigin: 'center',
    });
    gsap.set(this.middleBar, {
      opacity: 1,
    });
  }

  /**
   * Get current animation state
   */
  public getState(): HamburgerState {
    return { ...this.state };
  }

  /**
   * Animate hamburger bars to X shape
   */
  public async animateToX(): Promise<void> {
    if (this.state.isOpen || this.state.isAnimating) {
      return;
    }

    if (!this.topBar || !this.middleBar || !this.bottomBar) {
      throw new Error('Hamburger animation not initialized');
    }

    this.state.isAnimating = true;

    this.timeline = gsap.timeline();

    // Animate to X shape (timing synced with menu animation)
    this.timeline
      .to(this.middleBar, {
        opacity: 0,
        duration: 0.15,
        ease: 'power3.out',
      })
      .to(
        this.topBar,
        {
          rotation: 45,
          y: 6,
          duration: 0.4,
          ease: 'power3.out',
        },
        '-=0.05'
      )
      .to(
        this.bottomBar,
        {
          rotation: -45,
          y: -6,
          duration: 0.4,
          ease: 'power3.out',
        },
        '<' // Start at the same time as top bar
      );

    return new Promise<void>((resolve) => {
      this.timeline!.eventCallback('onComplete', () => {
        this.state.isOpen = true;
        this.state.isAnimating = false;
        resolve();
      });
      this.timeline!.play();
    });
  }

  /**
   * Animate X shape back to hamburger bars
   */
  public async animateToHamburger(): Promise<void> {
    if (!this.state.isOpen || this.state.isAnimating) {
      return;
    }

    if (!this.topBar || !this.middleBar || !this.bottomBar) {
      throw new Error('Hamburger animation not initialized');
    }

    this.state.isAnimating = true;

    this.timeline = gsap.timeline();

    // Animate back to hamburger (timing synced with menu animation)
    this.timeline
      .to([this.topBar, this.bottomBar], {
        rotation: 0,
        y: 0,
        duration: 0.4,
        ease: 'power3.out',
      })
      .to(
        this.middleBar,
        {
          opacity: 1,
          duration: 0.15,
          ease: 'power3.out',
        },
        '-=0.05'
      );

    return new Promise<void>((resolve) => {
      this.timeline!.eventCallback('onComplete', () => {
        this.state.isOpen = false;
        this.state.isAnimating = false;
        resolve();
      });
      this.timeline!.play();
    });
  }

  /**
   * Toggle between hamburger and X states
   */
  public async toggle(): Promise<void> {
    if (this.state.isOpen) {
      await this.animateToHamburger();
    } else {
      await this.animateToX();
    }
  }

  /**
   * Clean up animation resources
   */
  public destroy(): void {
    if (this.timeline) {
      this.timeline.kill();
      this.timeline = null;
    }

    this.state = {
      isOpen: false,
      isAnimating: false,
    };

    this.topBar = null;
    this.middleBar = null;
    this.bottomBar = null;
  }
}
