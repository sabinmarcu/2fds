import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

import TextField from './TextField.vue';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';
import { ref } from 'vue';

const meta: Meta = {
  title: 'Inputs/TextField',
  component: TextField,
  tags: ['autodocs', '!dev'],
  render: (attrs) => ({
    components: { TextField },
    setup() {
      const value = ref('');
      const validators = [() => 'This is an error']
      return { attrs, value, getSelector, getSelectors, validators }
    },
    template: `
      <div style="display: flex; flex-flow: row wrap; gap: 1rem;">
        <TextField v-bind="attrs" v-model="value" label="Text Field" />
        <TextField v-bind="attrs" v-model="value" label="Text Field" :class="getSelector.class('hover')" />
        <TextField v-bind="attrs" v-model="value" label="Text Field" :class="getSelectors.class('focus', 'focus-within')" />
        <TextField v-bind="attrs" v-model="value" label="Text Field" :validators="validators" />
        <TextField v-bind="attrs" v-model="value" label="Text Field" disabled />
        <TextField v-bind="attrs" v-model="value" label="Text Field" readOnly />
      </div>
    `
  })
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
