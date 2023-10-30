import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddPermission, AddPermissionProps } from './index';

export default {
  component: AddPermission,
} as Meta;

const Template: Story<AddPermissionProps> = (args) => {
  return React.createElement(AddPermission, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
