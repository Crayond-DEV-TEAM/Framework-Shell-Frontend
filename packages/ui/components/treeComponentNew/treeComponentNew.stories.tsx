import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TreeComponentNew, TreeComponentNewProps } from './index';

export default {
  component: TreeComponentNew,
} as Meta;

const Template: Story<TreeComponentNewProps> = (args) => {
  return React.createElement(TreeComponentNew, { ...args });
};

export const Default = Template.bind({});
Default.args = {};