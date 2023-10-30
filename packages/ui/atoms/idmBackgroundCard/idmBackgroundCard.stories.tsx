import { Meta, Story } from '@storybook/react';
import React from 'react';

import { IdmBackgroundCard, IdmBackgroundCardProps } from './index';

export default {
  component: IdmBackgroundCard,
} as Meta;

const Template: Story<IdmBackgroundCardProps> = (args) => {
  return React.createElement(IdmBackgroundCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
