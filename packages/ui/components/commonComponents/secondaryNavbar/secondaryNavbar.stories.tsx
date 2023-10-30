import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SecondaryNavbar, SecondaryNavbarProps } from './index';

export default {
  component: SecondaryNavbar,
} as Meta;

const Template: Story<SecondaryNavbarProps> = (args) => {
  return React.createElement(SecondaryNavbar, { ...args });
};

export const Default = Template.bind({});
Default.args = {};