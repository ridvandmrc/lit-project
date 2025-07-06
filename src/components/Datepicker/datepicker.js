import { LitElement, html, css } from 'lit';
import { ComponentNames } from '../../constants';

class MyDatepicker extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      value: { type: String },
      placeholder: { type: String },
      format: { type: String, reflect: true }, // e.g., 'DD/MM/YYYY' | 'YYYY-MM-DD'
      error: { type: Boolean, reflect: true },
      errorMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.value = '02/13/2021';
    this.placeholder = 'Please enter Value';
    this.format = 'DD/MM/YYYY';
  }

  getValue() {
    if (this.format === 'DD/MM/YYYY') {
      const [day, month, year] = this.value.split('/');
      return `${year}-${month}-${day}`;
    }
    return this.value;
  }

  onDateChange(e) {
    const [year, month, day] = e.target.value.split('-');
    this.dispatchEvent(
      new CustomEvent('dateChange', {
        detail:
          this.format === 'DD/MM/YYYY'
            ? `${day}/${month}/${year}`
            : e.target.value,
      })
    );
  }

  render() {
    return html`
      <label for=${this.label}>${this.label}</label>
      <div class="input-wrapper">
        <input
          id=${this.label}
          value=${this.getValue()}
          type="date"
          placeholder=${this.placeholder}
          @input=${this.onDateChange}
        />
        <my-icon name="calendar"></my-icon>
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

      input {
        width: 100%;
        padding: var(--spacing-xsm) var(--spacing-sm);
        border: 1px solid var(--input-border-color);
        border-radius: var(--radius-sm);
        font-size: var(--font-size-lg);
        color: var(--text-color);
        outline: none;
        box-sizing: border-box;
        background-color: var(--bg-white);
      }
      .input-wrapper {
        position: relative;
      }
      my-icon {
        background-color: var(--bg-white);
        position: absolute;
        right: 10px;
        top: 8px;
        pointer-events: none;
        color: var(--bg-white);
      }

      :host([error]) input {
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

customElements.define(ComponentNames.components.datePicker, MyDatepicker);
