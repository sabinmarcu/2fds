import type { StorybookConfig } from '@storybook/vue3-vite';

import {
  framework,
  type EnvType,
} from '../src/env.ts';

type ValidFrameworks = EnvType['FRAMEWORK'] & string;

const instanceConfig = {
  react: {
    stories: [
      '../src/**/*.react.mdx',
      '../src/**/*.react.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    framework: {
      name: '@storybook/react-vite',

      options: {
        docgen: 'vue-component-meta',
      },
    },
  },
  vue: {
    stories: [
      '../src/**/*.vue.mdx',
      '../src/**/*.vue.stories.@(js|jsx|mjs|ts|tsx)',
    ],
    framework: {
      name: '@storybook/vue3-vite',
      options: {},
    },
  },
} as const satisfies Record<ValidFrameworks, Partial<StorybookConfig>>;

const combinedConfig = {
  stories: [
    '../src/**/*.root.mdx',
    '../src/**/*.root.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  refs: {
    react: {
      title: 'React',
      url: 'http://localhost:6007',
    },
    vue: {
      title: 'Vue',
      url: 'http://localhost:6008',
    },
  },
  framework: instanceConfig.vue.framework,
} as const satisfies Partial<StorybookConfig>;

const config: StorybookConfig = {
  ...(framework
    ? instanceConfig[framework]
    : combinedConfig
  ),
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
};
export default config;
