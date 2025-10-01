import type {
  Meta,
  StoryObj,
} from '@storybook/vue3';

import NumberInput from './NumberInput.vue';
import {
  getSelector,
  getSelectors,
} from '../../utils/selectors.ts';
import { ref } from 'vue';

const meta: Meta = {
  title: 'Inputs/NumberInput',
  component: NumberInput,
  tags: ['autodocs', '!dev'],
  render: (attrs) => ({
    components: { NumberInput },
    setup() {
      const value = ref(0);
      const validators = [() => 'This is an error']
      return { attrs, value, getSelector, getSelectors, validators }
    },
    template: `
      <div style="display: flex; flex-flow: row wrap; gap: 1rem;">
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" />
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" :class="getSelector.class('hover')" />
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" :class="getSelectors.class('focus', 'focus-within')" />
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" :validators="validators" />
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" disabled />
        <NumberInput v-bind="attrs" v-model="value" label="Text Field" readOnly />
      </div>
    `
  })
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
