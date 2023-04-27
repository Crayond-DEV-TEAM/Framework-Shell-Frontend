import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TreeComponent, TreeComponentProps } from './index';

export default {
  component: TreeComponent,
} as Meta;

const Template: Story<TreeComponentProps> = (args) => {
  return React.createElement(TreeComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
