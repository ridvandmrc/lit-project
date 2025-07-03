// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from '@eslint/js';
import * as lit from 'eslint-plugin-lit';

export default [js.configs.recommended, {
  languageOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    globals: {
      console: 'readonly',
      window: 'readonly',
      document: 'readonly',
      HTMLElement: 'readonly',
      customElements: 'readonly',
      process: 'readonly',
      CustomEvent:'readonly',
      setTimeout: 'readonly',
    },
  },
  files: ['**/*.js'],
  plugins: {
    lit: lit,
  },
  rules: {
    ...lit.configs.recommended.rules,
  },
}, ...storybook.configs["flat/recommended"]];
