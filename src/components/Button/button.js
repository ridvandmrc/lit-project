import { css, html, LitElement } from 'lit';
import { ComponentNames } from '../../constants';

export class Button extends LitElement {
  static get properties() {
    return {
      variant: { type: String, reflect: true }, // contained | outlined | text
      color: { type: String, reflect: true }, // primary | secondary | disabled | text-color
      size: { type: String, reflect: true }, // small | medium | large
      icon: { type: String, reflect: true }, // icon name for start icon
    };
  }

  constructor() {
    super();
    this.variant = 'contained';
    this.color = 'primary';
    this.size = 'medium';
  }
  render() {
    return html`<button>
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
      :host {
        border-radius: var(--radius-sm);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        height: fit-content;
      }

      :host([color='primary']) button {
        color: var(--primary-color);
        background-color: var(--primary-color);
        border: 1px solid var(--primary-color);
      }

      :host([color='secondary']) button {
        color: var(--secondary-color);
        background-color: var(--secondary-color);
        border: 1px solid var(--secondary-color);
      }

      :host([color='disabled']) button {
        color: var(--disabled-color);
        background-color: var(--disabled-color);
        border: 1px solid var(--disabled-color);
      }

      :host([color='text-color']) button {
        color: var(--text-color);
        background-color: var(--text-color);
        border: 1px solid var(--text-color);
      }

      :host([variant='contained']) button {
        color: var(--text-white);
        border: none;
      }

      :host([variant='outlined']) button {
        background-color: transparent;
      }

      :host([variant='text']) button {
        background-color: transparent;
        border: none;
      }

      :host([size='small']) button {
        font-size: var(--font-size-sm);
        padding: var(--spacing-2xsm) var(--spacing-xsm);
      }

      :host([size='medium']) button {
        font-size: var(--font-size-md);
        padding: var(--spacing-xsm) var(--spacing-sm);
      }

      :host([size='large']) button {
        font-size: var(--font-size-lg);
        padding: var(--spacing-sm) var(--spacing-md);
      }

      button {
        cursor: pointer;
        outline: none;
        border-radius: inherit;
        display: inherit;
        align-items: inherit;
        justify-content: inherit;
        gap: var(--spacing-2xsm);
        width: inherit;
        height: inherit;
        color: inherit;
        background-color: inherit;
        border: none;
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.button, Button);
