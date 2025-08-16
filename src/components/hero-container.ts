import css from '../style.css?inline';
import './hero-header';

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

class HeroContainer extends HTMLElement {
    private root: ShadowRoot; 

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.root.adoptedStyleSheets = [sheet];
    }
    public connectedCallback() {
        this.render();
    }

    public render(): void {
        this.shadowRoot!.innerHTML = `
          <section 
            class="
              relative
              h-screen
              flex
              flex-col
              justify-center
              items-center
              bg-cover
              px-6
            "
            aria-label="Hero"
          >
            <hero-header delay="0.00">Strength for kids.</hero-header>
            <hero-header delay="0.45">Confidence for adults.</hero-header>
            <hero-header delay="0.80">Community for everyone.</hero-header>
            <p>American Jiu Jitsu, Wrestling, and Kickboxing programs -- built
                  for kids (4+) and adults at every level.</p>
          </section>
    `;

    }
}

customElements.define("hero-container", HeroContainer);
