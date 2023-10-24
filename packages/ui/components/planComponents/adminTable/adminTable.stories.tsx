import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AdminTable, AdminTableProps } from './index';

export default {
  component: AdminTable,
} as Meta;

const Template: Story<AdminTableProps> = (args) => {
  return React.createElement(AdminTable, { ...args });
};

export const Default = Template.bind({});
Default.args = {};