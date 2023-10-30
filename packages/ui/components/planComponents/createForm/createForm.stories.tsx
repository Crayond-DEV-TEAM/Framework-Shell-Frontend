import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CreateForm, CreateFormProps } from './index';

export default {
  component: CreateForm,
} as Meta;

const Template: Story<CreateFormProps> = (args) => {
  return React.createElement(CreateForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};