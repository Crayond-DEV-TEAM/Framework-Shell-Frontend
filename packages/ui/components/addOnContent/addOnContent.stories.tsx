import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddOnContent, AddOnContentProps } from './index';

export default {
  component: AddOnContent,
} as Meta;

const Template: Story<AddOnContentProps> = (args) => {
  return React.createElement(AddOnContent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
