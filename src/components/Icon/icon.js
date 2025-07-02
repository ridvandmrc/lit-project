import { css, html, LitElement, unsafeCSS } from 'lit';

import font from '../../icons.css?inline';

export class Icon extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      color: { type: String }, // primary | secondary | disabled | white
      size: { type: String }, // small | medium | large
    };
  }

  constructor() {
    super();
    this.name = 'calendar';
    this.color = 'primary';
    this.size = 'medium';
  }
  render() {
    return html`<i class="icon-${this.name} ${this.size} ${this.color}"></i>`;
  }

  static get styles() {
    return css`
      ${unsafeCSS(font)}

      .small {
        font-size: 1rem;
      }
      .medium {
        font-size: 1.2rem;
      }
      .large {
        font-size: 2rem;
      }

      .primary {
        color: var(--primary-color);
      }
      .secondary {
        color: var(--text-color);
      }
      .disabled {
        color: var(--disabled-color);
      }

      .white {
        color: var(--text-white);
      }
    `;
  }
}

window.customElements.define('my-icon', Icon);
