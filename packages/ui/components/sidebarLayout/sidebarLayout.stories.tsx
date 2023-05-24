import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SidebarLayout, SidebarLayoutProps } from './index';

export default {
  component: SidebarLayout,
} as Meta;

const Template: Story<SidebarLayoutProps> = (args) => {
  return React.createElement(SidebarLayout, { ...args });
};

export const Default = Template.bind({});
Default.args = {};