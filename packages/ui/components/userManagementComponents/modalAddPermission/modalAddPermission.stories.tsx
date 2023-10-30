import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ModalAddPermission, ModalAddPermissionProps } from './index';

export default {
  component: ModalAddPermission,
} as Meta;

const Template: Story<ModalAddPermissionProps> = (args) => {
  return React.createElement(ModalAddPermission, { ...args });
};

export const Default = Template.bind({});
Default.args = {};