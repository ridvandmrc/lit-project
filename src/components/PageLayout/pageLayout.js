import { LitElement, html, css } from 'lit';
import { ComponentNames } from '../../constants';

export default class PageLayout extends LitElement {
  static get properties() {
    return { pageTitle: { type: String } };
  }

  render() {
    return html`
      <main>
        <section class="head">
          <my-typography>${this.pageTitle}</my-typography>
          <div class="head-actions">
            <slot name="head-actions"></slot>
            </my-button>
          </div>
        </section>
        <section class="content">
          <slot></slot>
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
        height: 2rem;
      }

      .content {
        max-width: var(--max-width);
        margin: 0 auto;
        margin-top: var(--spacing-lg);
        overflow: hidden;
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.pageLayout, PageLayout);
