import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SideBarIdm, SideBarIdmProps } from './index';

export default {
  component: SideBarIdm,
} as Meta;

const Template: Story<SideBarIdmProps> = (args) => {
  return React.createElement(SideBarIdm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};