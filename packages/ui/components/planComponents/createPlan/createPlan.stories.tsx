import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreatePlan, CreatePlanProps } from './index';

export default {
  component: CreatePlan,
} as Meta;

const Template: Story<CreatePlanProps> = (args) => {
  return React.createElement(CreatePlan, { ...args });
};

export const Default = Template.bind({});
Default.args = {};