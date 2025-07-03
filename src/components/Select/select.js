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
    this.value = { value: 'test1', label: 'Test' };
    this.valueList = [
      { value: 'test1', label: 'Test1' },
      { value: 'test2', label: 'Test2' },
      { value: 'test3', label: 'Test3' },
      { value: 'test4', label: 'Test4' },
    ];
    this.placeholder = 'Please enter Value';
  }

  render() {
    return html`
      <label for=${this.label}>${this.label}</label>
      <div class="input-wrapper">
        <select id=${this.label} placeholder=${this.placeholder}>
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
        transform:rotate(90deg);
      }
    `;
  }
}

customElements.define('my-select', MySelect);
