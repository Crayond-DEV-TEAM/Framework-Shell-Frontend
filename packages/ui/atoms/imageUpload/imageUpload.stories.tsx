import { Meta, Story } from '@storybook/react';
import React from 'react';

import { ImageUpload, ImageUploadProps } from './index';

export default {
  component: ImageUpload,
} as Meta;

const Template: Story<ImageUploadProps> = (args) => {
  return React.createElement(ImageUpload, { ...args });
};

export const Default = Template.bind({});
Default.args = {};