import { DeleteIcon, EditIcon } from "@atoms/icons";

export const Header = [
    {
        id: 'reference_id',
        align: 'left',
        disablePadding: false,
        label: 'Reference ID',
        isSortable: true,
    },
    {
        id: 'title',
        align: 'left',
        disablePadding: false,
        label: 'Title',
        isSortable: true,
    },
    {
        id: 'Description',
        align: 'left',
        disablePadding: false,
        label: 'Description',
    },
    {
        id: 'Severity',
        align: 'left',
        disablePadding: false,
        label: 'Severity',
    },
    {
        id: 'Languages_Configuried',
        align: 'left',
        disablePadding: false,
        label: 'Languages Configuried',
    },
    {
        id: 'updated_at',
        align: 'left',
        disablePadding: false,
        label: 'Created On',
    },
    {
        id: 'Modified_On',
        align: 'left',
        disablePadding: false,
        label: 'Modified On',
    },
    {
        id: 'status',
        align: 'left',
        disablePadding: false,
        label: 'Status',
    },
    {
        id: 'action',
        align: 'left',
        disablePadding: false,
        label: 'Action',
    },
];

export const tableData = (editHandel: (id: string) => void, deleteHandel: (id: string) => void) => [
    { type: ['TEXT'], name: 'id' },
    { type: ['TEXT'], name: 'title' },
    { type: ['TEXT'], name: 'description' },
    { type: ['LABEL'], name: 'severity' },
    { type: ['TEXT'], name: 'msg_grp_msgs' },
    { type: ['DATE'], name: 'created_at', format: 'Do MMM,hh:mm A IST' },
    { type: ['DATE'], name: 'updated_at', format: 'Do MMM,hh:mm A IST' },
    {
        type: ['SWITCH'],
        name: 'status',
        switchText: [{ label_1: 'In Active', label_2: 'Active' }],
    },
    {
        type: ['ACTION'],
        name: 'action',
        variant: 'EDIT_WITH_DELETE',
        editHandel,
        deleteHandel,
        editIcon: <EditIcon />,
        deleteIcon: <DeleteIcon />,
    },
];