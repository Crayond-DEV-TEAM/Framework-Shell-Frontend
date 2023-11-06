import { Meta, Story } from '@storybook/react';
import React from 'react';

import { MapAdminChipDropdown, MapAdminChipDropdownProps } from './index';

export default {
  component: MapAdminChipDropdown,
} as Meta;

const Template: Story<MapAdminChipDropdownProps> = (args) => {
  return React.createElement(MapAdminChipDropdown, { ...args });
};

export const Default = Template.bind({});
Default.args = {};