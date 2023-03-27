import { Meta, Story } from '@storybook/react';
import React from 'react';

import { FooterComponent, FooterComponentProps } from './index';

export default {
  component: FooterComponent,
} as Meta;

const Template: Story<FooterComponentProps> = (args) => {
  return React.createElement(FooterComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
