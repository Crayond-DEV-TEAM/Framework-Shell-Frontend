import { Meta, Story } from '@storybook/react';
import React from 'react';

import { LanguageCard, LanguageCardProps } from './index';

export default {
  component: LanguageCard,
} as Meta;

const Template: Story<LanguageCardProps> = (args) => {
  return React.createElement(LanguageCard, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
