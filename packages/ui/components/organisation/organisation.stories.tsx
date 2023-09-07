import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Organisation, OrganisationProps } from './index';

export default {
  component: Organisation,
} as Meta;

const Template: Story<OrganisationProps> = (args) => {
  return React.createElement(Organisation, { ...args });
};

export const Default = Template.bind({});
Default.args = {};