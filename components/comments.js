class Comments extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const comments = document.createElement('div');
    comments.classList.add('comments');

    const header = document.createElement('h3');
    header.classList.add('header');
    header.textContent = "Comments";
    comments.appendChild(header);

    const count = 3;
    for (let i =1; i <= count; i++) {
      const comment = document.createElement('div');
      comment.classList.add('comment');
      

      const avatarSlot = document.createElement('slot');
      avatarSlot.name = `avatar-${i}`;
      comment.appendChild(avatarSlot);

      const content = document.createElement('div');
      content.classList.add('content');
      comment.appendChild(content);

      const top = document.createElement('div');
      top.classList.add('top');
      content.appendChild(top);

      const bottom = document.createElement('div');
      bottom.classList.add('bottom');
      content.appendChild(bottom);


      const authorSlot = document.createElement('slot');
      authorSlot.name = `author-${i}`;
      top.appendChild(authorSlot);

      const metadata = document.createElement('div');
      metadata.classList.add('metadata');
      top.appendChild(metadata);

      const dateSlot = document.createElement('slot');
      dateSlot.name = `date-${i}`;
      metadata.appendChild(dateSlot);

      const textSlot = document.createElement('slot');
      textSlot.name = `text-${i}`;
      bottom.appendChild(textSlot);

      const actions = document.createElement('div');
      actions.classList.add('actions');
      bottom.appendChild(actions);

      const reply = document.createElement('a');
      reply.classList.add('reply');
      reply.textContent = "Reply";
      actions.appendChild(reply);

      comments.appendChild(comment);
    }
    
    const formCom = document.createElement('form');
    formCom.classList.add('form-com');

    const fieldCom = document.createElement('div');
    fieldCom.classList.add('field-com');
    formCom.appendChild(fieldCom);

    const textArea = document.createElement('textarea');
    fieldCom.appendChild(textArea);

    const btnCom = document.createElement('div');
    btnCom.classList.add('btn-com');
    btnCom.textContent = "Add Reply";



    const styles = `
      .comments {
        margin-bottom: 16px;
      }
      .comment {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        margin-bottom: 8px;
      }
      .content {
        margin-left: 16px;
        display: flex;
        flex-direction: column;
      }
      .top {
        display: flex;
        flex-direction: row;
      }
      ::slotted([slot^="date-"]) {
        color: var(--slider-check-hover);
        font-size: 12px;
      }
      .metadata {
        margin-left: 8px;
      }
      ::slotted([slot^="author-"]) {
        font-weight: 700;
        font-size: 16px;
      }
      ::slotted([slot^="text-"]) {
        font-size: 14px;
      }
      .reply {
        color: var(--slider-check-hover);
        font-size: 12px;
        flex-wrap: wrap;
      }
      .field-com {
        margin-bottom: 16px;
      }
      textarea {
        width: 100%;
        height: 100px;
      }
     .btn-com {
      width: 100px;
      heitgh: 30px;
      padding: 8px;
      text-align: center;
      background: var(--breadcrumb-color);
      border-radius: 4px;
      color: #fff;
      cursor:pointer;
     }
     .btn-com:hover {
      background: var(--breadcrumb-active-color);
     }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(comments);
    shadow.appendChild(formCom);
    shadow.appendChild(btnCom);
    shadow.appendChild(style);
  }
}
customElements.define('custom-comments', Comments);