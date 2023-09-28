import { Meta, Story } from '@storybook/react';
import React from 'react';

import { UserProfileForm, UserProfileFormProps } from './index';

export default {
  component: UserProfileForm,
} as Meta;

const Template: Story<UserProfileFormProps> = (args) => {
  return React.createElement(UserProfileForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};