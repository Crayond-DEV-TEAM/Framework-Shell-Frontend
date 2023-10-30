import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SubscriptionPlanContent, SubscriptionPlanContentProps } from './index';

export default {
  component: SubscriptionPlanContent,
} as Meta;

const Template: Story<SubscriptionPlanContentProps> = (args) => {
  return React.createElement(SubscriptionPlanContent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};