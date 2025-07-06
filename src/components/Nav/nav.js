import { html, LitElement, css } from 'lit';
import { ComponentNames } from '../../constants';

export class Nav extends LitElement {
  render() {
    return html`<nav>
      <img src="/ing.webp" alt="Ing Logo" />
      <my-typography brand type="paragraph" color="text">ING</my-typography>
      <slot> </slot>
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

      @media (max-width: 850px) {
        img {
          display: none;
        }

        [brand] {
          display: none;
        }
      }
    `;
  }
}

window.customElements.define(ComponentNames.components.nav, Nav);
