import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreateCustomerForm, CreateCustomerFormProps } from './index';

export default {
  component: CreateCustomerForm,
} as Meta;

const Template: Story<CreateCustomerFormProps> = (args) => {
  return React.createElement(CreateCustomerForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};