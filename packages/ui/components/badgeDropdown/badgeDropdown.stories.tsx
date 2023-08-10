import { Meta, Story } from '@storybook/react';
import React from 'react';

import { BadgeDropdown, BadgeDropdownProps } from './index';

export default {
  component: BadgeDropdown,
} as Meta;

const Template: Story<BadgeDropdownProps> = (args) => {
  return React.createElement(BadgeDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};