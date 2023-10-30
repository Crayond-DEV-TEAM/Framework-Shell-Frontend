import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AdminSection, AdminSectionProps } from './index';

export default {
  component: AdminSection,
} as Meta;

const Template: Story<AdminSectionProps> = (args) => {
  return React.createElement(AdminSection, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
