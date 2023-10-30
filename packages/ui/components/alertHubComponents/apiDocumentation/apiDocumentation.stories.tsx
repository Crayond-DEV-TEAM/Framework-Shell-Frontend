import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ApiDocumentation, ApiDocumentationProps } from './index';

export default {
  component: ApiDocumentation,
} as Meta;

const Template: Story<ApiDocumentationProps> = (args) => {
  return React.createElement(ApiDocumentation, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
