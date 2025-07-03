import './table.js';
import './tableGroup.js';
import './tableRow.js';
import './tableCell.js';
import '../IconButton/iconButton.js';
import '../Icon/icon.js';

export default {
  title: 'Custom Components/Table',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-table');
    if (!el) {
      el = document.createElement('my-table');
      el.innerHTML = `
    <my-table-group>
        <my-table-row>
            <my-table-cell><my-typography type="subtitle" color="primary"> First Name </my-typography></my-table-cell>
            <my-table-cell><my-typography type="subtitle" color="primary"> Last Name </my-typography></my-table-cell>
            <my-table-cell><my-typography type="subtitle" color="primary"> Date of Employee </my-typography></my-table-cell>
            <my-table-cell><my-typography type="subtitle" color="primary"> Department </my-typography></my-table-cell>
            <my-table-cell><my-typography type="subtitle" color="primary"> Actions </my-typography></my-table-cell>
        </my-table-row>
    </my-table-group>
    <my-table-group type="body">
        <my-table-row>
            <my-table-cell><my-typography type="paragraph" color="text"> John </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Doe </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> 2023-01-01 </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Engineering </my-typography></my-table-cell>
            <my-table-cell>
            <my-icon-button icon="edit" variant="text" size="medium"></my-icon-button>
            <my-icon-button icon="trash" variant="text" size="medium"></my-icon-button>
            </my-table-cell>
        </my-table-row>
                <my-table-row>
            <my-table-cell><my-typography type="paragraph" color="text"> John </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Doe </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> 2023-01-01 </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Engineering </my-typography></my-table-cell>
            <my-table-cell>
            <my-icon-button icon="edit" variant="text" size="medium"></my-icon-button>
            <my-icon-button icon="trash" variant="text" size="medium"></my-icon-button>
            </my-table-cell>
        </my-table-row>
                <my-table-row>
            <my-table-cell><my-typography type="paragraph" color="text"> John </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Doe </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> 2023-01-01 </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Engineering </my-typography></my-table-cell>
            <my-table-cell>
            <my-icon-button icon="edit" variant="text" size="medium"></my-icon-button>
            <my-icon-button icon="trash" variant="text" size="medium"></my-icon-button>
            </my-table-cell>
        </my-table-row>
                <my-table-row>
            <my-table-cell><my-typography type="paragraph" color="text"> John </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Doe </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> 2023-01-01 </my-typography></my-table-cell>
            <my-table-cell><my-typography type="paragraph" color="text"> Engineering </my-typography></my-table-cell>
            <my-table-cell>
            <my-icon-button icon="edit" variant="text" size="medium"></my-icon-button>
            <my-icon-button icon="trash" variant="text" size="medium"></my-icon-button>
            </my-table-cell>
        </my-table-row>
    </my-table-group>
      `;
    }
    el.current = args.current;

    return el;
  },
  argTypes: {
    total: { type: Number },
    current: { type: Number },
  },
  parameters: {
    docs: {
      description: {
        component: `
        The my-table component is a custom table element that supports pagination. It displays a list of items and allows navigation through pages. The component accepts two properties: \`total\` for the total number of items and \`current\` for the current page number.`,
      },
    },
  },
};

export const Table = {
  args: {
    total: 10,
    current: 2,
  },
};
