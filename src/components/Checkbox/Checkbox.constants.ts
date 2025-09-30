import type { CheckboxStylesProps } from './Checkbox.css';

export const States = {
  CHECKED: 1,
  UNCHECKED: 0,
  INDETERMINATE: -1,
} as const;

export const styleVariantMapping = {
  [States.CHECKED]: 'checked',
  [States.UNCHECKED]: 'unchecked',
  [States.INDETERMINATE]: 'indeterminate',
} as const satisfies Record<
  typeof States[keyof typeof States],
  (CheckboxStylesProps & {})['state']
>;

