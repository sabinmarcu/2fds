import {
  createVar,
  keyframes,
} from '@vanilla-extract/css';
import {
  recipe,
  type RecipeVariants,
} from '@vanilla-extract/recipes';
import { theme } from '../../theme.css';
import {
  fixedActiveSelector,
  fixedHoverSelector,
  getSelector,
  getSelectors,
} from '../../utils/selectors';

const variables = {
  background: createVar('button-background'),
  text: createVar('button-text'),
  border: createVar('button-border'),
  radius: createVar('button-border-radius'),
  outline: createVar('button-outline'),
  borderSize: createVar('button-outline-size'),
  outlineDistance: createVar('button-outline-distance'),
  outlineAnimating: createVar('button-outline-animating'),
};

const outlinePositions = {
  start: `calc(${variables.borderSize} * -1)`,
  end: `calc(${variables.borderSize} * -2 - 1px)`,
};
const breatheAnimation = keyframes({
  '0%': {
    inset: outlinePositions.start,
  },
  '100%': {
    inset: outlinePositions.end,
  },
});

const mapBrandPaletteToVariant = (input: typeof theme.brand.button.primary) => {
  const defaultBorder = input.default.border ?? 'transparent';
  return {
    vars: {
      [variables.background]: input.default.background,
      [variables.text]: input.text,
      [variables.border]: defaultBorder,
    },
    selectors: {
      [fixedHoverSelector]: {
        vars: {
          [variables.background]: input.hover.background,
          [variables.border]: input.hover.border ?? defaultBorder,
        },
      },
      [fixedActiveSelector]: {
        vars: {
          [variables.background]: input.pressed.background,
          [variables.border]: input.pressed.border ?? defaultBorder,
        },
      },
      [getSelectors('focus', 'focus-within')]: {
        vars: {
          [variables.background]: input.focused.background,
          [variables.border]: input.focused.border ?? defaultBorder,
          [variables.outlineDistance]: outlinePositions.end,
          [variables.outline]: input.outline,
          [variables.outlineAnimating]: 'running',
        },
      },
      [getSelector('disabled')]: {
        cursor: 'not-allowed',
        vars: {
          [variables.background]: input.disabled.background,
          [variables.border]: input.disabled.border ?? defaultBorder,
          [variables.text]: input['text-disabled'],
        },
      },
    },
  } satisfies Parameters<typeof recipe>[0]['variants'];
};

export const buttonStyles = recipe({
  base: {
    minInlineSize: 120,
    borderStartStartRadius: variables.radius,
    borderStartEndRadius: variables.radius,
    borderEndEndRadius: variables.radius,
    borderEndStartRadius: variables.radius,
    paddingBlock: 10,
    paddingInline: theme.brand.spacing.l,
    gap: theme.brand.spacing.xs,

    // Common Styles
    background: variables.background,
    color: variables.text,
    borderInlineStart: `solid ${variables.borderSize} ${variables.border}`,
    borderInlineEnd: `solid ${variables.borderSize} ${variables.border}`,
    borderBlockStart: `solid ${variables.borderSize} ${variables.border}`,
    borderBlockEnd: `solid ${variables.borderSize} ${variables.border}`,
    fontSize: theme.brand.font.size.p4,
    fontFamily: 'Inter',
    lineHeight: `${theme.brand.font.lineHeight.p4}px`,
    fontWeight: 500,
    cursor: 'pointer',

    // Outline
    outline: 'none',
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

        borderInlineStart: `solid ${variables.borderSize} ${variables.outline}`,
        borderInlineEnd: `solid ${variables.borderSize} ${variables.outline}`,
        borderBlockStart: `solid ${variables.borderSize} ${variables.outline}`,
        borderBlockEnd: `solid ${variables.borderSize} ${variables.outline}`,

        transition: theme.transition('inset'),

        animationName: breatheAnimation,
        animationDuration: `${theme.transitions.animation}s`,
        animationIterationCount: 'infinite',
        animationDirection: 'alternate',
        animationPlayState: variables.outlineAnimating,

        pointerEvents: 'none',
      },
    },

    // Animation / Transition
    transition: theme.transition('background', 'borderColor'),

    vars: {
      [variables.radius]: `${theme.brand.radius.round}px`,
      [variables.outline]: 'transparent',
      [variables.borderSize]: '2px', // 3px outer spread - 1px inner spread
      [variables.outlineDistance]: outlinePositions.start,
      [variables.outlineAnimating]: 'paused',

    },
  },
  variants: {
    variant: {
      primary: mapBrandPaletteToVariant(theme.brand.button.primary),
      secondary: mapBrandPaletteToVariant(theme.brand.button.secondary),
      text: mapBrandPaletteToVariant(theme.brand.button.text),
      danger: mapBrandPaletteToVariant(theme.brand.button.danger),
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export type ButtonStylesProps = RecipeVariants<typeof buttonStyles>;
