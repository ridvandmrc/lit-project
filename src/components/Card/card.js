import { LitElement, html, css } from 'lit';

export default class Card extends LitElement {
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
    `;
  }
}

window.customElements.define('my-card', Card);
