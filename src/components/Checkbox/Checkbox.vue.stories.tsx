import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';

import Checkbox from './Checkbox.vue';
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
  render: (arguments_) => ({
    components: { Checkbox },
    setup() {
      return { args: arguments_ };
    },
    template: `<div :style="{'display': 'flex', 'flex-flow': 'row wrap', 'gap': '1rem'}">
      <Checkbox v-bind="args">Checkbox</Checkbox>
      <Checkbox v-bind="args" :class="{ ['${getSelector.class('hover')}']: true }">Checkbox Hover</Checkbox>
      <Checkbox v-bind="args" :class="{ ['${getSelectors.class('focus', 'focus-within')}']: true }">Checkbox Focused</Checkbox>
      <Checkbox v-bind="args" aria-invalid>Checkbox Hover</Checkbox>
      <Checkbox v-bind="args" disabled>Checkbox Disabled</Checkbox>
      <Checkbox v-bind="args" readOnly>Checkbox Disabled</Checkbox>
    </div>`,
  }),
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
