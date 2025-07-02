import { LitElement, css, html } from 'lit';

const type = Object.freeze(['header', 'p', 'caption']);
const color = Object.freeze(['primary', 'text', 'disabled']);

const elements = {
  header: html`<h1><slot></slot></h1>`,
  text: html`<p><slot></slot></p>`,
  caption: html`<span><slot></slot></span>`,
};

/**
 * @desc An example element.
 *
 * @slot - This element has a slot
 * @csspart Typography - The button
 */

export class Typography extends LitElement {
  static get properties() {
    return {
      type: { type: String }, // header | text | caption
      color: { type: String, reflect: true }, // primary | text | disabled
    };
  }
  constructor() {
    super();
    this.type = type[0];
    this.color = color[0];
  }

  connectedCallback() {
    super.connectedCallback();
    this.classList.remove(this.type, this.color);
    this.classList.add(this.type);
    this.classList.add(this.color);
  }

  updated(changedProperties) {
    this.classList.remove(
      changedProperties.get('type'),
      changedProperties.get('color')
    );
    this.classList.add(this.type, this.color);
  }

  render() {
    return elements[this.type] || elements.text;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        color: var(--primary-color);
        font-family: var(--font-family);
      }

      :host(.header) {
        font-size: 1rem;
      }
      :host(.p) {
        font-weight: 400;
        font-size: 0.85rem;
        line-height: 1.5;
        letter-spacing: 0.00938em;
      }      
      :host(.caption) {
        font-size: 0.75rem;
      }

      :host(.primary) {
        color: var(--primary-color);
      }
      :host(.text) {
        color: var(--text-color);
      }
      :host(.disabled) {
        color: var(--disabled-color);
      }
    `;
  }
}

window.customElements.define('my-typography', Typography);
