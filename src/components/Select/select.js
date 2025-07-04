import { LitElement, html, css } from 'lit';

class MySelect extends LitElement {
  static get properties() {
    return {
      label: { type: String },
      value: { type: Object },
      valueList: { type: Array },
      placeholder: { type: String },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.value = {};
    this.valueList = [];
    this.placeholder = 'Please enter Value';
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
    `;
  }
}

customElements.define('my-select', MySelect);
