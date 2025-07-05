import './confirmation';

import { action } from 'storybook/actions';

export default {
  title: 'Custom Components/Confirmation',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-confirmation');
    if (!el) {
      el = document.createElement('my-confirmation');
      el.addEventListener('proceed', () => {
        action('proceed')();
      });
    }
    el.open = args.open;
    el.message = args.message;
    el.title = args.title;
    el.proceedText = args.proceedText;
    el.cancelText = args.cancelText;

    return el;
  },
  argTypes: {
    open: 'boolean',
    message: 'string',
    title: 'text',
    proceedText: 'text',
    cancelText: 'text',
  },
  parameters: {
    docs: {
      description: {
        component: `The Confirmation component is used to display a confirmation dialog with a message. It typically includes options for the user to confirm or cancel an action.`,
      },
    },
  },
};

export const Confirmation = {
  args: {
    open: false,
    message: 'Are you sure you want to proceed?',
    title: 'Are you sure?',
    proceedText: 'Proceed',
    cancelText: 'Cancel',
  },
};
