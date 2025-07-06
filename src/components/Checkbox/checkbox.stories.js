import './checkbox';

export default {
  title: 'Custom Form Components/Checkbox',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-checkbox');
    if (!el) {
      el = document.createElement('my-checkbox');
    }
    el.checked = args.checked;
    el.label = args.label;

    return el;
  },
  argTypes: {
    checked: {
      type: 'boolean',
      description: 'Indicates whether the checkbox is checked or not',
    },
    label: { type: 'string', description: 'The label for the checkbox' },
  },
  parameters: {
    docs: {
      description: {
        component: `
Checkbox is a custom checkbox component built with Lit. It allows users to select or deselect an option. The component can be styled and customized with various attributes.`,
      },
    },
  },
};

export const Checkbox = {
  args: {
    checked: true,
    label: 'Checkbox',
  },
};
