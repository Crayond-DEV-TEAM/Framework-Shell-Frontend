import { DeleteIcon, EditIcon } from '@atoms/icons';

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
    id: 'Languages_Configured',
    align: 'left',
    disablePadding: false,
    label: 'Languages Configured',
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
    align: 'center',
    disablePadding: false,
    label: 'Action',
  },
];

export const tableData = (editHandle: (id: string) => void, deleteHandle: (id: string) => void) => [
  { type: ['TEXT'], name: 'ref_id' },
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
    variant: [
      {
        icon: <EditIcon />,
        method: editHandle,
      },
      {
        icon: <DeleteIcon />,
        method: deleteHandle,
      },
    ],
  },
];

export const filterContent = () => [
  {
    name: 'Severity',
    children: [
      {
        component: 'checkbox',
        label: 'High',
        id: 1,
        value: false,
      },
      {
        component: 'checkbox',
        label: 'Low',
        id: 2,
        value: false,
      },
      {
        component: 'checkbox',
        label: 'Medium',
        id: 3,
        value: false,
      },
    ],
  },
  {
    name: 'Status',
    children: [
      {
        component: 'checkbox',
        label: 'Active',
        id: 1,
        value: true,
      },
      {
        component: 'checkbox',
        label: 'Inactive',
        id: 2,
        value: true,
      },
    ],
  },
  {
    name: 'Date',
    children: [
      {
        component: 'dateCheckbox',
        label: 'Created On',
        value: false,
      },
      {
        component: 'dateCheckbox',
        label: 'Modified On',
        value: false,
      },
      {
        component: 'dateInput',
        label: 'Select Date From',
        value: '23rd Jan, 22',
      },
      {
        component: 'dateInput',
        label: 'Select Date To',
        value: '25th Jan, 22',
      },
    ],
  },
];
