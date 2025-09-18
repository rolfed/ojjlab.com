import gsap from 'gsap';

interface LoadingProgress {
  images: number;
  scripts: number;
  styles: number;
  fonts: number;
  total: number;
}

class OJJLoader extends HTMLElement {
  private progress: LoadingProgress = {
    images: 0,
    scripts: 0,
    styles: 0,
    fonts: 0,
    total: 0,
  };

  private targetCounts: LoadingProgress = {
    images: 0,
    scripts: 0,
    styles: 0,
    fonts: 0,
    total: 0,
  };

  private currentPercentage = 0;
  private isInitialized = false;
  private onCompleteCallback: (() => void) | null = null;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.replaceStaticLoader();
      this.render();
      this.initializeLoader();
      this.startTracking();
      this.isInitialized = true;
    }
  }

  private replaceStaticLoader(): void {
    const staticLoader = document.getElementById('static-loader');
    if (staticLoader) {
      staticLoader.remove();
    }
    this.style.display = 'block';
  }

  private render(): void {
    this.innerHTML = `
      <div class="loader-overlay">
        <div class="loader-content">
          <div class="loader-text-container">
            <!-- Background text (white) -->
            <div class="loader-percentage-bg" id="loader-percentage-bg">0%</div>

            <!-- Foreground text (brand red) with water-fill effect -->
            <div class="loader-percentage-fill" id="loader-percentage-fill">0%</div>
          </div>
        </div>
      </div>
    `;
  }

  private initializeLoader(): void {
    const percentageBg = this.querySelector('#loader-percentage-bg');
    const percentageFill = this.querySelector('#loader-percentage-fill');

    if (percentageBg && percentageFill) {
      percentageBg.textContent = '0%';
      percentageFill.textContent = '0%';
    }

    // Initialize the fill text to be completely clipped (hidden)
    if (percentageFill) {
      gsap.set(percentageFill, {
        clipPath: 'inset(100% 0 0 0)',
      });
    }
  }

  private startTracking(): void {
    this.scanResources();
    this.trackResourceLoading();

    setTimeout(() => {
      if (this.currentPercentage < 100) {
        this.simulateRemainingProgress();
      }
    }, 5000);
  }

  private scanResources(): void {
    const images = document.querySelectorAll('img');
    const scripts = document.querySelectorAll('script[src]');
    const styles = document.querySelectorAll('link[rel="stylesheet"]');

    this.targetCounts.images = images.length;
    this.targetCounts.scripts = scripts.length;
    this.targetCounts.styles = styles.length;
    this.targetCounts.fonts = 2;

    this.targetCounts.total =
      this.targetCounts.images +
      this.targetCounts.scripts +
      this.targetCounts.styles +
      this.targetCounts.fonts;
  }

  private trackResourceLoading(): void {
    this.trackImages();
    this.trackScripts();
    this.trackStyles();
    this.trackFonts();
    this.trackDOMReady();
  }

  private trackImages(): void {
    const images = document.querySelectorAll('img');

    images.forEach((img) => {
      if (img.complete) {
        this.progress.images++;
        this.updateProgress();
      } else {
        img.addEventListener('load', () => {
          this.progress.images++;
          this.updateProgress();
        });
        img.addEventListener('error', () => {
          this.progress.images++;
          this.updateProgress();
        });
      }
    });
  }

  private trackScripts(): void {
    const scripts = document.querySelectorAll('script[src]');

    scripts.forEach((script) => {
      script.addEventListener('load', () => {
        this.progress.scripts++;
        this.updateProgress();
      });
      script.addEventListener('error', () => {
        this.progress.scripts++;
        this.updateProgress();
      });
    });

    if (scripts.length === 0) {
      this.progress.scripts = this.targetCounts.scripts;
      this.updateProgress();
    }
  }

  private trackStyles(): void {
    const styles = document.querySelectorAll('link[rel="stylesheet"]');
    let loadedStyles = 0;

    styles.forEach((link) => {
      link.addEventListener('load', () => {
        loadedStyles++;
        this.progress.styles = loadedStyles;
        this.updateProgress();
      });
      link.addEventListener('error', () => {
        loadedStyles++;
        this.progress.styles = loadedStyles;
        this.updateProgress();
      });
    });

    if (styles.length === 0) {
      this.progress.styles = this.targetCounts.styles;
      this.updateProgress();
    }
  }

  private trackFonts(): void {
    if ('fonts' in document) {
      (document as any).fonts.ready.then(() => {
        this.progress.fonts = this.targetCounts.fonts;
        this.updateProgress();
      });
    } else {
      setTimeout(() => {
        this.progress.fonts = this.targetCounts.fonts;
        this.updateProgress();
      }, 1000);
    }
  }

  private trackDOMReady(): void {
    if (document.readyState === 'complete') {
      this.handleDOMComplete();
    } else {
      window.addEventListener('load', () => {
        this.handleDOMComplete();
      });
    }
  }

  private handleDOMComplete(): void {
    setTimeout(() => {
      if (this.currentPercentage < 100) {
        this.forceComplete();
      }
    }, 1000);
  }

  private updateProgress(): void {
    const totalLoaded =
      this.progress.images +
      this.progress.scripts +
      this.progress.styles +
      this.progress.fonts;

    const percentage = Math.min(
      Math.round((totalLoaded / this.targetCounts.total) * 100),
      100
    );

    if (percentage > this.currentPercentage) {
      this.animateToPercentage(percentage);
    }

    if (percentage >= 100) {
      this.completeLoading();
    }
  }

  private simulateRemainingProgress(): void {
    const remainingPercentage = 100 - this.currentPercentage;
    const steps = Math.max(remainingPercentage / 10, 1);

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const newPercentage =
        this.currentPercentage + remainingPercentage * (currentStep / steps);

      if (newPercentage >= 100 || currentStep >= steps) {
        clearInterval(interval);
        this.forceComplete();
      } else {
        this.animateToPercentage(Math.round(newPercentage));
      }
    }, 200);
  }

  private forceComplete(): void {
    this.animateToPercentage(100);
    setTimeout(() => {
      this.completeLoading();
    }, 500);
  }

  private animateToPercentage(targetPercentage: number): void {
    if (targetPercentage <= this.currentPercentage) return;

    const duration = (targetPercentage - this.currentPercentage) * 0.02;

    gsap.to(this, {
      currentPercentage: targetPercentage,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        this.updateDisplay();
      },
    });
  }

  private updateDisplay(): void {
    const displayPercentage = Math.round(this.currentPercentage);
    const percentageText = `${displayPercentage}%`;

    const percentageBg = this.querySelector('#loader-percentage-bg');
    const percentageFill = this.querySelector('#loader-percentage-fill');

    if (percentageBg) percentageBg.textContent = percentageText;
    if (percentageFill) percentageFill.textContent = percentageText;

    // Animate the water-filling effect using clip-path
    if (percentageFill) {
      const fillAmount = displayPercentage / 100;
      const clipValue = 100 - fillAmount * 100;

      gsap.to(percentageFill, {
        clipPath: `inset(${clipValue}% 0 0 0)`,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  }

  private completeLoading(): void {
    setTimeout(() => {
      this.animateOut();
    }, 500);
  }

  private animateOut(): void {
    const overlay = this.querySelector('.loader-overlay');

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        this.remove();
        if (this.onCompleteCallback) {
          this.onCompleteCallback();
        }
      },
    });
  }

  public onComplete(callback: () => void): void {
    this.onCompleteCallback = callback;
  }
}

customElements.define('ojj-loader', OJJLoader);

export default OJJLoader;
