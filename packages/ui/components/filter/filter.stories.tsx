import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Filter, FilterProps } from './index';

export default {
  component: Filter,
} as Meta;

const Template: Story<FilterProps> = (args) => {
  return React.createElement(Filter, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
