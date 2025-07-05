import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

import './checkbox';

describe('my-checkbox', () => {
  it('renders with default properties', async () => {
    const el = await fixture(
      html`<my-checkbox label="Accept" checked></my-checkbox>`
    );

    const input = el.shadowRoot.querySelector('input[type="checkbox"]');
    const span = el.shadowRoot.querySelector('span');

    expect(input).to.exist;
    expect(input.checked).to.be.true;
    expect(span.textContent.trim()).to.equal('Accept');
  });

  it('check the checkbox and listen custom event', async () => {
    const el = await fixture(html`<my-checkbox></my-checkbox>`);
    const input = el.shadowRoot.querySelector('input[type="checkbox"]');

    const spyCheckbox = vi.fn();
    el.addEventListener('selectChange', () => {
      spyCheckbox();
    });

    input.checked = true; // set checked property and dispatch it
    input.dispatchEvent(new Event('change'));

    await el.updateComplete;

    expect(el.checked).to.be.true;
    expect(spyCheckbox).toHaveBeenCalled();
    expect(spyCheckbox).toHaveBeenCalledTimes(1);
  });
});
