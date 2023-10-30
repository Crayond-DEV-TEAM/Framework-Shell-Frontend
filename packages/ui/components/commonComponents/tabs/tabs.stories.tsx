import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ReportTabs, ReportTabsProps } from './index';

export default {
  component: ReportTabs,
} as Meta;

const Template: Story<ReportTabsProps> = (args) => {
  return React.createElement(ReportTabs, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
