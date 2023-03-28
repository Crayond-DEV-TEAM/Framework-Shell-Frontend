import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddMessage, AddMessageProps } from './index';

export default {
  component: AddMessage,
} as Meta;

const Template: Story<AddMessageProps> = (args) => {
  return React.createElement(AddMessage, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
