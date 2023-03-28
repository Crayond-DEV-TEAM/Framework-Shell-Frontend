import { Meta, Story } from '@storybook/react';
import React from 'react';

import { TableHeader, TableHeaderProps } from './index';

export default {
  component: TableHeader,
} as Meta;

const Template: Story<TableHeaderProps> = (args) => {
  return React.createElement(TableHeader, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
