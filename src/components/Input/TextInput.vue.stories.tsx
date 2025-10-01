import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

import TextInput from './TextInput.vue';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';
import { ref } from 'vue';

const meta: Meta = {
  title: 'Inputs/TextInput',
  component: TextInput,
  tags: ['autodocs', '!dev'],
  render: (attrs) => ({
    components: { TextInput },
    setup() {
      const value = ref('');
      const validators = [() => 'This is an error']
      return { attrs, value, getSelector, getSelectors, validators }
    },
    template: `
      <div style="display: flex; flex-flow: row wrap; gap: 1rem;">
        <TextInput v-bind="attrs" v-model="value" label="Text Field" />
        <TextInput v-bind="attrs" v-model="value" label="Text Field" :class="getSelector.class('hover')" />
        <TextInput v-bind="attrs" v-model="value" label="Text Field" :class="getSelectors.class('focus', 'focus-within')" />
        <TextInput v-bind="attrs" v-model="value" label="Text Field" :validators="validators" />
        <TextInput v-bind="attrs" v-model="value" label="Text Field" disabled />
        <TextInput v-bind="attrs" v-model="value" label="Text Field" readOnly />
      </div>
    `
  })
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
