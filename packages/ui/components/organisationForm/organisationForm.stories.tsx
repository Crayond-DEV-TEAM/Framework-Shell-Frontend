import { Meta, Story } from '@storybook/react';
import React from 'react';

import { OrganisationForm, OrganisationFormProps } from './index';

export default {
  component: OrganisationForm,
} as Meta;

const Template: Story<OrganisationFormProps> = (args) => {
  return React.createElement(OrganisationForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};