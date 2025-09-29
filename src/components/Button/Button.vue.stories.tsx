import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';

import { fn } from 'storybook/test';

import Button from './Button.vue';
import { type ButtonStylesProps } from './Button.css';
import {
  getSelector,
  getSelectors,
} from '@/utils/selectors';

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
  render: (arguments_) => ({
    components: { Button },
    setup() {
      return { args: arguments_ };
    },
    template: `<div :style="{'display': 'flex', 'flex-flow': 'row wrap', 'gap': '1rem'}">
      <Button v-bind="args">Button</Button>
      <Button v-bind="args" :class="{ ['${getSelector.class('hover')}']: true }">Button Hover</Button>
      <Button v-bind="args" :class="{ ['${getSelector.class('active')}']: true }">Button Pressed</Button>
      <Button v-bind="args" :class="{ ['${getSelectors.class('focus', 'focus-within')}']: true }">Button Focused</Button>
      <Button v-bind="args" disabled>Button Disabled</Button>
    </div>`,
  }),
  args: {
    onClick: fn(),
    default: 'Button',
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
