import { Meta, Story } from '@storybook/react';
import React from 'react';

import { Settings, SettingsProps } from './index';

export default {
  component: Settings,
} as Meta;

const Template: Story<SettingsProps> = (args) => {
  return React.createElement(Settings, { ...args });
};

export const Default = Template.bind({});
Default.args = {};