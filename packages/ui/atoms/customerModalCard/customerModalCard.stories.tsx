import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomerModalCard, CustomerModalCardProps } from './index';

export default {
  component: CustomerModalCard,
} as Meta;

const Template: Story<CustomerModalCardProps> = (args) => {
  return React.createElement(CustomerModalCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};