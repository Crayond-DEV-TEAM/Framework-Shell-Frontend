import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Roles Name',
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
    id: 'permission',
    align: 'left',
    disablePadding: false,
    label: 'Permission',
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
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'description' },
  { type: ['LABEL'], name: 'permission' },
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
    title: 'property Manager',
    description: 'description',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    id: '1',
    status: true,
  },
  {
    title: 'Client Manager',
    description: 'client description',
    permission: {
      label: `Client Management`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
    id: '2',
  },
  {
    title: 'property Manager',
    description: 'Management',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
    id: '3',
  },
  {
    title: 'Client Manager',
    description: 'client description',
    permission: {
      label: `Client Management`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
    id: '4',
  },
  {
    title: 'property Manager',
    description: 'Management',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
    id: '5',
  },
  {
    title: 'property Manager',
    description: 'Management',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
    id: '6',
  },
];
