import type {
  Meta,
  StoryObj,
} from '@storybook/react-vite';

import { CheckboxGroup } from './CheckboxGroup.tsx';
import { Checkbox } from '../Checkbox/Checkbox.tsx';

const meta: Meta = {
  title: 'CheckboxGroup',
  component: CheckboxGroup,
  tags: ['autodocs', '!dev'],
  argTypes: {
    label: {
      control: 'text',
    },
  },
  args: {
    label: 'Check All or None',
    children: [
      <Checkbox name='thing'>A thing</Checkbox>,
      <Checkbox name='anotherThing'>Another thing</Checkbox>,
    ],
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export default meta;
