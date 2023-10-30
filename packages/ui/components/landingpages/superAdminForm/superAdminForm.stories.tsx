import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SuperAdminForm, SuperAdminFormProps } from './index';

export default {
  component: SuperAdminForm,
} as Meta;

const Template: Story<SuperAdminFormProps> = (args) => {
  return React.createElement(SuperAdminForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};