import { Meta, Story } from '@storybook/react';
import React from 'react';

import { AddressForm, AddressFormProps } from './index';

export default {
  component: AddressForm,
} as Meta;

const Template: Story<AddressFormProps> = (args) => {
  return React.createElement(AddressForm, { ...args });
};

export const Default = Template.bind({});
Default.args = {};