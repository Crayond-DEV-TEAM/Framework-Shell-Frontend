import { Meta, Story } from '@storybook/react';
import React from 'react';

import { FeatureGroups, FeatureGroupsProps } from './index';

export default {
  component: FeatureGroups,
} as Meta;

const Template: Story<FeatureGroupsProps> = (args) => {
  return React.createElement(FeatureGroups, { ...args });
};

export const Default = Template.bind({});
Default.args = {};