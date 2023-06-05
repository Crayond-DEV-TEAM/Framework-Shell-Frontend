import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SubscriptionPlanCard, SubscriptionPlanCardProps } from './index';

export default {
  component: SubscriptionPlanCard,
} as Meta;

const Template: Story<SubscriptionPlanCardProps> = (args) => {
  return React.createElement(SubscriptionPlanCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};