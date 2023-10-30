import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddChipMultipleDropdown, AddChipMultipleDropdownProps } from './index';

export default {
  component: AddChipMultipleDropdown,
} as Meta;

const Template: Story<AddChipMultipleDropdownProps> = (args) => {
  return React.createElement(AddChipMultipleDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};