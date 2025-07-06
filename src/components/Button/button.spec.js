import { fixture, html } from '@open-wc/testing';

import './button.js';

describe('my-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<my-button>My button</my-button>`);

    expect(el).to.exist;
    expect(el.innerHTML.trim()).to.equal('My button');
  });

  it('renders with custom properties', async () => {
    const el = await fixture(html`
      <my-button variant="outlined" color="secondary" size="medium">
      </my-button>
    `);

    await el.updateComplete;

    expect(el.hasAttribute('variant')).to.be.true;
    expect(el.hasAttribute('color')).to.be.true;
    expect(el.getAttribute('size')).to.equal('medium');
  });

  it('renders icon if icon attribute is set', async () => {
    const el = await fixture(html`
      <my-button
        icon="calendar"
        variant="contained"
        color="primary"
        size="small"
      >
      </my-button>
    `);

    const button = el.shadowRoot.querySelector('button');
    const icon = button.querySelector('my-icon');

    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('calendar');
  });

  it('renders icon if icon attribute is set with outlined', async () => {
    const el = await fixture(html`
      <my-button
        icon="calendar"
        variant="outlined"
        color="primary"
        size="small"
      >
      </my-button>
    `);

    const button = el.shadowRoot.querySelector('button');
    const icon = button.querySelector('my-icon');

    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('calendar');
    expect(el.getAttribute('variant')).to.equal('outlined');
  });
});
