import {
  createVar,
  keyframes,
  style,
} from '@vanilla-extract/css';
import {
  recipe,
  type RecipeVariants,
} from '@vanilla-extract/recipes';
import { theme } from '../../theme.css';
import {
  fixedHoverSelector,
  invalidSelectors,
  getSelector,
  getSelectors,
  parentSelectors,
} from '../../utils/selectors';

export const checkboxInputStyle = style({
  overflow: 'hidden',
  inlineSize: 0,
  blockSize: 0,
  marginBlockStart: 0,
  marginBlockEnd: 0,
  marginInlineStart: 0,
  marginInlineEnd: 0,
  paddingBlockStart: 0,
  paddingBlockEnd: 0,
  paddingInlineStart: 0,
  paddingInlineEnd: 0,
});

export const variables = {
  radius: createVar('checkbox-box-radius'),
  border: createVar('checkbox-box-border'),
  background: createVar('checkbox-box-background'),
  outlineSize: createVar('checkbox-box-outline-size'),
  borderSize: createVar('checkbox-box-border-size'),
  outline: createVar('checkbox-box-outline'),
  outlineDistance: createVar('checkbox-box-outline-distance'),
  outlineAnimation: createVar('checkbox-box-outline-animation'),
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

const uncheckedStyles: Parameters<typeof recipe>[0]['base'] = {
  vars: {
    [variables.border]: theme.brand.checkbox.inactive.default,
  },
  selectors: {
    [getSelector('hover')]: {
      vars: {
        [variables.border]: theme.brand.checkbox.inactive.hover,
      },
    },
    [getSelectors('focus', 'focus-within')]: {
      vars: {
        [variables.border]: theme.brand.checkbox.inactive.focused,
        [variables.outlineDistance]: outlinePositions.end,
        [variables.outline]: theme.brand.checkbox.outline,
        [variables.outlineAnimation]: breatheAnimation,
      },
    },
    [invalidSelectors]: {
      vars: {
        [variables.border]: theme.brand.checkbox.inactive.error,
        [variables.outline]: theme.brand.checkbox.inactive.error,
      },
    },
    [parentSelectors(...getSelector('disabled').split(', '))]: {
      vars: {
        [variables.border]: theme.brand.checkbox.inactive.disabled,
      },
      pointerEvents: 'none',
      cursor: 'not-allowed',
    },
    [parentSelectors('[readonly]')]: {
      vars: {
        [variables.border]: theme.brand.checkbox.inactive.disabled,
      },
      pointerEvents: 'none',
    },
  },
};
const checkedStyles: Parameters<typeof recipe>[0]['base'] = {
  vars: {
    [variables.background]: theme.brand.checkbox.active.default,
    [variables.border]: theme.brand.checkbox.active.default,
  },
  selectors: {
    [fixedHoverSelector]: {
      vars: {
        [variables.background]: theme.brand.checkbox.active.hover,
        [variables.border]: theme.brand.checkbox.active.hover,
      },
    },
    [getSelectors('focus', 'focus-within')]: {
      vars: {
        [variables.background]: theme.brand.checkbox.active.focused,
        [variables.border]: theme.brand.checkbox.active.focused,
        [variables.outlineDistance]: outlinePositions.end,
        [variables.outline]: theme.brand.checkbox.outline,
        [variables.outlineAnimation]: breatheAnimation,
      },
    },
    [invalidSelectors]: {
      vars: {
        [variables.background]: theme.brand.checkbox.active.error,
        [variables.border]: theme.brand.checkbox.active.error,
        [variables.outline]: theme.brand.checkbox.active.error,
      },
    },
    [parentSelectors(':disabled')]: {
      vars: {
        [variables.background]: theme.brand.checkbox.active.disabled,
        [variables.border]: theme.brand.checkbox.active.disabled,
      },
      pointerEvents: 'none',
      cursor: 'not-allowed',
    },
    [parentSelectors('[readonly]')]: {
      vars: {
        [variables.background]: theme.brand.checkbox.active.disabled,
        [variables.border]: theme.brand.checkbox.active.disabled,
      },
      pointerEvents: 'none',
    },
  },
};

export const checkboxStyles = recipe({
  base: {
    display: 'inline-flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'flex-start',
    color: theme.brand.checkbox.text,
    selectors: {
      [parentSelectors(':disabled')]: {
        color: theme.brand.checkbox['text-disabled'],
      },
    },
    vars: {
      [variables.outline]: 'transparent',
      [variables.outlineSize]: '2px',
      [variables.outlineDistance]: outlinePositions.start,
      [variables.outlineAnimation]: 'none',
      [variables.borderSize]: '1px',

      [variables.radius]: `${theme.brand.radius.s}px`,
    },
  },
  variants: {
    state: {
      unchecked: uncheckedStyles,
      checked: checkedStyles,
      indeterminate: checkedStyles,
    },
  },
});

export type CheckboxStylesProps = RecipeVariants<typeof checkboxStyles>;

export const checkboxBoxStyle = style({
  inlineSize: 16,
  blockSize: 16,

  marginBlockStart: 2,
  marginBlockEnd: 2,
  marginInlineStart: 2,
  marginInlineEnd: 2,

  display: 'inline-grid',
  placeItems: 'center',

  borderStartStartRadius: variables.radius,
  borderStartEndRadius: variables.radius,
  borderEndEndRadius: variables.radius,
  borderEndStartRadius: variables.radius,

  background: variables.background,
  borderInlineStart: `solid ${variables.borderSize} ${variables.border}`,
  borderInlineEnd: `solid ${variables.borderSize} ${variables.border}`,
  borderBlockStart: `solid ${variables.borderSize} ${variables.border}`,
  borderBlockEnd: `solid ${variables.borderSize} ${variables.border}`,

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

export const checkboxTextStyle = style({
  fontSize: theme.brand.font.size.p4,
  lineHeight: `${theme.brand.font.lineHeight.p4}px`,
  fontWeight: 400,
  fontFamily: 'Inter',
  paddingInlineStart: 10,
});
