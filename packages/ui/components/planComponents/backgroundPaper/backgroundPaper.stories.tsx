import { Meta, Story } from '@storybook/react';
import React from 'react';

import { BackgroundPaper, BackgroundPaperProps } from './index';

export default {
  component: BackgroundPaper,
} as Meta;

const Template: Story<BackgroundPaperProps> = (args) => {
  return React.createElement(BackgroundPaper, { ...args });
};

export const Default = Template.bind({});
Default.args = {};