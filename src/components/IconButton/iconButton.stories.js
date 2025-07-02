import './iconButton';

export default {
  title: 'Custom Components/Icon Button',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-icon-button');
    if (!el) {
      el = document.createElement('my-icon-button');
    }
    el.icon = args.icon;
    el.color = args.color;
    el.size = args.size;

    return el;
  },
  argTypes: {
    icon: {
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
IconButton is a custom button component that displays an icon. It can be used for actions like edit, delete, or any other icon-based interaction. The button can be styled with different colors and sizes.
        `,
      },
    },
  },
};

export const IconButton = {
  args: {
    icon: 'calendar',
    color: 'secondary',
    size: 'large',
  },
};
