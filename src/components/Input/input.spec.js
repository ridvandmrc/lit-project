import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';
import './input';

describe('my-input', () => {
  it('renders label and input with default properties', async () => {
    const el = await fixture(html`<my-input label="Username"></my-input>`);

    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input');

    expect(label).to.exist;
    expect(label.textContent.trim()).to.equal('Username');

    expect(input).to.exist;
    expect(input.type).to.equal('text');
    expect(input.placeholder).to.equal('Please enter Value');
    expect(input.readOnly).to.be.false;
    expect(input.value).to.equal('');
  });

  it('renders with custom properties', async () => {
    const el = await fixture(html`
      <my-input
        label="Email"
        type="email"
        value="test@example.com"
        placeholder="Enter email"
        readonly
      ></my-input>
    `);

    const label = el.shadowRoot.querySelector('label');
    const input = el.shadowRoot.querySelector('input');

    expect(label.textContent.trim()).to.equal('Email');
    expect(input.type).to.equal('email');
    expect(input.placeholder).to.equal('Enter email');
    expect(input.readOnly).to.be.true;
    expect(input.value).to.equal('test@example.com');
  });

  it('renders with error property', async () => {
    const el = await fixture(html`
      <my-input label="test" error errorMessage="error"></my-input>
    `);

    const err = el.shadowRoot.querySelector('.error-message');

    expect(err.textContent.trim()).to.equal('error');
  });

  it('test custom events', async () => {
    const el = await fixture(html`<my-input label="Name"></my-input>`);

    const input = el.shadowRoot.querySelector('input');

    const inputChangeSpy = vi.fn();
    el.addEventListener('inputChange', inputChangeSpy);

    input.value = 'Hello';
    input.dispatchEvent(new Event('input'));

    await el.updateComplete;

    expect(el.value).to.equal('Hello');
    expect(inputChangeSpy).toHaveBeenCalled();
  });
});
