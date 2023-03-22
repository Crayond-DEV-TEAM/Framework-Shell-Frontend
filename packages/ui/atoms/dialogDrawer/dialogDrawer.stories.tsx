import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DialogDrawer, DialogDrawerProps } from './index';

export default {
  component: DialogDrawer,
} as Meta;

const Template: Story<DialogDrawerProps> = (args) => {
  return React.createElement(DialogDrawer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
