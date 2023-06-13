class Label extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const label = document.createElement('div');
    label.classList.add('label');
    label.innerHTML = `
      <slot name="label"></slot>
    `;
    const styles = `
      .label {
        width: 80px;
        height: 15px;
        background: var(--label-bg);
        margin-left: 15px;
        position: relative;
        border-radius: 0px 4px 4px 0px;
        padding: 5px;
        padding-left: 10px;
        display: flex;
        align-items: center;
        color: #fff;
      }
      .label::before {
        content: '';
        position:absolute;
        top: 50%;
        left: -15px;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 12.5px 15px 12.5px 0;
        border-color: transparent var(--label-bg) transparent transparent;
      }
      .label::after {
        content: '';
        position: absolute;
        top: 50%;
        left: -5px;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        background-color: #fff;
        border-radius: 50%;
      }
      
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(label);
    shadow.appendChild(style);
  }
}
customElements.define('custom-label', Label);