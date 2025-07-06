import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

import './datepicker';

describe('my-datepicker', () => {
  it('renders label and input with icon', async () => {
    const el = await fixture(html`
      <my-datepicker label="Date" placeholder="Select date"></my-datepicker>
    `);

    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input[type="date"]');
    const icon = el.shadowRoot.querySelector('my-icon');

    expect(label.textContent.trim()).to.equal('Date');
    expect(input).to.exist;
    expect(input.placeholder).to.equal('Select date');
    expect(icon).to.exist;
    expect(icon.getAttribute('name')).to.equal('calendar');
  });

  it('renders with error property', async () => {
    const el = await fixture(html`
      <my-datepicker
        label="Date"
        placeholder="Select date"
        error
        errorMessage="error"
      ></my-datepicker>
    `);

    const err = el.shadowRoot.querySelector('.error-message');

    expect(err.textContent.trim()).to.equal('error');
  });

  it('test the custom events', async () => {
    const el = await fixture(html`
      <my-datepicker label="Date" format="DD/MM/YYYY"></my-datepicker>
    `);

    const input = el.shadowRoot.querySelector('input');

    const spy = vi.fn();
    el.addEventListener('dateChange', spy);

    input.value = '2025-07-05'; // update the date
    input.dispatchEvent(new Event('input')); // trigger the input event

    expect(spy).toHaveBeenCalled();
  });

  it('test the custom events with different format', async () => {
    const el = await fixture(html`
      <my-datepicker label="Date" format="YYYY-MM-DD"></my-datepicker>
    `);

    const input = el.shadowRoot.querySelector('input');

    const spy = vi.fn();
    el.addEventListener('dateChange', spy);

    input.value = '2025-07-05'; // update the date
    input.dispatchEvent(new Event('input')); // trigger the input event

    expect(spy).toHaveBeenCalled();
  });
});
