import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MessageCard, MessageCardProps } from './index';

export default {
  component: MessageCard,
} as Meta;

const Template: Story<MessageCardProps> = (args) => {
  return React.createElement(MessageCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
