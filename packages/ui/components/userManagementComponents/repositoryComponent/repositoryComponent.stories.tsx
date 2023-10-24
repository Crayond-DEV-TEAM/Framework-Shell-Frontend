import { Meta, Story } from '@storybook/react';
import React from 'react';

import { RepositoryComponent, RepositoryComponentProps } from './index';

export default {
  component: RepositoryComponent,
} as Meta;

const Template: Story<RepositoryComponentProps> = (args) => {
  return React.createElement(RepositoryComponent, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
