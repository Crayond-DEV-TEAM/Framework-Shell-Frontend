import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomDropdown, CustomDropdownProps } from './index';

export default {
  component: CustomDropdown,
} as Meta;

const Template: Story<CustomDropdownProps> = (args) => {
  return React.createElement(CustomDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};