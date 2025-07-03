import './pageLayout';
import '../Button/button';
import '../Typography/typography';

export default {
  title: 'Custom Components/Page Layout',
  tags: ['autodocs'],
  render: (args) => {
    let el = document.querySelector('my-page-layout');
    if (!el) {
      el = document.createElement('my-page-layout');
    }
    el.innerHTML = `<my-page-layout pageTitle="Employee List">
        <section slot="head-actions">
          <my-button
            variant="text"
            color="primary"
            size="large"
            icon="hamburger"
          >
          </my-button>
          <my-button
            variant="text"
            color="primary"
            size="large"
            icon="grid"
          ></my-button>
        </section>
     
      </my-page-layout>`;
    el.total = args.total;

    return el;
  },
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `Page layout component that provides a structured layout for pages, including a header and content area. It allows for custom actions in the header and displays the page title.`,
      },
    },
  },
};

export const PageLayout = {
  args: {},
};
