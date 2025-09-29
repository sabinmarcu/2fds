import type { EnvType } from './env';

export type ValidFrameworks = EnvType['FRAMEWORK'] & string;
export type ContainerTypes = ValidFrameworks | 'split';

export const containers = {
  react: 'react-root',
  vue: 'vue-root',
  split: 'split-root',
} satisfies Record<ContainerTypes, `${ContainerTypes}-root`>;

const createRoot = (which: keyof typeof containers) => {
  const element = document.createElement('div');
  element.setAttribute('id', containers[which]);
  return element;
};

export const generateSplitRoot = () => {
  const splitContainer = createRoot('split');
  const leftContainer = createRoot('vue');
  const rightContainer = createRoot('react');

  document.body.append(splitContainer);
  splitContainer.append(leftContainer);
  splitContainer.append(rightContainer);

  return splitContainer;
};

export const generateFrameworkRoot = (which: ValidFrameworks) => {
  const container = createRoot(which);
  document.body.append(container);

  return container;
};
