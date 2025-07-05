import { fixture, html } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import { vi } from 'vitest';
import { AppRoutes } from '../../constants';
import './header';

describe('my-header', () => {
  beforeEach(async () => {
    vi.mock('@vaadin/router', () => {
      return {
        Router: {
          go: vi.fn(),
        },
      };
    });
  });
  it('should set initial theme from store', async () => {
    const el = await fixture(html`<my-header></my-header>`);
    expect(el).to.exist;
  });

  it('calls Router.go when buttons clicked', async () => {
    const el = await fixture(html`<my-header></my-header>`);
    expect(el).to.exist;
    const buttons = el.shadowRoot.querySelectorAll('my-button');
    buttons[1].click();
    expect(Router.go).toHaveBeenCalledWith(AppRoutes.addEmployee.path);

    buttons[0].click();
    expect(Router.go).toHaveBeenCalledWith(AppRoutes.employee.path);
  });

  it('calls updateLang and reloads window on flag click', async () => {
    const el = await fixture(html`<my-header></my-header>`);
    const flag = el.shadowRoot.querySelector('.flag');

    flag.click();
    const lang = flag.querySelector('img');
    expect(flag).to.exist;
    expect(lang.alt).toBe('Turkish');
  });

  it('test toggle theme', async () => {
    const el = await fixture(html`<my-header></my-header>`);
    const iconButton = el.shadowRoot.querySelector('my-icon-button');

    iconButton.click(); // dark mode
    await el.updateComplete;
    expect(iconButton.icon).toBe('dark');

    iconButton.click(); // light mode
    await el.updateComplete;
    expect(iconButton.icon).toBe('light');
  });
});
