import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MappedUserCard, MappedUserCardProps } from './index';

export default {
  component: MappedUserCard,
} as Meta;

const Template: Story<MappedUserCardProps> = (args) => {
  return React.createElement(MappedUserCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};