import './typography';
import '../../index.css';

export default {
  title: 'Custom Components/Typography',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-typography');
    if (!el) {
      el = document.createElement('my-typography');
    }
    el.innerHTML = args.slot;
    el.type = args.type;
    el.color = args.color;
    return el;
  },
  argTypes: {
    slot: 'text',
    type: { type: 'select', options: ['header', 'p', 'caption'] },
    color: { type: 'select', options: ['primary', 'text', 'disabled'] },
  },
  parameters: {
    docs: {
      description: {
        component: `
Typography component for displaying text with different styles and colors.

        `,
      },
    },
  },
};

export const Typography = {
  args: {
    slot: 'Typography Component',
    type: 'header',
    color: 'primary',
  },
};
