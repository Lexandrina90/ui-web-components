class Message extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const message = document.createElement('div');
    message.classList.add('message');

    const closeIcon = document.createElement('i');
    closeIcon.classList.add('close-icon');
    message.appendChild(closeIcon);

    const imgClose = document.createElement('img');
    imgClose.src = "./img/message/close.svg";
    closeIcon.appendChild(imgClose);

    const headerSlot = document.createElement('slot');
    headerSlot.name = `header`;
    message.appendChild(headerSlot);

    const textSlot = document.createElement('slot');
    textSlot.name = `text`;
    message.appendChild(textSlot);

    closeIcon.onclick = () => {
      message.classList.add('close');
    }

    
    const styles = `
      .message {
        background: var(--message-bg);
        border: 1px solid var(--message-border);
        border-radius: 8px;
        width: 100%;
        padding: 12px;
        position: relative;
        display: block;
      }
      .message.close {
        display: none;
      }
      .close-icon {
        cursor:pointer;
      }
      img {
        width: 10px;
        height: 10px;
        position: absolute;
        right: 0;
        margin-right: 12px;
      }
      ::slotted([slot="header"]){
        color: var(--message-header);
        font-weight: bold;
        font-size: 14px;
      }
      ::slotted([slot="text"]){
        color: var(--message-header);
        font-size: 12px;
      }

    `;
    const style = document.createElement('style');
    style.textContent = styles;


    shadow.appendChild(style);
    shadow.appendChild(message);
  }
}
customElements.define('custom-message', Message);