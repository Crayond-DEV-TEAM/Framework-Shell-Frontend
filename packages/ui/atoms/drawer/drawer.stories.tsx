import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Drawer, DrawerProps } from './index';

export default {
  component: Drawer,
} as Meta;

const Template: Story<DrawerProps> = (args) => {
  return React.createElement(Drawer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};