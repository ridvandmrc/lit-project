import { LitElement, html, css } from 'lit';
import { ComponentNames } from '../../constants';

export default class Card extends LitElement {
  static get properties() {
    return {
      selected: { type: Boolean, reflect: true },
    };
  }

  render() {
    return html`<slot></slot>`;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        border: 1px solid var(--border-color);
        width: fit-content;
        padding: var(--spacing-md);
        background-color: var(--bg-white);
        box-shadow: var(--shadow-md);
      }
      :host([selected]) {
        background-color: var(--selected-bg);
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.card, Card);
