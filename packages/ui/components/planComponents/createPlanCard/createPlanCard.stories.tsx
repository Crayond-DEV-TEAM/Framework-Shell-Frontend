import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreatePlanCard, CreatePlanCardProps } from './index';

export default {
  component: CreatePlanCard,
} as Meta;

const Template: Story<CreatePlanCardProps> = (args) => {
  return React.createElement(CreatePlanCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};