import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TabsCard, TabsCardProps } from './index';

export default {
  component: TabsCard,
} as Meta;

const Template: Story<TabsCardProps> = (args) => {
  return React.createElement(TabsCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
