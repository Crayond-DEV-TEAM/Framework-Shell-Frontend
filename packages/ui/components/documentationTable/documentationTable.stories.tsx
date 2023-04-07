import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DocumentationTable, DocumentationTableProps } from './index';

export default {
    component: DocumentationTable,
} as Meta;

const Template: Story<DocumentationTableProps> = (args) => {
    return React.createElement(DocumentationTable, { ...args });
};

export const Default = Template.bind({});
Default.args = {};
