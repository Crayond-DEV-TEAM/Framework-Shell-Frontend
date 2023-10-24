import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Feature, FeatureProps } from './index';

export default {
  component: Feature,
} as Meta;

const Template: Story<FeatureProps> = (args) => {
  return React.createElement(Feature, { ...args });
};

export const Default = Template.bind({});
Default.args = {};