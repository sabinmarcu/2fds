/* eslint-disable import/no-named-as-default */
import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { fn } from 'storybook/test';

import Button from './Button.tsx';
import { type ButtonStylesProps } from './Button.css';

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
