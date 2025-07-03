import './icon';
import '../../icons.css';

export default {
  title: 'Custom Components/Icon',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-icon');
    if (!el) {
      el = document.createElement('my-icon');
    }
    el.name = args.name;
    el.color = args.color;
    el.size = args.size;

    return el;
  },
  argTypes: {
    name: {
      type: 'select',
      options: [
        'calendar',
        'cancel',
        'edit',
        'grid',
        'hamburger',
        'plus',
        'trash',
        'add-user',
        'chevron-right',
        'chevron-left',
      ],
    },
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'disabled'],
    },
    size: { type: ['select'], options: ['small', 'medium', 'large'] },
  },
  parameters: {
    docs: {
      description: {
        component: `
        This is a custom icon component built with Lit. It can be used to display icons in your application.

        `,
      },
    },
  },
};

export const Icon = {
  args: {
    name: 'calendar',
    color: 'secondary',
    size: 'large',
  },
};
