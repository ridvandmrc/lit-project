import { LitElement, html, css } from 'lit';
import { userData, userColumns } from '../../data/index';
import { Router } from '@vaadin/router';

const pageSize = 10; // Number of users per page

export default class Employee extends LitElement {
  static get properties() {
    return {
      current: { type: Number, state: true },
      total: { type: Number, state: true },
      data: { type: Array, state: true },
      view: { type: String, state: true }, // category | table
      deleteUser: { type: Object, state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.current = 1; // Default current page
    this.total = +Math.ceil(userData.length / pageSize).toFixed(0); // Total number of users
    this.data = userData.slice(0, pageSize); // Initial data slice

    this.view = 'table'; // Default view
  }

  updatePage(target) {
    this.current = target;
    this.data = userData.slice(
      (target - 1) * pageSize,
      (target - 1) * pageSize + pageSize
    );
  }

  updateView(view) {
    this.view = view;
  }

  updateRowSelection(row, { checked }) {
    row.selected = checked;
    this.requestUpdate();
  }

  updateAllTableSelection({ checked }) {
    this.data = this.data.map((user) => {
      user.selected = checked;
      return user;
    });
    this.requestUpdate();
  }

  checkAllSelected() {
    return this.data.every((user) => user.selected);
  }

  onDeleteUser(user) {
    this.deleteUser = user;
  }

  onEditUser(user) {
    Router.go(`/edit-employee/${user.email}`);
  }

  render() {
    return html`
      <my-page-layout pageTitle="Employee List">
        <section slot="head-actions">
          <my-button
            class="${this.view === 'table' ? 'selected' : 'not-selected'}"
            variant="text"
            color="primary"
            size="large"
            icon="hamburger"
            @click="${() => this.updateView('table')}"
          >
          </my-button>
          <my-button
            class="${this.view === 'category' ? 'selected' : 'not-selected'}"
            variant="text"
            color="primary"
            size="large"
            icon="grid"
            @click="${() => this.updateView('category')}"
          ></my-button>
        </section>

        ${this.view === 'table' ? this.tableView() : this.categoryView()}
        <section class="pagination">
          <my-pagination
            @pageChange="${(e) => this.updatePage(e.detail.current)}"
            total="${this.total || 1}"
            current="${this.current || 1}"
          ></my-pagination>
        </section>
        <my-confirmation
          .open=${!!this.deleteUser?.firstName}
          @cancel=${() => this.onDeleteUser(null)}
          message="Selected Employee record of ${this.deleteUser
            ?.firstName} will be deleted"
        >
        </my-confirmation>
      </my-page-layout>
    `;
  }

  static get styles() {
    return css`
      .pagination {
        display: flex;
        justify-content: center;
        margin: 1.4rem 0;
      }
      .selected {
        opacity: 1;
      }
      .not-selected {
        opacity: 0.5;
      }
    `;
  }

  categoryView() {
    return html`<section
      style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; justify-items: center"
    >
      ${this.data.map(
        (user) =>
          html` <my-card
            style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem"
          >
            ${userColumns.map(
              (key) =>
                html`<section>
                  <my-typography type="paragraph" color="disabled">
                    ${key}
                  </my-typography>
                  <my-typography type="subtitle" color="text">
                    ${user[key]}
                  </my-typography>
                </section> `
            )}
            <section
              class="actions"
              style="display:flex; gap:1rem;margin-top:1rem"
            >
              <my-button
                icon="edit"
                color="secondary"
                @click=${() => this.onEditUser(user)}
              >
                Edit
              </my-button>
              <my-button icon="trash" @click=${() => this.onDeleteUser(user)}>
                Delete
              </my-button>
            </section>
          </my-card>`
      )}
    </section> `;
  }

  tableView() {
    return html`<my-table>
      <my-table-group>
        <my-table-row>
          <my-table-cell>
            <my-checkbox
              ?checked=${this.checkAllSelected()}
              @selectChange=${(e) => this.updateAllTableSelection(e.detail)}
            ></my-checkbox>
          </my-table-cell>
          ${userColumns.map(
            (userKey) =>
              html`<my-table-cell>
                <my-typography type="subtitle" color="primary">
                  ${userKey}
                </my-typography>
              </my-table-cell>`
          )}
          <my-table-cell>
            <my-typography type="subtitle" color="primary">
              Actions
            </my-typography>
          </my-table-cell>
        </my-table-row>
      </my-table-group>
      <my-table-group type="body">
        ${this.data.map(
          (user) =>
            html`<my-table-row .selected=${user.selected}>
              <my-table-cell>
                <my-checkbox
                  ?checked=${user.selected}
                  @selectChange=${(e) =>
                    this.updateRowSelection(user, e.detail)}
                ></my-checkbox>
              </my-table-cell>
              ${userColumns.map(
                (userKey) =>
                  html`<my-table-cell>
                    <my-typography
                      type=${userKey === 'firstName' || userKey === 'lastName'
                        ? 'subtitle'
                        : 'paragraph'}
                      color="text"
                    >
                      ${user[userKey]}
                    </my-typography>
                  </my-table-cell>`
              )}
              <my-table-cell>
                <my-icon-button
                  icon="edit"
                  variant="text"
                  size="medium"
                  @click=${() => this.onEditUser(user)}
                >
                </my-icon-button>
                <my-icon-button
                  icon="trash"
                  variant="text"
                  size="medium"
                  @click=${() => this.onDeleteUser(user)}
                >
                </my-icon-button>
              </my-table-cell>
            </my-table-row>`
        )}
      </my-table-group>
    </my-table> `;
  }
}

window.customElements.define('my-employee', Employee);
