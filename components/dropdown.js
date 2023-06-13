class Dropdown extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const dropdown = document.createElement('div');
    dropdown.classList.add('dropdown');
    const count = 4;

    const input = document.createElement('input');
    input.type = "hidden";
    input.name="hero";
    dropdown.appendChild(input);

    const icon = document.createElement('i');
    icon.classList.add('dropdown-icon');
    dropdown.appendChild(icon);

    const selectSlot = document.createElement('slot');
    selectSlot.name = `select`;
    dropdown.appendChild(selectSlot);
    let selectedItem = null; 

    const menu = document.createElement('div');
    menu.classList.add('menu');
    for (let i=1; i<= count; i++) {
      const item = document.createElement('div');
      item.classList.add('item');

      const slot = document.createElement('slot');
      slot.name = `image-${i}`;
      item.appendChild(slot);

      const slotHero = document.createElement('slot');
      slotHero.name = `hero-${i}`;
      item.appendChild(slotHero);

      item.onclick = () => {
        if (selectedItem) {
          selectedItem.replaceWith(item); 
          menu.appendChild(selectedItem);
        } else {
          selectSlot.replaceWith(item); 
        }
        selectedItem = item; 
        selectedItem.style.display = "flex";
        selectedItem.style.alignItems = "center";
        dropdown.classList.remove('open');
      };

      icon.onclick = () => {
        dropdown.classList.toggle('open');
        console.log('click');
      }
      menu.appendChild(item);

    }
    dropdown.appendChild(menu);


    const styles = `
      .dropdown {
        position: relative;
        border: 1px solid var(--slider-check-hover);
        padding: 12px;
        width: 100%;
        border-radius: 4px;
        height: 20px;
        cursor: pointer;
        top: -12px;
        overflow: hidden;
      }
      .dropdown:hover {
        border-color: gray;
      }
      .dropdown .dropdown-icon {
        position: absolute;
        top: 10px;
        right: 12px;
        width: 20px;
        height: 20px;
        background: url('./img/dropdown/dropdown.svg') no-repeat center center;
        cursor: pointer;
      }
      .dropdown .menu {
        margin-top: 4px;
        top: 100%;
        left: 0;
        width: 100%;
        z-index: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        opacity: 0;
        transition: 0.3s;
      }
      .dropdown.open {
        height: 100%;
        border-color:  var(--input-border-color);
      }
      .dropdown.open .menu {
        opacity:1;
        transition: 0.3s;
      }
      .menu .item{
        margin-top: 10px;
        display: flex;
        justify-content: flex-start;
        align-items: center;

      }
      ::slotted(div[slot="select"]) {
        color: var(--slider-check-hover);
      }
      ::slotted([slot^="hero"]) {
        margin-left: 4px;
      }
      .dropdown.open .item:hover {
        background: var(--dropdown-hover-item); 
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(dropdown);
    shadow.appendChild(style);
  }
}
customElements.define('custom-dropdown', Dropdown);