import { fixture, html } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import { vi } from 'vitest';

import { AppRoutes } from '../../constants';
import './addEmployee';

describe('addEmployee component', () => {
  let el;

  beforeEach(async () => {
    vi.mock('@vaadin/router', () => {
      return {
        Router: {
          go: vi.fn(),
        },
      };
    });
    el = await fixture(html`<my-add-employee></my-add-employee>`);
  });

  it('should render email and component', async () => {
    el.userDetail = { email: 'a@ex.com' };
    el.isUpdate = true;

    expect(el.isUpdate).to.be.true;

    await el.updateComplete;

    const emailInput = el.shadowRoot.querySelector('my-input[label="Email"]');
    expect(emailInput.value).to.equal('a@ex.com');
  });

  it('updateEntry updates userDetail property', () => {
    el.userDetail = { firstName: 'Old' };
    el.updateEntry('firstName', 'New');
    expect(el.userDetail.firstName).to.equal('New');
  });

  it('updateEntry for add user', () => {
    el.userDetail = null;
    el.updateEntry('firstName', 'New');
    expect(el.userDetail.firstName).to.equal('New');
  });

  it('check save button', () => {
    el.isUpdate = true;
    el.userDetail = { email: 'a@ex.com' };
    el.onSave();

    expect(Router.go).toHaveBeenCalledWith(AppRoutes.main.path);
  });

  it('onCancel calls Router.go with main path', () => {
    el.onCancel();
    expect(Router.go).toHaveBeenCalledWith(AppRoutes.main.path);
  });
});
