import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Popup, PopupProps } from './index';

export default {
  component: Popup,
} as Meta;

const Template: Story<PopupProps> = (args) => {
  return React.createElement(Popup, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
