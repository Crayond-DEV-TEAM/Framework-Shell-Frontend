import { Meta, Story } from '@storybook/react';
import React from 'react';
import { SearchTextField, SearchTextFieldProps } from './index';

export default {
  component: SearchTextField,
} as Meta;

const Template: Story<SearchTextFieldProps> = (args) => {
  return React.createElement(SearchTextField, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
