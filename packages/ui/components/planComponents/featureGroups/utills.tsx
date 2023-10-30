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
    id: 'name',
    align: 'left',
    disablePadding: false,
    label: 'Feature group',
    isSortable: true,
  },
  {
    id: 'features',
    align: 'left',
    disablePadding: false,
    label: 'Features',
    isSortable: true,
  },
  {
    id: 'modified',
    align: 'left',
    disablePadding: false,
    label: 'Modified On',
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
  { type: ['TEXT'], name: 'name' },
  { type: ['TEXT'], name: 'features' },
  { type: ['TEXT'], name: 'modified' },
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
    name: 'General',
    features: '3 features',
    modified: '27/05/2023',
    id: '1',
    status: true,
  },
  {
    name: 'Actions',
    features: '6 features',
    modified: '08/05/2023',
    id: '2',
    status: false,
  },
  {
    name: 'Goals',
    features: '12 features',
    modified: '27/05/2023',
    id: '3',
    status: true,
  },
  {
    name: 'Automation',
    features: '26 features',
    modified: '08/05/2023',
    id: '4',
    status: false,
  },
  {
    name: 'Collaboration',
    features: '32 features',
    modified: '27/05/2023',
    id: '5',
    status: true,
  },
  {
    name: 'Productivity',
    features: '-',
    modified: '08/05/2023',
    id: '6',
    status: false,
  },
];
