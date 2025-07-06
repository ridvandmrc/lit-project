import { html, LitElement, css } from 'lit';
import { ComponentNames } from '../../constants';

export default class Table extends LitElement {
  render() {
    return html`<table>
      <slot></slot>
    </table>`;
  }

  static get styles() {
    return css`
      :host {
        display: table;
        background-color: var(--bg-white);
        width: 100%;
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.table, Table);
