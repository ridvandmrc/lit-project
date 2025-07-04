import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import { userData } from '../../data';
import { AppRoutes } from '../../constants';

export default class AddEmployee extends LitElement {
  static get properties() {
    return {
      userDetail: { type: Object, state: true }, // user detail
    };
  }

  onBeforeEnter(location) {
    const targetEmail = location?.params?.email;
    if (targetEmail) {
      this.userDetail = userData.filter(
        (user) => user.email === targetEmail
      )[0];
    }
  }

  onCancel() {
    Router.go(AppRoutes.main.path);
  }
  render() {
    return html`<my-page-layout
      pageTitle=${this.userDetail ? 'Edit Employee' : 'Employee List'}
    >
      <section class="content">
        ${this.userDetail
          ? html`<my-typography type="subtitle" color="text">
              You are editing ${this.userDetail?.firstName || ''}
              ${this.userDetail?.lastName || ''}
            </my-typography>`
          : ''}

        <my-input
          label="First Name"
          .value=${this.userDetail?.firstName || ''}
        ></my-input>
        <my-input
          label="Last Name"
          .value=${this.userDetail?.lastName || ''}
        ></my-input>
        <my-datepicker
          label="Date of Employment"
          format="DD/MM/YYYY"
          .value=${this.userDetail?.employmentDate || ''}
        ></my-datepicker>
        <my-datepicker
          label="Date of Birth"
          format="DD/MM/YYYY"
          .value=${this.userDetail?.birthDate || ''}
        ></my-datepicker>
        <my-input
          label="Phone"
          .value=${this.userDetail?.phone || ''}
        ></my-input>
        <my-input
          label="Email"
          .value=${this.userDetail?.email || ''}
        ></my-input>
        <my-input
          label="Department"
          .value=${this.userDetail?.department || ''}
        ></my-input>
        <my-select
          label="First Name"
          .value=${{
            value: this.userDetail?.department || '',
            label: this.userDetail?.department || '',
          }}
          .valueList=${[
            { value: 'junior', label: 'Junior' },
            { value: 'senior', label: 'Senior' },
            { value: 'expert', label: 'Expert' },
          ]}
        ></my-select>
        <section class="actions">
          <my-button>Save</my-button>
          <my-button
            variant="outlined"
            color="secondary"
            @click=${this.onCancel}
            >Cancel</my-button
          >
        </section>
      </section>
    </my-page-layout>`;
  }

  static get styles() {
    return css`
      .content {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        align-content: start;
        gap: 3rem;
        background-color: var(--bg-white);
        padding: 3rem;
        min-height: 50vh;
      }

      .actions {
        grid-column: 1 / -1;
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 2rem;
      }

      my-button {
        width: 15rem;
        height: 2.5rem;
      }

      my-typography {
        grid-column: 1 / -1;
      }
    `;
  }
}

window.customElements.define('my-add-employee', AddEmployee);
