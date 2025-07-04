import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import { AppRoutes } from '../../constants';

export class Header extends LitElement {
  toNavigate(path) {
    Router.go(path);
  }

  render() {
    return html`<header class="header">
      <my-nav>
        <div class="nav-content">
          <my-button
            icon="add-user"
            variant="text"
            color="primary"
            size="medium"
            @click=${() => this.toNavigate(AppRoutes.employee.path)}
          >
            Employees
          </my-button>

          <my-button
            icon="plus"
            variant="text"
            color="primary"
            size="medium"
            @click=${() => this.toNavigate(AppRoutes.addEmployee.path)}
          >
            Add new
          </my-button>
        </div>
      </my-nav>
    </header>`;
  }
  static get styles() {
    return css`
      .nav-content {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        margin-right: var(--spacing-md);
        gap: var(--spacing-sm);
      }
    `;
  }
}

window.customElements.define('my-header', Header);
