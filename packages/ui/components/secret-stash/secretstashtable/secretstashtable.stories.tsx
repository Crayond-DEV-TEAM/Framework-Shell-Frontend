import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SecretstashTable, SecretstashTableProps } from './index';

export default {
  component: SecretstashTable,
} as Meta;

const Template: Story<SecretstashTableProps> = (args) => {
  return React.createElement(SecretstashTable, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
