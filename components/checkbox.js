class Checkbox extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const checkbox = document.createElement('div');
    checkbox.classList.add('checkbox');
    const count = 3;
    for (let i=1; i<= count; i++) {
      checkbox.innerHTML += `
        <div class="item">
          <input type="checkbox">
          <slot name="label-${i}"></slot>
        </div>
      `
    } 
    const styles = `
      .checkbox{
        display: flex;
        flex-direction: column;
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(checkbox);
    shadow.appendChild(style);
  }
}
customElements.define('custom-checkbox', Checkbox);