import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MyProfile, MyProfileProps } from './index';

export default {
  component: MyProfile,
} as Meta;

const Template: Story<MyProfileProps> = (args) => {
  return React.createElement(MyProfile, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
