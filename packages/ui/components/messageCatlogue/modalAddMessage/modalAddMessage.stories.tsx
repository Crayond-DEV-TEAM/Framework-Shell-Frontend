import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ModalAddMessage, ModalAddMessageProps } from './index';

export default {
  component: ModalAddMessage,
} as Meta;

const Template: Story<ModalAddMessageProps> = (args) => {
  return React.createElement(ModalAddMessage, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
