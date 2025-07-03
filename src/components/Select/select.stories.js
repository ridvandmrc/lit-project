import './select';
import '../Icon/icon';

export default {
  title: 'Custom Form Components/Select',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-select');
    if (!el) {
      el = document.createElement('my-select');
    }
    el.label = args.label;
    el.value = args.value;
    el.placeholder = args.placeholder;

    return el;
  },
  argTypes: {
    label: 'text',
    value: {
      control: 'object',
      description: 'Selected value object with label and value properties',
    },
    placeholder: 'text',
  },
  parameters: {
    docs: {
      description: {
        component: `
        Select is a custom select input component built with Lit. It allows users to choose from a list of options. The component can be styled and customized with various attributes.`,
      },
    },
  },
};

export const Datepicker = {
  args: {
    label: 'Position',
    value: {
      value: 'test3',
      label: 'Test',
    },
    placeholder: 'Please enter Value',
  },
};
