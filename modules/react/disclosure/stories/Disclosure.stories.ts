import {Meta, StoryObj} from '@storybook/react';

import {Basic as BasicExample} from './examples/Basic';
import {Disclosure} from './skill-eval';

export default {
  title: 'Components/Containers/Disclosure',
  component: Disclosure,
} as Meta<typeof Disclosure>;

type Story = StoryObj<typeof Disclosure>;

export const Basic: Story = {
  render: BasicExample,
};
