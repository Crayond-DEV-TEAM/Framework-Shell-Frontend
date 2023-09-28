import { Meta, Story } from '@storybook/react';
import React from 'react';

import { UserProfile, UserProfileProps } from './index';

export default {
  component: UserProfile,
} as Meta;

const Template: Story<UserProfileProps> = (args) => {
  return React.createElement(UserProfile, { ...args });
};

export const Default = Template.bind({});
Default.args = {};