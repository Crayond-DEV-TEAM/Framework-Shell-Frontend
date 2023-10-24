import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TabsValueCard, TabsValueCardProps } from './index';

export default {
  component: TabsValueCard,
} as Meta;

const Template: Story<TabsValueCardProps> = (args) => {
  return React.createElement(TabsValueCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
