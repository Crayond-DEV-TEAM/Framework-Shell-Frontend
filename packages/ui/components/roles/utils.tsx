import { DeleteIcon, EditIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'roles_name',
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
  { type: ['TEXT'], name: 'roles_name' },
  { type: ['TEXT'], name: 'description' },
  { type: ['LABEL'], name: 'permission' },
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

export const tableJson = [
  {
    roles_name: 'property Manager',
    description: 'sed massa',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
  {
    roles_name: 'Client Manager',
    description: 'client take hjhu',
    permission: {
      label: `Client Management`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
  {
    roles_name: 'property Manager',
    description: 'sed massa',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
  {
    roles_name: 'Client Manager',
    description: 'client take hjhu',
    permission: {
      label: `Client Management`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
  {
    roles_name: 'property Manager',
    description: 'sed massa',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
  {
    roles_name: 'property Manager',
    description: 'sed massa',
    permission: {
      label: `Facility`,
      color: '#305AAE',
      bgColor: '#E2EAFA',
    },
    status: true,
  },
];
