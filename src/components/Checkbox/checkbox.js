import { LitElement, html, css } from 'lit';
import { ComponentNames } from '../../constants';

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

  toggleChange(e) {
    this.checked = e.target.checked;
    this.dispatchEvent(
      new CustomEvent('selectChange', {
        detail: { checked: this.checked },
      })
    );
  }

  render() {
    return html`
      <label for=${this.label}>
        <input
          id=${this.label}
          type="checkbox"
          .checked=${this.checked}
          @change=${(e) => this.toggleChange(e)}
        />
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
        color: var(--text-color);
        accent-color: var(--primary-color);
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }
    `;
  }
}

customElements.define(ComponentNames.components.checkbox, MyCheckbox);
