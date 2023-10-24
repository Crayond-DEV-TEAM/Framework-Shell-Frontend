import { Meta, Story } from '@storybook/react';
import React from 'react';

import { LoginLayout, LoginLayoutProps } from './index';

export default {
  component: LoginLayout,
} as Meta;

const Template: Story<LoginLayoutProps> = (args) => {
  return React.createElement(LoginLayout, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
