import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ServicesListing, ServicesListingProps } from './index';

export default {
  component: ServicesListing,
} as Meta;

const Template: Story<ServicesListingProps> = (args) => {
  return React.createElement(ServicesListing, { ...args });
};

export const Default = Template.bind({});
Default.args = {};