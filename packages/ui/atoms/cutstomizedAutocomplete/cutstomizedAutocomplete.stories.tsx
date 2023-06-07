import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CutstomizedAutocomplete, CutstomizedAutocompleteProps } from './index';

export default {
  component: CutstomizedAutocomplete,
} as Meta;

const Template: Story<CutstomizedAutocompleteProps> = (args) => {
  return React.createElement(CutstomizedAutocomplete, { ...args });
};

export const Default = Template.bind({});
Default.args = {};