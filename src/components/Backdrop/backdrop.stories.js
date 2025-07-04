import './backdrop';

export default {
  title: 'Custom Components/Backdrop',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-backdrop');
    if (!el) {
      el = document.createElement('my-backdrop');
    }
    el.innerHTML = args.slot;
    el.open = args.open;

    return el;
  },
  argTypes: {
    slot: 'text',
    open: 'boolean',
  },
  parameters: {
    docs: {
      description: {
        component: `The Backdrop component is used to create a backdrop for other elements, typically used in modal dialogs or overlays. It provides a dimmed background that focuses attention on the foreground content.`,
      },
    },
  },
};

export const Backdrop = {
  args: {
    slot: 'Backdrop',
    open: true,
  },
};
