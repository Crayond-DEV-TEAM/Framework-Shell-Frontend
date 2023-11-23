import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SuperAdminTabs, SuperAdminTabsProps } from './index';

export default {
  component: SuperAdminTabs,
} as Meta;

const Template: Story<SuperAdminTabsProps> = (args) => {
  return React.createElement(SuperAdminTabs, { ...args });
};

export const Default = Template.bind({});
Default.args = {};