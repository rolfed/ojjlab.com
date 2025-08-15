class NavItem extends HTMLElement {
  private static LOCATION_ATTRIBUTE = 'location';
  private static LABEL_ATTRIBUTE = 'label';

  static get observedAttributes() {
    return [
      NavItem.LOCATION_ATTRIBUTE,
      NavItem.LABEL_ATTRIBUTE
    ]
  }

  get location(): string {
    return this.getAttribute(NavItem.LOCATION_ATTRIBUTE) ?? "#";
  }

  set location(value: string) {
    this.setAttribute(NavItem.LOCATION_ATTRIBUTE, value)
  }

  get label(): string {
    return this.getAttribute(NavItem.LABEL_ATTRIBUTE) ?? "";
  }

  set label(value: string) {
    this.setAttribute(NavItem.LABEL_ATTRIBUTE, value)
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  public connectedCallback() {
    this.render();
  }

  public render(): void {
    this.shadowRoot!.innerHTML = `
      <a href="${this.location}" part="link">${this.label}</a>
    `;
  }

}

customElements.define("nav-item", NavItem);
