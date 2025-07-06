import './button';

export default {
  title: 'Custom Components/Button',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-button');
    if (!el) {
      el = document.createElement('my-button');
    }
    el.innerHTML = args.slot;
    el.variant = args.variant;
    el.color = args.color;
    el.size = args.size;
    el.icon = args.icon;

    return el;
  },
  argTypes: {
    slot: 'text',
    variant: {
      type: 'select',
      options: ['contained', 'outlined', 'text'],
      description:
        'The variant of the button determines its style and behavior.',
    }, // contained | outlined | text
    color: {
      type: 'select',
      options: ['primary', 'secondary', 'disabled', 'text-color'],
      description: 'The color of the button determines its appearance.',
    }, // primary | secondary | disabled | text-color
    size: {
      type: 'select',
      options: ['small', 'medium', 'large'],
      description:
        ' The size of the button determines its dimensions and padding.',
    }, // small | medium | large
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
      description:
        'The icon of the button can be set to display san icon alongside the text.',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `This is a custom button component built with Lit. It can be used to create buttons for your application.

        `,
      },
    },
  },
};

export const Button = {
  args: {
    slot: 'Button',
    variant: 'contained',
    color: 'primary',
    size: 'medium',
  },
};
