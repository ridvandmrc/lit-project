import { LitElement, html, css } from 'lit';

class MyInput extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      type: { type: String, reflect: true }, // text | password | email | number
      value: { type: String,reflect: true },
      placeholder: { type: String },
      readonly: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.type = 'text';
    this.value = '';
    this.placeholder = 'Please enter Value';
    this.readonly = false;
  }

  update(changedProperties) {
    super.update(changedProperties);
  }

  render() {
    return html`
      <label for=${this.label}>${this.label}</label>
      <input
        id=${this.label}
        .value=${this.value}
        type=${this.type}
        .readOnly=${this.readonly}
        @input=${(e) => {
          this.value = e.target.value;
          this.dispatchEvent(
            new CustomEvent('inputChange', { detail: this.value })
          );
        }}
        autocomplete="off"
        placeholder=${this.placeholder}
      />
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        max-width: 15rem;
      }

      label {
        display: block;
        margin-bottom: 4px;
        font-size: var(--font-size-md);
        color: var(--label-color);
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: var(--spacing-xsm) var(--spacing-sm);
        border: 1px solid var(--input-border-color);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-lg);
        color: var(--text-color);
        outline: none;
        box-sizing: border-box;
      }

      input:read-only {
        pointer-events: none;
        background-color: var(--disabled-color);
        user-select: none;
      }
    `;
  }
}

customElements.define('my-input', MyInput);
