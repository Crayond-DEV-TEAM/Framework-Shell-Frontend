import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddOnsCard, AddOnsCardProps } from './index';

export default {
  component: AddOnsCard,
} as Meta;

const Template: Story<AddOnsCardProps> = (args) => {
  return React.createElement(AddOnsCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
