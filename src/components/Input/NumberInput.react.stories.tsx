import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { NumberInput } from './NumberInput.tsx';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';
import { useState } from 'react';

const meta: Meta = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs', '!dev'],
  render: (props) => {
    const [state, setState] = useState<NumberInput.ValueType>(0);
    return (
      <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        gap: '1rem',
      }}>
        <NumberInput {...props} label="Text Field" value={state} onChange={setState} />
        <NumberInput {...props} className={getSelector.class('hover')} label="Text Field Hover" value={state} onChange={setState} />
        <NumberInput {...props} className={getSelectors.class('focus', 'focus-within')} label="Text Field Focused" value={state} onChange={setState}  />
        <NumberInput {...props} validators={[() => 'This is an error']} label="Text Field Error" value={state} onChange={setState}  />
        <NumberInput {...props} disabled label="Text Field Disabled" value={state} onChange={setState} />
        <NumberInput {...props} readOnly label="Text Field Read-only" value={state} onChange={setState} />
      </div>
    )
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
