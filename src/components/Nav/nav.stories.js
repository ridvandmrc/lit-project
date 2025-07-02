import './nav';
import '../../icons.css'

export default {
  title: 'Custom Components/Navbar',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-nav');
    if (!el) {
      el = document.createElement('my-nav');
    }
    el.innerHTML = args.slot;

    return el;
  },
  argTypes: {
    slot: 'text',
  },
  parameters: {
    docs: {
      description: {
        component: `
This is a custom navbar component built with Lit. It can be used to create a navigation bar for your application.

        `,
      },
    },
  },
};

export const Navbar = {
  args: {
    slot: 'Navbar Component',
  },
};
