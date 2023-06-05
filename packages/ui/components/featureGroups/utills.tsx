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
    id: 'featuregroup',
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
    id: 'modifiedon',
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
  { type: ['TEXT'], name: 'featuregroup' },
  { type: ['TEXT'], name: 'features' },
  { type: ['TEXT'], name: 'modifiedon' },
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
    featuregroup: 'General',
    features: '3 features',
    modifiedon: '27/05/2023',
    id: '1',
    status: true,
  },
  {
    featuregroup: 'Actions',
    features: '6 features',
    modifiedon: '08/05/2023',
    id: '2',
    status: false,
  },
  {
    featuregroup: 'Goals',
    features: '12 features',
    modifiedon: '27/05/2023',
    id: '3',
    status: true,
  },
  {
    featuregroup: 'Automation',
    features: '26 features',
    modifiedon: '08/05/2023',
    id: '4',
    status: false,
  },
  {
    featuregroup: 'Collaboration',
    features: '32 features',
    modifiedon: '27/05/2023',
    id: '5',
    status: true,
  },
  {
    featuregroup: 'Productivity',
    features: '-',
    modifiedon: '08/05/2023',
    id: '6',
    status: false,
  },
];
