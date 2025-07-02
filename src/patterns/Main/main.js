import { LitElement, html, css } from 'lit';

export default class Content extends LitElement {
  render() {
    return html`
      <main>
        <section class="head">
          <my-typography>Employee List</my-typography>
          <div class="head-actions">
            <my-button
              variant="text"
              color="primary"
              size="large"
              icon="hamburger"
            >
            </my-button>
            <my-button variant="text" color="primary" size="large" icon="grid">
            </my-button>
          </div>
        </section>
        <section class="content">
          <my-user-table></my-user-table>
        </section>
      </main>
    `;
  }
  static get styles() {
    return css`
      main {
        background-color: var(--main-bg);
        padding: var(--spacing-md);
        min-height: calc(100vh - 5rem);
      }

      .head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: var(--max-width);
        margin: 0 auto;
      }

      .content {
        max-width: var(--max-width);
        margin: 0 auto;
        margin-top: var(--spacing-lg);
      }
    `;
  }
}

window.customElements.define('my-main', Content);
