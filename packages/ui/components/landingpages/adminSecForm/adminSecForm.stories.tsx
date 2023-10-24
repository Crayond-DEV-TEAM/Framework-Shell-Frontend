import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AdminSecForm, AdminSecFormProps } from './index';

export default {
  component: AdminSecForm,
} as Meta;

const Template: Story<AdminSecFormProps> = (args) => {
  return React.createElement(AdminSecForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};