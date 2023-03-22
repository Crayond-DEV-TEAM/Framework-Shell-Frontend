import { SearchIcon } from '@atoms/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SearchField, SearchFieldProps } from './index';

export default {
  component: SearchField,
} as Meta;

const Template: Story<SearchFieldProps> = (args) => {
  return React.createElement(SearchField, { ...args });
};

export const Default = Template.bind({});
Default.args = {
  startAdornment: <SearchIcon />,
};
