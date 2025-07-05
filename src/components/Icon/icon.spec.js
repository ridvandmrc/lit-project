import { fixture, html } from '@open-wc/testing';
import './icon';

describe('my-icon', () => {
  it('renders default icon with correct classes', async () => {
    const el = await fixture(html`<my-icon></my-icon>`);
    const iconEl = el.shadowRoot.querySelector('i');

    expect(iconEl).to.exist;
    expect(iconEl.classList.contains('icon-calendar')).to.be.true;
    expect(iconEl.classList.contains('medium')).to.be.true;
    expect(iconEl.classList.contains('primary')).to.be.true;
  });

  it('renders with different properties', async () => {
    const el = await fixture(
      html`<my-icon name="close" color="secondary" size="large"></my-icon>`
    );
    const iconEl = el.shadowRoot.querySelector('i');

    expect(iconEl.classList.contains('icon-close')).to.be.true;
    expect(iconEl.classList.contains('large')).to.be.true;
    expect(iconEl.classList.contains('secondary')).to.be.true;
  });
});
