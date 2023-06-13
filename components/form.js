class Form extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const form = document.createElement('form');
    form.classList.add('form');
    let count = 2;
    for (let i=1; i<=count; i++ ) {
      form.innerHTML+= `
        <div class="field">
          <slot name="label-${i}"></slot>
          <slot name="input-${i}"></slot>
        </div>
      `
    }
    const field = document.createElement('div');
    field.classList.add('field');

    const checkboxForm = document.createElement('div');
    checkboxForm.innerHTML = `
      <input type="checkbox" tabindex="0">
      <slot name="check_label"></slot>
    `;

    field.appendChild(checkboxForm);
    form.appendChild(field);

    const btn = document.createElement('button');
    btn.classList.add('btn-form');
    btn.textContent = "Submit";
    form.appendChild(btn);

    const styles = `
      .form {
        display: flex;
        flex-direction: column;
      }
      .field {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
      }
      ::slotted([slot^="label"]) {
        margin-bottom: 6px;
      }
      ::slotted([slot^="input"]) {
        border: 1px solid var(--toggle-bg-color);
        padding: 8px;
        border-radius: 8px;
      }
      .btn-form {
        display: inline-block;
        width: 70px;
        height: 28px;
        align-self: flex-start;
        background: var(--form-btn-bg);
        border: 1px solid var(--form-btn-bg);
        border-radius: 4px;
        color: #fff;
        cursor: pointer;
       }
       .btn-form:hover {
        background: var(--form-hover-bg);
        border: 1px solid var(--form-hover-bg);
       }

    `;
    const style = document.createElement('style');
    style.textContent = styles;


    shadow.appendChild(form);
    shadow.appendChild(style);
  }
}
customElements.define('custom-form', Form);