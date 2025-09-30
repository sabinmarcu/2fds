type BrandButtonStatePalette = {
  background: string,
  border?: string,
};
type BrandButtonPalette = (
  & Record<
    'default' | 'hover' | 'pressed' | 'focused' | 'disabled',
    BrandButtonStatePalette
  >
  & Record<
    | 'text' | 'text-disabled' | 'outline',
    string
  >
);

const brandPrimary: BrandButtonPalette = {
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
} satisfies BrandButtonPalette;

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
} satisfies BrandButtonPalette;

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
} satisfies BrandButtonPalette;

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
} satisfies BrandButtonPalette;

export const brandButton = {
  primary: brandPrimary,
  secondary: brandSecondary,
  danger: brandDanger,
  text: brandText,
};
