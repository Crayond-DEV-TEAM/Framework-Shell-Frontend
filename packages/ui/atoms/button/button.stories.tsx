import { Meta, Story } from '@storybook/react';
import { enqueueSnackbar } from 'notistack';
import React from 'react';

import { Button, ButtonProps } from './index';

export default {
  component: Button,
} as Meta;

const Template: Story<ButtonProps> = (args) => {
  return React.createElement(Button, args);
};

export const Default = Template.bind({});
Default.args = {
  children: 'A button',
  onClick: () => enqueueSnackbar('A button component', { variant: 'success' }),
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  ...Default.args,
  startIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
      <g id="Group_9" data-name="Group 9" transform="translate(-4 -4)">
        <circle
          id="Ellipse_39211"
          data-name="Ellipse 39211"
          cx="16"
          cy="16"
          r="16"
          transform="translate(4 4)"
          fill="#f0f0f0"
        />
        <path
          id="icons8-expand-arrow"
          d="M9.188,5.337,5,1.15.813,5.337a.476.476,0,1,1-.673-.673L4.664.14a.476.476,0,0,1,.673,0L9.861,4.664a.476.476,0,1,1-.673.673Z"
          transform="translate(16.168 25.028) rotate(-90)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  ),
  endIcon: (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 32 32">
      <g id="Group_9" data-name="Group 9" transform="translate(-4 -4)">
        <circle
          id="Ellipse_39211"
          data-name="Ellipse 39211"
          cx="16"
          cy="16"
          r="16"
          transform="translate(4 4)"
          fill="#f0f0f0"
        />
        <path
          id="icons8-expand-arrow"
          d="M9.188,5.337,5,1.15.813,5.337a.476.476,0,1,1-.673-.673L4.664.14a.476.476,0,0,1,.673,0L9.861,4.664a.476.476,0,1,1-.673.673Z"
          transform="translate(16.168 25.028) rotate(-90)"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        />
      </g>
    </svg>
  ),
};
