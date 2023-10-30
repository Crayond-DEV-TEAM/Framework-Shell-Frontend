import { Meta, Story } from '@storybook/react';
import React from 'react';

import { RoleMapping, RoleMappingProps } from './index';

export default {
  component: RoleMapping,
} as Meta;

const Template: Story<RoleMappingProps> = (args) => {
  return React.createElement(RoleMapping, { ...args });
};

export const Default = Template.bind({});
Default.args = {};