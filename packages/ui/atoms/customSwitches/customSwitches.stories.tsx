import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomSwitches, CustomSwitchesProps } from './index';

export default {
  component: CustomSwitches,
} as Meta;

const Template: Story<CustomSwitchesProps> = (args) => {
  return React.createElement(CustomSwitches, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
