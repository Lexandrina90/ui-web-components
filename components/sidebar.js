class Sidebar extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const menu = document.createElement('div');
    menu.classList.add('menu');
    const span = document.createElement('span');
    menu.appendChild(span);
    shadow.appendChild(menu);

    const sidebar = document.createElement('div');
    sidebar.classList.add('sidebar');
    const count = 3;
    for (let i=1; i<= count;i++) {
      const item = document.createElement('a');
      item.classList.add('item');
      sidebar.appendChild(item);

      const icon = document.createElement('i');
      icon.classList.add('icon');
      item.appendChild(icon);

      const imageSlot = document.createElement('slot');
      imageSlot.name = `image-${i}`;
      icon.appendChild(imageSlot);

      const textSlot = document.createElement('slot');
      textSlot.name = `text-${i}`;
      item.appendChild(textSlot);
    }

    menu.onclick = () => {
      sidebar.classList.toggle('visible');
    }

    const styles = `
      .menu {
        position: relative;
        cursor: pointer;
        padding-left: 16px;
      }
      .menu > span {
        position: absolute;
        width: 30px;
        height: 2px;
        background: var(--sidebar-bg);
      }
      .menu > span::before {
        content: '';
        position: absolute;
        top: 8px;
        width: 30px;
        height: 2px;
        background: var(--sidebar-bg);
      }
      .menu > span::after {
        content: '';
        top: 16px;
        position: absolute;
        width: 30px;
        height: 2px;
        background: var(--sidebar-bg);
      }
      .sidebar {
        display: flex;
        flex-direction: column;
        position: fixed;
        left: 0;
        top: 0;
        padding: 16px;
        transition: 0.3s;
        transform: translateX(-100%);
        height: 100%;
        max-height: 100%;
        z-index: 100;
        background: var(--sidebar-bg);
        opacity: 0;
      }
      .item {
        display: flex;
        flex-direction: column;
        position: relative;
      }
      .item:not(:first-child) {
        margin-top: 16px;
      }
      .sidebar.visible {
        opacity: 1;
        transform: translateX(0);
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(sidebar);
    shadow.appendChild(style);
  }
}
customElements.define('custom-sidebar', Sidebar);
