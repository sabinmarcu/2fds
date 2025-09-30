import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { Checkbox } from './Checkbox.tsx';
import { States } from './Checkbox.constants.ts';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';

const meta: Meta = {
  title: 'Checkbox',
  component: Checkbox,
  tags: ['autodocs', '!dev'],
  argTypes: {
    value: {
      options: Object.keys(States),
      mapping: States,
      control: 'select',
    },
  },
  render: (props) => (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '1rem',
    }}>
      <Checkbox {...props}>Checkbox</Checkbox>
      <Checkbox {...props} className={getSelector.class('hover')}>Checkbox Hover</Checkbox>
      <Checkbox {...props} className={getSelectors.class('focus', 'focus-within')}>Checkbox Focused</Checkbox>
      <Checkbox {...props} aria-invalid>Checkbox Error</Checkbox>
      <Checkbox {...props} disabled>Checkbox Disabled</Checkbox>
      <Checkbox {...props} readOnly>Checkbox Read-only</Checkbox>
    </div>
  ),
  args: {
    value: 'CHECKED',
  },
};

type Story = StoryObj<typeof meta>;

export const Unchecked: Story = {
  args: {
    value: 'UNCHECKED',
  },
};

export const Checked: Story = {
  args: {
    value: 'CHECKED',
  },
};

export const Indeterminate: Story = {
  args: {
    value: 'INDETERMINATE',
  },
};

export default meta;
