import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Customer, CustomerProps } from './index';

export default {
  component: Customer,
} as Meta;

const Template: Story<CustomerProps> = (args) => {
  return React.createElement(Customer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};