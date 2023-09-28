import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ServiceForm, ServiceFormProps } from './index';

export default {
  component: ServiceForm,
} as Meta;

const Template: Story<ServiceFormProps> = (args) => {
  return React.createElement(ServiceForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};