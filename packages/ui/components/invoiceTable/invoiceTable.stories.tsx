import { Meta, Story } from '@storybook/react';
import React from 'react';

import { InvoiceTable, InvoiceTableProps } from './index';

export default {
  component: InvoiceTable,
} as Meta;

const Template: Story<InvoiceTableProps> = (args) => {
  return React.createElement(InvoiceTable, { ...args });
};

export const Default = Template.bind({});
Default.args = {};