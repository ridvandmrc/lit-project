import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import { AppRoutes } from '../../constants';
import {
  useEmployeeStore,
  addEmployee,
  updateEmployee,
} from '../../store/index';
import { t } from '../../i18n';
import { userColumns } from '../../data';

const phoneRegex =
  /^(?:\+90|0)?[\s.-]?(5\d{2})[\s.-]?(\d{3})[\s.-]?(\d{2})[\s.-]?(\d{2})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const ErrorMessage = {
  required: t('employee.required'),
  phoneFormat: t('employee.phoneFormat'),
  emailFormat: t('employee.emailFormat'),
  uniqueEmail: t('employee.uniqueEmail'),
};

export default class AddEmployee extends LitElement {
  static get properties() {
    return {
      userDetail: { type: Object, state: true }, // user detail
      isUpdate: { type: Boolean, state: true }, // is update mode
      inputError: { type: Object, state: true }, // input error
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

  checkInputCases() {
    return {
      phone: () => {
        if (!phoneRegex.test(this.userDetail.phone)) {
          this.inputError.phone = ErrorMessage.phoneFormat;
        }
      },
      email: () => {
        if (!emailRegex.test(this.userDetail.email)) {
          this.inputError.email = ErrorMessage.emailFormat;
        }
      },
      uniqueEmail: () => {
        if (this.isUpdate) return;
        const { employee } = useEmployeeStore();
        if (employee.some((user) => user.email === this.userDetail.email)) {
          this.inputError.email = ErrorMessage.uniqueEmail;
        }
      },
    };
  }

  checkInputFields() {
    this.inputError = {};
    userColumns.forEach((column) => {
      if (!this.userDetail?.[column]) {
        this.inputError[column] = ErrorMessage.required;
      }
    });
    if (Object.keys(this.inputError).length > 0) return;
    Object.values(this.checkInputCases()).forEach((check) => check());
  }

  onSave() {
    this.checkInputFields();
    if (Object.keys(this.inputError).length > 0) {
      return;
    }
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
                name: `${this.userDetail?.email || ''}
            `,
              })}
            </my-typography>`
          : ''}

        <my-input
          label=${t('employee.firstName')}
          .error=${!!this.inputError?.firstName}
          errorMessage=${this.inputError?.firstName}
          .value=${this.userDetail?.firstName || ''}
          @inputChange=${(e) => this.updateEntry('firstName', e.detail)}
        ></my-input>
        <my-input
          label=${t('employee.lastName')}
          .error=${!!this.inputError?.lastName}
          errorMessage=${this.inputError?.lastName}
          .value=${this.userDetail?.lastName || ''}
          @inputChange=${(e) => this.updateEntry('lastName', e.detail)}
        ></my-input>
        <my-datepicker
          label=${t('employee.employmentDate')}
          format="DD/MM/YYYY"
          .value=${this.userDetail?.employmentDate || ''}
          .error=${!!this.inputError?.employmentDate}
          errorMessage=${this.inputError?.employmentDate}
          @dateChange=${(e) => this.updateEntry('employmentDate', e.detail)}
        ></my-datepicker>
        <my-datepicker
          label=${t('employee.birthDate')}
          format="DD/MM/YYYY"
          .value=${this.userDetail?.birthDate || ''}
          .error=${!!this.inputError?.birthDate}
          errorMessage=${this.inputError?.birthDate}
          @dateChange=${(e) => this.updateEntry('birthDate', e.detail)}
        ></my-datepicker>
        <my-input
          label=${t('employee.phone')}
          .value=${this.userDetail?.phone || ''}
          .error=${!!this.inputError?.phone}
          errorMessage=${this.inputError?.phone}
          @inputChange=${(e) => this.updateEntry('phone', e.detail)}
        ></my-input>
        <my-input
          label=${t('employee.email')}
          .value=${this.userDetail?.email || ''}
          .error=${!!this.inputError?.email}
          errorMessage=${this.inputError?.email}
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
          .error=${!!this.inputError?.department}
          errorMessage=${this.inputError?.department}
          @selectionChange=${(e) =>
            this.updateEntry('department', e.detail.label)}
          placeholder=${t('employee.select-department')}
        ></my-select>
        <my-select
          label=${t('employee.position')}
          placeholder=${t('employee.select-position')}
          .value=${{
            value: this.userDetail?.position?.toLowerCase() || '',
            label: this.userDetail?.position || '',
          }}
          .valueList=${[
            { value: 'junior', label: 'Junior' },
            { value: 'senior', label: 'Senior' },
            { value: 'expert', label: 'Expert' },
          ]}
          .error=${!!this.inputError?.position}
          errorMessage=${this.inputError?.position}
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
