import { style } from '@vanilla-extract/css';

export const checkboxGroupStyle = style({
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'flex-start',
  gap: '0.5rem',
});

export const checkboxGroupListStyle = style([
  checkboxGroupStyle,
  {
    paddingInlineStart: '2rem',
  },
]);
