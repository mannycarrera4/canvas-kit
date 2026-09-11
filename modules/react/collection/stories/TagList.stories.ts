import {Meta, StoryObj} from '@storybook/react';

import {TagListBasic} from './examples/TagListBasic';
import {TagList} from './skill-eval';

export default {
  title: 'Skill Eval/Collection/Tag List',
  component: TagList,
} as Meta<typeof TagList>;

type Story = StoryObj<typeof TagList>;

export const Basic: Story = {
  render: TagListBasic,
};
