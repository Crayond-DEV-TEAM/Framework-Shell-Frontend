import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddOne, AddOneProps } from './index';

export default {
  component: AddOne,
} as Meta;

const Template: Story<AddOneProps> = (args) => {
  return React.createElement(AddOne, { ...args });
};

export const Default = Template.bind({});
Default.args = {};