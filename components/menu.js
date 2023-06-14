class Menu extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const menu = document.createElement('div');
    menu.classList.add('menu');
    const count = 3;
    for (let i=1; i<= count; i++) {
      const item = document.createElement('div');
      item.classList.add('item');

      const itemSlot = document.createElement('slot');
      itemSlot.name = `item-${i}`;
      item.appendChild(itemSlot);

      const firstItem = menu.querySelector('.item');
        if (firstItem) {
          firstItem.classList.add('active');
        }

        item.onclick = () => {
          const activeItems = shadow.querySelectorAll('.item.active');
          activeItems.forEach((activeItem) => {
            activeItem.classList.remove('active');
          });
          item.classList.add('active');
        };

      menu.appendChild(item);
    }
  
    // menu.innerHTML = `
    //   <slot name="item"></slot>
    // `;
    // const count = 3;
    // for (let i = 1; i <= count; i++) {
    //   menu.innerHTML += `
    //     <slot name="item-${i}"></slot>
    //   `;
    // }
    const styles = `
      .menu {
        display: flex;
        flex-direction: column;
        margin-right: 100px;
      }
      .item {
        cursor: pointer;
        margin-top: 4px;
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
      .item.active ::slotted([slot^="item"])::before {
        background: black;
      }
      .item.active ::slotted([slot^="item"]) {
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