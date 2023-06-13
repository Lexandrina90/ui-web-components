class Table extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open'});
    const table = document.createElement('table');
    table.classList.add('table');
    const numTh = 2;
    table.innerHTML = `
    <thead>
      <tr>
        <th><slot name="title"></slot></th>
      </tr>
    </thead>
    <tbody>
      <tr>
      <td>
        <h4 class="image header>
          <slot name="image"></slot>
          <div class="content>
            <slot name="cell_header"></slot>
            <div class="sub header>
              <slot name="sub_header"></slot>
            </div>
          </div>
        </h4>
      </td>
      </tr>
    </tbody>

    `;
    const styles = `
    ::slotted([slot="title"]) {
      color: green;
    }
    `;
    const style = document.createElement('style');
    style.textContent = styles;

    shadow.appendChild(table);
    shadow.appendChild(style);
  }
}

customElements.define('custom-table', Table);
