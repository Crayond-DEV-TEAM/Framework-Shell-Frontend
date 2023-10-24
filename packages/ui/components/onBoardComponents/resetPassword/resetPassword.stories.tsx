import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ResetPassword, ResetPasswordProps } from './index';

export default {
  component: ResetPassword,
} as Meta;

const Template: Story<ResetPasswordProps> = (args) => {
  return React.createElement(ResetPassword, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
