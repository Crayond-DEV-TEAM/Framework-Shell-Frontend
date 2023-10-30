import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Roles, RolesProps } from './index';

export default {
  component: Roles,
} as Meta;

const Template: Story<RolesProps> = (args) => {
  return React.createElement(Roles, { ...args });
};

export const Default = Template.bind({});
Default.args = {};