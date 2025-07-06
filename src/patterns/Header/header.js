import { Router } from '@vaadin/router';
import { LitElement, html, css } from 'lit';
import { AppRoutes, ComponentNames } from '../../constants';
import {
  useLanguageStore,
  updateLanguage,
  useThemeStore,
  toggleTheme,
  initiateTheme,
} from '../../store';
import { t } from '../../i18n';

const flags = {
  tr: html`<img src="/flags/en.svg" alt="English" />`,
  en: html`<img src="/flags/tr.svg" alt="Turkish" />`,
};

export class Header extends LitElement {
  static get properties() {
    return {
      theme: { type: String, state: true },
    };
  }
  toNavigate(path) {
    Router.go(path);
  }

  connectedCallback() {
    super.connectedCallback();
    this.lang = useLanguageStore().lang;
    document.documentElement.lang = this.lang;

    initiateTheme();
    this.theme = useThemeStore().theme;
  }

  updateLang() {
    updateLanguage(this.lang === 'en' ? 'tr' : 'en');
    window.location.reload(); // Reload to apply language change
  }

  updateTheme() {
    toggleTheme();
    this.theme = useThemeStore().theme;
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
            ${t('header.employees')}
          </my-button>

          <my-button
            icon="plus"
            variant="text"
            color="primary"
            size="medium"
            @click=${() => this.toNavigate(AppRoutes.addEmployee.path)}
          >
            ${t('header.add-new')}
          </my-button>
          <div class="flag" @click=${this.updateLang}>${flags[this.lang]}</div>
          <my-icon-button @click=${this.updateTheme} .icon=${this.theme}>
          </my-icon-button>
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
        align-items: center;
        margin-right: var(--spacing-md);
        gap: var(--spacing-xsm);
      }
      .flag {
        display: flex;
        align-items: center;
        width: 1.4rem;
        height: 1.4rem;
        cursor: pointer;
      }

      @media (max-width: 850px) {
        .nav-content {
          justify-content: unset;
        }
        .flag {
          margin-left: auto;
        }
      }
    `;
  }
}

window.customElements.define(ComponentNames.patterns.header, Header);
