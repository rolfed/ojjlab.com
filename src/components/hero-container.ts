class HeroContainer extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
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
          text-white
          bg-cover
          px-6
        "
      >
        <h1>Test</h1>
        <p>Hello there want to become an amazing developer</p>
      </section>
    `;

  }
}

customElements.define("hero-container", HeroContainer);
