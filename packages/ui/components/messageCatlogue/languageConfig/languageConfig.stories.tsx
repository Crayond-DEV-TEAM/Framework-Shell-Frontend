import { Meta, Story } from '@storybook/react';
import React from 'react';

import { LanguageConfig, LanguageConfigProps } from './index';

export default {
  component: LanguageConfig,
} as Meta;

const Template: Story<LanguageConfigProps> = (args) => {
  return React.createElement(LanguageConfig, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
