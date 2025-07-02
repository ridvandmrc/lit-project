import { html, LitElement, css } from 'lit';

export class Nav extends LitElement {
  render() {
    return html`<nav>
      <img src="/ing.webp" alt="Ing Logo" />
      <my-typography type="p" color="text">ING</my-typography>
      <slot> </slot>
      <div class="flag">flag</div>
      <div class="color-mode">mode</div>
    </nav>`;
  }

  static get styles() {
    return css`
      nav {
        background-color: var(--bg-white);
        color: var(--primary-color);
        padding: var(--spacing-sm);
        height: 1.4rem;
        box-shadow: var(--shadow-md);
        overflow: hidden;
        align-items: center;
        display: flex;
      }

      img {
        height: 2rem;
      }

      my-typography {
        margin-right: var(--spacing-md);
        font-weight: 550;
      }

      .flag {
        margin-left: auto;
        width:fit-content;
      }
    `;
  }
}

window.customElements.define('my-nav', Nav);
