import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { fn } from 'storybook/test';

import { Button } from './Button.tsx';
import { type ButtonStylesProps } from './Button.css';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';

const meta: Meta = {
  title: 'Button',
  component: Button,
  tags: ['autodocs', '!dev'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'text', 'danger'] satisfies (ButtonStylesProps & {})['variant'][],
    },
  },
  render: (props) => (
    <div style={{
      display: 'flex',
      flexFlow: 'row wrap',
      gap: '1rem',
    }}>
      <Button {...props}>Button</Button>
      <Button {...props} className={getSelector.class('hover')}>Button Hover</Button>
      <Button {...props} className={getSelector.class('active')}>Button Pressed</Button>
      <Button {...props} className={getSelectors.class('focus', 'focus-within')}>Button Focused</Button>
      <Button {...props} disabled>Button Disabled</Button>
    </div>
  ),
  args: {
    onClick: fn(),
    children: 'Button',
  },
};

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
  },
};

export default meta;
