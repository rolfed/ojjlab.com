import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { Timeline } from '../model/gsap';
import { getAssetUrl } from '../utils/base-path';

gsap.registerPlugin(ScrollTrigger);

class OJJGallery extends HTMLElement {
  private modal: HTMLElement | null = null;
  private modalImage: HTMLImageElement | null = null;
  private closeButton: HTMLElement | null = null;
  private closeButton2: HTMLElement | null = null;
  private prevButton: HTMLElement | null = null;
  private nextButton: HTMLElement | null = null;
  private backdrop: HTMLElement | null = null;
  private currentImageIndex: number = 0;
  private totalImages: number = 36;
  private isInitialized = false;

  constructor() {
    super();
  }

  connectedCallback() {
    if (!this.isInitialized) {
      this.render();
      this.initializeModal();
      this.animateGalleryItems();
      this.isInitialized = true;
    }
  }

  private render(): void {
    this.innerHTML = `
      <section class="section" id="gallery">
        <header class="gallery-header">
          <h2 class="gallery-title">Gallery</h2>
          <p class="gallery-subtitle">
            See our community in action.
          </p>
        </header>

        <!-- Gallery Grid -->
        <div class="gallery-grid">
          ${this.generateGalleryItems()}
        </div>

        <!-- Gallery Modal -->
        <div class="gallery-modal" id="gallery-modal" aria-hidden="true">
          <div class="gallery-modal-backdrop" id="gallery-modal-backdrop"></div>
          <div class="gallery-modal-content">
            <button class="gallery-modal-close" id="gallery-modal-close" aria-label="Close gallery">
              <span class="sr-only">Close</span>
              <svg class="gallery-close-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
            <img class="gallery-modal-image" id="gallery-modal-image" src="" alt="">
            <div class="gallery-modal-nav">
              <button class="gallery-nav-btn gallery-prev-btn" id="gallery-prev-btn" aria-label="Previous image">
                <svg class="gallery-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="gallery-nav-btn gallery-close-btn" id="gallery-modal-close-2" aria-label="Close gallery">
                <svg class="gallery-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="gallery-nav-btn gallery-next-btn" id="gallery-next-btn" aria-label="Next image">
                <svg class="gallery-nav-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private generateGalleryItems(): string {
    const items: string[] = [];

    // Generate exactly 36 items (6x6 grid)
    for (let i = 1; i <= 36; i++) {
      const imagePath = getAssetUrl(`/images/gallery/${i}.svg`);
      items.push(`
        <button class="gallery-item" data-image="${imagePath}" aria-label="Open gallery image ${i}">
          <img src="${imagePath}" alt="Gallery image ${i}" class="gallery-image">
        </button>
      `);
    }

    return items.join('');
  }

  private initializeModal(): void {
    this.modal = this.querySelector('#gallery-modal');
    this.modalImage = this.querySelector(
      '#gallery-modal-image'
    ) as HTMLImageElement;
    this.closeButton = this.querySelector('#gallery-modal-close');
    this.closeButton2 = this.querySelector('#gallery-modal-close-2');
    this.prevButton = this.querySelector('#gallery-prev-btn');
    this.nextButton = this.querySelector('#gallery-next-btn');
    this.backdrop = this.querySelector('#gallery-modal-backdrop');

    // Ensure modal is hidden initially
    if (this.modal) {
      this.modal.style.display = 'none';
      this.modal.classList.remove('open');
    }

    // Add click listeners to all gallery items
    const galleryItems = this.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', (e: Event) => {
        e.preventDefault();
        e.stopPropagation();
        this.currentImageIndex = index;
        const imageSrc = (item as HTMLElement).dataset.image;
        const imgElement = item.querySelector('img') as HTMLImageElement;
        const imageAlt = imgElement?.alt || '';
        if (imageSrc) {
          this.openModal(imageSrc, imageAlt);
        }
      });
    });

    // Add close functionality
    this.closeButton?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeModal();
    });

    this.closeButton2?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeModal();
    });

    this.backdrop?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.closeModal();
    });

    // Add navigation functionality
    this.prevButton?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.showPreviousImage();
    });

    this.nextButton?.addEventListener('click', (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      this.showNextImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (this.modal?.classList.contains('open')) {
        switch (e.key) {
          case 'Escape':
            this.closeModal();
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.showPreviousImage();
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.showNextImage();
            break;
        }
      }
    });
  }

  private animateGalleryItems(): void {
    const galleryItems = this.querySelectorAll('.gallery-item');

    // Set initial states
    gsap.set(galleryItems, {
      opacity: 0,
      scale: 0.8,
      y: 20,
    });

    // Create timeline
    const tl: Timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this,
        start: 'top 80%',
        once: true,
      },
    });

    // Animate gallery items with stagger
    tl.to(galleryItems, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      stagger: {
        amount: 1.2,
        grid: [6, 6],
        from: 'start',
      },
      ease: 'back.out(1.7)',
    });
  }

  private openModal(imageSrc: string, imageAlt: string): void {
    if (!this.modalImage || !this.modal) return;

    // Set image and show modal
    this.modalImage.src = imageSrc;
    this.modalImage.alt = imageAlt;
    this.modal.style.display = 'flex';
    this.modal.classList.add('open');
    this.modal.setAttribute('aria-hidden', 'false');

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    // Set initial states for animation
    gsap.set(this.backdrop, { opacity: 0 });
    gsap.set(this.modalImage, { scale: 0.8, opacity: 0 });

    // Animate modal in
    gsap.to(this.backdrop, {
      opacity: 1,
      duration: 0.3,
      ease: 'power2.out',
    });
    gsap.to(this.modalImage, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(1.7)',
      delay: 0.1,
    });

    // Focus the close button for accessibility
    setTimeout(() => {
      this.closeButton?.focus();
    }, 100);
  }

  private closeModal(): void {
    if (!this.modal) return;

    // Animate modal out
    gsap.to(this.backdrop, {
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
    });

    gsap.to(this.modalImage, {
      scale: 0.8,
      opacity: 0,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        if (this.modal) {
          this.modal.classList.remove('open');
          this.modal.setAttribute('aria-hidden', 'true');
          this.modal.style.display = 'none';
        }

        // Restore body scroll
        document.body.style.overflow = '';

        // Clear the image source
        if (this.modalImage) {
          this.modalImage.src = '';
          this.modalImage.alt = '';
        }
      },
    });
  }

  private showPreviousImage(): void {
    this.currentImageIndex =
      (this.currentImageIndex - 1 + this.totalImages) % this.totalImages;
    this.updateModalImage();
  }

  private showNextImage(): void {
    this.currentImageIndex = (this.currentImageIndex + 1) % this.totalImages;
    this.updateModalImage();
  }

  private updateModalImage(): void {
    if (!this.modalImage) return;

    const newImageSrc = getAssetUrl(
      `/images/gallery/${this.currentImageIndex + 1}.svg`
    );
    const newImageAlt = `Gallery image ${this.currentImageIndex + 1}`;

    // Animate image transition
    gsap.to(this.modalImage, {
      opacity: 0,
      scale: 0.9,
      duration: 0.15,
      ease: 'power2.in',
      onComplete: () => {
        if (this.modalImage) {
          this.modalImage.src = newImageSrc;
          this.modalImage.alt = newImageAlt;
          gsap.to(this.modalImage, {
            opacity: 1,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          });
        }
      },
    });
  }
}

// Register the custom element
customElements.define('ojj-gallery', OJJGallery);

export default OJJGallery;
