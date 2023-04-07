import { Meta, Story } from '@storybook/react';
import React from 'react';

import { DeleteDailog, DeleteDailogProps } from './index';

export default {
  component: DeleteDailog,
} as Meta;

const Template: Story<DeleteDailogProps> = (args) => {
  return React.createElement(DeleteDailog, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
