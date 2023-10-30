import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddOnBackgroundCard, AddOnBackgroundCardProps } from './index';

export default {
  component: AddOnBackgroundCard,
} as Meta;

const Template: Story<AddOnBackgroundCardProps> = (args) => {
  return React.createElement(AddOnBackgroundCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};