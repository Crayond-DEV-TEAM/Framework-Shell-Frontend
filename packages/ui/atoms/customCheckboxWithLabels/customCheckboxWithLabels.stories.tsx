import { Meta, Story } from '@storybook/react';
import React from 'react';

import { CustomCheckboxWithLabels, CustomCheckboxWithLabelsProps } from './index';

export default {
  component: CustomCheckboxWithLabels,
} as Meta;

const Template: Story<CustomCheckboxWithLabelsProps> = (args) => {
  return React.createElement(CustomCheckboxWithLabels, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
