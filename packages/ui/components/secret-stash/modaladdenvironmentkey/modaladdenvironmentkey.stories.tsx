import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ModalAddEnvironmentKey, ModalAddEnvironmentKeyProps } from './index';

export default {
  component: ModalAddEnvironmentKey,
} as Meta;

const Template: Story<ModalAddEnvironmentKeyProps> = (args) => {
  return React.createElement(ModalAddEnvironmentKey, { ...args });
};

export const Default = Template.bind({});
Default.args = {};