import { Meta, Story } from '@storybook/react';
import React from 'react';

import { JsonViewer, JsonViewerProps } from './index';

export default {
  component: JsonViewer,
} as Meta;

const Template: Story<JsonViewerProps> = (args) => {
  return React.createElement(JsonViewer, { ...args });
};

export const Default = Template.bind({});
Default.args = {};