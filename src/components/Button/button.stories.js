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
    variant: { type: 'select', options: ['contained', 'outlined', 'text'] }, // contained | outlined | text
    color: { type: 'select', options: ['primary', 'secondary', 'disabled','text-color'] }, // primary | secondary | disabled | text-color
    size: { type: 'select', options: ['small', 'medium', 'large'] }, // small | medium | large
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
