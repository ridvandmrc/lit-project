import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',

    coverage: {
      reporter: ['text', 'html'],
      reportsDirectory: './coverage',
      include: ['src/**/*.js'],
      exclude: [
        'src/**/*.stories.js',
        'src/**/index.js',
        'src/constants/'
      ],
    },
  },
});
