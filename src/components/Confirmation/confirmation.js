import { LitElement, html, css } from 'lit';

class Confirmation extends LitElement {
  static get properties() {
    return {
      open: { type: Boolean, reflect: true },
      message: { type: String, reflect: true },
    };
  }

  constructor() {
    super();
    this.open = false;
  }

  onProceed() {
    this.dispatchEvent(new CustomEvent('proceed'));
    this.cancelCard();
  }

  cancelCard() {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  render() {
    return html`<my-backdrop ?open=${this.open}>
      <my-card>
        <section class="header">
          <my-typography type="title" color="primary">
            Are you Sure?
          </my-typography>
          <my-icon-button
            @click=${this.cancelCard}
            icon="cancel"
            size="large"
          ></my-icon-button>
        </section>
        <my-typography type="paragraph" color="text">
          ${this.message}
        </my-typography>
        <section class="actions">
          <my-button variant="contained" @click=${this.onProceed}>
            Proceed
          </my-button>
          <my-button
            variant="outlined"
            color="secondary"
            @click=${this.cancelCard}
          >
            Cancel
          </my-button>
        </section>
      </my-card>
    </my-backdrop> `;
  }

  static get styles() {
    return css`
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .actions {
        display: flex;
        flex-direction: column;
        margin-top: var(--spacing-md);
        gap: var(--spacing-2xsm);
      }

      .actions my-button {
        width: 100%;
        height: 36px;
      }
      my-card {
        min-width: 400px;
      }
    `;
  }
}

customElements.define('my-confirmation', Confirmation);
