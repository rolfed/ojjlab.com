import css from '../style.css?inline';

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

export class HeroImage extends HTMLElement {
    private root: ShadowRoot;

    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.adoptedStyleSheets = [sheet];
    }

    public connectedCallback(): void {
        if (!this.root.hasChildNodes()) {
            this.render();
        }
    }

    private render(): void {
        this.root.innerHTML = `
      <section
        class="
          relative
          h-[90vh]
          min-h-[560px]
          flex
          flex-col
          justify-center
          items-center
          text-center
          px-6
        "
        aria-label="Hero"
      >
        <!-- Background media -->
        <div
          class="
            absolute
            inset-0
            -z-10
            overflow-hidden
          "
          aria-hidden="true"
        >
          <picture>
            <source
              type="image/avif"
              srcset="
                /images/hero-480.avif   480w,
                /images/hero-768.avif   768w,
                /images/hero-1280.avif 1280w
              "
              sizes="
                (min-width:1024px) 900px,
                (min-width:640px) 70vw,
                100vw
              "
            />
            <source
              type="image/webp"
              srcset="
                /images/hero-480.webp   480w,
                /images/hero-768.webp   768w,
                /images/hero-1280.webp 1280w
              "
              sizes="
                (min-width:1024px) 900px,
                (min-width:640px) 70vw,
                100vw
              "
            />
            <img
              src="/images/hero-1280.jpg"
              width="1280"
              height="720"
              alt=""
              loading="eager"
              decoding="async"
              fetchpriority="high"
              class="
                w-full
                h-full
                object-cover
                object-center
              "
            />
          </picture>

          <!-- Readability overlay -->
          <div
            class="
              absolute
              inset-0
              bg-black/40
            "
          ></div>
        </div>

        <!-- Slotted content (headers, paragraph, buttons, etc.) -->
        <div
          class="
            mx-auto
            max-w-6xl
            px-4
            md:px-6
            py-16
            md:py-24
            space-y-4
          "
        >
          <slot></slot>
        </div>
      </section>
    `;
    }
}

customElements.define('hero-image', HeroImage);

declare global {
    interface HTMLElementTagNameMap {
        'hero-image': HeroImage;
    }
}

