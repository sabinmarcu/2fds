import './global.css.ts';
// @ts-expect-error
import '@fontsource/inter';
import {
  type EnvType,
  framework,
  validFrameworks,
} from './env';
import {
  generateFrameworkRoot,
  generateSplitRoot,
} from './frameworkConfig';

const entrypoints = {
  react: 'main.react.tsx',
  vue: 'main.vue.ts',
} satisfies Record<EnvType['FRAMEWORK'] & string, string>;

if (framework) {
  generateFrameworkRoot(framework);
  import(/* @vite-ignore */ `./${entrypoints[framework]}`);
} else {
  generateSplitRoot();
  for (const fw of validFrameworks) {
    import(/* @vite-ignore */ `./${entrypoints[fw]}`);
  }
}

