class Radio extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const radio = document.createElement('div');
    radio.classList.add('fields');
    const count = 4;
    radio.innerHTML = `
      <slot name="label"></slot>
    `;
    for (let i=1; i<= count; i++) {
      radio.innerHTML += `
          <div class="field">
            <div class="radio">
              <input type="radio" name="radio-group">
              <slot name="radio_label-${i}"></slot>
            </div>
          </div>
      `;
    }
    const styles = `
      .fields {
        width: 100%;
        display: flex;
        justify-content: flex-start;
        align-item: center;
      }
      .field {
        margin-left: 10px;
      }
      input {
        width: 16px;
        height: 16px;
        position: absolute;
        top: -2px;
      }
      .radio {
        display: flex;
        position: relative;
      }
      ::slotted([slot^="radio_label"]) {
        margin-left:  30px;
      }
    `;

    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(radio);
    shadow.appendChild(style);
  }
} 
customElements.define('custom-radio', Radio);