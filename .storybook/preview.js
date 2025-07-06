/** @type { import('@storybook/web-components-vite').Preview } */

import '../src/styles/index.css';

export const decorators = [
  (Story) => {
    const body = document.body;
    if (!body.classList.contains('body-light')) {
      body.classList.add('body-light');
    }

    return Story();
  },
];

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
  },
};

export default preview;
