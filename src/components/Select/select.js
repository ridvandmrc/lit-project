import { LitElement, html, css } from 'lit';

class MySelect extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      value: { type: Object },
      valueList: { type: Array },
      placeholder: { type: String },
      error: { type: Boolean, reflect: true },
      errorMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.value = {};
    this.valueList = [];
    this.placeholder = '';
  }

  onSelectionChange(e) {
    this.dispatchEvent(
      new CustomEvent('selectionChange', {
        detail: {
          value: e.target.value,
          label: e.target.options[e.target.selectedIndex].text,
        },
      })
    );
  }

  render() {
    return html`
      <label for=${this.label}>${this.label}</label>
      <div class="input-wrapper">
        <select
          id=${this.label}
          placeholder=${this.placeholder}
          @input=${this.onSelectionChange}
        >
          <option value="">${this.placeholder}</option>

          ${this.valueList.map(
            ({ label, value }) =>
              html`<option
                value=${value}
                ?selected=${this.value.value === value}
              >
                ${label}
              </option>`
          )}
        </select>
        <my-icon name="chevron-right" color="text" size="small"></my-icon>
      </div>
      <my-typography
        class=${`error-message  ${this.error && this.errorMessage ? 'visible' : ''} `}
        type="caption"
        color="error"
      >
        ${this.errorMessage}
      </my-typography>
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

      select {
        width: 100%;
        padding: var(--spacing-xsm) var(--spacing-sm);
        border: 1px solid var(--input-border-color);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-lg);
        color: var(--text-color);
        outline: none;
        appearance: none;
        box-sizing: border-box;
      }
      .input-wrapper {
        position: relative;
      }
      my-icon {
        background-color: white;
        position: absolute;
        right: 15px;
        top: 8px;
        pointer-events: none;
        color: var(--icon-color);
        transform: rotate(90deg);
      }
      :host([error]) select {
        border-color: var(--error-color, red);
      }

      .error-message {
        opacity: 0;
        margin: var(--spacing-2xsm) 0 0 var(--spacing-2xsm);
        transition: opacity 0.3s;
      }
      .error-message.visible {
        opacity: 1;
      }
    `;
  }
}

customElements.define('my-select', MySelect);
