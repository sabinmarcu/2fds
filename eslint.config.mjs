import config from '@sabinmarcu/eslint-config';
import pluginVue from 'eslint-plugin-vue';

/** @type {import('@typescript-eslint/utils').TSESLint.FlatConfig.ConfigFile} */
const eslintConfig = [...config, ...pluginVue.configs['flat/base'], {
  name: 'Overrides',
  rules: {
    'import/extensions': 'off',
  },
}];

export default eslintConfig;
