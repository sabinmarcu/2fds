export type BrandCheckboxPalette = Record<
  'default' | 'hover' | 'focused' | 'error' | 'disabled',
  string
>;
export const checkboxInactive = {
  default: '#4F555F',
  hover: '#2A0062',
  focused: '#5F36BC',
  error: '#D83535',
  disabled: '#8F9499',
} satisfies BrandCheckboxPalette;

export const checkboxActive = {
  default: '#5F36BC',
  hover: '#794CDE',
  focused: '#5F36BC',
  error: '#B62424',
  disabled: '#8F9499',
} satisfies BrandCheckboxPalette;

export const brandCheckbox = {
  text: '#25292C',
  'text-disabled': '#6C7176',
  outline: '#9465FF',
  inactive: checkboxInactive,
  active: checkboxActive,
};
