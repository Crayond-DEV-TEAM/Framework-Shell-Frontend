import { Meta, Story } from '@storybook/react';
import React from 'react';

import { SingleFileComponent, SingleFileComponentProps } from './index';

export default {
  component: SingleFileComponent,
} as Meta;

const Template: Story<SingleFileComponentProps> = (args) => {
  return React.createElement(SingleFileComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};