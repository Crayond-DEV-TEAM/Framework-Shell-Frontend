import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DeleteComponent, DeleteComponentProps } from './index';

export default {
  component: DeleteComponent,
} as Meta;

const Template: Story<DeleteComponentProps> = (args) => {
  return React.createElement(DeleteComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};