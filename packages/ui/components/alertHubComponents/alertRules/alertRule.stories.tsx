import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AlertRules, AlertRuleProps } from './index';

export default {
  component: AlertRules,
} as Meta;

const Template: Story<AlertRuleProps> = (args) => {
  return React.createElement(AlertRules, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
