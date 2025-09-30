import type {
  Meta,
  StoryObj,
} from '@storybook/vue3-vite';

import CheckboxGroup from './CheckboxGroup.vue';
import Checkbox from '../Checkbox/Checkbox.vue';

const meta: Meta = {
  title: 'CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs', '!dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
  render: (arguments_) => ({
    components: {
      CheckboxGroup,
      Checkbox,
    },
    setup() {
      return { args: arguments_ };
    },
    template: `
      <CheckboxGroup v-bind="args">
        <Checkbox name="thing">A thing</Checkbox>
        <Checkbox name="anotherThing">Another thing</Checkbox>
      </CheckboxGroup>
    `,
  }),
  args: {
    label: 'Check All or None',
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
