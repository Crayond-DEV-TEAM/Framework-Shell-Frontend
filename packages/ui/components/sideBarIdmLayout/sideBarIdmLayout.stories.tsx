import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SideBarIdmLayout, SideBarIdmLayoutProps } from './index';

export default {
  component: SideBarIdmLayout,
} as Meta;

const Template: Story<SideBarIdmLayoutProps> = (args) => {
  return React.createElement(SideBarIdmLayout, { ...args });
};

export const Default = Template.bind({});
Default.args = {};