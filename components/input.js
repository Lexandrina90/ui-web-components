class Input extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});

    const input = document.createElement('div');
    input.classList.add('input');
    input.innerHTML = `
      <slot name="input"></slot>
    `;
    const styles = `
      ::slotted([slot="input"]){
        border: 1px solid var(--input-border-color);
        padding: 10px;
        border-radius: 4px;
      }
      ::slotted([slot="input"]:focus) {
        border-color: var(--input-focus-border-color);
        outline: none;
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(input);
    shadow.appendChild(style);
    
  }
}
customElements.define('custom-input', Input);