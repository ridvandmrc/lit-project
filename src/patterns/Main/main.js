import { LitElement, html } from 'lit';

export default class Content extends LitElement {
  render() {
    return html` <my-employee></my-employee> `;
  }
}

window.customElements.define('my-main', Content);
