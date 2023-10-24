import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SuperAdmin, SuperAdminProps } from './index';

export default {
  component: SuperAdmin,
} as Meta;

const Template: Story<SuperAdminProps> = (args) => {
  return React.createElement(SuperAdmin, { ...args });
};

export const Default = Template.bind({});
Default.args = {};