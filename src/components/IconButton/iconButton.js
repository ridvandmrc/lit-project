import { LitElement, html, css } from 'lit';

export default class IconButton extends LitElement {
  static get properties() {
    return {
      icon: { type: String }, // icon name
      size: { type: String }, // small | medium | large
      color: { type: String }, // primary | secondary | disabled
    };
  }

  constructor() {
    super();
    this.icon = 'calendar';
    this.size = 'medium';
    this.color = 'primary';
  }

  render() {
    return html`
      <button class="${this.variant}">
        <my-icon
          name="${this.icon}"
          color="${this.color}"
          size="${this.size}"
        ></my-icon>
      </button>
    `;
  }

  static get styles() {
    return css`
      button {
        cursor: pointer;
        outline: none;
        border: none;
        background: transparent;
        padding: var(--spacing-xsm);
        margin: 0;
      }
    `;
  }
}

window.customElements.define('my-icon-button', IconButton);
