import { LitElement, html, css } from 'lit';
import { userColumns } from '../../data/index';
import { Router } from '@vaadin/router';

import {
  useEmployeeStore,
  employeeStore,
  removeEmployee,
  useTableStore,
  updateView,
} from '../../store';
import { t } from '../../i18n';

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
    const { view } = useTableStore();
    this.updatePage(1); // start from first page
    this.view = view; // Default view

    this.employeeSub = employeeStore.subscribe(() => {
      this.updatePage(this.current); // Reset to first page on data change
    });
  }

  disconnectedCallback() {
    this.employeeSub();
  }

  updatePage(target) {
    const { employee } = useEmployeeStore();
    this.current = target;
    this.total = +Math.ceil(employee.length / pageSize).toFixed(0); // Total number of users
    if (this.current > this.total) {
      this.current = this.total;
    }
    this.data = employee.slice(
      (this.current - 1) * pageSize,
      (this.current - 1) * pageSize + pageSize
    );
  }

  updateView(view) {
    updateView(view);
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

  proceedDeleteUser() {
    removeEmployee(this.deleteUser.email);
  }

  onEditUser(user) {
    Router.go(`/edit-employee/${user.email}`);
  }

  render() {
    return html`
      <my-page-layout pageTitle=${t('employee.title')}>
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
          .title=${t('employee.remove-title')}
          .proceedText=${t('common.proceed')}
          .cancelText=${t('common.cancel')}
          @proceed=${this.proceedDeleteUser}
          @cancel=${() => this.onDeleteUser(null)}
          message=${t('employee.remove-message', {
            name: this.deleteUser?.firstName,
          })}
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
      .category-view {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        justify-items: center;
      }

      .category-card {
        display: grid;
        cursor: pointer;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }
    `;
  }

  categoryView() {
    return html`<section class="category-view">
      ${this.data.map(
        (user) =>
          html` <my-card
            @click=${() =>
              this.updateRowSelection(user, { checked: !user.selected })}
            class="category-card"
            .selected=${user.selected}
          >
            ${userColumns.map(
              (key) =>
                html`<section>
                  <my-typography type="paragraph" color="disabled">
                    ${t(`employee.${key}`)}
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
                ${t('common.edit')}
              </my-button>
              <my-button icon="trash" @click=${() => this.onDeleteUser(user)}>
                ${t('common.delete')}
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
                  ${t(`employee.${userKey}`)}
                </my-typography>
              </my-table-cell>`
          )}
          <my-table-cell>
            <my-typography type="subtitle" color="primary">
              ${t('employee.actions')}
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
