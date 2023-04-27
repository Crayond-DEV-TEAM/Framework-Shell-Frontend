import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ConfigureRepo, ConfigureRepoProps } from './index';

export default {
  component: ConfigureRepo,
} as Meta;

const Template: Story<ConfigureRepoProps> = (args) => {
  return React.createElement(ConfigureRepo, { ...args });
};

export const Default = Template.bind({});
Default.args = {};