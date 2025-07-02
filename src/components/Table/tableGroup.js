import { html, LitElement, css } from 'lit';

const groupType = {
  body: html`<tbody>
    <slot></slot>
  </tbody>`,
  header: html`<thead>
    <slot></slot>
  </thead>`,
};

export default class TableGroup extends LitElement {
  static get properties() {
    return {
      type: { type: String }, // body | header
    };
  }

  constructor() {
    super();
    this.type = 'header'; // Default type
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.remove(this.type);
    this.classList.add(this.type);
  }

  updated(changedProperties) {
    this.classList.remove(changedProperties.get('type'));
    this.classList.add(this.type, this.color);
  }

  render() {
    return groupType[this.type] || groupType.header;
  }

  static get styles() {
    return css`
      :host {
        display: table-header-group;
      }
      :host(.body) {
        display: table-row-group;
      }
      :host(.header) {
        display: table-header-group;
      }
    `;
  }
}

window.customElements.define('my-table-group', TableGroup);
