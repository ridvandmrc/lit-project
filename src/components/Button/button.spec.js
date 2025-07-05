import { fixture, html } from '@open-wc/testing';

import './button.js';

describe('my-button', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<my-button>My button</my-button>`);

    const button = el.shadowRoot.querySelector('button');
    console.log(el.innerHTML);

    expect(button).to.exist;
    expect(button.classList.contains('contained')).to.be.true;
    expect(button.classList.contains('primary')).to.be.true;
    expect(button.classList.contains('medium')).to.be.true;
    expect(el.innerHTML.trim()).to.equal('My button');
  });

  it('renders with custom properties', async () => {
    const el = await fixture(html`
      <my-button variant="outlined" color="secondary" size="large"> </my-button>
    `);

    const button = el.shadowRoot.querySelector('button');

    expect(button.classList.contains('outlined')).to.be.true;
    expect(button.classList.contains('secondary')).to.be.true;
    expect(button.classList.contains('large')).to.be.true;
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
    expect(button.classList.contains('outlined')).to.be.true;
  });
});
