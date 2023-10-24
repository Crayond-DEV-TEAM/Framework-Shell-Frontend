import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MapSubscriptionPlanTransfer, MapSubscriptionPlanTransferProps } from './index';

export default {
  component: MapSubscriptionPlanTransfer,
} as Meta;

const Template: Story<MapSubscriptionPlanTransferProps> = (args) => {
  return React.createElement(MapSubscriptionPlanTransfer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};