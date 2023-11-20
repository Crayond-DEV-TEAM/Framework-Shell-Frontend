import { DeleteIcon, EditIcon, MoreIcon } from '@atoms/icons';

export const Header = [
  {
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'User Name',
    isSortable: true,
  },
  {
    id: 'role',
    align: 'left',
    disablePadding: false,
    label: 'Role',
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
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'role' },
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
    userName: 'property',
    access: 'access',
    serviceMapped: '04',
    id: '1',
    status: true,
  },
  {
    userName: 'Client',
    access: 'client access',
    serviceMapped: '07',
    status: true,
    id: '2',
  },
  {
    userName: 'Broker',
    access: 'Management',
    serviceMapped: '10',
    status: true,
    id: '3',
  },
  {
    userName: 'Easy',
    access: 'client access',
    serviceMapped: '04',
    status: true,
    id: '4',
  },
  {
    userName: 'Admin',
    access: 'Management',
    serviceMapped: '02',
    status: true,
    id: '5',
  },
];
