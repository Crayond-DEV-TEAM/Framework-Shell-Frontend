import { Meta, Story } from '@storybook/react';
import React from 'react';

import { UserSection, UserSectionProps } from './index';

export default {
  component: UserSection,
} as Meta;

const Template: Story<UserSectionProps> = (args) => {
  return React.createElement(UserSection, { ...args });
};

export const Default = Template.bind({});
Default.args = {};