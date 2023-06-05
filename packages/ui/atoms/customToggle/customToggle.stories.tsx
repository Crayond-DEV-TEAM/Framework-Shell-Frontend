import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomToggle, CustomToggleProps } from './index';

export default {
  component: CustomToggle,
} as Meta;

const Template: Story<CustomToggleProps> = (args) => {
  return React.createElement(CustomToggle, { ...args });
};

export const Default = Template.bind({});
Default.args = {};