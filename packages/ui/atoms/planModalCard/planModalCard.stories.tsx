import { Meta, Story } from '@storybook/react';
import React from 'react';

import { PlanModalCard, PlanModalCardProps } from './index';

export default {
  component: PlanModalCard,
} as Meta;

const Template: Story<PlanModalCardProps> = (args) => {
  return React.createElement(PlanModalCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};