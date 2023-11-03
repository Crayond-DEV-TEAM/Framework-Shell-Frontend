import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddProfileMultiplechipDropdown, AddProfileMultiplechipDropdownProps } from './index';

export default {
  component: AddProfileMultiplechipDropdown,
} as Meta;

const Template: Story<AddProfileMultiplechipDropdownProps> = (args) => {
  return React.createElement(AddProfileMultiplechipDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};