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
    el.valueList = args.valueList;
    el.placeholder = args.placeholder;
    el.error = args.error;
    el.errorMessage = args.errorMessage;

    return el;
  },
  argTypes: {
    label: 'text',
    value: {
      control: 'object',
      description: 'Selected value object with label and value properties',
    },
    placeholder: 'text',
    error: 'boolean',
    errorMessage: 'text',
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

export const Select = {
  args: {
    label: 'Position',
    value: {
      value: 'analytics',
      label: 'Analytics',
    },
    valueList: [
      { value: 'analytics', label: 'Analytics' },
      { value: 'tech', label: 'Tech' },
    ],
    placeholder: 'Please enter Value',
    error: true,
    errorMessage: '',
  },
};
