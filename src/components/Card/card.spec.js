import { fixture, html } from '@open-wc/testing';

import './card.js';

describe('my-card', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<my-card>My card</my-card>`);

    expect(el).to.exist;
    expect(el.innerHTML.trim()).to.equal('My card');
  });

  it('renders with selected ', async () => {
    const el = await fixture(html`<my-card selected>My card</my-card>`);

    expect(el.hasAttribute('selected')).to.be.true;
    expect(el.innerHTML.trim()).to.equal('My card');
  });
});
