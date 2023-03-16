import { Story } from '@storybook/react';
import React from 'react';

import { Input, InputProps } from './index';

export default {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    value: {
      description: 'The input value',
    },
    fullWidth: {
      description: 'To set full width input field',
    },
    isReadOnly: {
      description: 'To make it as readonly',
    },
    helperText: {
      description: 'Text below input field',
    },
    isError: {
      description: 'to show error message',
    },
    isMulti: {
      description: 'For multi line',
    },
    rowMax: {
      description: 'maximum rows',
    },
    rowMin: {
      description: 'minimum rows',
    },
    placeholder: {
      description: 'To set placeHolder',
    },
    type: {
      description: 'input type',
    },
    size: {
      description: 'size of the input field',
    },
  },
};

const Template: Story<InputProps> = (args) => {
  return React.createElement(Input, { ...args });
};

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  placeholder: 'Enter text',
  value: '',
};
