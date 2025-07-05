import { fixture, html } from '@open-wc/testing';
import './typography';

describe('my-typography', () => {
  it('test with default property', async () => {
    const el = await fixture(html`<my-typography></my-typography>`);

    expect(el).to.exist;
  });

  it('test color changes', async () => {
    const el = await fixture(html`<my-typography></my-typography>`);
    const oldType = el.type;
    const oldColor = el.color;

    el.type = 'subtitle';
    el.color = 'disabled';
    await el.updateComplete;

    expect(el.classList.contains('subtitle')).to.be.true;
    expect(el.classList.contains('disabled')).to.be.true;

    expect(el.classList.contains(oldType)).to.be.false;
    expect(el.classList.contains(oldColor)).to.be.false;
  });
});
