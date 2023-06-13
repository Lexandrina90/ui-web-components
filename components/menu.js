class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const menu = document.createElement('div');
    menu.classList.add('menu');
    menu.innerHTML = `
      <slot name="item"></slot>
    `;
    const count = 3;
    for (let i = 1; i <= count; i++) {
      menu.innerHTML += `
        <slot name="item-${i}"></slot>
      `;
    }
    const styles = `
      .menu {
        display: flex;
        flex-direction: column;
        margin-right: 100px;
      }
      ::slotted([slot^="item-"]) {
        margin-bottom: 8px;
        position: relative;
      }
      ::slotted([slot^="item-"])::before {
        content: '';
        position: absolute;
        left: 150px;
        width: 2px;
        height: 145%;
        background: var(--list-border-bg);
      }
      ::slotted([slot^="item"].active)::before {
        background: black;
      }
      ::slotted([slot^="item"].active) {
        font-weight: bold;
      }
      
    `;

    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(style);
    shadow.appendChild(menu);
  }
}
customElements.define('custom-menu', Menu);