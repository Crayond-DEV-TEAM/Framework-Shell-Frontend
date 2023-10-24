import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TextBox, TextBoxProps } from './index';

export default {
  component: TextBox,
} as Meta;

const Template: Story<TextBoxProps> = (args) => {
  return React.createElement(TextBox, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
