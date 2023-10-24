import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SubscriptionDetails, SubscriptionDetailsProps } from './index';

export default {
  component: SubscriptionDetails,
} as Meta;

const Template: Story<SubscriptionDetailsProps> = (args) => {
  return React.createElement(SubscriptionDetails, { ...args });
};

export const Default = Template.bind({});
Default.args = {};