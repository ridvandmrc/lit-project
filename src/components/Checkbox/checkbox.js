import { LitElement, html, css } from 'lit';

class MyCheckbox extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      label: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.checked = false;
  }

  render() {
    return html`
      <label for=${this.label}>
        <input id=${this.label} type="checkbox" ?checked=${this.checked} />
        <span> ${this.label}</span>
      </label>
    `;
  }

  static get styles() {
    return css`
      label {
        display: inline-flex;
        align-items: center;
        font-size: var(--font-size-lg);
        color: var(--label-color);
        font-weight: 500;
        gap: var(--spacing-xsm);
      }

      input[type='checkbox'] {
        width: 1rem;
        height: 1rem;
        accent-color: var(--primary-color); /* özelleştirilebilir */
        color: var(--text-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }
    `;
  }
}

customElements.define('my-checkbox', MyCheckbox);
