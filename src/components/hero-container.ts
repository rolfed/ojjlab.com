import css from '../style.css?inline';
import './hero-header';
import './hero-image';

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
            <hero-image>
            <hero-header delay="0.00">Strength for kids.</hero-header>
            <hero-header delay="0.45">Confidence for adults.</hero-header>
            <hero-header delay="0.80">Community for everyone.</hero-header>
            <p class="
                  mt-6
                  text-base
                  md:text-lg
                  opacity-90
                  max-w-[60ch]
                  mx-auto
                  text-white
              ">
                  American Jiu Jitsu, Wrestling, and Kickboxing programs — built for kids (4+) and adults at every level.
              </p>
            </hero-image>
    `;

    }
}

customElements.define("hero-container", HeroContainer);
