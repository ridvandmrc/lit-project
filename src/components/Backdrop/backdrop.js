import { LitElement, html, css } from 'lit';

class Backdrop extends LitElement {
  static get properties() {
    return { open: { type: Boolean, reflect: true } };
  }

  constructor() {
    super();
    this.open = false;
  }

  render() {
    return html`
      <div class="backdrop ${this.open ? 'visible' : ''}">
        <slot></slot>
      </div>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: flex;
        visibility: hidden;
        justify-content: center;
        align-items: center;
        z-index: 999;
        opacity: 0;
        transition: opacity 0.3s ease-in-out;
        pointer-events: none;
      }

      :host([open]) {
        visibility: visible;
        opacity: 1;
        pointer-events: all;
      }

      .backdrop {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        display: inherit;
        justify-content: inherit;
        align-items: inherit;
        z-index: inherit;
      }
    `;
  }
}

customElements.define('my-backdrop', Backdrop);
