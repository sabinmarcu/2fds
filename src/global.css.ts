import {
  createVar,
  globalStyle,
  type StyleRule,
} from '@vanilla-extract/css';
import {
  theme,
} from '@/theme.css';
import { containers } from './frameworkConfig';
import { validFrameworks } from './env';

const stretchStyles: StyleRule = {
  margin: 0,
  padding: 0,
};

globalStyle('*', {
  boxSizing: 'border-box',
});

globalStyle(['*', '*::before'].join(', '), {
  '@media': {
    '(prefers-reduced-motion)': {
      transition: 'none !important',
      animation: 'none !important',
    },
  },
});

const spacingVariable = createVar('spacing');
globalStyle('html, body', {
  ...stretchStyles,
  inlineSize: '100dvw',
  blockSize: '100dvh',
  containerName: 'root',
  containerType: 'size',
  background: theme.colors.background.page,
  fontFamily: 'Inter',
  vars: {
    [spacingVariable]: theme.grid.m,
  },
});

globalStyle(`#${containers.split}`, {
  ...stretchStyles,
  inlineSize: '100cqw',
  blockSize: '100cqh',
  containerName: 'split container',
  containerType: 'size',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: 'auto',
  gap: spacingVariable,
  paddingBlockStart: spacingVariable,
  paddingBlockEnd: spacingVariable,
  paddingInlineStart: spacingVariable,
  paddingInlineEnd: spacingVariable,
  '@media': {
    '(max-aspect-ratio: 1)': {
      gridTemplateColumns: 'auto',
      gridTemplateRows: '1fr 1fr',
    },
  },
});

for (const framework of validFrameworks) {
  globalStyle(`#${containers[framework]}`, {
    ...stretchStyles,
    inlineSize: `calc(100cqw - ${spacingVariable} *2)`,
    blockSize: `calc(100cqh - ${spacingVariable} * 2)`,

    containerName: `${framework} container`,
    containerType: 'size',

    paddingBlockStart: spacingVariable,
    paddingBlockEnd: spacingVariable,
    paddingInlineStart: spacingVariable,
    paddingInlineEnd: spacingVariable,

    marginBlockStart: spacingVariable,
    marginBlockEnd: spacingVariable,
    marginInlineStart: spacingVariable,
    marginInlineEnd: spacingVariable,

    background: '#fff',
    color: theme.colors.background.text,

    borderStartStartRadius: theme.grid.xs,
    borderStartEndRadius: theme.grid.xs,
    borderEndEndRadius: theme.grid.xs,
    borderEndStartRadius: theme.grid.xs,
  });

  globalStyle(`#${containers.split} #${containers[framework]}`, {
    inlineSize: '100%',
    blockSize: '100%',

    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  });
}
