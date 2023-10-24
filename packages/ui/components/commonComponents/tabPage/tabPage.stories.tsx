import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TabPage, TabPageProps } from './index';

export default {
  component: TabPage,
} as Meta;

const Template: Story<TabPageProps> = (args) => {
  return React.createElement(TabPage, { ...args });
};

export const Default = Template.bind({});
Default.args = {};