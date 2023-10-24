import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MapSubscription, MapSubscriptionProps } from './index';

export default {
  component: MapSubscription,
} as Meta;

const Template: Story<MapSubscriptionProps> = (args) => {
  return React.createElement(MapSubscription, { ...args });
};

export const Default = Template.bind({});
Default.args = {};