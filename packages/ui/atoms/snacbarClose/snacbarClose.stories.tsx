import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SnacbarClose, SnacbarCloseProps } from './index';

export default {
  component: SnacbarClose,
} as Meta;

const Template: Story<SnacbarCloseProps> = (args) => {
  return React.createElement(SnacbarClose, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
