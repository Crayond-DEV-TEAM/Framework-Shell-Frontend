import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomerDetails, CustomerDetailsProps } from './index';

export default {
  component: CustomerDetails,
} as Meta;

const Template: Story<CustomerDetailsProps> = (args) => {
  return React.createElement(CustomerDetails, { ...args });
};

export const Default = Template.bind({});
Default.args = {};