import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Permission, PermissionProps } from './index';

export default {
  component: Permission,
} as Meta;

const Template: Story<PermissionProps> = (args) => {
  return React.createElement(Permission, { ...args });
};

export const Default = Template.bind({});
Default.args = {};