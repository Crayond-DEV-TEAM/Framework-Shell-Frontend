import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DialogContent, DialogContentProps } from './index';

export default {
  component: DialogContent,
} as Meta;

const Template: Story<DialogContentProps> = (args) => {
  return React.createElement(DialogContent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
