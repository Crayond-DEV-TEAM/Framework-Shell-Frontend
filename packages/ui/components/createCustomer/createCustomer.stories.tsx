import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreateCustomer, CreateCustomerProps } from './index';

export default {
  component: CreateCustomer,
} as Meta;

const Template: Story<CreateCustomerProps> = (args) => {
  return React.createElement(CreateCustomer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};