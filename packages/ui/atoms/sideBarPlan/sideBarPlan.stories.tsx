import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SideBarPlan, SideBarPlanProps } from './index';

export default {
  component: SideBarPlan,
} as Meta;

const Template: Story<SideBarPlanProps> = (args) => {
  return React.createElement(SideBarPlan, { ...args });
};

export const Default = Template.bind({});
Default.args = {};