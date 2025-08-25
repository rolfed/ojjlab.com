// import gsap from 'gsap';
// import markup from './sweep-reveal.html?raw';
// import css from '../style.css?inline';
//
// type Dir = "rtl" | "ltr";
//
//
// class SweepReveal extends HTMLElement {
//     private root: ShadowRoot;
//     private timeline?: gsap.core.Timeline;
//
//     private static attributes: Array<string> = [
//         "delay",
//         "duration",
//         "thickness",
//         "color",
//         "dir"
//     ];
//     numAttr: any;
//
//     static get observedAttributes() {
//         return this.attributes;
//     }
//
//     private static sheet: CSSStyleSheet = (() => {
//         const sheet = new CSSStyleSheet();
//         sheet.replaceSync(css);
//         return sheet;
//     })();
//
//     private timeline?: gsap.core.Timeline;
//     private ctx?: gsap.Context;
//     private resizeObserver = new ResizeObserver(() => this.rebuild());
//
//     private bar!: HTMLElement;
//     private text!: HTMLElement;
//
//     constructor() {
//         super();
//         this.root = this.attachShadow({ mode: 'open' });
//         this.attributes.foreEach((property) => this.upgradeProperty(property as any));
//     }
//
//     public adoptedCallback(): void {
//         if (this.shadowRoot) {
//             this.shadowRoot.adoptedStyleSheets = [SweepReveal.sheet];
//         }
//     }
//
//     public connedtedCallback(): void {
//         const childNodesLength = this.shadowRoot!.childNodes.length;
//         if (childNodesLength > 0) {
//             this.resizeObserver.observe(this);
//             this.rebuild();
//             return;
//         }
//
//         // Stamp HTML + adopt Tailwind once
//         this.shadowRoot!.adoptedStyleSheets = [SweepReveal.sheet];
//         const template = document.createElement("template");
//         template.innerHTML = markup;
//         this.shadowRoot!.append(template.content.cloneNode(true));
//         this.cacheRefs();
//     }
//
//     public attributeChangedCallback(
//         name: string,
//         oldValue: string | null,
//         newValue: string | null
//     ): void {
//         if (oldValue !== newValue && this.isConnected) {
//             this.rebuild();
//         }
//     }
//
//     // Public api
//     public play(): void {
//         this.timeline?.restart(true);
//     }
//
//     public close(): void {
//         this.timeline?.reverse();
//     }
//
//     // ---- Properties (reflect to attributes)
//     get delay() { return this.numAttr("delay", 0); }
//     set delay(value: number) { this.setNumAttr("delay", value); }
//
//     get duration() { return this.numAttr("duration", 0.9); }
//     set duration(value: number) { this.setNumAttr("duration", value); }
//
//     get thickness() { return this.getAttribute("thickness") ?? "12px"; } // px or %
//     set thickness(value: string) { this.setAttribute("thickness", value); }
//
//     get color() { return this.getAttribute("color") ?? ""; }             // any CSS color or valuear()
//     set color(value: string) { this.setAttribute("color", value); }
//
//     get dir(): Dir { return (this.getAttribute("dir") as Dir) || "rtl"; }
//     set dir(value: Dir) { this.setAttribute("dir", value); }
//
//     private rebuild(): void {
//         this.destroy();
//
//         const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
//
//         if (reduce) {
//             gsap.set(this.text, { clearProps: "all" });
//             gsap.set(this.bar, { opacity: 0, clearProps: "all" });
//             return;
//         }
//
//         if (this.color) {
//             this.bar.style.setProperty("--sweep-color", this.color);
//         }
//
//     }
// }
