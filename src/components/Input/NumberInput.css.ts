import {
  globalStyle,
  style,
} from '@vanilla-extract/css';
import { variables as buttonVariables } from '../Button/Button.css.ts';
import { variables as textFieldVariables } from './TextField.css.ts';
import { getSelectors } from '../../utils/selectors.ts';

const focusSelectorsArray = getSelectors('focus', 'focus-within').split(', ');
export const numberInputRootStyle = style({
  selectors: {
    [
    focusSelectorsArray.flatMap((rootSelector) => (
      focusSelectorsArray.map((childSelector) => (
        `${rootSelector}:has(button${childSelector.replace(/^&/, '')})`
      ))
    )).join(', ')
    ]: {
      vars: {
        [textFieldVariables.outlineAnimation]: 'none',
        [textFieldVariables.outline]: 'transparent',
        [textFieldVariables.outlineDistance]: '0px',
      },
    },
  },
});

export const numberInputButtonStyle = style({
  blockSize: 32,
  inlineSize: 32,

  maxInlineSize: 32,
  maxBlockSize: 32,

  minInlineSize: 0,

  paddingBlockStart: 0,
  paddingBlockEnd: 0,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,

  display: 'inline-grid',
  placeItems: 'center',
  background: 'transparent',

  borderInlineStart: 'none',
  borderInlineEnd: 'none',
  borderBlockStart: 'none',
  borderBlockEnd: 'none',

  vars: {
    [buttonVariables.radius]: '0px',
  },
});

globalStyle(`${numberInputRootStyle} input`, {
  textAlign: 'center',
  MozAppearance: 'textfield',
  WebkitAppearance: 'textfield',
});

globalStyle(
  ['webkit-outer-spin-button', 'webkit-inner-spin-button']
    .map((selector) => `${numberInputRootStyle} input::-${selector}`)
    .join(', '),
  {
    WebkitAppearance: 'none',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    marginInlineStart: 0,
    marginInlineEnd: 0,
  } as any,
);

