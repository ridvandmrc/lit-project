import './typography';

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
    slot: {
      type: 'text',
      description: 'Content to be displayed in the typography component',
    },
    type: {
      type: 'select',
      options: ['title', 'paragraph', 'caption'],
      description:
        'The type of typography determines its style and semantic meaning.',
    },
    color: {
      type: 'select',
      options: ['primary', 'text', 'disabled'],
      description: 'The color of the typography determines its appearance.',
    },
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
    type: 'title',
    color: 'primary',
  },
};
