import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ShowValue, ShowValueProps } from './index';

export default {
  component: ShowValue,
} as Meta;

const Template: Story<ShowValueProps> = (args) => {
  return React.createElement(ShowValue, { ...args });
};

export const Default = Template.bind({});
Default.args = {};