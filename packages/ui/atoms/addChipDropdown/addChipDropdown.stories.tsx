import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddChipDropdown, AddChipDropdownProps } from './index';

export default {
  component: AddChipDropdown,
} as Meta;

const Template: Story<AddChipDropdownProps> = (args) => {
  return React.createElement(AddChipDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
