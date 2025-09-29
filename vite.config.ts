import {
  defineConfig,
  loadEnv,
} from 'vite';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import tsconfigPaths from 'vite-tsconfig-paths';

import {
  type EnvType,
  parseEnv,
  validFrameworks,
} from './src/env';

const plugins = {
  vue: async () => {
    const { default: vue } = await import('@vitejs/plugin-vue');
    return [vue()];
  },
  react: async () => {
    const { default: react } = await import('@vitejs/plugin-react');
    return [react()];
  },
} satisfies Record<
  EnvType['FRAMEWORK'] & string,
  () => Promise<any[]>
>;

const pluginCache: Record<EnvType['FRAMEWORK'] & string, any> = {} as any;

const loadPlugins = async (which: EnvType['FRAMEWORK']): Promise<any[]> => {
  if (!which) {
    const pluginsCollections = await Promise.all(
      validFrameworks.map(
        (framework) => loadPlugins(framework),
      ),
    );
    return pluginsCollections.flat();
  }
  if (!pluginCache[which]) {
    const localPlugins = await plugins[which]();
    pluginCache[which] = localPlugins;
  }
  return pluginCache[which];
};

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const framework = parseEnv(env);
  return {
    plugins: [
      await loadPlugins(framework),
      vanillaExtractPlugin(),
      tsconfigPaths({ loose: true }),
    ],
    define: {
      'import.meta.env.FRAMEWORK': JSON.stringify(framework),
    },
  };
});
