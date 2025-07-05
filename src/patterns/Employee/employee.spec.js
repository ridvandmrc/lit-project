import { fixture, html } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import { vi } from 'vitest';

import './Employee';

describe('Employee', () => {
  let el;

  beforeEach(async () => {
    vi.mock('@vaadin/router', () => {
      return {
        Router: {
          go: vi.fn(),
        },
      };
    });
    el = await fixture(html`<my-employee></my-employee>`);
  });

  it('should render the employee component', async () => {
    const categoryButton = el.shadowRoot.querySelector('[icon="grid"]');
    expect(el).to.exist;
    categoryButton.click();
    await el.updateComplete;
    const categoryElement = el.shadowRoot.querySelector('.category-view');
    expect(categoryButton).to.exist;
    expect(categoryElement).to.exist;
  });

  it('test remove icon', async () => {
    const listButton = el.shadowRoot.querySelector('[icon="hamburger"]');
    expect(el).to.exist;

    listButton.click();
    await el.updateComplete;
    const table = el.shadowRoot.querySelector('my-table');
    expect(table).to.exist;

    const removeIcon = table.querySelector('[icon="trash"]');
    expect(removeIcon).to.exist;

    removeIcon.click();
    await el.updateComplete;

    const confirmation = el.shadowRoot.querySelector('my-confirmation');
    expect(confirmation).to.exist;
  });

  it('test navigation', async () => {
    el.onEditUser({ email: 'test@test.com' });
    expect(Router.go).toHaveBeenCalledWith('/edit-employee/test@test.com');
  });

  it('select all table row', async () => {
    el.updateAllTableSelection({ checked: true });
    const allCheckbox = el.shadowRoot
      .querySelector('my-table')
      .querySelectorAll('my-checkbox');

    el.updateRowSelection({ selected: false }, { checked: true });

    expect(allCheckbox.length).toBe(11);
  });
});
