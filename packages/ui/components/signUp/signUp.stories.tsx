import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SignUp, SignUpProps } from './index';

export default {
  component: SignUp,
} as Meta;

const Template: Story<SignUpProps> = (args) => {
  return React.createElement(SignUp, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
