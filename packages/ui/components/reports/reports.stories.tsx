import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Reports, ReportsProps } from './index';

export default {
  component: Reports,
} as Meta;

const Template: Story<ReportsProps> = (args) => {
  return React.createElement(Reports, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
