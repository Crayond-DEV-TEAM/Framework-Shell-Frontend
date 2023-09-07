import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MappedAdminCard, MappedAdminCardProps } from './index';

export default {
  component: MappedAdminCard,
} as Meta;

const Template: Story<MappedAdminCardProps> = (args) => {
  return React.createElement(MappedAdminCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};