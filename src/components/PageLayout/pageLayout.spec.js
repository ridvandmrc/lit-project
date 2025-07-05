import { fixture, html, expect } from '@open-wc/testing';
import './pageLayout'; // kendi dosya adına göre değiştir

describe('my-page-layout', () => {
  it('renders pageTitle ', async () => {
    const el = await fixture(
      html`<my-page-layout pageTitle="Test Title">
        <button slot="head-actions" class="btn">Action</button>
        <p class="content-text">Hello Content</p></my-page-layout
      >`
    );
    const typography = el.shadowRoot.querySelector('my-typography');

    expect(typography).to.exist;
    expect(typography.textContent.trim()).to.equal('Test Title');
  });
});
