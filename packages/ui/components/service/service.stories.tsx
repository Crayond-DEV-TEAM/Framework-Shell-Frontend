import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Service, ServiceProps } from './index';

export default {
  component: Service,
} as Meta;

const Template: Story<ServiceProps> = (args) => {
  return React.createElement(Service, { ...args });
};

export const Default = Template.bind({});
Default.args = {};