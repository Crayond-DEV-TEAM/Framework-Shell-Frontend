import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Subscription, SubscriptionProps } from './index';

export default {
  component: Subscription,
} as Meta;

const Template: Story<SubscriptionProps> = (args) => {
  return React.createElement(Subscription, { ...args });
};

export const Default = Template.bind({});
Default.args = {};