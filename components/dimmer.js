class Dimmer extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const btn = document.createElement('div');
    btn.textContent = "Show";
    btn.classList.add('btn');
    
    
    const dimmer = document.createElement('div');
    dimmer.classList.add('dimmer');

    const content = document.createElement('div');
    content.classList.add('content');

    const iconSlot = document.createElement('slot');
    iconSlot.name = `icon`;
    content.appendChild(iconSlot);

    const titleSlot = document.createElement('slot');
    titleSlot.name = `title`;
    content.appendChild(titleSlot);

    const subtitleSlot = document.createElement('slot');
    subtitleSlot.name = `subtitle`;
    content.appendChild(subtitleSlot);

    btn.onclick = (event) => {
      event.stopPropagation();
      dimmer.classList.add('visible');
      console.log('click');
    }
    window.onclick = () => {
      dimmer.classList.remove('visible');
    }

    dimmer.appendChild(content);

    const styles = `
      .btn {
        position: relative;
        display: inline-block;
        cursor: pointer;
        background: var(--dimmer-btn-bg);
        width: 50px;
        height: 20px;
        padding: 8px;
        border-radius: 8px;
        text-align: center;
        color: var(--dimmer-color);
      }
      .btn:hover {
        background: var(--dimmer-hover-bg);
      }
      .dimmer {
        position: fixed;
        transition: 0.3s;
        opacity: 0;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.8);
        text-align: center;
        vertical-align: middle;
        display: flex;
      }
      .dimmer.visible {
        opacity: 1;
      }
      .content {
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: var(--dimmer-message-color);
      }
      ::slotted([slot="title"]) {
        font-weight: bold;
        margin-bottom: 4px;
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(dimmer);
    shadow.appendChild(style);
    shadow.appendChild(btn);
  }
}
customElements.define('custom-dimmer', Dimmer); 