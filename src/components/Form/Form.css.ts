import { globalStyle, style } from "@vanilla-extract/css";

export const formStyle = style({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateAreas: [
    ['name', 'email'],
    ['age age'],
    ['agreements agreements'],
    ['submit submit']
  ].map(group => `"${group.join(' ')}"`).join('\n'),
  gap: '1rem',
})

globalStyle(`${formStyle} > *:nth-child(1)`, {
  gridArea: 'name'
});
globalStyle(`${formStyle} > *:nth-child(2)`, {
  gridArea: 'email'
});
globalStyle(`${formStyle} > *:nth-child(3)`, {
  gridArea: 'age'
});
globalStyle(`${formStyle} > *:nth-child(4)`, {
  gridArea: 'agreements'
});
globalStyle(`${formStyle} > *:nth-child(5)`, {
  gridArea: 'submit'
});