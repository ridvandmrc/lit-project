import { fixture, html } from '@open-wc/testing';
import { vi } from 'vitest';

import './confirmation.js';

describe('my-card', () => {
  it('renders with default properties', async () => {
    const el = await fixture(html`<my-confirmation></my-confirmation>`);

    expect(el).to.exist;
  });

  it('test custom events', async () => {
    const el = await fixture(html`
      <my-confirmation
        open
        title="Test"
        message="Msg"
        proceedText="Proceed"
        cancelText="Cancel"
      ></my-confirmation>
    `);

    const spyCancel = vi.fn();
    const spyProceed = vi.fn();

    el.addEventListener('proceed', spyProceed);
    el.addEventListener('cancel', spyCancel);

    const [proceedBtn, cancelBtn] = el.shadowRoot.querySelectorAll('my-button');

    proceedBtn.click();
    cancelBtn.click();
    expect(spyCancel).toHaveBeenCalled();
    expect(spyProceed).toHaveBeenCalledTimes(1);
    expect(spyCancel).toHaveBeenCalledTimes(2); // because proceed also calls cancelCard
  });
});
