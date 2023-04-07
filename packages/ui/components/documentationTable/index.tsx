import React from 'react';
import type { SxProps, Theme } from '@mui/material';
// import { TableWithPagination } from '@core/ui/components/tableWithPagination';


export interface DocumentationTableProps {
    parameter: any,
    type: any,
    description: any
}


export function DocumentationTable(props: DocumentationTableProps): JSX.Element {

    const Tablepath_4 = ["parameter", "type", "description"];

    const Tableheading_4 = [
        { title: "Parameter", field: "parameter" },
        { title: "Type", field: "type" },
        { title: "Description", field: "description" },
    ];

    function createData_4(parameter: any, type: any, description: any) {
        return {
            parameter,
            type,
            description,
        };
    }

    const ListTable_4 = [
        createData_4("reference_id", "String", "Unique Representation of a alert"),
        createData_4(
            "push_receivers",
            "Array",
            "List of push notification receivers"
        ),
        createData_4(
            "push_title",
            "Array",
            "List of data parameters for push title"
        ),
        createData_4(
            "push_body",
            "Object",
            "List of data parameters for push body"
        ),
        createData_4(
            "push_click_action",
            "String",
            "URL to open site when clicking a received push notification"
        ),
        createData_4(
            "push_icon",
            "String",
            "Pass an image URL to set as an icon to the push notification"
        ),
        createData_4("to_mobiles", "Array", "List of mobile numbers to send SMS"),
        createData_4(
            "sms_body",
            "Array",
            "sms_boList of data parameters for sms bodydy"
        ),
    ];

    return (
        <>
            {/* <TableWithPagination
                heading={Tableheading_4}
                rows={ListTable_4}
                path={Tablepath_4}
            /> */}
        </>
    );
};


