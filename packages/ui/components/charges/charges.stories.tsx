import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Charges, ChargesProps } from './index';

export default {
  component: Charges,
} as Meta;

const Template: Story<ChargesProps> = (args) => {
  return React.createElement(Charges, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
