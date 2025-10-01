import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { TextInput } from './TextInput.tsx';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';

const meta: Meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
  tags: ['autodocs', '!dev'],
  render: (props) => (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '1rem',
    }}>
      <TextInput {...props} label="Text Field" />
      <TextInput {...props} className={getSelector.class('hover')} label="Text Field Hover"  />
      <TextInput {...props} className={getSelectors.class('focus', 'focus-within')} label="Text Field Focused" />
      <TextInput {...props} validators={[() => 'This is an error']} label="Text Field Error" />
      <TextInput {...props} disabled label="Text Field Disabled" />
      <TextInput {...props} readOnly label="Text Field Read-only" />
    </div>
  ),
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
