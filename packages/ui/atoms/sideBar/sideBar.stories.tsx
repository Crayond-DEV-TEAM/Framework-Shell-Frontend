import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SideBar, SideBarProps } from './index';

export default {
  component: SideBar,
} as Meta;

const Template: Story<SideBarProps> = (args) => {
  return React.createElement(SideBar, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
