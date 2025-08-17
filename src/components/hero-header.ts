import css from '../style.css?inline';
import gsap from 'gsap';

const sheet = new CSSStyleSheet();
sheet.replaceSync(css);

class HeroHeader extends HTMLElement {
    private root: ShadowRoot; 
    private timeline?: gsap.core.Timeline;
    private boxElement?: HTMLElement;
    private titleElement?: HTMLElement;

    private TITLE_ANIMATION_ID = 'title';
    private BOX_ANIMATION_ID = 'box';

    static get observedAttributes() {
        return ['delay'];
    }

    constructor() {
        super();
        this.root = this.attachShadow({ mode: "open" });
        this.root.adoptedStyleSheets = [sheet];
    }

    public connectedCallback() {
        this.render();
        void this.play();
    }

    public attributeChangedCallback(
        name: string, 
        oldValue: string | null, 
        newValue: string | null
    ) {
        if (
            name === 'delay'
            && oldValue !== newValue
            && this.root.hasChildNodes()
        ) {
            void this.play();
        }
    }

    public async play(): Promise<any> {
        if (!this.boxElement || !this.titleElement) {
            this.cacheElements();
        }

        if (!this.boxElement || !this.titleElement) {
            return;
        }

        // if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        //     this.showEndState();
        //     this.teardownAnimation();
        //     return;
        // }

        this.teardownAnimation();
        this.timeline = gsap.timeline({
            defaults: { ease: 'power2.out' },
            delay: this.delaySeconds,
        });

        console.log('TIMELINE', this.timeline);

        this.timeline
            .fromTo(
                this.boxElement,
                { scaleX: 0, opacity: 0.9 },
                { scaleX: 1, opacity: 1, duration: 0.5 }
            )
            .fromTo(
                this.titleElement,
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.45 },
                '<0.1',
            );

    }

    public disconnectedCallback() {
        this.timeline.kill();
        this.timeline = undefined;
    }

    public render(): void {
        this.shadowRoot!.innerHTML = `
            <div class="
                relative
                inline-block
                px-2
                py-1
                whitespace-nowrap
                isolation-auto
                space-y-4 
                text-center
                ">
                <span 
                    data-animation-id=${this.BOX_ANIMATION_ID}
                    class="
                        box
                        pointer-events-none
                        absolute
                        inset-0
                        opacity-30
                        origin-left
                        scale-x-0
                        bg-accent
                "
                aria-hidden="true"i
                ></span>
                <h1 data-animation-id=${this.TITLE_ANIMATION_ID}
                    class="
                        title
                        relative
                        text-4xl
                        md:text-6xl
                        font-semibold
                        leading-tight
                        opacity-0
                        will-change-[transform, opacity]
                        text-white
                        px-2
                        py-1
                    ">
                    <slot></slot>
                </h1>
            </div>
        `;

    }

    private get delaySeconds(): number {
        const numberString = this.getAttribute('delay');
        const parsed = numberString === null ? NaN : Number(numberString);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    private cacheElements(): void {
        this.boxElement = this.root.querySelector<HTMLElement>(
            `[data-animation-id="${this.BOX_ANIMATION_ID}"]`
        ) ?? undefined;
        this.titleElement = this.root.querySelector<HTMLElement>(
            `[data-animation-id="${this.TITLE_ANIMATION_ID}"]`
        ) ?? undefined;
    }

    private showEndState(): void {
        const opacity = '1';

        if (this.boxElement) {
            this.boxElement.style.transform = 'scaleX(1)';
            this.boxElement.style.opacity = opacity;
        }

        if (this.titleElement) {
            this.titleElement.style.opacity = opacity;
            this.titleElement.style.transform = 'translateY(0)';
        }
    }

    private teardownAnimation(): void {
        this.timeline?.kill();
        this.timeline = undefined;
    }
}

customElements.define("hero-header", HeroHeader);

declare global {
    interface HTMLElementTagNameMap {
        'hero-header': HeroHeader
    }
}
