import { css, html, LitElement } from 'lit';

export class Button extends LitElement {
  static get properties() {
    return {
      variant: { type: String }, // contained | outlined | text
      color: { type: String }, // primary | secondary | disabled
      size: { type: String }, // small | medium | large
      icon: { type: String }, // icon name for start icon
    };
  }

  constructor() {
    super();
    this.variant = 'contained';
    this.color = 'primary';
    this.size = 'medium';
  }
  render() {
    return html`<button class="${this.variant} ${this.color} ${this.size}">
      ${this.icon
        ? html`<my-icon
            name="${this.icon}"
            size=${this.size}
            color="${this.variant === 'contained' ? 'white' : this.color}"
          ></my-icon>`
        : ''}
      <slot></slot>
    </button>`;
  }

  static get styles() {
    return css`
      button {
        cursor: pointer;
        outline: none;
        border-radius: var(--radius-sm);
        display: inline-flex;
        align-items: center;
        gap: var(--spacing-2xsm);
      }

      .primary {
        color: var(--primary-color);
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
      }

      .secondary {
        color: var(--secondary-color);
        background-color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
      }

      .disabled {
        color: var(--disabled-color);
        background-color: var(--disabled-color);
        border: 1px solid var(--disabled-color);
      }

      .contained {
        color: var(--text-white);
        border: none;
      }

      .outlined {
        background-color: transparent;
      }

      .text {
        background-color: transparent;
        border: none;
      }

      .small {
        font-size: var(--font-size-sm);
        padding: var(--spacing-2xsm) var(--spacing-xsm);
      }

      .medium {
        font-size: var(--font-size-md);
        padding: var(--spacing-xsm) var(--spacing-sm);
      }

      .large {
        font-size: var(--font-size-lg);
        padding: var(--spacing-sm) var(--spacing-md);
      }
    `;
  }
}

window.customElements.define('my-button', Button);
