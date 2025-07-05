import { fixture, html } from '@open-wc/testing';
import './iconButton'; // kendi dosya yoluna göre değiştir

describe('my-icon-button', () => {
  it('renders button with default properties', async () => {
    const el = await fixture(html`<my-icon-button></my-icon-button>`);
    const button = el.shadowRoot.querySelector('button');
    const icon = el.shadowRoot.querySelector('my-icon');

    expect(button).to.exist;
    expect(button.classList.contains('disabled')).to.be.false;
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('calendar');
    expect(icon.getAttribute('color')).to.equal('primary');
    expect(icon.getAttribute('size')).to.equal('medium');
  });

  it('test the disabled attribute', async () => {
    const el = await fixture(html`<my-icon-button disabled></my-icon-button>`);
    const button = el.shadowRoot.querySelector('button');

    expect(button.classList.contains('disabled')).to.be.true;
  });

  it('test all property', async () => {
    const el = await fixture(html`
      <my-icon-button
        icon="close"
        color="secondary"
        size="large"
      ></my-icon-button>
    `);
    const icon = el.shadowRoot.querySelector('my-icon');

    expect(icon.getAttribute('name')).to.equal('close');
    expect(icon.getAttribute('color')).to.equal('secondary');
    expect(icon.getAttribute('size')).to.equal('large');
  });
});
