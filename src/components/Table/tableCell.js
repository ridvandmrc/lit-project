import { html, LitElement, css } from 'lit';
import { ComponentNames } from '../../constants';

export default class TableCell extends LitElement {
  render() {
    return html`<td><slot></slot></td>`;
  }

  static get styles() {
    return css`
      :host {
        display: table-cell;
        padding: var(--spacing-lg) var(--spacing-md);
        border-bottom: 1px solid var(--border-color);
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.tableCell, TableCell);
