import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import {
  AppRoutes,
  ComponentNames,
  emailRegex,
  phoneRegex,
} from '../../constants';
import {
  useEmployeeStore,
  addEmployee,
  updateEmployee,
} from '../../store/index';
import { t } from '../../i18n';
import { departmentData, positionData, userColumns } from '../../data';
import { EmployeeMessage } from '../../constants/message.const';

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
          this.inputError.phone = EmployeeMessage.phoneFormat;
        }
      },
      email: () => {
        if (!emailRegex.test(this.userDetail.email)) {
          this.inputError.email = EmployeeMessage.emailFormat;
        }
      },
      uniqueEmail: () => {
        if (this.isUpdate) return;
        const { employee } = useEmployeeStore();
        if (employee.some((user) => user.email === this.userDetail.email)) {
          this.inputError.email = EmployeeMessage.uniqueEmail;
        }
      },
    };
  }

  checkInputFields() {
    this.inputError = {};
    userColumns.forEach((column) => {
      if (!this.userDetail?.[column]) {
        this.inputError[column] = EmployeeMessage.required;
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
        ${this.renderInput('firstName')} ${this.renderInput('lastName')}
        ${this.renderDate('employmentDate')} ${this.renderDate('birthDate')}
        ${this.renderInput('phone')} ${this.renderInput('email', this.isUpdate)}

        <my-select
          label=${t('employee.department')}
          .value=${{
            value: this.userDetail?.department?.toLowerCase() || '',
            label: this.userDetail?.department || '',
          }}
          .valueList=${departmentData}
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
          .valueList=${positionData}
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

  renderInput(field, readonly = false) {
    return html`<my-input
      label=${t(`employee.${field}`)}
      .value=${this.userDetail?.[field] || ''}
      ?readonly=${readonly}
      .error=${!!this.inputError?.[field]}
      errorMessage=${this.inputError?.[field]}
      @inputChange=${(e) => this.updateEntry(field, e.detail)}
    ></my-input>`;
  }

  renderDate(field) {
    return html`<my-datepicker
      label=${t(`employee.${field}`)}
      format="DD/MM/YYYY"
      .value=${this.userDetail?.[field] || ''}
      .error=${!!this.inputError?.[field]}
      errorMessage=${this.inputError?.[field]}
      @dateChange=${(e) => this.updateEntry(field, e.detail)}
    ></my-datepicker>`;
  }
}

window.customElements.define(ComponentNames.patterns.addEmployee, AddEmployee);
