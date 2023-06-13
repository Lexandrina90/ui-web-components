class Button extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const button = document.createElement('div');
    button.classList.add('button');
    button.innerHTML = `
      <slot name="hidden"></slot>
      <slot name="visible">
        <slot name="shop_icon">
         <i class="shop-icon" slot="shop_icon"></i>
        </slot>
      </slot>
    `;
    const styles = `
      .button {
        overflow: hidden;
        border: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        max-width: 40px;
        text-align:center;
        background: var(--button-bg);
        max-height: 20px;
        border-radius: 4px;
        padding: 10px;
        position: relative;
      }
      .button:hover {
        ::slotted(div[slot="hidden"]){
          transition: 0.3s;
          transform:translateY(55%);
        }
        ::slotted(div[slot="visible"]){
          transition: 0.3s;
          transform:translateY(200%);
        }
      }

      ::slotted(div[slot="hidden"]){
        transform:translateY(-200%);
      }
      ::slotted(div[slot="visible"]){
        transform:translateY(-35%);
      }
      

    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(button);
    shadow.appendChild(style);
  }
}
customElements.define('custom-button', Button);