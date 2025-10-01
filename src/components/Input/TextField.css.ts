import {
  style,
  createVar,
  keyframes,
} from '@vanilla-extract/css';
import { theme } from '../../theme.css';
import {
  fixedHoverSelector,
  invalidSelectors,
  parentSelectors,
  getSelectors,
  getSelector,
} from '../../utils/selectors';

export const variables = {
  radius: createVar('textfield-radius'),
  border: createVar('textfield-border'),
  background: createVar('textfield-background'),
  outlineSize: createVar('textfield-outline-size'),
  borderSize: createVar('textfield-border-size'),
  outline: createVar('textfield-outline'),
  outlineDistance: createVar('textfield-outline-distance'),
  outlineAnimation: createVar('textfield-outline-animation'),
  gap: createVar('textfield-gap'),
} as const;

const outlinePositions = {
  start: `calc(${variables.outlineSize} * -1)`,
  end: `calc(${[variables.outlineSize, variables.borderSize, '1px'].map((it) => `${it} * -1`).join(' + ')})`,
};
const animationStop = Number.parseInt(
  ((theme.transitions.animation / theme.transitions.slowAnimation) * 100) as unknown as string,
  10,
);
const breatheAnimation = keyframes({
  '0%': {
    inset: outlinePositions.end,
  },
  [`${100 - animationStop * 2}%`]: {
    inset: outlinePositions.end,
  },
  [`${100 - animationStop * 2 + 1}%`]: {
    inset: outlinePositions.start,
  },
  [`${100 - animationStop}%`]: {
    inset: outlinePositions.start,
  },
  '100%': {
    inset: outlinePositions.end,
  },
});

export const textFieldStyle = style({
  display: 'inline-flex',
  flexFlow: 'column nowrap',
  alignItems: 'stretch',
  minBlockSize: 68,
  fontFamily: 'Inter',
  gap: variables.gap,

  color: theme.brand.input.text,

  vars: {
    [variables.radius]: `${theme.brand.radius.s}px`,
    [variables.borderSize]: '1px',
    [variables.border]: theme.brand.input.default,
    [variables.background]: 'transparent',
    [variables.outline]: 'transparent',
    [variables.outlineSize]: '2px',
    [variables.outlineDistance]: outlinePositions.start,
    [variables.outlineAnimation]: 'none',
    [variables.gap]: '8px',
  },

  selectors: {
    [fixedHoverSelector]: {
      vars: {
        [variables.border]: theme.brand.input.hover,
      },
    },
    [getSelectors('focus', 'focus-within')]: {
      vars: {
        [variables.border]: theme.brand.input.focused,
        [variables.outlineDistance]: outlinePositions.end,
        [variables.outline]: theme.brand.input.outline,
        [variables.outlineAnimation]: breatheAnimation,
      },
    },
    [invalidSelectors]: {
      vars: {
        [variables.border]: theme.brand.input.error,
        [variables.outline]: theme.brand.input['error-outline'],
      },
    },
    [parentSelectors(...getSelector('disabled').split(', '))]: {
      vars: {
        [variables.border]: theme.brand.input.disabled,
        [variables.background]: theme.brand.input['disabled-background'],
      },
      pointerEvents: 'none',
      color: theme.brand.input['disabled-text'],
      cursor: 'not-allowed',
    },
    [parentSelectors('[readonly]')]: {
      vars: {
        [variables.border]: theme.brand.input.readonly,
        [variables.background]: theme.brand.input['readonly-background'],
      },
      pointerEvents: 'none',
    },
  },
});

export const textFieldLabelStyle = style({
  fontSize: theme.brand.font.size.p4,
  lineHeight: `${theme.brand.font.lineHeight.p4}px`,
  // TODO: Clarify font weights
  // Design has it as 400 or 500 in different places.
  fontWeight: 400,
});

export const textFieldContainerStyle = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  alignItems: 'center',
  justifyContent: 'stretch',

  minBlockSize: 40,

  borderInlineStart: `solid ${variables.borderSize} ${variables.border}`,
  borderInlineEnd: `solid ${variables.borderSize} ${variables.border}`,
  borderBlockStart: `solid ${variables.borderSize} ${variables.border}`,
  borderBlockEnd: `solid ${variables.borderSize} ${variables.border}`,

  borderStartStartRadius: variables.radius,
  borderStartEndRadius: variables.radius,
  borderEndEndRadius: variables.radius,
  borderEndStartRadius: variables.radius,

  background: variables.background,

  transition: theme.transition('background', 'borderColor'),

  cursor: 'text',

  position: 'relative',
  selectors: {
    '&::before': {
      content: '',
      position: 'absolute',
      inset: variables.outlineDistance,

      borderStartStartRadius: variables.radius,
      borderStartEndRadius: variables.radius,
      borderEndEndRadius: variables.radius,
      borderEndStartRadius: variables.radius,

      borderInlineStart: `solid ${variables.outlineSize} ${variables.outline}`,
      borderInlineEnd: `solid ${variables.outlineSize} ${variables.outline}`,
      borderBlockStart: `solid ${variables.outlineSize} ${variables.outline}`,
      borderBlockEnd: `solid ${variables.outlineSize} ${variables.outline}`,

      transition: theme.transition('inset'),

      animationDuration: `${theme.transitions.slowAnimation}s`,
      animationDelay: `${theme.transitions.animation}s`,
      animationIterationCount: 'infinite',
      animationDirection: 'reverse',
      animationName: variables.outlineAnimation,

      pointerEvents: 'none',
    },
  },
});

export const textFieldInputStyle = style({
  flex: 1,

  marginBlockStart: '10px',
  marginBlockEnd: '10px',
  marginInlineStart: '16px',
  marginInlineEnd: '16px',

  borderInlineStart: 'none',
  borderInlineEnd: 'none',
  borderBlockStart: 'none',
  borderBlockEnd: 'none',

  background: 'transparent',
  color: 'currentColor',

  outline: 'none',
});

export const textFieldErrorsContainer = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'stretch',
  gap: variables.gap,
  fontSize: theme.brand.font.size.p5,
  lineHeight: `${theme.brand.font.lineHeight.p5}px`,
  fontWeight: 400,
});

export const textFieldError = style({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'flex-start',
  alignItems: 'center',
  color: theme.brand.input['error-message'],
  gap: 6,
});

export const textFieldErrorIcon = style({
  paddingBlockStart: 1,
  paddingBlockEnd: 1,
  paddingInlineStart: 1,
  paddingInlineEnd: 1,
  color: theme.brand.input['error-message-icon'],
});
