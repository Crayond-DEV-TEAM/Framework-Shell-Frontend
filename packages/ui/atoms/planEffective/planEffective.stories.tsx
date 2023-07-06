import { Meta, Story } from '@storybook/react';
import React from 'react';

import { PlanEffective, PlanEffectiveProps } from './index';

export default {
  component: PlanEffective,
} as Meta;

const Template: Story<PlanEffectiveProps> = (args) => {
  return React.createElement(PlanEffective, { ...args });
};

export const Default = Template.bind({});
Default.args = {};