import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import { AppRoutes } from '../../constants';
import {
  useEmployeeStore,
  addEmployee,
  updateEmployee,
} from '../../store/index';
import { t } from '../../i18n';

export default class AddEmployee extends LitElement {
  static get properties() {
    return {
      userDetail: { type: Object, state: true }, // user detail
      isUpdate: { type: Boolean, state: true }, // is update mode
    };
  }

  onBeforeEnter(location) {
    const { employee } = useEmployeeStore();
    const targetEmail = location?.params?.email;
    this.isUpdate = !!targetEmail;
    if (targetEmail) {
      this.userDetail = employee.filter(
        (user) => user.email === targetEmail
      )[0];
    }
  }

  updateEntry(target, value) {
    if (!this.userDetail) {
      this.userDetail = {};
    }
    this.userDetail = { ...this.userDetail, [target]: value };
  }

  onSave() {
    this.isUpdate
      ? updateEmployee(this.userDetail)
      : addEmployee(this.userDetail);
    this.onCancel();
  }

  onCancel() {
    Router.go(AppRoutes.main.path);
  }
  render() {
    return html`<my-page-layout
      pageTitle=${this.userDetail
        ? t('employee.edit-employee')
        : t('employee.add-employee')}
    >
      <section class="content">
        ${this.isUpdate
          ? html`<my-typography type="subtitle" color="text">
              ${t('employee.edit-message', {
                name: `${this.userDetail?.firstName || ''}
               ${this.userDetail?.lastName || ''}`,
              })}
            </my-typography>`
          : ''}

        <my-input
          label=${t('employee.firstName')}
          .value=${this.userDetail?.firstName || ''}
          @inputChange=${(e) => this.updateEntry('firstName', e.detail)}
        ></my-input>
        <my-input
          label=${t('employee.lastName')}
          .value=${this.userDetail?.lastName || ''}
          @inputChange=${(e) => this.updateEntry('lastName', e.detail)}
        ></my-input>
        <my-datepicker
          label=${t('employee.employmentDate')}
          format="DD/MM/YYYY"
          .value=${this.userDetail?.employmentDate || ''}
          @dateChange=${(e) => this.updateEntry('employmentDate', e.detail)}
        ></my-datepicker>
        <my-datepicker
          label=${t('employee.birthDate')}
          format="DD/MM/YYYY"
          .value=${this.userDetail?.birthDate || ''}
          @dateChange=${(e) => this.updateEntry('birthDate', e.detail)}
        ></my-datepicker>
        <my-input
          label=${t('employee.phone')}
          .value=${this.userDetail?.phone || ''}
          @inputChange=${(e) => this.updateEntry('phone', e.detail)}
        ></my-input>
        <my-input
          label=${t('employee.email')}
          .value=${this.userDetail?.email || ''}
          ?readonly=${this.isUpdate}
          @inputChange=${(e) => this.updateEntry('email', e.detail)}
        ></my-input>

        <my-select
          label=${t('employee.department')}
          .value=${{
            value: this.userDetail?.department?.toLowerCase() || '',
            label: this.userDetail?.department || '',
          }}
          .valueList=${[
            { value: 'analytics', label: 'Analytics' },
            { value: 'tech', label: 'Tech' },
          ]}
          @selectionChange=${(e) =>
            this.updateEntry('department', e.detail.label)}
        ></my-select>
        <my-select
          label=${t('employee.position')}
          .value=${{
            value: this.userDetail?.position?.toLowerCase() || '',
            label: this.userDetail?.position || '',
          }}
          .valueList=${[
            { value: 'junior', label: 'Junior' },
            { value: 'senior', label: 'Senior' },
            { value: 'expert', label: 'Expert' },
          ]}
          @selectionChange=${(e) =>
            this.updateEntry('position', e.detail.label)}
        ></my-select>
        <section class="actions">
          <my-button @click=${this.onSave}> ${t('common.save')}</my-button>
          <my-button
            variant="outlined"
            color="secondary"
            @click=${this.onCancel}
          >
            ${t('common.cancel')}
          </my-button>
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

      @media (max-width: 850px) {
        .content {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 600px) {
        .content {
          grid-template-columns: 1fr;
          padding: var(--spacing-md);
          gap: var(--spacing-md);
        }
        my-input,
        my-datepicker,
        my-select {
          max-width: 100%;
        }

        .actions {
          flex-direction: column;
          width: 100%;
        }

        .actions my-button {
          width: 100%;
        }
      }
    `;
  }
}

window.customElements.define('my-add-employee', AddEmployee);
