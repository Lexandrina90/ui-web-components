class Card extends HTMLElement {
  constructor() {
    super();
  }
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-image">
        <slot name="image"></slot>
      </div>
      <div class="content">
      <slot name="header"></slot>
      <slot name="description"></slot>
      </div>
    `;
    const styles = `
      .card {
        background: var(--card-bg);
        border: 1px solid #7a7777;
        max-width: 290px;
        max-height: 100%;
        display: flex;
        flex-direction: column;
      }
      .card-image {
        align-self: center;
        padding-top: 10px;
      }
      .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        margin-top: 20px;
        background: var(--card-content-bg);
        padding: 10px;
      }
      ::slotted(div[slot="header"]){
        font-weight: bold;
        margin-bottom: 10px;
      }
      ::slotted(div[slot="description"]) {
        margin-bottom: 10px;
      }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    // const sheet = new CSSStyleSheet();
    // sheet.replaceSync(
    //   `:host {
    //     --card-background: #617e7e;
    //   }
    //  `);

    shadow.appendChild(card);
    shadow.appendChild(style);
    // shadow.adoptedStyleSheets = [sheet];
  }
}
customElements.define('custom-card', Card);