import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SearchBox, SearchBoxProps } from './index';

export default {
  component: SearchBox,
} as Meta;

const Template: Story<SearchBoxProps> = (args) => {
  return React.createElement(SearchBox, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
