import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ForgotPassword, ForgotPasswordProps } from './index';

export default {
  component: ForgotPassword,
} as Meta;

const Template: Story<ForgotPasswordProps> = (args) => {
  return React.createElement(ForgotPassword, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
