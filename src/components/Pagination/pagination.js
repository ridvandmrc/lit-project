import { LitElement, html, css } from 'lit';

const MAX_PAGES = 10;
const MID_THRESHOLD = 4;
const FIRST_PAGE = 1;

export default class Pagination extends LitElement {
  static get properties() {
    return {
      total: { type: Number }, // total pages
      current: { type: Number }, // active page
    };
  }
  constructor() {
    super();
    this.total = 1;
    this.current = 1;
  }

  updatePage(targetPage) {
    this.current = targetPage;
    this.dispatchEvent(
      new CustomEvent('pageChange', { detail: { current: this.current } })
    );
  }

  pageArr() {
    const pages = [];

    if (this.total <= MAX_PAGES) {
      Array.from({ length: this.total }, (_, i) => i + 1).forEach((page) => {
        pages.push(page);
      });
      return pages;
    }
    pages.push(1); // first page

    if (this.current > MID_THRESHOLD) {
      pages.push('...');
    }

    const start = Math.max(2, this.current - 1); // before current page
    const end = Math.min(this.total - 1, this.current + 1); // after current page

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (this.current < this.total - 3) {
      pages.push('...');
    }

    pages.push(this.total); // last page
    return pages;
  }

  render() {
    return html` <my-icon-button
        @click="${() => this.updatePage(this.current - 1)}"
        color="${this.current === FIRST_PAGE ? 'disabled' : 'primary'}"
        icon="chevron-left"
        size="small"
        ?disabled=${this.current === FIRST_PAGE}
      >
      </my-icon-button>

      ${this.pageArr().map(
        (page) =>
          html` <my-button
            @click="${() => this.updatePage(page)}"
            variant="${page === this.current ? 'contained' : 'text'}"
            color="${page === this.current ? 'primary' : 'text-color'}"
            size="medium"
          >
            ${page}
          </my-button>`
      )}

      <my-icon-button
        @click="${() => this.updatePage(this.current + 1)}"
        color="${this.current === this.total ? 'disabled' : 'primary'}"
        icon="chevron-right"
        size="small"
        ?disabled=${this.current === this.total}
      >
      </my-icon-button>`;
  }

  static get styles() {
    return css`
      my-button {
        border-radius: 50%;
      }
    `;
  }
}

window.customElements.define('my-pagination', Pagination);
