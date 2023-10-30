import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Plans, PlansProps } from './index';

export default {
  component: Plans,
} as Meta;

const Template: Story<PlansProps> = (args) => {
  return React.createElement(Plans, { ...args });
};

export const Default = Template.bind({});
Default.args = {};