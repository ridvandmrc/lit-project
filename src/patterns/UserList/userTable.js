import { LitElement, html } from 'lit';
import { userData } from '../../data/index';

export default class UserTable extends LitElement {
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
        ${userData.map(
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
    </my-table>`;
  }
}

window.customElements.define('my-user-table', UserTable);
