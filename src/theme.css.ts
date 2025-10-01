import {
  setupTheme,
} from '@sabinmarcu/theme/ssr';
import { theme as baseTheme } from '@sabinmarcu/theme';
import type { CSSProperties } from '@vanilla-extract/css';
import { brandButton } from './theme.button.css';
import { brandCheckbox } from './theme.checkbox.css';
import { brandTextfield } from './theme.input.css';

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

const finalTheme = {
  ...baseTheme,
  brand: {
    button: brandButton,
    checkbox: brandCheckbox,
    input: brandTextfield,
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
        p5: 12,
      },
      lineHeight: {
        p4: 20,
        p5: 16,
      },
    },
  },
  transitions: {
    interaction: 0.2,
    animation: 1,
    slowAnimation: 7,
  },
};

export const theme = {
  ...finalTheme,
  transition: (...properties: (keyof CSSProperties)[]) => (properties.map(
    (property) => `${property} ${finalTheme.transitions.interaction}s ease-out`,
  ).join(', ')),
};
