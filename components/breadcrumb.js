class Breadcrumb extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const breadcrumb = document.createElement('div');
    breadcrumb.classList.add('breadcrumb');
    const numSections = 3;
    for (let i = 1; i <= numSections; i++) {
      breadcrumb.innerHTML += `
        <slot name="section-${i}"></slot>
        <slot name="arrow-${i}"></slot>
      `;
    }
    const styles = `
      .breadcrumb {
        display: flex;
        align-items: center;
      }
      ::slotted([slot^="section-"]) {
        margin-right: 5px;
        margin-left: 5px;
        text-decoration: none;
        color: var(--breadcrumb-color);
      }
      ::slotted([slot^="arrow-"]) {
        width: 4px;
        height: 4px;
        border-right: 2px solid gray;
        border-bottom: 2px solid gray;
        transform: rotate(-45deg);
        margin-right: 5px;
        margin-left: 5px;
      }
      ::slotted([slot^="section"].active) {
        font-weight: bold;
        color: var(--breadcrumb-active-color);
      }
    `;

    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(style);
    shadow.appendChild(breadcrumb);
  }
}
customElements.define('custom-breadcrumb', Breadcrumb);