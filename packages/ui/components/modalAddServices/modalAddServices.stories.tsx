import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ModalAddServices, ModalAddServicesProps } from './index';

export default {
  component: ModalAddServices,
} as Meta;

const Template: Story<ModalAddServicesProps> = (args) => {
  return React.createElement(ModalAddServices, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
