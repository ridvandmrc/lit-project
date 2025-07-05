import { fixture, html } from '@open-wc/testing';

import './backdrop.js';

describe('my-backdrop', () => {
  it('renders backdrop element', async () => {
    const element = await fixture(html`<my-backdrop>backdrop</my-backdrop>`);

    expect(element).toBeDefined();
  });

  it('renders backdrop element with open prop', async () => {
    const element = await fixture(
      html`<my-backdrop open>backdrop</my-backdrop>`
    );

    expect(element.hasAttribute('open')).toBe(true);
  });
});
