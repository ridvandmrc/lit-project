import './datepicker';
import '../Icon/icon';

export default {
  title: 'Custom Form Components/Datepicker',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-datepicker');
    if (!el) {
      el = document.createElement('my-datepicker');
    }
    el.label = args.label;
    el.value = args.value;
    el.placeholder = args.placeholder;
    el.format = args.format || 'DD/MM/YYYY'; // Default format if not provided
    el.error = args.error;
    el.errorMessage = args.errorMessage;

    return el;
  },
  argTypes: {
    label: { type: 'text', description: 'Label for the datepicker' },
    value: {
      type: 'text',
      description: 'Selected date value in the specified format',
    },
    placeholder: {
      type: 'text',
      description: 'Placeholder text for the date input',
    },
    format: {
      type: 'text', // e.g., 'DD/MM/YYYY' | 'YYYY-MM-DD'
      description: 'Date format for the input value',
    },
    error: {
      type: 'boolean',
      description: 'Indicates if there is an error in the date input',
    },
    errorMessage: {
      type: 'text',
      description: 'Error message to display when there is an error',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Datepicker is a custom date input component built with Lit. It allows users to select a date from a calendar interface. The component can be styled and customized with various attributes.`,
      },
    },
  },
};

export const Datepicker = {
  args: {
    label: 'Date of Birth',
    value: '13/02/2022',
    placeholder: 'Please enter Value',
    format: 'DD/MM/YYYY', // Default format
    error: false,
    errorMessage: '',
  },
};
