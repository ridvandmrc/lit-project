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
const searchBy = ['email', 'firstName', 'lastName'];

export default class Employee extends LitElement {
  static get properties() {
    return {
      current: { type: Number, state: true },
      total: { type: Number, state: true },
      data: { type: Array, state: true },
      view: { type: String, state: true }, // category | table
      deleteUser: { type: Object, state: true },
      categorySize: { type: Boolean, state: true },
      searchKey: { type: String, state: true }, // search by email and FirstName
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

    this.observer = new ResizeObserver((e) => {
      const currentWidth = e[0].contentBoxSize[0].inlineSize;
      if (currentWidth < 1100) {
        this.categorySize = true;
      } else {
        this.categorySize = false;
      }
    });
    this.observer.observe(document.body);
  }

  disconnectedCallback() {
    this.employeeSub();
    this.observer.unobserve(document.body);
  }

  updatePage(target) {
    const { employee } = useEmployeeStore();
    this.current = target;
    const _targetTotal = this.searchKey
      ? employee.filter((user) =>
          searchBy.some((key) => user[key].includes(this.searchKey))
        )
      : employee;
    this.total = +Math.ceil(_targetTotal.length / pageSize).toFixed(0); // Total number of users
    if (this.current > this.total) {
      this.current = this.total;
    }
    this.data = _targetTotal.slice(
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
    return this.data.every((user) => user?.selected);
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

  onSearchUser(e) {
    const _search = e.target.value.toLowerCase();
    this.searchKey = _search;
    this.updatePage(1);
  }

  render() {
    return html`
      <my-page-layout pageTitle=${t('employee.title')}>
        ${!this.categorySize
          ? html`<section slot="head-actions">
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
                class="${this.view === 'category'
                  ? 'selected'
                  : 'not-selected'}"
                variant="text"
                color="primary"
                size="large"
                icon="grid"
                @click="${() => this.updateView('category')}"
              ></my-button>
            </section>`
          : ''}

        <section class="search">
          <my-input
            placeholder="Search by name and email"
            @inputChange=${this.onSearchUser}
          ></my-input>
        </section>
        ${this.view === 'category' || this.categorySize
          ? this.categoryView()
          : this.tableView()}
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
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
      }

      .category-card {
        display: grid;
        cursor: pointer;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        box-sizing: border-box;
      }

      .search {
        margin: var(--spacing-md) 0;
      }

      @media (max-width: 1200px) {
        .category-view {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 850px) {
        .category-view {
          grid-template-columns: 1fr;
        }

        .category-card {
          width: 100%;
        }

        .search my-input {
          max-width: 100%;
        }
      }

      .ellipsis-line {
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }

      @media (max-width: 1200px) {
        .table {
          width: 100%;
          overflow-x: auto;
          display: block;
        }
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
                @click=${(e) => {
                  e.stopPropagation();
                  this.onEditUser(user);
                }}
              >
                ${t('common.edit')}
              </my-button>
              <my-button
                icon="trash"
                @click=${(e) => {
                  e.stopPropagation();
                  this.onDeleteUser(user);
                }}
              >
                ${t('common.delete')}
              </my-button>
            </section>
          </my-card>`
      )}
    </section> `;
  }

  tableView() {
    return html`<my-table class="table">
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
                <my-typography
                  type="subtitle"
                  color="primary"
                  class="ellipsis-line"
                >
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
            html`<my-table-row .selected=${user?.selected}>
              <my-table-cell>
                <my-checkbox
                  ?checked=${user?.selected}
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
                      class="ellipsis-line"
                    >
                      ${user?.[userKey]}
                    </my-typography>
                  </my-table-cell>`
              )}
              <my-table-cell style="white-space: nowrap">
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
