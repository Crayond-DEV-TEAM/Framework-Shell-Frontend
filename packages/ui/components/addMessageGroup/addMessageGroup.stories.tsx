import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddMessageGroup, AddMessageGroupProps } from './index';

export default {
  component: AddMessageGroup,
} as Meta;

const Template: Story<AddMessageGroupProps> = (args) => {
  return React.createElement(AddMessageGroup, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
