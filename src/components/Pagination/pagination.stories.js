import './pagination';
import '../Button/button';
import '../IconButton/iconButton';

import { action } from 'storybook/actions';

export default {
  title: 'Custom Components/Pagination',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-pagination');
    if (!el) {
      el = document.createElement('my-pagination');
    }
    el.total = args.total;
    el.current = args.current;
    el.addEventListener('pageChange', (e) => {
      action('pageChange')(e.detail.current);
    });
    return el;
  },
  argTypes: {
    total: { type: Number, description: 'Total number of pages' },
    current: { type: Number, description: 'Current active page' },
  },
  parameters: {
    docs: {
      description: {
        component: `Pagination component for navigating through pages of content. It allows users to move between different pages and highlights the current page.

        `,
      },
    },
  },
};

export const Pagination = {
  args: {
    total: 10,
    current: 2,
  },
};
