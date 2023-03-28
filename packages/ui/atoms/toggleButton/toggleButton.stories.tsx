import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ToggleButtons, ToggleButtonProps } from './index';

export default {
  component: ToggleButtons,
} as Meta;

const Template: Story<ToggleButtonProps> = (args) => {
  return React.createElement(ToggleButtons, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
