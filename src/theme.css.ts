import {
  setupTheme,
} from '@sabinmarcu/theme/ssr';
import { theme as baseTheme } from '@sabinmarcu/theme';
import type { CSSProperties } from '@vanilla-extract/css';

setupTheme({
  primary: '#0cf',
  secondary: '#f0c',
  background: {
    light: '#e0e0e0',
    dark: '#171717',
  },
  success: 'green',
  info: 'blue',
  warning: 'yellow',
  error: 'red',
  grid: 16,
});

type BrandStatePalette = {
  background: string,
  border?: string,
};
type BrandPalette = (
  & Record<
    'default' | 'hover' | 'pressed' | 'focused' | 'disabled',
    BrandStatePalette
  >
  & Record<
    | 'text' | 'text-disabled' | 'outline',
    string
  >
);

const brandPrimary: BrandPalette = {
  default: {
    background: '#5F36BC',
  },
  hover: {
    background: '#794CDE',
  },
  pressed: {
    background: '#48249A',
  },
  focused: {
    background: '#5F36BC',
  },
  disabled: {
    background: '#6C7176',
  },
  outline: '#9465FF',
  text: '#FFFFFF',
  'text-disabled': '#F6F6F6',
} satisfies BrandPalette;

const brandSecondary = {
  default: {
    background: '#FFFFFF',
    border: '#CECBD6',
  },
  hover: {
    background: '#F1F3F7',
  },
  pressed: {
    background: '#E8EBF0',
  },
  focused: {
    background: 'transparent',
    border: brandPrimary.focused.background,
  },
  disabled: {
    background: '#F6F6F6',
  },
  outline: brandPrimary.outline,
  text: '#2A0062',
  'text-disabled': '#6C7176',
} satisfies BrandPalette;

const brandText = {
  default: {
    background: 'transparent',
  },
  hover: {
    background: '#F1F3F7',
  },
  pressed: {
    background: '#E8EBF0',
  },
  focused: {
    background: '#FFFFFF',
  },
  disabled: {
    background: 'transparent',
  },
  outline: brandPrimary.outline,
  text: brandSecondary.text,
  'text-disabled': brandSecondary['text-disabled'],
} satisfies BrandPalette;

const brandDanger = {
  default: {
    background: '#B62424',
  },
  hover: {
    background: '#D83535',
  },
  pressed: {
    background: '#941616',
  },
  focused: {
    background: '#B62424',
  },
  disabled: {
    background: '#6C7176',
  },
  outline: '#FA4949',
  text: brandPrimary.text,
  'text-disabled': brandPrimary['text-disabled'],
} satisfies BrandPalette;

const finalTheme = {
  ...baseTheme,
  brand: {
    primary: brandPrimary,
    secondary: brandSecondary,
    danger: brandDanger,
    text: brandText,
    icon: {
      'inverted-disabled': '#F6F6F6',
      disabled: '#8F9499',
      hover: '#2A0062',
      main: '#4F555F',
    },
    spacing: {
      xs: 8,
      l: 24,
    },
    radius: {
      round: 100,
      s: 4,
    },
    font: {
      size: {
        p4: 14,
      },
      lineHeight: {
        p4: 20,
      },
    },
  },
  transitions: {
    interaction: 0.2,
    animation: 1,
  },
};

export const theme = {
  ...finalTheme,
  transition: (...properties: (keyof CSSProperties)[]) => (properties.map(
    (property) => `${property} ${finalTheme.transitions.interaction}s ease-out`,
  ).join(', ')),
};
