import { Meta, Story } from '@storybook/react';
import React from 'react';

import { FeatureGroupContent, FeatureGroupContentProps } from './index';

export default {
  component: FeatureGroupContent,
} as Meta;

const Template: Story<FeatureGroupContentProps> = (args) => {
  return React.createElement(FeatureGroupContent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};