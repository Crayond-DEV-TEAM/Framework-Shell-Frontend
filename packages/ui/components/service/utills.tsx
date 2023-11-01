import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'serviceName',
    align: 'left',
    disablePadding: false,
    label: 'Service',
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
    id: 'giturl',
    align: 'left',
    disablePadding: false,
    label: 'Git_url',
  },
  {
    id: 'organisation',
    align: 'left',
    disablePadding: false,
    label: 'Organisation',
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
  { type: ['TEXT'], name: 'serviceName' },
  { type: ['TEXT'], name: 'description' },
  { type: ['TEXT'], name: 'giturl' },
  { type: ['LABEL'], name: 'organisation' },
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
