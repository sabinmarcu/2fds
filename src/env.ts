import { z } from 'zod';
import debug from 'debug';

export const validFrameworks = ['vue', 'react'] as const;

const envSchema = z.object({
  FRAMEWORK: z.enum(validFrameworks).optional(),
});

export type EnvType = z.infer<typeof envSchema>;

export const parseEnv = (envSource: Record<string, string>) => {
  const { FRAMEWORK: framework } = envSchema.parse(envSource);
  debug('app:env')(`Framework detected: ${framework}`);
  return framework;
};

const possibleEnvSources = [
  () => {
    try {
      return (globalThis as any).process?.env;
    } catch {
      return undefined;
    }
  },
  () => {
    try {
      // @ts-ignore
      return import.meta.env;
    } catch {
      return undefined;
    }
  },
].map((it) => it());

export const framework = parseEnv(
  possibleEnvSources.find((it) => !!it),
);

debug('app:env')(`Root Discovery: ${framework}`);
