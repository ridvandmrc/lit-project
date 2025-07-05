import { fixture, html } from '@open-wc/testing';
import './select';
import { vi } from 'vitest';

describe('my-select', () => {
  const sampleOptions = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  it('renders label and select with options', async () => {
    const el = await fixture(html`
      <my-select
        label="Test Select"
        .valueList=${sampleOptions}
        .value=${sampleOptions[1]}
      ></my-select>
    `);

    const label = el.shadowRoot.querySelector('label');
    const select = el.shadowRoot.querySelector('select');
    const options = select.querySelectorAll('option');

    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Test Select');

    expect(select).to.exist;
    expect(options.length).to.equal(sampleOptions.length);

    expect(options[1].selected).to.be.true;
    expect(options[1].textContent.trim()).to.equal('Option 2');
  });

  it('test custom events selectionChange', async () => {
    const el = await fixture(html`
      <my-select
        label="Test Select"
        .valueList=${sampleOptions}
        .value=${sampleOptions[0]}
      ></my-select>
    `);
    const changeSpy = vi.fn();
    el.addEventListener('selectionChange', changeSpy);

    const select = el.shadowRoot.querySelector('select');
    select.value = 'opt3';
    select.dispatchEvent(new Event('input'));

    expect(changeSpy).toHaveBeenCalled();
  });
});
