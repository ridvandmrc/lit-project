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

    return el;
  },
  argTypes: {
    label: 'text',
    value: 'text',
    placeholder: 'text',
    type: { type: 'select', options: ['text', 'password', 'email', 'number'] },
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
  },
};
