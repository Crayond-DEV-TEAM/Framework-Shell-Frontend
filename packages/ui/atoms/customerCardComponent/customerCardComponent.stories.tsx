import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomerCardComponent, CustomerCardComponentProps } from './index';

export default {
  component: CustomerCardComponent,
} as Meta;

const Template: Story<CustomerCardComponentProps> = (args) => {
  return React.createElement(CustomerCardComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};