import './input';

export default {
  title: 'Custom Form Components/Input',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-input');
    if (!el) {
      el = document.createElement('my-input');
    }
    el.label = args.label;
    el.type = args.type;
    el.value = args.value;
    el.placeholder = args.placeholder;
    el.error = args.error;
    el.errorMessage = args.errorMessage;

    return el;
  },
  argTypes: {
    label: { type: 'text', description: 'Label for the input field' },
    value: { type: 'text', description: 'Current value of the input field' },
    placeholder: {
      type: 'text',
      description: 'Placeholder text for the input field',
    },
    type: {
      type: 'select',
      options: ['text', 'password', 'email', 'number'],
      description: 'Type of the input field',
    },
    error: {
      type: 'boolean',
      description: 'Indicates if there is an error in the input field',
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
Input is a custom input component built with Lit. It can be used to create text fields, password fields, email inputs, and number inputs. The component supports different types of inputs and can be styled with various attributes.
        `,
      },
    },
  },
};

export const Input = {
  args: {
    label: 'First Name',
    type: 'text',
    value: 'Jhon',
    placeholder: 'Please enter Value',
    error: false,
    errorMessage: '',
  },
};
