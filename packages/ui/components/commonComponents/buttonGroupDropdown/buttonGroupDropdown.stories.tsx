import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ButtonGroupDropdown, ButtonGroupDropdownProps } from './index';

export default {
  component: ButtonGroupDropdown,
} as Meta;

const Template: Story<ButtonGroupDropdownProps> = (args) => {
  return React.createElement(ButtonGroupDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};