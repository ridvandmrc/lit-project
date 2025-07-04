import { html, LitElement, css } from 'lit';

export default class TableRow extends LitElement {
  static get properties() {
    return {
      selected: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.selected = false;
  }

  update(changedProperties) {
    super.update(changedProperties);
    this.selected
      ? this.classList.add('selected')
      : this.classList.remove('selected');
  }
  render() {
    return html`<tr>
      <slot></slot>
    </tr>`;
  }

  static get styles() {
    return css`
      :host {
        display: table-row;
      }

      :host(.selected) {
        background-color: var(--table-selected-bg);
      }
    `;
  }
}

window.customElements.define('my-table-row', TableRow);
