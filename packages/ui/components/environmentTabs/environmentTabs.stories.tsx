import { Meta, Story } from '@storybook/react';
import React from 'react';

import { EnvironmentTabs, EnvironmentTabsProps } from './index';

export default {
  component: EnvironmentTabs,
} as Meta;

const Template: Story<EnvironmentTabsProps> = (args) => {
  return React.createElement(EnvironmentTabs, { ...args });
};

export const Default = Template.bind({});
Default.args = {};