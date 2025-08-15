import "./nav-item";

class NavContainer extends HTMLElement {
  private LOCATIONS = [
      { location: "home", label: "Home" },
      { location: "about", label: "About" },
      { location: "schedule", label: "Schedule" },
      { location: "contact", label: "Contact Us" },
      { location: "trial", label: "Schedule Trial Class" }
  ];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public connectedCallback() {
    this.render();
  }

  public render(): void {
    const navItemsHtml: string = this.LOCATIONS
      .map(({ location, label }) => `
        <nav-item 
          location="${location}" 
          label="${label}"
        ></nav-item>
      `)
      .join("");

    this.shadowRoot!.innerHTML = `
      <nav>
        ${navItemsHtml}
      </nav>
    `;

  }
}

customElements.define("nav-container", NavContainer);
