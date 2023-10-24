import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreateFormDetails, CreateFormDetailsProps } from './index';

export default {
  component: CreateFormDetails,
} as Meta;

const Template: Story<CreateFormDetailsProps> = (args) => {
  return React.createElement(CreateFormDetails, { ...args });
};

export const Default = Template.bind({});
Default.args = {};