import { LitElement, html } from 'lit';

export default class Content extends LitElement {
  render() {
    /* return html` <my-employee></my-employee> `; */
     /* return html`<my-add-employee></my-add-employee>`; */
    return html`<my-add-employee
      .userDetail=${{
        firstName: 'Ahmet 1',
        lastName: 'Sourtimes',
        employmentDate: '23/09/2022',
        birthDate: '23/09/2022',
        phone: '+90 555 555 55 55',
        email: 'ahmet@sourtimes.org',
        department: 'Engineering',
        position: 'junior',
      }}
    ></my-add-employee>`;
  }
}

window.customElements.define('my-main', Content);
