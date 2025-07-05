import { fixture, html } from '@open-wc/testing';
import './pagination';

describe('my-pagination', () => {
  it('renders buttons correctly ', async () => {
    const el = await fixture(
      html`<my-pagination total="3" current="1"></my-pagination>`
    );
    const buttons = el.shadowRoot.querySelectorAll('my-button');
    expect(buttons.length).to.equal(3); // total page
  });

  it('test large page', async () => {
    const el = await fixture(
      html`<my-pagination total="15" current="5"></my-pagination>`
    );
    const buttons = [...el.shadowRoot.querySelectorAll('my-button')];
    const texts = buttons.map((btn) => btn.textContent.trim());
    expect(texts).to.include('...');
    expect(texts[texts.length - 1]).to.equal('15'); // last page
  });

  it('check the custom events pageChanges', async () => {
    const el = await fixture(
      html`<my-pagination total="5" current="2"></my-pagination>`
    );

    const buttons = el.shadowRoot.querySelectorAll('my-button');
    buttons[2].click();

    el.dispatchEvent(new CustomEvent('pageChange', { detail: { current: 3 } }));
    expect(el.current).to.equal(3);
  });

  it('check the custom events pageChanges with last page', async () => {
    const el = await fixture(
      html`<my-pagination total="5" current="2"></my-pagination>`
    );

    const buttons = el.shadowRoot.querySelectorAll('my-button');
    buttons[4].click();

    el.dispatchEvent(new CustomEvent('pageChange', { detail: { current: 5 } }));
    expect(el.current).to.equal(5);
    const iconButton = el.shadowRoot.querySelectorAll(
      'my-icon-button[color="disabled"]'
    );
    expect(iconButton).to.exist;
  });
});
