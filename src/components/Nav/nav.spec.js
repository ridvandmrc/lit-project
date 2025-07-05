import { fixture, html } from '@open-wc/testing';
import './nav';

describe('my-nav', () => {
  it('renders logo image and typography', async () => {
    const el = await fixture(html`<my-nav></my-nav>`);

    const img = el.shadowRoot.querySelector('img');
    const typography = el.shadowRoot.querySelector('my-typography');
    const slot = el.shadowRoot.querySelector('slot');

    expect(img).to.exist;
    expect(img.getAttribute('alt')).to.equal('Ing Logo'); // check alt text

    expect(typography).to.exist;
    expect(typography.getAttribute('type')).to.equal('p');
    expect(typography.getAttribute('color')).to.equal('text');
    expect(typography.textContent.trim()).to.equal('ING'); // check brand

    expect(slot).to.exist;
  });
});
