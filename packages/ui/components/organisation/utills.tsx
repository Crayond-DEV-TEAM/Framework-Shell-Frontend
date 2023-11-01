import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'organisationName',
    align: 'left',
    disablePadding: false,
    label: 'Organisation Name',
    isSortable: true,
  },
  {
    id: 'description',
    align: 'left',
    disablePadding: false,
    label: 'Description',
    isSortable: true,
  },
  {
    id: 'email',
    align: 'left',
    disablePadding: false,
    label: 'Email ID',
  },
  {
    id: 'mobileNumber',
    align: 'left',
    disablePadding: false,
    label: 'Mobile Number',
  },
  {
    id: 'domain',
    align: 'left',
    disablePadding: false,
    label: 'Domain URL',
  },
  {
    id: 'is_active',
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

export const tableData = (editHandel: (id: string, data: any, e: any) => void, deleteHandel: (id: string) => void) => [
  { type: ['TEXT'], name: 'organisationName' },
  { type: ['TEXT'], name: 'description' },
  { type: ['TEXT'], name: 'email' },
  { type: ['TEXT'], name: 'mobileNumber' },
  { type: ['TEXT'], name: 'domain' },
  {
    type: ['SWITCH'],
    name: 'is_active',
    switchText: [{ label_1: 'In Active', label_2: 'Active' }],
  },
  {
    type: ['ACTION'],
    name: 'action',
    variant: [
      {
        icon: <EditIcon />,
        method: editHandel,
      },
      {
        icon: <DeleteIcon />,
        method: deleteHandel,
      },
    ],
  },
];
