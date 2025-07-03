import './card';

export default {
  title: 'Custom Components/Card',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-card');
    if (!el) {
      el = document.createElement('my-card');
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
        component: `This is a custom card component built with Lit. It can be used to display content in a card format, which is useful for showcasing items like products, articles, or user profiles.`,
      },
    },
  },
};

export const Card = {
  args: {
    slot: 'Card Component',
  },
};
