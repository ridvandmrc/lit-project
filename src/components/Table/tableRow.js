import { html, LitElement, css } from 'lit';

export default class TableRow extends LitElement {
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
    `;
  }
}

window.customElements.define('my-table-row', TableRow);
