import js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import pluginVue from 'eslint-plugin-vue';
import { configs as tsConfigs, parser as tsParser } from 'typescript-eslint';
import parserVue from 'vue-eslint-parser';

export default [
  js.configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  ...tsConfigs.recommended,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    rules: {
      'import-x/first': 'error',
      'import-x/exports-last': 'error',
      'import-x/newline-after-import': 'error',
      'import-x/prefer-default-export': 'error',
      'import-x/group-exports': 'error',
      'import-x/no-duplicates': 'error',
      'import-x/no-amd': 'error',
      'import-x/no-commonjs': 'error',
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
          },
        },
      ],
      'import-x/no-unused-modules': 'error',
      'import-x/no-mutable-exports': 'error',
      'import-x/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            'eslint.config.js',
            'vite.config.ts',
            'test/**/*.test.ts',
          ],
        },
      ],
      '@typescript-eslint/explicit-function-return-type': 'error',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/custom-event-name-casing': ['error', 'kebab-case'],
      'vue/html-self-closing': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multi-word-component-names': 'error',
      'vue/block-lang': [
        'error',
        {
          script: {
            lang: 'ts',
          },
        },
      ],
      'vue/block-order': [
        'error',
        {
          order: ['template', 'script', 'style'],
        },
      ],
      'vue/block-tag-newline': 'error',
      'vue/component-name-in-template-casing': 'error',
      'vue/define-emits-declaration': ['error', 'type-literal'],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineModel', 'defineProps', 'defineEmits', 'defineSlots'],
          defineExposeLast: false,
        },
      ],
      'vue/define-props-declaration': 'error',
      'vue/enforce-style-attribute': 'error',
      'vue/no-empty-component-block': 'error',
      'vue/no-multiple-objects-in-class': 'error',
      'vue/no-required-prop-with-default': 'error',
      'vue/no-template-target-blank': 'error',
      'vue/no-undef-components': 'error',
      'vue/no-undef-properties': 'error',
      'vue/no-unused-emit-declarations': 'error',
      'vue/no-unused-properties': 'error',
      'vue/no-unused-refs': 'error',
      'vue/no-useless-v-bind': 'error',
      'vue/prefer-separate-static-class': 'error',
      'vue/prefer-true-attribute-shorthand': 'error',
      'vue/require-typed-ref': 'error',
      'vue/v-on-handler-style': 'error',
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
    },
  },
  {
    files: ['src/pages/**/*.vue', 'src/components/__common/icon/**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
    },
  },
];
