import { LitElement, css, html } from 'lit';

const type = Object.freeze(['title', 'subtitle', 'paragraph', 'caption', '']);
const color = Object.freeze(['primary', 'text', 'disabled']);

const elements = {
  title: html`<h1><slot></slot></h1>`,
  subtitle: html`<h6><slot></slot></h6>`,
  paragraph: html`<p><slot></slot></p>`,
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
      type: { type: String }, // title | subtitle | paragraph | caption
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

      :host(.title) {
        font-size: var(--font-size-xl);
        font-weight: 550;
      }
      :host(.subtitle) {
        font-size: var(--font-size-lg);
        font-weight: 550;
      }
      :host(.paragraph) {
        font-weight: 500;
        font-size: var(--font-size-md);
        line-height: 1.5;
        letter-spacing: 1px;
      }
      :host(.caption) {
        font-size: var(--font-size-sm);
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

      h1,
      h6,
      p {
        all: unset;
      }
    `;
  }
}

window.customElements.define('my-typography', Typography);
