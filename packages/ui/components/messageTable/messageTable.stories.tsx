import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MessageTable, MessageTableProps } from './index';

export default {
  component: MessageTable,
} as Meta;

const Template: Story<MessageTableProps> = (args) => {
  return React.createElement(MessageTable, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
