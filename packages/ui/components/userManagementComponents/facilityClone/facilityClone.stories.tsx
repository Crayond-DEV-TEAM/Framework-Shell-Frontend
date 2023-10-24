import { Meta, Story } from '@storybook/react';
import React from 'react';

import { FacilityClone, FacilityCloneProps } from './index';

export default {
  component: FacilityClone,
} as Meta;

const Template: Story<FacilityCloneProps> = (args) => {
  return React.createElement(FacilityClone, { ...args });
};

export const Default = Template.bind({});
Default.args = {};