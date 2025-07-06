import { html, LitElement, css } from 'lit';
import { ComponentNames } from '../../constants';

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
        background-color: var(--selected-bg);
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.tableRow, TableRow);
