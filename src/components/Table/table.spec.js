import { fixture, html, expect } from '@open-wc/testing';
import './table';
import './tableGroup';
import './tableRow';
import './tableCell';

describe('my-table', () => {
  it('renders table ', async () => {
    const el = await fixture(
      html`<my-table>
        <my-table-group>
          <my-table-row>
            <my-table-cell
              ><my-typography type="subtitle" color="primary">
                First Name
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="subtitle" color="primary">
                Last Name
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="subtitle" color="primary">
                Date of Employee
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="subtitle" color="primary">
                Department
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="subtitle" color="primary">
                Actions
              </my-typography></my-table-cell
            >
          </my-table-row>
        </my-table-group>
        <my-table-group type="body">
          <my-table-row>
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                John
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                Doe
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                2023-01-01
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                Engineering
              </my-typography></my-table-cell
            >
            <my-table-cell>
              <my-icon-button
                icon="edit"
                variant="text"
                size="medium"
              ></my-icon-button>
              <my-icon-button
                icon="trash"
                variant="text"
                size="medium"
              ></my-icon-button>
            </my-table-cell>
          </my-table-row>
          <my-table-row selected>
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                John
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                Doe
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                2023-01-01
              </my-typography></my-table-cell
            >
            <my-table-cell
              ><my-typography type="paragraph" color="text">
                Engineering
              </my-typography></my-table-cell
            >
            <my-table-cell>
              <my-icon-button
                icon="edit"
                variant="text"
                size="medium"
              ></my-icon-button>
              <my-icon-button
                icon="trash"
                variant="text"
                size="medium"
              ></my-icon-button>
            </my-table-cell>
          </my-table-row>
        </my-table-group>
      </my-table>`
    );

    const tableGroup = el.querySelectorAll('my-table-group');
    const selectedRow = el.querySelector('[selected]');

    expect(tableGroup.length).to.equal(2);
    expect(selectedRow).to.exist;
  });
});
