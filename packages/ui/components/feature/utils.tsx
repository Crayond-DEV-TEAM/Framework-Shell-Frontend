import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'checkbox',
    align: 'left',
    disablePadding: false,
    variant: 'CHECKBOX',
    isSortable: false,
  },
  {
    id: 'fetaureid',
    align: 'left',
    disablePadding: false,
    label: 'Feature Id',
    isSortable: true,
  },
  {
    id: 'featurename',
    align: 'left',
    disablePadding: false,
    label: 'Feature Name',
    isSortable: true,
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
  { type: ['CHECKBOX'], name: 'checkbox' },
  { type: ['TEXT'], name: 'fetaureid' },
  { type: ['TEXT'], name: 'featurename' },
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

export const tableJson = [
  {
    featurename: 'General',
    fetaureid: 'Fet-123-593',
    id: '1',
    status: true,
  },
  {
    featurename: 'Actions',
    fetaureid: 'Fet-123-563',
    id: '2',
    status: false,
  },
  {
    featurename: 'Goals',
    fetaureid: 'Fet-823-593',
    id: '3',
    status: true,
  },
  {
    featurename: 'Automation',
    fetaureid: 'Fet-1783-593',
    id: '4',
    status: false,
  },
  {
    featurename: 'Collaboration',
    fetaureid: 'Fet-123-5953',
    id: '5',
    status: true,
  },
  {
    featurename: 'Productivity',
    fetaureid: 'Fet-1243-593',
    id: '6',
    status: false,
  },
];
