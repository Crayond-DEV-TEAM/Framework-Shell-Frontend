import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomerHeader, CustomerHeaderProps } from './index';

export default {
  component: CustomerHeader,
} as Meta;

const Template: Story<CustomerHeaderProps> = (args) => {
  return React.createElement(CustomerHeader, { ...args });
};

export const Default = Template.bind({});
Default.args = {};