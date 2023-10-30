import { Meta, Story } from '@storybook/react';
import React from 'react';

import { UserManagement, UserManagementProps } from './index';

export default {
  component: UserManagement,
} as Meta;

const Template: Story<UserManagementProps> = (args) => {
  return React.createElement(UserManagement, { ...args });
};

export const Default = Template.bind({});
Default.args = {};