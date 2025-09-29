import './global.css.ts';
// @ts-expect-error
import '@fontsource/inter';
import {
  framework,
} from './env';
import {
  generateFrameworkRoot,
  generateSplitRoot,
} from './frameworkConfig';

if (framework) {
  generateFrameworkRoot(framework);
  if (framework === 'vue') {
    import('./main.vue.ts');
  } else {
    import('./main.react.tsx');
  }
} else {
  generateSplitRoot();
  import('./main.vue.ts');
  import('./main.react.tsx');
}

