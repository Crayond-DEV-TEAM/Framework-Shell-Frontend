import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DropDown, DropDownProps } from './index';

export default {
  component: DropDown,
} as Meta;

const Template: Story<DropDownProps> = (args) => {
  return React.createElement(DropDown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
