import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { TextField } from './TextField.tsx';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';

const meta: Meta = {
  title: 'Inputs/TextField',
  component: TextField,
  tags: ['autodocs', '!dev'],
  render: (props) => (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '1rem',
    }}>
      <TextField {...props} label="Text Field" />
      <TextField {...props} className={getSelector.class('hover')} label="Text Field Hover"  />
      <TextField {...props} className={getSelectors.class('focus', 'focus-within')} label="Text Field Focused" />
      <TextField {...props} validators={[() => 'This is an error']} label="Text Field Error" />
      <TextField {...props} disabled label="Text Field Disabled" />
      <TextField {...props} readOnly label="Text Field Read-only" />
    </div>
  ),
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
