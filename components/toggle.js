class Toggle extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const toggle = document.createElement('div');
    toggle.classList.add('toggle');
    const input = document.createElement('input');
    input.type = "checkbox";
    input.name="public";
    toggle.appendChild(input);

    const span = document.createElement('span');
    toggle.appendChild(span);

    const toggleSlot = document.createElement('slot');
    toggleSlot.name = "toggle";
    toggle.appendChild(toggleSlot);

    span.onclick = () => {
        span.classList.toggle('active');
    };
    const styles = `
      .toggle {
        display: flex;
        align-items: center;
      }
      input {
        visibility: hidden;
      }
      ::slotted([slot="toggle"]) {
        margin-left: 50px;
      }
      span {
        position: relative;
        cursor:pointer;
        transition: 0.3s;
      }
      span::before {
        content: ' ';
        position: absolute;
        width: 58px;
        height: 21px;
        background: var(--toggle-bg-color);
        left: -20px;
        top: -10px;
        border-radius: 16px;
        border: 1px solid var(--toggle-bg-color);
      }
      span:hover::before {
        background: var(--slider-check-hover);
      }
      span.active::before  {
        background: var(--toggle-bg-active);
      }
      span::after {
        content: ' ';
        position: absolute;
        width: 21px;
        height: 21px;
        background: var(--toggle-color);
        border-radius: 50%;
        border: 1px solid var(--toggle-bg-color);
        left: -21px;
        top: -10px;
        transition: 0.3s;
      }
      span.active::after {
        transition: 0.3s;
        left: 18px;
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(toggle);
    shadow.appendChild(style);
  }
}
customElements.define('custom-toggle', Toggle);