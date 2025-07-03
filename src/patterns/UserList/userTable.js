import { LitElement, html, css } from 'lit';
import { userData } from '../../data/index';

const pageSize = 10; // Number of users per page

export default class UserTable extends LitElement {
  static get properties() {
    return {
      current: { type: Number, state: true },
      total: { type: Number, state: true },
      data: { type: Array, state: true },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.current = 1; // Default current page
    this.total = +Math.ceil(userData.length / pageSize).toFixed(0); // Total number of users
    this.data = userData.slice(0, pageSize); // Initial data slice
  }

  updatePage(target) {
    this.current = target;
    this.data = userData.slice(
      (target - 1) * pageSize,
      (target - 1) * pageSize + pageSize
    );
  }

  render() {
    return html` <my-table>
        <my-table-group>
          <my-table-row>
            ${Object.keys(userData[0]).map(
              (userKey) =>
                html`<my-table-cell>
                  <my-typography type="subtitle" color="primary"
                    >${userKey}</my-typography
                  >
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
              html`<my-table-row>
                ${Object.values(user).map(
                  (userValue) =>
                    html`<my-table-cell>
                      <my-typography type="paragraph" color="text">
                        ${userValue}
                      </my-typography>
                    </my-table-cell>`
                )}
                <my-table-cell>
                  <my-icon-button icon="edit" variant="text" size="medium">
                  </my-icon-button>
                  <my-icon-button icon="trash" variant="text" size="medium">
                  </my-icon-button>
                </my-table-cell>
              </my-table-row>`
          )}
        </my-table-group>
      </my-table>
      <section class="pagination">
        <my-pagination
          @pageChange="${(e) => this.updatePage(e.detail.current)}"
          total="${this.total || 1}"
          current="${this.current || 1}"
        ></my-pagination>
      </section>`;
  }

  static get styles() {
    return css`
      .pagination {
        display: flex;
        justify-content: center;
        margin: 1.4rem 0;
      }
    `;
  }
}

window.customElements.define('my-user-table', UserTable);
