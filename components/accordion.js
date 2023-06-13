class Accordion extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const accordion = document.createElement('div');
    accordion.classList.add('accordion');
    const count = 3;
    for (let i =1; i<= count; i++) {
    //   accordion.innerHTML += `
    //     <div class="title">
    //       <i class="icon">
    //         <img src="./img/accordion/dropdown_icon.png">
    //       </i>
    //       <slot name="title-${i}"></slot>
    //     </div>
    //     <slot name="content-${i}"></slot>
    // `;
    const title = document.createElement('div');
    title.classList.add('title');

    const icon = document.createElement('i');
    icon.classList.add('icon');
    const img = document.createElement('img');
    img.src = './img/accordion/dropdown_icon.png';
    icon.appendChild(img);
    const content = document.createElement('div');
    content.classList.add('content');
    // content.classList.add('active');

    icon.onclick = () => {
      icon.classList.toggle('dropdown');
      content.classList.toggle('active');
      title.classList.toggle('border');
    };

    title.appendChild(icon);

    const titleSlot = document.createElement('slot');
    titleSlot.name = `title-${i}`;
    title.appendChild(titleSlot);

    const contentSlot = document.createElement('slot');
    contentSlot.name = `content-${i}`;
    content.appendChild(contentSlot);

    accordion.appendChild(title);
    accordion.appendChild(content);
    }

    const styles = `
      .accordion {
        border: 1px solid var(--list-border-bg);
        border-radius: 8px;
        width: 400px;
      }
      .title {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        padding: 16px;
      }
      .icon {
        margin-right: 10px;
        margin-top: 2px;
      }
      ::slotted(div[slot^="content"]) {
        display: none;
        padding: 16px;
      }
      .icon.rotated {
        transform: rotate(90deg);
      }
      .icon.dropdown{
        transform: rotate(90deg);
      }
      div.content:not(:last-child){
        border-top: 1px solid var(--list-border-bg);
      }
      div.content.active ::slotted(div[slot^="content"]) {
        display: block;
      }
      div.content.active{
        border-top: none;
      }
      div.content.active:not(:last-child) {
        border-bottom: 1px solid var(--list-border-bg);
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(accordion);
    shadow.appendChild(style);
  }
  
} 
customElements.define('custom-accordion', Accordion);