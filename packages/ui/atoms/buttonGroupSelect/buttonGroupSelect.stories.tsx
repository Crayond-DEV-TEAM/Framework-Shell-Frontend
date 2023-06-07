import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ButtonGroupSelect, ButtonGroupSelectProps } from './index';

export default {
  component: ButtonGroupSelect,
} as Meta;

const Template: Story<ButtonGroupSelectProps> = (args) => {
  return React.createElement(ButtonGroupSelect, { ...args });
};

export const Default = Template.bind({});
Default.args = {};