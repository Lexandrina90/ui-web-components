class List extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const list = document.createElement('div');
    list.classList.add('list');
    list.innerHTML = `
      <slot name="item">
        <slot name="icon"></slot>
        <slot name="content">
          <slot name="header"></slot>
          <slot name="description"></slot>
        </slot>
      </slot>
    `;
    const styles = `
      .list {
        display: flex;
        flex-direction: column;
        max-width: 200px;
      }
      ::slotted([slot="item"]) {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--list-border-bg);
        padding: 5px;
      }   
    `;
    const slotItems = this.querySelectorAll('[slot="item"]');
    slotItems.forEach((item) => {
      const description = item.querySelector('[slot="description"]');
      description.style.color = 'gray';

      const content = item.querySelector('[slot="content"]');
      content.style.marginLeft = "10px";
    });
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(style);
    shadow.appendChild(list);
  }
}
customElements.define('custom-list', List);